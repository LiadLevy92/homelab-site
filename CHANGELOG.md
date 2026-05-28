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

## v1.2.0 — May 2026

### שינויים
- **Spotlight glow** — אפקט זוהר עוקב-סמן על כל כרטיסי הדף
  - JS: `mousemove`/`mouseleave` listeners על 10 סוגי אלמנטים — מעדכן `--mouse-x`/`--mouse-y` CSS vars
  - CSS: `radial-gradient` ב-`background-image` (400px, amber 9% opacity) משתמש ב-vars אלו
  - תיקון קריטי: כל `background:` shorthand על hover states הוחלף ב-`background-color:` כדי לשמור על ה-gradient
  - אלמנטים מושפעים: `.card`, `.vlan-card`, `.principle`, `.unlock-card`, `.phase-card`, `.topo-box`, `.doc-item`, `.recovery-item`, `.stat`, `.workflow-step`

---

## v1.3.0 — May 2026

### שינויים
- **דף Second Brain** — `liad-dev.com/second-brain` — דף נחיתה + טופס וויטליסט
  - Hebrew RTL, dark mode, indigo (#6366f1) כצבע ראשי
  - פונטים: IBM Plex Sans + Rubik (section labels) + Secular One (badges) — Hebrew-native
  - טופס: שם + אימייל → Supabase `waiting_list` table (עם RLS)
  - סקשנים: Hero, Scenarios ("מכירים את זה?"), Waitlist Form
  - הודעות: הצלחה / כפול / שגיאה
  - Copywriting: פנייה ברבים לאורך כל הדף
- **דף הבית** — נוספו כפתורים: Second Brain (indigo) + LinkedIn
- **Supabase** — נוצרה טבלת `waiting_list` עם RLS (anon INSERT, authenticated read/update)
- **Telegram notifications** — הודעה אוטומטית בכל הרשמה חדשה (נבדק ועובד):
  - Edge Function `notify-waitlist` (Deno, ACTIVE) — קורא `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` מ-Secrets
  - pg_net extension מותקן ופעיל
  - DB Trigger `on_waitlist_signup` — AFTER INSERT על `waiting_list` → קורא ל-Edge Function

---

## v1.4.0 — May 2026

### תיקון תשתית — Cloudflare Routing

**בעיה שאובחנה:** לאחר deploy ל-Cloudflare Pages, כל הסאבדומיינים (`n8n.liad-dev.com`, `homeassistant.liad-dev.com`) הציגו את דף הבית במקום לנתב דרך הטאנל.

**סיבת השורש:** הפרויקט `homelab-site` ב-Workers & Pages הוגדר עם Route `*.liad-dev.com/*` — wildcard שתפס את כל הסאבדומיינים לפני שהגיעו לטאנל.

**תיקון:**
1. נמחק ה-Route `*.liad-dev.com/*`
2. נוסף Route ספציפי `liad-dev.com/*` (apex בלבד — ללא wildcard)
3. נוסף Redirect Rule ב-Cloudflare: `www.liad-dev.com` → `https://liad-dev.com` (301)

**תוצאה:**
- ✅ `liad-dev.com` — מגיש את האתר מ-Pages
- ✅ `n8n.liad-dev.com` — עובד דרך הטאנל
- ✅ `homeassistant.liad-dev.com` — עובד דרך הטאנל
- ✅ `www.liad-dev.com` — redirect ל-apex

### ⚠️ הערה לעתיד
בכל deploy עתידי לאתר — לוודא שה-Route בWorkers & Pages הוא `liad-dev.com/*` בלבד, **לא** `*.liad-dev.com/*`.

---

## v1.5.0 — May 2026

### דף הבית — Refactor מלא לסידבר צף

**עיצוב מחדש מלא של `/`** בהשראת Vercel/Supabase dashboard.

#### Layout
- הוחלף עיצוב ה-CTA buttons ב-**Floating Sidebar** קבוע משמאל (240px)
- תוכן ראשי ממורכז מימין לסיידבר, `max-width: 660px`

#### Sidebar
- **Top:** ⚡ `PERSONAL HUB` — IBM Plex Mono, uppercase
- **Nav:** Homelab / Second Brain / Web App (badge "Soon", dim)
  - Hover: rounded background `rgba(255,255,255,0.05)` + spotlight glow ענבר
- **Bottom:** GitHub + LinkedIn עם SVG brand icons inline, מיושרים אופקית

#### Mobile
- Sidebar מוסתר — מוחלף ב-**Top Navbar** עם ⚡ PERSONAL HUB + hamburger button
- לחיצה על hamburger → **Drawer** מחליק מהשמאל עם כל הקישורים
- Overlay כהה מאחורי ה-drawer, לחיצה עליו סוגרת

#### Copy
- Label: `ABOUT ME —` (במקום `Hello —`)
- Tagline: `Electrical Engineering Student (RF Track) · Israel`
- Bio: 4 פסקאות נפרדות עם gap, closing line italic ומעומעמת

#### Cursor Effects
- **Spotlight על סיידבר** — `radial-gradient` 200px amber על `.nav-item` ו-`.ext-link`
  - `background:` shorthand → `background-color:` לשמירת ה-gradient
  - JS `mousemove`/`mouseleave` per-element
- **Global cursor glow** — fixed overlay, `radial-gradient` 550px amber (5.5% opacity)
  - JS tracks `mousemove` על `document`, מעדכן `--cx`/`--cy` CSS vars
  - נעלם כש-mouse יוצא מהדף

---

## v2.0.0 — May 2026

### דף Homelab — §06 AUTOMATIONS: Daily Feedback Review

- **כרטיס n8n חדש** — "N8N — FEEDBACK REVIEW" (badge: active)
  - Daily Feedback Review flow — רץ כל יום ב-09:00
  - שולף פידבק חדש מ-Notion, מנתח עם Claude API בעברית
  - שולח Telegram עם ניתוח + מעדכן Notion Status → In Review
- כרטיס HA (coming soon) הועבר ל-delay-3

---

## v1.9.0 — May 2026

### דף Homelab — AdGuard + Tailscale DNS

- **§04 SERVICES — AdGuard vlan-card** — עודכן לתאר את ה-DNS הגדרה הנוכחית:
  - "Router-level DNS — whole-home blocking, zero per-device config"
  - "Tailscale DNS override — ad-free on any device, anywhere"
- **§05 UNLOCKS — כרטיס 5** — נוסף unlock-card חדש "Ad-Free Everywhere" (badge: live):
  - מסביר: ראוטר מצביע ל-AdGuard → כל מכשיר בבית מכוסה אוטומטית
  - Tailscale DNS override מרחיב את החסימה גם מחוץ לבית (נייד + מחשב)
  - אין הגדרה ידנית לכל מכשיר, אין תוסף דפדפן

---

## v1.8.0 — May 2026

### דף הבית — עברית + כפתור יצירת קשר

- **Metadata** — כותרת ותיאור עודכנו לעברית לקידום SEO בגוגל ישראל
  - `og:locale = he_IL` + JSON-LD בעברית
- **תוכן** — ביו מלא בעברית: 6 פסקאות אישיות על הומלאב, AI, הנדסת חשמל ומילואים
  - label שונה ל-`מי אני —`, tagline תורגם לעברית
  - `direction: rtl; text-align: right` על כל תוכן עברי — layout הסיידבר נשאר LTR
- **כפתור יצירת קשר** — dropdown אנימציה מתחת לביו:
  - "פתח ב-Gmail" → Gmail Compose URL עם subject מוכן
  - "העתק כתובת מייל" → Clipboard API + אישור "הועתק! ✓" ל-2 שניות

---

## v1.7.0 — May 2026

### SEO — קידום אורגני

- **כל 3 הדפים** קיבלו metadata מלא:
  - `<meta name="keywords">` — מילות מפתח רלוונטיות לכל דף
  - `<meta name="robots" content="index, follow">`
  - `<meta name="author" content="Liad Levy">`
  - `<link rel="canonical">` — URL קנוני מדויק
- **Open Graph** — `og:title`, `og:description`, `og:url`, `og:type`, `og:site_name`
  - דף Second Brain: `og:locale = he_IL`
- **Twitter Card** — `summary` card בכל דף
- **JSON-LD Person Schema** — דף הבית: Person schema עם `sameAs` ל-GitHub ו-LinkedIn
- **sitemap.xml** — `public/sitemap.xml` עם 3 URLs + priority weights
  - `liad-dev.com/` → priority 1.0
  - `liad-dev.com/homelab` → priority 0.9
  - `liad-dev.com/second-brain` → priority 0.8
- **`<link rel="sitemap">`** — בכל דף, לגוגלבוט

---

## v1.6.0 — May 2026

### תיקוני Mobile — דף Homelab

- **§03 NETWORK — Topology** — תוקן overflow על מסכים צרים
  - נוסף `min-width: max-content` ל-`.topo-tree` — הדיאגרמה גולשת אופקית בתוך `.topo-wrap` במקום להיחתך
  - נוסף `-webkit-overflow-scrolling: touch` ל-`.topo-wrap` — גלילה חלקה ב-iOS
- **§04 SERVICES — VM Table** — תוקן גלישת עמודות על נייד
  - הטבלה עוטפת ב-`<div class="vm-table-scroll">` עם `overflow-x: auto`
  - כל 5 עמודות (VM, Name, Role, OS, Status) נגישות על כל רוחב מסך

---

*עדכן קובץ זה בכל שינוי. תאריך + גרסה + תיאור קצר.*
