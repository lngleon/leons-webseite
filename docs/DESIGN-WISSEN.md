# DESIGN-WISSEN

Neutrale Regelsammlung für Web-Oberflächen, abgeleitet aus einer Messung von 10 Live-Seiten
(Playwright, Desktop 1440×900 + Mobile 390×844, Screenshots + Computed Styles).
Gilt projektunabhängig. **Alle Hex-Werte sind Belege, keine Vorgaben.** Übernommen werden
Verhältnisse, Korridore und Muster – nie die Marke.

**Regel-IDs sind stabil.** Neue Regeln erhalten die nächste freie Nummer, bestehende werden nie
umnummeriert, entfallende hinterlassen einen Verweis. Dasselbe gilt für die No-Go-Kennungen
N…, E… und K…. Nur so bleiben Verweise aus anderen Dokumenten, Reviews und Tickets gültig.
Eine neue Regel gehört also thematisch in ihren Abschnitt, trägt aber die nächste freie Nummer –
die Nummernfolge innerhalb eines Abschnitts darf Lücken und Sprünge haben.

## Datenbasis

**Gruppe A – Craft-Benchmark (expressiv/modern)**

| Kürzel | Seite | Erfasst |
|---|---|---|
| A1 | haoqi.design | ✅ Desktop + Mobile |
| A2 | adrianziegler.de | ✅ Desktop + Mobile |
| A3 | amphora-it.com | ✅ Desktop + Mobile |
| A4 | farisschmidt.de | ✅ Desktop + Mobile |
| A5 | xtrakt-media.de | ✅ Desktop + Mobile |

**Gruppe B – Register-Benchmark (klassisch/reduziert)**

| Kürzel | Seite | Erfasst |
|---|---|---|
| B1 | wuerzburger-hofbraeu.de | ✅ Desktop + Mobile |
| B2 | beef800.de | ✅ Desktop + Mobile |
| B3 | wohner-pfeiffer.de | ✅ Desktop + Mobile |
| B4 | steinburg.com | ✅ Desktop + Mobile |
| B5 | stein-welten.com | ✅ Desktop + Mobile |

**Keine Seite war blockiert oder unerreichbar** (alle HTTP 200). Zwei Seiten waren erst nach
Interaktion messbar und wurden entsprechend behandelt:

