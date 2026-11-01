import {
  existsSync,
  lstatSync,
  readFileSync,
  readdirSync,
  realpathSync,
  statSync,
} from "node:fs";
import {
  dirname,
  extname,
  isAbsolute,
  relative,
  resolve,
  sep,
} from "node:path";
import { HtmlValidate, Parser } from "html-validate";

export const siteOrigin = "https://tanner-eischen.github.io";
export const pageUrl = (page) =>
  new URL(
    page.endsWith("index.html") ? page.slice(0, -10) : page,
    `${siteOrigin}/`,
  ).href;
const validator = new HtmlValidate();
export function parseHtml(html) {
  return new Parser(validator.getConfigForSync("index.html")).parseHtml(html);
}
export function decodeAttribute(value) {
  return value.replace(
    /&(?:amp|quot|apos|lt|gt|nbsp);|&#(?:x[0-9a-f]+|[0-9]+);/gi,
    (entity) => {
      const named = {
        "&amp;": "&",
        "&quot;": '"',
        "&apos;": "'",
        "&lt;": "<",
        "&gt;": ">",
        "&nbsp;": " ",
      };
      if (!entity.startsWith("&#")) return named[entity.toLowerCase()];
      const code = entity.slice(2, -1);
      return String.fromCodePoint(
        code[0].toLowerCase() === "x"
          ? parseInt(code.slice(1), 16)
          : Number(code),
      );
    },
  );
}
export function inside(root, target) {
  const path = relative(root, target);
  return !isAbsolute(path) && path !== ".." && !path.startsWith(`..${sep}`);
}
export function publicFile(root, name) {
  const target = resolve(root, name);
  if (
    !inside(root, target) ||
    !existsSync(target) ||
    !statSync(target).isFile() ||
    lstatSync(target).isSymbolicLink() ||
    !inside(realpathSync(root), realpathSync(target))
  )
    throw new Error(`Missing or unsafe public file: ${name}`);
  return target;
}
export function discoverPages(root) {
  const pages = ["index.html"];
  const walk = (directory) => {
    const target = resolve(root, directory);
    if (!existsSync(target)) return;
    if (!inside(realpathSync(root), realpathSync(target)))
      throw new Error(`Unsafe page directory: ${directory}`);
    for (const entry of readdirSync(target, { withFileTypes: true })) {
      if (entry.isSymbolicLink())
        throw new Error(`Symlink in public page tree: ${entry.name}`);
      const name = `${directory}/${entry.name}`;
      if (entry.isDirectory()) walk(name);
      else if (entry.isFile() && entry.name.endsWith(".html")) pages.push(name);
    }
  };
  for (const directory of [
    "case-studies",
    "projects",
    "scientific-software",
    "ai-evaluation",
  ])
    walk(directory);
  return pages.sort();
}
export function htmlReferences(html) {
  const document = parseHtml(html);
  const references = [];
  for (const node of document.querySelectorAll(
    "[href], [src], [poster], object[data], [srcset]",
  )) {
    for (const attr of [
      "href",
      "src",
      "poster",
      ...(node.tagName === "object" ? ["data"] : []),
    ]) {
      const value = node.getAttributeValue(attr);
      if (value !== null) references.push(decodeAttribute(value));
    }
    const srcset = node.getAttributeValue("srcset");
    if (srcset) {
      if (srcset.includes("data:"))
        throw new Error(
          "Inline data in srcset is not supported; use image files",
        );
      for (const item of srcset.split(","))
        references.push(decodeAttribute(item.trim().split(/\s+/)[0]));
    }
  }
  return references;
}
export function cssReferences(css) {
  const source = css.replace(/\/\*[\s\S]*?\*\//g, "");
  return [
    ...[
      ...source.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*?))\s*\)/gi),
    ].map((match) => match[1] ?? match[2] ?? match[3]),
    ...[...source.matchAll(/@import\s+["']([^"']+)["']/gi)].map(
      (match) => match[1],
    ),
  ];
}
export function resolveReference(root, source, reference) {
  const raw = reference.trim();
  const rawPath = decodeURIComponent(raw.split(/[?#]/, 1)[0]);
  if (
    !/^(?:[a-z][a-z0-9+.-]*:|\/)/i.test(rawPath) &&
    !inside(root, resolve(root, dirname(source), rawPath))
  )
    throw new Error(`Reference escapes public root: ${reference}`);
  const url = new URL(raw, `${siteOrigin}/${source}`);
  if (["mailto:", "tel:", "data:"].includes(url.protocol)) return null;
  if (!["https:", "http:"].includes(url.protocol))
    throw new Error(`Unsupported public URL scheme: ${reference}`);
  if (url.origin !== siteOrigin) return null;
  const path = decodeURIComponent(url.pathname);
  let target = resolve(root, `.${path}`);
  if (!inside(root, target))
    throw new Error(`Reference escapes public root: ${reference}`);
  if (existsSync(target) && statSync(target).isDirectory())
    target = resolve(target, "index.html");
  const name = relative(root, target).split(sep).join("/");
  publicFile(root, name);
  return { name, fragment: decodeURIComponent(url.hash.slice(1)) };
}
export function collectSite(root) {
  const pages = discoverPages(root);
  const pageSet = new Set(pages);
  const files = new Set([...pages, ".nojekyll"]);
  const pending = [...pages];
  let referenceCount = 0;
  const fragments = new Map();
  const allowed = (name) =>
    name === ".nojekyll" ||
    (!name.split("/").some((part) => part.startsWith(".")) &&
      (pageSet.has(name) ||
        /^(?:assets|css|js)\//.test(name) ||
        name === "favicon.ico"));
  while (pending.length) {
    const source = pending.shift();
    const extension = extname(source);
    const text = readFileSync(publicFile(root, source), "utf8");
    const references =
      extension === ".html" ? htmlReferences(text) : cssReferences(text);
    for (const reference of references) {
      referenceCount++;
      const local = resolveReference(root, source, reference);
      if (!local) continue;
      if (!allowed(local.name))
        throw new Error(
          `Undeclared public resource: ${source} -> ${local.name}`,
        );
      if (local.fragment && extname(local.name) === ".html") {
        if (!fragments.has(local.name))
          fragments.set(
            local.name,
            new Set(
              parseHtml(readFileSync(publicFile(root, local.name), "utf8"))
                .querySelectorAll("[id]")
                .map((node) => decodeAttribute(node.getAttributeValue("id"))),
            ),
          );
        if (!fragments.get(local.name).has(local.fragment))
          throw new Error(`Missing fragment: ${source} -> ${reference}`);
      }
      if (!files.has(local.name)) {
        files.add(local.name);
        if (extname(local.name) === ".css") pending.push(local.name);
      }
    }
  }
  publicFile(root, ".nojekyll");
  return { pages, files, referenceCount };
}
