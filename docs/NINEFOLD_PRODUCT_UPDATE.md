# Ninefold product evidence and portfolio refresh — 26 October 2026

## Scope

The user requested refreshing Ninefold from the former Rain/Leaf physics-only case into its current product value, screenshots and AI product decisions, then refining the portfolio sky and transparent navigation. Only Ninefold factual project records change. All other project records, dates, research citations, organisations and contacts remain unchanged. The full approved character photo is not regenerated or edited.

## Product evidence

Reviewed the currently published product UI at `https://ninefold-65f.pages.dev/` and the matching Unified V5 source at revision `33785cf` (25 October). Source inspection and observed UI are distinct evidence; no learning-effect, retention, universal provider-availability or voice-quality claim is inferred.

- Physics root entrances: Beginner, IGCSE, A-Level and BPhO / ESAT. History material is beginner content, not a fifth root entrance. Evidence: `src/physics/tracks/selection.ts:2–6` and the live Physics selector.
- Maths includes Cambridge 0580/0607/0606, 9709/9231 and UKMT JMC/IMC/SMC plus AMC8/10/12 profiles. Evidence: `src/maths/types.ts`, `src/maths/extension/routes.ts`, and live Maths routes. A dedicated third-subject curriculum is not asserted.
- Experiments combine apparatus/variable controls, deterministic model readings, data/graph work and Predict → Set up → Measure → Interpret → Evaluate guidance. Evidence: `src/experiments/LabWorkspace.tsx`, `LaboratoryNotebook.tsx`, `experimentGuide.ts`, and live current–voltage experiment. Readings and plans are temporary UI state, not a cross-session notebook.
- Question coaching uses the authored question/method/answer as context but selects canonical strategy IDs. The UI displays reviewed answer-free hints and records assistance. Evidence: `worker/src/questionCoach.ts:4–14`, `src/unified/QuestionCoach.tsx:17–29`; the live Maths coach was opened and its current hint/input screen captured.
- Inference routing uses DeepSeek `deepseek-flash` primary with GLM 4.7 Flash as bounded fallback, shared by learning tasks. Evidence: `worker/src/inference.ts:89–130`, `inference/deepseek.ts`. Recorded availability/semantic gate failures prevent blanket reliability claims. Providers are not assigned one per subject.
- Voice input records audio for Whisper ASR, returns editable text and requires explicit submission in learning/chat flows. Evidence: `src/physics/sky/useRecordedAnswer.ts:5–36`, `worker/src/physicsLearning.ts:21–40`, and the live question-coach control. No personal audio was recorded/uploaded during this review. No TTS, speaking avatar or full-duplex conversation is claimed.
- Shared practice supports 1–10 questions with paired Questions/Answers PDFs. Authored compilers determine numeric truth, wording and marking. Evidence: `docs/practice-count/README.md:3–7`, `worker/src/practice.ts:17–29`.
- Minimal local learning memory stores question fingerprints/date/subject/correct/support, with daily goals and calendar status. Chat transcripts are not retained as general long-term memory. Evidence: `src/unified/learningMemory.ts:5–35`, `docs/question-coach/README.md:17–21`. Event counts have no persistent user identifier and do not establish DAU/MAU/retention.

## Selected screenshots

The existing user-selected world hero remains unchanged. Four current UI screenshots were captured through IAB Chromium at 1600 × 1000, then encoded as quality-92 WebP without cropping or regeneration. They retain the original composition and native UI text. Every screenshot opens at full size for legibility. All four are lazy-loaded below the hero.

| Asset | Bytes | Content |
| --- | ---: | --- |
| `ninefold-experiments.webp` | 175,122 | I–V model, selected companion, five-stage experiment guidance |
| `ninefold-maths.webp` | 323,152 | Maths curriculum and competition entrances |
| `ninefold-physics.webp` | 325,616 | Actual four Physics entrances |
| `ninefold-dialogue.webp` | 304,006 | Maths question coach, authored hint, editable question and ASR control |

## Visual constraints

The user corrected an overly flat blue proposal: preserve the original cloud/landscape/path image, depth, building and actor placement; apply only transparent sky tints following scroll. Night → dawn → sunset → clear sky transitions remain native, reversible and reduced-motion aware. Navigation/chapter/language pills use transparent surfaces and fine double-outline selection rather than an opaque cobalt bar. Full white at the prologue endpoint remains intact.

## Preservation and validation

`output/ninefold-product-20261026/authorized-content-changes.json` records an exact comparison showing all non-Ninefold project records/type declarations byte-identical. The release-specific audit baseline authorizes only the two Ninefold project objects, entry-link map and replacement of two legacy Rain entry URLs; all other factual-data, language, route, contact and link checks remain active. Actual browser captures and final deployment evidence are kept outside the public source tree in that output directory.
