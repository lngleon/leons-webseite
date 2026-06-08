# CURRENT-SCHEMA.md – Architektur & Datenfluss

> Letzte Aktualisierung: 08.06.2026
> **Kein Backend, keine Datenbank.** Dieses Projekt ist eine reine Frontend-Website.
> Diese Datei dokumentiert daher KEIN DB-Schema, sondern die Architektur, die externen Dienste und den Datenfluss.
>
> ⚠️ Diese Datei ist die EINZIGE Wahrheit für Architektur & externe Dienste.
> Nach jeder Änderung an externen Diensten oder Datenfluss: Claude Code aktualisiert diese Datei (Repo `docs/`), danach Projektdatei im Claude Project austauschen.

---

## Architektur-Überblick

```
Besucher (Browser)
      │
      ▼
React-Single-Page (gehostet auf Vercel)
      │
      ├─ statische Inhalte (im Code / public/)
      │
      └─ Kontaktformular ──HTTP POST──▶ Formspree (extern)
                                            │
                                            ▼
                                   E-Mail an Leon
```

- **Typ:** Reine Frontend-Anwendung (Static Site / SPA), keine serverseitige Logik.
- **Hosting:** Vercel, Auto-Deploy bei Push auf `main`.
- **Kein Supabase, keine Datenbank, keine RLS, keine Migrations, keine Edge Functions, keine pg_cron Jobs.**
- **Einziger externer Dienst:** Formspree (nimmt das Kontaktformular entgegen).

---

## Externe Dienste

### Formspree
- **Zweck:** Nimmt die Daten des Kontaktformulars per HTTP POST entgegen und leitet sie als E-Mail weiter.
- **Empfänger:** `leonlang95@gmail.com` (später auf professionelle Adresse änderbar)
- **Account:** noch anzulegen (Phase 1)
- **Endpoint/Form-ID:** ⬜ wird beim Setup erzeugt und im Frontend hinterlegt (z.B. via `.env` / Konstante)
- **Tarif:** kostenloser Free-Tier (ausreichend für erwartetes Anfragevolumen)
- **Sichtbar für Besucher?** Nein – Formspree taucht im UI nicht auf, das Formular gehört optisch komplett der Seite.
- **Späterer Wechsel:** optionaler Umstieg auf Resend + Vercel Serverless Function, sobald eigene Domain steht (für Absender über eigene Domain). Aktuell nicht umgesetzt.

---

## Datenfluss

### Kontaktformular (Variante A)
1. Besucher füllt Felder aus: **Name**, **E-Mail**, **Nachricht** (ggf. weitere optionale Felder).
2. Klick auf „Senden" → Frontend sendet HTTP POST an den Formspree-Endpoint.
3. Formspree verarbeitet und sendet E-Mail an Leon.
4. Frontend zeigt Erfolgs- bzw. Fehlermeldung an.
5. **Es werden KEINE Daten in einer eigenen Datenbank gespeichert.**

### Direkte Kontaktwege (Variante B)
- **E-Mail-Button** → öffnet `mailto:leonlang95@gmail.com`
- **WhatsApp-Button** → öffnet `https://wa.me/4917648072158`
- **Instagram-Button** → öffnet `https://instagram.com/leon.vln`

---

## Frontend-Datenstruktur (statische Inhalte)

Inhalte liegen als Konstanten/Daten im Code (kein CMS, keine DB). Empfohlene logische Struktur (Claude Code entscheidet konkrete Umsetzung anhand der Repo-Conventions):

### Leistungen (4)
| Leistung | Reihenfolge |
|----------|-------------|
| Webseiten | 1 (Kerngeschäft) |
| Web-Apps & Tools | 2 |
| Redesign & Modernisierung | 3 |
| KI-Integration | 4 (Highlight) |

### Hero-Zähler (4)
| Wert | Label |
|------|-------|
| 2 | Live-Projekte |
| 3 | Tools entwickelt |
| 100 % | individuell programmiert |
| 1 | Person, voller Stack |

### Problem-Schmerzpunkte (4)
1. Keine oder veraltete Webseite
2. Unsichtbar im Netz
3. Wirkt unprofessionell
4. Teure Agenturen

