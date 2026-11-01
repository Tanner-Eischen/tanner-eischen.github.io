import Ajv from "ajv";
import { createHash } from "node:crypto";
import { readFileSync, realpathSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { discoverPages } from "./site-files.mjs";

const repository = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const digest = (path) =>
  createHash("sha256").update(readFileSync(path)).digest("hex");
const json = (path) => JSON.parse(readFileSync(path, "utf8"));
export function visibleText(html) {
  return html
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<!--[^]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(
      /&(?:amp|quot|apos|nbsp|lt|gt);/g,
      (entity) =>
        ({
          "&amp;": "&",
          "&quot;": '"',
          "&apos;": "'",
          "&nbsp;": " ",
          "&lt;": "<",
          "&gt;": ">",
        })[entity],
    )
    .replace(/&#(x[0-9a-f]+|[0-9]+);/gi, (_, code) =>
      String.fromCodePoint(
        code.startsWith("x") ? parseInt(code.slice(1), 16) : Number(code),
      ),
    )
    .replace(/\s+/g, " ")
    .trim();
}

export function checkContent(root = repository, { release = false } = {}) {
  const failures = [];
  const blockers = [];
  const ajv = new Ajv({ allErrors: true });
  const local = (path) => {
    if (isAbsolute(path) || path.includes(":"))
      throw new Error(`Nonlocal path: ${path}`);
    const target = resolve(root, path);
    const rel = relative(realpathSync(root), realpathSync(target));
    if (rel === ".." || rel.startsWith(`..${sep}`))
      throw new Error(`Outside root: ${path}`);
    return target;
  };
  const read = (path) => readFileSync(local(path), "utf8");
  const documents = {};
  for (const name of ["claims", "projects"]) {
    const data = json(resolve(root, `content/${name}.json`));
    const validate = ajv.compile(
      json(resolve(root, `content/${name}.schema.json`)),
    );
    if (!validate(data)) {
      failures.push(`${name}: ${ajv.errorsText(validate.errors)}`);
    } else {
      documents[name] = data[name];
      const ids = data[name].map((record) => record.id);
      if (new Set(ids).size !== ids.length)
        failures.push(`${name}: duplicate IDs`);
    }
  }
  if (failures.length) return { failures, blockers };

  const allPages = discoverPages(root);

  for (const claim of documents.claims) {
    try {
      for (const evidence of claim.evidence) {
        if (digest(local(evidence.path)) !== evidence.sha256)
          throw new Error(`Changed evidence: ${evidence.path}`);
      }
      if (claim.state === "rendered" && !claim.surfaces.length)
        throw new Error("Rendered claim has no surface");
      for (const surface of claim.state === "held"
        ? allPages
        : claim.surfaces) {
        const present = visibleText(read(surface)).includes(
          visibleText(claim.wording),
        );
        if (claim.state === "rendered" && !present)
          throw new Error(`Claim wording missing from ${surface}`);
        if (claim.state === "held" && present)
          throw new Error(`Held wording still rendered in ${surface}`);
      }
      if (
        claim.state === "rendered" &&
        claim.evidence.some((e) => e.kind === "planned")
      )
        throw new Error(
          "Planned evidence cannot establish a rendered achievement",
        );
      if (claim.hold_publication)
        blockers.push(`${claim.id}: ${claim.qualification}`);
      for (const quantity of claim.quantities ?? []) {
        if (!claim.evidence.some((e) => e.path === quantity.evidence_path))
          throw new Error("Metric evidence is not in the hashed evidence set");
        const value = quantity.json_pointer
          .slice(1)
          .split("/")
          .reduce(
            (node, key) => node?.[key.replace(/~1/g, "/").replace(/~0/g, "~")],
            json(local(quantity.evidence_path)),
          );
        if (value !== quantity.value)
          throw new Error(`Metric mismatch: ${quantity.name}`);
      }
    } catch (error) {
      failures.push(`${claim.id}: ${error.message}`);
    }
  }

  for (const page of allPages) {
    const html = read(page);
    if (/(?:file:\/\/|[a-z]:[\\/](?:Users|Windows)\b|sandbox:)/i.test(html))
      failures.push(`${page}: local machine or sandbox URL`);
  }
  const accessLedger = json(local("content/source-access.json")).repositories;
  for (const project of documents.projects) {
    try {
      const access = accessLedger.find((record) => record.id === project.id);
      if (
        !access ||
        access.repository !== project.source_repository ||
        (project.source_access !== "sanitized_showcase" &&
          access.visibility !== project.source_access)
      )
        throw new Error(
          "Source access contradicts the recorded API visibility ledger",
        );
      for (const path of [...project.evidence, ...project.pages]) local(path);
      if (project.image) local(project.image.path);
      if (project.source_access === "public" && !project.source_url)
        throw new Error("Public source has no source URL");
      if (access.visibility === "private") {
        if (project.source_access === "private" && project.source_url)
          throw new Error("Private source rendered as public URL");
        if (project.source_repository) {
          const rawRepository =
            `github.com/${project.source_repository}`.toLowerCase();
          if (project.source_url?.toLowerCase().includes(rawRepository))
            throw new Error(
              "Private source URL cannot be presented as a sanitized showcase",
            );
          for (const page of allPages) {
            if (read(page).toLowerCase().includes(rawRepository))
              throw new Error(`Private source URL appears in ${page}`);
          }
        }
      }
    } catch (error) {
      failures.push(`${project.id}: ${error.message}`);
    }
  }

  const imports = json(local("content/handoffs.json")).imports;
  const expectedHandoffs = {
    geosteering: "geosteering",
    marshab: "marshab",
    "roof-segmentation": "building-segmentation",
  };
  if (
    !Array.isArray(imports) ||
    JSON.stringify(imports.map((record) => record.project_id).sort()) !==
      JSON.stringify(Object.keys(expectedHandoffs).sort())
  )
    failures.push(
      "Expected exactly one handoff for each of the three Wave 1 projects",
    );
  for (const record of Array.isArray(imports) ? imports : []) {
    try {
      if (
        !documents.projects.some((project) => project.id === record.project_id)
      )
        throw new Error("Unknown handoff project");
      for (const kind of ["handoff", "archive"]) {
        if (digest(local(record[`${kind}_path`])) !== record[`${kind}_sha256`])
          throw new Error(`Changed ${kind} import`);
      }
      const handoff = json(local(record.handoff_path));
      if (handoff.project_id !== expectedHandoffs[record.project_id])
        throw new Error("Imported handoff project identity mismatch");
      if (
        !handoff.project_id ||
        !handoff.release_id ||
        !handoff.limitations?.length
      )
        throw new Error("Missing release identity or limitations");
      for (const metric of handoff.headline_results ?? [])
        if (
          !metric.unit ||
          !metric.denominator ||
          !metric.scope ||
          !metric.evidence
        )
          throw new Error(
            "Handoff metric missing unit, denominator, scope or evidence",
          );
    } catch (error) {
      failures.push(`${record.project_id}: ${error.message}`);
    }
  }

  const supplements = json(local("content/verification-supplements.json"));
  const validateSupplements = ajv.compile(
    json(local("content/verification-supplements.schema.json")),
  );
  if (!validateSupplements(supplements))
    failures.push(
      `Verification supplements: ${ajv.errorsText(validateSupplements.errors)}`,
    );
  else {
    const seen = new Set();
    for (const record of supplements.supplements) {
      if (seen.has(record.project_id))
        failures.push(
          `Duplicate verification supplement: ${record.project_id}`,
        );
      seen.add(record.project_id);
      try {
        if (digest(local(record.summary_path)) !== record.summary_sha256)
          throw new Error("Changed verification summary");
        if (digest(local(record.archive_path)) !== record.archive_sha256)
          throw new Error("Changed verification archive");
      } catch (error) {
        failures.push(`${record.project_id}: ${error.message}`);
      }
    }
  }

  // Independently aggregate the original held-out counts; no model inference is implied.
  try {
    const lines = read("assets/evidence/roof-whu-test-per-image.csv")
      .trim()
      .split(/\r?\n/);
    const headers = lines.shift().split(",");
    const sums = { tp: 0, fp: 0, fn: 0, tn: 0 };
    for (const line of lines) {
      const row = line.split(",");
      for (const key of Object.keys(sums)) {
        const value = Number(row[headers.indexOf(key)]);
        if (!Number.isSafeInteger(value) || value < 0)
          throw new Error(`Invalid ${key} count`);
        sums[key] += value;
      }
    }
    const baseline = json(
      local("assets/evidence/roof-segmentation.json"),
    ).baseline;
    if (lines.length !== baseline.samples)
      throw new Error("WHU sample count mismatch");
    for (const [key, value] of Object.entries(sums))
      if (value !== baseline.aggregate[key])
        throw new Error(`WHU ${key} mismatch`);
    if (
      Math.abs(
        sums.tp / (sums.tp + sums.fp + sums.fn) - baseline.aggregate.iou,
      ) > 1e-12
    )
      throw new Error("WHU aggregate IoU mismatch");
  } catch (error) {
    failures.push(error.message);
  }

  if (release) {
    const review = json(resolve(root, "content/release-review.json"));
    const gates = Array.isArray(review.gates) ? review.gates : [];
    const gateIds = gates.map((gate) => gate.id);
    for (const required of [
      "asset-rights-review",
      "interactive-verification",
      "publication-approval",
    ])
      if (!gateIds.includes(required))
        failures.push(`Missing required publication gate: ${required}`);
    if (new Set(gateIds).size !== gateIds.length)
      failures.push("Duplicate publication gate IDs");
    for (const gate of gates) {
      if (gate.state !== "satisfied")
        blockers.push(`${gate.id}: ${gate.reason}`);
      else {
        try {
          if (
            !gate.evidence ||
            digest(local(gate.evidence)) !== gate.evidence_sha256
          )
            throw new Error("satisfied gate needs hash-bound local evidence");
        } catch (error) {
          failures.push(`${gate.id}: ${error.message}`);
        }
      }
    }
    failures.push(...blockers.map((blocker) => `Publication held: ${blocker}`));
  }
  return {
    failures,
    blockers,
    claims: documents.claims.length,
    projects: documents.projects.length,
  };
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const result = checkContent(repository, {
    release: process.argv.includes("--release"),
  });
  if (result.failures.length) {
    console.error(result.failures.join("\n"));
    process.exitCode = 1;
  } else {
    console.log(
      `Validated ${result.claims} claims and ${result.projects} project records; WHU counts independently recomputed.`,
    );
    if (result.blockers.length)
      console.log(
        `${result.blockers.length} owner/resume review holds remain; this is a local draft check, not publication approval.`,
      );
  }
}
