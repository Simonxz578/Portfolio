# Cosmic Run verification record

Updated **26 October 2026**, Asia/Shanghai. Working branch: `codex/kings-cosmic-run`; preservation baseline commit: `bdf8119`.

## Controlling identity and scene

The user accepted the ZIP A/B/C-derived half-length portrait, then rejected the generated full-body face as drifting and reattached the exact accepted PNG. That canonical image is the controlling face, hair, expression and visible upper-body source. Later generated heads and tie-only repairs are unselected. The selected clothing remains the canonical black academic gown, blue suit, white shirt and tie as shown.

The current entry is a native SVG composition. The missing lower-body continuation is inferred/generated, with its entire generated head physically cropped out of the embedded derivative. The scene uses the user's real King's College photograph and a welcoming sky-blue/lavender morning environment. The former studio-face/no-gown and dark-night trials are superseded and do not establish current acceptance or performance.

The user approved the canonical portrait. Source reuse, internal visual review and approval of an entire final animated scene are distinct facts; no biometric or exact-anatomy guarantee is made. See `COSMIC_RUN_ASSETS.md` for provenance, methods, selected files and the inventory snapshot.

## Canonical crop and media checks

Independently inspected the current `simon-entry.svg` (1,053,927 bytes; SHA-256 `392ef16d6bd706939f5fc9504f4891ec170bde3a70e0959cadbf64b761e060c0`). The canonical PNG's source SHA-256 is `d13897e51a68c4eb40164377150da5b244c0164312a53ba103ef2fd09081e602`, dimensions 1122 ×1402.

- The embedded lossless WebP crop at `(300,80)`, 510 ×740, decodes to **identical RGB** to that rectangle of the canonical PNG; maximum per-channel difference is **0**.
- The embedded lossless WebP crop at `(510,790)`, 205 ×612, also decodes to **identical RGB**, maximum difference **0**. These protect the selected face/hair/neck/collar and tie regions. This is source-pixel evidence, not a claim that browser resampling reproduces the full master bit for bit.
- The larger canonical torso/gown layer is a JPEG derivative. The separate generated continuation is a 1024 ×1256 JPEG, cropped from source y280; its generated head/hair are absent from the embedded image. Uniform SVG placement/masks handle the composition without a new face render. The outer +32-unit entry translation restores the approximately 98% sole anchor.
- The public résumé portrait is a 640 ×800 JPEG derivative of the same approved canonical image, not a crop of standing reference B. It is not a lossless identity proof by itself.
- All inspected public raster files and embedded raster derivatives have zero EXIF entries. No raw ZIP, full-resolution private master, reference pack, identity-analysis JSON or credentials were found among selected public delivery files. This is a bounded inspection, not a universal privacy guarantee.
- The current gown atlas is 1280 ×960 /195,650 bytes, four columns/two rows of 320 ×480 cells. Source normalization uses **8/21-pixel** downward row offsets; earlier 12-pixel normalization is obsolete. At alpha ≥128, stop frames **1 and 5** both have an exclusive bottom bound at **456/480 =95%**. More opaque thresholds differ by about one antialiasing pixel.

The atlas is a finite eight-pose rear-three-quarter stride. It has repeated poses and incomplete reciprocal arm motion. The front entry transitions to a separate rear-view sheet; it is not a continuously photographed/generated turn, rigged 3D animation, motion capture, or proof of zero foot sliding. These limitations remain visible scope boundaries.

## Current static checks

Preservation baseline: `/tmp/portfolio-cosmic-baseline.json`, captured before this rebuild with 25 HTML pages and seven original data-file hashes. New shared Chinese data files are allowed; original factual data remains protected.

Checks actually run by this audit:

| Check | Actual result / scope |
| --- | --- |
| `pnpm run check` | 26 October, 13:01 source snapshot: **54 files; 0 errors, 0 warnings, 0 hints** |
| `BASE_PATH=/Portfolio pnpm run check:build` | 12:53 output snapshot: **25 pages**, expected routes/local assets and public-safe output passed |
| `BASE_PATH=/Portfolio node scripts/check-cosmic-build.mjs /tmp/portfolio-cosmic-baseline.json` | Same output: one-page anchors/facts, direct résumé routes, scene hooks and supplemental privacy checks passed; five selected files, **1.55 MiB** |
| `BASE_PATH=/Portfolio node scripts/audit-redesign.mjs /tmp/portfolio-cosmic-baseline.json` | Original seven factual-data hashes, 25 routes, bilingual switches, canonicals, original external/contact URL set, fragments and CSS assets preserved |
| `git diff --check` | Passed at this source snapshot |

The auditor reports nine prose/list review items from previous home/résumé framing or capability-list formatting. Their underlying records remain in shared data and rendered HTML; they are not missing dates, roles, education or citation facts.

**Final rebuild required:** minor metadata-contrast and campus foundation-alpha edits follow the 12:53 output. Rerun type/build/output/preservation/privacy checks and refresh final asset hashes after that freeze. These snapshot results are not a claim that an unbuilt later edit already passed.

Use the existing pnpm lockfile/package manager. `npm ci` was not claimed. The existing GitHub Pages workflow still publishes `main` with `SITE_URL=https://simonxz578.github.io` and `BASE_PATH=/Portfolio`; no provider/domain/permission/secret change is required.

## Actual rebuilt scene evidence — IAB Chromium

The root agent operated the in-app Chromium browser. This independent audit opened the saved images and JSON under `output/cosmic-run-qa/ui-rebuild-20261026/` in the parent task's output directory; it did not itself operate that browser.

Reviewed images: desktop/mobile `start`, `25`, `50`, `75`, plus white endpoints. The new framed daylight composition gives a clear primary résumé action, four primary desktop destinations, the canonical person and a real campus view. Phone chapter sentences remain clear of the header and body. No obvious new face/neck halo or severe former trouser join is apparent at normal screenshot scale. The small phone face cannot establish fine likeness; the decoded-crop test above provides the source-use evidence.

`desktop-stages.json` records:

| Checkpoint | Scroll y | Progress | Header opacity | White field | Overflow |
| --- | ---: | ---: | ---: | ---: | ---: |
| 25% | 765 | .25000 | 1 | 0 | 0 |
| 50% | 1530 | .50000 | 1 | 0 | 0 |
| 75% | 2295 | .75000 | 1 | 0 | 0 |
| White | 2968 | .96993 | 0 | 1 | 0 |

`mobile-stages.json` at 390px records y0/p0, y633/p.25, y1266/p.50, y1899/p.75, and y2456/p.96998. All have zero horizontal overflow; header/white states are 1/0 before the endpoint and 0/1 at the endpoint. Recorded settled stride frames are supported frame1 at the intermediate stops.

Both actual white PNGs were independently checked with Pillow: **every content pixel is RGB `(255,255,255)`**, excluding only the 18px right scrollbar area. Desktop is 1440 ×900; mobile is 390 ×844. The root additionally observed reverse traversal back to p.25 restoring white0/header1, and reload at p.25 retaining y765/progress.25. `desktop-reverse-25.png` records the reversed composition. These are actual progress/state checks; stills alone do not verify every gait frame.

Visible issues reported before final fixes:

- The campus lower boundary looked like a hard cutout at 50/75%, especially the stepped left college base. Root is adding a foundation-edge alpha falloff after the real outline. Post-fade captures remain required; no different architecture or face is authorized.
- Small stage metadata `#5772a5` against representative sky colors calculated at about 3.95–4.18:1. Root is darkening the small text. Final contrast values need rechecking; the large Simon lettering has a different large-text threshold.
- User-facing implementation/loading notes are being removed. Final static/error/reduced-motion states should remain useful and readable without exposing internal production detail.

## Earlier functional evidence — recheck after structural UI changes

Root's earlier IAB Chromium pass is recorded in `output/cosmic-run-qa/morning-gown/`:

- At 1440px, Skip Intro landed the opening 110px below the top and clear of the 76px header; Projects landed at 160px. English switching retained the section at approximately 154px versus 160px.
- At 390px, Menu opened with focus on the first section, main content inert and background scrolling locked. Escape closed it, returned focus to Menu and cleared inert/lock. The Contact link closed the panel. Copy Email produced `Copied ✓` and `Email copied.`; `mobile-resume-bottom.png` shows this feedback.
- `responsive-widths.json` records English one-page widths 320/375/390/768/1024/1280/1440px, zero overflow at each, body 16px at phone widths and 18px elsewhere.
- `deep-route-320.json` records Chinese résumé, Work, Ninefold, IJSE and industrial case routes with appropriate titles/h1, zero overflow and no broken loaded images. This does not claim every offscreen lazy image was fetched.

These checks predate the latest four-link header, revised résumé/Work composition and final asset packing. Retest affected anchors, menu focus/inert/lock, language position, contact feedback and responsive routes after the final UI freeze. Earlier photographs/screenshots are not substituted for current identity evidence.

## Performance and browser limits

The optional `?cosmic-qa=1` diagnostics use buffered LCP observations, largest CLS session windows (≤5 seconds, gaps<1 second, recent-input shifts excluded) and rAF update intervals while progress changes. The DOM mirror supports isolated-world readers. Intervals describe update scheduling, not verified GPU paint performance. Instant native wheel jumps did not produce a meaningful interval sample; no 60fps claim is made.

Final frozen production-preview LCP/CLS/resource measurements remain pending. Development reload/resize values from earlier iterations must not be reported as final. The 1.55 MiB selected-file total is an uncompressed delivery-file inventory, not a measured initial network transfer or LCP value.

Actual operated browser scope so far: **IAB Chromium**. Responsive viewports are not physical iPhone/Android tests. No Safari/Firefox, simulated 4G, CPU throttling or low-end-device benchmark is claimed. Reduced-motion/no-script/error branches have source safeguards, but runtime reduced-motion validation of the final revision still requires recorded evidence.

## Bounded production-guidance discovery

Live GitHub metadata was checked on 25 October 2026 around 09:09 UTC. User-named `Simonxz578/aigc-character-skill` had 1 star, MIT license and pinned revision `2feaa7907287668886f1091f974b9c2cfb696781`; its skill/discovery/real-person/facial/cinematography guidance was read. This guidance does not supply a trained likeness model or prove generated motion quality.

Two star-sorted README searches were limited to five results each (`character animation skill` and `gsap scroll skill`, both with `in:readme fork:false archived:false`). Their broad awesome-list results were unsuitable. Directly inspected `remotion-dev/skills` had 5,661 stars / revision `6c67adcd9cdbe6eb84d76342da89b225f9161cb2`, unconfirmed license metadata; its React/video focus was not adopted. `LottieFiles/agent-skills` returned HTTP 404. No candidate was installed or paid external generation invoked; no global-best ranking is asserted.

## Pre-release status and deployment record

| Area | Status |
| --- | --- |
| Canonical accepted-source reuse | Verified for the listed entry hash and two protected lossless crops; human approval applies to the canonical portrait |
| Body/gait | Limited finite-pose 2.5D continuation; no full-body/biomechanical/continuous-video guarantee |
| Current source/output checks | PASS on final 26 October build and repeated integration/privacy/preservation checks |
| New 1440/390 progress/reverse/refresh/white | PASS recorded scope; final foundation/metadata view saved as desktop-75-final.png |
| Latest résumé/Work/anchor/menu/contact/responsive pass | PASS final 14-width matrix, 9 direct routes, anchor/language/menu/copy checks |
| Reduced motion / final performance | No-script render verified; OS reduced-motion is source-only; live metrics recorded after release |
| GitHub Pages deployment | This pre-release snapshot precedes push; final commit/Actions/live evidence accompanies delivery |

Root should append the final build timestamp, asset inventory refresh, current browser evidence, commit SHA, Actions run/result and verified English/Chinese URLs here. Do not report publication before the live site is checked.

## Final pre-release verification — 26 October 2026