- **B1** blendet vor dem Inhalt einen Altersnachweis („Ja, ich bin bereits 16 Jahre alt") ein –
  ohne Klick ist der Hero nicht erreichbar. Erste Messung lief gegen die Gate-Seite und wurde verworfen.
- **A5** blendet ein modales Consent-Fenster über die volle Herofläche ein (Borlabs) – erst nach
  Zustimmung sichtbar.

Einschränkung: A1 ist eine Canvas-/WebGL-Erfahrung mit fixer Viewporthöhe (kein DOM-Sektionsbaum),
A3 und A2 blenden Inhalte scroll-abhängig ein – Zwischenscroll-Screenshots zeigen dort teils leere
Flächen. Beides ist in den Regeln als Befund vermerkt, nicht als Messfehler.

---

## 1. Universelle Kernregeln

Regeln, die in **beiden** Gruppen messbar gelten. Zahlenkorridore sind aus den 10 Seiten
abgeleitet; die Belege nennen jeweils die extremsten oder klarsten Fälle.

### 1.1 Farblogik

| Regel | Korridor |
|---|---|
| Genau **eine** dominante Grundfläche | ≥ 70 % der eingefärbten Fläche |
| Textfarben insgesamt | 2–4 (1 Haupt-, 1–3 Sekundärtöne) |
| Akzentfarben für Interaktion | **genau 1** |
| Zusätzliche Farben nur für Kategorie/Status | max. 3, je < 5 % der Fläche |
| Reinschwarz auf Reinweiß | nie |

**R1 – Eine Grundfläche trägt die Seite.** Nicht drei gleichwertige Hintergründe, sondern eine
Fläche und darauf gesetzte Ausnahmen.
*Beleg:* A3 – eine Fläche deckt praktisch die gesamte Seite (`#050505`, Flächenwert 77 388 von
~85 000). B5 – Weiß mit Flächenwert 13 013 von ~15 000, alles andere sind Bänder.

**R2 – Nie Reinschwarz auf Reinweiß.** Beide Pole werden um 2–8 % gebrochen, meist in Richtung
warm oder blau.
*Beleg:* A4 `#fafafa` / Text `#0d0f32`; A1 `#fbfaf4` / Text schwarz auf gebrochenem Weiß;
B4 Sand `#e4e1cb` / Text `#2f2e2c`; B5 Weiß / Text `#21202e`.

**R3 – Eine Akzentfarbe für alle Handlungen.** Buttons, Links, aktive Zustände teilen sich einen
Ton. Weitere Farben dürfen existieren, aber nur als Kategorie- oder Statuscode.
*Beleg:* B3 nutzt genau einen Akzent für 100 % aller Buttons (Türkis, 26 Textvorkommen + Flächen);
B5 ebenso (Weinrot, 234 Textvorkommen). A3 hat 4 Zusatzfarben – aber ausschließlich als
Kategorie-Badges (je 15–19 Vorkommen), die Buttons bleiben einfarbig dunkel.

**R4 – Sekundärtext ist eine eigene definierte Farbe, keine Opacity-Improvisation.**
*Beleg:* A4 Haupttext 649 Vorkommen, zwei feste Grautöne 87 + 52 Vorkommen. B4 Haupttext
68 Vorkommen, warmes Grau 62 Vorkommen – ein sauberes 2-Ton-System.

**R5 – Farbige Flächen sind Bänder, keine Streuung.** Der Akzent erscheint als
Vollbreiten-Abschnitt (max. 1–2 pro Seite) plus auf Bedienelementen.
*Beleg:* B5 Weinrot-Band nur für Newsletter/Utility-Leiste; B4 Weinrot-Band nur für den
Newsletter-Abschnitt (Flächenwert 350 gegenüber 2 246 für die Sandfläche).

### 1.2 Typo-Kontrast + Skalenkorridore

| Regel | Korridor |
|---|---|
| Schriftfamilien | max. 2 (+ 1 dekorative Akzentschrift, ≤ 3 Einsätze) |
| Fließtext Desktop | 16–20 px |
| Fließtext Mobile | 14–19 px |
| Zeilenhöhe Fließtext | 1.45–1.70 |
| Zeilenhöhe Display | 0.88–1.20 |
| Verhältnis H1 : Fließtext | 2.5–5× (expressiv bis 10×) |
| Stufen in der Skala | 6–8 |
| Schrittfaktor benachbarter Stufen | 1.20–1.35 (klein), 1.5–2.0 (Body → Display) |
| Tracking ab 40 px | −1 % bis −3.5 % |
| Tracking Versal-Label ≤ 14 px | +5 % bis +14 % |
| Tracking Fließtext | ±0.03 em |

**R6 – Zwei Familien, mit hörbarem Stimmenunterschied.** Nicht zwei ähnliche Sans, sondern
Grotesk + Mono oder Sans + Serif. Die dritte Schrift ist Dekoration und kommt maximal dreimal vor.
*Beleg:* A1 Grotesk + Mono (Labels durchgehend Mono, uppercase); A4 Neo-Grotesk + kursive Serif,
letztere nur für das Akzentwort im Headline-Satz; B2 Condensed-Versalien + Serif-Fließtext.
Gegenprobe: B3 und B5 kommen mit **einer** Familie aus – funktioniert, weil Gewicht (200–800)
und Versalien den Kontrast liefern.

**R7 – Display und Fließtext dürfen sich in der Zeilenhöhe nicht überschneiden.**
Display 0.88–1.2, Fließtext ab 1.45. Dazwischen liegt kein Wert.
*Beleg:* A2 H1 164 px auf 144 px Zeilenhöhe (0.88), Fließtext 16/25 (1.56).
B1 H1 52/62 (1.19), Fließtext 20/30 (1.50).

**R8 – Große Schrift wird enger, kleine Versalien werden weiter.** Das ist die Kernmechanik des
Typo-Kontrasts und gilt in beiden Gruppen – nur die Richtung des Display-Trackings dreht sich
(siehe Profile).
*Beleg negativ (modern):* A2 H1 −4.92 px auf 164 px = −3.0 %; A4 H1 −2 px auf 58 px = −3.4 %;
A3 H1 −1.76 px auf 70 px = −2.5 %.
*Beleg positiv (Versal-Label):* A2 Mono-Label 9 px / +1.26 px = +14 %; B2 Label 14 px / +1.25 px
= +8.9 %; B4 Label 13 px / +1.16 px = +8.9 %.

**R9 – Der Sprung von Fließtext zu H1 liegt zwischen 2.5× und 5×.** Darüber wird die Headline
zum Bildelement (dann sind auch 6–10× richtig, aber nur als bewusste Grafik).
*Beleg:* B5 32/18 = 1.8× – **unterhalb** des Korridors; die Seite wirkt dadurch sehr ruhig, aber
die Hierarchie trägt nur, weil zusätzlich Versal-Kicker und Gewicht 800 den Unterschied machen ·
B1 52/20 = 2.6× · B3 53/16 = 3.3× ·
A4 58/18 = 3.2× · A3 70/18 = 3.9× · B2 75/16 = 4.7× · B4 86/18 = 4.8× · A1 98/16 = 6.1× ·
A2 164/16 = 10.3× (dort ist die Headline eine Outline-Grafik, kein Satz).

**R10 – 6 bis 8 Größen für die ganze Seite.** Mehr ist keine Skala, sondern Zufall.
*Beleg:* A4 {58, 52, 32, 24, 20, 18, 16, 14}; B4 {86, 68, 30, 20, 18, 14, 13};
B5 {32, 24, 18, 16, 14, 12}.

**R11 – Mobile ist eine Kompression der Skala, kein anderes System.** Display schrumpft auf
50–70 %, Fließtext auf 85–100 %, alles andere bleibt.
*Beleg:* B4 86 → 43 px (exakt 0.50) · B2 75 → 44 (0.59) · A5 68 → 41 (0.60) ·
A4 58 → 32 (0.55) · B3 53 → 33 (0.62). Ausreißer nach unten nur bei reiner Display-Grafik:
A1 98 → 28 (0.29). Mobile-H1 landet dadurch immer bei **24–48 px**.

### 1.3 Sektionsskelett

| Regel | Korridor |
|---|---|
| Sektionen pro Startseite | 6–12 |
| Höhe einer Standardsektion (Desktop) | 400–1200 px (≈ 0.5–1.3 Viewports) |
| Hero-Höhe | 0.75–1.0 × Viewport, nie mehr |
| Elemente pro Aufzählungsgruppe | 3–6 |
| Seitenlänge Mobile ggü. Desktop | +25 % bis +50 % |

**R12 – Jede Sektion folgt demselben Bauplan.** Kicker → H2 → ein Führungssatz → Gruppe aus 3–6
gleichartigen Elementen → höchstens ein CTA. Die Wiederholung ist der Rhythmus; Abweichung ist
Betonung.
*Beleg:* A2 „01 // KOMMT DIR DAS BEKANNT VOR?" → H2 → 6 nummerierte Karten; identisch bei
02…08. B5 „STEINWELTEN" (Versal-Kicker) → 32-px-Aussage → Absatz → ein Button; identisch bei
PRODUKTE, NACHHALTIG, AKTUELLES, KONTAKT.

**R13 – Der Kicker ist ein eigenes Typo-Element, nicht kleine Headline.** Versalien, Tracking
+5…+14 %, 9–16 px, Akzent- oder Sekundärfarbe, oft nummeriert.
*Beleg:* A2 Mono 9–13 px, uppercase, Akzentblau, mit laufender Nummer. B4 „EINBLICKE" /
„KULTUR" / „BRUNCH" als Versal-Kategorie über Karten. B5 Kicker sind sogar als `h1` ausgezeichnet,
16 px, uppercase, +0.8 px – optisch eindeutig Kicker.

**R14 – Sektionshöhen bleiben in einem engen Band, Ausreißer sind bewusst.**
*Beleg:* A4 819 / 869 / 1020 / 1024 / 1338 px – und ein bewusster Ausreißer 2 194 px für
Testimonials. A3 573 / 700 / 765 / 887 / 909 px – Ausreißer 1 850 und 2 284 px für Prozess und
Leistungsauswahl.

**R15 – Der Hero ist nie höher als ein Viewport.** Gemessen 671–900 px bei 900 px Viewport.
*Beleg:* B4 711 px, A3 765 px, A2 900 px (exakt 1.0), Mobile 591–844 px bei 844 px Viewport.

**R16 – Mobile darf länger werden, aber nicht doppelt so lang.** Wird die Seite mehr als 2×
so lang, waren zu viele Desktop-Spalten im Spiel.
*Beleg:* A2 10 986 → 16 566 px (1.51×) · A4 13 231 → 18 210 (1.38×) · B4 4 477 → 5 802 (1.30×) ·
B2 7 590 → 9 459 (1.25×). Gegenbeispiel B5: 5 724 → 4 730 (0.83×), weil Bildspalten mobil entfallen.

### 1.4 Spacing-Rhythmus

| Regel | Korridor |
|---|---|
| Basiseinheit | 4 px |
| Verwendete Abstandswerte | 5–7 Stück aus {4, 8, 12, 16, 24, 32, 48, 64} |
| Sektionspadding Desktop (oben/unten) | 72–120 px |
| Sektionspadding Mobile | 40–60 % des Desktop-Werts, min. 32 px |
| Seitenrand Desktop | 40–120 px |
| Seitenrand Mobile | 16–24 px |
| Container-Breite | 1100–1300 px (Vollbreite nur für Medien) |
| Zeilenlänge Fließtext | 480–800 px (≈ 55–80 Zeichen) |

**R17 – Eine einzige Abstandsskala, 4-px-basiert.** Kein 15/18/22 dazwischen.
*Beleg:* A4 dominante Gaps 8 (36×), 24 (18×), 40 (12×), 12 (8×), 10 (7×). B3 exakt 64/32/16/8.
A1 12/8/4/24. B2 64/16/8.

**R18 – Sektionsabstand ist eine feste Zahl, nicht pro Sektion neu erfunden.**
*Beleg:* A4 durchgängig `padding: 80px 0` über 8 Sektionen, mit zwei bewussten 120-px-Betonungen.
A2 durchgängig 90 px über alle 8 Inhaltssektionen. B5 durchgängig 96 px oben.

**R19 – Mobile halbiert den Sektionsabstand.**
*Beleg:* A4 80 → 40 px (0.50); B5 96 → 28–30 px (0.30). Gegenbeispiel A2: 90 → 84 px (0.93) –
das ist genau der Grund, warum A2 mobil auf 1.51× Länge kommt (siehe R16). Wer den Desktop-Abstand
mobil beibehält, kauft Länge.

**R20 – Fließtext bekommt eine eigene, schmalere Spalte als der Container.**
*Beleg:* B1 Container 1 200 px, Textspalte 576 px. B2 Container 1 288 px, Textspalte 612 px.
B4 Container 1 425 px, Textspalte 713–776 px. A4 Container 1 265 px, Lead 886 px, Fließtext 646 px.

**R21 – Der Container liegt bei 1100–1300 px.** Alles darüber ist Bild, Video oder Farbband.
*Beleg gemessen:* 1 108 (A5) · 1 140 (B5) · 1 200 (A2, B1) · 1 232 (A3 innen) · 1 265 (A4) ·
1 280 (B3). Nur B4 setzt Inhalte bis 1 425 px – und bricht sie dort in zwei Spalten.

### 1.5 Button- und Karten-Rezept

**Button**

| Eigenschaft | Korridor |
|---|---|
| Höhe Desktop | 36–55 px |
| Höhe Mobile | ≥ 44 px (Touch) |
| Padding vertikal / horizontal | 10–16 px / 18–32 px (Verhältnis ≈ 1 : 2) |
| Schriftgröße | 13–18 px |
| Schriftgewicht | 500–700 |
| Radius | **eine** Familie: 0–4 px · 8–16 px · Pill (999 px) |
| Varianten pro Seite | genau 2 (1 Primär + 1 Ghost/Sekundär) |

**R22 – Höhe 36–55 px, Padding etwa doppelt so breit wie hoch.**
*Beleg:* A2 `14px 28px`, Höhe 53 px · A3 `14px 28px`, Höhe 48 px · B1 `13px 29px`, Höhe 43 px ·
B5 `8px 19.2px`, Höhe 40 px · B3 Höhe 44–45 px.

**R23 – Genau zwei Button-Ausprägungen.** Ein gefüllter Primär, ein Ghost mit 1 px Rand. Kein
dritter Stil.
*Beleg:* A2 Primär gefüllt hell auf dunkel + Ghost mit 1 px Rand in 18 % Deckung; B2 gefüllt
schwarz + Ghost mit 1 px weißem Rand, beide `radius 4px`, beide Versalien mit +1.25 px;
B3 gefüllt Akzent + invertiert (Weiß mit Akzenttext).

**R24 – Eine Radius-Familie für die ganze Seite.** Buttons, Karten, Inputs, Bilder folgen ihr.
*Beleg:* A4 Pill 999 px (71×) für Buttons **und** 12 px (56×) für Karten – zwei Werte, aber
konsequent nach Elementtyp getrennt. B4 nutzt praktisch keinen Radius außer 50 % für Kreis-Badges
(26×). B5 nutzt 0 px für Buttons und 16 px ausschließlich für die 28 Bewertungskarten.

**R25 – Mobile: Primär-CTA wird vollbreit.**
*Beleg:* A4 Button 353 px bei 390 px Viewport; A2 343 px; B1 365 px.

**Karte**

| Eigenschaft | Korridor |
|---|---|
| Abgrenzung | 1 px Rand **oder** eine weiche Schattenstufe – selten beides |
| Randfarbe | niedriger Kontrast (helle Fläche: 5–12 % Schwarz; dunkle Fläche: 15–25 % Weiß) |
| Innenabstand | 16–28 px |
| Schattenstufen pro Seite | max. 2 |
| Radius | wie Button-Familie |

**R26 – Karten werden durch Rand oder Schatten getrennt, nicht durch beides plus Verlauf.**
*Beleg Rand:* A4 `1px` in einem sehr hellen Grauton, 60× verwendet. A2 `1px weiß @ 18 %`, 27×.
B4 `1px` warmes Grau, 8×.
*Beleg Schatten:* B5 `0 2px 10px rgba(0,0,0,.1)` auf allen 28 Bewertungskarten – ein einziger
Wert, keine zweite Stufe.

**R27 – Farbige Glow-Schatten sind ein Akzent, kein Standard.** Höchstens auf dem Primär-CTA.
*Beleg:* A3 `0 10px 30px rgba(168,85,247,.45)` nur auf dem Haupt-Button; A2
`0 24px 60px rgba(29,78,216,.35)` nur zweimal auf der ganzen Seite.

**Eingabefeld**

| Eigenschaft | Korridor |
|---|---|
| Höhe | gleich der Primärbutton-Höhe der Seite, Abweichung höchstens ± 4 px – mindestens 44 px (Touch, N12), höchstens 55 px (Button-Korridor R22) |
| Schriftgröße | ≥ 16 px (verhindert Auto-Zoom auf iOS) |
| Innenabstand horizontal | 12–20 px |
| Radius | wie Button-Familie |
| Label | **außerhalb** des Feldes, dauerhaft sichtbar, oben oder links |
| Platzhalter | nur Beispiel, nie Ersatz für das Label |
| Fehlerzustand | Rahmenfarbe **plus** Textmeldung unter dem Feld, `aria-invalid`, `aria-describedby` |
| Fokuszustand | siehe R45 |

**R28 – Feld und Button haben dieselbe Höhe.** Sonst zerfällt jede Formularzeile optisch.
*Beleg – beide gemessenen Formulare verletzen das:* B2 Buttons 36 px, Felder **28 px**;
B3 Buttons 44–45 px, Felder **56 px**. In beiden Fällen sitzt der Absende-Button sichtbar
kleiner oder größer als die Zeile darüber.
Die Untergrenze 44 px ist das Touch-Mindestmaß aus N12, die Obergrenze 55 px die Obergrenze des
Button-Korridors aus R22 – der höchste tatsächlich gemessene Buttonwert im Set liegt mit A2 bei
53 px. Die ± 4 px sind eine Relation zur realen Primärbutton-Höhe des jeweiligen Projekts, kein
zweiter Korridor daneben: Wer 48-px-Buttons setzt, baut 44–52 px hohe Felder. 56 px ist
ausdrücklich kein Zielwert, sondern B3s Feldhöhe – also genau der hier bemängelte Verstoß.

**R29 – Das Label steht außerhalb des Feldes und bleibt beim Tippen stehen.**
Platzhalter-als-Label verschwindet genau dann, wenn man ihn braucht – beim Ausfüllen und beim
Korrekturlesen.
*Beleg:* B2 und B3 setzen beide auf umschließende `<label>`-Elemente mit sichtbarem Text und
**leerem** `placeholder` – die einzigen zwei Formulare im Set, und beide machen das richtig.

**R30 – Ein Fehlerzustand ist ein definierter Zustand, kein roter Rahmen.** Er braucht Farbe,
Text und Programmierschnittstelle – Farbe allein erreicht Screenreader nicht (siehe R47).
*Beleg – Lücke im gesamten Set:* Auf **allen 10 Seiten** ist die Zahl der Elemente mit
`aria-invalid` **null**. `role="alert"` oder `aria-live` existiert nur auf 3 von 10 Seiten
(B1: 2, B5: 2, A4: 1). Kein Formular im Benchmark hat einen zugänglichen Fehlerzustand –
das ist die größte gemeinsame Lücke der Stichprobe.

### 1.6 Copy-Muster

| Regel | Korridor |
|---|---|
| H1 | 2–10 Wörter, konkretes Versprechen oder klarer Eigenname |
| Subline | 1 Satz, 12–25 Wörter: was, für wen, mit welchem Ergebnis |
| Kicker | 1–4 Wörter, Versalien, optional nummeriert |
| CTA-Label | Verb + Objekt, 2–4 Wörter |
| Wiederholungen desselben CTA-Textes | 3–6 pro Seite |
| Belegpunkte (Zahlen/Jahre/Bewertungen) | 2–4 pro Seite, davon ≥ 1 im Hero |
| Absatzlänge | 2–4 Sätze, 12–25 Wörter je Satz |
| Anrede | eine, konsequent |

**R31 – Die H1 nennt das Ergebnis oder den Namen, nie die Leistungskategorie.**
*Beleg:* A4 „Flaggschiff-Webseiten, die aussehen wie Apple und verkaufen wie Amazon" ·
A3 „Traumwebsite? Gibt's bei uns." · B4 „SCHLOSSHOTEL STEINBURG" ·
B3 „Immobilienmakler in Würzburg – Service und Tradition".

**R32 – Direkt unter der H1 steht ein Satz, der Ort, Leistung und Bedingung klärt.**
*Beleg:* A3 „Professionelle Websites, Landingpages & Online-Shops made in Bremen. Erhalte den
ersten Entwurf in nur 7 Tagen – kostenlos & unverbindlich." (21 Wörter, enthält Ort, Leistung,
Frist, Risikoumkehr). B4 „Übernachten hoch über Würzburg" (4 Wörter – Minimalvariante, funktioniert
nur, weil das Bild den Rest erzählt).

