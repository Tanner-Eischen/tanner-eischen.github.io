# Wave 1 local execution handoff

November 1, 2026. This is a local implementation and evidence-preparation result,
not a public release. No commit, push, merge, visibility change, deployment,
paid-model call, browser action or platform UI inspection was performed.

## Plan and baseline

Start with PF-01 and independently prepare GS-01, RS-01 and MH-01/02 evidence.
Reuse the existing static portfolio, case studies, validation engines and newer
dirty releases. Do not rebuild applications or rerun training for presentation.

Portfolio repository: `Tanner-Eischen/tanner-eischen.github.io`. Both HEAD and
freshly fetched `origin/main` were
`ee2779fd48949bd6204ba7e53d56e269990e4660`. Local work is now on
`codex/portfolio-evidence-wave1`, at that same commit plus uncommitted changes.
There is no result commit yet. Prior dirty work was preserved, including all six
case studies, release assets, build/link extensions, CSS and JavaScript. A
pre-edit file/hash snapshot and editable-file copies remain in ignored
`tmp/wave1-before/`. No preexisting files were removed; the résumé is unchanged.

Affected portfolio files: `index.html`, three scientific case studies, raster
image dimension attributes on existing case studies, `package.json`/lock,
`README.md`, the Pages workflow, new `content/` records and schemas,
`scripts/check-content.mjs`, its negative checks, scientific packet downloads,
and this handoff. Existing engines/build layout are retained. Ajv is now an
explicit pinned development dependency at the already installed 8.20.0 version.

Dependencies and risks: credentials and career numbers require owner input;
the PDF cannot silently be treated as independent credential evidence; source
access, dirty-source identity, image rights and old/new experiment boundaries
must remain explicit. Scientific results are not recomputed model performance.
Verification uses schema, hash, metric aggregation, static HTML/link/build and
local HTTP checks. Browser/platform UI work is prohibited by current user
instructions and remains unrun.

## Implemented outcomes

| Package      | Local result                                                                                                                                | Outstanding acceptance                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| PF-01        | 37-record home/résumé claim inventory; neutral doctorate wording; unresolved career numbers held; role title aligned; résumé revision draft | Owner credential/number/date confirmation and reviewed PDF replacement                               |
| PF-02        | Existing three science case studies extended with compact versioned handoff/downloads; GeoSteering leads the home page                      | Final approval/access/rights; no complete release claim                                              |
| PF-04 subset | Eight project records, schemas, evidence/metric checks, publication hold gate, seven-page build checks, image dimensions                    | Wider route/metadata/external-state requirements are not claimed complete                            |
| GS-01        | Public-safe local packet with current report, seven figures, summary, run identity and replay history                                       | Stable public publication; fresh full reproduction and operator walkthrough                          |
| RS-01        | Compact original-WHU packet, count/source/dataset checks, research-first README                                                             | Public publication; qualitative imagery rights/empty-background group                                |
| MH-01/02     | Sanitized compact terrain handoff and fresh existing static verifier                                                                        | Public access decision, rights, full-graph shortest-path check and fresh locked reference generation |

The three handoffs live in the owning repositories under `reports/`; copied
portfolio handoffs and ZIP downloads are bound by `content/handoffs.json`.
That record contains the exact imported hashes and sizes. Downloads are linked
on each scientific case-study page; no browser-runtime private repository fetch
or credential is introduced.

## Claims and scientific boundaries

- Career evidence remains self-reported from the original résumé, with pending
  owner confirmation recorded. This does not allege that a held claim is false.
  The original PDF SHA-256 is
  `c02f5fc78269a64ad40cefb1207145aabc0db7aac5d8d900d93f1497ff830655`.
- GeoSteering's 38.0716%/97.1743% comparison uses the same 5,000-ft synthetic
  interval, one 2D scenario/seed and a known signed GR calibration. Public base
  commit and tested dirty snapshot are distinct. The older, unlinked
  `geosteering-figures.json` describes canonical-v2 and remains unchanged;
  it does not substantiate the current comparison.
- WHU count aggregation reproduces IoU 0.8921192509468081 on 2,416 tiles.
  The RS-01 packet identifies dirty training ancestry `68f906e…` by exact source
  hashes, rather than relabeling the run as pristine later source. Later test
  reuse is development work. External transfer figures remain recorded release
  results; they were not rerun in this session.
- MarsHab's preserved newer release uses 1 GiB/two CPUs, with recorded peak
  734,089,216 bytes. The plan's proposed 512 MiB gate is not satisfied. The
  current static checker validates geometry/scores/accumulated route costs,
  not full-graph optimality. Terrain scores are not safety probabilities.
