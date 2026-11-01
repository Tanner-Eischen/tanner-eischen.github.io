"""Audit a built static artifact through a loopback stdlib HTTP server, without a UI."""

from __future__ import annotations

import argparse
from datetime import datetime, timezone
import functools
import hashlib
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from html.parser import HTMLParser
import json
from pathlib import Path, PurePosixPath
import re
import sys
from threading import Thread
from urllib.parse import quote, unquote, urljoin, urlsplit
from urllib.request import urlopen
import xml.etree.ElementTree as ET


SITE_ORIGIN = "https://tanner-eischen.github.io"


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def public_file(root: Path, name: str) -> Path:
    parts = PurePosixPath(name)
    if (
        not name
        or parts.is_absolute()
        or "\\" in name
        or ":" in name
        or any(part in {".", ".."} for part in name.split("/"))
    ):
        raise ValueError(f"Unsafe manifest resource: {name}")
    target = root / name
    target.resolve(strict=True).relative_to(root.resolve(strict=True))
    if target.is_symlink() or not target.is_file():
        raise ValueError(f"Not a regular public resource: {name}")
    return target


def page_url(name: str) -> str:
    return (
        SITE_ORIGIN
        + "/"
        + quote(name[:-10] if name.endswith("index.html") else name, safe="/")
    )


