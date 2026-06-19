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
   - **Projects nest more than one level deep.** A category folder can hold many projects,
     and a single folder can be a *group* of projects (e.g.
     `maker_hardware/פרויקטים בעץ/<piece>` or `.../עבודות מהנגרייה של שי/<piece>`). Scan
     recursively (`find . -type f`), not just `-maxdepth 2`. Each leaf piece is usually its
     own card.
   - **`before/after` (or `לפני/אחרי`) subfolders** mark a project Liad joined partway or
     improved — present that history faithfully and ask about his role (see accuracy ref).
   - One drop can be **many** projects across several categories. Confirm scope (he chose:
     "publish all, each per its category") and how to split groups into cards (e.g.
     woodworking → one card per piece).

3. **Identify materials** in the chosen project folder: Word (`.docx`), PDF, PowerPoint
   (`.pptx`), images, **and often nothing but photos**. The DOCX is the cleanest text source;
   the PPTX is the author's *curated* figure set. **Many real projects have no document at
   all** — only photos, plus screens of measurement instruments. For those, content comes
   from: values printed on the instrument screens (transcribe verbatim), folder/file names,
   and **asking Liad for the narrative** (his own account is faithful source — capture it).
   See `references/extraction-toolchain.md`.

4. **Extract content faithfully.** Pull the full text and the figure set, mapped to
   document order. **Copy exactly — never invent or alter values, results, or equations.**
   This is the core rule; `references/accuracy-and-privacy.md` is mandatory reading.

5. **Strip personal data.** Remove names of people, ID numbers, lecturer names, and any
   count of teammates — always, no exceptions. The repo is public.

6. **Curate + optimize figures.** Pick the figures that tell the story (don't dump all of
   them — cap a gallery at ~5–8, ordered chronologically), optimize them with `jimp`, and
   write only those to `public/assets/projects/<category>/<slug>/images/`. Source files stay
   in `raw_projects_assets/`. Toolchain + the Windows/EXIF/jimp gotchas are in
   `references/extraction-toolchain.md`.
   - **Phone/WhatsApp photos are frequently stored sideways.** jimp does **not** auto-apply
     EXIF orientation — you must correct it, and WhatsApp files often have *no* EXIF tag yet
     are baked-rotated. **After optimizing, visually Read every published image** to confirm
     orientation *and content* (folders get mislabeled/mixed — e.g. a "wall art" folder held
     stray balcony/cleanup photos). This visual pass is mandatory, not optional.

7. **Publish per category.** Add/extend the card in `projects.ts`, and build the
   destination according to the category's default treatment (article / modal / modal+gallery
   / link). `references/categories.md` defines the emphasis, default `linkType`, badge states
   and the **modal photo-gallery** option (`gallery: string[]`) for each category — read the
   row for the category you're publishing.

8. **Build + verify.** Run `npm run build` (must pass; confirm `raw_projects_assets/` did
   not leak into `dist/` — grep for `.docx/.pptx/.mp4`). Start a preview, navigate to the
   card and the page, and check: card badge/thumbnail correct, filter works, internal page
   renders RTL/LTR correctly, all figures load (orientation right!), modal galleries open
   with a working thumbnail strip and the CTA hidden when there's no link, no console errors,
   mobile is single-column. Share a screenshot.

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
| `maker_hardware` | **modal + photo gallery** (one card per piece) | physical build photos in chronological order, materials, process |
| `electrical_eng` | **internal article** | faithful reproduction — equations, measurements (incl. values read off instrument screens), investigations |
| `homelab_infra` | internal → usually links to `/homelab` | infrastructure & services |

The internal article pages use **`EngineeringArticleLayout.astro`** (research-blog style,
RTL/LTR aware) — and work even for a project with **no written report** (build it from
photos + transcribed instrument readings + Liad's narration; e.g. the antenna-build page).
Modal cards can carry a **photo gallery** (`gallery: string[]` → main image + thumbnail
strip; CTA auto-hides when `href: '#'`). `references/categories.md` covers both, plus which
`ea-*` components exist.

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
