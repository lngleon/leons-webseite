# CURRENT-SCHEMA.md – Architektur & Datenfluss

> Letzte Aktualisierung: 26.08.2026
> **Kein Backend, keine Datenbank.** Dieses Projekt ist eine reine Frontend-Website.
> Diese Datei dokumentiert daher KEIN DB-Schema, sondern die Architektur, die externen Dienste und den Datenfluss.
>
> ⚠️ Diese Datei ist die EINZIGE Wahrheit für Architektur & externe Dienste.
> Nach jeder Änderung an externen Diensten oder Datenfluss: Claude Code aktualisiert diese Datei (Repo `docs/`), danach Projektdatei im Claude Project austauschen.

---

## Architektur-Überblick

```
Besucher (Browser)
      │
      ▼
Next.js-App (App Router), beim Build statisch gerendert – auf Vercel
      │
      ├─ statisches HTML je Route (aus dem Build, kein Server-Rendern zur Laufzeit)
      │
      ├─ statische Inhalte/Assets (im Code / public/)
      │
      ├─ next/image ──▶ Vercel Image Optimization (/_next/image, Quellen aus public/)
      │
      ├─ sitemap.xml + robots.txt (beim Build erzeugt, Next-Dateikonventionen)
      │
      ├─ Web Analytics ──▶ Vercel Web Analytics (cookielos, /_vercel/insights)
      │
      └─ Kontaktformular ──HTTP POST──▶ Formspree (extern)
                                            │
                                            ▼
                                   E-Mail an Leon
```

- **Typ:** Next.js (App Router), **rein statisch** – alle Routen werden beim Build vorgerendert (`○ Static`), zur Laufzeit läuft KEINE eigene Server-Logik. Keine Route Handlers/API-Routen, keine Server Actions, keine Middleware, kein ISR/Revalidate.
- **Hosting:** Vercel, Auto-Deploy bei Push auf `main`. Framework-Preset **Next.js** (Build-Command/Output erkennt Vercel selbst).
- **Kein Supabase, keine Datenbank, keine RLS, keine Migrations, keine Edge Functions, keine pg_cron Jobs.**
- **Externe Dienste:** Formspree (Kontaktformular → E-Mail) + Vercel Web Analytics (cookielose Besuchsstatistik).
- **Interaktivität** lebt komplett in Client-Komponenten (`'use client'`): Navbar, alle Sektionen mit Framer Motion, Terminal, Kontaktformular, die Showcase-Effekte. Sie werden trotzdem beim Build zu HTML gerendert und im Browser nur hydriert – der Inhalt steht also ohne JS im Quelltext.
- **Ausnahme Demo-Seiten:** `/demo/*` besteht ausschließlich aus Server-Komponenten – weder `src/app/(demo)/`, noch `src/components/demo/`, noch die dort genutzte `src/components/ui/Marquee.tsx` tragen `'use client'`. Die Seite braucht kein eigenes JavaScript.

---

## Build-Pipeline

```
npm run build   →   next build (Turbopack)
                      ├─ TypeScript-Check (ersetzt das frühere `tsc -b`)
                      ├─ Client-/Server-Bundles + CSS (Tailwind v4 via PostCSS)
                      ├─ statisches Rendern JEDER Route  → .next/server/app/*.html
                      └─ sitemap.xml + robots.txt        → .next/server/app/
```

- **Ein einziger Befehl.** Die frühere vierstufige Kette (`tsc -b && vite build && vite build --ssr … && node scripts/prerender.mjs`) ist ersatzlos entfallen; `next build` macht Typecheck, Bundling und Prerendering in einem Schritt.
- **Entfallen (24.08.2026):** `index.html` (Head-Template), `vite.config.ts`, `src/main.tsx` (`hydrateRoot`/`createRoot`), `src/entry-server.tsx` (`renderToString`), `scripts/prerender.mjs` (inkl. `ROUTES`/`META`-Map), `src/App.tsx` (react-router `<Routes>`), `src/pages/`, `tsconfig.app.json` + `tsconfig.node.json`, `src/vite-env.d.ts`, die Ordner `dist/` + `dist-ssr/`.
- **Build-Artefakte:** `.next/` (gitignored). Kein `dist/` mehr. Lokal ansehen: `npm run build && npm run start` (statt `npm run preview`).
- **Verifikation nach jedem Build:** `.next/server/app/index.html`, `impressum.html`, `datenschutz.html`, `moeglichkeiten.html`, `demo/cafe.html` und die fünf Unterseiten unter `demo/cafe/` (die Route-Gruppen `(site)`/`(demo)` tauchen im Dateinamen NICHT auf – Next benennt die Datei nach dem URL-Pfad) – dort müssen H1 + Sektions-Text und der Pro-Route-`<head>` drinstehen.
- **Tailwind v4** läuft nicht mehr über `@tailwindcss/vite`, sondern über `@tailwindcss/postcss` (`postcss.config.mjs`). Globales CSS: `src/app/globals.css` (früher `src/index.css`), im Root-Layout importiert.

