# ARBEITSWEISE.md – Wie mit Claude gearbeitet wird

> Projektangepasste Fassung des Kits aus `lngleon/saas-Template` (Stand 01.09.2026).
> Ursprung: Template-Repo; dieses Projekt ist ein statisches Next.js-Frontend ohne
> Supabase, deshalb weichen MCP-Set, Skills und Workflows vom Template ab.
> Die anderen Dateien beschreiben, WAS gilt (Regeln, Architektur, Design) – diese hier,
> WIE gearbeitet wird und WARUM das Setup so aussieht.

## Grundmodell

- Claude Code ist die Hauptarbeitsfläche, das Repo die einzige Wahrheit.
- Der claude.ai-Chat (Project mit GitHub-Sync auf docs/ + CLAUDE.md) ist Denkfläche:
  Architektur, Entscheidungen, Zweitmeinung, Recherche. Er liefert keine Doku-Diffs
  zum Rüberkopieren – Repo-Aufgaben plant Claude Code selbst im Plan Mode.
- Der Sync ins claude.ai-Project ist ein manueller Klick („Sync" im Projektwissen) –
  vor jeder Chat-Session einmal klicken.

## Arbeitsloop pro Feature

Explore → Plan → Implement → Commit.
1. Plan Mode (Shift+Tab) bei allem, was mehrere Dateien ändert oder unklar ist.
   Kleinkram (Tippfehler, Umbenennung, Log-Zeile) direkt ohne Plan.
2. Umsetzen mit Verifikation: `npm run build` vor jedem Commit (CLAUDE.md-Regel),
   bei UI Playwright-Screenshot. Nichts ist „fertig", was nicht geprüft wurde –
   Claude soll Belege zeigen (Build-Output, Screenshot), nicht behaupten.
3. /code-review vor dem Abschluss – Reviewer auf Korrektheit ansetzen, nicht Stil.
4. Commit + Push macht Claude Code; Doku-Update ist Teil des Tasks.
5. /clear zwischen unabhängigen Aufgaben. Nach zwei erfolglosen Korrekturen:
   /clear und mit besserem Prompt neu starten statt weiter nachzubessern.
6. Session-Ende: /session-end. Wiedereinstieg: claude --continue; parallele
   Workstreams mit /rename benennen.

## Design ohne KI-Look

- Basis: docs/DESIGN-WISSEN.md (projektunabhängige Regeln R…/N…/E…/K… plus
  Stilprofile „Expressiv"/„Klassisch") und docs/DESIGN-UMSETZUNG.md (Rezepte für
  React + Tailwind; die Projekt-Notiz am Kopf sagt, welche Abschnitte hier gelten).
  Hex-Werte dort sind Belege aus der Messung, keine Vorgaben.
  docs/DESIGN-SYSTEM.md ist die Projekt-Ebene: Fonts, Farbdisziplin, No-Gos –
  sie wird aus PROJEKT-STAND.md → „Design-Regeln" destilliert (siehe
  CLAUDE-CODE-TODO Punkt 8); bis dahin gilt dieser Abschnitt direkt.
- Dark-only ist hier Projektentscheidung (CLAUDE.md) – kein Light-Mode-Check.
- Prompting: Richtung + Referenzen + explizite No-Gos vorgeben. NICHT pixelgenau
  mikromanagen (Hex-Codes, Paddings) – zu enge Vorgaben machen Ergebnisse
  generischer, nicht besser, weil kein Raum für eigene Entscheidungen bleibt.
- Referenzen schlagen Beschreibungen: Screenshots von Vorbildern direkt in den
  Prompt (Fundgruben: Land-book, Godly, Mobbin).
- Verifikationsloop: /design-review (Screenshots Desktop/Mobil, nur Dark)
  gegen drei Prüfmaßstäbe – DESIGN-SYSTEM.md (bzw. bis dahin PROJEKT-STAND →
  Design-Regeln), DESIGN-WISSEN.md, DESIGN-UMSETZUNG.md; Verstöße mit Regel-ID
  (z. B. „verstößt gegen R6").

## Tool-Entscheidungen (und warum)

- MCP-Set bewusst klein (Context7, Playwright): jeder Server kostet dauerhaft
  Kontext. GitHub läuft über die gh-CLI statt MCP – gleicher Nutzen, kein
  Kontextverbrauch. Kein Supabase-MCP: dieses Projekt hat kein Backend.
- Context7: aktuelle Library-Docs zur Laufzeit – kein Code gegen veraltete APIs.
- Playwright: echter Browser für Screenshots und Klick-Verifikation.
- Secrets: nur .env.local (Formspree-Endpoint). Claude darf .env* weder lesen
  noch schreiben (Deny-Regel in .claude/settings.json) – deshalb legt der User
  .env.local immer selbst an (Vorlage: .env.example). Was Claude nie liest,
  landet nie im Kontext oder in einem Commit.
- Kein Build-/Typecheck-Hook: `next build` dauert hier 30 s+ und wäre nach jedem
  Edit untragbar; selbst `tsc --noEmit` liegt bei ~12 s und käme zusätzlich zum
  Impeccable-Hook (settings.local.json). Die Garantie liefert die CLAUDE.md-Regel
  „vor jedem Commit npm run build".
- CLAUDE.md bleibt bewusst kurz – überlange Dateien führen dazu, dass Regeln
  überlesen werden. Ausführliches lebt in docs/ und wird bei Bedarf gelesen.
- Tailwind v4 scannt Textdateien im Repo als Utility-Quellen: docs/ und
  Root-Markdown sind deshalb per `@source not` in src/app/globals.css vom Scan
  ausgenommen – Klassennamen in Doku-Codebeispielen dürfen die Auslieferung
  nicht verändern.

## Anti-Patterns

1. Kitchen-Sink-Sessions (alles in einem Kontext) → /clear.
2. Endloses Nachkorrigieren → nach zwei Fehlversuchen neu aufsetzen.
3. Doku-Diffs im Chat zum Rüberkopieren → Doku macht Claude Code im Task.
4. Überspezifizierte Prompts (Pixel, Payloads, Step-by-Step) → Ziel + Constraints.
5. MCP-Sammelwut → nur Server behalten, die regelmäßig gebraucht werden.
6. Ergebnisse ohne Verifikation als „fertig" akzeptieren.
