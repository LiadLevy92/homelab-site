# Changelog — Homelab Site

כל שינוי משמעותי מתועד כאן עם תאריך וגרסה.
פורמט: `## vX.Y.Z — Month YYYY`

---

## v3.7.0 — June 2026

### וידאו הדגמה חי בדף האנטנה הפיזית

- **`/projects/antenna-build` — וידאו 1 (הדגמה חיה)** — נוסף סרטון מוטמע ב-§04 (מדידות) שמראה את האנטנה עובדת בלייב: מחולל אותות משדר על 1.96GHz והשיא קופץ על מנתח הספקטרום (Keysight N9321C) בדיוק באותו תדר. `<video controls preload="none" playsinline>` עם `poster` (פריים השיא), מוגש מ-`public/.../antenna-build/video/`.
  - **דחיסה:** המקור (1080p, 45MB) נדחס ב-ffmpeg ל-`live-demo.mp4` — H.264, 1280×720, CRF 26, ‎`-an` (ללא אודיו, מונע דיבור/שמות מקריים), `+faststart` לסטרימינג. תוצאה ~4.4MB (מתחת למגבלת 25MB/קובץ של Cloudflare Pages).
  - **בחירת סרטון/פרטיות:** מבין שני סרטוני ה"אחרי" נבחר סרטון המעבדה (קליטת אות ממחולל) — נקי לחלוטין. סרטון ה-Wi-Fi השני **לא** הוטמע כי הוא חושף שמות רשתות (SSID) של שכנים.
  - **CSS:** `.ea-figure video` ב-`engineering-article.css` (זהה ל-`img` + רקע שחור). CSP יורש `default-src 'self'` — וידאו מאותו origin מותר, ללא שינוי ב-`_headers`.

---

## v3.6.0 — June 2026

### 9 פרויקטים חדשים + גלריית תמונות במודל

באצ' גדול: פרויקט מעבדה בתקשורת (אקדמי) + 8 פרויקטי מייקר/נגרות, וגלריית תמונות חדשה למודלים.

- **תשתית גלריה במודל** — נוסף שדה אופציונלי `gallery?: string[]` ל-`projects.ts`. כשהוא קיים, ה-`ProjectModal` מציג תמונה ראשית + רצועת thumbnails (כרונולוגית) במקום תמונה בודדת; לחיצה על thumbnail מחליפה את התמונה הראשית. ה-CTA מוסתר אוטומטית כשאין יעד (`href: '#'`). סטיילינג `.modal-thumbs`/`.modal-thumb` ב-`projects.css`.
- **`/projects/antenna-build`** — פרויקט מעבדה בקורס תקשורת (electrical_eng, דף פנימי): בניית אנטנה פיזית ומדידתה. נאמן למקור: הצטרפות מאוחרת לקבוצה, שיפורים, ומדידות עם הערכים המודפסים על מסכי הציוד (VNA Keysight E5063A — S11 ב-2.026GHz ‎-25.842dB; מנתח ספקטרום N9321C — שיא ב-1.96GHz ‎-27.04dBm). הדגמה אמיתית: קליטת Wi-Fi של שכנים. **לא** הוגשה סימולציה/דוח. לא פורסמו צילומי מסך מיוטיוב (צד-שלישי) ולא חולצו פריימים מסרטון ה-Wi-Fi (פרטיות שכנים).
- **8 כרטיסי מייקר/חומרה (modal + גלריה)** — ספק כוח שולחני (מ-PSU של מחשב), חיפוי קיר סלון, ו-6 פרויקטי נגרות (תמונת קיר גיאומטרית, שולחן עגול, שידת לילה, ארון מטבח מודולרי, ספסל פינתי למרפסת, אדנית). כל פרויקט = כרטיס נפרד שפותח מודל עם הסבר קצר + תמונות בסדר כרונולוגי.
  - **תמונות:** אופטימיזציה ב-jimp עם תיקון אוטומטי של EXIF orientation (תג 6→rotate90) + override ידני לקבצי WhatsApp שנשמרו מסובבים. כל הגלריות אומתו ויזואלית (אוריינטציה + תוכן — תוקנו ערבובים בתיקיית "תמונה לקיר").
  - **פרטיות/קרדיט:** עבודות הנגרות הן של ליעד (נבנו במסגרת קורס נגרות); שם בעל הנגרייה הושמט.
- עודכן `sitemap.xml`.

---

## v3.5.0 — June 2026

### פרויקט אקדמי שני — דילר בינגו על מיקרו-בקר

נוסף הפרויקט הפנימי השני מסוג "בלוג מחקר הנדסי", הראשון בקטגוריה שמבוסס על קוד משובץ.

