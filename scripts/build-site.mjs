import { cpSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "dist");

rmSync(output, { recursive: true, force: true });

for (const directory of ["css", "js", "assets/images"]) {
  mkdirSync(resolve(output, directory), { recursive: true });
}

for (const file of [
  "index.html",
  "favicon.ico",
  ".nojekyll",
  "css/style.css",
  "js/custom.js",
  "assets/images/Tanner.jpeg",
  "assets/resume.pdf",
]) {
  cpSync(resolve(root, file), resolve(output, file));
}

console.log("Built a minimal GitHub Pages artifact in dist/.");
