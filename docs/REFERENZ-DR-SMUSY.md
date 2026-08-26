# Visuelle Referenz: dr-smusy.com

> Analyse vom 26.08.2026 · Startseite, /menu, /locations · gemessen bei 1440px (Desktop) und 390px (Mobil, DPR 3)
> Zweck: Design-Referenz für die Gastro-Demo (`/demo/cafe`). **Keine Farbübernahme** – die Demo hat mit
> `(demo)/demo.css` bereits eine eigene warme Palette (Papier `#f6f1e7` + Terrakotta), Leons Hauptseite ist Dark-only.
> Übertragbar sind Rhythmus, Hierarchie, Sektionsaufbau und die Karten-Anatomie.
> Technisch: Framer-Site, eine einzige Schriftfamilie (Cairo), vier Schnitte.

---

## 1. Was den Look ausmacht (Kurzfassung)

Fünf Entscheidungen tragen den gesamten Premium-Eindruck:

1. **Eine Schrift, vier Gewichte.** Cairo in 400 / 500 / 600 / 700 (die 500 nur für die Produkt-Captions
   auf `/menu`). Keine zweite Familie, kein Serif-Kontrast.
2. **Zwei Töne, ~2 % Helligkeitsunterschied.** Die komplette Flächen-Schichtung läuft über `#DDD0C2` ↔ `#E3D8CC`.
   **Null Ränder, null Schatten.** Karten sind sichtbar, weil sie minimal dunkler sind – nicht weil sie umrandet sind.
3. **Sehr enge Zeilenabstände auf sehr großer Schrift.** Display bei 1.12–1.16, Fließtext bei 1.28.
   Das macht Überschriften kompakt und massiv statt luftig.
4. **Laufweite wächst, wenn die Schrift schrumpft.** 0 % bei 60–96px → 1 % bei 32px → 2 % bei 16–18px → 3 % bei 14px.
   Konsequent durchgezogen, das ist der eigentliche „Feinschliff“-Effekt.
5. **160px Sektionsluft.** Der Weißraum ist nicht dekorativ verteilt, sondern in einem einzigen großen Wert konzentriert.

Alles andere (Radien, Paddings, Gaps) liegt auf **24**. Das ist der Taktgeber der Seite.

---

## 2. Typo-Hierarchie

Gemessen, nicht geschätzt. `lh` = Verhältnis, `ls` = Laufweite in % der Schriftgröße.

| Rolle | Desktop | Mobil | fw | lh | ls |
|---|---|---|---|---|---|
| Hero-H1 (Startseite) | 60px | 32px | 700 | 1.12 | 0 % |
| Seiten-H1 (`/menu`, `/locations`) | 96px | 48px | 600 | 1.12 | 0 % |
| Sektions-H2 (PRODUKTVIELFALT, UNSERE STORES) | 64px | – | 600 | 1.16 | 0 % |
| Kategorie-H2 (`/menu`) | 32px | 24px | 700 | 1.16 | 1 % |
| Produkt-Caption | 20px | 20px | 500 | 1.24 | 0.5 % |
| Feature-H3 (Wissenschaftlich fundierte Formeln …) | 20px | 20px | 400 | 1.24 | 1 % |
| Fließtext / Hero-Subline / Marquee | 18px | 18px | 400 | 1.28 | 2 % |
| Adresse / Button-Label / Nav-Link | 16px | 16px | 400 | 1.32 | 2 % |
| Stadt-Label / Öffnungszeiten / Footer-Label / Copyright | 14px | 14px | 400 | 1.28 | 3 % |
| Footer-Claim | 80px | 25px | 700 | 1.82 | 0 % |

**Wichtigste Beobachtung:** Zwischen Desktop und Mobil skaliert **nur die Display-Ebene** (96 → 48, 80 → 25, 32 → 24).
Alles ab 20px abwärts bleibt **exakt identisch**. Kein `clamp()` über die ganze Skala – nur zwei, drei bewusste Sprünge oben.

