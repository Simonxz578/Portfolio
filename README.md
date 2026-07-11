# Xiang Zhang — AI Product & Applied AI portfolio

This is a statically generated English-language portfolio for Xiang Zhang (Simon). It is designed for applied AI engineering, AI product, model-evaluation, organisational-adoption and startup-collaboration conversations.

The site is intentionally not a full online résumé. Its information architecture prioritises three evidence-bounded case studies, selected experience, research status, leadership and a concise professional narrative:

**Physics → Applied AI → Education, users and organisational adoption**

The portfolio currently lives in the `portfolio/` subdirectory so it does not disturb the existing Formal Hall Networking Society site in the repository root.

## Technology

- Astro
- strict TypeScript
- semantic HTML
- custom CSS
- minimal vanilla JavaScript for the mobile menu and copy-email control
- fully static output
- no React, UI framework, backend, database or CMS

## Local installation and development

From this directory:

```bash
cd portfolio
npm install
npm run dev
```

Astro will print the local URL, normally <http://localhost:4321>.

Production commands:

```bash
npm run build
npm run preview
npm run check:build
```

- `npm run build` runs Astro’s type/content checks and creates `dist/`.
- `npm run preview` serves the production output locally.
- `npm run check:build` verifies expected routes, internal assets, one `h1` per page, image alt attributes and common private-source patterns.

## Routes

```text
/
├── work/
│   ├── industrial-ai-agent-rag-workflow/
│   ├── ai-policy-teacher-agency/
│   └── ai-enhanced-science-education/
├── research/
├── leadership/
├── about/
├── resume/
├── contact/
├── 404.html
├── robots.txt
└── sitemap.xml
```

## Content structure

```text
src/
├── components/        Reusable navigation, cards, diagrams and contact UI
├── data/
│   ├── site.ts        Site identity, navigation, public email and asset paths
│   └── en/            Approved English project, experience, research and leadership copy
├── layouts/           Shared metadata, structured data, header and footer
├── pages/             File-based routes and static endpoints
├── styles/            Global design system and responsive rules
└── utils/             Base-path-safe URL helpers

public/
├── icons/             Non-heraldic favicon
└── images/
    ├── portrait/      Metadata-stripped responsive portrait copies
    └── social/        1200 × 630 Open Graph image

content/               Editorial boundary notes; never deployed by Astro
docs/                  Inactive deployment examples
scripts/               Local build verification
```

English is the only published language. The `src/data/en/` boundary keeps future localisation content separate from layout code.

## How to add a project

1. Gather public-safe evidence: role, dates, users, problem, decisions, workflow, evaluation, results and limitations.
2. Confirm that employer or participant material may be published.
3. Add one typed entry to `src/data/en/projects.ts`.
4. Set `featured: true` only when the project has enough evidence for the home page.
5. Use a unique lower-case, hyphenated `slug`.
6. Keep confidential diagrams sanitised and redrawn; never place internal screenshots in `public/`.
7. Run `npm run build` and `npm run check:build`.
8. Test the generated route with keyboard and mobile widths before review.

The dynamic route `src/pages/work/[slug].astro` creates each case-study page. Do not duplicate its layout for ordinary projects.

## Case-study evidence standard

Each project supports:

1. overview and problem;
2. users and stakeholders;
3. constraints;
4. role and decisions;
5. sanitised workflow;
6. evaluation;
7. outcomes;
8. limitations and learning.

If evidence is absent, say so in `limitations`. Do not fill gaps with inferred metrics, product outcomes, employer claims, research findings or synthetic screenshots.

## Research and publication status

Update research records in `src/data/en/research.ts`. Use precise labels such as:

- Research project
- Dissertation
- Manuscript under revision
- Major revision completed
- Published article

Use “published” only after a final publication URL or DOI has been verified. The UCL work is currently labelled as a manuscript under revision following a major-revision decision; the bilingual résumé contained a conflicting stronger claim, so the conservative English status is used.

## Leadership

Update `src/data/en/leadership.ts`. External organisation names are text links, not logos. Do not imply University or college endorsement.

The Formal Hall Networking Society entry links to its separate archive rather than copying that archive into this site. The portfolio records front-end and editorial work at a high level without publishing participant information.

## Updating the résumé

The private bilingual DOCX is source material and must never be copied into `public/`.

When an approved, targeted public PDF exists:

