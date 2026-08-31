# CLAUDE.md

## Projekt
Leons Webseite – Premium Personal-Brand-Website für Leon Lang.
Reines Frontend, kein Backend. Schaufenster für Dienstleistungen, Ziel ist die Kontaktanfrage.

## Tech Stack
Next.js (App Router) + React + TypeScript + Tailwind v4 + Framer Motion. Hosting: Vercel (Auto-Deploy bei Push auf main).
Alle Routen werden beim Build statisch gerendert – kein SSR zur Laufzeit, keine API-Routen/Server Actions/Middleware.
Kontaktformular: Formspree (extern). KEIN Supabase, KEINE Datenbank, KEINE SQL/RLS/Migrations/Edge Functions.

## Projektdateien (vor jeder Aufgabe lesen)
- docs/PROJEKT-STAND.md → Projektkontext, Sektionen, Content, Workflows, Regeln
- docs/CURRENT-SCHEMA.md → Architektur & Datenfluss (kein DB-Schema; dokumentiert externe Dienste wie Formspree)
- docs/CLAUDE-CODE-TODO.md → aktuelle Frontend-Tasks mit Priorität

## Regeln
- Deutsche UI-Texte, durchgehend "Du"-Ansprache
- Dark-only (kein Light Mode, kein Theme-Toggle) – Near-Black/Weiß/Grau-Basis
- Responsive: Desktop-first, Mobil voll funktionsfähig
- Akzent NUR über zentrale CSS-Variablen, niemals Farbwerte hardcoden: flach `--accent`/`--accent-solid` (Ränder, Icons, kleine UI, Fokusring) + Violett-Gradient `--accent-gradient`/`--accent-gradient-strong` nur auf Showcase-Flächen. Einzige dokumentierte Rand-Ausnahme: `.card-gradient-border` auf GENAU EINER Karte (Leistungen-Highlight, 31.08.2026 – siehe docs/PROJEKT-STAND.md → Design-Regeln)
- Keine Preise auf der Seite
- Animationen (Framer Motion) subtil und edel, nie verspielt
- Formspree-Endpoint aus .env.local lesen (NEXT_PUBLIC_FORMSPREE_ENDPOINT), nie hardcoden
- Hydration-Regel: `useReducedMotionSafe` statt framers `useReducedMotion`; kein window/document/Math.random/Date im Render (Server-Frame = erstes Client-Frame)
- Vor jedem Commit: npm run build muss durchlaufen
- Nach jeder Änderung: committen und pushen
- Doku im Repo (docs/) als Teil des Tasks aktualisieren, wenn sich was ändert

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
