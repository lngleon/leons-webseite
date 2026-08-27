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
- **Ausnahme Demo-Seiten:** `/demo/*` besteht aus Server-Komponenten – weder `src/app/(demo)/`, noch `src/components/demo/`, noch die dort genutzte `src/components/ui/Marquee.tsx` tragen `'use client'`. Die Seiten brauchen kein eigenes JavaScript.
- **Die eine benannte JS-Ausnahme im Demo-Baum (seit 27.08.2026):** `src/components/demo/DemoBookingFlow.tsx` trägt `'use client'` – die Reservierungs-**Attrappe** unter `/demo/restaurant/reservieren`. Sie ist die EINZIGE Datei dort mit eigenem Client-Code; eine fünfschrittige Strecke, die Eingaben mitführt und am Ende den getippten Namen spiegelt, geht ohne Zustand im Browser nicht. **Sauber begrenzt und nachgemessen – und zwar getrennt nach JS und CSS:** Die **JavaScript**-Chunk-Sätze der übrigen zwölf Demo-Seiten sind vor und nach dem Umbau byte-gleich; nur `/demo/restaurant/reservieren` bekommt genau EINEN zusätzlichen Chunk (2,7 KB gzip, ohne `framer-motion`, ohne `next/link`, ohne `fetch`, ohne `Date`, ohne `Math.random`). Der **CSS**-Chunk der Demo-Gruppe wächst dagegen um den Attrappen-Abschnitt und bekommt einen neuen Hash – ihn laden alle dreizehn Demo-Seiten, die zwölf anderen liefern ihn also ungenutzt mit aus. Das ist der Preis dafür, dass `demo.css` EINE Datei für die ganze Gruppe ist. **Leons Hauptseite bleibt davon unberührt:** sie lädt den globalen Tailwind-Utility-Chunk, und dort ist keine einzige der 494 Klassenregeln neu (geprüft gegen den kompletten Quelltext des Vorgänger-Commits). Dafür verzichtet die Attrappe bewusst auf jede Tailwind-Utility, die es im Repo nicht ohnehin schon gab, und bringt ihre Screenreader- und Breitenklasse selbst mit. **Ohne JavaScript** wird die Strecke per `<noscript><style>` ausgeblendet und ein Erklärblock mit Telefon und E-Mail eingeblendet – umgeschaltet rein per CSS, ohne Aufblitzen in beiden Richtungen. Die Attrappe selbst tut nichts: kein Netzwerk-Request, keine Mail, kein `localStorage` (im Browser gemessen: 0 Requests beim Durchklicken, beide Speicher leer).

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
| Favicon | ✅ (27.–28.07.2026) **`(site)` + `not-found`:** Satz `favicon.svg` („LL" + Cursor-Block) + `favicon.ico` + `favicon-16/32.png` + `apple-touch-icon.png`, seit 24.08.2026 über `metadata.icons` im Root-Layout verlinkt (statt Head-Template), `theme-color #0a0a0a` + `color-scheme: dark` über den `viewport`-Export. **`(demo)` seit 26.08.2026 eigenständig, seit 27.08.2026 JE BETRIEB:** `icon.svg` + `apple-icon.png` liegen nicht mehr auf Gruppen-Ebene, sondern in `src/app/(demo)/demo/<slug>/` – Café das „K", Restaurant das „G", beide in `#b4441e` auf `#f6f1e7` mit `#dbcfba`-Hairline, alle drei Werte aus den Tokens in `demo.css`. Buchstaben als PFADE, nicht als `<text>`: ein Favicon-SVG darf sich nicht auf eine Systemschrift verlassen. Das „G" und sein 180×180-PNG kommen aus EINER Geometrie-Beschreibung (Bogen + Stamm + Querbalken); das PNG wurde ohne Bildwerkzeug über ein Distanzfeld gerastert (4×4-Supersampling), die 16-px-Lesbarkeit vorher als Pixelraster geprüft. `icons: null` im Demo-Layout bleibt Bedingung – ohne dieses `null` verwirft Next die Dateien still, weil `metadata.icons` des Root-Layouts gewinnt. Ergebnis im gebauten HTML: jede Demo-Seite genau zwei Tags auf **ihr eigenes** Paar (`/demo/cafe/…` bzw. `/demo/restaurant/…`), (site) unverändert fünf Tags | `public/` (LL-Satz), `src/app/(demo)/demo/<slug>/icon.svg` + `apple-icon.png` |
| Display-Schrift `/demo/*` | ✅ (26.08.2026) **Fraunces 72pt SemiBold**, lokal via `next/font/local`, auf Latin subsettet → **18,2 KB WOFF2**. Lizenz **SIL Open Font License 1.1** (Copyright 2018 The Fraunces Project Authors) – erlaubt Webfont-Einbettung und Einsatz in Kundenprojekten ausdrücklich, verlangt aber die Mitlieferung der Lizenz: `OFL-Fraunces.txt` liegt neben der Datei und darf nicht entfernt werden. **Verworfen:** *Young Serif* (OFL 1.1, Zeichensatz vollständig, 26,6 KB) und *Instrument Serif* (OFL 1.1, vollständig, 21,4 KB) – beide gibt es nur in Gewicht 400, `.demo-display` setzt aber `font-weight: 600`; der Browser hätte den Fettschnitt rechnen müssen. Ebenfalls verworfen: die **variable** Fraunces-Datei – vier Achsen (`opsz`, `wght`, `SOFT`, `WONK`), davon keine gebraucht, 122,2 KB nach demselben Subset statt 18,2 KB. `--font-demo-display` wird von `DemoShell` auf `.demo-scope` gesetzt und in `demo.css` zu `--demo-display` verkettet. **Leons Hauptseite ist NICHT betroffen** – sie lädt weder die Datei noch ein `@font-face` (im gebauten HTML geprüft) | `src/app/(demo)/fonts/` |
| Projekt-Bilder | ✅ `blumen-lang-preview.webp`, `naillery-preview.webp`, dazu `leon-portrait.webp`; alle drei laufen seit 24.08.2026 über `next/image` (responsives `srcset` via `sizes`, Auslieferung über `/_next/image`) | `public/` |
| Demo-Fotos (`/demo/cafe`) | ✅ (26.08.2026) `cafe-gastraum.webp` 1120×1400 (4∶5, 73 KB, Hero), `cafe-zimtschnecken.webp` 800×800 (166 KB), `cafe-cappuccino.webp` 800×800 (37 KB), `cafe-fensterplatz.webp` 1410×940 (3∶2, 71 KB). Alle über `next/image` mit `fill` + `sizes` in `src/components/demo/DemoPhoto.tsx`; die Box reserviert das Seitenverhältnis per `aspect-ratio` → kein CLS. Fehlt in den Daten ein `src`, rendert dieselbe Box einen gestalteten Platzhalter statt eines Bildes Dazu die drei Fotos der Über-uns-Seite: `cafe-aussenansicht.webp` 1080×720 (3∶2, 100 KB), `cafe-handwerk.webp` 1080×1350 (4∶5, 86 KB), `cafe-team.webp` 1080×720 (3∶2, 52 KB) – alle drei aus Quellen heruntergerechnet, nie hochgerechnet | `public/demo/` |
| Demo-Fotos (`/demo/restaurant`) | ✅ (27.08.2026) `restaurant-tafel.webp` 941×1176 (4∶5, 93 KB, Hero – zweite Fassung, löste `restaurant-gastraum.webp` ab, das gelöscht ist), `restaurant-feuerstelle.webp` 1080×1080 (80 KB), `restaurant-teller.webp` 1080×1080 (130 KB), `restaurant-mittagslicht.webp` 1536×1024 (3∶2, 59 KB) – dazu die drei Über-uns-Fotos `restaurant-holzofen.webp` 1200×800 (48 KB), `restaurant-fleisch.webp` 819×1024 (4∶5, 70 KB), `restaurant-kueche.webp` 1200×800 (40 KB). Alle motivbezogen beschnitten und heruntergerechnet, **nie hochgerechnet**. Der Hero kam als Zweitfassung aus einer echten Hochformat-Quelle (941×1672) und erreicht im 768-px-Slot Faktor 1,23 bei DPR 1 statt der vorherigen 1,13 | `public/demo/` |
| Demo-Fotos (`/demo/friseur`) | ✅ (27.08.2026) **vollständig, zehn Bilder, kein Platzhalter mehr.** `friseur-platz.webp` 941×1176 (4∶5, 50 KB, Hero – zweite Fassung, löste `friseur-salon.webp` ab), `friseur-werkzeug.webp` 1080×1080 (121 KB), `friseur-waschplatz.webp` 1080×1080 (40 KB), `friseur-wartebank.webp` 1536×1024 (3∶2, 54 KB), `friseur-beratung.webp` 1200×800 (48 KB), `friseur-schnitt.webp` 868×1085 (4∶5, 38 KB), `friseur-spiegelreihe.webp` 1200×800 (45 KB – löste `friseur-spiegelwand.webp` ab, das aus der Serie fiel). Dazu die drei Team-Porträts `friseur-team-mira.webp` 1200×1200 (52 KB), `friseur-team-jonte.webp` **1110×1110** (56 KB – als einziges Bild motivbedingt schmaler beschnitten, siehe Session 26) und `friseur-team-aylin.webp` 1200×1200 (45 KB); ihr Slot rendert 368 px, `DemoTeam` fordert seit Session 26 genau das an (vorher 372) | `public/demo/` |
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
| `/demo/restaurant/reservieren` | **Reservierungs-Attrappe** (seit 27.08.2026), siebte Restaurant-Seite. Fünf Schritte – Personenzahl · Tag · Uhrzeit · Kontaktdaten · Bestätigung – die **nichts tun**: kein Netzwerk-Request, keine Mail, kein Speichern. Auf **jedem** Schritt als Vorschau gekennzeichnet (klebendes Band, Schrittzähler, ein je Schritt ANDERER Satz unter der Überschrift, ein Satz unter dem Weiter-Knopf, dazu „(Vorschau)" im Browser-Tab). Steht **nicht** in der Navigations-Pille – der Einstieg liegt auf `/demo/restaurant/kontakt`. Die einzige Seite im Demo-Baum mit eigenem JavaScript; ohne JS erscheint an ihrer Stelle ein Erklärblock. Bekannte Einschränkung: der **Browser-Zurück-Knopf verlässt die Strecke**, statt einen Schritt zurückzugehen – dagegen mit `history.pushState` anzusteuern kollidiert mit der History-Verwaltung des App-Routers |
| `/demo/friseur`<br>`/demo/friseur/karte`<br>`/demo/friseur/ueber-uns`<br>`/demo/friseur/kontakt`<br>`/demo/friseur/impressum`<br>`/demo/friseur/datenschutz` | **Dritte** stille Demo (seit 27.08.2026): Friseursalon „Salon Wirbel" – der erste Betrieb, der **keine Gastronomie** ist. Sechs Seiten, dieselben Bausteine, kein Buchungsflow (`booking` fehlt, also entfällt die Attrappe von selbst). Eigener Token-Satz (`theme: 'friseur'` → `.demo-scope--friseur`, kühles Porzellan + Pflaume), eigenes Icon-Paar („W"), eigenes `viewport.themeColor` aus `demo/friseur/layout.tsx`. Das Routen-Segment heisst weiterhin `karte`, die Seite überschrieben „Leistungen" — wie beim Restaurant „Karten". `noindex`, nicht in der Sitemap, JS-frei. |
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
      reservieren/page.tsx ←  siebte Seite, NUR hier: Reservierungs-Attrappe
    demo/friseur/       ←   dritter Betrieb, KEINE Gastronomie. Wieder
                            dieselben sechs Dateien; zwei Abweichungen:
      layout.tsx           ←  NUR themeColor (eigene Farbwelt), gibt
                              children unveraendert zurueck
      karte/page.tsx       ←  ruft buildOfferCatalogSchema statt
                              buildMenuSchema (anderes schema.org-Vokabular)
    demo/cafe/icon.svg   ←   Favicons je Betrieb (seit 27.08.2026)
    demo/cafe/apple-icon.png
    demo/restaurant/icon.svg
    demo/restaurant/apple-icon.png
    demo/friseur/icon.svg
    demo/friseur/apple-icon.png
```

**Navigation der Demo-Seiten (seit 27.08.2026: Umbruch statt Scrollen).** `DemoNav` rendert eine flache Liste von Links – keine Zahl, kein Umbruchpunkt, kein Zustand. Die ganze Mechanik steht in `demo.css`:

- **Unter 640 px** ist `.demo-nav-pill` ein Gitter mit **zwei** Spalten. Damit ist die Zeilenzahl `ceil(n/2)` und hängt allein an der Anzahl der Ziele – nicht an den Beschriftungen. Mit `flex-wrap` wäre der Umbruchpunkt von den Wörtern abhängig gewesen („Leistungen" 122 px gegen „Karte" 80 px) und die Höhe damit unvorhersagbar.
- **Ab 640 px** eine Zeile mit natürlichen Breiten (`grid-auto-flow: column`) – die Optik von vorher. Ab sechs Zielen drei Spalten, weil eine Zeile dort gemessen 650 px braucht und bei 640 px nur 576 px zur Verfügung stehen.
- **Die Höhe wird vorgeschrieben, nicht gemessen.** `--demo-nav-h` ist eine Formel aus `--demo-nav-zeilen`; die Zeilenzahl belegen `:has(> li:nth-child(n))`-Regeln auf `.demo-scope`. Das ist der Kern: die Kategorie-Leiste auf `/karte`, das Vorschau-Band der Attrappe und `.demo-anchor` lesen alle diese eine Variable, und CSS kann eine *gerenderte* Höhe keinem anderen Selektor mitteilen (`anchor-size()` gilt nur in Inset-/Grössen-Eigenschaften absolut positionierter Elemente, Container-Queries nur für Nachfahren). Gezählt wird deshalb, was zählbar ist: die `<li>`.
- **Warum keine Zahl im Markup:** ein `items.length` als Inline-Style wäre eine zweite Wahrheit neben der Liste selbst. Die Liste IST die Zählung.
- **Nachgewiesen:** vorgeschriebene = gerenderte Zeilenzahl für drei bis sieben Ziele bei 320/640/768/1280 px, `--demo-nav-h` auf 1 px genau gleich der Bandhöhe. Bandhöhen 68 / 116 / 164 / 212 px für 1–4 Zeilen. Ab sieben Zielen neu messen.

**Ein Tap-Mass für alles (`--demo-tap`, 2.75rem).** Navigationslinks, Kategorie-Chips und die beiden Rechtslinks im Fuss hatten vorher 44, 32 und 18 px – drei Antworten auf dieselbe Frage. Die Fuss-Links werden über die Struktur ausgewählt (`.demo-scope footer .demo-fuss-link`), damit das Markup der Seiten unangetastet bleibt; die Gang-Links der Menü-Bündel tragen dieselbe Klasse, stehen aber in einer engen Aufzählung und bleiben bewusst aussen vor.

**Wo die Demo-Inhalte liegen:** nicht in `src/app/`. Die Daten je Betrieb stehen in EINER typisierten Datei (`src/data/demo/cafe-klee.ts`, Typen in `src/data/demo/types.ts`), die Bausteine in `src/components/demo/` (Hülle, Navigation, Hero, Karte, Kategorie-Leiste, Karten-Auszug, Über uns, Öffnungszeiten, Adresse, Kontakt, Bildreihe, Rechtsseiten-Rahmen, Seitenfuß, Laufband, Foto-Box, JSON-LD) sind rein datengetrieben. Ein zweiter Betrieb = zweite Datendatei + Kopie des Ordners `demo/cafe/` (sechs winzige `page.tsx`) mit anderem Import. **Am 27.08.2026 durchgeführt und damit belegt:** `restaurant-glut.ts` + `demo/restaurant/`; `cafe-klee.ts` blieb dabei Zeichen für Zeichen unverändert. Drei Bausteine mussten für die neuen Karten-Formen **verallgemeinert** werden (`DemoMenu`, `DemoMenuTeaser`, `buildMenuSchema`) – keiner davon fragt, welcher Betrieb rendert; sie richten sich nach vorhandenen Feldern. Details unter „Datenmodell der Demo-Betriebe".

**Warum die Hülle in einer Komponente steckt und nicht in einem `layout.tsx`:** die Navigation muss den aktiven Punkt markieren. Ein Layout kennt den Pfad nicht, und `usePathname()` wäre ein Client-Hook – das würde die Zusicherung brechen, dass die Demo ohne JavaScript vollständig bedienbar ist. Jede Seite reicht ihr `current` deshalb selbst an `DemoShell`. Aus demselben Grund sind die Seitenwechsel normale `<a href>` (`next/link` ist in Next 16 eine Client-Komponente) und die Navigation eine horizontal scrollbare Pille statt eines Burger-Menüs. Pfade kommen aus `src/components/demo/routes.ts`, damit Navigation, Metadaten und JSON-LD dieselbe Quelle nutzen.

**schema.org, seit Demo 3 in zwei Vokabularen:** Der BETRIEBS-Knoten ist verallgemeinert – `buildBusinessSchema()` (hiess bis dahin `buildRestaurantSchema`) liest den Typ aus `seo.schemaType`, Vorgabe `'Restaurant'`; der Friseur trägt `'HairSalon'`. Die PREISLISTE liess sich **nicht** verallgemeinern: `Menu`/`MenuSection`/`MenuItem` ist laut schema.org „food or drink items available from a FoodEstablishment". Für Dienstleistungen heisst dasselbe Konzept `OfferCatalog` → `Offer` → `Service` und hat eine andere FORM, nicht nur andere Namen. Deshalb steht neben `buildMenuSchema()` ein zweiter Aufbauer `buildOfferCatalogSchema()`; welchen eine Seite ruft, entscheidet die Seite – so wie sie entscheidet, welche Datendatei sie hineinreicht. Eine Ausnahme ist der Verweis vom Betrieb auf seine Preisliste: der heisst je nach Typ `hasMenu` oder `hasOfferCatalog` und kommt aus einer Vokabel-Tabelle (`PREISLISTEN_PROP` in `schema.ts`) – das ist eine Tatsache über schema.org, keine über unsere Betriebe. Die Preis-Union bildet sich dabei 1:1 ab: Festpreis → `price`, Spanne → `PriceSpecification` mit `minPrice`+`maxPrice`, Ab-Preis → `minPrice` ohne Obergrenze. Die DAUER hat in schema.org keinen Platz an `Service`/`Offer` und wird deshalb bewusst nicht ausgegeben.

**Seitenaufteilung des Markups (unverändert):** `Restaurant` (Adresse, Kontakt, Öffnungszeiten) liegt auf der Startseite und verweist per `hasMenu`-URL auf `/karte`; das `Menu` mit allen Sections und Preisen liegt auf `/karte`. `/kontakt` gibt bewusst KEIN eigenes JSON-LD aus – Adresse und Zeiten stehen schon im `Restaurant`, ein zweites Markup würde denselben Betrieb doppelt behaupten. Seit der zweiten Demo kann eine `MenuSection` zusätzlich `hasMenuSection` tragen (Karte → Gänge → Gerichte); Menü-Bündel stehen als `MenuItem` mit ihrem Festpreis an der Karte, ihre Gänge in der `description` – schema.org kennt kein eigenes Festpreis-Menü, und die Gerichte ein zweites Mal auszugeben würde sie doppelt behaupten. Bewusst KEIN `position` an den Abschnitten.

**Warum die Aufteilung:** Ein Eltern-Layout lässt sich in Next von unten nicht abwählen. Solange Navbar/Footer/ScrollProgress im Root-Layout lagen, hätte JEDE Route sie geerbt – auch die Demo-Seiten, die bewusst wie eigenständige Kundenseiten wirken sollen. Die Hülle ist deshalb eine Ebene tiefer gewandert (`src/components/SiteChrome.tsx`, genutzt von `(site)/layout.tsx` und `not-found.tsx`). **Für die Hauptseite ändert sich nichts:** das gerenderte Markup ist identisch (Zeichen für Zeichen verglichen; abweichend nur ein interner `useId`-Präfix und die Position eines leeren Suspense-Kommentars). Kosten: die zusätzliche Layout-Ebene bläht die RSC-Payload auf, gzip-komprimiert sind das **+157 bis +182 Byte pro Seite**.

**Design-Tokens der Demo:** `(demo)/demo.css` wird NUR vom Demo-Layout importiert (eigener CSS-Chunk – verifiziert, dass die Hauptseite ihn nicht lädt) und belegt DIESELBEN Variablennamen (`--background`, `--foreground`, `--accent` …) auf `html:has(.demo-scope)` bzw. `.demo-scope` neu. Dadurch lösen alle bestehenden Tailwind-Utilities dort automatisch auf warme Werte auf, ohne dass eine einzige globale `:root`-Variable angefasst wird.

### Datenmodell der Demo-Betriebe (seit 27.08.2026: Café, Restaurant **und** Friseur)

Ein Betrieb = EINE typisierte Datei (`src/data/demo/<slug>.ts`), die `GastroBusiness` aus `src/data/demo/types.ts` erfüllt. Der Aufbau der Karte trägt seit der zweiten Demo zwei sehr verschiedene Betriebe, ohne dass das Café leere Pflichtfelder mitschleppt oder eine Komponente einen Betriebs-Zweig bekommt.

**Die Regel, an der alles hängt:** Eine Komponente darf fragen „ist dieses FELD da?" – so wird `note` seit jeher gerendert. Sie darf nicht fragen „ist das ein Café oder ein Restaurant?". Alles Weitere folgt daraus.

**Drei Ebenen statt zwei:**

```
menu.categories[]  MenuCategory  – oberste Ebene: die Gliederungspunkte der Kartenseite
                                   Café:       eine Kategorie („Kaffee")
                                   Restaurant: eine ganze Karte („Abendkarte")
                                   Friseur:    ein Leistungsbereich („Farbe")
                                   → genau das, was in der Sprungleiste steht
  ├─ items[]       MenuItem      – flache Karte: Posten direkt darunter
  ├─ sections[]    MenuSection   – gegliederte Karte: Gänge (Abendkarte),
  │    └─ items[]                  Gruppen (Weinkarte) oder Leistungsgruppen
  │                                („Ansatz & Ton"); Reihenfolge = Array-Reihenfolge
  └─ bundles[]     MenuBundle    – Menüs aus mehreren Gängen zum Festpreis
                                   (nur Restaurant – siehe Tabelle unten)

MenuItem, die drei optionalen Zusätze – jeder an EIN Merkmal gebunden:
  allergens[]        – wer serviert, kennzeichnet          (Café, Restaurant)
  durationMinutes    – wer Zeit verkauft, nennt sie        (Friseur)
  priceTo / priceOpen – wessen Preis nicht feststeht       (Friseur)
      beide fehlen    → „3,80 €"
      priceTo: 68     → „52,00 – 68,00 €"
      priceOpen: true → „ab 49,00 €"

team.members[]     TeamMember    – Mitarbeiter als eigene Ebene (nur Friseur),
                                   gerendert von DemoTeam aus DemoAbout heraus
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
| `durationMinutes` ist eine **Zahl**, kein Text („45 Min.") | Dieselbe Regel wie beim Preis: zwanzig von Hand getippte Zeilen ergäben sonst „45 Min", „45 min" und „45 Minuten" nebeneinander. `formatDuration()` in `menu.ts` setzt die eine Form und rechnet ab 60 Minuten in „2 Std." / „1 Std. 30 Min." um |
| Der unscharfe Preis ist eine **exklusive Union** (`priceTo` XOR `priceOpen`), kein `priceTo?: number \| null` | Mit `null` als „offen" lassen sich `null` und `undefined` per `??` oder Wahrheitswert-Test unfallfrei verwechseln – ein Ab-Preis renderte dann STILL als Festpreis: falsche Zahl, keine Fehlermeldung. Zwei benannte Felder können das nicht. Ausserdem kennt schema.org dieselbe Unterscheidung (`price` vs. `minPrice`/`maxPrice`), die Union bildet also nicht nur die Anzeige ab |
| `team` ist eine eigene Ebene, kein weiterer `about.blocks`-Eintrag | Blöcke sind eine Erzählung im Bild-Text-Wechsel; jeder behauptet etwas anderes und bekommt eine halbe Seite. Mitarbeiter sind gleichrangig und werden verglichen – im Wechsel bekäme die erste Person eine Doppelseite, die letzte den Rest, und die Reihenfolge läse sich als Rangfolge |
| `allergens` und `seo.servesCuisine` wurden **optional**, statt gastro-neutral umbenannt zu werden | Beides IST gastro-spezifisch und soll es bleiben. Fehlt `allergens`, entfällt der Legendenblock am Ende der Kartenseite – wieder eine Feldfrage. Die Überschrift „Allergene" darf deshalb im Klartext in `DemoMenu` stehen: sie erscheint nur, wenn es wirklich um Allergene geht |
| Der Typ heisst weiterhin `GastroBusiness`, obwohl er einen Friseur trägt | Ein neuer Name hätte die Importzeile beider Vorgänger-Datendateien angefasst und die Zusage „Zeichen für Zeichen unverändert" aufgegeben. Derselbe Handel wie bei `menu.categories`. Beschrieben ist ohnehin ein *kleiner ortsgebundener Betrieb mit Preisliste, Zeiten und Adresse* |
| Der Friseur bekam **keine** `bundles`, obwohl ein Kombi-Termin naheliegt | Ein `MenuBundle` ist „aus jedem Gang eins" – ein Salon-Kombi ist das nicht, sondern schlicht eine eigene Leistung zum Festpreis („Schnitt & Bart", 48 €). Nebenbei erspart das die Frage, wie die in `DemoMenuBundles` fest verdrahteten Wörter „Menü" und „Festpreis" für einen Nicht-Gastro-Betrieb heissen müssten (offen, siehe Bekannte Kanten) |
| Weinpreise pro Glas UND pro Flasche wurden **nicht** modelliert | Das hätte `MenuItem.price` zu einer Preisliste gemacht und `MenuRow` umgebaut. Stattdessen zwei Abschnitte („Offen ausgeschenkt · 0,2 l", „Weiß · Flasche 0,75 l") – so lösen es gedruckte Karten auch. Braucht ein echter Betrieb beides in einer Zeile, ist das die nächste ehrliche Typ-Erweiterung |

**Helfer statt Verzweigung:** `src/components/demo/menu.ts` (Geschwister von `routes.ts`, kein JSX) hält die zwei Regeln, die sonst als `if` in Komponenten gelandet wären – `leadItems(category, n)` liefert die ersten Gerichte einer Ebene, egal ob sie direkt oder eine Ebene tiefer hängen (Karten-Auszug auf der Startseite), und `bundleCourses(sections, bundle)` löst die `id`s eines Bündels zu echten Abschnitten auf.

**Das optionale Feld `booking` (seit 27.08.2026)** ist derselbe Mechanismus eine Ebene höher: Es trägt die Reservierungs-Attrappe samt aller Texte. Das Café hat es nicht – deshalb hat es weder die Strecke noch den Einstieg auf der Kontaktseite, und **keine** Komponente musste dafür wissen, um welchen Betrieb es geht (`DemoBooking` beginnt mit `if (!business.booking) return null`, `DemoContact` rendert seinen Zusatzblock unter derselben Bedingung). Drei Entscheidungen dazu:

- Es heisst **`booking`** und nicht `reservation`, weil `contact.reservation` bereits existiert (die vorbereitete Mail). Zwei Felder gleichen Namens auf zwei Ebenen wären in jedem Grep mehrdeutig.
- **Die Attrappe wiederholt keine Zeiten.** `booking.services[].hoursLabel` zeigt auf ein `hours.entries[].label`; `buildBookingWeek()` in `src/components/demo/booking.ts` rechnet daraus das Raster (reine Minuten-Arithmetik auf „HH:MM"-Strings – kein `Date`, keine Zeitzone, damit auch kein Unterschied zwischen Server-Frame und erstem Client-Frame). Ruhetage ergeben sich dadurch von selbst, und wer die Öffnungszeiten ändert, ändert die Strecke mit. Erfunden ist allein die **Belegung** (`busySlots`/`tightSlots`), und die Legende über dem Raster sagt das im Klartext.
- **Kein Datum, sondern eine Beispielwoche.** Ein echter Kalender bräuchte `Date` im Render (Hydration-Regel) und würde im statischen Prerender die Build-Zeit einfrieren; ein fest eingetragenes Datum altert genauso. Wochentage lösen beides – und sagen dem Betrachter nebenbei, dass hier kein Live-Kalender läuft.

**Das optionale Feld `theme` (seit 27.08.2026, Demo 3)** trägt die eigene Farbwelt. `DemoShell` hängt daraus eine ZWEITE Klasse neben `.demo-scope` (`demo-scope--friseur`), die in `demo.css` dieselben Variablen neu belegt. Café und Restaurant tragen kein `theme`, bekommen deshalb auch keine zweite Klasse – ihr Markup bleibt unverändert. Bewusst ein eigenes Feld und **nicht** aus dem `slug` abgeleitet: sonst hätten die beiden Vorgänger plötzlich eine Klasse mehr im HTML. Zwei Betriebe dürfen sich einen Look teilen, und ein Slug darf sich ändern, ohne die Farben mitzunehmen. Dazu gehört ein eigenes `viewport.themeColor` im `layout.tsx` des Betriebs – ein `<meta>`-Attribut kann keine CSS-Variable lesen, der Hex-Wert steht deshalb an zwei Stellen.

**Bekannte Kanten des gemeinsamen Baums** (bewusst nicht erzwungen, Stand Demo 3):

- **Routen-Segment `karte`** gilt für alle Betriebe. Der Friseur liegt damit unter `/demo/friseur/karte`, überschrieben ist die Seite „Leistungen". Ein Segment je Betrieb hiesse: `demoHref()` braucht das ganze `business` statt des Slugs (rund acht Aufrufstellen in gemeinsamen Komponenten) **und** eine zweite Wahrheit neben dem Ordnernamen, die stillschweigend auseinanderlaufen und 404 erzeugen kann. Dafür ist ein leicht schiefes Segment der billigere Preis.
- **`DemoMenuBundles` verdrahtet zwei Wörter fest:** „Menü" (Eyebrow) und „Festpreis". Solange nur das Restaurant Bündel hat, stimmt beides. Der erste Nicht-Gastro-Betrieb mit Bündeln muss sie in die Daten holen.
- **Die Dauer steht in keinem Markup.** schema.org hat für „so lange dauert diese Dienstleistung" keine Eigenschaft an `Service` oder `Offer`. Eine zweckentfremdete zu nehmen wäre schlechter als die Auslassung.

**Belegt statt behauptet, zum zweiten Mal (Demo 3):** Vor dem Umbau `npm run build`, die 13 gebauten HTML-Dateien von Café und Restaurant nach ausserhalb des Repos kopiert, nach dem Umbau neu gebaut und verglichen (Build-ID und Chunk-Hashes normalisiert). Ergebnis: **sichtbares Markup und JSON-LD auf allen 13 Seiten identisch**, sieben davon sogar vollständig byte-gleich. Übrig blieben ausschliesslich `null`-Einträge in der RSC-Payload: je Preiszeile einer für die nicht vorhandene Dauer (Café Start 40 B, Café Karte 85 B, Restaurant Start 30 B, Restaurant Karte 130 B) und je ein zusätzlicher Payload-Eintrag auf den beiden „Über uns"-Seiten für den nicht vorhandenen Team-Block (18 B, dazu die Renummerierung der laufenden Payload-IDs). **Der gemeinsame Tailwind-Chunk ist byte-gleich geblieben** – gleicher Dateiname `06kk0ctuz86pl.css`, 50.428 B: keine einzige neue Utility, also auch keine veränderte Auslieferung für Leons Hauptseite. Der `demo.css`-Chunk wuchs um exakt 608 Zeichen, und der Vergleich zeigt sie als rein additiv – der neue Token-Block, keine geänderte Regel.

**Belegt statt behauptet (Demo 2):** Das gebaute HTML der sechs Café-Seiten wurde vor und nach dem Umbau byteweise verglichen. Sichtbares Markup identisch, JSON-LD der Café-Karte identisch (2733 Zeichen). Einziger Unterschied im ganzen Build: `,null,null` in der RSC-Payload von `/demo/cafe/karte` – die zwei nicht vorhandenen Optionalblöcke, rund zehn Byte.

---

### Meta/SEO je Route

Der Pro-Route-`<head>` (`<title>`, `<meta name="description">`, `og:title`/`og:description`/`og:type`) läuft über die **Metadata API**. Single Source of Truth ist `src/data/meta.ts` (`routeMeta` + Helper `pageMetadata`) – die direkte Nachfolgerin der `META`-Map aus `scripts/prerender.mjs`, Werte inhaltlich unverändert. Jede `page.tsx` der Gruppe `(site)` exportiert `export const metadata = pageMetadata(routeMeta.<route>)`; `routeMeta` enthält genau die vier öffentlichen Routen. Die Demo-Seiten laufen bewusst daran vorbei: ihre `page.tsx` (sechs je Betrieb) setzen Title/Description direkt aus der Datendatei zusammen (Start `${name} – ${kind}`, Karte `${menu.title} – ${name}`, Kontakt `${contact.title} – ${name}`) und erbt `robots: { index: false, follow: false }` aus `(demo)/layout.tsx`; dasselbe Layout überschreibt dort auch den `viewport` (`themeColor '#f6f1e7'`, `colorScheme: 'light'`). Das Root-Layout hält nur die Defaults (Startseiten-Title/Description), den Favicon-Satz und den dunklen `viewport`-Export. `og:image`/`og:url` weiterhin NICHT gesetzt (kein Logo, keine finale Domain).

---

## Aktualisierungs-Anleitung

Nach jeder Änderung an Architektur, externen Diensten oder Datenfluss:
1. Claude Code aktualisiert diese Datei im Repo (`docs/CURRENT-SCHEMA.md`) als Teil des Tasks.
2. Projektdatei im Claude Project manuell austauschen (Copy-Paste aus `docs/`).

> Hinweis: Da kein DB-Schema existiert, entfallen die klassischen Zähler (Tabellen, Enums, RLS, Trigger etc.). Stattdessen werden externe Dienste und Datenfluss gepflegt.
