# Selected scene assets and identity continuity

Only optimized delivery derivatives belong in `public/media/`. The supplied ZIP, raw private photographs, full-resolution identity masters and identity-analysis files remain outside the public repository. The user authorized a personal portfolio scene depicting himself and provided the architectural photograph for this use.

## Current controlling decisions

The user approved the face of the ZIP A/B/C portrait, then reattached that exact PNG and explicitly rejected subsequent generated full-body faces. That reattached image is the **sole canonical face and upper-body image**. Its source SHA-256 is `d13897e51a68c4eb40164377150da5b244c0164312a53ba103ef2fd09081e602`.

- `simon-entry.svg` places the canonical image with uniform scale/translation and a native silhouette. Two **lossless WebP** crops protect the face/hair/neck/collar and tie regions. Independently decoding the current embedded crops and comparing them with the canonical PNG gives exact RGB equality, with maximum per-channel difference **0**. The crop rectangles are `(300,80,510,740)` and `(510,790,205,612)` in the 1122 × 1402 canonical image. These are source-crop checks, not a claim that a scaled browser screenshot is bit-identical to the full master.
- The larger canonical upper-gown/torso image is a JPEG derivative; the protected crops above sit over it. The continuation is a separate 1024 × 1256 JPEG cropped from the generated body at **source y280**. Its generated head/hair are physically absent from the embedded derivative, rather than merely hidden outside the current viewport. It supplies only the body/clothing beyond the canonical region. No new face is synthesized, averaged, reshaped or applied in this composition.
- `simon-portrait.jpg` is a smaller metadata-free derivative of the same canonical portrait, for the résumé and fallback. It is an AI-assisted portrait explicitly selected by the user, not an additional historical photograph.
- The canonical portrait's black academic gown, blue suit, white shirt and tie are retained as shown. The later tie-only repair and later generated faces are unselected. Latest explicit approval takes precedence over older clothing/reference instructions.
- The first canonical portrait was generated with the built-in image tool from the ZIP's A/B/C reference roles: A for frontal feature layout, B for natural expression/upright attire, C for natural hair/photographic detail. The supplied package is a reference/specification pack, not a trained face model, scan, 3D mesh or identity-verification system.

## Architecture

The user supplied a wide photograph of King's College and explicitly requested extracting its buildings. The production SVG preserves the actual Chapel and both flanking buildings from that photograph. A metadata-free building-height photo strip is embedded once and clipped with a native roofline/foundation silhouette. The original sky, lawn, river and foreground bridge are excluded; subtle edge-only sky cleanup removes blue fringes without inventing architecture.

The photograph was supplied and authorized for this task. No additional photographer, ownership or public license is inferred. The previously trialled Billa890/Commons Chapel-front image is no longer selected or embedded in production. The public source note was removed at the user’s request; this internal source record remains. King's is a visual destination; no personal college affiliation or institutional endorsement is claimed.

The final foundation mask follows the photograph’s uneven building baseline and feathers only its lowest edge into the foreground. The roofline and architectural pixels remain from the supplied photograph. The final 75% browser view is recorded in the QA evidence.

## Environment and motion

- `cosmic-depth.webp` is an original empty environment generated with the built-in image tool, revised to a welcoming morning after the user rejected the ominous night version. Sky blue, pale lavender, warm sunlight, green ground and a textured path replace the dark cloud/fog treatment. The real buildings and character are separate layers.
- `runner-cycle.webp` is an eight-pose rear-three-quarter gown stride sheet, four columns by two rows. Each delivered cell is 320 × 480. Both rows receive an 8-source-pixel downward anchor offset; row two receives a further 13-pixel correction (21 total). After resizing, the support bounds using **alpha ≥128** in zero-based stop frames **1 and 5** both have an exclusive bottom at y456/480, matching the 95% foot anchor. Fully opaque edge thresholds differ by about one antialiasing pixel. The controller mirrors the sheet towards the central destination. Earlier 12-pixel row normalization is superseded.
- This is a **finite-frame 2.5D scene**, not a rigged 3D person, motion capture or continuously generated turn/run. The short sheet has repeated positions and incomplete reciprocal arm motion; exact identity at unseen angles, perfect biomechanics and zero foot sliding are not asserted. The initial canonical front view transitions to a separate rear-view motion asset.
- Native scrolling controls progress and reversal. The building, environment, actor and white field have separate transforms/opacity. The final field is exactly `#FFFFFF`; reduced-motion/no-script/error states use a compact static introduction.

## Finishing and privacy

Local FFmpeg 9.0.1 handles crop, scale and geometry normalization. This build has no WebP encoder; the existing Pillow WebP codec is used only for encoding. No paid external video API, model training, new renderer installation or tracking service was used.

The portrait is a 640 × 800 JPEG derivative of the user-approved canonical mother image, not a crop of standing reference B. The environment is 1280 × 720. The motion atlas is normalized from 1448 × 1086 to 1280 × 960 with 8/21-source-pixel row offsets. The entry's outer placement translates downward 32 units in its 1024 × 1536 viewBox; the supported sole baseline is approximately 98%. The SVG embeds WebP already; there is no PNG-to-WebP optimization pending for its protected crops. Native clipping/masks handle silhouette and joins without a new face render.

All inspected public raster files and embedded raster derivatives have zero EXIF entries. Structural format headers remain; no raw ZIP, full-resolution master, identity-analysis JSON or unselected diagnostic belongs in public output. Only selected delivery derivatives ship.

See `COSMIC_RUN_QA.md` for actual browser evidence, current build/deployment status and limitations. Source usage and internal QA are distinct from human likeness acceptance. The user accepted the canonical portrait; later generated faces were rejected.

## Final delivery inventory

