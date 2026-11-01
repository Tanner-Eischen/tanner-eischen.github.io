import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { discoverPages, htmlReferences, siteOrigin } from "./site-files.mjs";

export function classifyExternal({ status, url, rateLimited = false }) {
  if (rateLimited || [408, 425, 429].includes(status) || status >= 500)
    return "inconclusive";
  if (
    status === 401 ||
    /\/(?:login|signin|sign-in)(?:[/?#]|$)/i.test(new URL(url).pathname)
  )
    return "authentication_required";
  if (status === 403) return "inconclusive";
  if ([404, 410].includes(status)) return "definitely_missing";
  if (status >= 200 && status < 300) return "accessible";
  return "inconclusive";
}
async function checkUrl(url) {
  const started = Date.now();
  try {
    let response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
    });
    if ([405, 501].includes(response.status)) {
      response = await fetch(url, {
        method: "GET",
        headers: { Range: "bytes=0-0" },
        redirect: "follow",
        signal: AbortSignal.timeout(10000),
      });
      await response.body?.cancel();
    }
    const status = classifyExternal({
      status: response.status,
      url: response.url,
      rateLimited:
        response.headers.get("x-ratelimit-remaining") === "0" ||
        response.headers.has("retry-after"),
    });
    return {
      url,
      final_url: response.url,
      http_status: response.status,
      status,
      elapsed_ms: Date.now() - started,
      scope:
        "Unauthenticated CLI HTTP response; no browser interaction or UI inspection.",
    };
  } catch (error) {
    return {
      url,
      status: "inconclusive",
      elapsed_ms: Date.now() - started,
      reason: error.cause?.code ?? error.name,
      scope: "Timeout/network failure is not evidence of a permanent outage.",
    };
  }
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
  const urls = new Set();
  for (const page of discoverPages(root))
    for (const reference of htmlReferences(
      readFileSync(resolve(root, page), "utf8"),
    )) {
      if (!/^https?:/i.test(reference)) continue;
      const url = new URL(reference);
      if (url.origin !== siteOrigin) {
        url.hash = "";
        urls.add(url.href);
      }
    }
  const pending = [...urls].sort();
  const results = [];
  for (let index = 0; index < pending.length; index += 4) {
    const batch = await Promise.all(
      pending.slice(index, index + 4).map(checkUrl),
    );
    results.push(...batch);
    for (const result of batch) console.log(`${result.status}: ${result.url}`);
  }
  const output = resolve(
    root,
    `docs/implementation/verification/external-links-${new Date().toISOString().replace(/[:.]/g, "-")}.json`,
  );
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(
    output,
    JSON.stringify(
      {
        checked_at_utc: new Date().toISOString(),
        method:
          "Unauthenticated CLI HTTP HEAD; GET only for unsupported HEAD. No browser/UI.",
        warning:
          "Accessible means an HTTP response, not verified demo behavior or artifact content. Inconclusive results retain local report/download fallbacks.",
        results,
      },
      null,
      2,
    ) + "\n",
    { flag: "wx" },
  );
  console.log(
    `Recorded ${results.length} external link states. This optional network check does not replace local build checks.`,
  );
}
