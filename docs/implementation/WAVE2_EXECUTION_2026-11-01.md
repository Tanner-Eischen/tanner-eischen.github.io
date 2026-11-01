# Wave 2 local execution

## Plan, scope and preserved work

Continue from portfolio `8292cd1`, MarsGIS `c9908c2`, GeoSteer `9985f5d` and
RoofSegmentation `0c239f6`. Preserve prior uncommitted Mars release work, historical
scientific packets, source data, labels, model weights and earlier runtime profiles.
No model research, browser/UI operation, publication, push, visibility change or
cloud-plan change is part of this work.

Independent work packages: supported Roof serving profile and actual container
readiness/inference; Mars HTTP request identity, stale-job handling and current
container acceptance; GeoSteering explicit form/view/run/report binding; portfolio
repeatable build-to-HTTP verification. Reuse existing model, routing, simulation
and packaging engines rather than duplicate scientific implementations.

Portfolio affected files are the npm scripts, Pages workflow, Git attributes,
README, two standard-library Python verification/test files, this handoff and
versioned results. Risks are artifact/hash drift, unsupported claims of browser
or production readiness, implicit Python availability in CI, and accidental
evidence overwrite. Tests cover actual loopback serving plus corrupted/missing
metadata, inventory, path, budget and immutable-report controls. CI's Python
setup action is pinned to the v5 commit verified through GitHub's API.

## Native container engine discovery

The Windows Docker context targets a stopped Docker Desktop engine. A read-only
Desktop CLI status check confirmed it was stopped, and the Windows helper service
could not be started with the available SCM permissions. No Desktop UI was opened.

A separate native Docker Engine is already running in Ubuntu under WSL. Explicit
`C:\Windows\System32\wsl.exe -d Ubuntu -- python3 -c ...` reaches its permitted
Unix socket and reports Linux Docker 29.1.3. A PowerShell `wsl` wrapper did not
forward the earlier stdin probe, so the explicit executable is used. Existing
cached Roof/Mars release images are available. Two unrelated containers were
already running and are outside this task.

Container checks use only their own uniquely named containers, at 1 GiB/two CPUs,
with explicit image/source/lock identity, read-only model/source mounts where
applicable, loopback publication and no Docker socket inside the application.
Roof and Mars use the engine sequentially; no global pruning or unrelated
container/volume operation is permitted. Derivative images are identified as
derivatives of exact cached images, not claimed as clean original-Dockerfile builds.

Earlier records of unrun container checks remain historical. This new native
engine evidence supplements them without changing old artifact hashes or
retroactively claiming old source was executed.

## Portfolio repeatable HTTP verification

`scripts/verify_built_site.py` checks a generated artifact's exact file inventory,
each SHA-256 and its overall fingerprint, sitemap and robots metadata before
starting a loopback Python HTTP server. It requests every public file plus
directory-index aliases, checking status, body bytes and Content-Length. It
counts a conservative uncompressed home resource set including CSS dependencies.
The proposed budget remains 1,500,000 bytes, not a network timing guarantee.

The CLI and ten standard-library tests are included in `npm run check`.
`npm run check:http -- --report <new-path>` saves an immutable UTF-8 receipt;
existing output paths reject. Report destinations must resolve outside the
validated artifact so a successful receipt cannot invalidate its inventory.
No third-party Python dependency is required.
The Pages workflow explicitly installs Python 3.12; local Python 3.10 is also
tested. Existing publication-readiness holds remain enforced separately.

These are static artifact/HTTP checks. They do not establish browser rendering,
keyboard/mobile behavior, WebGL or accessibility conformance. Browser work remains
excluded under the user's no-UI instruction; no exception was requested.

A dedicated focus-ring color is checked against the declared flat page palette.
Its computed contrast is about 4.59:1 against paper and 3.94:1 against dark ink;
the old light-background figure was about 2.80:1. The stored calculation is a
source-level color check, not a rendered-state or accessibility certification.

Suggested future repository rule: scope Docker-unavailability conclusions to the
checked context and inspect already-authorized native CLI engines before marking
container gates blocked. A missing Desktop pipe is not proof that every engine
on the host is unavailable; this never permits a browser/UI fallback.

## Recorded verification

