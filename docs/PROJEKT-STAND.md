# PROJEKT-STAND.md – Leons Webseite

> Dieses Dokument ist die zentrale Wissensdatei des Projekts.
> 🔒 = Feststehend | 🔄 = Kann sich ändern
> Letzte Aktualisierung: 08.06.2026

---

## 🔒 Branding

Markenname: Leon Lang
Tagline: „Veränderungen, die spürbar werden."
Logo: „LL"-Monogramm – noch zu erstellen (via ChatGPT-Bildgenerator), inkl. Favicon, in heller + dunkler Variante
Design-System: edel-zurückhaltend (Near-Black/Weiß/Grau), **Dark-only** (kein Light/Toggle), Akzent **Violett** – flach via `--accent`/`--accent-solid` + **Violett-Gradient** (`--accent-gradient`/`--accent-gradient-strong`) auf Showcase-Flächen; zentral als CSS-Variablen, siehe Design-Regeln

---

## 🔒 Projektbeschreibung

Premium Personal-Brand-Website für Leon Lang. Sie stellt Leon als Person im Netz dar UND dient als Schaufenster für seine Dienstleistungen. Kein Shop, kein Login, kein Checkout – reines Frontend. Die Seite selbst ist der Beweis des Könnens: Mundpropaganda (Freunde, Familie, kleine Unternehmen) führt Interessenten her, die durch die Qualität der Seite überzeugt werden und Kontakt aufnehmen.

- **Zielgruppe:** Privatpersonen, Selbstständige und kleine Unternehmen (zunächst Freundes-/Familienkreis und deren Empfehlungen). Positionierung nach oben offen (Firmen, Startups später möglich).
- **Markt:** Deutschland, deutschsprachig
- **Währung:** – (keine Preise auf der Seite)
- **Sprachen:** Deutsch, durchgängig „Du"-Ansprache
- **Geschäftsmodell:** Dienstleistungen (Webseiten, Web-Apps/Tools, Redesign, KI-Integration). Schaufenster → Kontaktanfrage → Abschluss persönlich/per individuellem Angebot. KEIN Online-Verkauf, KEINE Bezahlung auf der Seite.
- **Architektur:** Single-Page-Website (reines Frontend) + 2 rechtliche Unterseiten
- **Regulatorik:** Impressum (Pflicht bei geschäftlicher Nutzung) + Datenschutzerklärung (DSGVO, wegen Kontaktformular). Platzhalter-Seiten eingeplant, Inhalte fügt User später aus Generator ein.

---

## 🔒 Benutzerrollen

Reine öffentliche Website – keine Benutzerkonten, keine Logins, keine Rollen, keine geschützten Bereiche.

- **Besucher (öffentlich):** sieht die komplette Single-Page, kann durch Projekte klicken, das Kontaktformular nutzen und über direkte Buttons (E-Mail, WhatsApp, Instagram) Kontakt aufnehmen.

---

## 🔒 Tech Stack

- **Frontend:** React + TypeScript + Tailwind + Vite + Framer Motion
- **Rendering:** SSG/Prerendering beim Build (`renderToString` + `StaticRouter` + `scripts/prerender.mjs`) → statisches HTML je Route (`/`, `/impressum`, `/datenschutz`), im Browser Hydration (`hydrateRoot`). KEIN SSR-Server zur Laufzeit – Vercel liefert nur statische Dateien. react-router-dom bleibt im **Library**-Mode (kein Framework-Mode).
- **Meta/SEO (Head):** Pro-Route-`<head>` (`<title>` + `<meta name="description">` + Basis-OpenGraph `og:title`/`og:description`/`og:type`) wird beim Build aus der **`META`-Map in `scripts/prerender.mjs`** in den statischen `<head>` jeder Datei injiziert (Single Source of Truth, dependency-frei, jeder Wert genau einmal). Neue Route/Texte ändern → in der `META`-Map (Default-Head für Dev/Fallback in `index.html`). `og:image`/`og:url` noch nicht gesetzt (kein Logo, keine finale Domain).
- **Backend/DB:** keins – reines Frontend, KEIN Supabase, KEINE Datenbank, KEINE SQL/RLS/Migrations/Edge Functions
- **Auth:** keins
- **Hosting:** Vercel (Auto-Deploy bei Push)
- **AI-Provider:** keiner zur Laufzeit der Seite (KI ist eine angebotene Leistung, kein Feature der Website)
- **Zahlungen:** keine
- **E-Mail/Formular:** Formspree (extern, nimmt Kontaktformular entgegen und leitet als E-Mail weiter)
- **Weitere:** –
- **Repo:** `lngleon/leons-webseite` (GitHub, Branch `main`) – gebunden an SSH-Alias `github-lngleon`
- **Design-System:** Regeln in dieser Datei (Abschnitt Design-Regeln); separate DESIGN-SYSTEM.md vorerst nicht nötig
- **Claude Code Config:** CLAUDE.md im Repo-Root

---

## Phasen-Status

| Phase | Beschreibung | Status |
|-------|-------------|--------|
| 0 | Discovery (Interview) | ✅ Abgeschlossen |
| 1 | Infrastruktur-Setup (GitHub, Vercel, Formspree, lokale Umgebung) | ✅ Abgeschlossen |
| 2 | Aufbau & Sektionen via Claude Code | 🔄 Aktiv (alle Sektionen stehen außer Projekte) |
| 3 | Content & Feinschliff (Logo, Texte, Recht, Akzentfarbe) | 🔄 Akzentfarbe ✅ (Violett); Logo/Favicon, Impressum/Datenschutz-Texte offen |
| 4 | Testing | ⬜ Offen |
| 5 | Launch / Domain | ⬜ Offen |

---

## Infrastruktur-Status

| Komponente | Status | Details |
|------------|--------|---------|
| GitHub | ✅ | Repo `lngleon/leons-webseite`, Branch `main` (SSH-Alias `github-lngleon`) |
| Vercel | ✅ | Mit Repo verbunden, Auto-Deploy bei Push auf `main`. Projekt `leons-webseite` im Vercel-Account „leon's projects" (Dashboard maßgeblich; CLI kann im falschen Account-Kontext stehen). Verifiziert 07.06.2026: Deployment 19c48be („Kontakt") = Ready/Production. |
| Formspree | ✅ | Endpoint `VITE_FORMSPREE_ENDPOINT` muss an ZWEI Stellen gesetzt sein: lokal in `.env.local` UND als Vercel-Env-Variable (alle Environments). `.env.local` ist gitignored → gelangt NICHT automatisch zu Vercel; fehlt die Vercel-Variable, funktioniert das Formular live nicht. End-to-end bestätigt (lokal + live, Mail kommt an). |
| Lokale Umgebung | ✅ | VS Code + Claude Code Extension, Repo geklont |
| .env (Formspree-Endpoint) | ✅ | `.env.local` mit `VITE_FORMSPREE_ENDPOINT` hinterlegt |

---

## Phasen-Details

### Phase 1: Infrastruktur-Setup
- GitHub Private Repo anlegen, Repo-Name eintragen, lokal clonen
- Vercel mit Repo verbinden (Auto-Deploy)
- Formspree-Account anlegen, Formular erstellen, Endpoint kopieren
- Lokale Umgebung: VS Code, Claude Code Extension, ggf. `.env`
- CLAUDE.md + docs/ im Repo anlegen
- Erster Claude-Code-Prompt: Projekt-Grundgerüst (Vite, Tailwind, Framer Motion, Ordnerstruktur, Dark-Basis)
- Ablauf folgt INFRASTRUKTUR-SETUP.md, ein Schritt pro Nachricht

