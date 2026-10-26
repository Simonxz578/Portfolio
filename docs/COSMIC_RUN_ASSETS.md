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

The photograph was supplied and authorized for this task. No additional photographer, ownership or public license is inferred. The previously trialled Billa890/Commons Chapel-front image is no longer selected or embedded in production. The visible footer source note matches the current user-supplied image. King's is a visual destination; no personal college affiliation or institutional endorsement is claimed.

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

Frozen on 26 October 2026 after the foundation-edge edit. The five selected files total approximately 1.55 MiB. The entry/crop proof applies to the listed unchanged entry hash.

| Selected file | Delivered dimensions | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| `public/media/cosmic-run/cosmic-depth.webp` | 1280 × 720 RGB | 148,306 | `7ba42d015e9cff437539f8ebab819a7486f89f3f1bd78b965095bcf665c7bd32` |
| `public/media/cosmic-run/kings-architecture.svg` | 1600 × 900 SVG; embedded 1024 × 238 JPEG | 172,971 | `569ec35a4a1515d8f321b5236421ea9ec517210cb2dbaea5b5f147b323606c58` |
| `public/media/cosmic-run/runner-cycle.webp` | 1280 × 960 RGBA | 195,650 | `77f3ebbbf3993414a1ae5c6823e0fa2c1191696a70af09ad1728653e8df90fbd` |
| `public/media/cosmic-run/simon-entry.svg` | 512 × 768; 1024 × 1536 viewBox | 1,053,927 | `392ef16d6bd706939f5fc9504f4891ec170bde3a70e0959cadbf64b761e060c0` |
| `public/media/identity/simon-portrait.jpg` | 640 × 800 RGB | 54,297 | `10d41fd6072b350a1b8ab7be1fea7daf9659bce2ad6378e4412f4264b1d0d0aa` |
