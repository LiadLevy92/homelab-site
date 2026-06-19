# Extraction & asset toolchain

Practical commands for getting faithful text and figures out of the raw materials, and for
optimizing images — including the gotchas specific to Liad's Windows machine. Run shell
commands via the Bash tool (git-bash); paths with Hebrew folder names work fine when quoted.

## What's usually in a project folder

`raw_projects_assets/<category>/<project>/` typically holds some of:
- `*.docx` — the project book / report. **Best text source** (logical reading order, clean UTF-8).
- `*.pdf` — same content; figures render here but text is RTL-garbled for Hebrew.
- `*.pptx` — the presentation. **Best figure source**: it's the author's curated subset.
- loose images.

## Text extraction

**DOCX (preferred):** unzip `word/document.xml`, split on paragraph boundaries, strip tags:
```bash
unzip -p "<file>.docx" word/document.xml \
  | sed 's/<\/w:p>/\n/g; s/<[^>]*>//g' | sed '/^[[:space:]]*$/d' > /c/Users/Liad1/AppData/Local/Temp/proj_text.txt
```
Then read the txt with the Read tool (use the Windows path
`C:\Users\Liad1\AppData\Local\Temp\proj_text.txt`). The text appears in correct reading
order, including Hebrew. Figure captions ("איור N: …") survive and mark where figures go.

**PDF (fallback / cross-check):** `pdftotext -layout -f 1 -l 8 "<file>.pdf" -` works, but
Hebrew comes out bidi-mangled — use it only to sanity-check numbers, not as the prose source.

**Equations:** check whether the doc has real equation objects:
`unzip -p "<file>.docx" word/document.xml | grep -c '<m:oMath'`. Usually `0` — meaning
"equations" are inline text or images, so no math library is needed; transcribe the few key
formulas into the `ea-eq` HTML component (`.frac`, `.var`). If there are many real OMML
equations, raise it with Liad before investing in a KaTeX setup.

## Figures

**Extract media:**
```bash
unzip -o -q "<file>.pptx" -d /tmp/proj_pptx   # images land in ppt/media/
unzip -o -q "<file>.docx" -d /tmp/proj_docx   # images land in word/media/
```

**Map DOCX figures to document order** (so you know which file is "איור 3", etc.):
```bash
# rId -> media file
unzip -p "<file>.docx" word/_rels/document.xml.rels | sed 's/<Relationship/\n&/g' | grep media
# rIds in body order:
unzip -p "<file>.docx" word/document.xml | grep -o 'r:embed="[^"]*"'
```
Cross-reference the two to get figures in reading order, then line them up with the "איור N"
captions from the extracted text.

**View candidates before choosing.** The Read tool renders images, but it resolves
**Windows paths**, not git-bash `/tmp`. Copy candidates to a Windows-visible temp dir and
read them there:
```bash
cp /tmp/proj_pptx/ppt/media/*.{jpeg,png} /c/Users/Liad1/AppData/Local/Temp/proj_figs/
# then Read:  C:\Users\Liad1\AppData\Local\Temp\proj_figs\imageN.jpeg
```
Prefer the **PPTX** images — they're the curated set, and MATLAB/plot figures carry their
own values (frequency, max dBi, HPBW, SLL) printed on them, which you can caption objectively.

## Image optimization (jimp)

This machine has **no** ImageMagick / sharp / cwebp, and squoosh breaks on Node 24. Use
**jimp** (pure JS). Install without touching `package.json`, and run the script **inside the
`site/` dir** (so `require('jimp')` resolves against `site/node_modules`, not `/tmp`):

```bash
cd "<repo>/site"
npm install jimp@0.22.12 --no-save --silent
```
Create `site/_optimg.cjs`:
```js
const Jimp = require('jimp');
const dir = process.argv[2];
(async () => {
  const a = await Jimp.read(dir + '/_src.png');
  a.resize(1200, Jimp.AUTO); a.quality(85); await a.writeAsync(dir + '/hero.jpg');   // hero
  const b = await Jimp.read(dir + '/_src.png');
  b.resize(700, Jimp.AUTO); b.quality(82); await b.writeAsync(dir + '/card.jpg');     // card thumb
})().catch(e => { console.error('ERR', e.stack); process.exit(1); });
```
Run it, then delete `_optimg.cjs` and any `_src.*`. Plain JPEGs from a deck are usually
already web-sized (~40–100KB) and can be copied as-is; only the big hero render (often a
1+MB PNG) needs converting to a ~100–150KB JPEG. Give published files meaningful names
(`dir-10ghz.jpg`, `array-polar.jpg`, `horn-card.jpg`).

