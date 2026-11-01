# Tanner Eischen Portfolio

[![Portfolio checks and deployment](https://github.com/Tanner-Eischen/tanner-eischen.github.io/actions/workflows/pages.yml/badge.svg)](https://github.com/Tanner-Eischen/tanner-eischen.github.io/actions/workflows/pages.yml)

This repository contains [tanner-eischen.github.io](https://tanner-eischen.github.io), my software development portfolio.

## What’s here

- A responsive, single-page portfolio built with semantic HTML, modern CSS, and plain JavaScript
- Six project case studies with explicit source-access and evidence limits
- Accessible navigation, keyboard focus states, reduced-motion support, and structured headings
- Automated HTML, formatting, and local-link checks
- GitHub Pages workflow with quality and publication-readiness gates

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:8080`.

## Verify

```bash
npm run check
```

The check suite discovers and validates every public HTML page, both before
and after building. It checks formatting, landmarks, metadata, image declarations,
anchors, downloads, CSS imports/assets, JavaScript syntax, claim/project schemas,
evidence hashes and the original WHU per-image count aggregation. Negative checks
exercise unsupported metrics, changed evidence, held credentials, private source
links, nested routes, missing resources, traversal and filesystem junctions.

The check also uses Python's standard-library HTTP server to serve the built
artifact over loopback. It verifies every resource's bytes and Content-Length,
directory index routes, the manifest fingerprint, exact file inventory,
sitemap/robots metadata and the conservative 1.5 MB home-resource budget.
Ten negative/integration controls cover corrupt files, missing downloads, undeclared files,
path escape, changed fingerprints, a self-consistent wrong sitemap, excessive
resource size, evidence overwrite protection and report destinations outside
the validated artifact. No browser is opened.

```bash
npm run check:http -- --report docs/implementation/verification/new-http-proof.json
```

Choose a new report path for every saved run. Reports cannot overwrite earlier
evidence. The check uses Python 3.10+ without third-party Python dependencies;
CI explicitly selects Python 3.12. It does not measure browser layout,
keyboard interaction, accessibility conformance or network timing.

The seven existing routes are preserved. Additional pages under `case-studies/`,
`projects/`, `scientific-software/` and `ai-evaluation/` enter the same checks.
Only public pages and their referenced assets enter `dist/`; source/configuration
directories and hidden configuration files stay outside the generated site. The build emits a sitemap,
robots metadata and a hash-bound static build manifest. This identifies the
portfolio artifact; each project's handoff retains its own scientific provenance.

The mobile navigation stays visible until its JavaScript enhancement initializes.
This supports reading/navigation without JavaScript; browser layout, keyboard and
mobile journeys remain unverified under the current no-UI instruction.

```bash
npm run check:external
```

This optional CLI HTTP check records accessible, authentication-required,
definitely-missing and inconclusive states separately. It does not fail the
offline build on a timeout, treat a sleeping demo as a permanent outage, or
assert that an accessible URL proves application behavior.

`content/claims.json` records rendered wording and claims held for owner review.
Career entries trace to the existing résumé; that is a self-reported source,
not independent verification. `content/projects.json` separates source access,
local artifact evidence, and application readiness. `content/handoffs.json`
binds the three November 1 scientific packets by SHA-256. Repository README
snapshots record reported capabilities, not a fresh application test.

```bash
npm run check:release
```

Publication readiness is intentionally held while credentials, the unchanged
résumé, asset rights, interactive verification and publication approval remain
unresolved. Local checks can pass without asserting these release gates passed.
The deployment workflow checks this separately before uploading a Pages artifact.
Current user instructions prohibit browser/platform UI checks; none were run.

See `docs/implementation/WAVE1_HANDOFF_2026-11-01.md` for the current work,
preserved changes, test evidence, limitations and remaining dependencies.
The subsequent local implementation is recorded in
`docs/implementation/CONTINUATION_HANDOFF_2026-11-01.md`.

## Structure

```text
.
├── assets/             # Portrait, résumé, and retained media
├── css/style.css       # Layout, visual system, and responsive behavior
├── js/custom.js        # Navigation and progressive reveal behavior
├── scripts/            # Lightweight repository checks
├── index.html          # Portfolio content and metadata
└── .github/workflows/  # Quality gate and GitHub Pages deployment
```

## License

Portfolio content and personal assets are © Tanner Eischen. Source code may be reused with attribution.