**R33 – Belege stehen neben dem CTA, nicht in einem Abschnitt weiter unten.**
*Beleg:* A4 Vertrauens-Pill mit Avataren **über** der H1: „ÜBER 40 DIENSTLEISTER UND BERATER
VERTRAUEN…". A3 direkt unter der H1: „50+ zufriedene Kunden" + Sterne. A2 KPI-Reihe im Hero:
„€3 Mio.+ Werbebudget · 50.000+ Kundenanfragen · 20+ eigene KI-Systeme". B4 Bewertungs-Widget
im Hero: „89 % · 6.023 Bewertungen auf 10 Portalen". B5 „4.8 · 105 Bewertungen".

**R34 – Ein CTA-Text, mehrfach wiederholt.** Nicht fünf Formulierungen für dieselbe Handlung.
*Beleg:* A3 „Kostenlosen Entwurf sichern" in Navigation, Hero und nach dem Prozessabschnitt.
A4 „Kostenloses Design-Konzept" / „Kostenloses Webseiten-Konzept" durchgehend.
B5 „MEHR ERFAHREN" identisch in jedem Inhaltsblock.

**R35 – CTA-Labels beginnen mit einem Verb oder benennen das Ziel.**
*Beleg:* „Slot anfragen" · „Kostenlosen Entwurf sichern" · „Jetzt Tisch reservieren" ·
„Newsletter abonnieren" · „Zu den Zimmern" · „Mehr erfahren". Kein „Absenden", kein „Hier klicken"
auf einer der zehn Seiten.

