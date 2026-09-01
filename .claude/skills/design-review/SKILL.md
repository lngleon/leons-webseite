---
name: design-review
description: Prüft die laufende App per Playwright-Screenshot gegen docs/DESIGN-SYSTEM.md, docs/DESIGN-WISSEN.md und docs/DESIGN-UMSETZUNG.md. Manuell per /design-review [route] starten.
disable-model-invocation: true
---

# Design-Review

Rolle: kritischer Design-Reviewer. Bewertet die laufende App gegen docs/DESIGN-SYSTEM.md sowie die Regelwerke docs/DESIGN-WISSEN.md und docs/DESIGN-UMSETZUNG.md. Nur Review und Report, keine ungefragte Umsetzung.

## Ablauf

1. **Prüfgrundlage lesen:**
   - **docs/DESIGN-SYSTEM.md** – projektspezifisch: Farbwelt, Typografie, Abstände, No-Gos. **Solange die Datei nicht existiert** (Destillat steht als Punkt 8 in CLAUDE-CODE-TODO.md aus), gilt stattdessen docs/PROJEKT-STAND.md → Abschnitt „Design-Regeln" als Projekt-Maßstab.
   - **docs/DESIGN-WISSEN.md** – projektunabhängige Regeln (R…) und No-Gos (N…, E…, K…).
   - **docs/DESIGN-UMSETZUNG.md** – wie die Regeln im Stack korrekt umgesetzt werden (Projekt-Notiz am Kopf beachten: Next.js, kein shadcn, eigene Tokens).
2. **Dev-Server-URL ermitteln:** läuft bereits ein Dev-Server, diesen nutzen. Sonst den User bitten, `npm run dev` zu starten, und auf Bestätigung warten.
3. **Screenshots via Playwright MCP:** Route aus $ARGUMENTS (Default: `/`) aufrufen und screenshotten – in Desktop- UND Mobile-Viewport. Die Seite ist **dark-only** (Projektentscheidung, CLAUDE.md): kein Light-Mode-Durchgang; taucht dennoch eine helle Fassung auf, ist DAS der Befund.
4. **Bewerten** gegen drei Maßstäbe:
   - **DESIGN-SYSTEM.md** (bzw. PROJEKT-STAND → „Design-Regeln"): Farben, Typografie, Abstände, Akzent-Disziplin (`--accent`/`--accent-gradient`, keine hardgecodeten Farbwerte), No-Gos eingehalten?
   - **DESIGN-WISSEN.md:** Regeln (R…) und No-Gos (N…, E…, K…) eingehalten? Darunter fallen auch die typischen KI-Muster (Systemfonts als Identität, austauschbare Gradients, gleichförmige Card-Raster, fehlende Hierarchie).
   - **DESIGN-UMSETZUNG.md:** Umsetzung im Stack korrekt (Fonts, Tokens, Komponenten-Muster)?
5. **Report:** maximal 5 konkrete Befunde mit Fix-Vorschlag, priorisiert. Jeder Verstoß gegen DESIGN-WISSEN/DESIGN-UMSETZUNG wird mit seiner Regel-ID benannt (z. B. „verstößt gegen R6"). Umgesetzt wird nur, was der User bestätigt.
