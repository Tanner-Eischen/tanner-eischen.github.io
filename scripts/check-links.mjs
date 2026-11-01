import { readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { collectSite, publicFile } from "./site-files.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const target = process.argv.includes("--built") ? resolve(root, "dist") : root;
const { pages, referenceCount } = collectSite(target);
const evidence = resolve(target, "assets/evidence");
for (const name of readdirSync(evidence).filter((file) =>
  file.endsWith(".sha256"),
)) {
  const match = readFileSync(resolve(evidence, name), "utf8")
    .trim()
    .match(/^([a-f0-9]{64})\s+([a-z0-9-]+\.json)$/);
  if (!match) throw new Error(`Invalid evidence hash record: ${name}`);
  const actual = createHash("sha256")
    .update(readFileSync(publicFile(target, `assets/evidence/${match[2]}`)))
    .digest("hex");
  if (actual !== match[1]) throw new Error(`Evidence hash mismatch: ${name}`);
}
console.log(
  `Checked ${referenceCount} references across ${pages.length} ${target === root ? "source" : "built"} HTML pages, including CSS dependencies.`,
);
