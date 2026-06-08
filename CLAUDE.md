# CLAUDE.md

## Projekt
Leons Webseite – Premium Personal-Brand-Website für Leon Lang.
Reines Frontend, kein Backend. Schaufenster für Dienstleistungen, Ziel ist die Kontaktanfrage.

## Tech Stack
React + TypeScript + Tailwind + Vite + Framer Motion. Hosting: Vercel (Auto-Deploy bei Push auf main).
Kontaktformular: Formspree (extern). KEIN Supabase, KEINE Datenbank, KEINE SQL/RLS/Migrations/Edge Functions.

## Projektdateien (vor jeder Aufgabe lesen)
- docs/PROJEKT-STAND.md → Projektkontext, Sektionen, Content, Workflows, Regeln
- docs/CURRENT-SCHEMA.md → Architektur & Datenfluss (kein DB-Schema; dokumentiert externe Dienste wie Formspree)
- docs/CLAUDE-CODE-TODO.md → aktuelle Frontend-Tasks mit Priorität

## Regeln
- Deutsche UI-Texte, durchgehend "Du"-Ansprache
- Dark-only (kein Light Mode, kein Theme-Toggle) – Near-Black/Weiß/Grau-Basis
- Responsive: Desktop-first, Mobil voll funktionsfähig
- Akzent NUR über zentrale CSS-Variablen, niemals Farbwerte hardcoden: flach `--accent`/`--accent-solid` (Ränder, Icons, kleine UI, Fokusring) + Violett-Gradient `--accent-gradient`/`--accent-gradient-strong` nur auf Showcase-Flächen
- Keine Preise auf der Seite
- Animationen (Framer Motion) subtil und edel, nie verspielt
- Formspree-Endpoint aus .env.local lesen (VITE_FORMSPREE_ENDPOINT), nie hardcoden
- Vor jedem Commit: npm run build muss durchlaufen
- Nach jeder Änderung: committen und pushen
- Doku im Repo (docs/) als Teil des Tasks aktualisieren, wenn sich was ändert
