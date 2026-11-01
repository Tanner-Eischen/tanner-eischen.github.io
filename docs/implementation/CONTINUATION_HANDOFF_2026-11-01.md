# Local execution continuation

November 1, 2026. This continues the Wave 1 handoff on
`codex/portfolio-evidence-wave1`; the portfolio base commit remains
`ee2779fd48949bd6204ba7e53d56e269990e4660`. Work is uncommitted and unpublished.
Prior dirty files, scientific artifacts, model weights, original labels and the
earlier evidence packets are preserved. A continuation input snapshot is in
ignored `tmp/continuation-before/`.

## Plan and affected areas

Complete local PF-04 build coverage and fix the no-JavaScript navigation defect.
In parallel, implement MH-02 independent graph verification, execute the GS-02
backend workflow from the existing installed wheel, and connect RS-02/03 to the
authentic shared model path. Reuse existing engines and release source rather
than introduce second scientific implementations.

Portfolio changes affect build/link/content checking, shared public-page and
asset discovery, new negative checks, page metadata/breadcrumbs, mobile CSS and
the existing navigation script. Scientific changes stay in their owning repos.
No source-data or scientific-default change is intended. Main risks are broken
nested paths, accidentally packaged files, scientific provenance drift, false
inference readiness and confusing a local check with public/UI verification.

Verification uses source and built HTML checks, an asset dependency graph,
negative path/privacy/evidence cases, local HTTP byte checks and independent
scientific witnesses. Browser, deployment and paid-model steps remain separate.

## Portfolio build and navigation

- `scripts/site-files.mjs` discovers public page trees recursively, parses HTML
  with the already installed HTML validator, follows CSS imports/resources,
  resolves directory and root-relative routes, checks HTML fragments, and
  handles encoded file names, PDF fragments, downloads and local srcset images.
- The packager rejects unsupported URL schemes, path escape, filesystem
  junction escape, unlisted source/configuration directories and hidden
  configuration. It resolves the full graph before replacing `dist/`, retaining
  the last successful build when input references are invalid.
- The existing seven routes are preserved. Nested pages under `case-studies/`,
  `projects/`, `scientific-software/` and `ai-evaluation/` enter formatting,
  HTML, held-claim, privacy, source and built checks. There is no duplicate
  case-study framework or forced route migration.
- Every current page has canonical/social metadata. Case studies have breadcrumb
  navigation. All current informative images declare alternative text and
  intrinsic dimensions. Generated sitemap/robots metadata includes only intended
  public pages. A generated build manifest hashes the static output and records
  the portfolio base revision/dirty state separately from scientific provenance.
- Mobile navigation now remains visible until its JavaScript enhancement has
  registered. Escape closes an open menu and returns focus to its toggle; focus
  outlines also cover keyboard-focusable table regions. This is a source-level
  fix, not a claim of browser keyboard/mobile/accessibility conformance.
- Optional `npm run check:external` uses unauthenticated CLI HTTP requests and
  records accessibility, authentication, definitely missing and inconclusive
  states. Its reports use unique timestamped paths and cannot overwrite earlier
  reports. The initial check found 11 accessible responses and two inconclusive
  states, MarsHab hosting and LinkedIn. Neither inconclusive response is called
  an outage. Local reports/downloads remain available as fallbacks.

## New scientific evidence

### MH-02: independent finite-graph optimality

The independent checker reconstructs 2,359,894 directed edges from exported
cost/mask fields, using destination-cell cost, metric steps and no corner cutting.
SciPy Dijkstra matches all three archived objective costs within relative
tolerance `1e-6`. The reconstructed grid has 333,859 total and 300,500 passable
nodes. Corrupted CRS/cost/geometry and a valid-but-suboptimal detour are rejected.
The checker does not import the scorer/pathfinder.

77 targeted tests and Ruff passed; existing artifacts, the earlier public-safe
packet and historical source identity are unchanged. The new verification
supplement supersedes the old packet's missing graph-optimality check only.
The independent checker adds memory work; the earlier 1 GiB container record
has not been rerun for this change. No physical mobility or habitat-safety claim
is established, and fresh locked science regeneration remains pending.

Owning handoff: MarsGIS `docs/implementation/MH02_GRAPH_VERIFICATION.md`.

### GS-01/02: fresh installed backend and recovery controls

Two fresh seed-123 runs through the existing installed application backend
produced identical numerical summaries, SHA-256
`be1028dc40bde6feebdfa8696e58679c7a31ffcb81dc6a86a6be70a28a90333a`.
The synthetic results remain 38.07162079659706% HOLD versus
97.17426567844367% guided over the same 5,000 ft, with a known signed synthetic
sensor, one idealized scenario and one seed.