### Phase 2: Aufbau & Sektionen via Claude Code
- Reihenfolge: Grundgerüst (Layout, Navigation, Footer) → Hero → restliche Sektionen
- Sektionen: Hero · Problem · Leistungen · Über mich · Prozess · Projekte · Kontakt
- Dark-only; Responsive bei jeder Sektion prüfen
- Impressum- + Datenschutz-Seiten als Platzhalter anlegen, im Footer verlinken

### Phase 3: Content & Feinschliff
- Logo „LL" + Favicon einbinden (für dunklen Hintergrund – Dark-only)
- Akzentfarbe festlegen und zentrale CSS-Variable füllen ✅ (08.06.2026: Violett, per-Mode-Tokens)
- Impressum- + Datenschutz-Texte einfügen (vom User generiert)
- Projekt-Links auf finale Domains umstellen, sobald verfügbar
- Optional: stimmungsvolle Bewegtbild-/Glow-Elemente

### Phase 4: Testing
- TESTCHECKLISTE.md anlegen (erst jetzt)
- Pro Sektion: Desktop + Mobil, Animationen (inkl. reduced-motion), Formular-Versand
- Bug-Tabelle mit Status

### Phase 5: Launch / Domain
- Eigene Domain registrieren/verbinden (Start vorerst auf Vercel-Adresse)
- Finaler Check: Formular kommt an, alle Links korrekt, Recht vollständig

---

## Datenmodell-Übersicht

Kein Datenmodell – reines Frontend ohne Datenbank.

- Inhalte (Leistungen, Projekte, Texte, Links, Kontaktdaten) liegen als statische Daten/Konstanten im Code.
- Kontaktformular-Daten gehen direkt an Formspree und werden NICHT in einer eigenen Datenbank gespeichert.
- Bilder/Videos liegen als statische Assets im Repo (z.B. `public/`).

---

## Workflows

### Besucher-Flow (Scroll durch die Single-Page)
Hero → Problem-Sektion → Leistungen → Über mich → Prozess → Projekte → Kontakt → Footer (Impressum/Datenschutz)

### Kontakt-Flow
- **Variante A (Formular):** Besucher füllt Name, E-Mail, Nachricht aus → Klick „Senden" → Daten gehen still an Formspree → Formspree leitet als E-Mail an Leon (`leonlang95@gmail.com`) → Besucher sieht Erfolgsmeldung („Danke, ich melde mich!").
- **Variante B (direkte Buttons):** Klick auf E-Mail / WhatsApp / Instagram öffnet das jeweilige Programm direkt.

