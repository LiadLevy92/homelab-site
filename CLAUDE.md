# CLAUDE.md — Homelab Site

> קובץ זיכרון חי לקלוד. מכיל את כל מה שצריך לדעת על האתר.
> בתחילת כל שיחה על האתר — קרא קובץ זה קודם.
> בסוף כל שינוי משמעותי — עדכן את ה-Changelog בתחתית.

---

## 🌐 הפרויקט

אתר תיעוד חי של ה-homelab של ליעד לוי.
מבוסס על עיצוב שנוצר בהשראת vdbfam.com/homelab, מותאם לתוכן ולסגנון האישי.

**URL:** `https://liad-dev.com/homelab`
**Deploy:** Cloudflare Pages ← GitHub (push = auto-deploy)
**Repo:** `LiadLevy92/homelab-site` (GitHub)

---

## 📄 דפים

| דף | קובץ | סגנון |
|----|------|--------|
| `/` | `src/pages/index.astro` | עצמאי, CSS inline, אנושי/רך |
| `/projects` | `src/pages/projects/index.astro` | עצמאי, "Clean Tech / Bento", English LTR, dark |
| `/projects/<slug>` | `src/pages/projects/<slug>.astro` | EngineeringArticleLayout — מאמר מחקר הנדסי (לפרויקטים `internal`) |
| `/homelab` | `src/pages/homelab/index.astro` | HomelabLayout, terminal aesthetic |
| `/second-brain` | `src/pages/second-brain/index.astro` | עצמאי, Hebrew RTL, indigo (#6366f1) |

**דף Projects:** Hub שמאגד את כל הפרויקטים בגריד Bento עם סינון לפי קטגוריה. **מקור נתונים: `src/data/projects.ts`** (טייפים + מערך + `getBadge()`) — זה הקובץ לעריכה כדי להוסיף פרויקט. רכיבים: `src/components/projects/ProjectCard.astro` + `ProjectModal.astro`, סטייל `src/styles/projects.css`. שני סוגי ניווט: `internal` (עוגן לדף) / `modal` (פופ-אפ). חומרי גלם לעיבוד ב-`raw_projects_assets/` (מחוץ ל-public — ראה ה-README שם ל-workflow). תמונות מתפרסמות תחת `public/assets/projects/`. **מודל עם גלריה:** פרויקט `modal` יכול לכלול `gallery: string[]` (נתיבי תמונות כרונולוגיים) — אז המודל מציג תמונה ראשית + רצועת thumbnails (`.modal-thumbs`); ה-CTA מוסתר כש-`href: '#'` (פרויקט גלריה ללא יעד חיצוני).

**פרויקט `internal` = דף מאמר הנדסי:** פרויקטים עם `linkType:'internal'` (אקדמי/הנדסי) מקבלים דף `src/pages/projects/<slug>.astro` שעוטף ב-**`EngineeringArticleLayout.astro`** (סטייל `src/styles/engineering-article.css`) — בלוג מחקר Dark בסגנון IEEE/OpenAI, תומך RTL/LTR. דוגמה חיה: `conical-horn-antenna.astro`. **כלל דיוק:** התוכן מועתק מדויק מקבצי המקור ב-`raw_projects_assets/`, בלי המצאה/שינוי ערכים; פרטים אישיים (שמות, ת.ז.) מוסרים תמיד. ראה רכיבי ה-Layout בטבלת ה-Design System למטה.

**דף הבית:** Floating Sidebar Layout — Vercel/Supabase inspired. סיידבר שמאלי קבוע 240px + תוכן ממורכז מימין. ללא Tailwind. אסור לשנות לסגנון הטרמינלי של ה-homelab.
- Sidebar: ⚡ PERSONAL HUB, nav (Homelab / Second Brain / Web App Soon), GitHub + LinkedIn SVG icons
- Mobile: top navbar + hamburger → slide drawer
- Cursor effects: spotlight per nav item + global page glow
- להוספת דף חדש: שורה ב-`.sidebar-nav` + שורה ב-`.drawer-nav`

**דף Second Brain:** עצמאי לחלוטין (ללא layout משותף). Hebrew RTL. פונטים: Rubik (section labels) + Secular One (badges). Supabase waitlist + Telegram notifications.

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
│   │   ├── index.astro              ← דף הבית (אנושי, IBM Plex Sans)
│   │   ├── projects/
│   │   │   ├── index.astro          ← דף Projects Hub (Bento, English LTR)
│   │   │   ├── conical-horn-antenna.astro    ← מאמר פרויקט internal (EngineeringArticleLayout)
│   │   │   ├── microcontroller-bingo.astro   ← מאמר פרויקט internal (קוד C, ea-code)
│   │   │   └── antenna-build.astro            ← מאמר פרויקט internal (אנטנה פיזית, מדידות VNA)
│   │   ├── homelab/
│   │   │   └── index.astro          ← דף ה-homelab הראשי (terminal)
│   │   └── second-brain/
│   │       └── index.astro          ← דף Second Brain (Hebrew RTL, indigo)
│   ├── components/projects/
│   │   ├── ProjectCard.astro        ← כרטיס פרויקט (internal / modal)
│   │   └── ProjectModal.astro       ← מודל יחיד (מאוכלס מ-data-*)
│   ├── data/
│   │   └── projects.ts              ← ★ מקור נתוני הפרויקטים + getBadge()
│   ├── layouts/
│   │   ├── HomelabLayout.astro      ← Layout wrapper (head, fonts, boot script)
│   │   └── EngineeringArticleLayout.astro  ← ★ Layout מאמר מחקר הנדסי (פרויקטים internal)
│   └── styles/
│       ├── homelab.css              ← כל ה-CSS של דף ה-homelab
│       ├── projects.css             ← CSS של דף Projects
│       └── engineering-article.css  ← CSS של EngineeringArticleLayout
├── raw_projects_assets/             ← חומרי גלם לפרויקטים (פרטי, מחוץ ל-build)
├── public/
│   ├── favicon.svg
│   ├── apple-touch-icon.png         ← 180×180 (iOS home screen)
│   ├── _headers                     ← Cloudflare security headers (CSP, X-Frame-Options...)
│   ├── sitemap.xml
│   └── og/                          ← OG social preview images (home/homelab/brain.png)
├── CLAUDE.md                        ← קובץ זה
├── CHANGELOG.md                     ← לוג שינויים
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

> **רכיבי EngineeringArticleLayout** (`engineering-article.css`, prefix `ea-`): `.ea-article` (shell RTL/LTR), `.ea-abstract`, `.ea-h2`+`.ea-num` (סקשן ממוספר), `.ea-figure`/`.ea-figrow`+`.ea-figcaption`, `.ea-eq` (נוסחה), `.ea-code`+`.ea-code-label` (בלוק קוד LTR), `.ea-callout` (מסקנות), `.ea-specs` (טבלה), `.ea-refs` (ביבליוגרפיה). פונטים: Rubik (כותרות) + Heebo (גוף, עברית) + JetBrains Mono.

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
§ 02 HARDWARE    — brain-grid 4 כרטיסים (Storage Node, Dev Node, Drives, Backups)
§ 03 NETWORK     — topology diagram עץ (2 שרתים: Storage + Dev node)
§ 04 SERVICES    — טבלת 9 אורחים (ID/Service/Role/Node/Status, עם VM/LXC) + 8 vlan-cards
§ 05 UNLOCKS     — 7 unlock-cards (2 עמודות)

ACT II — THE PROJECTS
§ 06 AUTOMATIONS — 2 vlan-cards (n8n active, HA dim)
§ 07 SECOND BRAIN — brain-grid 4 כרטיסים (עבר ל-Vercel+Supabase)

ACT III — THE PROCESS
§ 08 WORKFLOW    — 5-step stepper + 4 unlock-cards
§ 09 WHY THIS WORKS — 2 unlock-cards + killer terminal mock
§ 10 PLANNING    — 4 phase-cards
§ 11 DOCS        — 6-item docs-grid
§ 12 JOURNEY     — 8 vlan-cards (PHASE 1–8)
§ 13 RECOVERY    — 11 recovery steps

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

**🔒 Security headers (`public/_headers`):** CSP + X-Frame-Options DENY + nosniff + Referrer-Policy + Permissions-Policy. אם מוסיפים מקור חיצוני חדש (פונט/API/תמונה) — לעדכן את ה-CSP בהתאם אחרת הדפדפן יחסום.

**🖼️ OG images (`public/og/*.png`):** 1200×630, נוצרו ע"י Chrome headless מתבניות HTML. לרינדור מחדש: HTML זמני → `chrome --headless=new --screenshot --window-size=1200,630`.

**🛡️ Waitlist spam guard:** honeypot field (`#wl-company`) + timing check (<2.5s) בדף Second Brain. שדרוג עתידי: Cloudflare Turnstile.

---

## ⚠️ Cloudflare Routing — כללי קריטיים

### בעיה שנתקלנו בה (מאי 2026)
הפרויקט ב-Workers & Pages הוגדר עם Route `*.liad-dev.com/*` — wildcard שגרם לכל הסאבדומיינים (`n8n.liad-dev.com`, `homeassistant.liad-dev.com`) להציג את האתר במקום לנתב דרך הטאנל.

### הגדרה נכונה (Workers & Pages → homelab-site → Domains):
| Route | מטרה |
|-------|-------|
| `liad-dev.com/*` | ✅ apex בלבד — Pages מגיש את האתר |
| ~~`*.liad-dev.com/*`~~ | ❌ אסור — חוסם את הטאנל |

### DNS נכון (Cloudflare DNS):
| שם | סוג | תוכן |
|----|-----|------|
| `liad-dev.com` | A | `192.64.119.165` (Pages IP) |
| `n8n` | Tunnel | `homelab` |
| `homeassistant` | Tunnel | `homelab` |
| `www` | — | Redirect rule → `https://liad-dev.com` (301) |

### Cloudflare Tunnel (Zero Trust → Networks → Connectors → homelab → Published application routes):
| Hostname | Service |
|----------|---------|
| `n8n.liad-dev.com` | `http://n8n:5678` |
| `homeassistant.liad-dev.com` | `http://10.100.102.210:8123` |

---

## 🗄️ Supabase — Second Brain Waitlist

**פרויקט:** `secondbrainbot` (ID: `xntytizwljdlblyusfpo`)

| רכיב | פרטים |
|------|--------|
| טבלה | `waiting_list` — שם + אימייל + created_at |
| RLS | anon: INSERT בלבד. authenticated: SELECT/UPDATE |
| Edge Function | `notify-waitlist` — שולח Telegram בכל הרשמה |
| pg_net | מותקן — מאפשר HTTP מ-DB trigger |
| DB Trigger | `on_waitlist_signup` — AFTER INSERT → Edge Function |
| Secrets | `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` (בדשבורד Supabase) |

---

## 📋 Changelog

ראה `CHANGELOG.md`