---

## Externe Dienste

### Formspree
- **Zweck:** Nimmt die Daten des Kontaktformulars per HTTP POST entgegen und leitet sie als E-Mail weiter.
- **Empfänger:** `leonlang95@gmail.com` (später auf professionelle Adresse änderbar)
- **Account:** ✅ vorhanden (Phase 1 abgeschlossen). Formular end-to-end bestätigt – lokal UND live, Mail kommt an.
- **Endpoint/Form-ID:** ✅ gesetzt. Wird NIE hardcodiert, sondern aus der Env-Variable **`NEXT_PUBLIC_FORMSPREE_ENDPOINT`** gelesen (`src/components/ContactForm.tsx`, `process.env.…`). Seit der Next-Migration (24.08.2026) heißt sie so – vorher `VITE_FORMSPREE_ENDPOINT`. Steht lokal in `.env.local` UND muss im Vercel-Dashboard hinterlegt sein (alle Environments).
- **Tarif:** kostenloser Free-Tier (ausreichend für erwartetes Anfragevolumen)
- **Sichtbar für Besucher?** Nein – Formspree taucht im UI nicht auf, das Formular gehört optisch komplett der Seite.
- **Späterer Wechsel:** optionaler Umstieg auf Resend + Vercel Serverless Function, sobald eigene Domain steht (für Absender über eigene Domain). Aktuell nicht umgesetzt.

### Vercel Web Analytics
- **Zweck:** Cookielose Besuchsstatistik (Seitenaufrufe, Referrer, Länder, Geräte) im Vercel-Dashboard – zeigt, ob/wie die Seite besucht wird.
- **Umsetzung:** `@vercel/analytics` (v2, keine Runtime-Dependencies); `<Analytics />` aus **`@vercel/analytics/next`** (App-Router-Variante; früher `/react`) EINMAL in `src/components/SiteChrome.tsx` gemountet (bis zur Layout-Trennung am 25.08.2026 direkt im Root-Layout `src/app/layout.tsx`) → erfasst alle Routen der Gruppe `(site)` plus den 404, die beide SiteChrome rendern. Die stillen Demo-Seiten unter `/demo/*` sind bewusst NICHT dabei: sie liegen in einer eigenen Layout-Gruppe ohne SiteChrome und werden deshalb nicht getrackt. Es landet **kein Markup im statischen HTML**, das Insights-Script (`/_vercel/insights/script.js`) wird erst im Browser nachgeladen → SSG-/hydration-sicher.
- **Routen-Tracking:** Navigationen des App Routers zählen automatisch als Pageviews (Auto-Track aktiv, kein manuelles Routing nötig).
- **Datenschutz:** **cookielos**, kein Cross-Site-Tracking, keine personenbezogene Profilbildung → KEIN Cookie-Banner nötig (in der Datenschutzerklärung dennoch zu erwähnen).
- **Aktivierung:** im Vercel-Dashboard (Project → Analytics) einschalten; Daten erst nach Deploy + ersten echten Besuchen. Lokal (`npm run start`) lädt das Script nicht real (404 auf `/_vercel/insights`) – erwartet.
- **Sichtbar für Besucher?** Nein – kein UI, nur ein defer-geladenes Script im Browser.
- **Non-Goals (bewusst nicht):** kein Speed Insights (`@vercel/speed-insights`), keine Custom Events (`track()`), kein Cookie-Banner.

---

## Datenfluss

### Kontaktformular (Variante A)
1. Besucher füllt Felder aus: **Name**, **E-Mail**, **Nachricht** (ggf. weitere optionale Felder).
2. Klick auf „Senden" → Frontend sendet HTTP POST an den Formspree-Endpoint.
3. Formspree verarbeitet und sendet E-Mail an Leon.
4. Frontend zeigt Erfolgs- bzw. Fehlermeldung an.
5. **Es werden KEINE Daten in einer eigenen Datenbank gespeichert.**