39 workflow/recovery tests passed, including 11 new abrupt-process interruption
cases. Reopen and relocated reopen agree; explicit export after changing a
current marker preserves immutable history and figures. An independent midpoint
witness agrees within 0.01 percentage points and 0.01 ft. Installed source and
dependencies were re-attested; this is not a fresh clean-install claim.

The fresh PDF has 13 pages/seven figures; the prior 14-page PDF is preserved.
Numerical and embedded-figure checks do not establish visual layout quality.
Browser/operator interaction, duplicate submissions, Linux and the full suite
remain unverified. The supplemental ZIP includes original targeted JUnit records,
the new report and compact proof JSON, without raw field data.

Owning handoff: GeoSteer `docs/implementation/GS02_LOCAL_WORKFLOW.md`.

### RS-02/03: shared authentic inference

The serving integration reuses the newer existing release implementation and
the shared prediction function. It binds weights, threshold, normalization and
class semantics to an explicit model release manifest. Missing or invalid
artifacts produce unavailable readiness; the former fabricated UI fallback is
removed. Generated-input CPU proof and the owning handoff record the exact
CLI/HTTP/independent-forward comparison. This is serving parity, not a new WHU
or external-region model-quality measurement.

45 Python tests, eight frontend unit tests, Ruff, ESLint and the production build passed. The required E2E source contracts now target genuine upload/readiness/download/failure behavior; their temporary Tiny-checkpoint backend passed HTTP controls and the TypeScript source passed syntax transpilation. Browser execution remains unrun. The new source cannot inherit an older container result; Docker's engine was unavailable, and dependency-advisory triage remains pending.
Browser interaction and a new container startup remain unverified.

## Evidence and verification records

`content/verification-supplements.json` binds new summaries and ZIP supplements
by SHA-256; original `content/handoffs.json` packets are retained. Supplemental
records have their own schema and tampering check. Current scientific case
studies link the new receipts while preserving previous reports and limitations.
The home-page/résumé review holds still apply.

The final portfolio suite passed 29 checks (17 claim/evidence checks and 12 site/link-classification checks), validated seven source and built pages, 120 references, 40 claim records and eight project records. All 52 built resources returned identical bytes over local HTTP; the conservative home resource total is 1,473,620 bytes, below the proposed 1,500,000-byte budget. Build-manifest hashes and all seven sitemap URLs were independently checked. These are static/HTTP results, not browser performance or visual/accessibility certification.

Actual portfolio check results and local HTTP receipts are recorded in
`verification/continuation-check-2026-11-01.json` and
`verification/continuation-http-2026-11-01.json`. Full terminal output is retained
in ignored `tmp/continuation-check.log`. The initial external-link report is
`verification/external-links-2026-11-01.json`.

Independent bounded review found no actionable current regression in the new
portfolio asset/build/HTML/link scripts. The scientific owning handoffs distinguish
fresh execution, earlier recorded results and checks not run.

## Acceptance, remaining gates and rollback

Local work advances PF-04, MH-02, GS-01/02 and RS-02/03. It does not complete R1,
all of Wave 2 or the four-wave roadmap. The site is not published, public source
snapshots do not automatically include the dirty tested releases, and browser
acceptance remains unrun under the user's no-UI instruction.

No push, merge, visibility change, deployment, cloud-plan change, paid-model call
or platform UI action occurred. Credential/career confirmation, reviewed résumé
replacement, rights/access decisions and publication approval remain open. The
publication check intentionally remains held. No UI exception was requested.

There is no data migration. Revert only this continuation's scoped edits using
the input snapshot and review new files individually; do not reset the checkout
to HEAD because that would discard substantial preexisting work. Prior scientific
outputs and packets remain available. Run lint and the relevant checks before
any later commit. The repeated export/import/hash workflow is suitable for a
shared handoff tool or skill after these first contracts are reviewed.

## Verification correction

The claim check caught a Windows default-encoding round trip in a registry edit.
The affected strings were corrected from their UTF-8 representation and subsequent
registry edits use explicit UTF-8. A widened formatter also reached an unreferenced
legacy stylesheet; that incidental change was restored only after its original
bytes, including working-tree CRLF endings, matched the recorded hash. Formatting
still covers every public HTML route without rewriting third-party CSS.

Suggested addition to the previously proposed repository rules: always specify
UTF-8 when reading and writing content registries on Windows, and scope formatters
to authored public inputs rather than retained third-party libraries.
