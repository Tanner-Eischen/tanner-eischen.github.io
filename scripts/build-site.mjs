import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { collectSite, pageUrl, siteOrigin } from "./site-files.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "dist");
if (
  dirname(output) !== root ||
  basename(output) !== "dist" ||
  realpathSync(dirname(output)) !== realpathSync(root) ||
  (existsSync(output) && lstatSync(output).isSymbolicLink())
)
  throw new Error("Invalid build target");

// Resolve every dependency before replacing the last successful generated site.
const { pages, files } = collectSite(root);
rmSync(output, { recursive: true, force: true });
for (const file of files) {
  const target = resolve(output, file);
  mkdirSync(dirname(target), { recursive: true });
  cpSync(resolve(root, file), target);
}
const urls = pages.map((page) => pageUrl(page).replaceAll("&", "&amp;"));
writeFileSync(
  resolve(output, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`,
);
writeFileSync(
  resolve(output, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${siteOrigin}/sitemap.xml\n`,
);
const artifactFiles = [...files, "sitemap.xml", "robots.txt"].sort();
const hashes = Object.fromEntries(
  artifactFiles.map((file) => [
    file,
    createHash("sha256")
      .update(readFileSync(resolve(output, file)))
      .digest("hex"),
  ]),
);
const revision = spawnSync("git", ["-C", root, "rev-parse", "HEAD"], {
  encoding: "utf8",
  windowsHide: true,
});
const status = spawnSync("git", ["-C", root, "status", "--porcelain=v1"], {
  encoding: "utf8",
  windowsHide: true,
});
writeFileSync(
  resolve(output, "build-manifest.json"),
  JSON.stringify(
    {
      schema_version: 1,
      scope:
        "Portfolio static artifact identity; scientific provenance remains in project handoffs.",
      source_commit: revision.status === 0 ? revision.stdout.trim() : null,
      dirty_worktree:
        status.status === 0 ? Boolean(status.stdout.trim()) : null,
      generated_at_utc: new Date().toISOString(),
      content_fingerprint: createHash("sha256")
        .update(JSON.stringify(hashes))
        .digest("hex"),
      files_sha256: hashes,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `Built ${pages.length} pages and ${files.size + 3} public files, including sitemap, robots and build metadata.`,
);
