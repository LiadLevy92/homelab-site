# Changelog — Homelab Site

כל שינוי משמעותי מתועד כאן עם תאריך וגרסה.
פורמט: `## vX.Y.Z — Month YYYY`

---

## v1.0.0 — May 2026

**Launch ראשון של האתר.**

### נבנה
- **Boot sequence** — overlay טרמינל מלא-מסך עם 6 שורות, נעלם בלחיצה
- **Floating nav** — 13 קישורים, מופיע אחרי scroll 200px, active state
- **Scroll reveal** — IntersectionObserver על כל הרכיבים
- **Stats bar** — 7 מדדים: VMs, Docker, Backups, Git Repos, Workflow, Brain Bot, HA Entities (663)

### סקשנים
- § 01 PRINCIPLES — 6 עקרונות עיצוב, גריד 3 עמודות עם corner brackets
- § 02 HARDWARE — Intel i7-3770, 16GB DDR3, Samsung 870 EVO + WD 1TB + Seagate 500GB
- § 03 NETWORK — Topology diagram: Cellcom Fiber → Gateway → Server/Switch
- § 04 SERVICES — טבלת 4 VMs + 6 vlan-cards (n8n, Cloudflare, Second Brain, PostgreSQL, Tailscale, AdGuard)
- § 05 UNLOCKS — 4 unlock-cards: AI In Your Pocket, Zero-Touch Inbox, Always-On Smart Home, Remote Access
- § 06 AUTOMATIONS — n8n InboxNinja (active) + HA automations (coming soon)
- § 07 SECOND BRAIN — 4 brain-grid cards: What It Does, Architecture, Status, Operations
- § 08 WORKFLOW — 5-step stepper + 4 unlock-cards על Claude Code workflow
- § 09 WHY THIS WORKS — 2 unlock-cards + terminal mock "ASK ANYTHING"
- § 10 PLANNING — 4 phase-cards: VLANs, HA Automations, n8n, Surveillance
- § 11 DOCS — 6-item docs-grid: CLAUDE.MD, CHANGELOG, NETWORK, GitHub×2, THIS SITE
- § 12 JOURNEY — 6 vlan-cards: PHASE 1-6 (Foundation → Smart Home → Network → Auto → Brain → Docs)
- § 13 RECOVERY — 8 צעדי שחזור מאפס

### Design System
- Design tokens: CSS variables בלבד, ללא Tailwind
- Fonts: Chakra Petch + IBM Plex Sans + JetBrains Mono
- צבע ראשי: Amber (#ffb547)
- Background: Blueprint grid pattern עם radial gradient

### טכני
- `is:inline` על boot script בלייאאוט למניעת FOUC
- brain-grid: explicit 4 columns (לא auto-fill)
- Build: Astro 4 static output → Cloudflare Pages

---

## v1.1.0 — May 2026

### שינויים
- **דף הבית** — עיצוב מחדש מלא. הוחלף העיצוב הטכני/Tailwind בדף נחיתה נקי ואנושי
  - פונט: IBM Plex Sans weight 300 — רך, לא טכני
  - כותרת ענקית "Liad Levy" ב-weight קל וletter-spacing שלילי
  - bio קצר ואישי: הומלאב, אבא לשתיים, סקרן
  - CTA כפול: Homelab (amber) + GitHub (mono)
  - אין Tailwind — CSS 순수 inline ב-Astro
  - אין Hebrew בממשק — אנגלית בלבד

---

*עדכן קובץ זה בכל שינוי. תאריך + גרסה + תיאור קצר.*