**R36 – Eine Anrede, konsequent durchgehalten.** Der Wechsel innerhalb einer Seite ist der
häufigste Copy-Fehler; keine der zehn Seiten macht ihn.
*Beleg:* A2, A3, A4 durchgehend „du". B1, B3, B4, B5 durchgehend „Sie".

**R37 – Einwände werden als eigener Abschnitt beantwortet, nicht versteckt.**
*Beleg:* A2 „07 ? // BEVOR DU FRAGST – Klartext." mit Preisrahmen im Klartext („Projekte starten
bei €10.000 pro Monat"). A4 „Häufig gestellte Fragen – Du findest keine Antwort? Kontaktiere unser
Team." mit direktem Terminlink.

### 1.7 Bildsprache

| Regel | Korridor |
|---|---|
| Seitenverhältnisse pro Seite | max. 3 |
| Übliche Verhältnisse | 1:1 · 3:2–16:10 (1.5–1.7) · 2:3–3:4 (0.67–0.75) · Banner 2.3–4.5 |
| Bildzuschnitt | `cover` für Motive, `contain` nur für Logos |
| Radius auf Bildern | wie Systemfamilie, im klassischen Profil 0 |
| Bildanzahl Startseite – **nur wenn die Seite fotografisch geführt ist** | 15–60 (Portfolio-lastig bis 180) |
| Bildanzahl Startseite – bei gebauter Bildwelt (Canvas, 3D, Illustration) | 0–15, dafür 1 tragendes Motiv (siehe R41) |

Der Bildanzahl-Korridor gilt ausdrücklich **nicht** als Mindestmenge für jede Seite. Er beschreibt
fotografisch geführte Auftritte; eine Seite mit gebauter Bildwelt erreicht dieselbe Wirkung mit
nahezu keinen Bilddateien.
*Beleg:* A1 kommt auf **0 `<img>`-Elemente** (1 Canvas + 5 SVG) und ist trotzdem die visuell
dichteste Seite des Sets. Gegenpol: A4 mit 178 Bildern, A3 mit 107, B4 und B5 mit je 55.

**R38 – Maximal drei Seitenverhältnisse, sonst franst das Raster aus.**
*Beleg:* B4 nutzt 1.00 (Badges/Kreise), 1.50 (Hero), 2.27 (Karten) – drei Werte.
B1 nutzt 1.15 / 1.14 / 1.35 / 0.90 in einer Reihe: vier ähnliche, aber nicht identische
Verhältnisse – sichtbar unruhiger.

**R39 – Logos immer `contain`, Motive immer `cover`.**
*Beleg:* A3 Kundenlogos 66–180 px breit mit `contain`, Inhaltsbilder mit `cover`.

**R40 – Das klassische Profil setzt Bilder ohne Radius, randlos, oft vollbreit.**
*Beleg:* B1, B2, B3, B4, B5 – **alle** gemessenen Bilder mit `border-radius: 0`.

**R41 – Wo keine Fotografie existiert, tritt eine gebaute Bildwelt an ihre Stelle** (UI-Mockup,
3D-Objekt, Illustration) – aber nur eine, nicht drei parallel.
*Beleg:* A1 arbeitet mit 0 Bildern, dafür 1 Canvas + 5 SVG. A4 nutzt UI-Screenshots mit
schwebenden Karten. B4 nutzt eine gezeichnete Gebäudekarte mit farbigen Hotspots.

### 1.8 Kontrast & Zugänglichkeit

