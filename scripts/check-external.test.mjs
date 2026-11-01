import assert from "node:assert/strict";
import test from "node:test";
import { classifyExternal } from "./check-external.mjs";
test("network classification retains auth, missing and inconclusive states", () => {
  const check = (status, options = {}) =>
    classifyExternal({ status, url: "https://example.org/report", ...options });
  assert.equal(check(200), "accessible");
  assert.equal(check(401), "authentication_required");
  assert.equal(
    check(200, { url: "https://example.org/login?next=report" }),
    "authentication_required",
  );
  for (const status of [404, 410])
    assert.equal(check(status), "definitely_missing");
  for (const status of [403, 408, 429, 500, 503])
    assert.equal(check(status), "inconclusive");
  assert.equal(check(404, { rateLimited: true }), "inconclusive");
});