def verify_manifest(root: Path) -> tuple[dict, dict[str, bytes]]:
    if root.is_symlink() or not root.is_dir():
        raise ValueError("Build root must be a real directory")
    manifest = json.loads((root / "build-manifest.json").read_text(encoding="utf-8"))
    hashes = manifest.get("files_sha256")
    if (
        manifest.get("schema_version") != 1
        or not isinstance(hashes, dict)
        or not hashes
    ):
        raise ValueError("Unsupported or empty build manifest")
    payload = {}
    for name, expected in hashes.items():
        if not isinstance(expected, str) or not re.fullmatch(r"[a-f0-9]{64}", expected):
            raise ValueError(f"Invalid resource checksum: {name}")
        data = public_file(root, name).read_bytes()
        if digest(data) != expected:
            raise ValueError(f"Resource checksum mismatch: {name}")
        payload[name] = data
    actual = set()
    for path in root.rglob("*"):
        if path.is_symlink():
            raise ValueError(f"Symlink in built artifact: {path.name}")
        if path.is_file():
            actual.add(path.relative_to(root).as_posix())
    if actual != set(hashes) | {"build-manifest.json"}:
        raise ValueError("Built file inventory differs from manifest")
    fingerprint = digest(
        json.dumps(hashes, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
    )
    if fingerprint != manifest.get("content_fingerprint"):
        raise ValueError("Build content fingerprint mismatch")
    pages = sorted(name for name in hashes if name.endswith(".html"))
    if "index.html" not in pages:
        raise ValueError("Home page missing from built artifact")
    locations = [
        item.text
        for item in ET.fromstring(payload["sitemap.xml"]).findall(
            "{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc"
        )
    ]
    if sorted(locations) != sorted(page_url(name) for name in pages):
        raise ValueError("Sitemap differs from public page inventory")
    expected_robots = [
        "User-agent: *",
        "Allow: /",
        f"Sitemap: {SITE_ORIGIN}/sitemap.xml",
    ]
    if payload["robots.txt"].decode("utf-8").splitlines() != expected_robots:
        raise ValueError("Robots metadata differs from intended public policy")
    payload["build-manifest.json"] = (root / "build-manifest.json").read_bytes()
    return manifest, payload


class HomeResources(HTMLParser):
    def __init__(self):
        super().__init__()
        self.references: list[str] = []

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag in {"img", "script"} and attrs.get("src"):
            self.references.append(attrs["src"])
        if tag in {"img", "source"} and attrs.get("srcset"):
            self.references.extend(
                item.strip().split()[0] for item in attrs["srcset"].split(",")
            )
        if (
            tag == "link"
            and set(attrs.get("rel", "").split()) & {"stylesheet", "icon"}
            and attrs.get("href")
        ):
            self.references.append(attrs["href"])


def home_resources(payload: dict[str, bytes]) -> set[str]:
    parser = HomeResources()
    parser.feed(payload["index.html"].decode("utf-8"))
    files = {"index.html"}
    pending = [("index.html", reference) for reference in parser.references]
    while pending:
        source, reference = pending.pop()
        url = urlsplit(urljoin(f"{SITE_ORIGIN}/{source}", reference))
        if f"{url.scheme}://{url.netloc}" != SITE_ORIGIN:
            continue
        name = unquote(url.path).lstrip("/")
        if name not in payload:
            raise ValueError(f"Home resource absent from build manifest: {name}")
        if name in files:
            continue
        files.add(name)
        if name.endswith(".css"):
            css = re.sub(r"/\*[\s\S]*?\*/", "", payload[name].decode("utf-8"))
            refs = [
                next(value for value in match if value)
                for match in re.findall(
                    r"""url\(\s*(?:"([^"]+)"|'([^']+)'|([^\s)]+))\s*\)""", css
                )
            ]
            refs += re.findall(r"""@import\s+["']([^"']+)["']""", css)
            pending.extend((name, ref) for ref in refs)
    return files


def verify_http(root: Path, budget_bytes: int = 1_500_000) -> dict:
    root = root.absolute()
    manifest, payload = verify_manifest(root)
    resources = home_resources(payload)
    size = sum(len(payload[name]) for name in resources)
    if size > budget_bytes:
        raise ValueError(
            f"Home static-resource budget exceeded: {size} > {budget_bytes}"
        )

    class QuietHandler(SimpleHTTPRequestHandler):
        def log_message(self, *_args):
            pass

    server = ThreadingHTTPServer(
        ("127.0.0.1", 0), functools.partial(QuietHandler, directory=str(root))
    )
    thread = Thread(target=server.serve_forever, daemon=True)
    thread.start()
    checks = []
    try:
        requests = [("/" + quote(name, safe="/"), name) for name in sorted(payload)]
        requests.extend(
            ("/" + quote(name[:-10], safe="/"), name)
            for name in sorted(payload)
            if name.endswith("index.html")
        )
        for route, name in requests:
            with urlopen(
                f"http://127.0.0.1:{server.server_port}{route}", timeout=10
            ) as response:
                data = response.read()
                if response.status != 200 or data != payload[name]:
                    raise ValueError(f"HTTP body/status mismatch: {route}")
                if int(response.headers["Content-Length"]) != len(data):
                    raise ValueError(f"HTTP length mismatch: {route}")
                checks.append(
                    {
                        "route": route,
                        "path": name,
                        "status": response.status,
                        "bytes": len(data),
                        "sha256": digest(data),
                    }
                )
    finally:
        server.shutdown()
        server.server_close()
        thread.join(timeout=10)
    return {
        "schema_version": 1,
        "status": "passed",
        "verified_at_utc": datetime.now(timezone.utc).isoformat(),
        "runtime": {"python": sys.version.split()[0], "platform": sys.platform},
        "content_fingerprint": manifest["content_fingerprint"],
        "source_commit": manifest.get("source_commit"),
        "dirty_worktree": manifest.get("dirty_worktree"),
        "public_files": len(payload),
        "http_requests": len(checks),
        "checks": checks,
        "home_resources": sorted(resources),
        "home_static_resource_bytes": size,
        "budget_bytes": budget_bytes,
        "scope": "Loopback HTTP bytes/inventory and conservative uncompressed resource budget; no browser/UI, layout, accessibility conformance or network timing claim.",
    }


def write_report(path: Path, result: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("xb") as stream:
        stream.write((json.dumps(result, indent=2) + "\n").encode("utf-8"))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--build-root", type=Path, default=Path(__file__).resolve().parents[1] / "dist"
    )
    parser.add_argument("--budget-bytes", type=int, default=1_500_000)
    parser.add_argument("--report", type=Path)
    args = parser.parse_args()
    if args.budget_bytes <= 0:
        parser.error("budget must be positive")
    if args.report and args.report.exists():
        parser.error("report already exists; choose a new versioned output")
    if args.report and args.report.resolve().is_relative_to(args.build_root.resolve()):
        parser.error("report must be outside the validated build artifact")
    try:
        result = verify_http(args.build_root, args.budget_bytes)
        if args.report:
            write_report(args.report, result)
    except (OSError, ValueError, KeyError, ET.ParseError) as error:
        parser.exit(1, f"Built-site verification failed: {error}\n")
    print(
        f"Verified {result['public_files']} built files through {result['http_requests']} loopback HTTP requests; home resources {result['home_static_resource_bytes']} bytes."
    )


if __name__ == "__main__":
    main()
