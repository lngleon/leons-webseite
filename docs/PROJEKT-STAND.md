# PROJEKT-STAND.md – Leons Webseite

> Dieses Dokument ist die zentrale Wissensdatei des Projekts.
> 🔒 = Feststehend | 🔄 = Kann sich ändern
> Letzte Aktualisierung: 02.06.2026

---

## 🔒 Branding

Markenname: Leon Lang
Tagline: „Veränderungen, die spürbar werden."
Logo: „LL"-Monogramm – noch zu erstellen (via ChatGPT-Bildgenerator), inkl. Favicon, in heller + dunkler Variante
Design-System: edel-zurückhaltend (Schwarz/Weiß/Grau), Dark + Light Mode, Akzentfarbe noch offen → siehe Design-Regeln

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
| 2 | Aufbau & Sektionen via Claude Code | 🔄 Aktiv (Grundgerüst, Hero, Problem stehen) |
| 3 | Content & Feinschliff (Logo, Texte, Recht, Akzentfarbe) | ⬜ Offen |
| 4 | Testing | ⬜ Offen |
| 5 | Launch / Domain | ⬜ Offen |

---

## Infrastruktur-Status

| Komponente | Status | Details |
|------------|--------|---------|
| GitHub | ✅ | Repo `lngleon/leons-webseite`, Branch `main` (SSH-Alias `github-lngleon`) |
| Vercel | ⚠️ | Account `lngleon` hat KEIN Projekt → kein Auto-Deploy; Repo verbinden oder anderen Vercel-Login prüfen (07.06.2026 per CLI geprüft) |
| Formspree | ✅ | Formular-Endpoint in `.env.local` als `VITE_FORMSPREE_ENDPOINT` |
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
- Erster Claude-Code-Prompt: Projekt-Grundgerüst (Vite, Tailwind, Framer Motion, Ordnerstruktur, Dark/Light-Basis)
- Ablauf folgt INFRASTRUKTUR-SETUP.md, ein Schritt pro Nachricht

### Phase 2: Aufbau & Sektionen via Claude Code
- Reihenfolge: Grundgerüst (Layout, Theme-Toggle, Navigation, Footer) → Hero → restliche Sektionen
- Sektionen: Hero · Problem · Leistungen · Über mich · Prozess · Projekte · Kontakt
- Dark/Light bei jeder Sektion mitbauen, Responsive prüfen
- Impressum- + Datenschutz-Seiten als Platzhalter anlegen, im Footer verlinken

### Phase 3: Content & Feinschliff
- Logo „LL" + Favicon einbinden (hell + dunkel)
- Akzentfarbe festlegen und zentrale CSS-Variable füllen
- Impressum- + Datenschutz-Texte einfügen (vom User generiert)
- Projekt-Links auf finale Domains umstellen, sobald verfügbar
- Optional: stimmungsvolle Bewegtbild-/Glow-Elemente

### Phase 4: Testing
- TESTCHECKLISTE.md anlegen (erst jetzt)
- Pro Sektion: Dark + Light, Desktop + Mobil, Animationen, Formular-Versand
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

- **Header/Navbar:** Logo „LL" (links) · Nav-Punkte: Leistungen · Über mich · Prozess · Projekte · Kontakt · Dark/Light-Toggle · CTA-Button (z.B. „Projekt anfragen", scrollt zu Kontakt)
- **Footer:** Name/Kurzinfo · Links zu Impressum + Datenschutz · ggf. Social (Instagram)
- **Unterseiten:** Impressum, Datenschutz (eigene Routen)

---

## Design-Regeln