### Direkte Kontaktwege (Variante B)
- **E-Mail-Button** → öffnet `mailto:leonlang95@gmail.com`
- **WhatsApp-Button** → öffnet `https://wa.me/4917648072158`
- **Instagram-Button** → öffnet `https://instagram.com/leon.vln`

---

## Frontend-Datenstruktur (statische Inhalte)

Inhalte liegen als Konstanten/Daten im Code (kein CMS, keine DB). Empfohlene logische Struktur (Claude Code entscheidet konkrete Umsetzung anhand der Repo-Conventions):

### Leistungen (4)
| Leistung | Reihenfolge |
|----------|-------------|
| Webseiten | 1 (Kerngeschäft) |
| Web-Apps & Tools | 2 |
| Redesign & Modernisierung | 3 |
| KI-Integration | 4 (Highlight) |

### Hero-Zähler (4)
| Wert | Label |
|------|-------|
| 2 | Live-Projekte |
| 3 | Tools entwickelt |
| 100 % | individuell programmiert |
| 1 | Person, voller Stack |

### Problem-Schmerzpunkte (4)
1. Keine oder veraltete Webseite
2. Unsichtbar im Netz
3. Wirkt unprofessionell
4. Teure Agenturen

### Prozess-Schritte (4)
1. Kennenlernen & Idee
2. Konzept & Design
3. Umsetzung
4. Launch & Betreuung

### Projekte (2 Showcases)
| Feld | Projekt 1 | Projekt 2 |
|------|-----------|-----------|
| Name | Blumen Lang | Naillery |
| Typ | Webseite (Blumengroßhändler) | SaaS-Plattform (Nagelstudios) |
| Kurzbeschreibung | Von veralteter, kaum auffindbarer Seite zu modernem, professionellem Auftritt | Eigene Plattform: Buchungsflow, Stripe-Zahlungen, Studio-Webseiten, KI-Designgenerator (projiziert Wunsch-Design auf Foto der Hände) |
| Live-Link (aktuell) | https://blumen-lang-start.vercel.app/ | https://naillery-v2.vercel.app/ |
| Live-Link (später) | https://blumen-lang.de/ | https://naillery.com/ |
| Detail-Ansicht | ja (interaktiv beim Klick) | ja (interaktiv beim Klick) |

> Live-Links sind als änderbare Felder zu führen, damit der User später auf die finalen Domains umstellen kann.

---

## Statische Assets

