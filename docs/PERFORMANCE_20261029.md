# Site loading and interaction refinement — 29 October 2026

The user requested smoother first entry, page/tab switching, image delivery and scrolling across screen sizes, then publication. Existing text, source photographs, accepted identity, scene colour/coordinates and links are retained. The work began28October and final validation/publication is29October in Asia/Shanghai.

## Changes

- Native Astro7 hover/focus prefetch prepares only a same-origin destination the visitor interacts with. Existing native navigation, history and no-script links stay intact. Source-image links opt out. No full-site prerender, service worker, third-party CDN, router or tracking service was added. The installed Astro prefetch implementation rejects external/current-document URLs, deduplicates requests, respects save-data/2G and uses tap on constrained connections.
- Header and chapter scripts cache geometry, batch scroll updates and skip unchanged DOM writes. Image/font/layout changes invalidate the cache. Only real document-width/chapter-layout changes restore reading position; mobile browser-chrome/keyboard resizes with unchanged layout no longer call scrollTo. Menu focus/trap/inert, anchors and bilingual reading progress retain their original behavior.
- The scene retains byte-identical pure state/sky formulas. Moving architecture, person and shadows now use fixed layout anchors plus equivalent leaf transforms; cached style writes avoid repeated inherited-variable changes. Only active/visible layers and transitioning sky veils request compositing hints. Hidden/offscreen/reduced/failure/disposed paths cancel pending rendering/resize work. Decode gating,140ms late-asset handoff and grounded stop frames remain.
- The same accepted front composition now has lossless512/768w WebP variants alongside the original1024w file. Shared srcset/sizes keep preload and image selection identical.512w is117,824 bytes versus333,310 original bytes;768w is240,046 bytes. The source is resized without crop/recolour/new face synthesis. The original source and delivery hashes are unchanged.
- Ten actual content images gain39 smaller complete-frame WebP candidates, while original src/full-image links and native dimensions remain. Offscreen images remain lazy/async; screenshots retain their original Display-P3 ICC byte-for-byte. Existing compact AVIFs are kept where a derivative would be larger. The duplicated river image in one case uses the same sizes in both instances to share one request.

## Evidence and limits

The production build checks58 files with0errors/warnings/hints and emits25routes. Route/asset/privacy checks and the content/link/data preservation auditor pass with0review entries. All factual data and existing image payloads remain unchanged.

Controlled DOM harnesses cover100 coalesced scroll events, zero layout reads and zero unchanged DOM writes in stable header/chapter scroll, image/font/observer invalidation, menu focus/Escape/inert, bilingual hash/fraction restoration and true-layout versus visual-only resizes. The scene harness covers four layouts, all lifecycle/error/reduced paths, decode readiness,140ms handoff and stop frames.100 controlled progress updates produce2,452→1,072style writes and1,299→0redundant writes. These are call counts in a harness, not measured browser FPS or a universal speedup percentage.

Actual IAB Chromium before/after scene geometry at1440×900 (0/.25/.5/.75/.98) and390×844 (0/.25/.75) differs by less than0.1px, with matching opacity. Native forward/reverse scroll and white endpoint remain. Screenshots are outside public source in output/performance-20261028/.

Image-candidate budgets at375CSSpx/DPR2 (not an actual device/network benchmark), deduplicated per page: Ninefold1,448,322→465,382bytes; résumé558,361→287,956; Work504,064→246,844; About379,011→251,062; Leadership465,891→207,154. Actual IAB Chromium checks cover both home languages at320/375/768/1440px, six Chinese secondary routes at375px and English Ninefold/résumé at1440px. Observed views have zero horizontal overflow and no broken loaded images. Actual currentSrc selects the new responsive candidates. Keyboard focus created only the intended same-origin language prefetch; Projects160.05px→163.76px after language switching, and mobile menu focus/inert/lock/Escape restoration passed. Actual browser currentSrc and overflow checks are recorded separately; DPR1responsive Chromium views do not prove physical-device or DPR2 timings.

Browser measurements are local opt-in observations with cached/unthrottled conditions; do not interpret them as controlled cold-cache, low-end hardware,4G or real-world visitor guarantees. Safari desktop inspection could not connect through the available computer-use tool and is not claimed as passed. OS reduced-motion, hidden/visual-only-resize and decode failure paths have controlled harness coverage, not physical-phone/OS testing. Publication is verified after the Actions run in the external RELEASE.md.

## Technical references

- Astro’s native prefetch behavior: https://docs.astro.build/en/guides/prefetch/ (installed source also inspected at node_modules/astro/dist/prefetch/index.js).
- Compositor-friendly movement guidance: https://web.dev/articles/animations-guide.
- Existing motion-design skill was used for retaining the current timing/interaction behavior during performance changes. No visual redesign was requested or introduced.