- **Stil:** futuristisch, clean, edel, premium. Referenzen: adrianziegler.de (Dark) + farisschmidt.de (Light)
- **Dark + Light Mode:** immer beide, Start in Dark
- **Farbschema:** edel-zurückhaltend (Schwarz/Weiß/Grau-Töne). Akzentfarbe noch offen → als EINE zentrale CSS-Variable anlegen, damit sie später an einer Stelle gesetzt werden kann. NIEMALS Farbwerte hardcoden.
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
| Grundgerüst (Layout, Theme-Toggle, Navigation, Footer) | ✅ | Fertig |
| Hero (Claim + Unterzeile + 4 animierte Zähler) | ✅ | Fertig |
| Problem-Sektion (4 Schmerzpunkte) | ✅ | Fertig |
| Leistungen (4 Karten) | ✅ | Fertig (Karte 4 KI-Integration als Highlight) |
| Über mich | ✅ | Fertig (2-spaltig, Porträt-Platzhalter) |
| Prozess (4 Schritte) | ✅ | Fertig (nummerierte Abfolge mit Verbindungslinie) |
| Projekte (2 Showcases + Detail-Ansicht) | ⬜ | Offen |
| Kontakt (Formspree-Formular + direkte Buttons) | ✅ | Fertig (Formular + 3 Direkt-Buttons, a11y-geprüft) |
| Dark/Light-Toggle | ✅ | Fertig (zentrale CSS-Variablen, Dark default) |
| Responsive Layout | 🔄 | Grundgerüst responsive; pro Sektion mitprüfen |
| Impressum + Datenschutz (Platzhalter-Seiten) | ✅ | Platzhalter-Seiten + Footer-Links stehen (Inhalt offen) |

### Phase-2-Features (nach Launch)

| Feature | Beschreibung | Priorität |
|---------|-------------|-----------|
| Akzentfarbe setzen | zentrale CSS-Variable füllen, sobald entschieden | Hoch |
| Logo + Favicon einbinden | „LL"-Monogramm, hell + dunkel | Hoch |
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
- Akzentfarbe bewusst offengelassen → als zentrale Variable, Entscheidung später am lebenden Objekt.
- Bei nur 2 Projekten keine Kategorie-Tabs (würden leer wirken) → zwei große Showcases mit Detail-Ansicht. Tabs nachrüstbar, wenn mehr Projekte da sind.
- Reines Frontend, kein Backend/DB – Formular läuft über Formspree.
- Karten nutzen das zentrale `Card`-Muster (`src/components/Card.tsx`): einheitlicher, dezenter Hover (Anheben + Akzent-Rand + weicher Glow), touch-sicher und reduced-motion-freundlich. Neue Karten-Sektionen (z.B. Leistungen) dieses Muster wiederverwenden, statt den Hover neu zu bauen. Entrance-Animation gehört auf ein umschließendes motion-Element, nicht in die Card.
- Animationen mit `staggerChildren` über MEHRERE Verschachtelungsebenen (z.B. der Prozess-Stepper: `ol → li → Linien`) NICHT über die `whileInView`-Geste auslösen – sie propagiert den tiefen Variant-Baum unzuverlässig, wenn das Element beim Laden bereits im Viewport liegt (Reload). Stattdessen `useInView` + `animate={inView ? 'show' : 'hidden'}` verwenden; das propagiert die Varianten verlässlich. Einfache, einstufige Sektionen (eine Ebene Kinder) können `whileInView` weiter nutzen.

---

## Session-Protokoll

| Datum | Zusammenfassung |
|-------|----------------|
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

---

## Nächste Prioritäten

| # | Aufgabe | Aufwand |
|---|---------|--------|
| 1 | Projekte (2 Showcases + interaktive Detail-Ansicht) | Groß |
| 2 | Impressum + Datenschutz: Inhalte einfügen | Klein |
| 3 | Akzentfarbe finalisieren + AA-Kontrast prüfen (Phase 3) | Mittel |

---

## Bekannte Bugs

