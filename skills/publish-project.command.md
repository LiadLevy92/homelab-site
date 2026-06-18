---
description: Publish a new project from raw_projects_assets/ to the /projects page of liad-dev.com
argument-hint: "[project name or category, optional]"
---

Use the **publish-project** skill (invoke it via the Skill tool) to publish project
materials onto the `/projects` hub of the homelab-site repo.

Follow the skill's workflow exactly: scan `raw_projects_assets/` for new (unpublished)
projects, show what's new, then for the chosen project extract its content faithfully from
Word/PDF/PPTX, strip personal data (names, IDs, lecturer), curate and optimize the figures,
and publish a Bento card plus — per the category's rules — an internal
`EngineeringArticleLayout` article or a modal. Build and verify, update sitemap/CHANGELOG/
CLAUDE.md, then **stop before commit/push** for Liad to review.

Honor the strict-accuracy and privacy rules from the skill's reference files.

Project / category to publish (optional — if empty, scan and show what's new): $ARGUMENTS
