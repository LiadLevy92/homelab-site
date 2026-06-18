# Category treatment

The `/projects` hub has four categories. Each has a different "shape" — the kind of project
it holds, what a reader cares about, and therefore how it should be presented. Match the
treatment to the category; don't force an academic article onto a tiny app, or a modal onto
a full research project.

The category slugs (used in `projects.ts`, folder paths, and filter tabs) are:
`software_ai`, `maker_hardware`, `electrical_eng`, `homelab_infra`.

## The `projects.ts` card (all categories)

Every project — whatever the category — gets one object in `src/data/projects.ts`:

```ts
{
  id: 'kebab-slug',
  title: 'Human Title',
  category: 'electrical_eng',        // one of the four slugs
  state: 1,                          // 1..4 — drives the badge (see table below)
  summary: 'Two lines, max. Executive summary for the card.',
  technologies: ['Tag', 'Tag'],      // rendered as pills
  image: '/assets/projects/<category>/<slug>/images/<thumb>.jpg',
  linkType: 'internal',              // 'internal' (full page) or 'modal' (pop-up)
  href: '/projects/<slug>',          // internal route, OR external/Hebrew page, OR /homelab
  // modal-only extras:
  tldr: 'Longer blurb shown inside the modal.',
  ctaLabel: 'Read the full story →',
}
```

The card title stays **English** (the hub keeps a consistent engineer/developer line),
even when the destination page is Hebrew.

## Badge states — `getBadge(category, state)`

`state` is 1–4 and maps to a coloured badge whose label depends on the category. Pick the
state that honestly reflects where the project is.

| state (colour) | software_ai | maker_hardware | electrical_eng | homelab_infra |
|---|---|---|---|---|
| 1 (green) | 🚀 Live | 🛋️ In Use | 📜 Published | 🟢 Running |
| 2 (amber) | 💻 WIP | 🔨 On the Bench | 🔬 Researching | ⚙️ Upgrading |
| 3 (purple) | 🧪 POC | 📐 Concept | 💡 Proposal | 🚧 Lab Test |
| 4 (gray) | 🧊 Archived | ♻️ Parted Out | 📁 Frozen | 🔌 Deprecated |

The labels live in `src/data/projects.ts` (`BADGE_LABELS`). Don't hardcode them on the page
— `getBadge()` already returns label + colour class for the card.

## Per-category emphasis

### `software_ai` — default `linkType: 'modal'`
Apps, bots, AI tools, web projects. A reader wants to know **what it does, the stack, and
where to see it**. Keep it punchy.
- Modal content: thumbnail/screenshot, a TL;DR paragraph, tech pills, and a CTA to the live
  site or GitHub (or an internal Hebrew page if one exists, e.g. Second Brain → `/second-brain`).
- Use `internal` only if the project genuinely warrants a long write-up.
- Tags: frameworks/services (Next.js, Supabase, Claude, …).

### `maker_hardware` — default `linkType: 'modal'` (use `internal` if large)
Physical builds — power supplies, enclosures, 3D-printed parts, PCBs. The story is
**visual and physical**.
- Lead with real photos of the build; show materials, CAD (Fusion 360), and the process.
- A small build → modal with the best photo + a short description. A big build (multi-stage,
  lots of measurements) → an internal article page (same layout as `electrical_eng`).
- Tags: materials/tools (LiFePO4, Fusion 360, Li-Ion, PCB, …).

### `electrical_eng` — default `linkType: 'internal'` (engineering article)
Academic / engineering coursework and research. This is the richest treatment: a faithful
**research-blog article** built with `EngineeringArticleLayout` (see below). Strict accuracy
applies hard here — equations, measured values, and figure data must match the source
exactly. Emphasis: introduction, theory (with equations), methodology, investigations,
results, references.
- Tags: tools/domain (MATLAB, Antenna Toolbox, RF, HFSS, EM Theory, …).
- Reference implementation: `src/pages/projects/conical-horn-antenna.astro`.

### `homelab_infra` — default `linkType: 'internal'`, usually linking to `/homelab`
Infrastructure and self-hosted services. There is already a rich `/homelab` page, so the
card normally just links there (`href: '/homelab'`) rather than duplicating content. Only
build a dedicated page for a service that deserves its own deep-dive.

## Using `EngineeringArticleLayout`

Internal article pages live at `src/pages/projects/<slug>.astro` and wrap
`src/layouts/EngineeringArticleLayout.astro` (styles in `src/styles/engineering-article.css`).
It is a dark, IEEE/OpenAI-research-style reading layout, direction-aware.

```astro
---
import EngineeringArticleLayout from '../../layouts/EngineeringArticleLayout.astro';
const base = '/assets/projects/<category>/<slug>/images';
---
<EngineeringArticleLayout
  title="..." description="..."
  dir="rtl"            // 'rtl' for a Hebrew source (faithful), 'ltr' for English
  lang="he"
  canonical="https://liad-dev.com/projects/<slug>"
  ogImage={`https://liad-dev.com${base}/<hero>.jpg`}
>
  <div class="ea-eyebrow"><span class="dot"></span>EYEBROW</div>
  <h1 class="ea-title">Title</h1>
  <p class="ea-subtitle">Subtitle</p>
  <div class="ea-meta"><span>2026</span><span>·</span><span>…</span></div>
  <div class="ea-tags"><span class="ea-tag">Tag</span></div>
  <figure class="ea-figure"><img src={`${base}/hero.jpg`} alt="" /><figcaption class="ea-figcaption">…</figcaption></figure>

  <div class="ea-abstract"><div class="ea-abstract-label">תקציר</div><p>…</p></div>

  <section class="ea-section" id="intro">
    <h2 class="ea-h2"><span class="ea-num">01</span> Heading</h2>
    <p>…</p>
  </section>
  <!-- … -->
  <div class="ea-footer">
    <a href="/projects" class="ea-footer-back">← back</a>
    <span class="ea-footer-note">…</span>
  </div>
</EngineeringArticleLayout>
```

Component classes (prefix `ea-`):
- `ea-eyebrow` / `ea-title` / `ea-subtitle` / `ea-meta` / `ea-tag` — header block.
- `ea-abstract` (+ `ea-abstract-label`) — highlighted executive summary up top.
- `ea-section` + `ea-h2` (+ `ea-num` for the section number) + `ea-h3` — numbered sections.
- `ea-figure` (add class `dark` for figures whose own background is dark) + `ea-figcaption`
  (use `<b>איור N.</b>` style); `ea-figrow` wraps two figures side by side (auto-stacks on mobile).
- `ea-eq` — equation block (mono, LTR). Use `.frac` (two stacked spans) for fractions and
  `.var` for italic variables. No external math library is needed; the source rarely has
  real equation objects (check: `grep -c '<m:oMath' word/document.xml`).
- `ea-callout` (+ `ea-callout-label`) — green "key result / conclusions" box per section.
- `ea-specs` — data/parameters table. `ea-refs` — numbered bibliography (auto-numbered, LTR).
- `ea-list` — bulleted list with amber markers.

Direction: build the page in the **source's language** when faithful reproduction matters
(a Hebrew project book → `dir="rtl" lang="he"`). The hub card stays English regardless.

## After adding a page

- Add the route to `public/sitemap.xml`.
- If you introduced a brand-new page or pattern, note it in `site/CLAUDE.md` (pages table /
  file tree) and add a `CHANGELOG.md` entry.