| Asset | Status | Ablage |
|-------|--------|--------|
| Logo „LL" (hell) | ⬜ noch zu erstellen | `public/` |
| Logo „LL" (dunkel) | ⬜ noch zu erstellen | `public/` |
| Favicon | ✅ (27.–28.07.2026) **`(site)` + `not-found`:** Satz `favicon.svg` („LL" + Cursor-Block) + `favicon.ico` + `favicon-16/32.png` + `apple-touch-icon.png`, seit 24.08.2026 über `metadata.icons` im Root-Layout verlinkt (statt Head-Template), `theme-color #0a0a0a` + `color-scheme: dark` über den `viewport`-Export. **`(demo)` seit 26.08.2026 eigenständig:** `src/app/(demo)/icon.svg` (Datei-Konvention, „K" in `#b4441e` auf `#f6f1e7`) plus `icons: null` im Demo-Layout – ohne dieses `null` verwirft Next die Datei still, weil `metadata.icons` des Root-Layouts gewinnt. Ergebnis im gebauten HTML: Demo-Seiten genau ein `<link rel="icon">` auf die SVG-Route, kein `apple-touch-icon`; (site) unverändert fünf Tags | `public/` (LL-Satz), `src/app/(demo)/icon.svg` (Demo) |
| Display-Schrift `/demo/*` | ✅ (26.08.2026) **Fraunces 72pt SemiBold**, lokal via `next/font/local`, auf Latin subsettet → **18,2 KB WOFF2**. Lizenz **SIL Open Font License 1.1** (Copyright 2018 The Fraunces Project Authors) – erlaubt Webfont-Einbettung und Einsatz in Kundenprojekten ausdrücklich, verlangt aber die Mitlieferung der Lizenz: `OFL-Fraunces.txt` liegt neben der Datei und darf nicht entfernt werden. **Verworfen:** *Young Serif* (OFL 1.1, Zeichensatz vollständig, 26,6 KB) und *Instrument Serif* (OFL 1.1, vollständig, 21,4 KB) – beide gibt es nur in Gewicht 400, `.demo-display` setzt aber `font-weight: 600`; der Browser hätte den Fettschnitt rechnen müssen. Ebenfalls verworfen: die **variable** Fraunces-Datei – vier Achsen (`opsz`, `wght`, `SOFT`, `WONK`), davon keine gebraucht, 122,2 KB nach demselben Subset statt 18,2 KB. `--font-demo-display` wird von `DemoShell` auf `.demo-scope` gesetzt und in `demo.css` zu `--demo-display` verkettet. **Leons Hauptseite ist NICHT betroffen** – sie lädt weder die Datei noch ein `@font-face` (im gebauten HTML geprüft) | `src/app/(demo)/fonts/` |
| Projekt-Bilder | ✅ `blumen-lang-preview.webp`, `naillery-preview.webp`, dazu `leon-portrait.webp`; alle drei laufen seit 24.08.2026 über `next/image` (responsives `srcset` via `sizes`, Auslieferung über `/_next/image`) | `public/` |
| Demo-Fotos (`/demo/cafe`) | ✅ (26.08.2026) `cafe-gastraum.webp` 1120×1400 (4∶5, 73 KB, Hero), `cafe-zimtschnecken.webp` 800×800 (166 KB), `cafe-cappuccino.webp` 800×800 (37 KB), `cafe-fensterplatz.webp` 1410×940 (3∶2, 71 KB). Alle über `next/image` mit `fill` + `sizes` in `src/components/demo/DemoPhoto.tsx`; die Box reserviert das Seitenverhältnis per `aspect-ratio` → kein CLS. Fehlt in den Daten ein `src`, rendert dieselbe Box einen gestalteten Platzhalter statt eines Bildes Dazu die drei Fotos der Über-uns-Seite: `cafe-aussenansicht.webp` 1080×720 (3∶2, 100 KB), `cafe-handwerk.webp` 1080×1350 (4∶5, 86 KB), `cafe-team.webp` 1080×720 (3∶2, 52 KB) – alle drei aus Quellen heruntergerechnet, nie hochgerechnet | `public/demo/` |
| Optionale Bewegtbild-/Glow-Elemente | ⬜ optional | code-basiert bevorzugt |

---

## Theming (Dark-only + Violett-Gradient-Akzent)

