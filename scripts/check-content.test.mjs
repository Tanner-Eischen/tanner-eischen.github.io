import assert from "node:assert/strict";
import {
  cpSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { checkContent } from "./check-content.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
function fixture(run) {
  const parent = resolve(root, "tmp");
  mkdirSync(parent, { recursive: true });
  const target = mkdtempSync(resolve(parent, "content-check-"));
  try {
    for (const path of [
      "content",
      "assets/evidence",
      "assets/images",
      "assets/downloads",
      "assets/resume.pdf",
      "case-studies",
      "index.html",
    ])
      cpSync(resolve(root, path), resolve(target, path), { recursive: true });
    return run(target);
  } finally {
    if (dirname(target) !== parent) throw new Error("Unsafe fixture cleanup");
    rmSync(target, { recursive: true });
  }
}
function editJson(root, name, edit) {
  const path = resolve(root, name);
  const data = JSON.parse(readFileSync(path, "utf8"));
  edit(data);
  writeFileSync(path, JSON.stringify(data));
}

test("current content validates", () => {
  assert.deepEqual(checkContent(root).failures, []);
});

test("a pending publication gate still holds a valid release", () =>
  fixture((dir) => {
    editJson(dir, "content/release-review.json", (data) => {
      data.gates.find((gate) => gate.id === "publication-approval").state =
        "pending";
    });
    assert.ok(
      checkContent(dir, { release: true }).failures.some((message) =>
        message.includes("Publication held"),
      ),
    );
  }));
test("changed source evidence is rejected", () =>
  fixture((dir) => {
    writeFileSync(resolve(dir, "assets/evidence/geosteering.json"), "{}");
    assert.ok(
      checkContent(dir).failures.some((message) =>
        message.includes("Changed evidence"),
      ),
    );
  }));
test("metric without unit or scientific scope fails schema", () =>
  fixture((dir) => {
    editJson(dir, "content/claims.json", (data) => {
      const quantity = data.claims.find((claim) => claim.id === "geo-headline")
        .quantities[0];
      delete quantity.unit;
      delete quantity.dataset_scenario;
    });
    assert.ok(
      checkContent(dir).failures.some((message) =>
        message.startsWith("claims:"),
      ),
    );
  }));
test("invented metric cannot be detached from its source", () =>
  fixture((dir) => {
    editJson(dir, "content/claims.json", (data) => {
      data.claims.find(
        (claim) => claim.id === "geo-headline",
      ).quantities[0].value = 100;
    });
    assert.ok(
      checkContent(dir).failures.some((message) =>
        message.includes("Metric mismatch"),
      ),
    );
  }));
test("quantitative claim cannot drop all metric records", () =>
  fixture((dir) => {
    editJson(dir, "content/claims.json", (data) => {
      delete data.claims.find((claim) => claim.id === "geo-headline")
        .quantities;
    });
    assert.ok(
      checkContent(dir).failures.some((message) =>
        message.startsWith("claims:"),
      ),
    );
  }));
test("held credential wording cannot silently return", () =>
  fixture((dir) => {
    const path = resolve(dir, "index.html");
    writeFileSync(
      path,
      readFileSync(path, "utf8").replace(
        "</main>",
        "<p>I earned a PhD in Geophysics from the University of Texas at Austin,</p></main>",
      ),
    );
    assert.ok(
      checkContent(dir).failures.some((message) =>
        message.includes("Held wording"),
      ),
    );
  }));
test("private source cannot become a public source link", () =>
  fixture((dir) => {
    editJson(dir, "content/source-access.json", (data) => {
      data.repositories.find((record) => record.id === "marshab").visibility =
        "private";
    });
    editJson(dir, "content/projects.json", (data) => {
      const project = data.projects.find((project) => project.id === "marshab");
      project.source_access = "private";
      project.source_url = "https://github.com/Tanner-Eischen/MarsGIS";
    });
    assert.ok(
      checkContent(dir).failures.some((message) =>
        message.includes("Private source"),
      ),
    );
  }));
test("planned evidence cannot establish completed work", () =>
  fixture((dir) => {
    editJson(dir, "content/claims.json", (data) => {
      data.claims.find(
        (claim) => claim.id === "geo-headline",
      ).evidence[0].kind = "planned";
    });
    assert.ok(
      checkContent(dir).failures.some((message) =>
        message.includes("Planned evidence"),
      ),
    );
  }));
test("imported packet download cannot silently change", () =>
  fixture((dir) => {
    writeFileSync(
      resolve(dir, "assets/downloads/geosteering-evidence-2026-11-01.zip"),
      "changed download",
    );
    assert.ok(
      checkContent(dir).failures.some((message) =>
        message.includes("Changed archive import"),
      ),
    );
  }));
test("per-image corruption is independently detected", () =>
  fixture((dir) => {
    const path = resolve(dir, "assets/evidence/roof-whu-test-per-image.csv");
    const lines = readFileSync(path, "utf8").trim().split(/\r?\n/);
    const headers = lines[0].split(",");
    const row = lines[1].split(",");
    row[headers.indexOf("tp")] = String(Number(row[headers.indexOf("tp")]) + 1);
    lines[1] = row.join(",");
    writeFileSync(path, lines.join("\n") + "\n");
    assert.ok(
      checkContent(dir).failures.some((message) =>
        message.includes("WHU tp mismatch"),
      ),
    );
  }));

test("required publication gates cannot be removed", () =>
  fixture((dir) => {
    editJson(dir, "content/release-review.json", (data) => {
      data.gates = data.gates.filter(
        (gate) => gate.id !== "publication-approval",
      );
    });
    assert.ok(
      checkContent(dir, { release: true }).failures.some((message) =>
        message.includes("Missing required publication gate"),
      ),
    );
  }));
test("API privacy ledger cannot be bypassed by changing a project badge", () =>
  fixture((dir) => {
    editJson(dir, "content/source-access.json", (data) => {
      data.repositories.find((record) => record.id === "marshab").visibility =
        "private";
    });
    editJson(dir, "content/projects.json", (data) => {
      const project = data.projects.find((project) => project.id === "marshab");
      project.source_access = "public";
      project.source_url = "https://github.com/Tanner-Eischen/MarsGIS";
    });
    assert.ok(
      checkContent(dir).failures.some((message) =>
        message.includes("visibility ledger"),
      ),
    );
  }));

test("sanitized showcase badge cannot expose the private raw repository", () =>
  fixture((dir) => {
    editJson(dir, "content/source-access.json", (data) => {
      data.repositories.find((record) => record.id === "marshab").visibility =
        "private";
    });
    editJson(dir, "content/projects.json", (data) => {
      const project = data.projects.find((project) => project.id === "marshab");
      project.source_access = "sanitized_showcase";
      project.source_url = "https://github.com/Tanner-Eischen/MarsGIS";
    });
    assert.ok(
      checkContent(dir).failures.some((message) =>
        message.includes("Private source URL cannot"),
      ),
    );
  }));
test("held wording is blocked on secondary pages too", () =>
  fixture((dir) => {
    const path = resolve(dir, "case-studies/geosteering.html");
    writeFileSync(
      path,
      readFileSync(path, "utf8").replace(
        "</main>",
        "<p>I earned a PhD in Geophysics from the University of Texas at Austin,</p></main>",
      ),
    );
    assert.ok(
      checkContent(dir).failures.some((message) =>
        message.includes(
          "Held wording still rendered in case-studies/geosteering.html",
        ),
      ),
    );
  }));
test("duplicate handoffs cannot replace another required project", () =>
  fixture((dir) => {
    editJson(dir, "content/handoffs.json", (data) => {
      data.imports = Array.from({ length: 3 }, () => data.imports[0]);
    });
    assert.ok(
      checkContent(dir).failures.some((message) =>
        message.includes("exactly one handoff"),
      ),
    );
  }));
test("a handoff cannot be filed under another project identity", () =>
  fixture((dir) => {
    editJson(dir, "content/handoffs.json", (data) => {
      const geo = data.imports.find(
        (record) => record.project_id === "geosteering",
      );
      data.imports.find(
        (record) => record.project_id === "marshab",
      ).handoff_path = geo.handoff_path;
      data.imports.find(
        (record) => record.project_id === "marshab",
      ).handoff_sha256 = geo.handoff_sha256;
    });
    assert.ok(
      checkContent(dir).failures.some((message) =>
        message.includes("handoff project identity mismatch"),
      ),
    );
  }));

test("new verification evidence cannot silently change", () =>
  fixture((dir) => {
    const data = JSON.parse(
      readFileSync(
        resolve(dir, "content/verification-supplements.json"),
        "utf8",
      ),
    );
    writeFileSync(resolve(dir, data.supplements[0].summary_path), "{}");
    assert.ok(
      checkContent(dir).failures.some((message) =>
        message.includes("Changed verification summary"),
      ),
    );
  }));
