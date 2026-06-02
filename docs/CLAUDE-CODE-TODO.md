# CLAUDE-CODE-TODO.md – Frontend-Tasks

> Aktuelle Aufgaben für Claude Code, nach Priorität.
> Erledigte Tasks abhaken, neue unten eintragen. Teil jedes Tasks: diese Datei aktuell halten.

---

## Aktiv

(noch keine – Hero-Sektion kommt als nächster Task)

## Backlog (Phase 2 – Reihenfolge)

1. Hero-Sektion: Claim, Unterzeile, 4 animierte Zähler
2. Problem-Sektion: 4 Schmerzpunkte
3. Leistungen: 4 Karten
4. Über mich
5. Prozess: 4 Schritte
6. Projekte: 2 Showcases (Blumen Lang, Naillery) + interaktive Detail-Ansicht
7. Kontakt: Formspree-Formular (VITE_FORMSPREE_ENDPOINT) + direkte Buttons (Mail/WhatsApp/Instagram)
8. Impressum + Datenschutz: Inhalte einfügen (Platzhalter-Seiten + Footer-Links stehen bereits)

## Erledigt

- [x] Infrastruktur-Setup (Repo, Vercel, .gitignore, .env.local, CLAUDE.md, docs/)
- [x] Projekt-Grundgerüst: Vite + React + TS + Tailwind (v4) + Framer Motion + react-router-dom, Ordnerstruktur (components/pages/sections/hooks/lib/data/types), Theme-Toggle (Dark default) über zentrale CSS-Variablen inkl. `--accent`-Platzhalter, Navbar (Logo „LL", Anker-Nav, Toggle, CTA „Projekt anfragen") + Footer (Impressum/Datenschutz/Instagram), Routen `/`, `/impressum`, `/datenschutz` (Platzhalter). `npm run build` läuft.