- GitHub API visibility checks found GeoSteering and RoofSegmentation public,
  MarsGIS private. This is API metadata evidence, not a signed-out UI journey.
  Existing MarsHab hosting is separate from the newer uncommitted local release.

## Verification performed

| Check                                                             | Observed result                                                                                                                                                        | Record                                                                                  |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Initial `npm run check` before edits                              | Passed existing seven-page suite                                                                                                                                       | Terminal output; pre-edit files preserved                                               |
| `npm install --save-dev --save-exact ajv@8.20.0 --ignore-scripts` | Explicit existing-version dependency; npm reported zero vulnerabilities in 15 audited packages                                                                         | Package/lock files and terminal output                                                  |
| Final `npm run check`                                             | Formatting, HTML, 101 local references, JS, schemas/claims/hashes, WHU aggregation, 16 validator checks and build passed                                               | `verification/portfolio-check-2026-11-01.json`; full log in `tmp/wave1-final-check.log` |
| `node --test scripts/check-content.test.mjs` (via check)          | 16/16; altered evidence/download, missing metric context, invented metric, dropped quantities, held credential, private source, planned evidence, corrupt CSV rejected | `scripts/check-content.test.mjs`                                                        |
| Built-site local HTTP check                                       | All 43 built resources returned 200 and matched exact bytes                                                                                                            | `verification/local-http-2026-11-01.json`                                               |
| Conservative home static-resource budget                          | 1,472,905 uncompressed bytes, below proposed 1,500,000 budget; includes lazy home images                                                                               | Same HTTP record; no browser timing claim                                               |
| Pre-edit comparison                                               | Zero prior files removed; résumé bytes preserved                                                                                                                       | `verification/change-scope-2026-11-01.json`                                             |
| `git diff --check`                                                | Passed                                                                                                                                                                 | Terminal output                                                                         |

Fresh project checks are recorded in the owning handoffs. GS-01 checked saved
replay/analytic controls, 100 decisions/600 KPIs, report numerical rows/figures,
269 release hashes and 77 current source hashes. RS-01 rehashed all 8,188
original image/mask pairs, checkpoint/manifest, 16 saved source members, 40
epochs/calibration, 2,416 metric rows and 12 payload hashes. MH-01/02 ran the
existing independent static reference checker, export scan, Ruff and eight
payload hashes. These checks establish their stated artifacts; earlier full
suites, clean installs and container runs remain historically recorded evidence.

## Publication controls and unrun work

`npm run check` permits a valid local draft while reporting review holds.
`node scripts/check-content.mjs --release` deliberately fails while owner/resume,
rights, interactive verification and publication gates are pending. The Pages
workflow runs that release check before uploading a deployment artifact.
Changing a satisfied gate requires a hash-bound local evidence reference; required gate IDs cannot be removed. A badge alone
does not establish verification. This is a check for the declared records, not
an exhaustive semantic fact-check of all prose.

No browser/mobile/keyboard/WebGL/no-JavaScript journey, visual regression,
fresh training/inference, new model trial, scientific sensitivity study,
public download journey or live deployment was performed. Original claims and
case studies beyond the scoped home/résumé inventory still need their final
release review. The global no-UI instruction takes precedence over the plans'
browser steps; no exception was requested.

## Migration, rollback and next dependencies

No source data, labels, model weights or scientific assumptions changed. No
database migration is needed. Before any commit, rerun lint/checks. Do not
blindly restore from HEAD: it would discard the substantial work present before
this session. For rollback of this turn only, compare the pre-edit snapshot,
restore just its changed files, and remove only individually reviewed new paths.
Existing source histories/releases and the original résumé remain intact.

Next: owner confirms credential/career facts, reviews the proposed résumé
revisions, and chooses a MarsHab public access alternative. The local evidence
packets unlock case-study review now; publishing still requires the concrete
approval/access/rights gates. Optional research, paid model trials and deployment
are separate steps. The repeated export/checksum/handoff pattern is a useful
candidate for a future shared skill once these first contracts are reviewed.

## Review correction and proposed repository rule

Independent review found and corrected four validator gaps: required release
gates could be omitted, privacy classification was not cross-checked against
the API ledger, held wording was limited to one declared page, and duplicate
handoffs could replace a required project. Six regression checks cover the
fixes, including explicit embedded project-ID matching and a sanitized-showcase badge attempting to expose a private raw repository.

Suggested `AGENTS.md` addition, not applied:

> Validate release requirements by fixed required IDs, cross-check source access
> against its evidence ledger, and bind imported handoffs to unique project and
> release identities. Check held wording across every published page. Exercise
> missing, duplicated and relabeled records in negative checks.
