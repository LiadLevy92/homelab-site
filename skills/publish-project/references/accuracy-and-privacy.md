# Accuracy & privacy — the non-negotiables

These rules exist because the output is a **public** portfolio that represents Liad's real
academic and engineering work. A made-up number or a leaked personal detail isn't a cosmetic
bug here — it damages credibility and privacy. Treat this file as the contract for how you
handle project content.

## Strict accuracy — copy, don't compose

The content on the page must be a **faithful reproduction** of the source materials, not your
summary or interpretation of them.

- **Values, results, equations, figure data: exact.** Directivity numbers, frequencies,
  dimensions, dB readings, table entries, formula terms — transcribe them verbatim from the
  source. Never round differently, never "tidy up" a result, never infer a value that isn't
  stated.
- **Don't invent connective prose.** A project report usually already reads as continuous
  text — use it. If two sections don't join smoothly and you feel the urge to write a bridging
  sentence, that's a signal to **stop and ask Liad**, not to compose one yourself.
- **Don't editorialize the findings.** Present what the source concluded; don't add your own
  engineering commentary, caveats, or "this could be improved by…" unless it's in the source.

### When the source is messy
Extraction artifacts are fine to clean — they're not content:
- stray anchor numbers (e.g. a lone `218947980334` from an image position), reversed RTL
  parentheses, a word split across a line break.
Obvious orthographic typos in the author's text may be lightly corrected (e.g. `האטנה` →
`האנטנה`) **as long as no technical meaning, term, or value changes**. When in doubt, keep
the source wording and ask.

### When values conflict (this happens)
Sometimes the prose quotes one number and a figure shows another (e.g. a 2-D polar reading vs
a 3-D solver's "max value"). Both are from the source — don't silently merge them into one
(possibly wrong) claim. Surface the discrepancy to Liad and let him choose how captions
should read. (In the conical-horn project he chose: **figure captions carry the value printed
on the figure**, while body prose keeps the source's narrative values.)

### Human-in-the-loop checkpoints
Pause and ask before doing anything that isn't a faithful copy:
- you need bridging/explanatory text the source doesn't contain;
- a value is ambiguous, conflicting, or unreadable;
- you're unsure which figure a caption refers to;
- a figure or section seems important but you can't verify what it shows.
Asking is cheaper than a wrong fact on a public page. This is the workflow Liad explicitly
asked for — he'd rather answer a question than discover an invented detail later.

## Privacy — public repo, real people

The repo is public on GitHub and the site is public. Strip personal data **every time**,
without being asked:
- **No personal names** — not teammates, not the lecturer/supervisor, not contacts.
- **No ID numbers** (ת.ז. / student IDs) — ever.
- **No teammate count** — don't even state "a team of four"; just present the project. (This
  is Liad's standing preference; confirm only if he signals otherwise.)
- **Raw materials stay private.** Word/PDF/PPTX live in `raw_projects_assets/`, which is
  gitignored and never copied into `public/` or `dist/`. Only derived, optimized **images**
  (and the prose you transcribe) get published.
- Keep the site's existing security rule: no internal IPs, usernames, or passwords; external
  URLs as endpoints, VMs by number. (See `site/CLAUDE.md`.)

## Hand-off, not auto-publish

Build, verify, and update the docs — then **stop before `git commit`/`push`** and let Liad
review for accuracy. He goes live only after he's checked it. The whole point of the careful
extraction above is wasted if it ships before he's confirmed the facts are right.