| Regel | Korridor | Grundlage |
|---|---|---|
| Fließtext (< 24 px, bzw. < 18.66 px ab Gewicht 700) zu Untergrund | ≥ 4.5 : 1 | WCAG 2.1 AA – 1.4.3 |
| Große Schrift (≥ 24 px, bzw. ≥ 18.66 px ab Gewicht 700) | ≥ 3 : 1 | WCAG 2.1 AA – 1.4.3 |
| Buttonbeschriftung zu Buttonfläche | ≥ 4.5 : 1 | WCAG 2.1 AA – 1.4.3 |
| Sekundär-, Meta- und Dekotext | ≥ 4.5 : 1 – keine Ausnahme | Hausregel, strenger als 1.4.3 (das rein dekorative Schrift ausnimmt) |
| Rahmen, Icons, Zustandsindikatoren zur Nachbarfläche | ≥ 3 : 1 | WCAG 2.1 AA – 1.4.11 |
| Interaktive Elemente mit sichtbarem Fokus | 100 % | WCAG 2.1 AA – 2.4.7 |
| Fokusindikator zur Nachbarfläche | ≥ 3 : 1, mindestens 2 px stark | Zielwert nach WCAG 2.2 – 2.4.13 (Level AAA); im Set nicht gemessen |
| Text über Foto ohne Abdunklung oder Trägerfläche | 0 | Hausregel (praktischer Weg, 1.4.3 über Bildern überhaupt nachweisen zu können) |
| Inhalt, der ohne Scroll-Reveal unsichtbar bleibt | 0 | Hausregel |

Gemessen wurde mit der WCAG-2.1-Kontrastformel gegen den effektiven Untergrund (erste deckende
Hintergrundfarbe in der Elternkette, halbtransparente Ebenen eingerechnet). Proben über Foto
oder Verlauf sind als „nicht messbar" markiert und fließen nicht in die Kennzahlen ein.
Die Spalte „Grundlage" trennt geprüfte WCAG-Kriterien von Hausregeln. Beim Fokus wurde nur
erhoben, **ob** ein Ring sichtbar ist (`outline-style ≠ none` bei Breite > 0 oder Box-Shadow) –
Kontrast und Strichstärke des Rings sind in den Rohdaten nicht enthalten. Die Zeile
„≥ 3 : 1, mindestens 2 px" ist deshalb ein Zielwert aus WCAG 2.2, kein Messergebnis dieses Sets.

**R42 – Fließtext erreicht 4.5 : 1, auch wenn er „nur" Metatext ist.** Die Verstöße im Set liegen
nie beim Haupttext, sondern immer bei Zeitstempeln, Fußzeilenlinks und Dekoschrift – also dort,
wo jemand entschieden hat, dass Lesbarkeit nicht nötig sei.
*Beleg – die zwei schlechtesten Werte im gesamten Set:* B5 Zeitstempel `#c8d1d8` auf Weiß bei
14 px = **1.55 : 1**, 28-mal auf der Seite. A4 Fußzeilenlink `#c9c9c9` auf `#fafafa` bei 16 px =
**1.59 : 1**. Zum Vergleich das obere Ende: A1 durchgehend **20.08 : 1** über alle 57 Textproben,
ohne einen einzigen Verstoß.

**R43 – Große Schrift darf auf 3 : 1 herunter, aber das ist kein Freibrief für graue Deko.**
*Beleg positiv:* A5 Versalzeile `#ffffff` auf Türkis `#009ca4` bei 24 px = **3.34 : 1** – besteht
als große Schrift, wäre als Fließtext ein Verstoß. Genau dafür ist die Ausnahme da.
*Beleg negativ:* A4 setzt sein Laufband bei 36 px in `#c9c9c9` auf `#fafafa` = **1.59 : 1** –
gut die Hälfte des Mindestwerts für große Schrift, bei 66 betroffenen Elementen.

**R44 – Text über Foto braucht eine Trägerfläche, eine Abdunklung oder einen Textkasten.**
Fotokontrast ist nicht berechenbar und ändert sich mit jedem Bildtausch.
*Beleg – Anteil der Textproben, die über Foto oder Verlauf liegen:* B1 **28 von 30** im Fließtext,
B4 **11 von 23** in der Display-Gruppe, A2 9 von 50. B1 setzt Serif-Fließtext direkt auf eine
Wandtextur (siehe K2); B3 und B4 lösen dasselbe Problem richtig – B3 mit weißem Textkasten über
dem Hero, B4 mit halbtransparent entsättigter Navigationsleiste.

**R45 – Jedes interaktive Element zeigt beim Tabben einen sichtbaren Fokus.** Wer `outline` für
die Optik abschaltet, muss einen Ersatz setzen (Box-Shadow-Ring, Rahmen, Hintergrundwechsel).
*Beleg – 12 Tab-Stationen je Seite, gezählt wurden Stationen mit sichtbarem Ring:*
A1, A2, A3, B1, B5 je **12/12** · A5 10/12 · A4 9/12 · B2 **2/12** · B3 **2/12** · B4 **1/12**.
Die Ausfälle folgen alle demselben Muster: `outline-width: 3px` bei gleichzeitig
`outline-style: none` – ein deklarierter, aber abgeschalteter Ring ohne Ersatz.
Zweiter Befund: Fast alle Treffer sind der Browser-Standardring (`outline-style: auto`, 1 px).
Einen selbst gestalteten Fokus definieren nur A3 und A4 (Box-Shadow) sowie B5 (3 px eigener Ring).
Ein sichtbarer Standardring ist besser als keiner – aber er ist keine Designentscheidung.

**R46 – Scroll-Reveals brauchen zwei Fallbacks: ohne JavaScript sichtbar und bei
`prefers-reduced-motion: reduce` sofort sichtbar.** Sonst ist der Inhalt für einen Teil der
Nutzer schlicht nicht vorhanden (siehe E5).
*Beleg – Elemente unterhalb des Folds, die unsichtbar oder verschoben sind, ohne und mit
`reduce`:* A2 **122 von 408 → 120 von 408** · A3 17 von 239 → 16 von 239 ·
B4 13 von 222 → 13 von 222 · B2 8 von 71 → 8 von 111 · A4 **11 von 153 → 21 von 593**.
Bei **keiner** der fünf Seiten räumt die Einstellung den versteckten Inhalt weg: A2 löst zwei
Elemente, A3 eines, B4 und B2 keines – und bei A4 steigt die Zahl sogar von 11 auf 21.
Gegenprobe: A1, B1, B3, B5 verstecken 0 Elemente – dort gibt es nichts zu reparieren.
Und die Zahl der `prefers-reduced-motion`-Regeln im Stylesheet sagt nichts über die Wirkung aus:
B5 hat 19 Regeln und keinen versteckten Inhalt, A2 hat 1 Regel und 120 versteckte Elemente,
A3 und A4 haben **0 Regeln** bei 23 bzw. 120 animierten Elementen.

