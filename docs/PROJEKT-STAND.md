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
- **Repo:** wird beim Infrastruktur-Setup festgelegt | GitHub: main Branch
- **Design-System:** Regeln in dieser Datei (Abschnitt Design-Regeln); separate DESIGN-SYSTEM.md vorerst nicht nötig
- **Claude Code Config:** CLAUDE.md im Repo-Root

---

## Phasen-Status

| Phase | Beschreibung | Status |
|-------|-------------|--------|
| 0 | Discovery (Interview) | ✅ Abgeschlossen |
| 1 | Infrastruktur-Setup (GitHub, Vercel, Formspree, lokale Umgebung) | ✅ Abgeschlossen |
| 2 | Aufbau & Sektionen via Claude Code | 🔄 In Arbeit (Grundgerüst steht) |
| 3 | Content & Feinschliff (Logo, Texte, Recht, Akzentfarbe) | ⬜ Offen |
| 4 | Testing | ⬜ Offen |
| 5 | Launch / Domain | ⬜ Offen |

---

## Infrastruktur-Status

| Komponente | Status | Details |
|------------|--------|---------|
| GitHub | 🔄 | Account vorhanden, Repo noch anzulegen |
| Vercel | 🔄 | Account vorhanden, Projekt noch anzulegen |
| Formspree | ⬜ | Account noch anzulegen, Formular-Endpoint kopieren |
| Lokale Umgebung | ⬜ | VS Code + Claude Code Extension, Repo clonen |
| .env (Formspree-Endpoint) | ⬜ | Formspree-Form-ID/Endpoint hinterlegen |

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
| Problem-Sektion (4 Schmerzpunkte) | ⬜ | Offen |
| Leistungen (4 Karten) | ⬜ | Offen |
| Über mich | ⬜ | Offen |
| Prozess (4 Schritte) | ⬜ | Offen |
| Projekte (2 Showcases + Detail-Ansicht) | ⬜ | Offen |
| Kontakt (Formspree-Formular + direkte Buttons) | ⬜ | Offen |
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

---

## Session-Protokoll

| Datum | Zusammenfassung |
|-------|----------------|
| 02.06.2026 | **Session 2: Hero-Sektion.** Erste Sektion der Single-Page gebaut: volle Höhe, Headline „Veränderungen, die spürbar werden." + Unterzeile, 4 Zähler die beim Sichtbarwerden hochzählen (2 Live-Projekte · 3 Tools entwickelt · 100 % individuell programmiert · 1 Person, voller Stack), CTA „Projekt anfragen" → Anker `#kontakt`. Wiederverwendbare `Counter`-Komponente (Framer Motion `useInView`, reduced-motion-sicher), Hero-Content im Data-Layer (`src/data/hero.ts`). Dark + Light, responsive, Akzent nur über `--accent` (inkl. dezentem Glow). `npm run build` läuft. |
| 02.06.2026 | **Session 1: Grundgerüst.** Vite + React + TS + Tailwind v4 + Framer Motion + react-router-dom aufgesetzt. Ordnerstruktur (components/pages/sections/hooks/lib/data/types). Zentrales CSS-Variablen-Theming (Dark default + Light per Toggle, `--accent` als einzelner Platzhalter für beide Modi). Navbar (Logo „LL", Anker-Nav, Toggle, CTA „Projekt anfragen", responsives Mobil-Menü) + Footer (Impressum/Datenschutz/Instagram). Routen `/` (leere Single-Page-Hülle), `/impressum`, `/datenschutz` (Platzhalter) + 404. `npm run build` läuft sauber durch. |
| 02.06.2026 | **Session 0: Discovery.** Komplettes Konzept erarbeitet: Positionierung (premium/nahbar, keine Preise, Ziel = Kontakt), Single-Page mit 7 Sektionen, Design (Dark+Light mit Toggle, edel-zurückhaltend, Akzentfarbe offen), Tech-Stack (React/TS/Tailwind/Vite/Framer Motion, Vercel, Formspree, kein Backend), 2 Projekt-Showcases (Blumen Lang, Naillery), Claim „Veränderungen, die spürbar werden.", 4 Hero-Zähler, Prozess-Schritte, Problem-Schmerzpunkte, Kontaktdaten, rechtliche Unterseiten. Systemprompt + Projektdateien erstellt. |

---

## Claude Code Prompt-Protokoll

| # | Beschreibung | Status |
|---|-------------|--------|
| 1 | Projekt-Grundgerüst (Vite/React/TS/Tailwind v4/Framer Motion/react-router-dom, Ordnerstruktur, Theme-Toggle, Navbar, Footer, Routen) | ✅ |
| 2 | Hero-Sektion (volle Höhe, Headline + Unterzeile, 4 hochzählende Zähler, CTA → #kontakt) | ✅ |

---

## Nächste Prioritäten

| # | Aufgabe | Aufwand |
|---|---------|--------|
| 1 | Problem-Sektion (4 Schmerzpunkte) | Mittel |
| 2 | Leistungen (4 Karten) | Mittel |
| 3 | Über mich | Klein |

---

## Bekannte Bugs

<!-- leer -->

---

## Verhaltensregeln für nächsten Chat

- **Repo:** `lngleon/leons-webseite` (GitHub), Branch `main`
- **Backend/DB:** keins – reines Frontend, KEIN Supabase, KEINE SQL/RLS. Claude macht Frontend-Code + Design + Content + kurze Claude-Code-Prompts.
- **Vercel:** Account vorhanden, Auto-Deploy bei Push auf `main`
- **Formspree:** Endpoint in `.env.local` als `VITE_FORMSPREE_ENDPOINT` hinterlegt
- **Phase:** 2 (Aufbau & Sektionen) – Grundgerüst + Hero stehen, als Nächstes die Problem-Sektion
- **Betriebssystem:** Windows
- **Projektdateien-Pfad:** C:\Users\l.lang\REPOS\leons-webseite
- **Projektdateien (Claude AI):** PROJEKT-STAND.md, CURRENT-SCHEMA.md
- **Repo-Dateien:** CLAUDE.md (Root), docs/PROJEKT-STAND.md, docs/CURRENT-SCHEMA.md, docs/CLAUDE-CODE-TODO.md
- **Nächste Aufgabe:** Problem-Sektion bauen (4 Schmerzpunkte)

---

## Pricing

Keine Preise auf der Website – bewusste Positionierungs-Entscheidung. Die Seite führt zum Gespräch, nicht zur Preisliste. „Premium ohne Premium-Preis" signalisiert: bezahlbar im Vergleich zu teuren Agenturen, konkrete Preise werden im persönlichen Erstgespräch / individuellen Angebot geklärt.