- ✅ **Behoben – Prozess-Animation lief beim Neuladen nicht.** Lag die Sektion beim Laden bereits im Viewport (Reload an dieser Scroll-Position), liefen weder Schritt-Stagger noch Linien-Aufbau; beim Reinscrollen liefen sie. Betraf NUR Prozess. **Ursache:** Die `whileInView`-Geste propagiert den tief verschachtelten Variant-Baum (`ol → li → Verbindungslinien`, zwei Ebenen) beim „bereits im Viewport beim Mount"-Fall nicht zuverlässig. Die flacheren Sektionen (eine Ebene) waren nicht betroffen. **Fix:** Orchestrierung über `useInView` + gesteuertes `animate={inView ? 'show' : 'hidden'}` statt `whileInView`. Reduced-motion-Verhalten unverändert.
- ⬜ **Offen (Phase 3) – Light-Mode-Kontrast der Akzentfarbe.** Die Platzhalter-Akzentfarbe `--accent` (#c8a96a) erreicht als TEXT auf hellem Grund nur ~2.25:1 (AA verlangt 4.5:1), und der Fokusring (`--ring: var(--accent)`) liegt unter 3:1 (WCAG 1.4.11). Betrifft nur den Light-Mode (Dark ist ok), u.a. beim „Noch eine Nachricht schreiben"-Button im Kontakt-Formular. Bewusst NICHT jetzt gefixt, da `--accent` ein Platzhalter ist (Festlegung „am lebenden Objekt"). **Beim Setzen der finalen Akzentfarbe:** AA-Kontrast für Akzent-als-Text + Fokusring im Light-Mode sicherstellen, ggf. via separatem dunklerem Token (`--accent-strong`) bzw. per-Mode-Ring. Aufgedeckt durch adversarielles Review der Kontakt-Sektion.

---

## Verhaltensregeln für nächsten Chat

- **Repo:** `lngleon/leons-webseite` (GitHub), Branch `main`
- **Git/SSH:** Remote `origin` = `git@github-lngleon:lngleon/leons-webseite.git`. Das Repo ist an den SSH-Alias `github-lngleon` gebunden – Push läuft darüber. Hintergrund: Auf der Maschine existiert ein zweiter GitHub-Account („Dkllang"), deshalb die SSH-Bindung statt globalem Default. Bei Git-Problemen zuerst den Remote/SSH-Alias prüfen.
- **Backend/DB:** keins – reines Frontend, KEIN Supabase, KEINE SQL/RLS. Claude macht Frontend-Code + Design + Content + kurze Claude-Code-Prompts.
- **Vercel:** ⚠️ Unter dem eingeloggten Vercel-Account (`lngleon`) existiert KEIN Projekt → Pushes auf `main` lösen aktuell KEINEN Auto-Deploy aus. Entweder Repo in Vercel verbinden oder der Deploy liegt unter einem anderen Vercel-Login (ggf. via `Dkllang`) – zu verifizieren. (07.06.2026 per CLI geprüft.)
- **Formspree:** Endpoint in `.env.local` als `VITE_FORMSPREE_ENDPOINT` hinterlegt
- **Phase:** 2 (Aufbau & Sektionen) – Grundgerüst + Hero + Problem + Leistungen + Über mich + Prozess + Kontakt stehen; es fehlt nur noch die Projekte-Sektion, dann ist Phase 2 inhaltlich komplett.
- **Betriebssystem:** Windows
- **Projektdateien-Pfad:** C:\Users\l.lang\REPOS\leons-webseite
- **Projektdateien (Claude AI):** PROJEKT-STAND.md, CURRENT-SCHEMA.md
- **Repo-Dateien:** CLAUDE.md (Root), docs/PROJEKT-STAND.md, docs/CURRENT-SCHEMA.md, docs/CLAUDE-CODE-TODO.md
- **Nächste Aufgabe:** Projekte-Sektion bauen (2 Showcases + interaktive Detail-Ansicht)

---

## Pricing

Keine Preise auf der Website – bewusste Positionierungs-Entscheidung. Die Seite führt zum Gespräch, nicht zur Preisliste. „Premium ohne Premium-Preis" signalisiert: bezahlbar im Vergleich zu teuren Agenturen, konkrete Preise werden im persönlichen Erstgespräch / individuellen Angebot geklärt.
