# skills/ — Claude Code skills for this repo

Reusable [Claude Code skills](https://docs.claude.com/en/docs/claude-code/skills) that
automate workflows on this site. Kept here so they're version-controlled with the code they
operate on, backed up, and shareable. They are **not** part of the website build (Astro only
bundles `src/` + `public/`, so this folder never reaches `dist/`).

## publish-project

Turns raw project materials dropped into `raw_projects_assets/` into polished pages on the
`/projects` hub: scans for new projects, extracts their content faithfully from Word/PDF/PPTX,
optimizes figures, and publishes a Bento card plus — per category — an internal
engineering-article page or a modal. Enforces strict-accuracy and privacy rules and stops
before commit/push for review.

- **Folder:** [`publish-project/`](publish-project/) — `SKILL.md` + `references/` (the canonical, editable source).
- **Packaged:** `publish-project.skill` — a single zip for one-click install / sharing.
- **Slash-command wrapper:** `publish-project.command.md` — a thin wrapper so the skill also
  shows up as `/publish-project` in the slash-command menu (skills alone are model-invoked and
  don't appear in that menu). Install it to `~/.claude/commands/publish-project.md`.

### Install / update

The skill lives in your user skills dir at `~/.claude/skills/publish-project/` (on this
machine: `C:\Users\Liad1\.claude\skills\publish-project\`). To install on a new machine or
after editing here, either:

- **From the folder:** copy `publish-project/` into `~/.claude/skills/`, or
- **From the package:** install `publish-project.skill` (drag-drop, or use the
  `skill-installer` skill / `/install` flow).

For the slash command, also copy `publish-project.command.md` →
`~/.claude/commands/publish-project.md`.

Then invoke with `/publish-project` (after a fresh session, so the command loads), or just
describe the task in natural language ("publish my new project") — both trigger the skill.

> When editing the skill, edit the `publish-project/` folder here, re-copy it to
> `~/.claude/skills/`, and re-package the `.skill` so all stay in sync. The command wrapper
> rarely changes (it just points at the skill).
