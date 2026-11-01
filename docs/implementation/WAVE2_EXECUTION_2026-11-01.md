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
