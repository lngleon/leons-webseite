# CLAUDE-CODE-TODO.md – Frontend-Tasks

> Aktuelle Aufgaben für Claude Code, nach Priorität.
> Erledigte Tasks abhaken, neue unten eintragen. Teil jedes Tasks: diese Datei aktuell halten.

---

## Aktiv

- [ ] Über mich: persönliche Vorstellung (Story/Positionierung „premium, aber nahbar"). `SectionHeading` für die Überschrift, gleicher Spacing-Rhythmus wie bestehende Sektionen, Dark + Light, responsive, Akzent nur über `--accent`.

## Backlog (Phase 2 – Reihenfolge)

1. Prozess: 4 Schritte
2. Projekte: 2 Showcases (Blumen Lang, Naillery) + interaktive Detail-Ansicht
3. Kontakt: Formspree-Formular (VITE_FORMSPREE_ENDPOINT) + direkte Buttons (Mail/WhatsApp/Instagram)
4. Impressum + Datenschutz: Inhalte einfügen (Platzhalter-Seiten + Footer-Links stehen bereits)

## Erledigt

- [x] Infrastruktur-Setup (Repo, Vercel, .gitignore, .env.local, CLAUDE.md, docs/)
- [x] Projekt-Grundgerüst: Vite + React + TS + Tailwind (v4) + Framer Motion + react-router-dom, Ordnerstruktur (components/pages/sections/hooks/lib/data/types), Theme-Toggle (Dark default) über zentrale CSS-Variablen inkl. `--accent`-Platzhalter, Navbar (Logo „LL", Anker-Nav, Toggle, CTA „Projekt anfragen") + Footer (Impressum/Datenschutz/Instagram), Routen `/`, `/impressum`, `/datenschutz` (Platzhalter). `npm run build` läuft.
- [x] Hero-Sektion: volle Höhe, Headline („Veränderungen, die spürbar werden.") + Unterzeile, 4 Zähler die beim Sichtbarwerden hochzählen (2 · 3 · 100 % · 1, mit „%"-Suffix; „Person, voller Stack" als Label), CTA „Projekt anfragen" → `#kontakt`. Dark + Light, responsive, Akzent nur über `--accent`, Framer Motion subtil (Stagger-Einblendung, reduced-motion-sicher). `npm run build` läuft.
- [x] Problem-Sektion: Überschrift „Kommt dir das bekannt vor?", 4 Schmerzpunkt-Karten (Titel + ein Satz, je mit dezentem Icon). Dark + Light, responsive (Mobil 1 Spalte, ab `md` 2 Spalten), Akzent nur über `--accent`, Framer Motion subtil (Fade-up + Stagger beim Scrollen). Wiederverwendbare `SectionHeading`-Komponente angelegt. `npm run build` läuft.
- [x] Feinschliff Problem-Karten: wiederverwendbares `Card`-Hover-Muster (`src/components/Card.tsx`) – dezentes Anheben + Akzent-Rand + weicher Glow, smooth (~200 ms), touch-sicher (`@media (hover: hover)`) + `motion-safe`. `npm run build` läuft.
- [x] Leistungen-Sektion: Überschrift „Das baue ich für dich." + Unterzeile, 4 Karten im 2×2-Grid (mobil 1 Spalte), Rhythmus wie Problem-Sektion. `Card` + `SectionHeading` wiederverwendet, je Karte ein dezentes Icon. Karte 4 (KI-Integration) als Highlight via neuer `highlight`-Prop (Akzent dauerhaft aktiv, kein Badge). Dark + Light, responsive, Akzent nur über `--accent`. `npm run build` läuft.
