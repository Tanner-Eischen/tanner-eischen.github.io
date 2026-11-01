"""Manifest corruption and genuine loopback-serving controls, with no browser."""

import hashlib
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

from verify_built_site import (
    SITE_ORIGIN,
    page_url,
    verify_http,
    verify_manifest,
    write_report,
)


class BuiltSiteChecks(unittest.TestCase):
    def setUp(self):
        self.workspace = tempfile.TemporaryDirectory(prefix="portfolio-http-")
        self.addCleanup(self.workspace.cleanup)
        self.root = Path(self.workspace.name)
        self.files = {
            "index.html": '<link rel="stylesheet" href="css/site.css"><img src="assets/logo.svg">',
            "projects/example/index.html": '<a href="/">Home</a>',
            "assets/logo.svg": '<svg xmlns="http://www.w3.org/2000/svg"></svg>',
            "assets/background.svg": '<svg xmlns="http://www.w3.org/2000/svg"></svg>',
            "assets/report a.pdf": "%PDF-fixture",
            "css/site.css": 'body {background:url("../assets/background.svg")}',
            "robots.txt": f"User-agent: *\nAllow: /\nSitemap: {SITE_ORIGIN}/sitemap.xml\n",
        }
        self.files["sitemap.xml"] = (
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
            + "".join(
                f"<url><loc>{page_url(name)}</loc></url>"
                for name in self.files
                if name.endswith(".html")
            )
            + "</urlset>"
        )
        for name, data in self.files.items():
            path = self.root / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(data.encode("utf-8"))
        self.refresh_manifest()

    def refresh_manifest(self):
        hashes = {
            name: hashlib.sha256((self.root / name).read_bytes()).hexdigest()
            for name in sorted(self.files)
        }
        self.manifest = {
            "schema_version": 1,
            "files_sha256": hashes,
            "content_fingerprint": hashlib.sha256(
                json.dumps(hashes, separators=(",", ":")).encode()
            ).hexdigest(),
        }
        (self.root / "build-manifest.json").write_bytes(
            json.dumps(self.manifest).encode()
        )

    def test_real_http_includes_nested_directory_routes_and_encoded_download(self):
        result = verify_http(self.root)
        self.assertEqual(result["status"], "passed")
        routes = {check["route"] for check in result["checks"]}
        self.assertTrue({"/", "/projects/example/", "/assets/report%20a.pdf"} <= routes)
        expected = sum(
            len(self.files[name].encode())
            for name in [
                "index.html",
                "css/site.css",
                "assets/logo.svg",
                "assets/background.svg",
            ]
        )
        self.assertEqual(result["home_static_resource_bytes"], expected)

    def test_changed_file_is_rejected(self):
        (self.root / "assets/logo.svg").write_bytes(b"changed")
        with self.assertRaisesRegex(ValueError, "checksum mismatch"):
            verify_manifest(self.root)

    def test_added_file_is_rejected(self):
        (self.root / "unexpected.txt").write_bytes(b"not declared")
        with self.assertRaisesRegex(ValueError, "inventory"):
            verify_manifest(self.root)

    def test_missing_declared_download_is_rejected(self):
        (self.root / "assets/report a.pdf").unlink()
        with self.assertRaises(FileNotFoundError):
            verify_manifest(self.root)

    def test_manifest_escape_is_rejected(self):
        self.manifest["files_sha256"]["../outside.txt"] = "0" * 64
        (self.root / "build-manifest.json").write_bytes(
            json.dumps(self.manifest).encode()
        )
        with self.assertRaisesRegex(ValueError, "Unsafe manifest"):
            verify_manifest(self.root)

    def test_fingerprint_is_independently_checked(self):
        self.manifest["content_fingerprint"] = "0" * 64
        (self.root / "build-manifest.json").write_bytes(
            json.dumps(self.manifest).encode()
        )
        with self.assertRaisesRegex(ValueError, "fingerprint"):
            verify_manifest(self.root)

    def test_self_consistent_wrong_sitemap_is_rejected(self):
        (self.root / "sitemap.xml").write_bytes(
            b'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>'
        )
        self.refresh_manifest()
        with self.assertRaisesRegex(ValueError, "Sitemap"):
            verify_manifest(self.root)

    def test_too_large_home_page_fails_budget(self):
        with self.assertRaisesRegex(ValueError, "budget exceeded"):
            verify_http(self.root, budget_bytes=1)

    def test_report_refuses_to_overwrite_evidence(self):
        path = self.root / "report.json"
        write_report(path, {"first": True})
        before = path.read_bytes()
        with self.assertRaises(FileExistsError):
            write_report(path, {"second": True})
        self.assertEqual(path.read_bytes(), before)

    def test_cli_report_cannot_mutate_the_validated_build(self):
        report = self.root / "proof.json"
        result = subprocess.run(
            [
                sys.executable,
                str(Path(__file__).with_name("verify_built_site.py")),
                "--build-root",
                str(self.root),
                "--report",
                str(report),
            ],
            capture_output=True,
            text=True,
        )
        self.assertEqual(result.returncode, 2)
        self.assertIn("outside the validated build", result.stderr)
        self.assertFalse(report.exists())
        verify_manifest(self.root)


if __name__ == "__main__":
    unittest.main()
