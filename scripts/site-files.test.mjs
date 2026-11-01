import assert from "node:assert/strict";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import {
  collectSite,
  discoverPages,
  htmlReferences,
  pageUrl,
  resolveReference,
} from "./site-files.mjs";

const repository = resolve(dirname(fileURLToPath(import.meta.url)), "..");
function fixture(run) {
  const parent = resolve(repository, "tmp");
  mkdirSync(parent, { recursive: true });
  const root = mkdtempSync(resolve(parent, "site-test-"));
  const put = (name, value) => {
    const path = resolve(root, name);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, value);
  };
  put(".nojekyll", "");
  put(
    "index.html",
    '<main id="main"><a href="projects/sample/">Project</a><link href="/css/site.css" rel="stylesheet" /></main>',
  );
  put(
    "projects/sample/index.html",
    '<a href="../../index.html#main">Home</a><a href="/assets/report.pdf#page=1">Report</a>',
  );
  put("assets/report.pdf", "%PDF-fixture");
  put("assets/bg.png", "fixture");
  put(
    "css/site.css",
    '@import "theme.css"; .image { background: url(../assets/bg.png); }',
  );
  put("css/theme.css", "body {color: black;}");
  try {
    return run(root, put);
  } finally {
    if (dirname(root) !== parent) throw new Error("Unsafe fixture cleanup");
    rmSync(root, { recursive: true });
  }
}
test("nested routes, root paths, PDF fragments and imported CSS form one graph", () =>
  fixture((root) => {
    const graph = collectSite(root);
    assert.deepEqual(graph.pages, ["index.html", "projects/sample/index.html"]);
    assert.ok(graph.files.has("css/theme.css"));
    assert.ok(graph.files.has("assets/bg.png"));
    assert.ok(graph.files.has("assets/report.pdf"));
    assert.equal(
      pageUrl("projects/sample/index.html"),
      "https://tanner-eischen.github.io/projects/sample/",
    );
  }));
test("missing transitive CSS resource fails before publication", () =>
  fixture((root, put) => {
    put("css/theme.css", 'body {background:url("missing.webp");}');
    assert.throws(() => collectSite(root), /Missing or unsafe public file/);
  }));
test("broken fragment on another page fails", () =>
  fixture((root, put) => {
    put(
      "projects/sample/index.html",
      '<a href="/index.html#absent">Broken</a>',
    );
    assert.throws(() => collectSite(root), /Missing fragment/);
  }));
test("encoded download paths and query strings resolve correctly", () =>
  fixture((root, put) => {
    put("assets/a b&c.pdf", "fixture");
    assert.equal(
      resolveReference(
        root,
        "index.html",
        "/assets/a%20b%26c.pdf?download=1#page=2",
      ).name,
      "assets/a b&c.pdf",
    );
  }));
test("HTML parsing recognizes single quotes, entities, srcset and object downloads", () => {
  assert.deepEqual(
    htmlReferences(
      "<a href='a&amp;b.pdf'>File</a><img srcset='one.webp 1x, two.webp 2x'/><object data='file.pdf'></object>",
    ).sort(),
    ["a&b.pdf", "one.webp", "two.webp", "file.pdf"].sort(),
  );
});
test("unsupported local schemes and traversal are rejected", () =>
  fixture((root) => {
    assert.throws(
      () =>
        resolveReference(root, "index.html", "file:///C:/Users/private.txt"),
      /Unsupported/,
    );
    assert.throws(
      () => resolveReference(root, "index.html", "javascript:alert(1)"),
      /Unsupported/,
    );
    assert.throws(
      () => resolveReference(root, "index.html", "../private.txt"),
      /escapes/,
    );
    assert.throws(
      () => resolveReference(root, "index.html", "%2e%2e/private.txt"),
      /escapes/,
    );
  }));
test("a link cannot accidentally publish source or configuration files", () =>
  fixture((root, put) => {
    put("content/private.json", "{}");
    put("index.html", '<a href="content/private.json">Private</a>');
    assert.throws(() => collectSite(root), /Undeclared public resource/);
  }));

test("hidden configuration is excluded even inside an asset directory", () =>
  fixture((root, put) => {
    put("assets/.env", "private fixture");
    put("index.html", '<a href="assets/.env">Configuration</a>');
    assert.throws(() => collectSite(root), /Undeclared public resource/);
  }));
test("CSS import cycles terminate", () =>
  fixture((root, put) => {
    put("css/theme.css", '@import "site.css";');
    assert.ok(collectSite(root).files.has("css/theme.css"));
  }));
test("page discovery excludes docs, content and test workspaces", () =>
  fixture((root, put) => {
    put("docs/private.html", "private");
    put("content/template.html", "private");
    assert.equal(discoverPages(root).length, 2);
  }));
test("a filesystem junction cannot expose resources outside the site", () =>
  fixture((root, put) => {
    const outside = mkdtempSync(resolve(repository, "tmp", "site-outside-"));
    try {
      writeFileSync(resolve(outside, "private.txt"), "private");
      symlinkSync(outside, resolve(root, "assets/linked"), "junction");
      put("index.html", '<a href="assets/linked/private.txt">Private</a>');
      assert.throws(() => collectSite(root), /Missing or unsafe public file/);
    } finally {
      // Remove the junction itself before cleaning the independently bounded target.
      rmSync(resolve(root, "assets/linked"), { recursive: true, force: true });
      if (dirname(outside) !== resolve(repository, "tmp"))
        throw new Error("Unsafe outside fixture cleanup");
      rmSync(outside, { recursive: true });
    }
  }));