- **`/projects/microcontroller-bingo`** — פרויקט גמר בקורס מיקרו-מחשבים: קוד C על בקר KEIL MCBSTR9 המדמה דילר במשחק בינגו (כפתורים, פוטנציומטר→ADC, צג LCD, נוריות LED רצות). מאמר עברית RTL נאמן למקור: תקציר, רקע לבחירה (כולל סיפור המקור — משחק בינגו משפחתי), מהלך המשחק, רקע תיאורטי, תרשים זרימה (גרפי + מילולי), קוד והמשך פיתוח (תכנון רמקול MP3 להכרזות קוליות).
  - **רכיב חדש `ea-code`** ב-`engineering-article.css` — בלוק קוד Dark מונוספייס (LTR, גלילה אופקית, תווית קובץ). קטעי הקוד (`measure()`/`blink_leds()`, `shuffle()`, הלולאה הראשית) הועתקו מילה-במילה מהמקור.
  - **דיוק ופרטיות:** התוכן והקוד הועתקו מדויק מקובץ ה-DOCX; **הוסרו** שמות המגישים, מספרי ת.ז., שם המדריכה ומספר חברי הצוות (ריפו ציבורי). דמות הקלפים מ-freepng (CC BY-NC) לא פורסמה; פורסמו לוח ה-MCBSTR9, תרשים הזרימה ותצלום סביבת הפיתוח.
- **כרטיס ב-`projects.ts`** — קטגוריה `electrical_eng`, badge `📜 Published`, thumbnail מלוח ה-MCBSTR9.
- עודכן `sitemap.xml`.

---

## v3.4.0 — June 2026

### סקיל `publish-project` נשמר בריפו

ה-workflow של "חומרי גלם → דף באתר" הפך ל-Claude Code skill, ונשמר בריפו לגיבוי/גרסאות/שיתוף.

- **`skills/publish-project/`** — מקור הסקיל (`SKILL.md` + `references/`: categories, extraction-toolchain, accuracy-and-privacy). הסקיל מותקן ב-`~/.claude/skills/` ורץ עם `/publish-project`.
- **`skills/publish-project.skill`** — חבילה בודדת (zip, נתיבי forward-slash cross-platform) להתקנה/שיתוף בקליק.
- **`skills/README.md`** — מה זה + הוראות התקנה/עדכון. התיקייה `skills/` לא נכנסת ל-build (Astro בונה רק `src/`+`public/`).
- **`skills/publish-project.command.md`** — wrapper לפקודת-סלאש (מותקן ב-`~/.claude/commands/`) כדי ש-`/publish-project` יופיע בתפריט ה-`/`. סקילים לבדם מופעלים ע"י המודל ולא מופיעים שם.
- אומת ב-dry-run עם סוכן "קר" (ללא הקשר): זיהה קטגוריה נכונה, הסיר שם/ת.ז./מרצה, שמר ערכים נאמן למקור, עצר לפני git — ואף תפס אי-התאמה בין תמונה לפרויקט וסירב לפרסם.

---

## v3.3.0 — June 2026

### פרויקט אקדמי ראשון + EngineeringArticleLayout

נוסף הדף הפנימי הראשון מסוג "בלוג מחקר הנדסי", וה-Layout הרב-פעמי שמאחוריו.

- **`EngineeringArticleLayout.astro` + `engineering-article.css`** — שפת עיצוב חדשה לפרויקטים אקדמיים/הנדסיים (`linkType:'internal'`): Dark research-blog בסגנון IEEE/OpenAI. תומך RTL+LTR, abstract מובלט, סקשנים ממוספרים, `ea-figure`/`ea-figrow` עם captions, נוסחאות (`ea-eq`), callouts של מסקנות (`ea-callout`), טבלת specs ו-references. **מוכן להזרקת פרויקטי לימודים עתידיים.**
- **`/projects/conical-horn-antenna`** — פרויקט גמר בקורס אנטנות (אנטנת שופר קונית וקונית משוננת, 10GHz, MATLAB Antenna Toolbox). מאמר עברית RTL נאמן למקור: 8 סקשנים, 14 איורים, נוסחאות כיווניות, 4 חקירות (תדר / גובה קונוס / רדיוס מפתח / מערך).
  - **דיוק:** כל התוכן הועתק מדויק מקבצי המקור; captions של איורי התדרים נושאים את הערך המודפס על האיור. **הוסרו** שמות הצוות, מספר הסטודנטים, ת.ז. ושם המרצה (פרטיות — ריפו ציבורי).
  - **נכסים:** 14 איורים מסוננים (מתוך המצגת) + רינדור hero, מאופטמים ב-jimp → `public/assets/projects/electrical_eng/conical-horn-antenna/images/`. חומרי הגלם (Word/PDF/PPTX) נשארו פרטיים ב-`raw_projects_assets/`.
