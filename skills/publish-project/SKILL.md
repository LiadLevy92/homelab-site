---
name: publish-project
description: >-
  Publish a new project from the homelab-site `raw_projects_assets/` folder onto the
  `/projects` page of liad-dev.com (Liad Levy's site, Astro repo at `site/`). Use this
  whenever Liad drops new project materials and wants them on the site — e.g. "עיבדתי
  פרויקט", "העליתי פרויקט חדש", "תעלה את הפרויקט לאתר", "תהפוך את זה לדף באתר", "publish my
  project", "add this project to the site", or whenever he mentions new files under
  `raw_projects_assets/`. The skill scans for new (unpublished) projects, extracts their
  content faithfully from Word/PDF/PPTX, optimizes figures, and publishes them as a Bento
  card plus — depending on category — an internal engineering-article page or a modal,
  applying strict-accuracy and privacy rules. Prefer this skill over ad-hoc editing
  whenever the task is "raw project materials → live page on the site."
---

# publish-project

Turn raw project materials that Liad drops into `raw_projects_assets/` into polished,
faithful pages on the `/projects` hub of **liad-dev.com**. This skill encodes a workflow
that was designed and proven with Liad — follow it, and lean on the reference files for
detail rather than improvising the parts that matter (accuracy, privacy, per-category
treatment).

## The repo

The site is an **Astro static site** (`homelab-site`), normally at
`C:\Users\Liad1\OneDrive\Desktop\HomeLab\site`. Deploy = push to `main` → Cloudflare Pages
auto-builds. It is a **public** repo. Confirm the path at the start (look for `site/` with
`src/data/projects.ts`); if you can't find it, ask.

Key files you will touch:
- `src/data/projects.ts` — the single source of project cards (types, array, `getBadge()`).
- `src/pages/projects/<slug>.astro` — internal article pages (wrap `EngineeringArticleLayout`).
- `public/assets/projects/<category>/<slug>/images/` — published, optimized figures only.
- `raw_projects_assets/<category>/<project>/` — **private** source materials (never published).
- `public/sitemap.xml`, `CHANGELOG.md`, `CLAUDE.md` — update at the end.

## Workflow

Work through these steps in order. Steps 3–7 carry accuracy/privacy risk — read
`references/accuracy-and-privacy.md` **before** writing any project content.

1. **Locate the repo** and confirm `src/data/projects.ts` exists.

2. **Scan for new projects.** List every project folder under
   `raw_projects_assets/<category>/` and compare against the `id`/`href` entries already in
   `projects.ts`. Present the new (unpublished) ones to Liad and let him pick which to
   publish (he chose: scan-all-and-show). If he named a specific project, go straight to it.

3. **Identify materials** in the chosen project folder: Word (`.docx`), PDF, PowerPoint
   (`.pptx`), images. The DOCX is usually the cleanest text source; the PPTX is usually the
   author's *curated* figure set. See `references/extraction-toolchain.md`.

4. **Extract content faithfully.** Pull the full text and the figure set, mapped to
   document order. **Copy exactly — never invent or alter values, results, or equations.**
   This is the core rule; `references/accuracy-and-privacy.md` is mandatory reading.

5. **Strip personal data.** Remove names of people, ID numbers, lecturer names, and any
   count of teammates — always, no exceptions. The repo is public.

6. **Curate + optimize figures.** Pick the figures that tell the story (don't dump all of
   them), optimize them with `jimp`, and write only those to
   `public/assets/projects/<category>/<slug>/images/`. Source files stay in
   `raw_projects_assets/`. Toolchain + the Windows image gotchas are in
   `references/extraction-toolchain.md`.

7. **Publish per category.** Add/extend the card in `projects.ts`, and build the
   destination according to the category's default treatment (article / modal / link).
   `references/categories.md` defines the emphasis, default `linkType`, and badge states for
   each of the four categories — read the row for the category you're publishing.

8. **Build + verify.** Run `npm run build` (must pass; confirm `raw_projects_assets/` did
   not leak into `dist/`). Start a preview, navigate to the card and the page, and check:
   card badge/thumbnail correct, filter works, internal page renders RTL/LTR correctly, all
   figures load, no console errors, mobile is single-column. Share a screenshot.

9. **Update docs.** `public/sitemap.xml`, `CHANGELOG.md` (new version entry), and
   `site/CLAUDE.md` (pages table / structure if a new page or pattern was added).

10. **STOP for review.** Do **not** commit or push. Present what was built (card + page +
    any accuracy decisions you made) and ask Liad to review for correctness, then wait. He
    commits/pushes only after he approves. (This is deliberate: public repo + faithful
    academic content — he reviews before it goes live.)

## Category treatment (summary)

Read `references/categories.md` for the full emphasis per category. At a glance:

| Category | Default link | Emphasis |
|----------|-------------|----------|
| `software_ai` | modal | stack, what it does, Live/GitHub link, screenshot |
| `maker_hardware` | modal (internal if large) | physical build photos, materials, CAD, process |
| `electrical_eng` | **internal article** | faithful academic reproduction, equations, measurements, investigations |
| `homelab_infra` | internal → usually links to `/homelab` | infrastructure & services |

The internal article pages use **`EngineeringArticleLayout.astro`** (research-blog style,
RTL/LTR aware). `references/categories.md` shows how to use it and which `ea-*` components
exist.

## Non-negotiables

- **Faithful to source.** Exact copy of values, results, equations, figure data. If you
  need connective text or hit an ambiguous/conflicting value, **stop and ask** — don't
  paper over it. (See `references/accuracy-and-privacy.md`.)
- **Privacy.** No personal names, IDs, lecturer, or teammate counts. Raw materials never
  leave `raw_projects_assets/`.
- **Stop before git.** Build and verify, then hand off to Liad for review and push.

## Testing this skill safely

This skill mutates a real, public repo. To try changes to the skill itself, run it against
a throwaway copy/worktree of the repo on a sample project rather than the live tree — see
`references/extraction-toolchain.md` ("Dry-run") for how.
