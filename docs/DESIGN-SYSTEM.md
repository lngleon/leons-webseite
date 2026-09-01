# DESIGN-SYSTEM.md – Leons Webseite

> **Projekt-Prüfmaßstab** für `/design-review`, über den projektunabhängigen Regelwerken
> [DESIGN-WISSEN.md](./DESIGN-WISSEN.md) (Regeln R…, No-Gos N…/E…/K…) und
> [DESIGN-UMSETZUNG.md](./DESIGN-UMSETZUNG.md) (Rezepte).
> Stand 01.09.2026, destilliert aus den früheren Design-Regeln in **PROJEKT-STAND.md** (dort seit
> Runde 2 nur noch ein Verweis hierher) + „Erkenntnisse & Regeln", **CLAUDE.md** und dem Token-Satz in
> **`src/app/globals.css`**. Gemessen am Build `7332d64`. Die sechs Quellen-Widersprüche aus Runde 1
> hat der User am 01.09.2026 entschieden (§11.1 → Protokoll); W5 bleibt offen.
> **Dieses Dokument ist der einzige Ort für Design-Regeln** – PROJEKT-STAND und CURRENT-SCHEMA
> verweisen nur noch hierher, Werte stehen ausschließlich in `globals.css`.

## 0. Lesart

Jeder Eintrag trägt eine von drei Markierungen:

- **Regel** – beschlossen; Quelle steht dabei. Verstöße sind Befunde.
- **Bestand (gemessen)** – nie entschieden, nur am gebauten Stand abgelesen (Site-Gruppe `src/`,
  ohne `/demo/*`; Utility-Werte aus dem gebauten Tailwind-Chunk aufgelöst). Kein Maßstab, sondern
  Ist-Zustand. Eine Abweichung davon ist kein Verstoß, eine bewusste Entscheidung steht aus.
- **Offen** – die Quellen widersprechen sich; Liste in §11. Wird hier NICHT aufgelöst.

**Rangfolge bei Konflikt:** CLAUDE.md und PROJEKT-STAND (Projektregeln) › dieses Dokument ›
DESIGN-WISSEN / DESIGN-UMSETZUNG. Die Kit-Regeln gelten dort, wo das Projekt schweigt.
Wo eine DESIGN-WISSEN-ID existiert, steht sie in Klammern.

**Token-Werte stehen NICHT hier.** Einzige Quelle für Farbwerte, Verläufe und die Schriftfamilie
ist `src/app/globals.css` (`:root` + `@theme`). Dieses Dokument nennt nur Token-**Namen** und
-**Rollen**.

---

## 1. Grundsatz

| | Aussage | Quelle |
|---|---|---|
| Regel | Stil: futuristisch, clean, edel, premium. Referenzen adrianziegler.de (Dark), farisschmidt.de (Light). | PROJEKT-STAND |
| Regel | **Dark-only.** Kein Light Mode, kein Theme-Toggle. Genau EIN Token-Satz in `:root`, `color-scheme: dark`, `html` ohne Klasse. | CLAUDE.md, PROJEKT-STAND (08.06.2026) |
| Regel | Die Seite selbst ist das Portfolio-Stück – Handwerksqualität ist sichtbares Verkaufsargument. | PROJEKT-STAND |
| Regel | Desktop-first, Mobil voll funktionsfähig. | CLAUDE.md |
| Regel | **Stilprofil „Expressiv"** (DESIGN-WISSEN §2). Es gelten die universellen Regeln R1–R47, die No-Gos N1–N15 **und E1–E7**; die Klassisch-No-Gos **K1–K8 gelten nicht** (Pill-Buttons und Akzent-Glow sind damit kein Verstoß). | User-Entscheidung W1, 01.09.2026 |

**Prüfung Dark-only:** `getComputedStyle(document.body).backgroundColor` liefert den
`--background`-Wert; kein zweites `:root`, kein `[data-theme]`, kein `prefers-color-scheme`-Block
in `globals.css` (die Demo-Gruppe hat einen eigenen Scope, §10).

---

## 2. Farbdisziplin

### 2.1 Token-Rollen (Namen aus `globals.css`, Werte dort)

