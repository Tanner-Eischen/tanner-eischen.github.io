import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { HtmlValidate } from "html-validate";
import { discoverPages, pageUrl, parseHtml } from "./site-files.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const target = process.argv.includes("--built") ? resolve(root, "dist") : root;
const pages = discoverPages(target);
const validator = new HtmlValidate(
  JSON.parse(readFileSync(resolve(root, ".htmlvalidate.json"), "utf8")),
);
const failures = [];
for (const page of pages) {
  const path = resolve(target, page);
  const report = await validator.validateFile(path);
  for (const result of report.results)
    for (const message of result.messages)
      if (message.severity === 2)
        failures.push(
          `${page}:${message.line}:${message.column} ${message.message} (${message.ruleId})`,
        );
  const document = parseHtml(readFileSync(path, "utf8"));
  const one = (selector, label) => {
    const nodes = document.querySelectorAll(selector);
    if (nodes.length !== 1) failures.push(`${page}: expected one ${label}`);
    return nodes[0];
  };
  one("main", "main landmark");
  one("h1", "page heading");
  if (!one("html", "document root")?.getAttributeValue("lang"))
    failures.push(`${page}: missing language`);
  const canonical = one('link[rel="canonical"]', "canonical URL");
  if (canonical?.getAttributeValue("href") !== pageUrl(page))
    failures.push(`${page}: incorrect canonical URL`);
  const description = one(
    'meta[name="description"]',
    "description",
  )?.getAttributeValue("content");
  if (!description?.trim()) failures.push(`${page}: empty description`);
  for (const property of ["og:title", "og:description", "og:type", "og:url"])
    if (
      !one(`meta[property="${property}"]`, property)
        ?.getAttributeValue("content")
        ?.trim()
    )
      failures.push(`${page}: empty ${property}`);
  if (
    document
      .querySelector('meta[property="og:url"]')
      ?.getAttributeValue("content") !== pageUrl(page)
  )
    failures.push(`${page}: social URL differs from canonical`);
  if (page !== "index.html")
    one('nav[aria-label="Breadcrumb"]', "breadcrumb navigation");
  for (const image of document.querySelectorAll("img")) {
    const decorative =
      image.getAttributeValue("role") === "presentation" ||
      image.getAttributeValue("aria-hidden") === "true";
    if (!decorative && !image.getAttributeValue("alt")?.trim())
      failures.push(`${page}: informative image missing alt text`);
    for (const dimension of ["width", "height"])
      if (!/^[1-9][0-9]*$/.test(image.getAttributeValue(dimension) ?? ""))
        failures.push(`${page}: image needs positive integer ${dimension}`);
  }
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    `Validated HTML, landmarks, metadata and image declarations across ${pages.length} ${target === root ? "source" : "built"} pages.`,
  );
