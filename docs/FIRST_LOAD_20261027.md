# Scoped cutout and first-display patch — 27 October 2026

The user requested deleting the entire 2,000-person qualifier bullet, cleaning both ears and the campus sky/right edge, and reducing first-entry stutter while retaining everything else. Both-language leadership records remove only that complete contribution; the separate reach summary and other records stay intact.

## Asset repair and continuity

The explicitly named [AIGC character skill](https://github.com/Simonxz578/aigc-character-skill), local v3.0.0/revision `dcaf0951f007e4059b2e8740289a1b8e3307bf78`, was read and applied as an existing-source local repair. No new face, photo, model training, paid generation or source discovery was required. Editable SVG alpha contours remove the lower-ear beige wedges, detached right-campus background and cyan roof/pole residue. All embedded photographic payloads, the accepted face, clothes, placement and underlying architecture remain intact.

Independent native and runtime composites were examined on sky/white/dark backgrounds, including 3× ear and roof/right-edge crops. These checks found no release-blocking edge issue in the inspected regions. They do not substitute for the user’s likeness judgment or claim universal perfection.

## Runtime changes

The portrait is exported from its repaired SVG to lossless1024×1536 WebP:1,044,495 source bytes to333,310 delivery bytes (~68.1% smaller file). Campus is lossless1600×900 WebP:297,800 bytes. Together the two runtime files are631,110 bytes versus1,218,714 source SVG bytes (~48.2% smaller). Raw file bytes are not gzip transfer or real-world load time. The compiler validates alpha and visible RGB byte equality against the native source render; both maximum differences are0. Source SVGs remain editable and are not requested by the homepage.

The runner prewarms at low fetch priority and waits for image decode. A140ms handoff handles readiness after scroll; unchanged state/frame writes are skipped. No new continuous animation loop is introduced. QA-only DOM metrics now include resources and long tasks behind the existing `?cosmic-qa=1` opt-in. No production telemetry is added. Scene state/sky math, layout/CSS, other content and pictures stay unchanged.

## Verification scope

- Final Astro build:55 checked files,0errors/warnings/hints,25routes. Route/integration/preservation results and exact source/delivery hashes are retained in the release evidence.
- Controller harness covers decode readiness/rejection, late handoff0/70/140ms, unchanged writes, forced resize, bounded rAF, hidden/reduced/offscreen/disposed paths. A local fixture delayed the atlas response5seconds: actual browser snapshots show loading0 to ready1 without progress change; the intermediate140ms behavior is harness evidence, not a browser frame-by-frame recording. The fixture is outside the published output.
- IAB Chromium local production preview,1440×900: p.25/.75, white endpoint.98007 with opacity1, and reverse.25 with opacity0; no horizontal overflow in these views. At390×844 the current Chinese homepage and leadership chapter also show zero horizontal overflow and no broken loaded images; the deleted contribution is absent and the separate reach summary remains. Current captures are stored outside the public repo.
- Local first observations of the new WebP URLs: LCP116ms, CLS0, long tasks0; two ordinary cached reloads reported LCP72ms,CLS0. These are unthrottled local observations, not a controlled cold-cache, low-end-device, global network or real-world speed benchmark. No Safari/Firefox/physical-phone benchmark is claimed.

Publication is verified separately after the GitHub Actions run; final commit, run URL, live resource hashes and browser captures are recorded outside the public repository in output/load-cutout-20261027/RELEASE.md.