Portfolio commit `db19618` includes the HTTP verifier, its destination guard,
explicit Python CI setup and focus color. The complete source and exact staged
checkout checks passed: 29 JavaScript controls plus ten standard-library Python
controls, seven pages and 120 references. All 52 built resources and the home
directory alias passed 53 actual loopback HTTP requests. The conservative home
resource total is 1,473,644 bytes. Python 3.10.11 and 3.12.14 both passed the new
controls; Ruff lint/format also passed. Receipts are in
`verification/wave2-check-2026-11-01.json`,
`verification/wave2-http-verified-2026-11-01.json` and
`verification/wave2-static-contrast-2026-11-01.json`.

The verification review caught a report destination inside the validated build
directory, which would have changed its inventory after a passing check. The CLI
now rejects resolved descendants before checking/writing; a regression verifies
failure without artifact mutation. Original reports remain unchanged.

GeoSteer commit `9176b26` binds actual steering/report views and submissions to
selected runs and captured interpretation versions. Sixteen targeted controls,
an installed-handler-to-export/reopen acceptance command and the fresh numerical
reference passed. The prior 129-test run remains historical to source 0.2.1.
The current source is 0.2.2; original numerical results and 2,689 historical
artifact hashes are unchanged. See GeoSteer
`docs/implementation/GS02_OPERATOR_WORKFLOW_2026-11-01.md` and
`output/gs02-operator-workflow-2026-11-01/final-validation.json`.

RoofSegmentation commits `6c16a49` and `003aab5` promote exact platform-specific
CPU locks, declare supported-runtime identity, and verify both a fresh Windows
installation and the original multistage Dockerfile. The fresh 65-package
mandatory-hash install passed dependency checks, 48 tests and real-model parity.
The original Dockerfile built in 181.52 seconds using normal BuildKit cache, resolving base digests and all
64 Linux lock packages; the source image ID is
`sha256:386d132222c6efd3254eb080629a709b228794cea3b20eeedf22931d6c656498`.
At 1 GiB/two CPUs, CLI/HTTP artifacts matched exactly, delivered frontend bytes
matched the image, invalid/oversized requests returned 400/413, concurrent
requests returned 200/503, and missing weights returned 503. Own containers
stopped without OOM. Cross-platform differences remain tolerance-qualified, and
the generated fixture is not new building-quality evidence. See RoofSegmentation
`reports/wave2-serving-profile-2026-11-01/README.md` and
`reports/original-multistage-2026-11-01/README.md`.

MarsGIS coherent commit `6482f99` includes the directly used, reviewed earlier
profile inputs with the new request/readiness/client contracts. Its clean staged
source passed 460 backend tests with one known Windows skip, 115 frontend tests,
TypeScript checking and lint. Exact archive/index newline representations are
recorded rather than falsely asserted byte-identical. The earlier derivative
container proof remains separately versioned at
`reports/mh03-loopback-container-2026-11-01/`; it exercised actual CTX/MOLA
route/export identities, missing-source live/ready 200/503 and a 202/409/409
overload burst at 1 GiB/two CPUs, with no OOM. Memory observations apply to that
declared journey, not production headroom or full candidate-analysis capacity.

The original Mars multistage Dockerfile also passed, separately from the earlier
derivative. It built in 191.13 seconds from clean source commit `6482f99` with a
documented context-exclusion overlay and unchanged Dockerfile. Its actual
acquisition step fetched and verified 33,177,600 MOLA bytes and 9,662,387 CTX bytes.
The resulting image is
`sha256:215303ce321634736b84d5654588fa993b6609a3167800b407a167d8716eb5ff`.
Actual CTX/MOLA route/request/export/static and overload checks passed at 1 GiB
and two CPUs, with peak observed memory 340,197,376 bytes, no OOM and a
202/409/409 burst. All own test containers were removed. These observations
apply to the recorded selected-point/HTTP journey, not every research workflow.
See MarsGIS `docs/implementation/MH03_ORIGINAL_CONTAINER_GATE.md` and
`reports/mh03-original-container-2026-11-01/` for its separate source/build,
acquisition, resource and HTTP receipts. The earlier cached-runtime evidence
is unchanged.

## Remaining acceptance

These results do not complete browser, Streamlit, WebGL, keyboard/mobile or
deployed-site acceptance. The original publication gates for credentials, asset
rights/access and explicit publication approval remain active. No public source
visibility, cloud plan, deployment or provider-spend change occurred. Earlier
scientific packets, labels, data and runtime profiles remain preserved.