### Projekt-Detail-Flow
Klick auf einen der zwei Showcase-Projekte → interaktive Detail-Ansicht öffnet sich (mehr Infos, was gemacht wurde, ggf. weitere Bilder, „Live ansehen"-Button).

---

## Navigation

Single-Page mit Anker-Navigation + Smooth Scroll.

- **Header/Navbar:** Logo „LL" (links) · Nav-Punkte: Leistungen · Über mich · Prozess · Projekte · Kontakt · CTA-Button „Projekt anfragen" (Gradient-Füllung, scrollt zu Kontakt). Kein Theme-Toggle (Dark-only).
- **Footer:** Name/Kurzinfo · Links zu Impressum + Datenschutz · ggf. Social (Instagram)
- **Unterseiten:** Impressum, Datenschutz (eigene Routen)

---

## Design-Regeln

- **Stil:** futuristisch, clean, edel, premium. Referenzen: adrianziegler.de (Dark) + farisschmidt.de (Light)
- **Dark-only:** kein Light Mode, kein Theme-Toggle (08.06.2026 umgestellt). EIN Token-Satz in `:root` (Near-Black/Weiß/Grau), `color-scheme: dark`, `html` ohne Klasse.
- **Farbschema:** edel-zurückhaltend (Near-Black/Weiß/Grau) + EIN Violett-Akzent, zentral über CSS-Variablen, NIEMALS Farbwerte hardcoden:
  - `--accent` #a78bfa / `--accent-solid` #6d4dff – FLACH, für Ränder, Icons, kleine UI und den **Fokusring** (Ring nie Gradient).
  - `--accent-gradient` `linear-gradient(135deg,#c4b5fd,#a78bfa,#7c5cff)` (Source-of-Truth) – NUR Text-Clip auf Near-Black: Headline-Akzentwörter (nicht ganze Headlines), die 4 Hero-Zahlen, Sektions-Eyebrow. Mittelstop darf leicht ins Pink-Violett; frei innerhalb Violett nachjustierbar.
  - `--accent-gradient-strong` `linear-gradient(135deg,#6d4dff,#6d28d9)` – Füllung **primärer CTAs**; trägt weiße Schrift ≥4.5:1 über den GANZEN Verlauf (verifiziert min. 5.05:1). Die hellen Stops NICHT für CTAs.
  - Text-Gradient via `background-clip:text` MIT solidem Fallback (`var(--accent)`, nie unsichtbar). Gradient nur auf Showcase-Flächen, Body-Text bleibt flach.
- **Code-Tags (Fließtext):** wiederverwendbare Inline-Komponente `CodeTag` (`src/components/CodeTag.tsx`) für echte Tech-/Fach-Begriffe im Fließtext – Mono, dezenter FLACHER Akzent-Hintergrund/-Rahmen (`bg-accent/10` + `border-accent/25`, KEIN Gradient), klein, vertikal mittig, kein Zeilenumbruch. Rein dekorativ (kein Button, keine Semantik/aria). Sparsam (≤1–2 pro Absatz), NUR Begriffe die ohnehin im Text stehen und zu Leon passen – keine erfundenen Claims/Zahlen, kein Marketing; ohne passenden Begriff: nichts erzwingen. Helper `withCodeTags(text, terms)` markiert im Render, ohne die Datenquelle zu ändern. NICHT in Headlines/Eyebrows/CTAs/Schaubildern/Terminal.
- **UI-Sprache:** Deutsch, „Du"-Ansprache
- **Ton:** premium, aber nahbar – nie abgehoben, nie billig
- **Responsive:** Desktop-first, Mobil voll funktionsfähig
- **Animationen (Framer Motion):** Scroll-Effekte, hochzählende Zähler, smoothe Übergänge bei Hover/Klick. Subtil und edel, nie verspielt oder kitschig
- **Optional:** stimmungsvolle Bewegtbild-/Glow-Elemente (kein Muss; code-basierte Effekte bevorzugen vor eingebettetem Video wegen Ladezeit). Keine Screen-Recordings.
- **Keine Preise** auf der Seite (Positionierung: Ziel ist das Gespräch)
- Die Seite selbst ist das beste Portfolio-Stück – Qualität des Handwerks ist sichtbares Verkaufsargument

---

## Prompt-Architektur

Entfällt – keine KI-Features auf der Seite selbst. KI ist eine angebotene Dienstleistung, kein Bestandteil der Website-Funktion.

---

## Export

Entfällt.

---

## Benachrichtigungen

Formspree leitet eingehende Kontaktanfragen per E-Mail an Leon weiter (`leonlang95@gmail.com`, später änderbar). Keine weiteren Benachrichtigungen.

---

## Storage Buckets

Entfällt (kein Backend). Bilder, Logo, Favicon und optionale Videos liegen als statische Assets im Repo (`public/`).

---

## Feature-Roadmap

### MVP-Features (Phase 2)

| Feature | UI | Status |
|---------|----|--------|
| Grundgerüst (Layout, Navigation, Footer) | ✅ | Fertig |
| Hero (Claim + Unterzeile + 4 animierte Zähler) | ✅ | Fertig – 2-spaltig mit animiertem Hintergrund + Terminal (tippt Build-Output) + fließendes Akzentwort „spürbar" (`AuroraText`) |
| Problem-Sektion (4 Schmerzpunkte) | ✅ | Fertig |
| Leistungen (4 Karten) | ✅ | Fertig – je Karte ein lebendes Schaubild (Browser/App/Redesign/KI-Chat), Karte 4 Highlight |
| Über mich | ✅ | Fertig (2-spaltig, Porträt-Platzhalter) |
| Prozess (4 Schritte) | ✅ | Fertig (nummerierte Abfolge mit Verbindungslinie) |
| Projekte (2 Showcases + Detail-Ansicht) | ⬜ | Offen |
| Kontakt (Formspree-Formular + direkte Buttons) | ✅ | Fertig (Formular + 3 Direkt-Buttons, a11y-geprüft) |
| Responsive Layout | 🔄 | Grundgerüst responsive; pro Sektion mitprüfen |
| Impressum + Datenschutz (Platzhalter-Seiten) | ✅ | Platzhalter-Seiten + Footer-Links stehen (Inhalt offen) |

### Phase-2-Features (nach Launch)

| Feature | Beschreibung | Priorität |
|---------|-------------|-----------|
| Akzentfarbe setzen | ✅ Violett (08.06.2026): flach `--accent`/`--accent-solid` + `--accent-gradient(-strong)` (Dark-only) | erledigt |
| Logo + Favicon einbinden | „LL"-Monogramm (für dunklen Hintergrund, Dark-only) | Hoch |
| Eigene Domain | statt Vercel-Adresse | Mittel |
| Professionelle E-Mail | ersetzt Gmail im Formular + Button | Mittel |
| Resend statt Formspree | optionaler Umstieg, sobald eigene Domain steht | Niedrig |
| Stimmungsvolle Bewegtbild-/Glow-Elemente | optionaler visueller Feinschliff | Niedrig |
| Weitere Projekte / Kategorie-Tabs | wenn mehr als 2 Projekte vorhanden | Niedrig |
| Personen-Video / Hero-Hintergrund-Video | optional, Vertrauen/Atmosphäre | Niedrig |

---

## Erkenntnisse & Regeln

- Die Seite selbst ist der wichtigste Verkaufsbeweis – die Qualität des Handwerks IST das Verkaufsargument.
- Positionierung „premium, aber nahbar": Premium-Optik + „Du"-Ansprache + keine Preise. Weder Enterprise-abgehoben noch billig.
- Struktur folgt dem verkaufspsychologischen Aufbau der Vorbilder (Hero → Problem → Lösung/Leistungen → Vertrauen → Prozess → Beweise → CTA).
- Social Proof (viele Kunden/Logos/Testimonials) fehlt noch → bewusst durch persönliche Geschichte + 2 starke Showcases ersetzt. Keine hohlen Versprechen oder erfundenen Zahlen.
- Akzent final: **Violett**, seit 08.06.2026 **Dark-only** (ein Token-Satz, kein Toggle). Flach `--accent` #a78bfa / `--accent-solid` #6d4dff (Ränder, Icons, kleine UI, Fokusring – nie Gradient) + Violett-Gradient `--accent-gradient` (Text-Clip auf Near-Black, mit solidem Fallback) und `--accent-gradient-strong` (CTA-Füllung, weiße Schrift ≥4.5:1 = min. 5.05:1) nur auf Showcase-Flächen. Das frühere Light-Mode-Kontrast-Thema ist damit gegenstandslos.
- Bei nur 2 Projekten keine Kategorie-Tabs (würden leer wirken) → zwei große Showcases mit Detail-Ansicht. Tabs nachrüstbar, wenn mehr Projekte da sind.
- Reines Frontend, kein Backend/DB – Formular läuft über Formspree.
- Karten nutzen das zentrale `Card`-Muster (`src/components/Card.tsx`): einheitlicher, dezenter Hover (Anheben + Akzent-Rand + weicher Glow), touch-sicher und reduced-motion-freundlich. Neue Karten-Sektionen (z.B. Leistungen) dieses Muster wiederverwenden, statt den Hover neu zu bauen. Entrance-Animation gehört auf ein umschließendes motion-Element, nicht in die Card.
- Animationen mit `staggerChildren` über MEHRERE Verschachtelungsebenen (z.B. der Prozess-Stepper: `ol → li → Linien`) NICHT über die `whileInView`-Geste auslösen – sie propagiert den tiefen Variant-Baum unzuverlässig, wenn das Element beim Laden bereits im Viewport liegt (Reload). Stattdessen `useInView` + `animate={inView ? 'show' : 'hidden'}` verwenden; das propagiert die Varianten verlässlich. Einfache, einstufige Sektionen (eine Ebene Kinder) können `whileInView` weiter nutzen.
- **`VITE_`-Variablen aus `.env.local` gelangen NICHT automatisch zu Vercel** (`.env.local` ist gitignored). Bei JEDEM env-abhängigen Feature die Variable ZUSÄTZLICH im Vercel-Dashboard hinterlegen (alle Environments: Production/Preview/Development) und neu deployen. **Symptom, wenn vergessen:** Das Feature schlägt fehl OHNE Network-Request (z.B. `fetch` gegen eine `undefined`-URL → sofortiger Fehler, kein HTTP-Status), nicht als 4xx/5xx. Aufgedeckt beim Live-Schalten des Kontaktformulars (Formspree): lokal lief alles, live nichts.
- **Animierter Gradient-Text: `background-position` NICHT direkt animieren (08.06.2026):** Auf einem `background-clip:text`-Element mit transparentem Text-Fill lässt Chromium bei DIREKT animierter `background-position` die geclippte Glyphen-Maske fallen → das Wort wird unsichtbar (rein statische Clips wie `.accent-gradient-text` sind nicht betroffen, nur der animierte Fall). Den „Fließ"-Effekt deshalb über eine **registrierte `@property`** (z.B. `--aurora-pos`, `syntax:"<percentage>"`, interpolierbar) animieren, die `background-position` speist (erzwingt sauberen Repaint pro Frame), zusätzlich `display:inline-block` für eine stabile Paint-Box. Das durchgestrichene `-webkit-background-clip:text` in DevTools ist ein harmloses Chromium-Alias-Artefakt (erscheint auch im funktionierenden Fall) und KEIN Hinweis auf die Ursache. Diagnostik-Lehre: erst Ground-Truth (gebautes CSS gegen `origin/main`, Lockfile, Lightning-CSS-Output empirisch) prüfen, bevor man eine Vermutung umsetzt – hier waren die naheliegenden Verdächtigen (Minifier/Prefix/Deploy) allesamt falsch.
- **SSG/Prerendering statt reinem CSR (08.06.2026):** Die Seite wird beim Build prerendert (statisches HTML je Route), nicht mehr rein client-seitig gerendert. **Werkzeugwahl bewusst:** eigenes `renderToString` + `StaticRouter` + `scripts/prerender.mjs` – NICHT `vite-react-ssg` (peert auf react-router-dom ^6, wir sind auf v7), NICHT Framework-Mode (wäre eine Migration) und NICHT Puppeteer (ein Snapshot würde die Reveal-Animationen einfrieren/killen). **Goldene Hydration-Regel: Server-Frame muss = erstes Client-Frame sein.** Werkzeug dafür ist der Hook `useReducedMotionSafe` – er liefert im ERSTEN Render immer `false` (= wie der Server, der kein `matchMedia` hat) und übernimmt den echten Wert erst nach dem Mount. `useReducedMotion` aus framer-motion deshalb NIE direkt im Render benutzen (liefert client-seitig sofort den echten Wert → Mismatch bei reduce-Usern). Reduced-User erreichen den Endzustand instant nach dem Mount (per State-Set bzw. reduced-Varianten mit `transition:{duration:0}`, ServiceDiagram via `key`-mit-reduced-Remount). **Weitere Regeln:** nichts Zufälliges/Generatives im Render (`window`/`document`/`Math.random`/`Date` verboten – Hero-BG ist deterministisch: CSS-Blobs + statisches SVG-`feTurbulence` seed 0, fixe `noiseId`); das LCP-Element (Hero-H1) darf KEINE Entrance-Opacity haben (steht als sichtbares `<h1>` im HTML); below-the-fold-Reveals dürfen `opacity:0` starten – der Text steht trotzdem im Quelltext (SEO ok). Build-Pipeline: `tsc -b && vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && node scripts/prerender.mjs` (`dist-ssr/` gitignored).
- **Stille (unverlinkte) Routen (08.06.2026):** Eine Seite kann existieren, prerendert und per direkter URL erreichbar sein, OHNE in der Navigation aufzutauchen – Route in `App.tsx` (innerhalb Layout) + Eintrag in `ROUTES`/`META` von `scripts/prerender.mjs`, aber NICHT in `navItems`/Footer. Beispiel: `/möglichkeiten`. **Umlaut-Routen sind ok:** react-router v7 dekodiert den Pathname, daher trifft auch der percent-encodete Aufruf (`/m%C3%B6glichkeiten`) dieselbe Route – sowohl beim Prerender (StaticRouter) als auch bei der Client-Hydration. Eine einzige Raw-Route (`path: '/möglichkeiten'`) genügt.
- **Marquee/Animations-Utilities (Tailwind v4) + CoolMode-Cleanup (08.06.2026):** Die Magic-UI-Marquee braucht die Keyframes `marquee`/`marquee-vertical` + die Utilities `animate-marquee(-vertical)`; beides ist in der Komponenten-Vorlage NICHT enthalten und muss in `index.css` über den `--animate-*`-Theme-Namespace ergänzt werden, das reduced-motion-Gate (`animation:none`) als unlayered Regel (sticht die layered Utility). Bei **CoolMode** (Klick-Partikel, bunte hsl-Zufallsfarben als einzige gekapselte Ausnahme vom Violett-System) MUSS der Cleanup den globalen `#_coolMode_effect`-Layer + die rAF-Schleife restlos abbauen: im Cleanup zuerst `autoAddParticle=false` (sonst laufen bei „Unmount-während-Klick" neue Partikel nach → Leak), dann auslaufen lassen und bei leerem Feld rAF canceln + Layer entfernen (Instanz-Zähler → 0).

---

## Session-Protokoll

| Datum | Zusammenfassung |
|-------|----------------|
| 08.06.2026 | **Session 13: Stille Showcase-Route `/möglichkeiten` + 4 neue UI-Komponenten.** Neue, BEWUSST nicht in der Navbar verlinkte Seite „Was möglich ist" (existiert + prerendert, nur per direkter URL erreichbar). In die SSG-Pipeline eingehängt: Route in `App.tsx` (innerhalb Layout, vor dem `*`-Catch-all) + eigener `<title>`/`<meta description>` über die `META`-Map in `scripts/prerender.mjs` (Title „Möglichkeiten – Leon Lang"). react-router v7 dekodiert den Pathname → die Umlaut-Route matcht auch percent-encoded. **Seitenaufbau:** (1) `SectionHeading`-Kopf + 1 Satz Intro, (2) **Bento-Grid** (Herz) mit ECHTEN bestehenden Schaubildern – große Zelle „Diese Seite selbst" = handgebaute STATISCHE Mono-Grafik (Dark-System), Performance-Zahl bewusst als sichtbarer Platzhalter („—" / „Messwerte folgen"); die drei anderen Zellen über `ServiceDiagram` wiederverwendet (KI-Chat, Redesign-Wisch, Browser-Aufbau), (3) „verspielt vs. seriös" mit zwei Buttons, (4) subtile 3D-Tilt-Karte (Platzhalter-Leistung + Mono-Grafik, kein Fake-Foto), (5) `Marquee` mit echtem Tech-Stack (React, TypeScript, Tailwind, Framer Motion, Vercel – keine Logos/Zahlen/Testimonials). **4 neue Komponenten in `src/components/ui/`:** `Marquee` (CSS-Animation; Keyframes/Utilities in `index.css` ergänzt), `InteractiveHoverButton` (Fremd-Tokens gemappt: `bg-primary`→`accent-solid`, `text-primary-foreground`→`accent-foreground`), `CoolMode` (Klick-Partikel; bunte hsl-Zufallsfarben als EINZIGE gekapselte Ausnahme vom Violett-System; SSR-safe; reduced-motion = aus; globaler `#_coolMode_effect`-Layer + rAF beim Route-Verlassen restlos abgebaut – kein Leak), `Tilt` (Aceternity-Mechanik on-brand neu gebaut, max. ~6° → subtil, `translateZ`-Kinder). **Sicherheit:** alles SSR-/prerender-safe (window/document nur in Effects/Handlern – Prerender lief sauber); reduced-motion: Tilt aus, Partikel aus, Marquee statisch; Hover nur `@media (hover: hover)`. Keine Navbar-Verlinkung, keine Startseiten-Änderung, keine echten Projekte, keine erfundenen Daten; AuroraText/SSG/Meta-Map unangetastet. `npm run build` grün; `/möglichkeiten` prerendert mit eigenem Title/Meta im `<head>` + vollem Inhalt im statischen HTML verifiziert. |
| 08.06.2026 | **Session 12: Per-Route-Head (Title/Description/OpenGraph).** Schluss mit dem geteilten `<head>` über `/`, `/impressum`, `/datenschutz`: jede prerenderte Route bekommt eigenen `<title>` + `<meta name="description">` + Basis-OpenGraph (`og:title`/`og:description`/`og:type`), die im **statischen** `<head>` der jeweiligen Datei landen (SEO/Sharing ohne JS). **Ansatz:** Route→Meta-Map (`META`) in `scripts/prerender.mjs` (dependency-frei) – NICHT React-19-In-Component-Metadata, weil `renderToString(<App/>)` nur den `#root`-**Body** liefert und `<title>`/`<meta>` damit im Body statt im `<head>` landen würden; kein react-helmet, kein Framework-Mode. Der Prerender entfernt den geteilten Default-Title/-Description aus dem Template (multiline-feste Regex) und injiziert pro Route den eigenen Block vor `</head>` (jeder Title/Desc genau einmal, `&` escaped). Werte: `/` → „Leon Lang – Webseiten, Web-Apps & KI-Integration"; `/impressum` → „Impressum – Leon Lang"; `/datenschutz` → „Datenschutz – Leon Lang" (Descriptions analog in der Map). `og:image`/`og:url` bewusst NICHT gesetzt (kein Logo, keine finale Domain – nichts erfunden). Source-`index.html` auf die Home-Werte als Dev-/Fallback-Default angeglichen. Kein Inhalts-/Layout-Change, SSG/AuroraText unangetastet. `npm run build` grün; in `dist/index.html`, `dist/impressum/index.html`, `dist/datenschutz/index.html` je genau EIN (unterschiedlicher) Title + Description im `<head>` verifiziert. |
| 08.06.2026 | **Session 11: AuroraText-Clip-Bugfix (Hero-Wort live unsichtbar).** Das Akzentwort „spürbar" rendete live transparent/unsichtbar – der Violett-Gradient wurde NICHT auf die Glyphen geclippt, obwohl `color:transparent` + `-webkit-text-fill-color:transparent` griffen. **Root-Cause (mehrstufig diagnostiziert: Multi-Agent-Workflow + empirischer Lightning-CSS-Test + Lockfile-Check):** ausgeschlossen wurden Lightning-CSS-Shorthand-Merge (kein `background`-Shorthand emittiert, Clip-Paar bleibt erhalten), Prefix-/Reihenfolge-Problem (das funktionierende `.accent-gradient-text` nutzt dasselbe Clip-Paar) und Versions-Differenz (`package-lock.json` committet → live == lokal). Der EINZIGE Unterschied zum funktionierenden statischen `.accent-gradient-text` war die **direkt animierte `background-position`** – genau das lässt Chromium auf einem `background-clip:text`-Element die geclippte Glyphen-Maske fallen → Wort unsichtbar. Das durchgestrichene `-webkit-background-clip:text` in DevTools ist nur ein harmloses Chromium-Alias-Artefakt (auch im funktionierenden Fall vorhanden), nicht die Ursache. **Fix:** Clip-Technik 1:1 wie `.accent-gradient-text` gespiegelt; den Flow NICHT mehr über `background-position` direkt, sondern über eine **registrierte `@property --aurora-pos`** (typisiert `<percentage>`, interpolierbar) animieren, die `background-position` speist (erzwingt pro Frame sauberen Repaint der Clip-Maske) + `display:inline-block` (stabile Paint-Box der Inline-Span). Constraints unverändert: nur `--accent-gradient`/`--accent`, reine CSS-@keyframes (SSR-safe), reduced-motion = statischer sichtbarer Verlauf, Fallback `var(--accent)` nie unsichtbar; graceful degradation ohne `@property`-/Clip-Support. `npm run build` grün; `@property` + Clip-Paar (`-webkit-background-clip:text;background-clip:text`) + custom-property-Keyframes im gebauten CSS verifiziert. Live-Verifikation (Browser) steht noch aus. |
| 08.06.2026 | **Session 10: SSG/Prerendering (CSR → statisches HTML).** Alle 3 Routen (`/`, `/impressum`, `/datenschutz`) fallen beim Build als statisches HTML mit echtem Inhalt raus – H1 + Sektions-Text stehen ohne JS im Quelltext (LCP/SEO). **Gewähltes Verfahren:** eigenes `renderToString` + `StaticRouter` (react-router v7 *Library*-Mode), KEIN Framework-Mode-Umbau, KEIN Puppeteer-Snapshot. Begründung: `vite-react-ssg` peert auf react-router-dom ^6 (wir haben v7), Framework-Mode wäre eine Migration (ausgeschlossen), Puppeteer würde die Reveal-Animationen einfrieren. **Pipeline:** `build` = `tsc -b && vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && node scripts/prerender.mjs`. Neu: `src/entry-server.tsx` (rendert die App pro Route deterministisch zu HTML) und `scripts/prerender.mjs` (injiziert das HTML in das von Vite gebaute `index.html` am Marker `<div id="root"></div>` und schreibt `dist/index.html`, `dist/impressum/index.html`, `dist/datenschutz/index.html`). `src/main.tsx`: `hydrateRoot`, wenn `#root` Inhalt hat (Prod/prerendert), sonst `createRoot` (Dev). `dist-ssr/` gitignored. **Hydration-Sicherheit (Server-Frame = erstes Client-Frame):** neuer Hook `src/hooks/useReducedMotionSafe.ts` (erstes Render immer `false` = wie Server, echter `matchMedia`-Wert erst nach Mount) – eingesetzt in Hero/Terminal/ServiceDiagram/Prozess; reduced-User erreichen den Endzustand instant nach Mount (Counter/Terminal per State-Set, ServiceDiagram via `key`-mit-reduced-Remount, Hero/Prozess via reduced-Varianten `transition:{duration:0}`). Hero-H1 ohne Entrance-Opacity (LCP sofort sichtbar); generativer Hero-BG deterministisch (CSS-Blobs + statisches SVG-`feTurbulence` seed 0, fixe `noiseId`); kein `window`/`document`/Zufall im Render. **Verifiziert:** `npm run build` grün; im gebauten `dist/index.html` steht die H1 „Veränderungen, die `<span class="aurora-text">`spürbar`</span>` werden.", dazu Impressum-/Datenschutz-H1 + 5 Sektions-H2 statisch im Quelltext, Asset-`<script type="module">` + CSS verlinkt, `#root` nicht leer. Reveal-Animationen + reduced-motion bleiben erhalten. |
| 08.06.2026 | **Session 9: AuroraText (fließendes Hero-Akzentwort).** Das Hero-Akzentwort „spürbar" bekommt statt des statischen Violett-Gradients einen langsam fließenden „Aurora-Text"-Effekt (Magic-UI-Stil, API `<AuroraText>Wort</AuroraText>`). Neue wiederverwendbare Inline-Komponente `src/components/AuroraText.tsx` (Konvention wie `CodeTag`/`SectionHeading`). Effekt als **reine CSS-@keyframes** (`aurora-flow`: `background-position` über einen verbreiterten Gradient `background-size:200%`, sanftes `alternate`/ease-in-out, 8 s – langsam/edel, kein Flackern, kein Seam), **nicht** Framer-Motion-getrieben → SSR-/hydration-sicher (kein JS-State, kein Hydration-Mismatch; das Wort steckt im prerenderten HTML, durchgehend sichtbar = LCP, im Build verifiziert). **Ausschließlich Violett:** nutzt `--accent-gradient` (Source-of-Truth) verbatim – kein Blau/Cyan/Pink von Magic UI, nichts hardcoden. Soliden Fallback (`var(--accent)` via `@supports`) behalten; `prefers-reduced-motion` → der jetzige statische Gradient. Bewusst NUR am Hero-Wort – Eyebrows, Hero-Zähler und andere Gradient-Stellen bleiben statisch via `.accent-gradient-text`. `npm run build` grün. |
| 08.06.2026 | **Session 8: Look & Foundation (Violett · Dark-only · Schaubilder · Terminal · Code-Tags).** Mehrere Schritte dieser Session, zu einem kohärenten Eintrag zusammengeführt: **(1) Finale Akzentfarbe Violett** – Platzhalter #c8a96a ersetzt, ausschließlich über zentrale CSS-Variablen. **(2) Hero-Umbau** – 2-spaltig (Text/Zähler links, Terminal rechts; mobil gestapelt), code-basierter generativer Violett-Hintergrund (`color-mix`-Blobs + statisches SVG-`feTurbulence`-Korn, CSS-Keyframe-Drift, kein Neon/keine Bilder) + „Terminal", das echten Build-Output tippt (4 Tabs install/**build**/deploy/whoami, blinkender Cursor, Pfeiltasten-Tabs, keine Refresh-/Download-Buttons); bestehender Inhalt erhalten (Claim, Unterzeile, 4 hochzählende Zähler, CTA → `#kontakt`), Counter-Logik unverändert. **(3) Leistungen → lebende Schaubilder** – je Karte ein ehrliches Mini-Schaubild (Browser-Build-up · App-Reaktion · **Redesign Vorher/Nachher-Wisch** · KI-Chat-Stream), ein gemeinsamer ruhiger Rahmen (`ServiceDiagram.tsx`), einmal beim Reinscrollen + Hover-Replay, keine Dauerloops; Card/SectionHeading/2×2 + Titel/Texte unverändert. **(4) Dark-only + Violett-Gradient** – Light Mode + Theme-Toggle + dead Light-Code entfernt (ein `:root`-Token-Satz, `color-scheme: dark`, `html` ohne Klasse; ThemeProvider/useTheme/ThemeToggle/Theme-Typ + Terminal-`.dark`-Scope raus); Gradient-Tokens `--accent-gradient` (Showcase-Text-Clip mit solidem Fallback) + `--accent-gradient-strong` (CTA-Füllung, weiße Schrift ≥4.5:1 = min. 5.05:1, objektiv verifiziert); flaches `--accent`/`--accent-solid` + Fokusring bleiben flach (Ring nie Gradient); Gradient nur auf Showcase (Hero-Akzentwort „spürbar", 4 Hero-Zahlen, primäre CTAs, Eyebrow). **(5) Code-Tag-Politur** – dekorative Inline-`CodeTag` (Mono, flacher Akzent, kein Gradient) sparsam auf vorhandene Begriffe (`Web-Apps`, `Buchungssystem`/`Dashboards`, `Code`), keine erfundenen Claims/Zahlen. Durchweg reduced-motion-sicher, a11y/Fokusringe intakt; Terminal/4 Schaubilder/Hero-Hintergrund/Counter nicht kaputtgemacht. Adversariell reviewt (mehrere Workflows → keine offenen Findings). `npm run build` durchweg grün. **Offen/Follow-up:** echter LCP-Gewinn bräuchte Prerender/SSG (Seite ist reines CSR). |
| 07.06.2026 | **Sektionen-Sprint – Zusammenfassung dieser Session.** Gebaut: **Leistungen**, **„Über mich"**, **Prozess** (inkl. **Reload-Bugfix** der Prozess-Animation) und **Kontakt** (Formspree-Formular + Direkt-Buttons, adversariell a11y-geprüft). Details je Schritt in den Einträgen unten + im Prompt-Protokoll. **Größter Stolperstein – Formspree live:** Das Formular lief lokal sauber (Endpoint in `.env.local`), live auf Vercel aber NICHT – `.env.local` ist per `.gitignore` ausgeschlossen und gelangt daher nie zu Vercel. Symptom: Fehler OHNE Network-Request (`fetch` gegen eine `undefined`-URL). **Fix:** `VITE_FORMSPREE_ENDPOINT` zusätzlich als Vercel-Env-Variable (alle Environments) gesetzt + Redeploy. Jetzt **end-to-end bestätigt** – lokal UND live, Mail kommt an. Außerdem Vercel-Status nach Dashboard-Verifikation wieder auf ✅ korrigiert (war zwischenzeitlich fälschlich als „kein Projekt" notiert). |
| 07.06.2026 | **Session 7: Doku-Korrektur Vercel-Status.** Die in Session 6 notierte Einschätzung („Account `lngleon` hat kein Projekt → kein Auto-Deploy") war ein Fehlschluss aus einer CLI-Prüfung im falschen Account-Kontext. Im Vercel-Dashboard (Account „leon's projects") verifiziert: Projekt `leons-webseite` ist mit `main` verbunden, alle Commits dieser Session deployen sauber auf Production, oberstes Deployment 19c48be („Kontakt") = Ready. Vercel-Status wieder auf ✅ gesetzt (Infrastruktur-Status + Verhaltensregeln). Lehre: Dashboard ist maßgeblich; bei CLI-Checks den Account-Kontext (`vercel whoami` / Team) prüfen. Nur Doku. |
| 07.06.2026 | **Session 6: „Kontakt"-Sektion (letzte Sektion).** Zweispaltig (`id="kontakt"`): links Formspree-Formular (`VITE_FORMSPREE_ENDPOINT`, JSON-POST), rechts „Lieber direkt?" mit 3 Buttons (Mail/WhatsApp/Instagram); auf Mobil gestapelt mit Formular oben. State-Machine idle→sending→success/error, Client-Validierung (Pflichtfelder + E-Mail-Format), Erfolg leert das Formular + Erfolgsmeldung, Fehler retrybar. Neues `--destructive`-Theme-Token (beide Modes) für Validierungs-/Fehlerfarben. Geteilte `BrandIcons` (Instagram + WhatsApp) angelegt, Footer darauf umgestellt. **Adversarielles Review-Workflow** über das Formular → 5 bestätigte Findings: a11y-Fixes angewandt (Fokus zum ersten Fehlerfeld bei Validierung [WCAG 3.3.1], Fokus ins Erfolgs-Panel [2.4.3], Doppelsende-Guard via ref, Placeholder-Kontrast `/80`). Offen/Phase 3: Light-Mode-Kontrast der Akzentfarbe als Text + Fokusring (siehe „Bekannte Bugs"). Dark + Light, responsive, Akzent nur über `--accent`, Fade-up. `npm run build` läuft. |
| 02.06.2026 | **Session 5: Bugfix Prozess-Animation.** Beim Neuladen mit der Sektion im Viewport liefen Schritt-Stagger und Linien-Aufbau nicht (beim Reinscrollen schon), nur bei Prozess. Ursache: `whileInView`-Geste propagiert den tiefen Variant-Baum (`ol → li → Linien`) beim „bereits im Viewport beim Mount"-Fall unzuverlässig. Fix: Orchestrierung auf `useInView` + gesteuertes `animate` umgestellt (statt `whileInView`); reduced-motion-Verhalten unverändert. `npm run build` läuft. Siehe „Bekannte Bugs". |
| 02.06.2026 | **Session 4: „Prozess"-Sektion.** Fünfte Sektion auf `/` (`id="prozess"`): vier nummerierte Schritte als sichtbare Abfolge 1→4 (Kennenlernen & Idee → Konzept & Design → Umsetzung → Launch & Betreuung) als `<ol>`/`<li>`-Stepper, NICHT als loses Card-Grid. Verbindungslinie zwischen den Schritten: Desktop horizontal, Mobil vertikal gestapelt (zwei Connector-Elemente je Schritt, `scaleX`/`scaleY`). Akzent-getönte Nummern-Badges. Animation (reduced-motion-sicher via `useReducedMotion`): Schritte blenden gestaffelt beim Scrollen ein, Linie baut sich progressiv auf. Überschrift „So entsteht dein Projekt." + Unterzeile via `SectionHeading`, Content im Data-Layer (`src/data/process.ts`). Dark + Light, responsive, Akzent nur über `--accent`. `npm run build` läuft. |
| 02.06.2026 | **Session 3: „Über mich"-Sektion.** Vierte Sektion auf `/` (`id="ueber-mich"`, Ziel für den Navbar-Anker): zweispaltiges Layout – Foto-Platzhalter links, Text rechts; auf Mobil gestapelt mit Foto oben. `SectionHeading` (links ausgerichtet) für Eyebrow „Über mich" + Überschrift „Die Person hinter dem Code.", darunter 3 Absätze. Porträt-Platzhalter als gerahmte Hülle (Rand + Rundung) im Hochformat (4∶5), `bg-muted` (mode-adaptiv), Initialen „LL" + Caption „Porträt folgt" – bereit, das echte Bild in Phase 3 als `object-cover`-`<img>` einzusetzen. Content im Data-Layer (`src/data/about.ts`). Dark + Light, responsive, Akzent nur über `--accent`, Fade-up + Stagger beim Scrollen. `npm run build` läuft. |
| 02.06.2026 | **Session 2: Leistungen-Sektion.** Dritte Sektion auf `/`: Überschrift „Das baue ich für dich." + Unterzeile, 4 Karten im 2×2-Grid (mobil 1 Spalte), gleicher Spacing-Rhythmus wie die Problem-Sektion. `Card`- und `SectionHeading`-Muster wiederverwendet (Hover nicht neu gebaut). Inhalte: Webseiten · Web-Apps & Tools · Redesign & Modernisierung · KI-Integration. **Karte 4 (KI-Integration) als Highlight:** `Card` um eine dezente `highlight`-Prop erweitert – Akzent dauerhaft aktiv (Akzent-Rand + leiser Glow, kein Badge), Hover bleibt obendrauf. Je Karte ein dezentes Icon (Stil wie Problem-Sektion), Content im Data-Layer (`src/data/services.ts`). Dark + Light, responsive, Akzent nur über `--accent`. `npm run build` läuft. |
| 02.06.2026 | **Session 1: Phase 1 abgeschlossen + Start Phase 2.** **Phase 1 (Infrastruktur):** Repo `lngleon/leons-webseite` (SSH-Alias `github-lngleon`, Branch `main`), Vercel-Auto-Deploy, Formspree-Endpoint in `.env.local`, lokale Umgebung, CLAUDE.md + docs/ angelegt. **Phase 2 gestartet – drei Sektionen + Karten-Muster:** (1) **Grundgerüst:** Vite + React + TS + Tailwind v4 + Framer Motion + react-router-dom, Ordnerstruktur (components/pages/sections/hooks/lib/data/types), zentrales CSS-Variablen-Theming (Dark default + Light per Toggle, `--accent` als einzelner Platzhalter), Navbar (Logo „LL", Anker-Nav, Toggle, CTA, Mobil-Menü) + Footer (Impressum/Datenschutz/Instagram), Routen `/` `/impressum` `/datenschutz` + 404. (2) **Hero:** volle Höhe, Headline „Veränderungen, die spürbar werden." + Unterzeile, 4 beim Sichtbarwerden hochzählende Zähler (2 · 3 · 100 % · 1), CTA → `#kontakt`, reduced-motion-sichere `Counter`-Komponente. (3) **Problem-Sektion:** Überschrift „Kommt dir das bekannt vor?" + 4 Schmerzpunkt-Karten, `SectionHeading`-Komponente, Fade-up beim Scrollen. (4) **Wiederverwendbares `Card`-Hover-Muster** (`src/components/Card.tsx`): dezentes Anheben + Akzent-Rand + weicher Glow, smooth (~200 ms), touch-sicher (`@media (hover: hover)`) und `motion-safe`. Alles Dark + Light, responsive, Akzent nur über `--accent`; `npm run build` läuft. |
| 02.06.2026 | **Session 0: Discovery.** Komplettes Konzept erarbeitet: Positionierung (premium/nahbar, keine Preise, Ziel = Kontakt), Single-Page mit 7 Sektionen, Design (Dark+Light mit Toggle, edel-zurückhaltend, Akzentfarbe offen), Tech-Stack (React/TS/Tailwind/Vite/Framer Motion, Vercel, Formspree, kein Backend), 2 Projekt-Showcases (Blumen Lang, Naillery), Claim „Veränderungen, die spürbar werden.", 4 Hero-Zähler, Prozess-Schritte, Problem-Schmerzpunkte, Kontaktdaten, rechtliche Unterseiten. Systemprompt + Projektdateien erstellt. |

---

## Claude Code Prompt-Protokoll

| # | Beschreibung | Status |
|---|-------------|--------|
| 1 | Projekt-Grundgerüst (Vite/React/TS/Tailwind v4/Framer Motion/react-router-dom, Ordnerstruktur, Theme-Toggle, Navbar, Footer, Routen) | ✅ |
| 2 | Hero-Sektion (volle Höhe, Headline + Unterzeile, 4 hochzählende Zähler, CTA → #kontakt) | ✅ |
| 3 | Problem-Sektion (Überschrift + 4 Schmerzpunkt-Karten, Fade-up beim Scrollen) | ✅ |
| 4 | Feinschliff: wiederverwendbares `Card`-Hover-Muster (Anheben + Akzent-Rand + Glow, touch-/motion-safe) | ✅ |
| 5 | Leistungen-Sektion (4 Karten 2×2, Card/SectionHeading wiederverwendet, KI-Karte als dauerhaftes Akzent-Highlight) | ✅ |
| 6 | „Über mich"-Sektion (2-spaltig, Porträt-Platzhalter Hochformat links / Text rechts, mobil gestapelt) | ✅ |
| 7 | „Prozess"-Sektion (4 nummerierte Schritte als Abfolge, Verbindungslinie horizontal/vertikal, progressiver Aufbau) | ✅ |
| 8 | „Kontakt"-Sektion (Formspree-Formular mit State-Machine/Validierung + 3 Direkt-Buttons, adversariell a11y-geprüft) | ✅ |
| 9 | Hero-Umbau (generativer Violett-Hintergrund + Terminal das Build-Output tippt, 4 Tabs, reduced-motion-sicher) | ✅ |
| 10 | Leistungen-Upgrade: 4 lebende Schaubilder (Browser-Build-up, App-Reaktion, Redesign-Wisch, KI-Chat-Stream), einmal beim Scrollen + Hover, reduced-motion-sicher | ✅ |
| 11 | Dark-only-Umbau + Violett-Gradient-Akzent (Toggle/Light-Code raus, `--accent-gradient`/`-strong`, Showcase-Text-Clip + CTA-Füllung, Kontrast verifiziert) | ✅ |
| 12 | Code-Tag-Politur: dekorative Inline-Code-Tags (Mono, flacher Akzent) auf echte Begriffe im Fließtext (`Web-Apps`, `Buchungssystem`/`Dashboards`, `Code`), sparsam | ✅ |
| 13 | AuroraText: fließendes Hero-Akzentwort „spürbar" (Magic-UI-Stil, `<AuroraText>`), reine CSS-@keyframes (`background-position` auf verbreitertem Gradient), nur Violett (`--accent-gradient` verbatim), solider Fallback + reduced-motion = statisch, SSR-/hydration-sicher, NUR am Hero-Wort | ✅ |
| 14 | SSG/Prerendering: alle 3 Routen beim Build als statisches HTML (`renderToString` + `StaticRouter`, `scripts/prerender.mjs`), `hydrateRoot`/`createRoot`-Split in `main.tsx`, Hydration-sicher via neuem `useReducedMotionSafe`-Hook (Hero/Terminal/ServiceDiagram/Prozess); H1 + Sektions-Text ohne JS im Quelltext, reduced-motion/Reveal bleiben. `npm run build` grün, H1 im `dist`-HTML verifiziert | ✅ |
| 15 | AuroraText-Clip-Bugfix: Hero-Wort „spürbar" war live unsichtbar (Gradient nicht auf die Glyphen geclippt). Ursache: direkt animierte `background-position` auf `background-clip:text` (Chromium droppt die Clip-Maske); KEIN Lightning-CSS-/Prefix-/Deploy-Problem (empirisch ausgeschlossen). Fix: Flow über registrierte `@property --aurora-pos` statt `background-position` direkt + `display:inline-block`, Clip-Technik wie `.accent-gradient-text`. `npm run build` grün, `@property`+Clip im gebauten CSS verifiziert | ✅ |
| 16 | Per-Route-`<head>`: Title + Description + Basis-OpenGraph (`og:title`/`og:description`/`og:type`) je Route via Route→Meta-Map in `scripts/prerender.mjs` (dependency-frei, kein react-helmet, kein Framework-Mode); geteilter Default-Head aus dem Template entfernt, je genau 1 Title/Desc pro Route, im statischen `<head>` aller 3 dist-Dateien verifiziert. `og:image`/`og:url` ausgelassen (kein Logo/Domain). `npm run build` grün | ✅ |
| 17 | Stille Route `/möglichkeiten` („Was möglich ist", NICHT in der Navbar) + 4 UI-Komponenten in `src/components/ui/` (`Marquee`, `InteractiveHoverButton`, `CoolMode`, `Tilt`). Prerendert mit eigenem Title/Meta; Bento mit echten `ServiceDiagram`-Schaubildern + statischer „Diese Seite selbst"-Zelle (Perf-Platzhalter); Tilt subtil; Marquee = echter Tech-Stack. SSR-/reduced-motion-safe, CoolMode leak-frei. `npm run build` grün | ✅ |

---

## Nächste Prioritäten

| # | Aufgabe | Aufwand |
|---|---------|--------|
| 1 | Projekte-Sektion (2 Showcases + interaktive Detail-Ansicht) | Groß |
| 2 | Impressum + Datenschutz: Texte einfügen | Klein |
| 3 | Logo „LL" + Favicon (für dunklen Hintergrund) einbinden | Mittel |
| ✅ | ~~Follow-up: CSR → Prerender/SSG für echten LCP-Gewinn (Mobil)~~ → erledigt 08.06.2026 (Session 10: `renderToString` + `StaticRouter` Prerender, 3 Routen statisch) | – |

---

## Bekannte Bugs

- ✅ **Behoben – Prozess-Animation lief beim Neuladen nicht.** Lag die Sektion beim Laden bereits im Viewport (Reload an dieser Scroll-Position), liefen weder Schritt-Stagger noch Linien-Aufbau; beim Reinscrollen liefen sie. Betraf NUR Prozess. **Ursache:** Die `whileInView`-Geste propagiert den tief verschachtelten Variant-Baum (`ol → li → Verbindungslinien`, zwei Ebenen) beim „bereits im Viewport beim Mount"-Fall nicht zuverlässig. Die flacheren Sektionen (eine Ebene) waren nicht betroffen. **Fix:** Orchestrierung über `useInView` + gesteuertes `animate={inView ? 'show' : 'hidden'}` statt `whileInView`. Reduced-motion-Verhalten unverändert.
- ✅ **Behoben (08.06.2026) – Light-Mode-Kontrast der Akzentfarbe.** Mit der Platzhalter-Akzentfarbe #c8a96a lag Akzent-als-Text auf hellem Grund bei nur ~2.25:1 und der Fokusring unter 3:1 (WCAG 1.4.3 / 1.4.11), u.a. beim „Noch eine Nachricht schreiben"-Button im Kontakt-Formular. **Fix:** finale Akzentfarbe Violett mit per-Mode-Tokens – Light `--accent` = #6d28d9 ist dunkel genug, sodass Akzent-als-Text UND Fokusring auf Weiß ~7.1:1 erreichen (≥ AA 4.5/3). Per Kontrastberechnung verifiziert; kein separates `--accent-strong` nötig. Aufgedeckt durch adversarielles Review der Kontakt-Sektion. **Update 08.06.2026:** seit der Dark-only-Umstellung ohnehin gegenstandslos (kein Light Mode mehr).

---

## Verhaltensregeln für nächsten Chat

- **Repo:** `lngleon/leons-webseite` (GitHub), Branch `main`
- **Git/SSH:** Remote `origin` = `git@github-lngleon:lngleon/leons-webseite.git`. Das Repo ist an den SSH-Alias `github-lngleon` gebunden – Push läuft darüber. Hintergrund: Auf der Maschine existiert ein zweiter GitHub-Account („Dkllang"), deshalb die SSH-Bindung statt globalem Default. Bei Git-Problemen zuerst den Remote/SSH-Alias prüfen.
- **Backend/DB:** keins – reines Frontend, KEIN Supabase, KEINE SQL/RLS. Claude macht Frontend-Code + Design + Content + kurze Claude-Code-Prompts.
- **Vercel:** ✅ Mit Repo verbunden, Auto-Deploy bei Push auf `main`. Das Projekt `leons-webseite` liegt im Vercel-Account „leon's projects" – das **Dashboard ist maßgeblich**; die CLI kann im falschen Account-Kontext stehen (daher zeigte `vercel projects ls` als `lngleon` fälschlich „keine Projekte"). Verifiziert 07.06.2026 im Dashboard: oberstes Deployment 19c48be („Kontakt") = Ready/Production.
- **Formspree:** Endpoint in `.env.local` als `VITE_FORMSPREE_ENDPOINT` hinterlegt
- **Design/Theming:** **Dark-only** (kein Light Mode, kein Theme-Toggle). Akzent **Violett**: flach `--accent`/`--accent-solid` (Ränder/Icons/kleine UI/Fokusring) + Violett-Gradient `--accent-gradient`/`--accent-gradient-strong` NUR auf Showcase-Flächen (Headline-Akzentwort, Hero-Zahlen, primäre CTAs, Eyebrow). Light-Mode-Themen (Toggle, per-Mode-Tokens, Light-Kontrast) sind gegenstandslos. Akzent nie hardcoden; Code-Tags via `CodeTag` (flach, kein Gradient).
- **Phase:** 2 fast komplett (alle Sektionen außer **Projekte** stehen), Phase 3 angefangen (**Akzentfarbe ✅ Violett**). Offen: Projekte-Sektion, Impressum/Datenschutz-Texte, Logo/Favicon (dunkler Hintergrund). **CSR→Prerender/SSG ✅ erledigt** (Session 10): Build prerendert alle 3 Routen zu statischem HTML, im Browser Hydration – beim Bauen nicht kaputtmachen (Hydration-Regel: Server-Frame = erstes Client-Frame, `useReducedMotionSafe` benutzen, kein `window`/Zufall im Render).
- **Betriebssystem:** Windows
- **Projektdateien-Pfad:** C:\Users\l.lang\REPOS\leons-webseite
- **Projektdateien (Claude AI):** PROJEKT-STAND.md, CURRENT-SCHEMA.md
- **Repo-Dateien:** CLAUDE.md (Root), docs/PROJEKT-STAND.md, docs/CURRENT-SCHEMA.md, docs/CLAUDE-CODE-TODO.md
- **Nächste Aufgabe:** Projekte-Sektion bauen (2 Showcases + interaktive Detail-Ansicht)

---

## Pricing

Keine Preise auf der Website – bewusste Positionierungs-Entscheidung. Die Seite führt zum Gespräch, nicht zur Preisliste. „Premium ohne Premium-Preis" signalisiert: bezahlbar im Vergleich zu teuren Agenturen, konkrete Preise werden im persönlichen Erstgespräch / individuellen Angebot geklärt.