Der Footer-Claim ist die einzige Ausnahme beim Zeilenabstand: 1.82 statt 1.12. Ein einzelner, sehr breit atmender Satz
als Abbinder – funktioniert nur, weil er allein auf der Fläche steht.

Farbe: Text ist durchgehend `#3D3D3D`, **nie reines Schwarz**. Es gibt keine zweite Textfarbe – Hierarchie
entsteht ausschließlich über Größe und Gewicht, nicht über Ausgrauen.

---

## 3. Farbsystem

| Token | Hex | Verwendung |
|---|---|---|
| Basis / Karten | `#DDD0C2` | `body`-Grund, Store-Karten, Buttons, Pills |
| Sektionsfläche | `#E3D8CC` | gestrichene Sektionen, Nav-Pill, Bildkachel-Hintergrund |
| Akzent dunkel | `#C7BAAB` | vereinzelt (Badge / Trennung) |
| Text | `#3D3D3D` | alles |
| Tint | `rgba(122,108,94,0.03)` | eine einzige Sektion, kaum wahrnehmbar |

Die Logik ist umgekehrt zum Erwarteten: die **Sektion ist heller als der Seitengrund**, und die **Karte darin fällt auf
den Grundton zurück** – wirkt also leicht eingesenkt statt erhaben. Keine Border, kein Shadow, kein Backdrop-Blur.

---

## 4. Weißraum & Raster

**Container:** `max-width: 1280px`, `padding: 0 40px` → 1200px Inhalt. Mobil `padding: 0 24px` → 342px.

**Sektionspadding:** 160px oben / 160px unten (Desktop) → 80px / 104px (Mobil). Hero-Sektion: 184px oben, fix auf beiden.

**Innere Abstände (Stores-Sektion, exemplarisch):**

```
Überschrift → Inhalt      104px
Spalte ↔ Spalte            64px
Grid-Gap (Karten)          24px
Karten-Padding             24px
Karten-Radius              24px
Rail-Item → Rail-Item      20px
Bildkachel → Caption       12px
```

Die Spacing-Skala ist damit: **12 / 20 / 24 / 40 / 64 / 104 / 160 / 184**. Kein 8er-Raster, sondern
wenige, weit auseinanderliegende Stufen. Zwischen 24 und 64 gibt es nichts – das erzeugt die klare Trennung
zwischen „gehört zusammen“ und „ist eine eigene Einheit“.

**Buttons/Pills:** `border-radius: 1000px`, Höhe 41px, `padding: 10px 16px 11px`.
Zwei Varianten: gefüllt (`#DDD0C2`, randlos) und Ghost (transparent, feine Kontur). Immer paarweise, nie mehr als zwei.

**Nav:** Sticky Pill, 650×63px, `radius: 1000px`, `padding: 18px`, `bg #E3D8CC`, 62px vom oberen Rand.
Kein Blur, kein Schatten, keine Zustandsänderung beim Scrollen. Darüber eine schließbare 14px-Ankündigungsleiste.

---

## 5. Sektionsabfolge

### Startseite (Desktop-Höhe ~7.360px)

1. **Ankündigungsleiste** – 14px zentriert, schließbar
2. **Sticky Pill-Nav** – Logo links im Pill, 5 Links, mittig schwebend
3. **Hero** – vollflächiges Video, das **nach unten in den Seitengrund ausblendet** (kein dunkles Overlay, kein Textschatten).
   H1 60px zentriert auf max. 680px Breite, 18px Subline, zwei Pills.
   Die Headline liegt bereits auf der ausgeblendeten Fläche, nicht auf dem Bild – deshalb bleibt sie ohne Overlay lesbar.
4. **Marquee** – 48px hohe Laufleiste, 18px Labels, je Produktname mit winzigem Becher-Bild davor, Haarlinie oben/unten
5. **PRODUKTVIELFALT** – H2 64px zentriert, 2-spaltiges Kachelraster (Bild oben, Caption darunter)
6. **COLLABORATIONS** – H2 64px + Logo-Carousel + Ghost-Pill „ERFAHRE MEHR“
7. **DR. SAHIN X DR. SMUSY** – zweispaltig: H2 64px linksbündig + 18px Fließtext links, Medien rechts.
   Darunter 4 kleine Feature-H3 (20px/400) im 2×2
