# CLAUDE.md — Homelab Site

> קובץ זיכרון חי לקלוד. מכיל את כל מה שצריך לדעת על האתר.
> בתחילת כל שיחה על האתר — קרא קובץ זה קודם.
> בסוף כל שינוי משמעותי — עדכן את ה-Changelog בתחתית.

---

## 🌐 הפרויקט

אתר תיעוד חי של ה-homelab של ליאד לוי.
מבוסס על עיצוב שנוצר בהשראת vdbfam.com/homelab, מותאם לתוכן ולסגנון האישי.

**URL:** `https://liad-dev.com/homelab`
**Deploy:** Cloudflare Pages ← GitHub (push = auto-deploy)
**Repo:** `LiadLevy92/homelab-site` (GitHub)

---

## 📄 דפים

| דף | קובץ | סגנון |
|----|------|--------|
| `/` | `src/pages/index.astro` | עצמאי, CSS inline, אנושי/רך |
| `/homelab` | `src/pages/homelab/index.astro` | HomelabLayout, terminal aesthetic |

**דף הבית:** עיצוב נקי ואנושי — IBM Plex Sans weight 300, לא טכני, לא Tailwind. אסור לשנות לסגנון הטרמינלי של ה-homelab.

---

## 🛠 Stack

| כלי | שימוש |
|-----|--------|
| **Astro 4** | Static site generator, file-based routing |
| **Custom CSS** | `src/styles/homelab.css` — **ללא Tailwind** |
| **Chakra Petch** | Display font — כותרות |
| **IBM Plex Sans** | Body font — טקסט |
| **JetBrains Mono** | Mono font — קוד, badges, nav |

---

## 📁 מבנה קבצים

```
site/
├── src/
│   ├── pages/
│   │   ├── index.astro          ← דף הבית (placeholder)
│   │   └── homelab/
│   │       └── index.astro      ← דף ה-homelab הראשי
│   ├── layouts/
│   │   └── HomelabLayout.astro  ← Layout wrapper (head, fonts, boot script)
│   └── styles/
│       └── homelab.css          ← כל ה-CSS של הדף
├── public/
│   └── favicon.svg
├── CLAUDE.md                    ← קובץ זה
├── CHANGELOG.md                 ← לוג שינויים
├── astro.config.mjs
└── package.json
```

---

## 🎨 Design System

### CSS Variables (tokens)
```css
--bg: #0a0b10          /* רקע ראשי */
--amber: #ffb547       /* צבע ראשי — accent */
--ok: #4ef19a          /* ירוק — live/active */
--cyan: #00d4ff        /* כחול — secondary */
--text: #edeef5        /* טקסט ראשי */
--text-dim: #a8acc0    /* טקסט משני */
--line: #1d2030        /* גבולות עדינים */
--line-bright: #2b3044 /* גבולות בולטים */
```

### פונטים
- `var(--font-display)` — Chakra Petch — כותרות, section titles
- `var(--font-body)` — IBM Plex Sans — טקסט רגיל
- `var(--font-mono)` — JetBrains Mono — קוד, badges, nav

### רכיבים עיקריים

| Class | שימוש |
|-------|--------|
| `.vlan-card` + `.vlan-badge` | כרטיסי שירותים עם badge מונח |
| `.unlock-card` + `.unlock-title` | כרטיסים עם קו ענבר שמאלי |
| `.phase-card` + `.phase-title` | כרטיסי תכנון |
| `.brain-grid` | גריד 4 עמודות (hardware, second brain) |
| `.workflow-steps` | סטפר אופקי 5 שלבים |
| `.docs-grid` | גריד 3 עמודות עם border separators |
| `.reveal` | Scroll reveal — IntersectionObserver |
| `.section-header` | כותרת סקשן עם קו ענבר שמאלי |
| `.act` | מחיצת ACT I / II / III |

### Corner brackets
כרטיסים, topo-boxes, ו-principles משתמשים ב-`::before`/`::after` פסאודו-אלמנטים לסימוני L בפינות.

---

## 📐 מבנה הדף (13 סקשנים)

```
Boot sequence overlay
Floating nav (13 קישורים)
Hero + Stats bar (7 stats)

ACT I — THE SYSTEM
§ 01 PRINCIPLES  — 6 עקרונות, גריד 3 עמודות
§ 02 HARDWARE    — brain-grid 4 כרטיסים (CPU, Storage, Backups, Extras)
§ 03 NETWORK     — topology diagram עץ
§ 04 SERVICES    — טבלת VMs + 6 vlan-cards
§ 05 UNLOCKS     — 4 unlock-cards (2 עמודות)

ACT II — THE PROJECTS
§ 06 AUTOMATIONS — 2 vlan-cards (n8n active, HA dim)
§ 07 SECOND BRAIN — brain-grid 4 כרטיסים

ACT III — THE PROCESS
§ 08 WORKFLOW    — 5-step stepper + 4 unlock-cards
§ 09 WHY THIS WORKS — 2 unlock-cards + killer terminal mock
§ 10 PLANNING    — 4 phase-cards
§ 11 DOCS        — 6-item docs-grid
§ 12 JOURNEY     — 6 vlan-cards (PHASE 1–6)
§ 13 RECOVERY    — 8 recovery steps

Closing stack block (Built Different)
Footer
```

---

## ⚠️ כללי אבטחה

- **אסור לרשום** כתובות IP, שמות משתמש, סיסמאות, כתובות אימייל
- VMs מופיעים לפי מספר בלבד (VM 100, VM 101...)
- URLs חיצוניים מוצגים כ-"Cloudflare endpoint" ולא כ-subdomain מלא
- שם המשתמש GitHub (`LiadLevy92`) מותר — זה ציבורי

---

## 🚀 Deploy

**Cloudflare Pages:**
- Root dir: `/` (שורש הריפו)
- Build command: `npm run build`
- Build output: `dist`
- Auto-deploy: כל push ל-`main` → deploy אוטומטי

**לבדוק לפני push:**
```bash
npm run build   # חייב לעבור בלי שגיאות
```

---

## 📋 Changelog

ראה `CHANGELOG.md`