| Token | Rolle |
|---|---|
| `--background` / `--foreground` | Grundfläche (Near-Black) / Haupttext (gebrochenes Weiß) – R1, R2 |
| `--muted` / `--muted-foreground` | abgesetzte Fläche / **Sekundärtext** (definierte Farbe, keine Opacity-Improvisation – R4, E7) |
| `--card` / `--card-foreground` | Kartenfläche / Kartentext |
| `--border` | neutrale Haarlinie (global als `border-color`-Default gesetzt) |
| `--ring` | Fokusring – zeigt auf `--accent`, **nie Gradient** |
| `--destructive` | Fehlerzustand (Formular) |
| `--accent` / `--accent-solid` / `--accent-foreground` | **flacher** Violett-Akzent: Ränder, Icons, kleine UI, Fokusring; Schrift auf Akzentfüllung |
| `--accent-gradient` | Violett-Verlauf (helle → tiefe Stops), **nur Text-Clip** auf Showcase-Flächen. Source-of-Truth für den Verlauf; innerhalb Violett frei nachjustierbar, der Mittelstop darf leicht ins Pink-Violett |
| `--accent-gradient-strong` | dunkle Violett-Hälfte, **nur Füllung primärer CTAs** |

Tailwind-Utilities (`bg-background`, `text-accent`, `border-border`, `ring-ring` …) lösen per
`@theme inline` auf genau diese Variablen auf.

### 2.2 Regeln

| # | Regel | Prüfung | Quelle |
|---|---|---|---|
| F1 | **Keine Farbwerte im Code** außerhalb `globals.css` – kein Hex, kein rgb/hsl, keine Tailwind-Palettenfarbe. | Suche nach Hex-, rgb- und hsl-Literalen in `src/` → nur die Ausnahmen aus §10. | CLAUDE.md, PROJEKT-STAND |
| F2 | **Eine** Akzentfarbe (Violett) für alle Handlungen und Hervorhebungen. | Kein zweiter Farbton außer `--destructive` für Fehler. | PROJEKT-STAND (R3, N3) |
| F3 | Flacher Akzent (`--accent`/`--accent-solid`) für Ränder, Icons, kleine UI und den **Fokusring**. Der Ring ist nie ein Verlauf. | Jeder Fokusring = `ring-ring`; kein `background-image` auf Ring/Outline. | PROJEKT-STAND |
| F4 | `--accent-gradient` **nur als Text-Clip auf Near-Black**, und nur an: Headline-**Akzentwörtern** (nie ganze Headlines), den 4 Hero-Zahlen, den **Sektions-Eyebrows** von Startseite und `/moeglichkeiten` (T2). Immer über `.accent-gradient-text` bzw. `.aurora-text` (solider Fallback `var(--accent)`, nie unsichtbar). | Jede Verwendung von `--accent-gradient` im Markup ist eine dieser drei Stellen oder die Ausnahme §10-1. | PROJEKT-STAND, globals.css; Eyebrow-Reichweite: W6 |
| F5 | `--accent-gradient-strong` **nur als Füllung primärer CTAs** (`.cta-gradient`); trägt weiße Schrift ≥ 4.5 : 1 über den ganzen Verlauf (verifiziert min. 5.05 : 1). Die hellen Stops nie auf CTAs. | Kein `--accent-gradient` in `.cta-gradient`; kein anderer Selektor mit `-strong`. | PROJEKT-STAND, globals.css (R42) |
| F6 | Gradient nur auf **Showcase-Flächen**; Body-Text, Ränder, Flächen bleiben flach. | – | PROJEKT-STAND |
| F7 | **Kein Gradient-Rand** – mit genau einer sanktionierten Ausnahme (§10-1), die ausdrücklich auch die Kombination Rand + Schatten + Verlauf auf dieser einen Karte deckt (N7, R26). | `.card-gradient-border` genau 1× im Markup (Leistungen/KI). | CLAUDE.md, PROJEKT-STAND (31.08.2026); N7-Deckung: W4 |
| F8 | Sekundärtext = `--muted-foreground`. | Kein `text-foreground/xx` als Ersatz für Sekundärtext (Bestand: siehe §11.3 B10). | globals.css (R4, E7) |
| F9 | **Sektions-Rhythmus der Startseite** (gegen die Gleichförmigkeit beim Scrollen): `.section-band` (Verlauf aus `--muted` nach `--background`; Problem, Prozess, Kontakt) und `.section-glow` (radialer `color-mix`-Akzent-Schein, 7 %; Leistungen, Projekte) wechseln sich ab; Hero, Über-mich, Statement ohne; Branchen-Laufband (zwischen Hero und Problem) = eigener schmaler Streifen mit `border-y`, weder band noch glow. Statisches CSS (kein Repaint, kein JS), Tokens/`color-mix` only, kein `--accent-gradient`. | Zuordnung im Markup exakt so. | PROJEKT-STAND (31.08.2026) |
| F10 | Kontrast: Fließtext ≥ 4.5 : 1, große Schrift ≥ 3 : 1, Bedienelement/Fokusring ≥ 3 : 1 – **gerechnet, nicht geschätzt**. | Gerenderte Text/Hintergrund-Paare im Browser messen (auch `color-mix`-Flächen). | PROJEKT-STAND (R42, R43, R45) |
| F11 | Farbe ist nie alleiniger Informationsträger: Fehler = Farbe **+ Text + Icon**; Live/Musterseiten-Trennung = Badge mit Text. | Formularfehler, Projekte-Badges. | PROJEKT-STAND (R47) |
| F12 | **Glow-Sprache** ist eine: akzent-getönter `box-shadow` via `color-mix(in oklab, var(--accent) x%, transparent)` (wie `shadow-accent/x`). Primär-CTA: Ruhe ~18 %, Hover ~36 %, `:active` ~52 %; **kein Puls-/Dauereffekt**. | Nur State-Transitions, keine Keyframes auf `box-shadow`. | PROJEKT-STAND (09.06.2026) |
| F13 | **Glow-Reichweite (Lesart von R27/E1 für dieses Projekt):** **Dauer-Glows** – also im Ruhezustand sichtbare Akzent-Schatten (Primär-CTAs, Highlight-Karten) – **maximal 2–3 pro Seite**. **Hover-Glows** (Card-Hover, CTA-Hover-Stufe) zählen **nicht** gegen E1/R27. | Ruhende Akzent-Schatten je Route zählen (ohne Hover). | User-Entscheidung W3, 01.09.2026 |