- **Modus:** Dark-only (kein Light Mode, kein Theme-Toggle; 08.06.2026 umgestellt). EIN Token-Satz in `:root`, `color-scheme: dark`, `<html>` ohne Klasse. NIEMALS Farbwerte hardcoden.
- **Basis-Palette:** edel-zurückhaltend, Near-Black/Weiß/Grau (`--background` #0a0a0a, `--card` #111113, `--foreground` #fafafa, `--muted-foreground` #a1a1aa, `--border` #27272a).
- **Flacher Akzent** (Ränder, Icons, kleine UI, Fokusring via `--ring` – nie Gradient): `--accent` `#a78bfa`, `--accent-solid` `#6d4dff`, `--accent-foreground` `#ffffff`.
- **Violett-Gradient** (Source-of-Truth, NUR auf Showcase-Flächen):
  - `--accent-gradient` `linear-gradient(135deg,#c4b5fd,#a78bfa,#7c5cff)` – Text-Clip (Headline-Akzentwörter, 4 Hero-Zahlen, Sektions-Eyebrow) auf Near-Black, mit solidem Fallback (`var(--accent)`, nie unsichtbar).
  - `--accent-gradient-strong` `linear-gradient(135deg,#6d4dff,#6d28d9)` – Füllung primärer CTAs; weiße Schrift ≥4.5:1 über den ganzen Verlauf (verifiziert min. 5.05:1).
- Helper-Klassen in `src/app/globals.css` (bis 24.08.2026 `src/index.css`): `.accent-gradient-text` (Text-Clip + `@supports`-Fallback), `.cta-gradient` (CTA-Füllung). Body-Text/normale Headlines bleiben flach.

---

## Routen

| Route | Inhalt |
|-------|--------|
| `/` | Single-Page (alle Sektionen: Hero → Problem → Leistungen → Über mich → Prozess → Projekte → Statement → Kontakt) |
| `/impressum` | Impressum (Platzhalter, Inhalt vom User) |
| `/datenschutz` | Datenschutzerklärung (Platzhalter, Inhalt vom User) |
| `/moeglichkeiten` | Stille Showcase-Seite „Was möglich ist" (statisch gerendert, bewusst NICHT in der Navbar verlinkt). **Seit 25.08.2026 ASCII** – vorher `/möglichkeiten`, was einen percent-encodeten Ordner plus einen zweiten Re-Export-Ordner brauchte; jetzt ein Ordner `src/app/moeglichkeiten/`, keine Encoding-Fallstricke. **Kein Redirect** von der alten URL (die Seite war nie verlinkt). Titel/Description weiterhin mit Umlaut („Möglichkeiten – Leon Lang") |
| `/demo/cafe`<br>`/demo/cafe/karte`<br>`/demo/cafe/ueber-uns`<br>`/demo/cafe/kontakt`<br>`/demo/cafe/impressum`<br>`/demo/cafe/datenschutz` | Stille **Demo-Seiten** eines erfundenen Gastro-Betriebs („Café Klee"), seit 26.08.2026 sechsseitig: Start (Kopf, Laufband, Bildreihe, Karten-Auszug) · Karte (volle Speisekarte mit Kategorie-Leiste) · Über uns (Lead + drei Blöcke im Bild-Text-Wechsel) · Kontakt (Adresse mit Routen-Link, Öffnungszeiten, Telefon, Reservierungs-Mail) · Impressum · Datenschutz. Die ersten vier stehen in der Navigations-Pille, die zwei Rechtsseiten nur im Fuß. Segmente rein ASCII. Alle sechs: `noindex`, NICHT in der Sitemap, NICHT verlinkt. Eigene Layout-Gruppe `(demo)` → **keine** Navbar/Footer/ScrollProgress/Analytics, eigene helle Design-Tokens. Navigation und Impressum-Fuß liefert `DemoShell`. Siehe „Layout-Gruppen" unten |
| `/demo/restaurant`<br>`/demo/restaurant/karte`<br>`/demo/restaurant/ueber-uns`<br>`/demo/restaurant/kontakt`<br>`/demo/restaurant/impressum`<br>`/demo/restaurant/datenschutz` | **Zweite Demo** (seit 27.08.2026), erfundenes À-la-carte-Restaurant „Restaurant Glut". Gleiche sechs Seiten, gleiche Hülle, gleiche Bausteine wie das Café – der Ordner ist eine Kopie von `demo/cafe/` mit anderem Import, die Inhalte kommen aus `src/data/demo/restaurant-glut.ts`. Unterschied zum Café: `/karte` trägt **drei Karten** (Mittagstisch, Abendkarte, Weinkarte), die Abendkarte ist in **Gänge** gegliedert und trägt zwei **Menü-Bündel** zum Festpreis. Noch **ohne Fotos** (Platzhalter mit reservierten Seitenverhältnissen) und **ohne Buchungsflow** (Non-Goal). Ebenfalls `noindex`, nicht in der Sitemap, nicht verlinkt |
| _(alles andere)_ | 404 über `src/app/not-found.tsx` – seit der Next-Migration ein **echter HTTP-404** (vorher lieferte Vercel für unbekannte Pfade seine eigene 404-Seite aus; die React-`NotFound`-Route griff nur bei Client-Navigation) |

Dazu zwei generierte Dateien (Next-Dateikonventionen, kein manuelles Pflegen):

| Datei | Quelle | Inhalt |
|-------|--------|--------|
| `/sitemap.xml` | `src/app/sitemap.ts` | die vier **öffentlichen** Routen oben – `/`, `/impressum`, `/datenschutz`, `/moeglichkeiten` (seit 25.08.2026 alle rein ASCII). `/demo/*` steht bewusst NICHT drin. Routenliste kommt aus `routes` in `src/data/site-url.ts` |
| `/robots.txt` | `src/app/robots.ts` | alles erlaubt (`Allow: /`) + Verweis auf die Sitemap. Auch `/demo/*` wird bewusst NICHT gesperrt: eine per `robots.txt` blockierte Seite wird gar nicht erst gelesen – dann sähe eine Suchmaschine das `noindex` aus dem Demo-Layout nie. Crawlen erlauben, Indexieren verbieten ist der richtige Weg |

Beide brauchen eine **absolute** Basis-URL. Die steht bewusst nicht im Code, sondern kommt aus `siteUrl` (`src/data/site-url.ts` – bewusst NICHT in `site.ts`, das Client-Komponenten importieren) in dieser Reihenfolge: `NEXT_PUBLIC_SITE_URL` → von Vercel gesetzte `VERCEL_PROJECT_PRODUCTION_URL` → `http://localhost:3000`. **Sobald die eigene Domain steht: `NEXT_PUBLIC_SITE_URL` im Vercel-Dashboard setzen.**

### Layout-Gruppen (seit 25.08.2026)

```
src/app/
  layout.tsx          ← Root: NUR <html>, <body>, Head. Gilt für ALLE Routen.
  not-found.tsx       ← globaler 404, rendert SiteChrome selbst
  (site)/             ← die eigentliche Website
    layout.tsx        ←   SiteChrome: ScrollProgress, Navbar, <main>, Footer, Analytics
    page.tsx, impressum/, datenschutz/, moeglichkeiten/
  (demo)/             ← stille Demo-Seiten
    layout.tsx        ←   nur noindex + heller viewport, KEINE Hülle
    demo.css          ←   eigene Tokens, auf .demo-scope gescopt
    demo/cafe/          ←   sechs Seiten, je eine winzige page.tsx:
      page.tsx             ←  Start: Kopf, Laufband, Bildreihe, Karten-Auszug
      karte/page.tsx       ←  volle Karte + Kategorie-Leiste
      ueber-uns/page.tsx   ←  Lead + drei Blöcke im Bild-Text-Wechsel
      kontakt/page.tsx     ←  Adresse, Zeiten, Telefon, Reservierung
      impressum/page.tsx   ←  nur im Fuß verlinkt
      datenschutz/page.tsx ←  nur im Fuß verlinkt
    demo/restaurant/    ←   zweiter Betrieb, dieselben sechs Dateien,
                            einziger Unterschied: der Import der Datendatei
```

**Wo die Demo-Inhalte liegen:** nicht in `src/app/`. Die Daten je Betrieb stehen in EINER typisierten Datei (`src/data/demo/cafe-klee.ts`, Typen in `src/data/demo/types.ts`), die Bausteine in `src/components/demo/` (Hülle, Navigation, Hero, Karte, Kategorie-Leiste, Karten-Auszug, Über uns, Öffnungszeiten, Adresse, Kontakt, Bildreihe, Rechtsseiten-Rahmen, Seitenfuß, Laufband, Foto-Box, JSON-LD) sind rein datengetrieben. Ein zweiter Betrieb = zweite Datendatei + Kopie des Ordners `demo/cafe/` (sechs winzige `page.tsx`) mit anderem Import. **Am 27.08.2026 durchgeführt und damit belegt:** `restaurant-glut.ts` + `demo/restaurant/`; `cafe-klee.ts` blieb dabei Zeichen für Zeichen unverändert. Drei Bausteine mussten für die neuen Karten-Formen **verallgemeinert** werden (`DemoMenu`, `DemoMenuTeaser`, `buildMenuSchema`) – keiner davon fragt, welcher Betrieb rendert; sie richten sich nach vorhandenen Feldern. Details unter „Datenmodell der Demo-Betriebe".

**Warum die Hülle in einer Komponente steckt und nicht in einem `layout.tsx`:** die Navigation muss den aktiven Punkt markieren. Ein Layout kennt den Pfad nicht, und `usePathname()` wäre ein Client-Hook – das würde die Zusicherung brechen, dass die Demo ohne JavaScript vollständig bedienbar ist. Jede Seite reicht ihr `current` deshalb selbst an `DemoShell`. Aus demselben Grund sind die Seitenwechsel normale `<a href>` (`next/link` ist in Next 16 eine Client-Komponente) und die Navigation eine horizontal scrollbare Pille statt eines Burger-Menüs. Pfade kommen aus `src/components/demo/routes.ts`, damit Navigation, Metadaten und JSON-LD dieselbe Quelle nutzen.

**schema.org folgt der Seitenaufteilung:** `Restaurant` (Adresse, Kontakt, Öffnungszeiten) liegt auf der Startseite und verweist per `hasMenu`-URL auf `/karte`; das `Menu` mit allen Sections und Preisen liegt auf `/karte`. `/kontakt` gibt bewusst KEIN eigenes JSON-LD aus – Adresse und Zeiten stehen schon im `Restaurant`, ein zweites Markup würde denselben Betrieb doppelt behaupten. Seit der zweiten Demo kann eine `MenuSection` zusätzlich `hasMenuSection` tragen (Karte → Gänge → Gerichte); Menü-Bündel stehen als `MenuItem` mit ihrem Festpreis an der Karte, ihre Gänge in der `description` – schema.org kennt kein eigenes Festpreis-Menü, und die Gerichte ein zweites Mal auszugeben würde sie doppelt behaupten. Bewusst KEIN `position` an den Abschnitten.

**Warum die Aufteilung:** Ein Eltern-Layout lässt sich in Next von unten nicht abwählen. Solange Navbar/Footer/ScrollProgress im Root-Layout lagen, hätte JEDE Route sie geerbt – auch die Demo-Seiten, die bewusst wie eigenständige Kundenseiten wirken sollen. Die Hülle ist deshalb eine Ebene tiefer gewandert (`src/components/SiteChrome.tsx`, genutzt von `(site)/layout.tsx` und `not-found.tsx`). **Für die Hauptseite ändert sich nichts:** das gerenderte Markup ist identisch (Zeichen für Zeichen verglichen; abweichend nur ein interner `useId`-Präfix und die Position eines leeren Suspense-Kommentars). Kosten: die zusätzliche Layout-Ebene bläht die RSC-Payload auf, gzip-komprimiert sind das **+157 bis +182 Byte pro Seite**.

**Design-Tokens der Demo:** `(demo)/demo.css` wird NUR vom Demo-Layout importiert (eigener CSS-Chunk – verifiziert, dass die Hauptseite ihn nicht lädt) und belegt DIESELBEN Variablennamen (`--background`, `--foreground`, `--accent` …) auf `html:has(.demo-scope)` bzw. `.demo-scope` neu. Dadurch lösen alle bestehenden Tailwind-Utilities dort automatisch auf warme Werte auf, ohne dass eine einzige globale `:root`-Variable angefasst wird.

### Datenmodell der Demo-Betriebe (seit 27.08.2026: Café **und** Restaurant)

Ein Betrieb = EINE typisierte Datei (`src/data/demo/<slug>.ts`), die `GastroBusiness` aus `src/data/demo/types.ts` erfüllt. Der Aufbau der Karte trägt seit der zweiten Demo zwei sehr verschiedene Betriebe, ohne dass das Café leere Pflichtfelder mitschleppt oder eine Komponente einen Betriebs-Zweig bekommt.

**Die Regel, an der alles hängt:** Eine Komponente darf fragen „ist dieses FELD da?" – so wird `note` seit jeher gerendert. Sie darf nicht fragen „ist das ein Café oder ein Restaurant?". Alles Weitere folgt daraus.

**Drei Ebenen statt zwei:**

```
menu.categories[]  MenuCategory  – oberste Ebene: die Gliederungspunkte der Kartenseite
                                   Café:       eine Kategorie („Kaffee")
                                   Restaurant: eine ganze Karte („Abendkarte")
                                   → genau das, was in der Sprungleiste steht
  ├─ items[]       MenuItem      – flache Karte: Gerichte direkt darunter
  ├─ sections[]    MenuSection   – gegliederte Karte: Gänge (Abendkarte) oder
  │    └─ items[]                  Gruppen (Weinkarte); Reihenfolge = Array-Reihenfolge
  └─ bundles[]     MenuBundle    – Menüs aus mehreren Gängen zum Festpreis
```

**Typ-Entscheidungen und ihre Gründe:**

| Entscheidung | Warum so |
|---|---|
| Das Feld heisst weiterhin `menu.categories`, obwohl dort beim Restaurant ganze Karten stehen | Ein Umbenennen (`cards`, `blocks`) hätte `cafe-klee.ts` angefasst. Der Preis ist ein leicht gedehnter Name; die Bedeutung steht im Typ-Kommentar und ist präzise: **Gliederungspunkt der Kartenseite** |
| `MenuCategory` ist eine **exklusive Union** – entweder `items` oder `sections`, die jeweils andere Seite per `?: never` verboten | Ohne Union hätte `items` nur „optional" werden können; dann liesse sich ein Eintrag ganz ohne Inhalt hinschreiben, der als leere Überschrift rendert. Die Union lässt genau die zwei sinnvollen Formen zu und sonst nichts. An der Render-Stelle kostet sie nichts: `category.items` ist auf der Union schlicht `MenuItem[] \| undefined` |
| `bundles` hängt **nur** am `sections`-Zweig | Ein Bündel verweist per `id` auf Gänge. Gibt es keine Abschnitte, gibt es nichts zu bündeln – der Typ verbietet die Fehlform, statt sie zur Laufzeit stillschweigend zu übergehen |
| Die Reihenfolge der Gänge steckt **allein im Array** – kein `position`, kein `order`, auch nicht im JSON-LD | Ein Array IST eine Folge. Ein Feld daneben wäre eine zweite Wahrheit, die auseinanderlaufen kann. Ein `position` im JSON-LD hätte zusätzlich die Ausgabe der Café-Karte verändert, ohne dass sich an ihr etwas geändert hat |
| „Gang-Sein" ist **keine Eigenschaft** von `MenuSection`, sondern eine Rolle: Gang ist, was ein `MenuBundle` in `courses` aufzählt | Sonst bräuchte die Weinkarte, deren Abschnitte „Weiß"/„Rot" heissen, ein „ist kein Gang"-Feld. Die Rollen-Sicht kommt ohne Schalter aus |
| `MenuBundle.courses` sind `id`s, keine Titel | Die Titel kommen aus den Abschnitten selbst (`bundleCourses()`); ein umbenannter Gang wird an einer Stelle gepflegt, nicht an zweien |
| Getrennte Servicezeiten (Mittag/Abend) **ohne** neues Feld: zwei `hours.entries` mit verschiedenen Labels | `entries` ist bereits eine freie Liste, und schema.org will überlappende Tage ohnehin als zwei `OpeningHoursSpecification`. Dazu eine neue Regel in `types.ts`: `label` muss innerhalb von `entries` eindeutig sein – es ist der React-Key der Liste |
| Weinpreise pro Glas UND pro Flasche wurden **nicht** modelliert | Das hätte `MenuItem.price` zu einer Preisliste gemacht und `MenuRow` umgebaut. Stattdessen zwei Abschnitte („Offen ausgeschenkt · 0,2 l", „Weiß · Flasche 0,75 l") – so lösen es gedruckte Karten auch. Braucht ein echter Betrieb beides in einer Zeile, ist das die nächste ehrliche Typ-Erweiterung |

**Helfer statt Verzweigung:** `src/components/demo/menu.ts` (Geschwister von `routes.ts`, kein JSX) hält die zwei Regeln, die sonst als `if` in Komponenten gelandet wären – `leadItems(category, n)` liefert die ersten Gerichte einer Ebene, egal ob sie direkt oder eine Ebene tiefer hängen (Karten-Auszug auf der Startseite), und `bundleCourses(sections, bundle)` löst die `id`s eines Bündels zu echten Abschnitten auf.

**Belegt statt behauptet:** Das gebaute HTML der sechs Café-Seiten wurde vor und nach dem Umbau byteweise verglichen. Sichtbares Markup identisch, JSON-LD der Café-Karte identisch (2733 Zeichen). Einziger Unterschied im ganzen Build: `,null,null` in der RSC-Payload von `/demo/cafe/karte` – die zwei nicht vorhandenen Optionalblöcke, rund zehn Byte.

---

### Meta/SEO je Route

Der Pro-Route-`<head>` (`<title>`, `<meta name="description">`, `og:title`/`og:description`/`og:type`) läuft über die **Metadata API**. Single Source of Truth ist `src/data/meta.ts` (`routeMeta` + Helper `pageMetadata`) – die direkte Nachfolgerin der `META`-Map aus `scripts/prerender.mjs`, Werte inhaltlich unverändert. Jede `page.tsx` der Gruppe `(site)` exportiert `export const metadata = pageMetadata(routeMeta.<route>)`; `routeMeta` enthält genau die vier öffentlichen Routen. Die Demo-Seiten laufen bewusst daran vorbei: ihre `page.tsx` (sechs je Betrieb) setzen Title/Description direkt aus der Datendatei zusammen (Start `${name} – ${kind}`, Karte `${menu.title} – ${name}`, Kontakt `${contact.title} – ${name}`) und erbt `robots: { index: false, follow: false }` aus `(demo)/layout.tsx`; dasselbe Layout überschreibt dort auch den `viewport` (`themeColor '#f6f1e7'`, `colorScheme: 'light'`). Das Root-Layout hält nur die Defaults (Startseiten-Title/Description), den Favicon-Satz und den dunklen `viewport`-Export. `og:image`/`og:url` weiterhin NICHT gesetzt (kein Logo, keine finale Domain).

---

## Aktualisierungs-Anleitung

Nach jeder Änderung an Architektur, externen Diensten oder Datenfluss:
1. Claude Code aktualisiert diese Datei im Repo (`docs/CURRENT-SCHEMA.md`) als Teil des Tasks.
2. Projektdatei im Claude Project manuell austauschen (Copy-Paste aus `docs/`).

> Hinweis: Da kein DB-Schema existiert, entfallen die klassischen Zähler (Tabellen, Enums, RLS, Trigger etc.). Stattdessen werden externe Dienste und Datenfluss gepflegt.