8. **UNSERE STORES** – H2 64px zentriert, darunter `[hohes Bild 588px | Kartenraster 2×4 à 282px]`
9. **Marquee** (Wiederholung)
10. **Footer** – 4 Spalten: Marke + Mail · MAIN · KATEGORIEN · FOLGE UNS
11. **Claim** – „YOU DESERVE TO FEEL GOOD.“ 80px/700, freistehend
12. **Copyright** 14px

Der Rhythmus ist: **Bild → Text → Bild → Text**, dazwischen die Marquee als Zäsur. Nie zwei Textsektionen hintereinander.

**Mobil:** Sektion 5 klappt von „Bild über Label“ auf **Bild links / Label rechts** als Zeilenliste um – nicht auf
eine schmalere Kachelspalte. Sektion 8 stapelt die Karten einspaltig, das Bild wandert **unter** die Karten.
Die Nav wird zum Pill mit Logo + Burger; der Burger öffnet ein kompaktes Dropdown-Panel (kein Fullscreen-Takeover),
Links zentriert bei ~24px mit ~78px Zeilenabstand.

### `/menu`

1. **Kompakter Hero ohne Bild** – nur H1 96px + zwei Pills. Das ist der ganze Kopf.
2. **Marquee**
3. **Zweispaltig:** links Kategorie-Rail (282px, `position: sticky; top: 128px`), rechts Inhaltsspalte (894px)
4. **Pro Kategorie:** Haarlinie → H2 32px/700 linksbündig → 3-Spalten-Raster (282px, Gap 24)
5. **Produktkachel:** quadratische Bildfläche 282×282, `radius 24`, `bg #E3D8CC`, Produktfoto **unten angeschnitten**
   (Becher steht auf der Kachelkante), Gap 12, Caption 20px/500 zentriert. „Neu“-Badge als Pill oben links.

**Keine Preise, keine Beschreibungen, keine Allergene.** Nur Bild + Name. Die Karte ist ein Schaufenster, keine Bestellliste.

**Mobil:** Rail wird zur **schwebenden Pill-Leiste am unteren Viewport-Rand**, horizontal scrollbar (Thumbnail + Label).
Raster wird einspaltig, Kacheln 342×342. Die Bilder werden dadurch sehr groß – das ist die eigentliche Mobile-Idee.

### `/locations`

Struktur identisch zur Stores-Sektion der Startseite, nur als eigene Seite mit H1 96px + zwei Pills davor.
Bild links (nicht sticky, moderateres Format), rechts das 2-spaltige Kartenraster. Karten haben **unterschiedliche
Höhen** je nach Anzahl der Öffnungszeiten-Zeilen – kein erzwungenes gleiches Kartenmaß.

---

## 6. Karten-Anatomie: Adresse & Öffnungszeiten

Das ist das direkt übertragbare Muster für `DemoLocation` / `DemoHours`.

**Kachel:** 282×239px (Desktop) bzw. volle Breite (Mobil) · `radius 24` · `padding 24` ·
`bg #DDD0C2` auf `#E3D8CC` · keine Border, kein Schatten.

```
Köln                          (Flagship Store)     ← 14px, ls 3%  · Zusatz rechtsbündig
                                                   ← Leerzeile
Apostelnstraße 44                                  ← 16px, ls 2%  · GRÖSSTE Zeile der Karte
50667 Köln                                         ← 16px
Mo-So 10.00 - 20.00                                ← 14px, ls 3%
So 12.00 - 18.00                                   ← 14px  (nur wenn nötig)
                                                   ← Leerzeile + Haarlinie
              ZUR ROUTE                            ← 16px, Pill 41px, radius 1000
```