---

## 3. Typografie

### 3.1 Regeln

| # | Regel | Prüfung | Quelle |
|---|---|---|---|
| T1 | Headline-Akzentwort im Gradient (`.accent-gradient-text`), **nur das Wort**, nie die ganze Headline; das fließende `.aurora-text` **nur** am Hero-Akzentwort. | `aurora-text` genau 1× (Hero). | PROJEKT-STAND, globals.css |
| T2 | Eyebrow: Versalien, weites Tracking, kleiner Grad. **Gradient-Clip nur an den Sektions-Eyebrows** – den `SectionHeading`-Köpfen auf der **Startseite und auf `/moeglichkeiten`**; **Karten-Eyebrows** (Projekte, DemoShowcase) und **Sonderseiten** (404, Rechtsseiten, Branchen-Band) bleiben **flach** (`--accent` oder `--muted-foreground`). | `SectionHeading` = Referenz; jede andere Versal-Zeile ohne Gradient-Clip. | PROJEKT-STAND (R13); Reichweite: User-Entscheidung W6, 01.09.2026, erweitert um `/moeglichkeiten` am 01.09.2026 |
| T3 | Versalien nur in Labels ≤ 14 px, nie im Fließtext. | – | DESIGN-WISSEN N8 |
| T4 | Große Versalien-Displays im Deutschen brauchen `hyphens: auto` + `overflow-wrap: break-word` (Komposita-Überlauf); Größe messen, nicht schätzen. | `documentElement.scrollWidth ≤ clientWidth` bei 320/390 px. | PROJEKT-STAND (25.08.2026) |
| T5 | **CodeTag** (`src/components/CodeTag.tsx`): Mono, dezenter **flacher** Akzent-Hintergrund/-Rahmen (kein Gradient), klein, vertikal mittig, kein Zeilenumbruch; rein dekorativ (kein Button, keine Semantik/aria). Nur echte Tech-/Fach-Begriffe, die ohnehin im Text stehen und zu Leon passen – keine erfundenen Claims/Zahlen, kein Marketing; ohne passenden Begriff nichts erzwingen; sparsam (≤ 1–2 pro Absatz). Helper `withCodeTags(text, terms)` markiert im Render, ohne die Datenquelle zu ändern. **Nicht** in Headlines, Eyebrows, CTAs, Schaubildern, Terminal. | – | PROJEKT-STAND (Session 8) |
| T6 | Text-Gradient stets mit solidem Fallback; animierter Gradient-Text nie über direkt animierte `background-position` (Chromium-Clip-Drop) – nur über registrierte `@property`. | `.aurora-text`, `.cta-gradient` folgen dem Muster. | PROJEKT-STAND (08.06.2026) |
| Offen | Schriftfamilie: heute System-Stack (`--font-sans`) + System-Mono – **nie entschieden**, Prüfung läuft als TODO 9 (DESIGN-UMSETZUNG §§1.2–1.5). Bis dahin kein Befund gegen R6/N1 aussprechen, sondern auf TODO 9 verweisen. | | |

### 3.2 Bestand (gemessen, 01.09.2026)

