import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const failures = [];

const ids = new Set(
  [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]),
);
const references = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map(
  (match) => match[1],
);

for (const reference of references) {
  if (reference.startsWith("#")) {
    const id = reference.slice(1);
    if (id && !ids.has(id))
      failures.push(`Missing in-page target: ${reference}`);
    continue;
  }

  if (/^(?:https?:|mailto:|tel:|data:)/.test(reference)) continue;

  const cleanPath = reference.split(/[?#]/, 1)[0];
  if (cleanPath && !existsSync(resolve(root, cleanPath))) {
    failures.push(`Missing local asset: ${reference}`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Checked ${references.length} links and asset references.`);