1. remove mobile, WeChat, private address, internal notes and document metadata;
2. save it as `public/resume/xiang-zhang-resume.pdf`;
3. set `resumePdfPath` in `src/data/site.ts` to `/resume/xiang-zhang-resume.pdf`;
4. confirm that the home and résumé-page links download the correct file;
5. run `npm run check:build`.

Until then, the website links to the concise résumé page and clearly states that the PDF is pending.

## Adding Chinese content later

Do not add automatic or partial translations.

For a future complete Chinese version:

1. create `src/data/zh/` mirroring the typed English data modules;
2. add locale-aware routes that reuse the existing components and layouts;
3. localise metadata, navigation, alt text and structured data;
4. add a language switcher only after every production route has approved Chinese content;
5. use correct `lang`, canonical and `hreflang` values;
6. test both languages independently.

## Images

The approved portrait source remains outside the repository. Public copies are metadata-stripped and stored under `public/images/portrait/`.

Recommended preparation:

- portrait master: at least 1200 × 1800 when a higher-resolution approved source becomes available;
- web portrait: JPEG quality 82–90 plus WebP, with 480px and 720–900px widths;
- project screenshots: 1600px wide, cropped only to remove private UI, participant data and browser chrome that adds no evidence;
- social image: 1200 × 630 JPEG;
- use descriptive lower-case filenames;
- remove GPS, EXIF and private metadata;
- preserve useful detail and do not overwrite source photographs.

Every meaningful image needs useful alt text. Decorative technical motifs should be CSS or use empty alt text.

## Vercel deployment

The site is prepared for static Vercel deployment. Astro and Vercel both support static Astro sites without a server adapter.

Do not deploy until the local site and content have been approved.

1. Push the reviewed code to a Git repository.
2. Import that repository into Vercel.
3. Set **Root Directory** to `portfolio` while this project remains a subdirectory.
4. Confirm framework preset **Astro**.
5. Confirm build command `npm run build` and output directory `dist`.
6. Keep `BASE_PATH=/`.
7. For a custom domain, set `SITE_URL=https://your-final-domain.example` in Production and Preview as appropriate.
8. Review the preview deployment before promoting the production branch.

When no custom `SITE_URL` is set, `astro.config.mjs` uses Vercel’s production-project URL for canonical and sitemap generation.

Current official references:

- [Astro deployment overview](https://docs.astro.build/en/guides/deploy/)
- [Astro on Vercel](https://docs.astro.build/en/guides/deploy/vercel/)
- [Vercel’s Astro guide](https://vercel.com/docs/frameworks/frontend/astro)

## Optional GitHub Pages deployment

Vercel is the intended production target. Do not activate GitHub Pages at the same time unless one deployment is explicitly designated non-production.

The inactive example is `docs/github-pages-workflow.yml.example`. To use it deliberately:

1. replace the placeholder username and repository in that file;
2. keep `SITE_URL` as the host, for example `https://username.github.io`;
3. set `BASE_PATH=/repository-name` for a project site, or `/` for a `username.github.io` repository or custom domain;
4. move the reviewed example to the repository root at `.github/workflows/deploy.yml`;
5. if the portfolio becomes its own repository, change the action’s `path` from `portfolio` to `.`;
6. commit the generated lockfile;
7. choose **GitHub Actions** under **Settings → Pages → Source**.

For a custom GitHub Pages domain, add the approved domain to `public/CNAME`, set `SITE_URL` to that domain and set `BASE_PATH=/`.

Reference: [Astro’s current GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/).

## Custom domain

Before connecting a domain:

1. approve the exact production URL;
2. set `SITE_URL` to that URL;
3. configure the provider’s required DNS records;
4. select one canonical host and redirect the alternative;
5. verify HTTPS, canonical URLs, Open Graph images, `robots.txt` and `sitemap.xml`;
6. retest every route after DNS is live.

No production domain is configured by this repository.

## Privacy and accuracy check before publishing

Search both source and `dist/` for:

- phone numbers and WeChat details;
- source DOCX or draft PDF names;
- private addresses or document metadata;
- employer code, screenshots, documents or internal metrics;
- participant names, transcripts or school-level data;
- unsupported rankings, grades, outcomes or affiliations;
- missing publication-status evidence;
- unverified GitHub, repository, demo or DOI links.

Then run:

```bash
npm run build
npm run check:build
rg -n -i 'wechat|mobile|phone|resume-source|\.docx' dist
```

## Branch and review workflow

From the repository root:

```bash
git switch -c codex/portfolio-review
git status
git diff --check
```

After local review, stage only the intended `portfolio/` files. Do not commit, push or deploy until the content owner has approved the local website.