**Skala (Tailwind-Stufen, im Chunk aufgelöst):** 12 · 14 · 16 · 18 · 20 · 24 · 30 · 36 · 48 · 60 · 72 px
= 11 Stufen. Dazu Sonderwerte in gezeichneten Interfaces: 8 / 9 / 11 px (`HeroStage`, `ServiceDiagram`)
und `0.85em` (CodeTag).

| Element | Mobil → Desktop | Gewicht / Tracking / Zeilenhöhe |
|---|---|---|
| Hero-H1 | 36 → 48 (sm) → 60 (lg) → 72 (xl) | 600 · −0.025 em · 1.05 |
| H2 `SectionHeading` | 30 → 36 | 600 · −0.025 em · Tailwind-Default |
| Statement (p als Display) | 30 → 36 → 48 (md) | 600 · −0.025 em · 1.25 |
| H2 auf `/moeglichkeiten` | 24 → 30 | 600 · −0.025 em |
| H1 Rechtsseiten / 404 | 30 | 600 · −0.025 em |
| H3 Karten | 16 → 18 (Leistungen, Problem, Prozess) · 18 → 20 (Projekte) · 24 → 30 (Projekte-Gruppentitel) | 600 |
| Hero-Lead | 16 → 18 | 400 · 1.625 |
| Beschreibung `SectionHeading`, Fließtext | 16 | 400 · 1.625 |
| Meta / Nav / Buttons / Formularfelder | 14 | 500 (Buttons, Labels) |
| Eyebrow | 12 | 500 · Versalien · +0.2 em (404: +0.25 em) |
| Hero-Zahlen | 30 → 36 (Gradient-Clip) · Label 12 → 14 Versalien +0.05 em | 600 |

Gewichte im Einsatz: 400 · 500 · 600 · 700 (700 nur 2×). Zwei Familien: System-Sans + System-Mono
(CodeTag, HeroStage-Chrome, Terminal).

**Gegen Kit-Korridore gehalten (nur Information, §11.3):** H1 : Body = 72 / 18 = 4.0× (R9 ✓);
Mobil-H1 36 px (R11-Korridor 24–48 ✓); Zeilenhöhen Display 1.05 / Body 1.625 (R7 ✓);
Display-Tracking −2.5 % (R8 ✓); Eyebrow-Tracking +20 % liegt **über** dem Korridor +5–14 % (B4);
11 Stufen liegen **über** R10 (6–8) (B1).

---

## 4. Abstände & Container

### 4.1 Regeln

| # | Regel | Quelle |
|---|---|---|
| A1 | Desktop-first; Seitenrand mobil nie unter 16 px, kein horizontales Scrollen (`scrollWidth ≤ clientWidth` bei 320/390 px). | CLAUDE.md, PROJEKT-STAND (N12) |
| A2 | Touchziele ≥ 44 × 44 px – **Zielfläche, nicht sichtbare Fläche.** Mobil nachgemessen ✓ (Menü 288 × 44, Burger 44 × 44). Desktop-Leiste und Fußzeile seit 01.09.2026 ✓ über unsichtbare Pseudo-Ebenen um Logo, Nav-Links, CTA, Fußzeilen-Links und Instagram-Icon (Technik: `relative` + absolut positioniertes `::before` mit negativem Inset; Fokusring bleibt auf dem sichtbaren Element). Neue Ziele in Leiste oder Fußzeile folgen demselben Muster. | PROJEKT-STAND (Session 37) (N12) |
| A3 | Sektionsabstand ist eine feste Zahl (R18) – Bestand siehe 4.2, Wert nie beschlossen. | DESIGN-WISSEN |

### 4.2 Bestand (gemessen)

| Größe | Wert |
|---|---|
| Sektions-Padding Startseite (7 Sektionen: Problem, Leistungen, Über-mich, Projekte, Prozess, Statement, Kontakt) | 96 px mobil → 128 px ab `sm` |
| Hero | 80 → 96 px (ab `lg`), `min-height: calc(100svh − 4rem)` |
| Branchen-Laufband | 24 → 28 px |
| `/moeglichkeiten` | 80 → 112 px |
| Rechtsseiten, 404 | 80 px |
| Seitenrand | 16 → 24 (`sm`) → 32 px (`lg`) |
| Container Standard | 1152 px – Sektionen, Navbar, Footer |
| Container Hero | 1280 px |
| Textspalten | 672 px (Sektions-Beschreibung), 768 px (Statement, Rechtstexte, 404), 576 px (Hero-Textblock), 512 px (Hero-Lead) |
| Karten-Innenabstand | 24 → 28 px |
| Navbar-Höhe | 64 px |
| Gap-Werte im Einsatz | 4 · 6 · 8 · 10 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 px |
| Kleinabstände (mt/mb) | 2 · 4 · 6 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 · 96 · 128 px |