Updated on 27 October 2026 after the scoped ear/campus cleanup and first-display optimization. The seven retained source/delivery files total approximately 2.15 MiB. This is a repository inventory, not an initial network-transfer measurement. The homepage fetches the two compiled WebPs instead of the SVG sources. All embedded photographic payloads remain byte-identical to fd1d739.

| Selected file | Delivered dimensions | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| `public/media/cosmic-run/cosmic-depth.webp` | 1280 × 720 RGB | 148,306 | `7ba42d015e9cff437539f8ebab819a7486f89f3f1bd78b965095bcf665c7bd32` |
| `public/media/cosmic-run/kings-architecture.svg` | 1600 × 900 SVG; embedded 1024 × 238 JPEG | 183,941 | `a3eebec1de0a1e0f61b714770b2e1a982bf60d93f690b7f044af8d6f37278f03` |
| `public/media/cosmic-run/runner-cycle.webp` | 1280 × 960 RGBA | 195,650 | `77f3ebbbf3993414a1ae5c6823e0fa2c1191696a70af09ad1728653e8df90fbd` |
| `public/media/cosmic-run/simon-entry.svg` | 512 × 768; 1024 × 1536 viewBox | 1,044,495 | `adaada4d61497883bfa0ba7491e83b376354e17f45ca9d1f4a30d88a08cf1344` |
| `public/media/cosmic-run/simon-entry.webp` | 1024 × 1536 RGBA, lossless | 333,310 | `dc0ca07e04615983c58a82d5b8216ef78e15b9d7d72c51743e50b8e318005d22` |
| `public/media/cosmic-run/kings-architecture.webp` | 1600 × 900 RGBA, lossless | 297,800 | `27812f542f725cf9b8eba62ef96bffb64550aefd498e81719d79884eed6cd811` |
| `public/media/identity/simon-portrait.jpg` | 640 × 800 RGB | 54,297 | `10d41fd6072b350a1b8ab7be1fea7daf9659bce2ad6378e4412f4264b1d0d0aa` |


## Full-body edge cleanup and Ninefold screenshot — 26 October 2026

The user requested cleaning the entire person, explicitly including the body rather than only the face. The continuation contour now follows the largest original alpha component from the same selected generated body, simplified at 1.2 source pixels. It restores the transparent under-sleeve openings and removes retained background slabs beside the trousers and shoes. A 0.8-source-pixel inward alpha cleanup and 0.6-pixel feather smooth the complete body edge. The approved portrait receives a smooth dense-hair/true skin/garment silhouette with a 0.65-source-pixel feather; its uniform placement, facial RGB, expression and attire are unchanged. A short continuation-only shoulder alpha join avoids the crop ledge. All four embedded photographic payload SHA-256 values are unchanged from c562893.

`public/images/ninefold/ninefold-showcase.webp` is the exact user-supplied Ninefold application screenshot, resized to 1920 × 1106 with FFmpeg Lanczos and encoded as quality-92 WebP (320,426 bytes). Its supplied Display-P3 ICC profile is retained; EXIF/XMP/DPI are stripped. The complete screenshot is shown in the homepage, Work card and case hero with frames fitted to its native aspect ratio. Copy, links, factual data and surrounding layout are preserved. The former public photo-source disclosure and Astro implementation sentence were removed in both languages at the user's request; this internal provenance record remains.


## Complete campus silhouette — later 26 October refinement

The user requested the complete visible King's College architecture from the same supplied photo. The revised native SVG restores the left low wall and complete foundation/floor rows, both real flags/flagpoles and the far-right visible architecture. The broad bottom blur is removed. Alpha-only 1.4-source-pixel rim cleanup suppresses the source JPEG's blue sky fringe while retaining the roof/finial outline. The embedded 1024 × 238 photographic crop and its RGB payload remain byte-identical. Scale1.5/x32 and viewBox1600 × 900 remain; the group is lifted4.5 viewBox units to y555.5 so the complete left low wall fits. Native render alpha bounds are [32,578,1567,899]. No architecture is synthesized. The cache key is complete-campus-7.

The sky refinement preserves the original full background photograph, perspective, ground/path and parallax. Four transparent sky-only veils vary with native scroll; flat opaque sky replacement was rejected and is not part of the final delivery. UI tabs use transparent surfaces and fine outlines. See NINEFOLD_PRODUCT_UPDATE.md and the latest scoped QA for current content and browser evidence.


## Scoped ear/campus and runtime delivery refinement — 27 October 2026

This section supersedes the earlier retained-flag details. Local native alpha edits remove the beige lower-ear wedge, exterior-connected cyan sky in roof gaps, false cyan pole patches and far-right detached background. The real stone roofline, ordinary windows, source JPEG, source placement and foundation are retained. The four portrait photographic payloads remain unchanged; no facial generation or geometric reshaping is introduced.

The user-named `aigc-character-skill` v3.0.0 at revision `dcaf0951f007e4059b2e8740289a1b8e3307bf78` guided this existing-source repair and continuity review. `scripts/render-scene-assets.mjs` compiles the editable SVG sources to the two lossless runtime WebPs. Embedded WebP crops are decoded through a lossless in-memory PNG bridge because librsvg does not consistently decode embedded WebP. The script checks decoded output against the native source render: maximum visible RGB difference0 and alpha difference0 for both files. This is a render/export integrity test, distinct from likeness approval.

The portrait preload and rendered image use the same versioned URL; architecture has low fetch priority. The runner begins loading before use and becomes ready only after decode. Repeated unchanged state/frame writes are skipped; a late-ready runner has a bounded140ms opacity handoff. All scene state/sky mathematics and CSS remain unchanged. See FIRST_LOAD_20261027.md for test scope.
