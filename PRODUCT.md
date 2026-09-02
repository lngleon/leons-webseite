# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primäre Zielgruppe (User-Entscheidung 02.09.2026): **lokale Betriebe und Selbstständige** im
deutschsprachigen Raum – Gärtnerei/Blumengroßhandel, Gastronomie, Nagelstudio, Friseur, Handwerk,
kleine Dienstleister. Dazu Privatpersonen aus dem Freundes- und Familienkreis.

Situation: Der Besucher kommt fast immer über Mundpropaganda (Empfehlung von Freunden, Familie,
anderen Betrieben), nicht über Suche. Er hat entweder keine Webseite, eine veraltete, oder eine
Baukasten-Seite, mit der er sich nicht wohlfühlt. Er ist kein Technik-Mensch, hat wenig Zeit und
weiß nicht, woran er gute Arbeit erkennt – außer daran, wie das, was er gerade ansieht, auf ihn wirkt.

Job: prüfen, ob dieser Leon der Richtige ist, und mit möglichst wenig Aufwand Kontakt aufnehmen.

Sekundär, nach oben offen: Startups und Firmen. Nicht die Bildsprache-treibende Gruppe.

## Product Purpose

Premium-Personal-Brand-Website für Leon Lang. Sie stellt Leon als Person dar UND ist das Schaufenster
für seine Dienstleistungen (Webseiten, Web-Apps/Tools, Redesign, KI-Integration).

Erfolg = eine qualifizierte Kontaktanfrage. Kein Shop, kein Login, kein Checkout, keine Preise.

Die Seite ist gleichzeitig das Portfolio-Stück: Handwerksqualität ist hier kein Beiwerk, sondern
das eigentliche Verkaufsargument. Sieht die Seite austauschbar aus, ist der Beweis nicht erbracht.

## Positioning

**„Veränderungen, die spürbar werden."** – User-Entscheidung 02.09.2026: Was ein Besucher nach fünf
Sekunden glauben soll, ist nicht die Technik, sondern der *Effekt*. Nicht „ich programmiere modern",
sondern „nach mir ist etwas anders – und du merkst es".

Was ein Nachbarangebot nicht ehrlich kopieren kann: es ist eine echte, erreichbare Einzelperson, die
Konzept, Design, Code und Launch selbst macht und nach dem Launch da bleibt – kein Agentur-Team,
keine Warteschleife, kein Template. Diese Fakten stützen die Positionierung, sie sind aber nicht
die Kernbotschaft.

## Operating Context

- Besucher-Flow: eine Single-Page zum Durchscrollen, plus `/moeglichkeiten` und drei begehbare
  Musterseiten unter `/demo/*` (Café, Restaurant, Friseur – Betriebe erfunden, Seiten echt).
- Kontakt-Flow: geführter Fragebogen (Projektart · Ziele · Ausgangslage · Zeitrahmen) vor
  Name/E-Mail, alternativ freies Formular; dazu direkte Wege per E-Mail, WhatsApp, Instagram.
- Ansprache: Deutsch, durchgehend „Du".
- Der Besucher liest oft am Handy, oft nebenbei, oft direkt nach einer mündlichen Empfehlung.

## Capabilities and Constraints

- Reines Frontend: Next.js (App Router) + React + TypeScript + Tailwind v4 + Framer Motion,
  alle Routen statisch gerendert, Hosting Vercel.
- Kein Backend, keine Datenbank, keine API-Routen/Server Actions/Middleware.
- Kontaktformular über Formspree (Endpoint aus `NEXT_PUBLIC_FORMSPREE_ENDPOINT`).
- Analytics: Vercel Web Analytics, cookielos (deshalb kein Cookie-Banner).
- Rechtlich: Impressum + Datenschutz als eigene Routen (Texte noch offen).
- **Keine Preise** auf der Seite.
- Keine erfundenen Zahlen, Referenzen, Testimonials oder Messwerte.

## Brand Commitments

**Offen (User-Entscheidung 02.09.2026): nichts ist gesetzt.** Ausdrücklich zur Neubewertung
freigegeben sind Tagline, der Dark-only-Grundsatz und das Porträtfoto. Der Name „Leon Lang" bleibt
faktisch bestehen; alle bisherigen visuellen Festlegungen (Nachtblau-Grund, Violett-Akzent,
warmer Zweitakzent Orange→Pink, „LL"-Wortmarke, Switzer/Clash Display) sind ab jetzt **Evidenz und
Anti-Referenz**, keine Vorgabe. Der Auslöser: der bestehende Auftritt liest sich für den Auftraggeber
als generische KI-Website – Ton-in-Ton-Fläche mit einem Akzentverlauf darüber.

Stimme: persönlich, direkt, ohne Fachjargon, keine Agentur-Sprache, keine Superlative.

## Evidence on Hand

- Zwei echte Live-Projekte: **Blumen Lang** (Gärtnerei & Blumengroßhandel, Website) und
  **Naillery** (Nagelstudios, eigene Plattform) – mit Vorschaubildern in `public/`.
- Drei vollständige, begehbare Musterseiten (`/demo/cafe`, Restaurant, Friseur) mit 24 echten Fotos
  in `public/demo/`. Die Betriebe sind erfunden, das ist auf der Seite ausgeschrieben.
- Echtes Porträtfoto von Leon.
- Vorhandene Hero-Zahlen: 2 Live-Projekte · 3 Tools entwickelt · 100 % individuell programmiert ·
  1 Person, voller Stack. Mehr gibt es nicht.
- **Nicht vorhanden und nicht zu erfinden:** Kundenstimmen, Logos von Auftraggebern, Case-Study-
  Zahlen, Auszeichnungen, Jahre Berufserfahrung, Preise, eine finale eigene Domain, ein Logo.

## Product Principles

1. **Der Beweis ist die Seite selbst.** Jede visuelle Entscheidung muss vor einem Besucher bestehen,
   der nur eine Frage hat: „kann der das?"
2. **Effekt vor Technik.** Was sich für den Kunden ändert, steht vor dem Stack, mit dem es gebaut ist.
3. **Eine Person, erreichbar.** Nähe und Verbindlichkeit sind das Differenzierungsmerkmal – die
   Marke darf nie nach anonymer Agentur aussehen.
4. **Nur echte Substanz.** Lieber wenige belegte Fakten als erfundene Sozialbeweise.
5. **Niedrige Hürde zum Kontakt.** Der Weg zur Anfrage ist der einzige Erfolgspfad und muss auf
   jedem Schritt sichtbar bleiben.

## Accessibility & Inclusion

Kontrast gerechnet, nicht geschätzt: Fließtext ≥ 4.5:1, große Schrift ≥ 3:1, Bedienelemente und
Fokusring ≥ 3:1. Bewegung respektiert `prefers-reduced-motion`. Mobil voll funktionsfähig.