Gegen Kit-Korridore: Container 1152/1280 innerhalb 1100–1300 (R21 ✓, zwei Breiten); Textspalten
innerhalb 480–800 (R20 ✓); Sektionspadding 128 px liegt **über** dem Korridor 72–120 (§1.4-Tabelle),
Mobil-Faktor 0.75 statt 0.4–0.6 (R19, B3); 2/6/10/14-px-Werte liegen **außerhalb** der 4-px-Skala (N11, B2).

---

## 5. Radien

Keine beschlossene Radius-Familie (R24) – **nur Bestand:**

| Radius | Element |
|---|---|
| Pill | alle CTAs (primär + Ghost), Badges/Chips, Burger, Prozess-Nummern, Erfolgs-Icon, Hero-Blobs |
| 16 px | Karten (`Card`), Formular-Erfolgsbox, Bild-Rahmen Über-mich |
| 12 px | Bühnen-/Interface-Rahmen (HeroStage, Schaubilder) |
| 8 px | Formularfelder, Fehlerbox |
| 6 px | CodeTag, Logo-Kachel, Mobile-Nav-Einträge, HeroStage-Chrome |
| 4 px | Fokus-Rundung an Textlinks, Illustrationsdetails |

Das ist ein **implizites Elementtyp-System** (Pill = Bedienelement, 16 = Fläche, 8 = Feld, ≤ 6 =
Inline). Ob das die Familie sein soll, ist nie entschieden (§11.2).

---

## 6. Bewegung

### 6.1 Regeln

| # | Regel | Prüfung | Quelle |
|---|---|---|---|
| M1 | Framer Motion; Scroll-Effekte, hochzählende Zähler, weiche Hover/Klick-Übergänge – **subtil und edel, nie verspielt oder kitschig**. Stimmungsvolle Glow-/Bewegtbild-Elemente optional, code-basiert vor Video; **keine Screen-Recordings**. | – | CLAUDE.md, PROJEKT-STAND |
| M2 | **Hydration-Regel (Projektgesetz):** `useReducedMotionSafe` statt framers `useReducedMotion`; kein `window`/`document`/`Math.random`/`Date` im Render – Server-Frame = erstes Client-Frame. | Suche in `src/`. | CLAUDE.md, PROJEKT-STAND |
| M3 | **Mount-Animationen** werden per CSS gegated (`.entrance-anim` am Element, das Opacity/Transform trägt); **Interaktions-Animationen** per Hook. Nicht mischen. | Jede Framer-`initial→animate`-Mount trägt `entrance-anim`. | PROJEKT-STAND (25./26.08.2026) |
| M4 | `prefers-reduced-motion: reduce`: alle Loops aus (Blobs, Beam, Aurora, CTA-Fluss, Marquee, Cursor), Entrance sofort im Endzustand, Anker springen hart, CTA-Lift aus. Inhalte nie nur per Reveal sichtbar. | Jede `@keyframes`-Nutzung hat ein reduce-Gate. | globals.css, PROJEKT-STAND (R46, E5) |
| M5 | **Karten-Hover** nur über das zentrale `Card`-Muster (Anheben −6 px `motion-safe`, Akzent-Rand, Glow; 200 ms ease-out; hover nur bei `@media (hover: hover)`). Entrance-Animation auf ein umschließendes motion-Element, nie in die Card. | Keine zweite Hover-Implementierung. | PROJEKT-STAND |
| M6 | **Primär-CTA:** fließende Füllung (9 s, alternate, nur `--accent-gradient-strong`), Glow in 3 Stufen, Lift −4 px **nur** für CTAs in `<main>` (Navbar bleibt ruhig). Alles über `.cta-gradient`, kein Button-Markup-Sonderfall. | – | PROJEKT-STAND (09.06.2026) |
| M7 | Animierte Verläufe nur über registrierte `@property` (`--aurora-pos`, `--cta-pos`), nie `background-position` direkt. | – | PROJEKT-STAND |
| M8 | Reine Transform-/Opacity-Animationen für Dauerläufer (GPU-leicht), kein `filter: blur` im Loop, kein dauerhaftes `will-change`. | – | globals.css |
| M9 | Nicht mehr als 3 „Spezialsektionen" (Canvas, Marquee, Globus, Sticky-Scrollytelling) pro Seite. | `/moeglichkeiten` ist die Können-Demo und bewusst dichter. | DESIGN-WISSEN E6 |

### 6.2 Bestand (gemessen)