### Prozess-Schritte (4)
1. Kennenlernen & Idee
2. Konzept & Design
3. Umsetzung
4. Launch & Betreuung

### Projekte (2 Showcases)
| Feld | Projekt 1 | Projekt 2 |
|------|-----------|-----------|
| Name | Blumen Lang | Naillery |
| Typ | Webseite (Blumengroßhändler) | SaaS-Plattform (Nagelstudios) |
| Kurzbeschreibung | Von veralteter, kaum auffindbarer Seite zu modernem, professionellem Auftritt | Eigene Plattform: Buchungsflow, Stripe-Zahlungen, Studio-Webseiten, KI-Designgenerator (projiziert Wunsch-Design auf Foto der Hände) |
| Live-Link (aktuell) | https://blumen-lang-start.vercel.app/ | https://naillery-v2.vercel.app/ |
| Live-Link (später) | https://blumen-lang.de/ | https://naillery.com/ |
| Detail-Ansicht | ja (interaktiv beim Klick) | ja (interaktiv beim Klick) |

> Live-Links sind als änderbare Felder zu führen, damit der User später auf die finalen Domains umstellen kann.

---

## Statische Assets

| Asset | Status | Ablage |
|-------|--------|--------|
| Logo „LL" (hell) | ⬜ noch zu erstellen | `public/` |
| Logo „LL" (dunkel) | ⬜ noch zu erstellen | `public/` |
| Favicon | 🔄 Platzhalter vorhanden (`public/favicon.svg`, „LL"-Monogramm) | `public/` |
| Projekt-Bilder | ⬜ | `public/` |
| Optionale Bewegtbild-/Glow-Elemente | ⬜ optional | code-basiert bevorzugt |

---

## Theming (Dark-only + Violett-Gradient-Akzent)

- **Modus:** Dark-only (kein Light Mode, kein Theme-Toggle; 08.06.2026 umgestellt). EIN Token-Satz in `:root`, `color-scheme: dark`, `<html>` ohne Klasse. NIEMALS Farbwerte hardcoden.
- **Basis-Palette:** edel-zurückhaltend, Near-Black/Weiß/Grau (`--background` #0a0a0a, `--card` #111113, `--foreground` #fafafa, `--muted-foreground` #a1a1aa, `--border` #27272a).
- **Flacher Akzent** (Ränder, Icons, kleine UI, Fokusring via `--ring` – nie Gradient): `--accent` `#a78bfa`, `--accent-solid` `#6d4dff`, `--accent-foreground` `#ffffff`.
- **Violett-Gradient** (Source-of-Truth, NUR auf Showcase-Flächen):
  - `--accent-gradient` `linear-gradient(135deg,#c4b5fd,#a78bfa,#7c5cff)` – Text-Clip (Headline-Akzentwörter, 4 Hero-Zahlen, Sektions-Eyebrow) auf Near-Black, mit solidem Fallback (`var(--accent)`, nie unsichtbar).
  - `--accent-gradient-strong` `linear-gradient(135deg,#6d4dff,#6d28d9)` – Füllung primärer CTAs; weiße Schrift ≥4.5:1 über den ganzen Verlauf (verifiziert min. 5.05:1).
- Helper-Klassen in `src/index.css`: `.accent-gradient-text` (Text-Clip + `@supports`-Fallback), `.cta-gradient` (CTA-Füllung). Body-Text/normale Headlines bleiben flach.

---

## Routen

| Route | Inhalt |
|-------|--------|
| `/` | Single-Page (alle 7 Sektionen) |
| `/impressum` | Impressum (Platzhalter, Inhalt vom User) |
| `/datenschutz` | Datenschutzerklärung (Platzhalter, Inhalt vom User) |

---

## Aktualisierungs-Anleitung

Nach jeder Änderung an Architektur, externen Diensten oder Datenfluss:
1. Claude Code aktualisiert diese Datei im Repo (`docs/CURRENT-SCHEMA.md`) als Teil des Tasks.
2. Projektdatei im Claude Project manuell austauschen (Copy-Paste aus `docs/`).

> Hinweis: Da kein DB-Schema existiert, entfallen die klassischen Zähler (Tabellen, Enums, RLS, Trigger etc.). Stattdessen werden externe Dienste und Datenfluss gepflegt.
