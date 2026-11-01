# Wave 2 release — November 1, 2026

GS-02, MH-03/04, RS-02/03/04 and PF-04/05/06 are implemented and verified. The owner authorized browser testing, public repositories, commits and publication. Existing résumé and factual biography remain unchanged and are outside review scope.

| Project | Released source | Evidence and verification |
| --- | --- | --- |
| GeoSteering | `b6790a2e42f41c12ac9d5a2435872b56b63b3c20` | 147 tests; real browser QC/steering/forks, retained run selection, PDF/CSV downloads, keyboard/mobile; original 2,689 artifact hashes unchanged. [CI](https://github.com/Tanner-Eischen/GeoSteering/actions/runs/41304870447) |
| RoofSegmentation | `f13acdd9c3ccbfcefb658e3a3dcad7d457dfb561` | Real registered checkpoint, three byte-checked downloads, probability preview and recovery; 48 backend/10 frontend unit tests, five Tiny E2E controls plus real-checkpoint browser acceptance. [CI](https://github.com/Tanner-Eischen/RoofSegmentation/actions/runs/41301079811) |
| MarsGIS | `833b6f8024e6a02ff7cedfc7ece442a26e5d8cf0` | 463 backend tests/one optional skip; 118 frontend tests; CTX/MOLA, WebGL, cancellation/stale-response and exports. Five scientific output files unchanged. [CI](https://github.com/Tanner-Eischen/MarsGIS/actions/runs/41306775490) |
| Portfolio | This release; deployed build manifest identifies exact source | 43 checks (18 content, 15 site/network-classification, 10 HTTP regressions), source/built lint, full loopback inventory, actual browser/keyboard/no-JS/reduced-motion/mobile and accessibility checks. |
| HarborForge | `1258728` | Public implementation/default branch and 124 offline checks. Paid/live-model trials remain Wave 3; no new empirical model result claimed. |

All five target repositories are public and their landing pages returned HTTP 200 in a fresh signed-out Chromium context. MarsGIS default branch now exposes its validated implementation; HarborForge default branch exposes its evaluation platform. Publication does not invent additional license grants.

## Real deployment acceptance

The existing Render service `marshab` remains on its unchanged free plan. Final deployment `dep-dbjj1ge417fc73av5gkg` is live from `833b6f8024e6a02ff7cedfc7ece442a26e5d8cf0`, at backend byte fingerprint `811318c993b328bdacc83503e408628bf6714fa742d5ee44d202eda563b77e69`. Readiness verified pinned CTX and MOLA sources. Public routes, keyboard entry, real Intel WebGL orbit/reset, downloaded GeoJSON and the full new comparison passed without application errors. See `reports/browser-acceptance-2026-11-01/mars-public-after-csr.json`.

The first hosted full recomputation exceeded memory; its failure and root-cause correction are retained below. The corrected warm local 512 MiB/two-CPU run peaked at 360,071,168 bytes. The final public ordinary HTTP smoke passed in 212.7 seconds on the unchanged free service. These are observed journeys, not general capacity or latency guarantees. No new paid service or model call was created. GeoSteering and RoofSegmentation remain authentic locally runnable applications; no public inference host is advertised.

## Publication, integrity and rollback

The portfolio uses its existing Pages workflow and hash-bound release gates. CSS/script cache versions are derived from content bytes. `dist/build-manifest.json` records the commit and file hashes; the final browser receipt records the content fingerprint. Old scientific archives and measured rows remain immutable; the new shared browser receipt identifies later source revisions separately.

Current staged-source and built-artifact scans use official Gitleaks vendor rules, with allowances disabled and redacted private findings. No new restricted imagery, weights, private holdout or credential is included. An older exposure in the already-public portfolio history is documented privately; history was preserved.

Previous Pages revision: `ee2779fd48949bd6204ba7e53d56e269990e4660`. To roll back, revert the publication changes on main and let the same quality gates redeploy the prior content; do not force-reset remote history. Previous Render deployment: `dep-dbhucubm8hqs73cosnh0`, source `459973dba92dc5b82f9d24519fd333577646ae3a`. Render rollback must restore the previous deployment/source/data together; no rollback was performed.

The final Pages live-content and hash verification is retained as a separate post-deploy receipt. Existing unrelated Mars edits and untracked historical workspaces/assets were preserved. No advanced research, field-validation or paid-model claims were added. Wave 3 and optional Wave 4 work remain separate.

## Hosted memory finding and completed correction

At 12:14:59 UTC the first ordinary full hosted comparison recomputation, after warm map/routes, caused a provider-confirmed 512 MiB OOM restart. Earlier public explorer checks passed, but this finding reopens MH-04. Local container fit did not prove hosted recomputation reliability. The failed attempt is retained in `reports/browser-acceptance-2026-11-01/mars-public-comparison-oom.json`; the allocation fix in `833b6f8` preserves exact graph bytes and reduced construction peak from 181.4 MB to 42.6 MB. A warm 512 MiB/two-CPU run peaked at 360,071,168 bytes, without limit pressure, and retained all five scientific files byte-for-byte. No paid plan change or silent reference substitution is authorized.

The corrected Render deployment `dep-dbjj1ge417fc73av5gkg` is live at backend fingerprint `811318c993b328bdacc83503e408628bf6714fa742d5ee44d202eda563b77e69`. The ordinary full public smoke passed in 212.7 seconds; the browser displayed its new server-computed result. Provider events through 12:38 UTC showed no OOM/restart. Maximum minute-sampled usage was 303,468,540 bytes, not an instantaneous peak. All five remote CI jobs passed. MH-04 is now closed.

Cross-environment verification found exact bytes for both rasters, the report and comparison PNG. GeoJSON has identical structure and route vertices with 27 rounding-scale numeric differences (maximum coordinate difference 3.55e-15 degrees; four cost differences at most 1.46e-11). This passes an explicit eight-machine-epsilon scaled tolerance; it is not described as cross-environment byte equality. The failed first deployment attempt is retained rather than overwritten.
