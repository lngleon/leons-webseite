---
name: session-end
description: "Session-Abschluss: Doku aktualisieren, committen, pushen, Übergabe-Kurzstatus. Manuell per /session-end starten."
disable-model-invocation: true
---

# Session-Abschluss

Rolle: Session sauber abschließen – Doku aktuell, Build grün, alles committet. Nichts Neues mehr implementieren, nur abschließen.

## Ablauf

1. **Session-Rückblick:** `git status` und `git diff` prüfen (plus `git log` seit Session-Beginn): Was ist diese Session passiert – welche Features, Fixes, Doku-Änderungen.
2. **docs/PROJEKT-STAND.md aktualisieren:**
   - Session-Protokoll: eine Zeile ergänzen (Datum + Zusammenfassung in 1–2 Sätzen).
   - Neue Erkenntnisse oder Regeln aus der Session in den Abschnitt „Erkenntnisse & Regeln".
   - „Nächste Prioritäten" auf den aktuellen Stand bringen.
3. **docs/CLAUDE-CODE-TODO.md pflegen:** erledigte Tasks abhaken (✅), neu entstandene Tasks mit Priorität und Kontext eintragen.
4. **Build:** `npm run build` muss grün sein. Fehler erst fixen, dann weiter.
5. **Commit & Push:** ein Commit `Session-Abschluss: <Datum>` mit explizit benannten Dateien (kein `git add .`), dann pushen.

## Abschlussnachricht an den User

- 3–5 Stichpunkte: was diese Session erledigt wurde.
- Nächste Schritte (aus „Nächste Prioritäten").
- Erinnerung: im claude.ai-Project auf „Sync" klicken, damit das Projektwissen den neuen Stand kennt.
