# UI rebuild research and design critique

Date: **26 October 2026**, Asia/Shanghai.

## Read scope and evidence

Live primary pages read through the web reader:

- [Apple — MacBook Air](https://www.apple.com/macbook-air/)
- [Linear — homepage](https://linear.app/)
- [Instrument — Work](https://www.instrument.com/work)

The reader exposed page text, heading order, links, control labels and image descriptions. This audit did **not** operate those sites in a rendered browser, measure their transition timings, or inspect their implementation. The design applications below are independent proposals informed by that structure, not claims that their precise visual effects were reproduced. No reference photography, brand artwork, fonts, CSS or scripts were copied into this project. Product specifications and rankings were outside this research scope.

Local evidence opened: `output/cosmic-run-qa/morning-gown/desktop-resume.png` and `mobile-resume-bottom.png` in the parent task's output directory. The current `CosmicRunHero.astro`/`cosmic-run.css` were also read. The `final/desktop-start.png` file still depicts the superseded night/navy-suit version and was excluded as evidence of the current morning hero. A fresh rendered morning-hero capture remains necessary for final composition review.

Update: the root agent subsequently supplied actual new in-app-browser captures under `output/cosmic-run-qa/ui-rebuild-20261026/`. The independent audit opened `desktop-start.png`, `mobile-start.png`, and desktop/mobile `25`, `50`, and `75` checkpoint images. The initial source-only hero diagnosis below predates those captures; the actual-image findings in the next section are the relevant follow-up.

## Findings from the primary references

| Reference | Actually observed in the retrieved page | Applicable principle |
| --- | --- | --- |
| [Apple MacBook Air](https://www.apple.com/macbook-air/) | Product identity and a brief proposition precede a main purchase action. An overview/highlight sequence leads into named feature chapters. Model/color controls alter a concrete subject, with imagery describing distinct views and uses. | Establish one subject first, then offer increasingly specific evidence. Controls should explain or change meaningful content. |
| [Linear](https://linear.app/) | The introductory proposition leads into detailed product-interface examples. Later sections organize evidence around intake, planning, automation and delivery, each with a further-reading route. | Explain capability through a recognizable workflow and observable interface state. A progression of proof is stronger than repeated abstract skill labels. |
| [Instrument Work](https://www.instrument.com/work) | The work list identifies clients/projects, disciplines, a concise account of the change, and explicit case-study links. The ending offers relevant contact paths. | Give each project an identifiable story and a direct route to depth. Let the evidence establish credibility before a closing invitation. |

These are information-design observations. They do not establish browser animation behavior, exact spacing, or accessibility conformance for the reference sites.

## Candid diagnosis of this portfolio

The morning résumé opening still spends a substantial band beneath the floating header on empty space before the identity block. A large name, separate portrait card, introduction, wide chapter rail and another section introduction repeat the act of introducing Simon before the professional record begins. The hierarchy is legible, but the sequence feels assembled from several landing-page conventions.

The mobile contact capture gives a long invitation almost an entire screen before the closing links. The essential email action is clear, but the end of the page would carry more authority with a shorter invitation and a stronger connection to the work immediately above it.

Source-based hero diagnosis: a full-viewport landscape, a fixed left text column, a person capped at 300px width and an independently scaled campus layer create several competing centers. Enlarging the background alone will not improve identity or craft. The source also spends intermediate scroll progress on stage captions and four stacked discipline words; those labels add little beyond the résumé headings. A current browser capture is needed to assess the exact visual severity.

There is also navigation repetition: seven equal header destinations followed by seven equal résumé chapter destinations. When every item has similar weight, the visitor must build the hierarchy themselves. The white résumé and Work chapters need a clearer distinction between a quick scan, a substantial project, and supporting detail.

## Actual rebuilt-hero image review

The new captures show a framed daylight scene, four primary desktop destinations, a clearer filled résumé action, a larger canonical person and meaningful chapter sentences. At the reviewed phone checkpoints, chapter copy remains below the header and clear of the person. The large dark headlines and main body copy are readable against the washed sky. These observations cover the actual saved views, not every viewport, hover state or frame of the animation.

Visible defects and limits reported to the root agent:

- The campus lower edge remains conspicuously cut out at the 50/75% desktop checkpoints. The left college base has a pronounced vertical step, and the right façade ends on a straight edge above the haze. It reads as a paper strip hovering over the terrain. A planned bottom-alpha fade should be checked at 75% after implementation; softening only a tiny edge may not resolve the entire ground relationship.
- Normal-size start captures do not show a new obvious face/neck halo or the former severe shorts/blue-leg boundary. The head appears upright and the gown/tie remain visible. This does not establish pixel identity from a screenshot: the phone face is too small to judge fine likeness. Preserve the locked source and use its decoded-RGB verification, rather than proposing another face generation.
- Entry soles meet the path with a subtle shadow. The displayed runner stop poses show a supported flat shoe, but still images cannot certify continuous gait or absence of foot sliding. The finite-pose limitation remains.
- Small stage metadata uses `#5772a5`. Against representative sky colors `#dceafb`/`#e9effa`, calculated contrast is approximately **3.95:1 /4.18:1**, below the 4.5:1 target for normal-size text. A darker metadata token is appropriate. The large Simon lettering has a different large-text threshold and does not need the same treatment. These are CSS/representative-background calculations, not an exhaustive pixel-by-pixel contrast audit.
- Small reverse-scroll text `#60738e` against `#e5edfb` is approximately **4.11:1**; check its actual local background. Body copy `#4e637d` against `#edf3fc` is approximately **5.53:1**. Recheck the final values after the root's contrast adjustment.

No source, person, face, clothing or campus artwork was edited by this audit. The root separately reported exact progress/reverse/refresh behavior and a pure-white endpoint; those interaction/pixel checks are not recast here as tests operated by this independent agent. Final new résumé/Work views, post-fade campus captures and full final verification are still required.

## Five changes worth rebuilding

### 1. Give the opening a deliberate identity composition

Build the opening around the locked canonical person, one professional thesis, and the real campus destination. Increase the person's visual importance by scaling the complete existing asset as one unit; do not alter the head, expression or approved upper-body pixels. Give the name/title a measured relationship to that figure rather than laying a generic text column over a dominant wallpaper.

Use white paper, sky blue and restrained lavender to frame a clear foreground/middle-distance/background relationship. The real campus must share a horizon and a believable ground relationship with the person. Reserve a stable clear area for the face, the primary résumé action and the headline at desktop and phone widths. The campus should remain recognisable without occupying the same attention as the face.

**Acceptance:** a first-frame screenshot immediately communicates Simon's identity and field; neither the face nor the main action is lost in scenery. Check the actual 320px and 1440px compositions, not just fluid CSS values.

### 2. Make the six scroll beats carry a narrative

Replace the repeated discipline-word stack with one short, factual idea at each meaningful beat. Existing physics, education research, industrial AI and product records provide the material; no new achievement numbers or claims are needed. The final beat gives way to the pure-white reading layer.

Use a shared vanishing point and ground reference for person, supported shoe, shadow and architecture. Let depth, exposure and one text transition explain the progression. Long stretches in which only a small sprite changes should be removed. The limited pose atlas is not a reason to add more particles or pretend the motion is continuous video.

**Acceptance:** each checkpoint has a clear purpose; reverse scroll restores the same scene; an idle position remains stable; supported stop frames stay on the ground. The six-stage white endpoint and reduced-motion fallback remain intact.

### 3. Separate global navigation from the reading index

Reduce the persistent header's competing destinations. A compact identity, clear Work/Résumé/Contact paths and the language control can establish a global hierarchy; secondary routes can remain available through an accessible menu and footer. Use a contextual chapter index in the résumé itself rather than presenting two equal sets of seven links at once.

Keep glass on controls, with restrained stroke/highlight and a solid readable fallback. Active state, focus and touch targets matter more than a stronger blur. This is a structural navigation change and requires rechecking the already-working focus trap, Escape behavior, inert content and language-position preservation.

**Acceptance:** a visitor can identify the main next action without scanning fourteen similar links. All existing public routes remain discoverable, and keyboard/touch navigation still works.

### 4. Turn the white résumé into a professional reading system

Shorten the second introduction after the scene. Use a compact identity/contact opening and begin the dated record promptly. Give roles and degrees primary emphasis, institutions a consistent secondary level, and dates a stable scan line. Avoid a large portrait card repeating the hero's entire introduction.

Vary reading rhythm through concise dated records, a substantial featured project, a quieter research/publication treatment and a direct closing contact. Remove redundant framing sentences and repeated labels before removing facts. Long prose stays on solid paper with a comfortable measure; facts must not be hidden in hover states or collapsed panels.

**Acceptance:** the reader can find education, current work, industrial experience, the published paper and contact details quickly in the same HTML document. No large decorative gap delays the next useful record, and the full existing content remains available.

### 5. Let each project lead with its own proof

Make Ninefold a clear flagship with its real product environment and learning workflow. Give the industrial project a diagram drawn from its existing workflow; use the research model/citation and DOI as academic evidence; use a quieter Cambridge reading treatment for policy; let actual community photography support FHNS.

Vary image scale and text relationship according to those materials. Keep each project's question, role and outcomes visible at the appropriate summary depth, with a clear case-study route. Avoid five equally weighted text slabs or the same image-plus-summary arrangement five times. Diagrams explain documented relationships; they must not manufacture evaluation results.

**Acceptance:** a ten-second Work-page scan distinguishes the five projects and identifies Ninefold as the flagship. Each project's main proof and case link are visible without depending on hover.

## Final audit risks — none marked passed here

| Area | Required final check after the rebuild |
| --- | --- |
| Public content and routes | Rebuild all 25 pages; rerun the baseline/data-hash auditor, original external/contact URL checks, canonical/OG checks, and local fragment/asset checks. Preserve Ninefold's existing query parameters and the IJSE DOI. |
| One-page reading | Education, experience, projects, research, leadership, capabilities and contact remain real searchable HTML. Recheck direct résumé routes and every chapter's scroll offset beneath any new sticky layers. |
| Language | Test English/Chinese text wrapping independently, corresponding deep routes, section/hash preservation and reload/back/forward restoration. |
| Identity privacy | Canonical face source is locked. No further face regeneration or unrequested clothing correction. Verify decoded canonical crop equality for the selected lossless encoding; a smaller byte count is not proof of identity preservation. Keep raw ZIP/master/analysis material out of Git and public output. |
| Scene state | Capture first frame, 25/50/75%, pure white, résumé start/end, reverse traversal and arbitrary stops with the final assets. Recheck the campus/feet/shadow geometry and avoid a visible body-composite seam. |
| Accessibility | Real skip-intro anchor, reduced-motion compact poster, no-JS readable content, keyboard focus, current-state semantics, menu trapping/escape/outside close, 44px controls, decorative-layer exclusion and AA text contrast. |
| Responsive layout | 320/375/390/768/1024/1280/1440px; no overflow, hidden actions, cropped faces, sticky-layer collisions or tiny type. Recheck the Work/details routes as well as the homepage. |
| Loading/performance | Measure final production-preview resource bytes, LCP, CLS and available scheduling samples. Load text/poster first; defer the atlas; avoid large repeated blur/filter repaints. Empty rAF samples do not establish frame rate. Do not claim Safari, mobile hardware, 4G or CPU-throttled results without performing them. |
| Publishing | Run the final type/build/output/privacy checks, inspect the final diff, deploy through the existing GitHub Pages workflow and verify actual live HTML plus selected assets before saying published. |

Implementation ownership remains separate: root owns hero/global/header/assets; the résumé agent owns the one-page reading layer; the case agent owns Work/project/case composition. This research file does not modify their source or certify their final outputs.