- Production build at 13:14 client-day 26 October: Astro 54 files, zero errors/warnings/hints, 25 generated routes. Post-build route/asset/privacy checker, Cosmic integration checker and baseline preservation auditor passed. All seven original factual-data hashes remain unchanged. Nine old prose/layout review entries are reorganized introductions and capabilities, not missing factual records.
- Current IAB Chromium evidence: `output/cosmic-run-qa/ui-rebuild-20261026/`. `final-widths.json` records both languages at 320/375/390/768/1024/1280/1440px with zero horizontal overflow and 16px phone/18px other résumé body type. `final-route-320.json` records Work, Ninefold, industrial case, research, leadership, about, contact, and both direct résumé routes, with correct h1, no overflow, and no broken loaded images.
- `desktop-projects.png`, `desktop-work.png`, `mobile-work.png`, `mobile-ninefold.png`, current résumé opening and contact captures document the rebuilt product chapters and secondary UI. Skip Intro lands `resume-start` at110px, clear of the header. The final Projects anchor measured159.76px; switching to English retained the chapter at155.55px.
- Final mobile Menu test: first focus Projects, main inert and scrolling locked; Escape returned focus to Menu and removed inert/lock. The Contact link closed the panel. Copy Email produced `Email copied.`; current contact screenshot is `mobile-resume-bottom.png`.
- Resize preservation was checked: a desktop résumé opening at110px remained visible at126px after changing to390px, rather than falling below the screen. Prologue progress is preserved by the resize handler; ordinary wheel scrolling remains native.
- Post-foundation English75% capture: `desktop-75-final.png`. Small chapter metadata now computes to rgb(76,98,142), approximately4.99:1 on representative sky#dceafb and5.28:1 on#e9effa; reverse-caption rgb(76,98,131) is approximately5.27:1 on#e5edfb. These are palette checks, not a full-page accessibility certification.
- No-script rendering was actually checked with a local-only copy of the final HTML after removing all application script tags. At390×844 it had zero scripts, no `.js` class, no enhanced long scene, scene height793.36px, all8résumé sections, visible native navigation, hidden Menu button, and zero overflow. Evidence: `mobile-nojs-fallback.png`. The fixture was deleted from dist before final checks. This is not a claim that the browser’s global JavaScript setting was disabled.
- OS reduced-motion behavior is supported by explicit media rules and a short static layout; native OS/media emulation was not exposed by this IAB tool and was not performed. No Safari/Firefox/physical-device or throttled-network claim is made.
- The final selected entry remains a literal approved-source head/upper-body composition with inferred body extension. Motion remains a finite8-pose2.5D interpretation; repeated poses and limited arm alternation remain disclosed.

This is a pre-release snapshot. Final commit SHA, GitHub Actions result, measured live loading and HTTP checks are recorded with the delivered release evidence after publication; this build-time document does not assert a future deployment.


## Scoped cutout, Ninefold and footer patch — 26 October 2026

This patch follows release c562893. Only the full-body native silhouette/alpha joins, the primary Ninefold screenshot, its image-frame aspect ratios and the user-requested footer wording changed. The face, pose, clothing, scene placement, copy, links and factual data otherwise remain unchanged.

- Final entry SVG: 1,044,420 bytes, SHA-256 `df28c37b71e05d5bc0d8c109df7787efa316a39c3a87278f512c4aeb150f927b`. All four embedded photographic payloads are byte-identical to c562893, independently checked. The two protected lossless crops remain untouched.
- Source-resolution native SVG renders on sky, white and dark backgrounds were inspected. The old beige jaw/neck wedges, traced hair spikes, under-sleeve background wedges, broad trouser-side slabs and shoe-bottom matte were cleaned. A final shoulder check confirmed continuous opaque cloth after removing a translucent join triangle. These checks assess the contour; they do not claim new identity generation or new motion validation.
- Ninefold uses the complete supplied application screenshot (1920 × 1106 WebP, 320,426 bytes) in the homepage, Work card and case hero. Image frames follow the screenshot aspect, avoiding bars/cropping while retaining surrounding layout/copy/links.
- Latest production build: 54 Astro files, zero errors/warnings/hints, 25 routes. Post-build asset/route check, Cosmic integration/privacy check and preservation auditor passed. The seven original data hashes remain unchanged. Footer-removal assertions passed across every generated HTML file.
- IAB Chromium preview: Chinese homepage and its Ninefold figure at 1440px and 390px; Chinese Work and Ninefold case at 390px; English Ninefold case at 1440px; both-language footer text. All inspected routes had zero horizontal overflow and no broken loaded images. The screenshot's full composition is visible. Existing responsive/motion checks from the prior release are not represented as newly repeated here.
- Evidence lives outside the public repo at `output/edge-ninefold-20261026/`, including desktop/mobile captures and four-payload integrity JSON. Final publication SHA, Actions result and live-asset verification are recorded in that release evidence after publication.