| Art | Werte |
|---|---|
| Entrance (Framer) | dominant 0.5 s `easeOut` (12×), 0.4 s (5×); vereinzelt 0.25–0.35 s und 1.15–1.5 s; y-Offset 24 px (Navbar) |
| Hover/State (CSS) | 200 ms ease-out (Card, CTA, Rand/Farbe), 300 ms (InteractiveHoverButton) |
| Dauerläufer | Aurora 8 s · CTA-Fluss 9 s · Hero-Blobs 22/26/28 s · Lichtstrahl 44 s · Marquee 28–48 s · Cursor 1.05 s |

Gegen DESIGN-UMSETZUNG §3.1 (0.4–0.7 s, ease-out, y 16–40): Standardfall ✓; die 1.15–1.5-s-Fälle
liegen außerhalb (B6).

---

## 7. Sprache

| # | Regel | Quelle |
|---|---|---|
| S1 | UI-Texte Deutsch, durchgehend **„Du"** – eine Anrede pro Seite. | CLAUDE.md (R36, N15) |
| S2 | Ton: premium, aber nahbar – nie abgehoben, nie billig. | PROJEKT-STAND |
| S3 | **Keine Preise** (Ziel ist das Gespräch). | CLAUDE.md, PROJEKT-STAND |
| S4 | Keine hohlen Versprechen, keine erfundenen Zahlen oder Claims; fehlender Social Proof wird durch persönliche Geschichte + Projekte-Schaufenster ersetzt (Live/Muster ehrlich per Badge getrennt). | PROJEKT-STAND |
| S5 | Terminal/Showcase: keine echten Infra-Identifier (Handle, Repo, Deploy-URL, E-Mail) – sprechende Dummies. | PROJEKT-STAND (18.06.2026) |
| S6 | CTA-Label beginnt mit Verb oder nennt das Ziel; ein CTA-Text, wiederholt. | DESIGN-WISSEN R34, R35, N10 (Bestand nicht gemessen) |
| S7 | Text gehört dem User: Textänderungen erst melden, dann ändern; Korrektur = kleinstmögliche. | PROJEKT-STAND (27.08.2026) |

---

## 8. Komponenten-Muster (Referenz-Implementierungen)

| Muster | Datei | Prüfbare Eigenschaften |
|---|---|---|
| Primär-CTA | `.cta-gradient` (globals.css) + Markup Hero/Kontakt/Navbar | Pill, 14 px/500, Höhe 44 px (Navbar 36 px), Padding ≈ 1 : 2 (R22 ✓), Glow/Fluss/Lift wie M6 |
| Ghost-Button | Hero „zweiter CTA" | Pill, 1 px `--border`, Hover → Akzent-Rand + Akzent-Text (R23: genau zwei Ausprägungen) |
| Fokusring | überall | 2 px Ring in `--ring` mit 2 px Offset in `--background`; bei `.cta-gradient` komponiert der Glow mit dem Ring statt ihn zu überdecken (R45) |
| Card | `src/components/Card.tsx` | 16 px Radius, 1 px `--border`, `--card`-Fläche, 24→28 px Innenabstand, Hover wie M5; `highlight` = Akzent-Rand 50 % + leiser Dauerglow |
| Gradient-Rand-Karte | `.card-gradient-border` | genau 1× (Leistungen/KI); `@supports mask-composite`, Fallback = flacher Akzent-Rand 50 % |
| SectionHeading | `src/components/SectionHeading.tsx` | Eyebrow (Gradient, Versalien, +0.2 em) → H2 30/36 → Beschreibung 16/1.625 in 672-px-Spalte; Bauplan jeder Sektion (R12) |
| CodeTag | `src/components/CodeTag.tsx` | Mono, `0.85em`, 6 px, Akzent-Fläche 10 % + Akzent-Rand 25 %, kein Zeilenumbruch, keine Semantik |
| Formular | `src/components/ContactForm.tsx` | Label außerhalb, bleibt stehen (R29); Feld 8 px Radius, `--border`, Fokus → Akzent-Rand + Ring; Fehler = `--destructive` Rand + Text + Icon (R30, R47); Submit vollbreit (R25) |
| Navbar | `src/components/Navbar.tsx` | sticky, 64 px, `--background` 80 % + Blur, 1 px `--border` unten; Burger 44 × 44 |
| Sektions-Hintergründe | `.section-band` / `.section-glow` | Zuordnung F9 |
| Scroll-Reveal-Text | `src/components/TextAnimation.tsx` | blur + fade + y, `useInView` + gesteuertes `animate` (nicht `whileInView`), Text steht als echter Knoten im HTML |
| Demo-Scope | `html:has(.demo-scope), .demo-scope` | gleiche Variablennamen, eigene Werte – kein zweiter Utility-Satz (§10-3) |

