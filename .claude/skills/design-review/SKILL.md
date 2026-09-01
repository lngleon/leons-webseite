---
name: design-review
description: Prüft die laufende App per Playwright-Screenshot gegen docs/DESIGN-SYSTEM.md (Projekt-Prüfmaßstab), docs/DESIGN-WISSEN.md und docs/DESIGN-UMSETZUNG.md. Manuell per /design-review [route] starten.
disable-model-invocation: true
---

# Design-Review

Rolle: kritischer Design-Reviewer. Bewertet die laufende App gegen docs/DESIGN-SYSTEM.md sowie die Regelwerke docs/DESIGN-WISSEN.md und docs/DESIGN-UMSETZUNG.md. Nur Review und Report, keine ungefragte Umsetzung.

## Ablauf

1. **Prüfgrundlage lesen:**
   - **docs/DESIGN-SYSTEM.md** – der Projekt-Prüfmaßstab: Farbdisziplin (§2), Typografie (§3), Abstände (§4), Radien (§5), Bewegung (§6), Sprache (§7), Komponenten-Referenzen (§8), No-Gos (§9), **geschlossene Ausnahmenliste (§10)**, offene Punkte (§11). Lesart in §0: nur „Regel" ist Maßstab, „Bestand (gemessen)" nicht. Profil „Expressiv": E-Regeln gelten, K-Regeln nicht.
   - **docs/DESIGN-WISSEN.md** – projektunabhängige Regeln (R…) und No-Gos (N…, E…).
   - **docs/DESIGN-UMSETZUNG.md** – wie die Regeln im Stack korrekt umgesetzt werden (Projekt-Notiz am Kopf beachten: Next.js, kein shadcn, eigene Tokens).
2. **Dev-Server-URL ermitteln:** läuft bereits ein Dev-Server, diesen nutzen. Sonst den User bitten, `npm run dev` zu starten, und auf Bestätigung warten.
3. **Screenshots via Playwright MCP:** Route aus $ARGUMENTS (Default: `/`) aufrufen und screenshotten – in Desktop- UND Mobile-Viewport. Die Seite ist **dark-only** (Projektentscheidung, CLAUDE.md): kein Light-Mode-Durchgang; taucht dennoch eine helle Fassung auf, ist DAS der Befund.
4. **Bewerten** gegen drei Maßstäbe:
   - **DESIGN-SYSTEM.md:** Regeln F…/T…/A…/M…/S… eingehalten? Insbesondere Token-Disziplin (keine Farbwerte im Code außer §10), Gradient nur an den F4-Stellen, Glow-Lesart F13 (Dauer-Glows zählen, Hover nicht), Eyebrow-Reichweite T2. Was in §10 steht, ist kein Befund – was dort nicht steht, schon. Abweichungen, die bereits in §11.3 stehen, als „bekannt (B-Nr.)" führen, nicht als neuen Befund; Größen aus „Bestand (gemessen)" sind kein Maßstab.
   - **DESIGN-WISSEN.md:** Regeln (R…) und No-Gos (N…, E…) eingehalten? Darunter fallen auch die typischen KI-Muster (Systemfonts als Identität, austauschbare Gradients, gleichförmige Card-Raster, fehlende Hierarchie). Schriftfamilie: solange TODO 9 offen ist, auf TODO 9 verweisen statt R6/N1 als Befund zu führen.
   - **DESIGN-UMSETZUNG.md:** Umsetzung im Stack korrekt (Fonts, Tokens, Komponenten-Muster)?
5. **Report:** maximal 5 konkrete Befunde mit Fix-Vorschlag, priorisiert. Jeder Befund nennt seine Regel-ID – aus DESIGN-SYSTEM (z. B. „verstößt gegen F4") oder DESIGN-WISSEN (z. B. „verstößt gegen R6"). Umgesetzt wird nur, was der User bestätigt.
