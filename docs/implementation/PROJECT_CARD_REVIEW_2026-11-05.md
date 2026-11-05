# Project-card review: November 5, 2026

The homepage now features six projects with inspectable examples: GeoSteering,
Roof Segmentation, MarsHab, HarborForge, Parametric Modeller and Ghostfolio.
Publishing Strategist, NLWebAgent and Socrates are removed from the homepage.
Their repositories, README snapshots and prior history are retained.

## Selection and remaining work

| Project | Decision | Reason and work still needed |
| --- | --- | --- |
| GeoSteering | Keep featured | Controlled synthetic comparison, reports and recorded browser workflow. Corrected stale unpublished/browser-unverified wording. Field validation and more realistic sensor/uncertainty experiments are research extensions, not prerequisites for showing the qualified synthetic work. |
| Roof Segmentation | Keep featured | Strong within-domain measurement and an honest external transfer failure. Linked the completed factorial study; later reused-test results remain developmental. Better geographic transfer is further research. Public cloud inference is not advertised. |
| MarsHab / MarsGIS | Keep featured | Real terrain inputs, routing outputs and a dated live explorer acceptance record. Keep the terrain-only and coarse-data limitations. Current service uptime is distinct from the November 1 application acceptance. |
| HarborForge | Add featured case | Actual four-model calibration, independent grading and bounded accounting now exist. Added the 24-trial case study and reference sample. Independent holdout and controlled mutation measurement remain future work. |
| Parametric Modeller | Keep with a bounded export case | Actual saved frames, cut lists and SVG/PDF/DXF exports are available. Published that example with exact artifact hashes and an actual drawing preview. **Still needs publication of the prepared source changes and browser/WebGL edit-save-reload-export acceptance.** The tested dirty local snapshot is not represented as the public base commit. |
| Ghostfolio Agent | Keep as supporting applied AI work | The existing field-scoped numerical verification example is concrete. Replaced confidence-score marketing with typed-tool grounding and linked the case study. Removed 24-challenge and 619-test headline counts that its small public receipt does not substantiate. **Still needs live-answer quality evaluation and a browser persistence/recovery workflow.** Its 11 fixed controls are not model-quality evidence. |
| NLWebAgent | Remove; reserve developer-tool project | The published fallback calls a nonexistent `model_selector.model`, while `DONE` can report success after errors. Fix provider dispatch, bind success to checked task expectations, and publish an assertion-bearing recorded browser example before restoring the card. |
| Socrates | Remove; reserve education project | The published default test command references a missing file; mocked prompt tests do not establish tutoring quality or a working persisted conversation. Fix scripts, finish one save/reload algebra dialogue, and score correctness, misconceptions and answer leakage before restoring. |
| Publishing Strategist | Remove; lowest revival priority | Current tests cover package metadata, and trend expansion includes synthetic data. Complete one niche-to-competitor-to-listing workflow with real or explicitly labeled fixture sources, score provenance and API/client integration before restoring. |

Removal is a presentation decision. None of these repositories was deleted,
made private or rewritten as part of this review. The new selection favors
scientific software, evaluation engineering and a distinct CAD example over
several overlapping unverified agent descriptions.

## Evidence examined

- The existing three scientific case studies and November 1 acceptance receipts.
- HarborForge's published November 2 and November 5 receipts and reproducible
  public case-study bundle at source `6f549055469a8c4f591857e44256bfa8bda6a29f`.
- Parametric Modeller's prepared frame artifacts: all 216 source hashes still
  matched the dirty local snapshot; 18 focused release tests passed. Only the
  small sanitized frame evidence and owner-generated CAD exports were imported.
- Ghostfolio's public receipt: 11/11 deterministic synthetic controls, 75
  assertion-bearing catalog cases, zero model calls. A fresh bounded grounding
  smoke passed 69 tests in the existing dirty checkout; it was not a new live
  model or browser evaluation.
- Published reserve-project source revisions, rather than unrelated dirty local
  variants: Publishing Strategist `29a9a34d329fc561fc99b229ab41b0413f158a64`,
  NLWebAgent `5ea12fd6be8a608463701081296d1236933ae1fa`, and SocratesTutoring
  `5d19420093e6b4393298d6fe04295da704383354`.

Pinned review sources:

- [NLWeb fallback and success state](https://github.com/Tanner-Eischen/NLWebAgent/blob/5ea12fd6be8a608463701081296d1236933ae1fa/agent/orchestrator.py),
  [selector API](https://github.com/Tanner-Eischen/NLWebAgent/blob/5ea12fd6be8a608463701081296d1236933ae1fa/models/model_selector.py),
  [retry contract](https://github.com/Tanner-Eischen/NLWebAgent/blob/5ea12fd6be8a608463701081296d1236933ae1fa/tests/test_retry_behavior.py).
- [Socrates scripts](https://github.com/Tanner-Eischen/SocratesTutoring/blob/5d19420093e6b4393298d6fe04295da704383354/package.json),
  [current deployment limits](https://github.com/Tanner-Eischen/SocratesTutoring/blob/5d19420093e6b4393298d6fe04295da704383354/README.md).
- [Publishing test scope](https://github.com/Tanner-Eischen/PublishingStrategist/blob/29a9a34d329fc561fc99b229ab41b0413f158a64/tests/test_package_metadata.py),
  [trend expansion](https://github.com/Tanner-Eischen/PublishingStrategist/blob/29a9a34d329fc561fc99b229ab41b0413f158a64/src/kdp_strategist/agent/tools/niche_discovery.py).

## Scope and verification

This review changes portfolio presentation and imports already-produced public
or owner-generated synthetic examples. It does not change the underlying project
applications, run paid models or launch new scientific experiments. Existing
untracked historical assets and dirty application checkouts are preserved.

Site validation covers formatting, HTML, content/evidence hashes, local links,
build inventory, HTTP resources and source-access declarations. New portfolio
browser checks are recorded separately from the older application acceptance.
Current publication review records use fresh evidence without overwriting the
November 1 release receipts.