## Ninefold content, transparent UI and sky-tint refinement — 26 October 2026

The user requested the current Ninefold product story/screenshots, followed by a visual refinement. An opaque cobalt proposal was explicitly rejected before publication. The final implementation preserves the original full cloud/landscape/path photograph and its view/depth/scroll geometry. Only alpha sky veils transition through night, dawn, sunset and clear sky; the new tint mask ends by 65% of image height, leaving the ground untouched. Transparent navigation/chapter/language pills replace solid cobalt tabs.

- Independent source-state comparison retains all 20 original state values for actor/building positions, scales, background-photo opacity/parallax/readability shade and white endpoint. The new tint weights are continuous and deterministic forward/backward. No new video, generated character, backdrop asset or continuous animation loop was introduced.
- Actual IAB Chromium desktop captures at approximately p0, .24935, .5, .75 and .98007 show the original landscape and sky tint cycle. The endpoint has computed white opacity1, and reverse traversal to p.25 restores dawn/white0. Screenshot codec artefacts are not treated as exact RGB evidence. The mobile sunset capture is p.49664.
- The eight-view homepage matrix covers English/Chinese at320/390/768/1440px, all with zero observed horizontal overflow and the selected entry photo loaded. Computed primary tab background is rgba(0,0,0,0); header glass is rgba(255,255,255,.64).
- Mobile Menu opens with focus on Projects, main/footer inert and body nav-open; Escape restores Menu focus, removes inert and releases the lock. These states were actually checked after the transparent UI change.
- The Chinese Ninefold case was inspected at1440/390/320px; the English case at1440px. The live screenshot assets load, the ASR/coaching image is present in the matching section, and inspected views show zero horizontal overflow. No TTS, invented efficacy/retention or third-subject claim is made. Product source and UI evidence are detailed in NINEFOLD_PRODUCT_UPDATE.md.
- Production route/asset/integration/preservation checks pass against the release-specific authorized baseline. Only Ninefold factual records and two legacy Ninefold entry URLs are authorized differences; every other project record is byte-identical. No script policy was weakened.

Final campus silhouette verification, asset inventory and publication evidence are recorded with the scoped release artifacts in `output/ninefold-product-20261026/`. Browser measurements are IAB Chromium responsive views, not physical-device, Safari/Firefox or throttled-network benchmarks.


## Scoped ear/campus and first-display patch — 27 October 2026

Both-language leadership records delete the complete2,000-person qualifier contribution, retaining the separate reach summary. Ear and campus alpha masks were repaired locally using the user-named AIGC character skill v3.0.0; all photographic payloads remain unchanged. The editable SVGs now compile to pixel-verified lossless runtime WebPs. Independent sky/white/dark composites show the lower-ear wedge, conspicuous cyan pole and right-campus background fragment removed in the inspected areas.

The controller waits for atlas decode, bounds late readiness to a140ms handoff and skips repeated state/frame writes. State/sky mathematics, CSS and scene geometry remain unchanged. Current QA includes controller failure/late-readiness branches and actual production-preview desktop progress/white/reverse captures. Local resource observations are not a simulated4G or low-end-device benchmark. Full details and limitations are in FIRST_LOAD_20261027.md; final deployment evidence accompanies the scoped release outside the public repo.
