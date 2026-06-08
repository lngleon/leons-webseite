# CLAUDE-CODE-TODO.md – Frontend-Tasks

> Aktuelle Aufgaben für Claude Code, nach Priorität.
> Erledigte Tasks abhaken, neue unten eintragen. Teil jedes Tasks: diese Datei aktuell halten.

---

## Aktiv

- [ ] Projekte: 2 Showcases (Blumen Lang, Naillery) + interaktive Detail-Ansicht. `SectionHeading` für die Überschrift, `Card`-Muster wo sinnvoll, gleicher Spacing-Rhythmus wie bestehende Sektionen, Dark + Light, responsive, Akzent nur über `--accent`. Live-Links als änderbare Felder im Data-Layer (siehe CURRENT-SCHEMA: Blumen Lang / Naillery).

## Backlog (Phase 2 – Reihenfolge)

1. Impressum + Datenschutz: Inhalte einfügen (Platzhalter-Seiten + Footer-Links stehen bereits)

## Erledigt

- [x] Infrastruktur-Setup (Repo, Vercel, .gitignore, .env.local, CLAUDE.md, docs/)
- [x] Projekt-Grundgerüst: Vite + React + TS + Tailwind (v4) + Framer Motion + react-router-dom, Ordnerstruktur (components/pages/sections/hooks/lib/data/types), Theme-Toggle (Dark default) über zentrale CSS-Variablen inkl. `--accent`-Platzhalter, Navbar (Logo „LL", Anker-Nav, Toggle, CTA „Projekt anfragen") + Footer (Impressum/Datenschutz/Instagram), Routen `/`, `/impressum`, `/datenschutz` (Platzhalter). `npm run build` läuft.
- [x] Hero-Sektion: volle Höhe, Headline („Veränderungen, die spürbar werden.") + Unterzeile, 4 Zähler die beim Sichtbarwerden hochzählen (2 · 3 · 100 % · 1, mit „%"-Suffix; „Person, voller Stack" als Label), CTA „Projekt anfragen" → `#kontakt`. Dark + Light, responsive, Akzent nur über `--accent`, Framer Motion subtil (Stagger-Einblendung, reduced-motion-sicher). `npm run build` läuft.
- [x] Problem-Sektion: Überschrift „Kommt dir das bekannt vor?", 4 Schmerzpunkt-Karten (Titel + ein Satz, je mit dezentem Icon). Dark + Light, responsive (Mobil 1 Spalte, ab `md` 2 Spalten), Akzent nur über `--accent`, Framer Motion subtil (Fade-up + Stagger beim Scrollen). Wiederverwendbare `SectionHeading`-Komponente angelegt. `npm run build` läuft.
- [x] Feinschliff Problem-Karten: wiederverwendbares `Card`-Hover-Muster (`src/components/Card.tsx`) – dezentes Anheben + Akzent-Rand + weicher Glow, smooth (~200 ms), touch-sicher (`@media (hover: hover)`) + `motion-safe`. `npm run build` läuft.
- [x] Leistungen-Sektion: Überschrift „Das baue ich für dich." + Unterzeile, 4 Karten im 2×2-Grid (mobil 1 Spalte), Rhythmus wie Problem-Sektion. `Card` + `SectionHeading` wiederverwendet, je Karte ein dezentes Icon. Karte 4 (KI-Integration) als Highlight via neuer `highlight`-Prop (Akzent dauerhaft aktiv, kein Badge). Dark + Light, responsive, Akzent nur über `--accent`. `npm run build` läuft.
- [x] „Über mich"-Sektion: zweispaltiges Layout (Foto-Platzhalter links / Text rechts, mobil gestapelt mit Foto oben), `id="ueber-mich"`. Eyebrow + Überschrift via `SectionHeading`, 3 Absätze. Porträt-Platzhalter als gerahmte Hülle im Hochformat (4∶5), Initialen „LL" + „Porträt folgt", bereit für echtes Bild in Phase 3. Dark + Light, responsive, Akzent nur über `--accent`, Fade-up beim Scrollen. `npm run build` läuft.
- [x] „Prozess"-Sektion: 4 nummerierte Schritte als sichtbare Abfolge 1→4 (`<ol>`/`<li>`-Stepper, kein loses Card-Grid), `id="prozess"`. Verbindungslinie zwischen den Schritten: Desktop horizontal, Mobil vertikal. Akzent-getönte Nummern, Linie baut sich progressiv auf (Stagger), reduced-motion-sicher. Überschrift „So entsteht dein Projekt." + Unterzeile via `SectionHeading`, Content im Data-Layer (`src/data/process.ts`). Dark + Light, responsive, Akzent nur über `--accent`. `npm run build` läuft.
- [x] „Kontakt"-Sektion: zweispaltig (Formular links / „Lieber direkt?" + 3 Buttons rechts, mobil gestapelt mit Formular oben), `id="kontakt"`. Formspree-Versand (`VITE_FORMSPREE_ENDPOINT`) mit State-Machine idle→sending→success/error, Client-Validierung (Pflichtfelder + E-Mail), Erfolg leert das Formular. Direkte Buttons: Mail/WhatsApp/Instagram (geteilte `BrandIcons`, Footer darauf umgestellt). `--destructive`-Token (beide Modes) für Fehler. a11y-Härtung nach adversariellem Review: Fokus springt zum ersten Fehlerfeld, Fokus ins Erfolgs-Panel, Doppelsende-Guard, Placeholder-Kontrast. Dark + Light, responsive, Akzent nur über `--accent`, Fade-up. `npm run build` läuft.
- [x] Finale Akzentfarbe (Violett): Platzhalter #c8a96a über die zentralen CSS-Variablen ersetzt (nichts hardcoden). Per-Mode-Tokens `--accent` (Dark #a78bfa / Light #6d28d9) + neues `--accent-solid` für gefüllte Buttons (Dark #6d4dff / Light #6d28d9, weiße Schrift); 4 Buttons auf `bg-accent-solid`. Light-Mode-Kontrast-Bug geschlossen (Akzent-als-Text + Fokusring ~7.1:1, ≥ WCAG AA), verifiziert. `npm run build` läuft.
