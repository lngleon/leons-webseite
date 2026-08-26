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
- **Verifikation nach jedem Build:** `.next/server/app/index.html`, `impressum.html`, `datenschutz.html`, `moeglichkeiten.html`, `demo/cafe.html`, `demo/cafe/karte.html`, `demo/cafe/kontakt.html` (die Route-Gruppen `(site)`/`(demo)` tauchen im Dateinamen NICHT auf – Next benennt die Datei nach dem URL-Pfad) – dort müssen H1 + Sektions-Text und der Pro-Route-`<head>` drinstehen.
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
| Favicon | ✅ (27.–28.07.2026) Satz: `favicon.svg` („LL" + Cursor-Block) + `favicon.ico` + `favicon-16/32.png` + `apple-touch-icon.png`; seit 24.08.2026 über `metadata.icons` im Root-Layout verlinkt (statt Head-Template), `theme-color #0a0a0a` + `color-scheme: dark` über den `viewport`-Export | `public/` |
| Projekt-Bilder | ✅ `blumen-lang-preview.webp`, `naillery-preview.webp`, dazu `leon-portrait.webp`; alle drei laufen seit 24.08.2026 über `next/image` (responsives `srcset` via `sizes`, Auslieferung über `/_next/image`) | `public/` |
| Demo-Fotos (`/demo/cafe`) | ✅ (26.08.2026) `cafe-gastraum.webp` 1120×1400 (4∶5, 73 KB, Hero), `cafe-zimtschnecken.webp` 800×800 (166 KB), `cafe-cappuccino.webp` 800×800 (37 KB), `cafe-fensterplatz.webp` 1410×940 (3∶2, 71 KB). Alle über `next/image` mit `fill` + `sizes` in `src/components/demo/DemoPhoto.tsx`; die Box reserviert das Seitenverhältnis per `aspect-ratio` → kein CLS. Fehlt in den Daten ein `src`, rendert dieselbe Box einen gestalteten Platzhalter statt eines Bildes | `public/demo/` |
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
| `/demo/cafe`<br>`/demo/cafe/karte`<br>`/demo/cafe/kontakt` | Stille **Demo-Seiten** eines erfundenen Gastro-Betriebs („Café Klee"), seit 26.08.2026 dreiseitig: Start (Kopf, Laufband, Bildreihe, Karten-Auszug) · Karte (volle Speisekarte mit Kategorie-Leiste) · Kontakt (Adresse mit Routen-Link, Öffnungszeiten, Telefon, Reservierungs-Mail). Segmente rein ASCII. Alle drei: `noindex`, NICHT in der Sitemap, NICHT verlinkt. Eigene Layout-Gruppe `(demo)` → **keine** Navbar/Footer/ScrollProgress/Analytics, eigene helle Design-Tokens. Navigation und Impressum-Fuß liefert `DemoShell`. Siehe „Layout-Gruppen" unten |
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
    demo/cafe/          ←   drei Seiten, je eine winzige page.tsx:
      page.tsx          ←     Start: Kopf, Laufband, Bildreihe, Karten-Auszug
      karte/page.tsx    ←     volle Karte + Kategorie-Leiste
      kontakt/page.tsx  ←     Adresse, Zeiten, Telefon, Reservierung
```

**Wo die Demo-Inhalte liegen:** nicht in `src/app/`. Die Daten je Betrieb stehen in EINER typisierten Datei (`src/data/demo/cafe-klee.ts`, Typen in `src/data/demo/types.ts`), die Bausteine in `src/components/demo/` (Hülle, Navigation, Hero, Karte, Kategorie-Leiste, Karten-Auszug, Öffnungszeiten, Adresse, Kontakt, Bildreihe, Impressum, Laufband, Foto-Box, JSON-LD) sind rein datengetrieben. Ein zweiter Betrieb = zweite Datendatei + Kopie des Ordners `demo/cafe/` (drei winzige `page.tsx`) mit anderem Import; an den Komponenten ändert sich nichts.

**Warum die Hülle in einer Komponente steckt und nicht in einem `layout.tsx`:** die Navigation muss den aktiven Punkt markieren. Ein Layout kennt den Pfad nicht, und `usePathname()` wäre ein Client-Hook – das würde die Zusicherung brechen, dass die Demo ohne JavaScript vollständig bedienbar ist. Jede Seite reicht ihr `current` deshalb selbst an `DemoShell`. Aus demselben Grund sind die Seitenwechsel normale `<a href>` (`next/link` ist in Next 16 eine Client-Komponente) und die Navigation eine horizontal scrollbare Pille statt eines Burger-Menüs. Pfade kommen aus `src/components/demo/routes.ts`, damit Navigation, Metadaten und JSON-LD dieselbe Quelle nutzen.

**schema.org folgt der Seitenaufteilung:** `Restaurant` (Adresse, Kontakt, Öffnungszeiten) liegt auf der Startseite und verweist per `hasMenu`-URL auf `/karte`; das `Menu` mit allen Sections und Preisen liegt auf `/karte`. `/kontakt` gibt bewusst KEIN eigenes JSON-LD aus – Adresse und Zeiten stehen schon im `Restaurant`, ein zweites Markup würde denselben Betrieb doppelt behaupten.

**Warum die Aufteilung:** Ein Eltern-Layout lässt sich in Next von unten nicht abwählen. Solange Navbar/Footer/ScrollProgress im Root-Layout lagen, hätte JEDE Route sie geerbt – auch die Demo-Seiten, die bewusst wie eigenständige Kundenseiten wirken sollen. Die Hülle ist deshalb eine Ebene tiefer gewandert (`src/components/SiteChrome.tsx`, genutzt von `(site)/layout.tsx` und `not-found.tsx`). **Für die Hauptseite ändert sich nichts:** das gerenderte Markup ist identisch (Zeichen für Zeichen verglichen; abweichend nur ein interner `useId`-Präfix und die Position eines leeren Suspense-Kommentars). Kosten: die zusätzliche Layout-Ebene bläht die RSC-Payload auf, gzip-komprimiert sind das **+157 bis +182 Byte pro Seite**.

**Design-Tokens der Demo:** `(demo)/demo.css` wird NUR vom Demo-Layout importiert (eigener CSS-Chunk – verifiziert, dass die Hauptseite ihn nicht lädt) und belegt DIESELBEN Variablennamen (`--background`, `--foreground`, `--accent` …) auf `html:has(.demo-scope)` bzw. `.demo-scope` neu. Dadurch lösen alle bestehenden Tailwind-Utilities dort automatisch auf warme Werte auf, ohne dass eine einzige globale `:root`-Variable angefasst wird.

### Meta/SEO je Route

Der Pro-Route-`<head>` (`<title>`, `<meta name="description">`, `og:title`/`og:description`/`og:type`) läuft über die **Metadata API**. Single Source of Truth ist `src/data/meta.ts` (`routeMeta` + Helper `pageMetadata`) – die direkte Nachfolgerin der `META`-Map aus `scripts/prerender.mjs`, Werte inhaltlich unverändert. Jede `page.tsx` der Gruppe `(site)` exportiert `export const metadata = pageMetadata(routeMeta.<route>)`; `routeMeta` enthält genau die vier öffentlichen Routen. Die Demo-Seiten laufen bewusst daran vorbei: ihre drei `page.tsx` setzen Title/Description direkt aus der Datendatei zusammen (Start `${name} – ${kind}`, Karte `${menu.title} – ${name}`, Kontakt `${contact.title} – ${name}`) und erbt `robots: { index: false, follow: false }` aus `(demo)/layout.tsx`; dasselbe Layout überschreibt dort auch den `viewport` (`themeColor '#f6f1e7'`, `colorScheme: 'light'`). Das Root-Layout hält nur die Defaults (Startseiten-Title/Description), den Favicon-Satz und den dunklen `viewport`-Export. `og:image`/`og:url` weiterhin NICHT gesetzt (kein Logo, keine finale Domain).

---

## Aktualisierungs-Anleitung

Nach jeder Änderung an Architektur, externen Diensten oder Datenfluss:
1. Claude Code aktualisiert diese Datei im Repo (`docs/CURRENT-SCHEMA.md`) als Teil des Tasks.
2. Projektdatei im Claude Project manuell austauschen (Copy-Paste aus `docs/`).

> Hinweis: Da kein DB-Schema existiert, entfallen die klassischen Zähler (Tabellen, Enums, RLS, Trigger etc.). Stattdessen werden externe Dienste und Datenfluss gepflegt.