Publish only to `public/assets/projects/<category>/<slug>/images/`. Keep `.gitkeep` files so
empty category dirs persist; raw materials stay out of `public/` (they're gitignored, so
they never reach `dist/`).

## Photo projects: EXIF orientation, galleries & batch optimizing

Photo-led projects (maker/woodworking, lab photos) bring dozens of phone/WhatsApp images.
Two things bite every time — handle both:

**1. EXIF orientation — jimp does NOT auto-rotate.** Phone photos store the image sideways
plus an EXIF `Orientation` tag; jimp reads pixels as-is, so they publish rotated unless you
correct them. Read the tag and rotate:
```js
const ORI = { 6: 90, 8: -90, 3: 180 };           // tag → degrees for jimp .rotate()
const img = await Jimp.read(src);
const o = img._exif && img._exif.tags ? img._exif.tags.Orientation : 1;
if (ORI[o]) img.rotate(ORI[o]);                    // 6 is by far the most common (portrait)
```
**WhatsApp (`*-WA*.jpg`) files are the trap:** WhatsApp strips EXIF, so the tag reads
`undefined`/`0` **but the pixels are still baked sideways**. Auto-detection can't catch
these — pass a manual per-file rotation override (usually `90`) and verify. Even same-camera
`IMG_*` files in one folder can disagree (one needs `90`, the next none) — don't assume a
folder is uniform.

**2. Verify every published image by eye.** After optimizing, `Read` each generated file.
This pass catches (a) wrong orientation and (b) **content mismatches** — folders get mixed
(a "wall-art" folder held stray balcony + vacuum-cleanup shots; exclude those). If a file is
still sideways after `+90`, just drop it rather than guessing the rotation.

**Card thumb vs gallery sizing** (what shipped this session):
```js
// gallery image: full-width, ordered NN.jpg
img.resize(1200, Jimp.AUTO); img.quality(80); await img.writeAsync(dir + '/01.jpg');
// card thumbnail: fixed-ratio crop so the grid stays tidy
cimg.cover(640, 440);        cimg.quality(82); await cimg.writeAsync(dir + '/card.jpg');
```
Hero/card = the finished/most-representative shot; `gallery` = chronological (file-name or
timestamp order — numeric-sort `0.jpg…10.jpg`, don't lexically sort). Cap ~5–8 per gallery.

**Batch pattern.** Drive the whole drop from one `site/_optimg.cjs` with a job list:
`{ out, base, card, cardRot?, g: [[file, rotOverride?], …] }` per project; default rotation
from EXIF, override per file for WA/baked-rotated ones. jimp is pure-JS and slow on 12 MP
images (tens of seconds for a big batch) — run it with `run_in_background` and poll the
output file. Delete `_optimg.cjs` when done (don't let it leak into git).

## Build & preview verification

- `npm run build` must pass. Confirm no leak: `find dist -iname '*.docx' -o -iname '*.pptx'`
  should be empty, and `dist/projects/<slug>/index.html` should exist.
- Preview with the `preview_*` tools (server name `liad-dev`, port 4321). Navigating via
  `preview_eval` set-location is **flaky** — it sometimes bounces to `/`; just retry, then
  read state in a follow-up call. Synthetic clicks don't follow top-level `<a>` navigation in
  the harness — verify internal links by asserting the element is `<a href="…">`, not by
  clicking through.

## Git / deploy gotchas

- The repo lives under **OneDrive**, which intermittently locks `.git` loose objects →
  `git push` can fail with "unable to open loose object … Permission denied". It's transient:
  **just retry the push**.
- Commit messages via Bash: use a heredoc `git commit -F - <<'EOF' … EOF` (the PowerShell
  `@'…'@` here-string syntax leaks a stray `@` into the message under Bash).
- End commit messages with the `Co-Authored-By: Claude …` trailer per repo norms.

## Dry-run (testing the skill safely)

Because this skill edits a real, public repo, test skill changes against a copy:
```bash
cp -r "<repo>/site" /tmp/site-dryrun        # or: git worktree add /tmp/site-dryrun
```
Point the workflow at the copy, run through extraction → publish → `npm run build`, and
inspect the result there. Never run experimental skill changes against the live tree, and
never push from a dry-run copy.
