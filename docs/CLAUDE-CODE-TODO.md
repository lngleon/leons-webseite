# CLAUDE-CODE-TODO.md – Frontend-Tasks

> Aktuelle Aufgaben für Claude Code, nach Priorität.
> Erledigte Tasks abhaken, neue unten eintragen. Teil jedes Tasks: diese Datei aktuell halten.

---

## Aktiv

(noch keine – Problem-Sektion kommt als nächster Task)

## Backlog (Phase 2 – Reihenfolge)

1. Problem-Sektion: 4 Schmerzpunkte
2. Leistungen: 4 Karten
3. Über mich
4. Prozess: 4 Schritte
5. Projekte: 2 Showcases (Blumen Lang, Naillery) + interaktive Detail-Ansicht
6. Kontakt: Formspree-Formular (VITE_FORMSPREE_ENDPOINT) + direkte Buttons (Mail/WhatsApp/Instagram)
7. Impressum + Datenschutz: Inhalte einfügen (Platzhalter-Seiten + Footer-Links stehen bereits)

## Erledigt

- [x] Infrastruktur-Setup (Repo, Vercel, .gitignore, .env.local, CLAUDE.md, docs/)
- [x] Projekt-Grundgerüst: Vite + React + TS + Tailwind (v4) + Framer Motion + react-router-dom, Ordnerstruktur (components/pages/sections/hooks/lib/data/types), Theme-Toggle (Dark default) über zentrale CSS-Variablen inkl. `--accent`-Platzhalter, Navbar (Logo „LL", Anker-Nav, Toggle, CTA „Projekt anfragen") + Footer (Impressum/Datenschutz/Instagram), Routen `/`, `/impressum`, `/datenschutz` (Platzhalter). `npm run build` läuft.
- [x] Hero-Sektion: volle Höhe, Headline („Veränderungen, die spürbar werden.") + Unterzeile, 4 Zähler die beim Sichtbarwerden hochzählen (2 · 3 · 100 % · 1, mit „%"-Suffix; „Person, voller Stack" als Label), CTA „Projekt anfragen" → `#kontakt`. Dark + Light, responsive, Akzent nur über `--accent`, Framer Motion subtil (Stagger-Einblendung, reduced-motion-sicher). `npm run build` läuft.
