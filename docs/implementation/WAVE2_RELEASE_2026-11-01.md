# Wave 2 release — November 1, 2026

GS-02, MH-03/04, RS-02/03/04 and PF-04/05/06 are implemented and verified. The owner authorized browser testing, public repositories, commits and publication. Existing résumé and factual biography remain unchanged and are outside review scope.

| Project | Released source | Evidence and verification |
| --- | --- | --- |
| GeoSteering | `b6790a2e42f41c12ac9d5a2435872b56b63b3c20` | 147 tests; real browser QC/steering/forks, retained run selection, PDF/CSV downloads, keyboard/mobile; original 2,689 artifact hashes unchanged. [CI](https://github.com/Tanner-Eischen/GeoSteering/actions/runs/41304870447) |
| RoofSegmentation | `f13acdd9c3ccbfcefb658e3a3dcad7d457dfb561` | Real registered checkpoint, three byte-checked downloads, probability preview and recovery; 48 backend/10 frontend unit tests, five Tiny E2E controls plus real-checkpoint browser acceptance. [CI](https://github.com/Tanner-Eischen/RoofSegmentation/actions/runs/41301079811) |
| MarsGIS | `e11e3b9a1ccb7926b1f8684653b97b1d2204eee0` | 461 backend tests/one optional skip; 118 frontend tests; CTX/MOLA, WebGL, cancellation/stale-response and exports. Five scientific output files unchanged. [CI](https://github.com/Tanner-Eischen/MarsGIS/actions/runs/41304886757) |
| Portfolio | This release; deployed build manifest identifies exact source | 43 checks (18 content, 15 site/network-classification, 10 HTTP regressions), source/built lint, full loopback inventory, actual browser/keyboard/no-JS/reduced-motion/mobile and accessibility checks. |
| HarborForge | `1258728` | Public implementation/default branch and 124 offline checks. Paid/live-model trials remain Wave 3; no new empirical model result claimed. |

All five target repositories are public and their landing pages returned HTTP 200 in a fresh signed-out Chromium context. MarsGIS default branch now exposes its validated implementation; HarborForge default branch exposes its evaluation platform. Publication does not invent additional license grants.

## Real deployment acceptance

The existing Render service `marshab` remains on its unchanged free plan. Deploy `dep-dbjimhnavr4c73c3hosg` became live with the exact Mars source above. Backend byte fingerprint is `9bfed21f6dc9a89ef468332bb45967b7b19699a7dccae569a8d28f7e1b052428`; readiness verified pinned CTX and MOLA sources. Public CTX routing, byte-matched downloaded GeoJSON, MOLA keyboard routing and real Intel WebGL orbit/reset passed without application errors. See `reports/browser-acceptance-2026-11-01/mars-public-live.json` and screenshots.

The local 512 MiB/0.1 CPU journey, including recomputation, completed without OOM but reached its memory cap. No headroom or general capacity guarantee is claimed. No new paid service or model call was created. GeoSteering and RoofSegmentation are authentic locally runnable applications; no public inference host is advertised.

## Publication, integrity and rollback

The portfolio uses its existing Pages workflow and hash-bound release gates. CSS/script cache versions are derived from content bytes. `dist/build-manifest.json` records the commit and file hashes; the final browser receipt records the content fingerprint. Old scientific archives and measured rows remain immutable; the new shared browser receipt identifies later source revisions separately.

Current staged-source and built-artifact scans use official Gitleaks vendor rules, with allowances disabled and redacted private findings. No new restricted imagery, weights, private holdout or credential is included. An older exposure in the already-public portfolio history is documented privately; history was preserved.

Previous Pages revision: `ee2779fd48949bd6204ba7e53d56e269990e4660`. To roll back, revert the publication changes on main and let the same quality gates redeploy the prior content; do not force-reset remote history. Previous Render deployment: `dep-dbhucubm8hqs73cosnh0`, source `459973dba92dc5b82f9d24519fd333577646ae3a`. Render rollback must restore the previous deployment/source/data together; no rollback was performed.

The final Pages live-content and hash verification is retained as a separate post-deploy receipt. Existing unrelated Mars edits and untracked historical workspaces/assets were preserved. No advanced research, field-validation or paid-model claims were added. Wave 3 and optional Wave 4 work remain separate.