**R47 – Farbe ist nie der alleinige Träger einer Information.** Kategorie, Status und Fehler
brauchen zusätzlich Text, Symbol oder Position.
*Beleg richtig:* B4 codiert seine Kategorien farblich **und** beschriftet sie („KULTUR",
„BRUNCH", „ESSEN & TRINKEN"); A2 setzt seinen grünen Status-Chip nie ohne Text („CAC Ø −50 %").
*Beleg unvollständig:* B4s Badge `#ffffff` auf Orange `#e39215` bei 13 px = **2.5 : 1** – die
Beschriftung ist vorhanden, aber kaum lesbar. Text allein genügt nicht, er muss auch tragen.

**Rechtlicher Kontext (kurz, keine Rechtsberatung).** Seit dem 28.06.2025 verlangt das
Barrierefreiheitsstärkungsgesetz (BFSG) für **B2C-Dienstleistungen im elektronischen
Geschäftsverkehr** – Onlineshops, Buchungs- und Ticketstrecken, Bankdienstleistungen –
Barrierefreiheit nach EN 301 549, die auf WCAG 2.1 Level AA verweist. Verbindlich sind damit die
Zeilen der Tabelle oben, die in der Spalte „Grundlage" als WCAG 2.1 AA ausgewiesen sind
(4.5 : 1 Fließtext und 3 : 1 große Schrift nach 1.4.3, 3 : 1 Nicht-Text-Kontrast nach 1.4.11,
sichtbarer Fokus nach 2.4.7). Die übrigen Zeilen gehen darüber hinaus: die 2-px-Fokusstärke
stammt aus WCAG 2.2 (2.4.13, Level AAA), die beiden „0"-Zeilen und der ausnahmslose
4.5 : 1-Wert für Dekotext sind Hausregeln.
Reine Informationsseiten ohne Vertragsabschluss fallen nicht darunter, ebenso wenig
Kleinstunternehmen (unter 10 Beschäftigte **und** höchstens 2 Mio. € Jahresumsatz) bei
Dienstleistungen. Praktische Konsequenz für die Profilwahl: Sobald ein Projekt Buchung, Warenkorb
oder Terminstrecke enthält, sind R42–R47 keine Qualitätsempfehlung mehr, sondern Abnahmekriterium
– und im Zweifel gehört die Rechtsprüfung zum Projekt, nicht ins Design-Review.

---

## 2. Stilprofil „Expressiv"

Abgeleitet aus Gruppe A. Alle Zahlen sind gemessen, alle Farben nur Beleg.

### Merkmale

**Fläche.** Monochrome Basis, entweder sehr dunkel oder sehr hell – dazwischen nichts.
Gemessen: `#050505`, `#060a1c`, `#1d1d1b` bzw. `#fafafa`, `#fbfaf4`.

**Typografie als Bild.** Display 58–164 px, Gewicht 500–900, Tracking −2 bis −3.5 %,
Zeilenhöhe 0.88–1.0. Die Headline ist eine Fläche, kein Satz.
Sonderformen: Outline-Schrift mit transparenter Füllung (A2, 164 px), Versalblöcke über drei
Zeilen (A1, 98 px).

**Stimmkontrast im Satz.** Ein Wort der Headline bricht die Familie – kursive Serif im
Grotesk-Satz oder Mono im Sans-Umfeld.
*Beleg:* A4 und A3 setzen jeweils das Schlüsselwort in kursive Serif; A1 und A2 setzen alle
Meta-Informationen in Mono-Versalien.

**Geometrie.** Entweder Pill (999 px) oder hart (0–14 px) – aber die Entscheidung fällt einmal.
Karten auf dunklem Grund als Glasflächen: 1 px Rand in 18–24 % Weiß, Radius 10–20 px.

**Licht statt Farbe.** Radiale Verläufe hinter Sektionen, Punktraster, dünne Rasterlinien.
Rauschtexturen (Grain) sind im Set **nicht belegt** – keine der zehn Seiten nutzt eine; als
optionales Rezept siehe DESIGN-UMSETZUNG 2.4.
*Beleg:* A2 mit mehreren radialen Glows (blau, 13–40 % Deckung) plus Punktraster;
A3 mit farbigen Glows in vier Kategorienfarben; A1 mit durchgehendem Rasterlinien-Overlay.

**Bewegung.** Blur- und Fade-Reveals beim Scrollen, Sektionspunkte am rechten Rand, schwebende
Pill-Navigation.
*Beleg:* A2 zeigt beim Zwischenscroll unscharf eingeblendete Karten und eine Punktnavigation mit
Sektionsnamen; A3 zeigt Abschnitte, die erst im Viewport erscheinen.

**Dichte.** 8–12 Sektionen – das obere Ende des Korridors aus 1.3, nicht darüber hinaus.
3-spaltige Feature-Grids, KPI-Reihen, nummerierte Problemlisten.
*Beleg:* A2 acht nummerierte Inhaltssektionen (01…08) plus Hero; A4 acht Sektionen mit
durchgängigem `padding: 80px 0`.

**Sprache.** „du", zugespitzte Behauptungen, Zahlen, Gegenüberstellung „vorher/nachher" oder
„andere/wir".
*Beleg:* A2 „Agenturen skalieren mit Menschen. Ich skaliere mit Systemen." mit VS-Vergleichsgrafik;
A4 „Deine Webseite / Andere Webseiten".

### Wann einsetzen

- Neue Marke ohne Historie, die Aufmerksamkeit vor Vertrautheit braucht.
- Digitale Produkte, Agenturen, SaaS, Recruiting für jüngere Zielgruppen.
- Zielgruppe unter ~45, digitalaffin, vergleicht mehrere Anbieter online.
- Es existieren echte Assets: KPIs, Referenzbilder, Produktoberflächen, Prozessschritte.
- Differenzierung ist wichtiger als Wiedererkennbarkeit der Branche.
- Die Entscheidung fällt online (Formular, Termin-Tool), nicht am Telefon.

**Nicht einsetzen**, wenn die Zielgruppe Verlässlichkeit über Neuheit stellt, wenn keine Zahlen
und keine hochwertigen Bilder vorliegen, oder wenn der Kauf offline stattfindet.

---

## 3. Stilprofil „Klassisch"

Abgeleitet aus Gruppe B.

### Merkmale

**Das Bild trägt, das Layout rahmt.** Vollflächige Fotografie im Hero, Text als ruhige Schicht
darüber. Alle fünf Seiten der Gruppe arbeiten so.

**Warme Neutrale statt Grau.** Eine warme Grundfläche, ein warmer Dunkelton für Text, genau ein
Traditions-Akzent.
*Beleg:* B4 Sand `#e4e1cb` + Text `#2f2e2c` + Weinrot `#4d1539`; B1 Leder-Braun (Foto) + Creme
`#fefaed` + Rot `#840606`; B5 Weiß + `#21202e` + Weinrot `#7b213e`.

**Positives Tracking.** Display bekommt Luft statt Enge: +1 % bis +5 %. Genau umgekehrt zum
expressiven Profil.
*Beleg:* B1 H1 52 px mit +0.5 px (+1 %); B4 Serif-Subline 30 px mit +1.6 px (+5.3 %);
B4 Fließtext 18 px mit +0.8 px (+4.4 %).

**Serif oder humanistische Sans, oft kombiniert.** Serif für Fließtext oder Sublines, Versal-Sans
für Sektionstitel.
*Beleg:* B2 Condensed-Versalien im Titel + Serif im Fließtext (16/24); B1 Serif-Fließtext
(20/30) + Sans-Bold-H2 (28/39); B4 Versal-Display + kursive Serif-Subline + leichte Sans im Body
(18/30, Gewicht 300).

**Rechtwinklige Geometrie.** Radius 0–4 px, 1 px Haarlinien, höchstens eine Schattenstufe.
Kreise nur für Icons und Badges.
*Beleg:* B4 hat außer 50-%-Kreisen praktisch keinen Radius und genau **einen** Schatten auf der
ganzen Seite; B5 setzt Buttons auf 0 px; B1 auf 2 px; B2 und B3 auf 4 px.

**Buttons: gefüllt, versal, gesperrt.**
*Beleg:* B3 Versalien mit +1.6 px, Höhe 44 px; B2 Versalien mit +1.25 px, Höhe 36 px, 1 px Rand;
B5 Versalien mit +0.8 px, Höhe 40 px, Radius 0.

**Kontakt ist immer sichtbar.** Telefonnummer, Öffnungszeiten und Anfahrt sind keine Unterseite.
*Beleg:* B5 Utility-Leiste ganz oben mit Adresse, Telefon, Mail und „Heute geöffnet: 08:00–18:00";
B4 fixe Buchungsschaltfläche oben rechts und ein fixer Buchungsbalken am unteren Mobile-Rand;
B3 und A5 mit fixer Kontaktleiste am rechten Bildrand (Telefon, Mail, Standort).

**Vertrauen über Herkunft und Dritte.** Gründungsjahr, Siegel, Bewertungswidgets, Inhaber mit
Namen und Foto.
*Beleg:* B1 „Brautradition zu Würzburg seit 1643"; B3 „Erfolgreiche Arbeit seit 1993" plus zwei
Inhaberporträts mit Namen; B4 vier Auszeichnungssiegel neben dem Einleitungstext; B5 vier
Google-Bewertungskarten mit Klarnamen.

**Struktur streng linear.** Titel → Text → Bild → CTA, abwechselnd links/rechts. Karussells für
Angebote und Neuigkeiten. Keine überlappenden Ebenen.

**Sprache.** „Sie", vollständige Sätze, Ortsbezug, Sinnesbeschreibung statt Kennzahlen.
*Beleg:* B4 „Hoch über der bezaubernden Stadt Würzburg am Main, wo barocke Pracht mit anmutiger
Leichtigkeit verschmilzt…"; B2 beschreibt Gerichte statt Prozesse.

### Wann einsetzen

- Lokales Geschäft mit Laufkundschaft: Gastronomie, Hotel, Handwerk, Praxis, Kanzlei, Makler.
- Zielgruppe ab ~45 oder gemischt; Entscheidung fällt per Anruf, Mail oder vor Ort.
- Historie, Region oder Handwerk sind das eigentliche Verkaufsargument.
- Es existiert gute Fotografie (oder Budget dafür) – dieses Profil trägt ohne Bilder nicht.
- Die Seite muss auch in fünf Jahren noch seriös wirken; Trendrisiko ist unerwünscht.
- Erwartungskonformität schlägt Differenzierung (Speisekarte, Öffnungszeiten, Telefonnummer
  müssen dort sein, wo man sie sucht).

**Nicht einsetzen**, wenn das Angebot rein digital ist, wenn keine verwertbare Fotografie
existiert, oder wenn der Auftritt sich bewusst von einer traditionellen Branche absetzen soll.

---

## 4. No-Gos

### 4.1 Universell

| Nr. | No-Go | Grenze |
|---|---|---|
| N1 | Mehr als 2 Schriftfamilien plus 1 Akzentschrift | > 3 Familien |
| N2 | Reinschwarz auf Reinweiß | `#000` auf `#fff` |
| N3 | Mehr als eine Akzentfarbe für Interaktion | > 1 |
| N4 | Zeilenhöhe im Fließtext unter 1.4 | < 1.4 |
| N5 | Zeilenlänge über 800 px bzw. 90 Zeichen | > 800 px |
| N6 | Radius-Mischung **ohne Elementtyp-System** – gleiche Elementart mit unterschiedlichen Radien | – |
| N7 | Mehr als 2 Schattenstufen; Schatten + Rand + Verlauf auf derselben Karte | – |
| N8 | Versalien im Fließtext | > 14 px uppercase |
| N9 | Mehr als ein Primär-CTA-Stil pro Seite | – |
| N10 | CTA ohne Verb („Absenden", „Hier klicken", „Weiter") | – |
| N11 | Abstände außerhalb der 4-px-Skala | – |
| N12 | Mobile: horizontales Scrollen, Rand < 16 px, Touchziel < 44 px | – |
| N13 | Mobile: Display-Schrift über 48 px | > 48 px |
| N14 | Interstitials, die den Hero verdecken, ohne dass er dahinter sichtbar bleibt | – |
| N15 | Wechselnde Anrede innerhalb einer Seite | – |

**Zu N6 – Abgrenzung:** Verboten ist nicht *ein zweiter Radiuswert*, sondern ein Radius **ohne
Regel dahinter**. Zulässig ist eine Zuordnung nach Elementtyp, solange sie ausnahmslos gilt.
*Beleg zulässig:* A4 nutzt Pill (999 px, 71-mal) für **alle** Buttons und 12 px (56-mal) für
**alle** Karten – zwei Werte, ein System (siehe R24). *Beleg unzulässig wäre:* zwei Karten
nebeneinander mit 8 px und 16 px, oder ein Pill-Button neben einem 4-px-Button in derselben
Zeile. Prüffrage: Lässt sich der Radius aus dem Elementtyp ableiten, ohne ins Design zu schauen?

**Zu N4 – gemessener Verstoß:** B3 und A5 setzen den Fließtext auf `line-height: normal`
(≈ 1.2 bei 16 px). Das ist der einzige echte Typo-Defekt im gesamten Set und in beiden Fällen
auf denselben Baukasten zurückzuführen.

**Zu N12 – gemessener Verstoß:** B2 hat mobile Buttons mit 36 px Höhe, B5 mit 35 px – beide unter
der 44-px-Schwelle.

**Zu N14 – gemessener Verstoß:** A5 legt ein Consent-Modal über die gesamte Herofläche; B1
schiebt eine Altersabfrage als Vollseite davor. In beiden Fällen ist der erste Eindruck der
Seite eine Rechtstextwand. Gegenbeispiel im selben Set: A4 setzt den Consent-Hinweis als kleine
Karte unten links, der Hero bleibt vollständig sichtbar und bedienbar.

### 4.2 Nur „Expressiv"

| Nr. | No-Go | Begründung / Beleg |
|---|---|---|
| E1 | Effekte ohne Hierarchie – Glow, Blur oder Verlauf auf jedem Element | Der Glow verliert seine Funktion; im Set liegt er nie auf mehr als 2–3 Elementen (A2: 2 Schatten auf der ganzen Seite) |
| E2 | Outline- oder Display-Schrift unter 40 px | Konturschrift wird unleserlich; A2 nutzt sie nur bei 110–164 px |
| E3 | Negatives Tracking im Fließtext unter 16 px | A4 fährt −0.48 px bei 16 px (−3 %) – das ist die Untergrenze, darunter kleben Buchstaben |
| E4 | Reinweißer Fließtext (Gewicht 400) auf leuchtenden Verläufen | A2 nutzt für Fließtext gedämpfte Blaugraustufen statt Weiß |
| E5 | Inhalte, die ohne Scroll-Reveal nie erscheinen | Messbar: Zwischenscroll-Screenshots von A2 und A3 zeigen leere Sektionen; A2 hält 120 von 408 Elementen unterhalb des Folds versteckt, auch mit `prefers-reduced-motion: reduce`. Reveal braucht ein sichtbares Fallback – Pflichtteil, siehe **R46** |
| E6 | Mehr als 3 „Spezialsektionen" (3D, Canvas, Marquee, Sticky-Scrollytelling) pro Seite | Jede kostet Ladezeit und Aufmerksamkeit |
| E7 | Dunkles Layout ohne definierte Sekundärtextfarbe | Sonst entsteht Opacity-Wildwuchs; A2 hat dafür 3 feste Töne |

### 4.3 Nur „Klassisch"

| Nr. | No-Go | Begründung / Beleg |
|---|---|---|
| K1 | Schreibschrift über 40 px als tragendes Element | B1 setzt sie bei 90–105 px ein – dekorativ wirksam, aber schlecht lesbar und der schwächste Punkt der Seite |
| K2 | Fließtext auf fotografischer Textur | B1 setzt Serif-Text direkt auf eine Wandtextur; Kontrast und Ruhe leiden |
| K3 | Zentrierter Fließtext über mehr als 4 Zeilen | B1 zentriert ganze Absätze – erschwert den Zeilensprung |
| K4 | Gesättigte Markenfarbe als vollbreite Navigationsleiste | B1 nutzt ein rotes Vollbreiten-Menü; wirkt datiert. Gegenbeispiel B4: halbtransparente, entsättigte Leiste über dem Bild |
| K5 | Stapel aus 5+ gleichrangigen CTA-Buttons | B3 stapelt 6 identische Buttons im Hero – ohne Hierarchie entscheidet niemand |
| K6 | Pill-Buttons, große Radien, farbige Glow-Schatten | Bricht das Register; im gesamten B-Set kommt kein einziger Pill-Button vor |
| K7 | Fließtext-Zeilenhöhe „normal" | Siehe N4; B3 betroffen |
| K8 | Telefonnummer und Öffnungszeiten nur im Footer | B4 und B5 zeigen beides im ersten Viewport |

---

## 5. Kurz-Checkliste zur Profilwahl

Acht Fragen. Jede Antwort **A** zählt 1 Punkt für „Expressiv", jede Antwort **B** 1 Punkt für
„Klassisch".

| # | Frage | A = Expressiv | B = Klassisch |
|---|---|---|---|
| 1 | Wo fällt die Kaufentscheidung? | Online: Formular, Termin-Tool, Checkout | Offline: Anruf, Mail, Besuch |
| 2 | Wie alt ist die Kernzielgruppe? | überwiegend unter 45 | überwiegend über 45 oder stark gemischt |
| 3 | Was ist das stärkste Verkaufsargument? | Ergebnis, Kennzahl, Verfahren | Herkunft, Handwerk, Ort, Dauer |
| 4 | Welches Material liegt vor? | Screenshots, KPIs, Prozessgrafiken | Fotografie von Räumen, Produkten, Menschen |
| 5 | Vergleicht die Zielgruppe mehrere Anbieter online? | ja, Differenzierung entscheidet | nein, Vertrauen und Nähe entscheiden |
| 6 | Wie lange soll der Auftritt halten? | 2–3 Jahre, Relaunch eingeplant | 5+ Jahre, Trendrisiko unerwünscht |
| 7 | Welche Anrede passt zur Marke? | „du" | „Sie" |
| 8 | Was ist teurer: übersehen werden oder unseriös wirken? | übersehen werden | unseriös wirken |

**Auswertung**

- **6–8 × A** → Profil „Expressiv" konsequent umsetzen.
- **6–8 × B** → Profil „Klassisch" konsequent umsetzen.
- **4–5 zu 3–4** → gemischt. Dann gilt: **Skelett und Spacing aus „Klassisch",
  Typo-Kontrast und CTA-Rezept aus „Expressiv".** Nie umgekehrt – ein expressives Layout mit
  klassischer Typo wirkt unfertig, ein klassisches Layout mit modernem Typo-Kontrast wirkt gepflegt.
  *Beleg für diese Mischform im Set:* B2 (klassische Struktur, Fotografie, Serif-Fließtext –
  aber Condensed-Versal-Display, schwarze Vollfläche und Icon-Rail) und A5 (moderne Fläche und
  Outline-Buttons, aber klassisches lineares Skelett).

**Vor dem ersten Pixel zusätzlich festlegen** (gilt für beide Profile):

1. Grundfläche + Textfarbe + **eine** Akzentfarbe (N2, N3)
2. Typo-Skala: 6–8 Stufen, Body 16–20 px, H1 = Body × 2.5–5 (R9, R10)
3. Zeilenhöhen: Display 0.9–1.2, Body 1.45–1.7 (R7)
4. Abstandsskala: 4-px-Basis, 5–7 Werte, Sektionspadding 72–120 px (R17, R18)
5. Radius-Familie: 0–4 / 8–16 / Pill – eine Entscheidung (R24)
6. Zwei Button-Varianten, Höhe 36–55 px, Padding 1 : 2 (R22, R23)
7. Container 1100–1300 px, Textspalte 480–800 px (R20, R21)
8. Ein CTA-Text, 3–6× wiederholt, plus 2–4 Belegpunkte (R33, R34)

---

## Methodik

- Erhebung: Playwright (Chromium), Desktop 1440×900 und Mobile 390×844, je Seite Hero-,
  Mitte- und Ganzseiten-Screenshot plus DOM-Auswertung.
- Ausgewertete Computed Styles: `font-family`, `font-size`, `font-weight`, `line-height`,
  `letter-spacing`, `text-transform`, `color`, `background-color`, `background-image`,
  `border-radius`, `border-width/-color`, `box-shadow`, `padding`, `gap`,
  `grid-template-columns`, `object-fit`, Element- und Containerbreiten.
- Flächenanteile je Farbe wurden über `Breite × Höhe / 1000` aller sichtbaren Elemente summiert
  und absteigend sortiert; „dominante Fläche" meint diesen Flächenwert, keine Pixelzählung.
- Vor der Messung wurden Consent- und Altersabfragen bestätigt und die Seite einmal komplett
  durchgescrollt, damit scroll-abhängige Inhalte geladen sind.
- **Zweiter Messdurchgang für Block 1.8** (01.09.2026), zusätzlich zu den obigen Werten:
  - Kontrast nach WCAG 2.1 gegen den effektiven Untergrund – erste deckende Hintergrundfarbe in
    der Elternkette, halbtransparente Ebenen und Textfarben mit Alpha vorher überblendet.
    Proben über Foto oder Verlauf werden getrennt gezählt und nicht in Kennzahlen gemittelt.
    Ausgeschlossen wurden Artefakte ohne Aussagekraft: `color: transparent` (Outline-Schrift),
    Elemente ohne auffindbaren deckenden Untergrund sowie unsichtbare Duplikate.
  - Fokus: 12-maliges `Tab` je Seite, danach je Station Auswertung von `outline-width`,
    `outline-style`, `outline-color`, `outline-offset` und `box-shadow` am `document.activeElement`.
    Als sichtbar gilt eine Station mit `outline-style ≠ none` bei Breite > 0 **oder** einem
    Box-Shadow.
  - Reduced Motion: Zählung der Elemente unterhalb von 90 % der Viewporthöhe mit
    `opacity < 0.35` oder einer Transform-Verschiebung > 8 px, je einmal unter
    `prefers-reduced-motion: no-preference` und `reduce` (`page.emulateMedia`), plus Zählung der
    `@media (prefers-reduced-motion)`-Regeln in allen erreichbaren Stylesheets.
  - Formulare: Höhe, Schriftgröße, Innenabstand, Rahmen, Label-Zuordnung (`for`/umschließend) und
    Label-Position relativ zum Feld sowie `required`, `aria-invalid`, `aria-describedby`,
    `role="alert"`/`aria-live`.
- Stand der Erhebung: 31.08.2026, Ergänzungsmessung 01.09.2026.
