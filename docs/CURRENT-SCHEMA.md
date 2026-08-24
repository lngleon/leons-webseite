# CURRENT-SCHEMA.md – Architektur & Datenfluss

> Letzte Aktualisierung: 24.08.2026
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
- **Verifikation nach jedem Build:** `.next/server/app/index.html`, `impressum.html`, `datenschutz.html`, `möglichkeiten.html` – dort müssen H1 + Sektions-Text und der Pro-Route-`<head>` drinstehen.
- **Tailwind v4** läuft nicht mehr über `@tailwindcss/vite`, sondern über `@tailwindcss/postcss` (`postcss.config.mjs`). Globales CSS: `src/app/globals.css` (früher `src/index.css`), im Root-Layout importiert.

---

## Externe Dienste

### Formspree
- **Zweck:** Nimmt die Daten des Kontaktformulars per HTTP POST entgegen und leitet sie als E-Mail weiter.
- **Empfänger:** `leonlang95@gmail.com` (später auf professionelle Adresse änderbar)
- **Account:** noch anzulegen (Phase 1)
- **Endpoint/Form-ID:** ✅ gesetzt. Wird NIE hardcodiert, sondern aus der Env-Variable **`NEXT_PUBLIC_FORMSPREE_ENDPOINT`** gelesen (`src/components/ContactForm.tsx`, `process.env.…`). Seit der Next-Migration (24.08.2026) heißt sie so – vorher `VITE_FORMSPREE_ENDPOINT`. Steht lokal in `.env.local` UND muss im Vercel-Dashboard hinterlegt sein (alle Environments).
- **Tarif:** kostenloser Free-Tier (ausreichend für erwartetes Anfragevolumen)
- **Sichtbar für Besucher?** Nein – Formspree taucht im UI nicht auf, das Formular gehört optisch komplett der Seite.
- **Späterer Wechsel:** optionaler Umstieg auf Resend + Vercel Serverless Function, sobald eigene Domain steht (für Absender über eigene Domain). Aktuell nicht umgesetzt.

### Vercel Web Analytics
- **Zweck:** Cookielose Besuchsstatistik (Seitenaufrufe, Referrer, Länder, Geräte) im Vercel-Dashboard – zeigt, ob/wie die Seite besucht wird.
- **Umsetzung:** `@vercel/analytics` (v2, keine Runtime-Dependencies); `<Analytics />` aus **`@vercel/analytics/next`** (App-Router-Variante; früher `/react`) EINMAL zentral im Root-Layout `src/app/layout.tsx` gemountet → erfasst alle Routen. Es landet **kein Markup im statischen HTML**, das Insights-Script (`/_vercel/insights/script.js`) wird erst im Browser nachgeladen → SSG-/hydration-sicher.
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
| `/möglichkeiten` | Stille Showcase-Seite „Was möglich ist" (statisch gerendert, bewusst NICHT in der Navbar verlinkt). **Ordner heißt `src/app/m%C3%B6glichkeiten/` – percent-encodet, NICHT `möglichkeiten`** (siehe Kasten unten). In der Adresszeile steht für den Nutzer weiterhin „möglichkeiten" |
| _(alles andere)_ | 404 über `src/app/not-found.tsx` – seit der Next-Migration ein **echter HTTP-404** (vorher lieferte Vercel für unbekannte Pfade seine eigene 404-Seite aus; die React-`NotFound`-Route griff nur bei Client-Navigation) |

Dazu zwei generierte Dateien (Next-Dateikonventionen, kein manuelles Pflegen):

| Datei | Quelle | Inhalt |
|-------|--------|--------|
| `/sitemap.xml` | `src/app/sitemap.ts` | die vier Routen oben, Umlaut percent-encodet. Routenliste kommt aus `routes` in `src/data/site.ts` |
| `/robots.txt` | `src/app/robots.ts` | alles erlaubt (`Allow: /`) + Verweis auf die Sitemap |

Beide brauchen eine **absolute** Basis-URL. Die steht bewusst nicht im Code, sondern kommt aus `siteUrl` (`src/data/site.ts`) in dieser Reihenfolge: `NEXT_PUBLIC_SITE_URL` → von Vercel gesetzte `VERCEL_PROJECT_PRODUCTION_URL` → `http://localhost:3000`. **Sobald die eigene Domain steht: `NEXT_PUBLIC_SITE_URL` im Vercel-Dashboard setzen.**

> ### ⚠️ Umlaut-Route: Ordnername MUSS percent-encodet sein
>
> `src/app/m%C3%B6glichkeiten/` ist **Absicht – nicht „aufräumen"**.
>
> Next übernimmt statische Ordnernamen 1:1 in die Route-Regex des Build-Manifests.
> Ein Ordner `möglichkeiten` erzeugt `^/möglichkeiten$` – Browser senden im
> Request-Pathname aber IMMER die encodete Form `/m%C3%B6glichkeiten`. Die beiden
> matchen nicht: die Route lief trotz grünem Build und trotz erzeugtem
> `.next/server/app/möglichkeiten.html` in einen **404** (reproduziert mit
> `next start` UND `next dev`, 24.08.2026). Mit dem encodeten Ordnernamen lautet
> die Regex `^/m%C3%B6glichkeiten$` und trifft den echten Request (verifiziert:
> 200 + korrekter Inhalt). Für den Nutzer ändert sich nichts – der Browser encodet
> nur beim Senden. Die Sitemap gibt die URL ohnehin encodet aus (`encodeURI`).
>
> Gegenprobe bei jeder künftigen Umlaut-/Sonderzeichen-Route: `npm run build && npm run start`,
> dann `curl -o /dev/null -w "%{http_code}" http://localhost:3000/<encodete-url>`.

### Meta/SEO je Route

Der Pro-Route-`<head>` (`<title>`, `<meta name="description">`, `og:title`/`og:description`/`og:type`) läuft über die **Metadata API**. Single Source of Truth ist `src/data/meta.ts` (`routeMeta` + Helper `pageMetadata`) – die direkte Nachfolgerin der `META`-Map aus `scripts/prerender.mjs`, Werte inhaltlich unverändert. Jede `page.tsx` exportiert `export const metadata = pageMetadata(routeMeta.<route>)`. Das Root-Layout hält nur die Defaults (Startseiten-Title/Description), den Favicon-Satz und den `viewport`-Export. `og:image`/`og:url` weiterhin NICHT gesetzt (kein Logo, keine finale Domain).

---

## Aktualisierungs-Anleitung

Nach jeder Änderung an Architektur, externen Diensten oder Datenfluss:
1. Claude Code aktualisiert diese Datei im Repo (`docs/CURRENT-SCHEMA.md`) als Teil des Tasks.
2. Projektdatei im Claude Project manuell austauschen (Copy-Paste aus `docs/`).

> Hinweis: Da kein DB-Schema existiert, entfallen die klassischen Zähler (Tabellen, Enums, RLS, Trigger etc.). Stattdessen werden externe Dienste und Datenfluss gepflegt.