---

## 9. No-Gos (geschlossene Liste)

**Projekt (CLAUDE.md, PROJEKT-STAND, globals.css):**

1. Light Mode, Theme-Toggle, zweites `:root`, `[data-theme]`.
2. Farbwerte im Code (Hex/rgb/hsl/Palettenklassen) außerhalb `globals.css`.
3. `--accent-gradient` auf Rändern, Flächen, Body-Text oder ganzen Headlines; helle Gradient-Stops auf CTAs.
4. Fokusring als Verlauf oder unsichtbar (`outline: none` ohne Ersatz).
5. Weitere Gradient-Rand-Karten (Ausnahme §10-1 bleibt die einzige).
6. Puls-/Dauereffekte auf Glow oder Schatten; `background-position` direkt animieren.
7. framers `useReducedMotion`; `window`/`document`/`Math.random`/`Date` im Render.
8. Mount-Animation ohne CSS-Gate; Inhalt, der nur per Reveal erscheint.
9. CodeTag in Headlines, Eyebrows, CTAs, Schaubildern, Terminal; erfundene Begriffe darin.
10. Preise; erfundene Zahlen, Claims, Testimonials; echte Infra-Identifier im Terminal.
11. Screen-Recordings; eingebettetes Video, wo ein Code-Effekt reicht.
12. Utility-Klassennamen in Kommentaren oder Doku innerhalb des Tailwind-Scans („umschreiben statt nennen"; `docs/` und Root-Markdown sind per `@source not` ausgenommen).
13. Sonderzeichen in Routen-Segmenten.

**Kit (DESIGN-WISSEN §4), Profil „Expressiv" (W1):** N1–N15 universell und E1–E7 gelten; K1–K8
gelten **nicht**. E1/R27 nach der Lesart F13 (Dauer-Glows zählen, Hover-Glows nicht). Bei Befund
immer die ID nennen.

---

## 10. Sanktionierte Ausnahmen (geschlossene Liste)

| # | Ausnahme | Reichweite | Quelle |
|---|---|---|---|
| 1 | `.card-gradient-border` – `--accent-gradient` als 1-px-Rand. Technik: `::before` als 1-px-Ring über `inset: -1px` + `mask-composite`, alles im `@supports`-Block; ohne Support bleibt der flache Akzent-Rand (50 %) aus der Utility-Klasse stehen – nie ein vollflächiger Verlauf über dem Inhalt. Unlayered, damit die Regel die layered Tailwind-Utilities übersteuert. **Deckt ausdrücklich auch N7/R26** (Rand + Schatten + Verlauf auf dieser einen Karte). | **genau eine** Karte: Highlight-Karte der Leistungen (KI). Weitere Gradient-Ränder bleiben verboten. | PROJEKT-STAND, User-Auftrag „mehr Pepp" 31.08.2026; N7-Deckung: W4, 01.09.2026 |
| 2 | CoolMode-Klickpartikel mit bunten `hsl`-Zufallsfarben | nur `/moeglichkeiten`, gekapselt; der Cleanup baut den globalen Partikel-Layer und die rAF-Schleife restlos ab | PROJEKT-STAND (08.06.2026) |
| 3 | Demo-Gruppe `/demo/*` mit eigenem, hellem Token-Scope (gleiche Variablennamen, andere Werte; Fraunces per OFL) | nur `(demo)`-Route-Gruppe | PROJEKT-STAND (25./26.08.2026) |
| 4 | **„Vorher"-Layer des Redesign-Schaubilds** (`src/components/ServiceDiagram.tsx`, Leistungen-Karte „Redesign & Modernisierung"): eigene, bewusst gedämpft-clashende Alt-Web-Illustrationsfarben als Hex, **nicht** aus der Theme-/Akzent-Palette. Begründung: die Illustration soll als „hässlich-veraltet" registrierbar sein, bevor das cleane „Nachher" hereinwischt; der Layer ist opak und selbsttragend, also unabhängig vom Seiten-Theme lesbar. Der Marken-Akzent kommt weiterhin ausschließlich über Tokens (nur im „Nachher"). | nur dieser eine Layer; keine weitere Hex-Illustration ohne neuen Eintrag hier | Code-Kommentar (Session 8, 08.06.2026); sanktioniert per User-Entscheidung W2, 01.09.2026 |

**Die Liste ist geschlossen.** Jede weitere Ausnahme braucht einen neuen Eintrag hier – vorher
ist sie ein Befund.

---

## 11. Offene Punkte

### 11.1 Widersprüche zwischen den Quellen

**Noch offen (Entscheidung beim User – hier nicht aufgelöst):**

| # | Widerspruch | Beteiligte Quellen |
|---|---|---|
| W5 | **Dark-only vs. gewünschter Light Mode.** CLAUDE.md und PROJEKT-STAND: Dark-only, kein Toggle. CLAUDE-CODE-TODO 4/5: helle Fassung liegt zur Beurteilung, Light Mode „gewünscht". Hängt an TODO 4. Bis zur Entscheidung gilt Dark-only als Prüfmaßstab. | CLAUDE.md/PROJEKT-STAND ↔ CLAUDE-CODE-TODO 4, 5 |

**Entschieden am 01.09.2026 (User, Runde 2) – Protokoll, damit die Herkunft der Regeln nachvollziehbar bleibt:**

| # | War | Entscheidung → eingearbeitet in |
|---|---|---|
| W1 | Stilprofil nie gewählt; unklar, ob K1–K8 gelten (K6 verbietet Pill-Buttons und Glow). | **„Expressiv"**: E-Regeln gelten, K-Regeln nicht → §1, §9 |
| W2 | PROJEKT-STAND nannte CoolMode die „einzige" Farb-Ausnahme; `ServiceDiagram.tsx` trug einen zweiten Hex-Satz (Vorher-Illustration), begründet nur im Code-Kommentar. | **Zweite benannte Ausnahme**, Begründung aus dem Code in die Doku, Liste geschlossen → §10-4 |
| W3 | R27/E1 (Glow nur auf Primär-CTA) vs. Card-Hover-Glow auf allen Karten + Highlight-Dauerglow. | **Lesart:** Dauer-Glows max. 2–3 pro Seite, Hover-Glow zählt nicht → F13 |
| W4 | N7/R26 (nie Rand + Schatten + Verlauf auf einer Karte) vs. die sanktionierte Highlight-Karte. | Ausnahme §10-1 **deckt ausdrücklich auch N7** → F7, §10-1 |
| W6 | „Sektions-Eyebrow im Gradient" vs. Bestand: Karten-Eyebrows flach, Branchen/404 grau. | **Regel:** Gradient-Eyebrow nur an `SectionHeading`-Köpfen (Startseite und – seit der Erweiterung vom 01.09.2026 – `/moeglichkeiten`); Karten-Eyebrows und Sonderseiten flach → T2, F4 |

### 11.2 Nie entschieden (nur Bestand vorhanden)

Typo-Skala (R10) · Abstandsskala und Sektionspadding-Wert (R17, R18) · Radius-Familie (R24) ·
Container- und Textspaltenbreite (R20, R21) · Schriftfamilie (R6 – TODO 9) · Button-Höhen (R22).
Für jede dieser Größen steht der gemessene Stand in §3.2, §4.2, §5, §6.2. Eine Entscheidung
wandert dann aus „Bestand" nach „Regel".

### 11.3 Bestand weicht vom Kit-Korridor ab (Befunde für `/design-review`, nicht bewertet)

| # | Befund | Regel |
|---|---|---|
| B1 | 11 Schriftstufen (+ 3 Sonderwerte in Illustrationen) statt 6–8 | R10 |
| B2 | 2 / 6 / 10 / 14 px in Gaps, Paddings und Kleinabständen | N11, R17 |
| B3 | Sektionspadding mobil 96 von 128 px = 0.75 statt 0.4–0.6; Desktop 128 > 120 | R19, §1.4 |
| B4 | Eyebrow-Tracking +20 % / +25 % über dem Korridor +5–14 % | R8 |
| B5 | Drei H2-Größen (30/36 · 30/36/48 · 24/30) und zwei Container-Breiten (1152 / 1280) | R12, R21 |
| B6 | Einzelne Entrance-Dauern 1.15–1.5 s außerhalb 0.4–0.7 s | DESIGN-UMSETZUNG §3.1 |
| B7 | `InteractiveHoverButton` auf `/moeglichkeiten` als dritte Button-Ausprägung | R23 |
| B8 | Formularfeld 42 px, Submit 44 px (nicht in einer Zeile – R28 greift nur bedingt) | R28 |
| B9 | ~~Desktop-Tap-Ziele in Navbar/Fußzeile < 44 px~~ – **erledigt 01.09.2026** (TODO 2, Pseudo-Ebenen; Zielflächen 44–46 px nachgemessen, Optik pixelidentisch) | N12 |
| B10 | Ein Sekundärtext über `--foreground` mit 90 % Deckung und ein Platzhalter über `--muted-foreground` mit 80 % statt eigener Token | R4 |