- **הכרטיס** ב-`projects.ts` עודכן: `electrical_eng`, `state:1` (📜 Published), `linkType:'internal'`. נוסף הדף ל-`sitemap.xml`.

---

## v3.2.0 — June 2026

### עמוד חדש — Projects Hub (`/projects`)

עמוד מרכזי אחד שמאגד את כל סוגי העשייה (קוד/AI, מייקר/חומרה, הנדסה/אקדמיה, HomeLab) בגריד אחיד עם סינון מהיר.

- **עיצוב:** "Clean Tech / Bento" — Dark Mode עדין, אנגלית LTR. כרטיסי bento עם גבול דק + hover (הרמה + glow). badges חיים מסגנון ה-homelab (ירוק/צהוב/סגול/אפור לפי מצב).
- **ארכיטקטורה:**
  - `src/data/projects.ts` — מקור נתונים יחיד (טייפים + מערך פרויקטים + `getBadge(category,state)`). זה הקובץ לעריכה כדי להוסיף/לעדכן פרויקט.
  - `src/components/projects/ProjectCard.astro` + `ProjectModal.astro`, `src/styles/projects.css`.
  - 4 קטגוריות + טאב "All", סינון client-side ב-vanilla JS (כמו שאר האתר). ברירת מחדל `software_ai`.
  - שני סוגי ניווט: `linkType:'internal'` (עוגן לדף מלא) ו-`'modal'` (פופ-אפ עם תמונה + TL;DR + CTA).
- **תוכן ראשוני (2 פרויקטים אמיתיים לבדיקת שני המסלולים):**
  - **Self-Hosted Homelab** (`homelab_infra`, internal) → מנווט ל-`/homelab`.
  - **Second Brain Bot** (`software_ai`, modal) → פופ-אפ עם CTA ל-`/second-brain`.
- **נכסים:** תמונות מתפרסמות תחת `public/assets/projects/<category>/<project>/images/`. חומרי גלם (Word/PDF/PPTX) ב-`raw_projects_assets/` **מחוץ ל-`public/`** — לא מתקמפל ל-`dist/` (ראה `raw_projects_assets/README.md` ל-workflow המלא).
- **ניווט:** נוסף "Projects" לסיידבר + drawer בדף הבית. נוסף `/projects` ל-`sitemap.xml`.

---

## v3.1.0 — June 2026

### דף Homelab — שירות חדש: CT 112 claude-dash

לפי כלל הסנכרון אתר↔תשתית — נוסף שירות חדש למערך:
- **§04 Services** — שורת טבלה חדשה: CT 112 `claude-dash` (pve2 · LXC, Claude Code usage analytics). נוסף vlan-card "CLAUDE DASHBOARD — ANALYTICS".
- **Stats** — `8 → 9` VMs+LXC. **Boot** — `8 → 9 guests`. **§03 Topology** — dev node `2 → 3 guests`.
- **§13 Recovery** — צעד dev node כולל עכשיו גם claude-dash (112).

---

## v3.0.0 — June 2026

### דף Homelab — ריענון תוכן מלא: ארכיטקטורת שני שרתים

עד כה האתר תיאר שרת **יחיד** (4 VMs). עודכן כך שיתאים למצב החי בפועל על השרתים (אומת מול `qm list`/`pct list` על שני המארחים).

**שינויי תוכן מרכזיים:**
- **שני שרתים** — `pve` (אחסון, ה-i7-3770) + `pve2` (פיתוח, PVE 9.2.3, NVMe). Hero, Hardware, Topology, Journey, Recovery עודכנו בהתאם.
- **Stats bar** — הוחלפו: `2 Proxmox Nodes` · `8 VMs+LXC` · `Daily Backups` · `3 Git Repos` · `2 Active Workflows` · `0 Open Ports` · `663 HA Entities`.
- **§02 Hardware** — brain-grid: Storage Node · Dev Node · Drives · Backups. תוקן גיבוי ל-22:30→23:30 (היה 02:30+22:30).
- **§03 Network** — נוסף Dev Node לטופולוגיה, שם ראשון → Storage Node. REV · 2026.06.
- **§04 Services** — הטבלה הורחבה ל-**8 אורחים** עם עמודת Node + סוג VM/LXC: נוספו NAS (104), Vaultwarden (105), devstore (110), Immich (111). תוקן: 100/103 הם LXC. vlan-cards: הוסרו Second Brain + PostgreSQL, נוספו Immich · Vaultwarden · NAS.
- **§05 Unlocks** — נוספו 2 כרטיסים: "My Own Google Photos" (Immich) + "Self-Hosted Passwords" (Vaultwarden). תוקן ניסוח "4 VMs".
- **§07 Second Brain** — מסגור מחדש: הבוט **עבר מהשרת** ל-Vercel+Supabase. כרטיס "From Homelab to Cloud".
- **§09** — שאלת terminal עודכנה (Second Brain/VM 102 → Immich/dev node).
- **§12 Journey** — נוספו PHASE 7 (Second Node) + PHASE 8 (Self-Hosted Suite). PHASE 5 עודכן (הבוט עבר לוורסל).
- **§13 Recovery** — הורחב ל-11 צעדים: NAS (104), Vaultwarden (105), והקמת dev node + Immich.
- **Stack tags** — נוספו Immich · Vaultwarden · Samba · LXC · Vercel · Supabase.