**Die vier Entscheidungen, die das Muster ausmachen:**

1. **Hierarchie ist invertiert.** Die Stadt ist das *kleine, ruhige* Label (14px). Die **Straße ist die größte Zeile**
   der Karte (16px). Begründung ist funktional: wer schon auf der Locations-Seite ist, sucht die Adresse, nicht die Stadt.
2. **Öffnungszeiten haben kein Label.** Nirgends steht „Öffnungszeiten“. Die Zeitzeile steht direkt unter der Adresse
   und ist als solche selbsterklärend. Spart eine ganze Hierarchie-Ebene.
3. **Kompaktes Zeitformat.** `Mo-So 10.00 - 20.00` – Punkt statt Doppelpunkt, Tage zweibuchstabig, Bindestrich mit
   Leerzeichen. Ausnahmen als eigene Zeile: `So 12.00 - 18.00`, `So geschlossen`.
   Eine Zeile pro Regel, nicht eine Zeile pro Wochentag – nie eine 7-zeilige Tabelle.
4. **Der Route-Button ist visuell flach.** Gleiche Füllfarbe wie die Karte, definiert nur durch die Haarlinie
   darüber und die Pill-Kontur. Er drängt sich nicht auf, ist aber die einzige Aktion der Karte.

**Mobil:** Textgrößen bleiben identisch (14/16/14/16). Nur `(Flagship Store)` rutscht unter die Stadt,
und der Route-Pill wird volle Kartenbreite.

*Randnotiz:* Die Zusatz-Ausrichtung ist auf der Referenz mit Leerzeichen im Text gebaut (Framer-Artefakt) und
bricht mobil unsauber. Bei uns gehört das in ein `flex justify-between`.

---

## 7. Was wir übernehmen sollten – und was nicht

**Übernehmen:**
- Die Laufweiten-Regel (klein = weiter) über die ganze Skala
- Enge Zeilenabstände (1.12–1.16) auf Display, 1.28 auf Fließtext
- Nur Display-Ebene skaliert responsiv, Basisebene bleibt fix
- 24 als durchgehender Radius-/Padding-/Gap-Takt, mit großem Sprung auf 64/104/160
- Store-Karten-Anatomie inklusive der invertierten Hierarchie und dem labellosen Zeitblock
- Marquee als Sektionszäsur statt als Deko
- Bild-Text-Wechsel, nie zwei Textsektionen hintereinander
- Hero-Medium, das in den Seitengrund ausblendet, statt Overlay + Textschatten
- Kategorie-Rail: Desktop sticky links, Mobil sticky unten als Pill-Leiste
- Maximal zwei Buttons pro Sektion, einer gefüllt / einer Ghost

**Nicht übernehmen:**
- Das konkrete Beige-Duo – die Demo hat mit `(demo)/demo.css` schon eine eigene warme Palette
  (Papier `#f6f1e7`, Terrakotta-Akzent), Leons Hauptseite ist Dark-only. Das *Prinzip* (zwei Töne,
  ~2 % auseinander, Schichtung ohne Border/Shadow) trägt aber in beiden Welten.
- Cairo – wir bleiben bei unserer Familie.
- **Der Verzicht auf Preise und Allergene ist NICHT übertragbar.** Ein Café-Gast sucht auf der Karte
  den Preis, und die Allergen-Kennzeichnung hängt am konkreten Betrieb. `/demo/cafe` behält beides.
  (Die Projektregel „keine Preise" gilt für *Leons eigene* Seite – das ist eine Positionierungs-
  Entscheidung für eine Dienstleistung, keine Gestaltungsregel für Kundenseiten.)
- Der 1.82-Zeilenabstand des Footer-Claims wirkt bei 25px mobil eher unbeabsichtigt als gestaltet.
- Inkonsistenzen der Referenz nicht mitkopieren: gemischtes Zeitformat (`10.00` vs. `10:00`),
  Hero-H1 mit 700 aber Seiten-H1 mit 600, Layout über Leerzeichen im Text.