> 🔄 **כלל סנכרון:** מעתה — כל שינוי תשתית ב-homelab מתועד גם כאן באתר, באותה רוח של "docs ship with the change".

---

## v2.2.0 — May 2026

### שיפור רוחבי — UX, אבטחה, נגישות, SEO (3 גלים)

**גל 1 — 🔴 Must:**
- **OG images** — נוצרו 3 תמונות preview על-מותג (1200×630, Chrome-headless) לכל דף, ב-`public/og/`. חוט `og:image` + `twitter:image` + שדרוג Twitter card ל-`summary_large_image`. עכשיו יש preview בשיתוף לינק בוואטסאפ/לינקדאין/טלגרם
- **Security headers** — `public/_headers` ל-Cloudflare Pages: CSP, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy + caching ל-assets
- **הגנת ספאם לוויטליסט** — honeypot field נסתר + בדיקת timing (submit מתחת ל-2.5 שניות) → fake-success שקט בלי INSERT ל-DB / ספאם טלגרם

**גל 2 — 🟡 נגישות + SEO מבני:**
- **כותרות סמנטיות** — 13 section titles בדף Homelab הומרו מ-`<div>` ל-`<h2>` (document outline תקין)
- **ניגודיות** — הובהרו גוונים מעומעמים שנפלו מ-WCAG AA (`--text-muted`/`--text-faint` בהומלאב, dim colors בדף הבית)
- **`lang` attributes** — סימון בלוקים אנגלית/עברית בדף הבית הדו-לשוני
- **`prefers-reduced-motion`** — מכבה אנימציות/cursor glow למשתמשים שביקשו

**גל 3 — 🟢 ליטוש:**
- **קיצוץ פונטים** — הוסר משקל 500 (הומלאב) + 600 ואיטלקים (בית) שלא בשימוש
- **apple-touch-icon** — `apple-touch-icon.png` 180×180 בכל הדפים
- **Email obfuscation** — הכתובת מורכבת ב-runtime, לא plaintext ב-HTML/JS (עדיין עובד מלא)
- **סמנטיקה** — פריט nav מושבת "Web App" מ-`<a>` ל-`<span aria-disabled>`

> ⏭️ נשאר לעתיד: שדרוג הגנת הספאם ל-Cloudflare Turnstile (דורש הקמת widget בדשבורד).

---

## v2.1.0 — May 2026

### דף Second Brain — Telegram Demo + Scenario Cards refactor

**Telegram Demo (חדש):** אנימציית שיחה חיה בטלגרם בין Hero ל-Scenarios.
- חלון טלגרם dark-theme אותנטי (header, online, input bar)
- 3 סצנריות מתחלפות בלולאה: תזכורת ביתית → לינק יוטיוב (מתכון) → הקלטה קולית עסקית
- typewriter בתיבת הקלט → "🤔 מנתח..." → כרטיס ניתוח קלוד נחשף בהדרגה (bullets, tags, עדיפות) → מחוות לחיצה ירוקה על "שמור" → הודעת אישור
- IntersectionObserver מפעיל את הלולאה כשהסקשן נכנס לפריים

**באג קריטי שתוקן — Astro CSS scoping:**
- `<style>` רגיל ב-Astro מקבל `data-astro-cid-*` scope. אלמנטים שנוצרים דינמית ב-JS (בועות הצ'אט) לא קיבלו את ה-attribute → **אפס CSS עליהם**
- תוקן: `<style>` → `<style is:global>` (דף עצמאי, ללא סיכון leakage)
- בועות: `float: right` (משתמש) / `float: left` (בוט) — physical, חסין ל-RTL
- שעות הדגמה קבועות (16:28 / 14:52 / 11:07) במקום שעת הרצה אמיתית

**Scenario Cards — refactor מלא לקריאות מובייל:**
- הוחלף קיר טקסט בכרטיסים קומפקטיים: אימוג'י גדול + setup→punchline (משפט בעיה אחד)
- pill סגול-זוהר אחיד "פשוט שלחו לבוט 🤖" בכל 3 הכרטיסים — החזרה מחזקת את המסר
- layout ממורכז, פונטים גדולים, hover lift + chip scale
- מובייל: עמודה אחת מוגבלת ל-440px

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
