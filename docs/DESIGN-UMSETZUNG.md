# DESIGN-UMSETZUNG

> **Projekt-Notiz (leons-webseite, 01.09.2026):** Übernommen aus dem Template-Repo,
> Inhalt unverändert. Hier gilt: **Next.js** → Font-Einbindung nach §1.3 (`next/font`),
> §1.4 (Vite/@fontsource) ist für dieses Projekt gegenstandslos. **Kein shadcn/ui** –
> das Farb-Mapping in §2.1/§2.2 ist nur Referenz; das Projekt nutzt eigene Tokens
> (`--accent`, `--accent-solid`, `--accent-gradient`, siehe CLAUDE.md und
> src/app/globals.css). Die Seite ist **dark-only** – Light-Mode-Passagen entfallen.
> Kandidaten und Rezepte für eine eigene Marken-Schrift: §§1.2–1.5.

Technische Umsetzung der Regeln aus [DESIGN-WISSEN.md](./DESIGN-WISSEN.md) im Stack
**React + Tailwind + shadcn/ui** (Next.js App Router als Standardfall, Vite/React als Alternative).

DESIGN-WISSEN sagt, *was* gilt und warum – mit Messbeleg. Dieses Dokument sagt, *wie* man es
in diesem Stack baut. Regelverweise wie `R24` oder `R46` zeigen auf DESIGN-WISSEN.
Codebeispiele sind Muster, keine fertigen Dateien: Namen, Werte und Struktur werden pro Projekt
gesetzt.

Rohdaten zu Block 1: [`fonts-measured.json`](./fonts-measured.json)
(Messung 01.09.2026, Playwright/Chromium, 10 Seiten).

---

## 1. Schriften

### 1.1 Gemessener Bestand

Angewandte Familien je Rolle – nicht die geladenen, sondern die tatsächlich im Computed Style
verwendeten. Mehrfach geladene Icon- und Karteileichen-Schriften sind weggelassen.

| # | Seite | Fließtext | Display / H1 | Akzent, Label, Subline |
|---|---|---|---|---|
| A1 | haoqi.design | tiktok 400 / 16 px | tiktok 700 / 81–98 px, Versalien | tronica-mono 400 / 12–14 px, Versalien |
| A2 | adrianziegler.de | Archivo 400 / 16 px | Archivo Black 900 / 164 px, Versalien | IBM Plex Mono 600 / 9–12 px, Versalien |
| A3 | amphora-it.com | The Future 400 / 16 px | The Future 700 / 70 px | Tiempos Headline 400 *kursiv* / 70 px |
| A4 | farisschmidt.de | Helveticaneue 400 / 16 px | Helveticaneue 500 / 58 px | Instrument Serif 400 *kursiv* |
| A5 | xtrakt-media.de | Overpass 400 / 16 px | Overpass 700 / 68 px | Overpass 500 / 20–24 px, Versalien |
| B1 | wuerzburger-hofbraeu.de | Palatino Linotype 400 / 20 px | Palatino Linotype 400 / 52 px | Lucida Sans 700 / 28 px · Italianno 90–105 px |
| B2 | beef800.de | PT Serif 400 / 16 px | Fjalla One 700 / 75 px, Versalien | PT Serif 500 / 14 px, Versalien |
| B3 | wohner-pfeiffer.de | Manrope 400 / 16 px | Manrope 600 / 53 px | Manrope 500 / 18 px, Versalien |
| B4 | steinburg.com | Roboto 300 / 18 px | Reem Kufi 400 / 86 px, Versalien | Rasa 300 *kursiv* / 30 px |
| B5 | stein-welten.com | Inter 400 / 18 px | Inter 800 / 32 px | Inter 500 / 14–16 px, Versalien |

**Drei Befunde aus der Messung, die die Empfehlungen unten tragen:**

1. **Eine Familie reicht oft.** A5, B3 und B5 setzen die komplette Seite mit **einer** Familie und
   erzeugen den Kontrast über Gewicht (200–800), Größe und Versalien – deckt sich mit R6.
2. **Die Auslieferung ist der schwächere Teil.** 8 von 10 Seiten hosten selbst. Zwei nicht:
   B1 lädt PT Sans von `fonts.gstatic.com`, A4 die kompletten Schriften von
   `cdn.prod.website-files.com`. Drei Seiten liefern nicht in woff2 aus (A3 opentype,
   A5 truetype, B1 teils truetype/woff). `font-display` steht auf `swap` bei 5 Seiten,
   auf `fallback` bei 4, auf `block` bei einer (Font Awesome auf B5) und fehlt bei den
   meisten Icon-Fonts.
3. **B1 lädt 14 Schriftfamilien und setzt den Text trotzdem in Systemschriften**
   (Palatino Linotype, Lucida Sans Unicode). Alles Geladene ist Ballast. Vor jeder
   Schriftentscheidung gehört deshalb die Frage: Welche Rolle braucht sie wirklich?

### 1.2 Kategorien und frei lizenzierte Pendants

Pro Kategorie 2–3 Alternativen unter freier Lizenz. **G** = Google Fonts (OFL 1.1, einzelne
Apache 2.0), **F** = Fontshare (ITF Free Font License). Beide erlauben kommerzielle Nutzung und
Webfont-Einbettung.

| Kategorie | Im Set gemessen | Freie Pendants |
|---|---|---|
| Neo-Grotesk / UI-Sans | tiktok (A1), Helvetica Neue (A4), The Future (A3), Overpass (A5), Inter (B5) | **Inter** (G) · **Overpass** (G) · **Switzer** (F) |
| Geometrische Sans | Manrope (B3) | **Manrope** (G) · **Poppins** (G) · **General Sans** (F) |
| Display-Grotesk, schwer | Archivo Black 900 (A2) | **Archivo Black** (G) · **Anton** (G) · **Clash Display** (F) |
| Condensed-Versal-Display | Fjalla One (B2) | **Fjalla One** (G) · **Oswald** (G) · **Barlow Condensed** (G) |
| Humanistische Versal-Display (klassisch) | Reem Kufi (B4) | **Reem Kufi** (G) · **Marcellus** (G) · **Cormorant Garamond** (G) |
| Serif für Fließtext | PT Serif (B2), Palatino Linotype (B1, Systemschrift) | **PT Serif** (G) · **Source Serif 4** (G) · **Newsreader** (G, nächster Palatino-Ersatz) |
| Serif-Kursiv als Akzentwort | Instrument Serif (A4), Tiempos Headline (A3), Rasa (B4) | **Instrument Serif** (G) · **Fraunces** (G) · **Playfair Display** (G) |
| Mono für Labels und Metadaten | tronica-mono (A1), IBM Plex Mono (A2), Overpass Mono (A5) | **IBM Plex Mono** (G) · **JetBrains Mono** (G) · **Space Mono** (G) |
| Script / Dekor | Italianno, Kaushan Script (B1) | **Italianno** (G) · **Great Vibes** (G) · **Parisienne** (G) – **nur** unter Beachtung von K1 |

**Ersatz für die kommerziellen Schriften im Set:** Helvetica Neue → Inter oder Switzer ·
The Future → Switzer oder General Sans · Tiempos Headline → Newsreader oder Source Serif 4 ·
Palatino Linotype → Newsreader oder EB Garamond · Lucida Sans Unicode → Source Sans 3.

**Auswahlregel (aus R6):** Höchstens zwei Familien plus eine dekorative Akzentschrift. Wer eine
Variable Font mit breiter Gewichtsachse nimmt, kommt in der Regel mit einer aus.

### 1.3 Einbindung – Next.js (`next/font`)

`next/font` lädt die Dateien **zur Build-Zeit** herunter und liefert sie von der eigenen Domain
aus. Zur Laufzeit geht kein Request an Google – das ist der DSGVO-relevante Punkt (siehe 1.6).

```ts
// src/lib/fonts.ts
import { Archivo, IBM_Plex_Mono } from 'next/font/google'
import localFont from 'next/font/local'

// Variable Font: kein weight-Array angeben – die ganze Achse kommt in einer Datei
export const fontBody = Archivo({
  subsets: ['latin'],           // enthält Umlaute und ß
  display: 'swap',              // R: Text ist sofort lesbar, Tausch beim Laden
  variable: '--font-archivo',   // CSS-Variable, kein globales font-family
  // adjustFontFallback ist standardmäßig true → erzeugt eine size-adjust-Fallbackschrift
})

export const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],       // statische Schrift → Gewichte einzeln benennen
  display: 'swap',
  variable: '--font-plex-mono',
  preload: false,               // nur Labels, nicht above the fold → nicht vorladen
})

// Eigene oder von Fontshare geladene Datei
export const fontDisplay = localFont({
  src: [{ path: '../../public/fonts/ClashDisplay-Variable.woff2', weight: '400 700', style: 'normal' }],
  display: 'swap',
  variable: '--font-clash',     // NICHT --font-display, siehe Hinweis unter 2.2
  preload: true,                // Display steht im Hero → vorladen
})
```

```tsx
// src/app/layout.tsx
import { fontBody, fontMono, fontDisplay } from '@/lib/fonts'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // className setzt --font-archivo, --font-plex-mono und --font-clash auf das html-Element
  return (
    <html lang="de" suppressHydrationWarning
      className={`${fontBody.variable} ${fontMono.variable} ${fontDisplay.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
```

**`adjustFontFallback` ist der Punkt, den man nicht abschaltet.** Next erzeugt daraus eine
Fallbackschrift mit angepasstem `size-adjust`, sodass beim Schrifttausch kein Layoutsprung
entsteht. Genau dieses Muster ist im Benchmark messbar: A2 liefert neben `Archivo` auch
`Archivo Fallback`, `Archivo Black Fallback` und `IBM Plex Mono Fallback` aus – die einzige
Seite im Set, die den Tausch sauber abfängt.

### 1.4 Einbindung – Vite / React ohne Next (`@fontsource`)

```bash
npm i @fontsource-variable/inter @fontsource/ibm-plex-mono
```

```ts
// src/main.tsx – Variable Font: eine Datei für die ganze Achse
import '@fontsource-variable/inter'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/600.css'
```

```css
/* globals.css – font-display setzen, @fontsource liefert je nach Paket unterschiedlich aus */
:root {
  --font-inter: 'Inter Variable', ui-sans-serif, system-ui, sans-serif;
  --font-plex-mono: 'IBM Plex Mono', ui-monospace, monospace;
}
```

`@fontsource` liefert die Dateien als npm-Paket mit – sie landen im Build und werden von der
eigenen Domain ausgeliefert. Kein CDN-Request.

> **Variable-Pakete bevorzugen.** Die statischen `@fontsource/*`-Pakete führen in ihrem
> `@font-face` neben woff2 auch woff auf; beide Formate landen im Build und verletzen damit die
> woff2-Regel aus 1.5. Im Smoke-Test (Anhang) erzeugte `@fontsource-variable/inter` **nur woff2**,
> `@fontsource/ibm-plex-mono` dagegen 10 zusätzliche woff-Dateien. Wo es kein Variable-Paket gibt:
> die woff2 aus `node_modules` nach `public/fonts/` kopieren und das `@font-face` selbst schreiben. Für Schriften außerhalb von Google
(z. B. Fontshare) die woff2-Datei nach `public/fonts/` legen und `@font-face` selbst schreiben:

```css
@font-face {
  font-family: 'Switzer';
  src: url('/fonts/Switzer-Variable.woff2') format('woff2-variations');
  font-weight: 300 900;
  font-display: swap;
  font-style: normal;
}
```

### 1.5 Auslieferungsregeln

| Regel | Vorgabe |
|---|---|
| Format | **nur woff2** – kein woff, ttf, otf, eot |
| Ladeverhalten | `font-display: swap` für Text; `optional` nur für rein dekorative Schriften |
| Vorladen | `preload: true` ausschließlich für Schriften im ersten Viewport |
| Subset | `subsets: ['latin']` – deckt Umlaute und ß ab |
| Gewichte | Variable Font bevorzugen; bei statischen Schriften **nur die benutzten** Gewichte |
| Schriftdateien gesamt | ≤ 4 Dateien / ≤ 200 KB für die Startseite |
| Icon-Schriften | vermeiden – stattdessen `lucide-react` (SVG, mit shadcn ohnehin im Projekt) |

*Messbeleg zur Formatregel:* A5 liefert Overpass als **truetype** aus, B1 mischt truetype und
woff. woff2 komprimiert typisch 30–50 % besser als woff und wird von allen relevanten Browsern
seit 2020 unterstützt – es gibt keinen Grund für ein zweites Format im `src`.

*Messbeleg zu `font-display`:* B5 lädt Font Awesome Pro mit `font-display: block` – der Text
bleibt bis zu 3 Sekunden unsichtbar. `swap` zeigt sofort die Fallbackschrift; zusammen mit
`adjustFontFallback` (1.3) kostet das keinen Layoutsprung.

*Icon-Schriften im Set:* Ohne gesetztes `font-display` geladen: Material Icons (A5, B2, B3),
Brand-Icons (A5, B3), webflow-icons (A4), swiper-icons (B5). B4 lädt unter den auslesbaren
Faces keine Icon-Schrift – nur Roboto, Rasa und Reem Kufi, alle mit `fallback`. Bei Ausfall der
Datei erscheinen leere Kästchen statt Symbolen.

### 1.6 DSGVO und Lizenz

**Kein Google-CDN.** Ein `<link href="https://fonts.googleapis.com/…">` oder ein `@font-face`
mit `src: url(https://fonts.gstatic.com/…)` überträgt die IP-Adresse des Besuchers an einen
US-Anbieter, ohne Einwilligung und ohne technische Notwendigkeit. Das LG München I hat dafür
am 20.01.2022 (Az. 3 O 17493/20) Schadenersatz zugesprochen; seither ist es in Deutschland
ein regelmäßiger Abmahngrund.

*Messbeleg:* **B1 lädt PT Sans von `fonts.gstatic.com`** – der einzige direkte Google-CDN-Treffer
im Set. A4 liefert seine Schriften über `cdn.prod.website-files.com` (Webflow, US-Anbieter) aus;
technisch derselbe Sachverhalt, nur mit anderem Betreiber.

**Prüfung im gebauten Projekt**, nicht im Quelltext – Abhängigkeiten schleusen CDN-Links ein:

```bash
# Nach dem Build: darf nichts finden
grep -rE "fonts\.(googleapis|gstatic)\.com" .next/ dist/ 2>/dev/null
```

Zusätzlich im Browser prüfen: DevTools → Netzwerk → Filter `font` – jede Anfrage muss auf die
eigene Domain gehen.

**Lizenzhinweis für Kundenprojekte.** OFL 1.1 und die ITF Free Font License erlauben
kommerzielle Nutzung und Webfont-Einbettung, verlangen aber, dass die Lizenz mitgeführt wird
und die Schrift nicht als eigenes Produkt weiterverkauft wird. Praktisch:

- Lizenztexte nach `public/fonts/LICENSE-<Schriftname>.txt` legen, unverändert.
- In `docs/DESIGN-SYSTEM.md` je Schrift festhalten: Name, Version, Bezugsquelle, Lizenz.
- Bei Bezug über `next/font/google` liegt die Datei im Build – der Lizenztext gehört trotzdem
  ins Repo, weil das Projekt die Schrift ausliefert.
- Kommerzielle Schriften (im Set: Helvetica Neue, The Future, Tiempos Headline) brauchen eine
  Webfont-Lizenz **auf den Kunden**, gestaffelt nach Seitenaufrufen. Nie aus einem
  Agenturprojekt ins nächste kopieren.

---

## 2. Farben

### 2.1 Mapping der Farblogik auf shadcn-Variablen

| Regel aus DESIGN-WISSEN | shadcn-Variable | Umsetzung |
|---|---|---|
| **R1** – eine dominante Grundfläche (≥ 70 %) | `--background` | Eine Fläche für die ganze Seite. `--card` und `--popover` **gleich** oder um 2–4 % abgesetzt – nicht als zweite Grundfläche missbrauchen |
| **R2** – nie Reinschwarz auf Reinweiß | `--background` / `--foreground` | Beide Pole brechen, z. B. `oklch(0.98 0.005 95)` statt `oklch(1 0 0)` |
| **R3** – genau eine Akzentfarbe | `--primary` | Der einzige Marken-Buntton. `--secondary` und `--accent` sind **neutrale Abstufungen**, keine zweite Markenfarbe |
| **R4** – Sekundärtext ist eine eigene Farbe | `--muted-foreground` | Definierter Wert, nicht `text-foreground/60` |
| **R5** – Akzent erscheint als Band | `--primary` / `--primary-foreground` | Maximal 1–2 Sektionen mit `bg-primary text-primary-foreground` |
| Kategorie-/Statusfarben (max. 3) | `--chart-1` … `--chart-3` | Kategorien über die Chart-Tokens abbilden, statt neue Semantik-Tokens zu erfinden |
| Fehlerzustand (**R30**) | `--destructive` – **kein** `--destructive-foreground` | Nur für Fehler, nie als Akzent zweckentfremden. Die Schriftfarbe kommt hier nicht aus einem Token: Button und Badge setzen in der Variante `destructive` fest `text-white`, im Dark Mode zusätzlich `dark:bg-destructive/60`. Ein eigenes Foreground-Token anzulegen bleibt wirkungslos, solange die Komponenten nicht gepatcht werden |
| **R24** – eine Radius-Familie | `--radius` | Ein Wert; Pill-Buttons über `rounded-full` an der Komponente, nicht über einen zweiten Radius-Token |
| **R45** – sichtbarer Fokus | `--ring` | Eigener Wert mit ≥ 3 : 1 gegen `--background`; nie auf `transparent` setzen |
| Kartenabgrenzung (**R26**) | `--border` / `--input` | Rand **oder** Schatten, nicht beides |

### 2.2 Gerüst (Tailwind v4 + shadcn)

```css
/* src/app/globals.css */
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  /* ---- R1/R2: eine gebrochene Grundfläche, ein gebrochener Textton ---- */
  --background: oklch(0.985 0.004 95);
  --foreground: oklch(0.21 0.02 265);

  /* Flächen: gleich oder minimal abgesetzt, nie eine zweite Grundfläche */
  --card: oklch(1 0 0);
  --card-foreground: var(--foreground);
  --popover: var(--card);
  --popover-foreground: var(--foreground);

  /* ---- R3: genau ein Akzent ---- */
  --primary: oklch(0.52 0.21 268);
  --primary-foreground: oklch(0.99 0 0);

  /* neutrale Abstufungen – KEINE zweite Markenfarbe */
  --secondary: oklch(0.96 0.005 265);
  --secondary-foreground: var(--foreground);
  --accent: var(--secondary);
  --accent-foreground: var(--foreground);

  /* ---- R4: Sekundärtext als eigener Wert ---- */
  --muted: oklch(0.96 0.005 265);
  --muted-foreground: oklch(0.48 0.02 265);   /* Kontrast prüfen, siehe 2.3 */

  /* R30: shadcn (Tailwind v4) kennt KEIN --destructive-foreground.
     Button und Badge setzen die Schrift hart auf text-white – siehe Prüfzeile in 2.3. */
  --destructive: oklch(0.58 0.22 27);          /* Weiß darauf = 4.78 : 1 */

  /* --border trennt Flächen (dekorativ, keine Kontacktvorgabe),
     --input begrenzt Bedienelemente und braucht daher >= 3 : 1 gegen --background */
  --border: oklch(0.91 0.005 265);             /* 1.25 : 1 – nur als Trennlinie zulässig */
  --input: oklch(0.62 0.02 265);               /* 3.49 : 1 gegen --background */
  --ring: var(--primary);                      /* R45 – 5.84 : 1 gegen --background */

  /* Kategorie-/Statusfarben – max. 3 benutzen */
  --chart-1: oklch(0.65 0.16 165);
  --chart-2: oklch(0.62 0.19 300);
  --chart-3: oklch(0.68 0.17 55);

  /* ---- R24: EINE Radius-Familie ---- */
  --radius: 0.75rem;      /* modern: 0.5–1rem · klassisch: 0–0.25rem */
}

.dark {
  --background: oklch(0.16 0.015 265);
  --foreground: oklch(0.96 0.005 265);
  --card: oklch(0.19 0.016 265);
  --muted-foreground: oklch(0.72 0.02 265);   /* im Dunkeln HELLER: 7.82 : 1 */
  --border: oklch(1 0 0 / 12%);               /* Glasrand, vgl. A2: 1px Weiß @ 18 % */
  --input: oklch(0.55 0.02 265);              /* 4.00 : 1 gegen --background */
  --destructive: oklch(0.70 0.19 22);         /* Weiß darauf nur 2.91 : 1 – siehe Fußnote in 2.3 */
  /* … restliche Tokens analog: hier bekommen bestehende Namen neue Werte */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);

  /* Schriften aus 1.3 – Utilities: font-sans, font-display, font-mono */
  --font-sans: var(--font-archivo), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-clash), var(--font-archivo), sans-serif;
  --font-mono: var(--font-plex-mono), ui-monospace, monospace;
}
```

> **Jedes Token aus `:root` braucht seine eigene `--color-*`-Zeile.** In Tailwind v4 entsteht eine
> Farb-Utility ausschließlich aus einer Variable im `--color-*`-Namespace des Themes. Ein Wert,
> der nur in `:root` steht, erzeugt keine Klasse – ohne Warnung und ohne CSS-Ausgabe. Fehlt etwa
> `--color-secondary`, rendert die Button-Variante `secondary` (`bg-secondary
> text-secondary-foreground`) ohne Fläche; dasselbe gilt für `destructive`, Badge, Popover und
> DropdownMenu. Die Abkürzung `/* … restliche Tokens analog */` ist nur im `.dark`-Block zulässig:
> dort bekommen bereits bestehende Namen neue Werte, hier entstehen die Utilities überhaupt erst.

> **Namenskonflikt vermeiden.** Die `variable`-Namen aus `next/font` und die Theme-Schlüssel in
> `@theme inline` landen beide auf `:root`. Hieße die next/font-Variable ebenfalls
> `--font-display`, entstünde mit `--font-display: var(--font-display), …` ein Zirkelbezug –
> die Deklaration wird ungültig und die Schrift fällt still auf die generische Familie zurück.
> Deshalb tragen die Rohvariablen Schriftnamen (`--font-archivo`, `--font-clash`,
> `--font-plex-mono`) und die Theme-Schlüssel Rollennamen (`--font-sans`, `--font-display`,
> `--font-mono`).

> **Tailwind v3:** statt `@theme inline` die Tokens in `tailwind.config.ts` unter
> `theme.extend.colors` als `hsl(var(--background))` referenzieren und die Variablen in
> `@layer base` definieren. Die Zuordnung der Regeln bleibt identisch.

### 2.3 Kontrastprüfung der Tokens (R42, R43, R45)

Tokens werden **paarweise** geprüft, nicht einzeln. Die häufigsten Ausfälle sitzen nicht beim
Haupttext, sondern bei `--muted-foreground` im Dark Mode und bei `--ring`.

| Paar | Mindestwert | Regel |
|---|---|---|
| `--foreground` auf `--background` | 4.5 : 1 | R42 |
| `--muted-foreground` auf `--background` | 4.5 : 1 | R42 – **kein Rabatt für Metatext** |
| `--muted-foreground` auf `--card` / `--muted` | 4.5 : 1 | R42 |
| `--primary-foreground` auf `--primary` | 4.5 : 1 | R42 |
| `text-white` (Buttonschrift) auf `--destructive` | 4.5 : 1 | R42 – im Dark Mode gegen `--destructive/60` über `--background` rechnen, nicht gegen den rohen Token |
| Display ab 24 px auf `--background` | 3 : 1 | R43 |
| `--ring` auf `--background` | 3 : 1 | R45 |
| `--input` an Bedienelementen | 3 : 1 | 1.8-Tabelle |
| `--border` als reine Trennlinie | keine Vorgabe | 1.8-Tabelle |

*Warum beim Fehlerzustand gegen die gemischte Fläche gerechnet wird:* Button und Badge dünnen die
Fläche im Dark Mode per `dark:bg-destructive/60` aus. Kritisch ist der unverdünnte Fall – Weiß auf
dem rohen dunklen Token (`oklch(0.70 0.19 22)`) erreicht nur **2.91 : 1**. Wer `bg-destructive`
ohne die `/60`-Abschwächung selbst einsetzt, fällt also durch. Im Light Mode liegt Weiß auf
`oklch(0.58 0.22 27)` bei **4.78 : 1** – knapp über der Grenze, weshalb jede Anpassung der
Fehlerfarbe neu nachgerechnet werden muss.

*Warum das aufzuschreiben ist:* Die beiden schlechtesten Werte im gesamten Benchmark sind
**1.55 : 1** (B5, Zeitstempel `#c8d1d8` auf Weiß, 28-mal) und **1.59 : 1** (A4, Fußzeilenlink
und 36-px-Laufband `#c9c9c9` auf `#fafafa`, 66-mal). Beides sind exakt die Stellen, für die man
im Theme `--muted-foreground` benutzt.

Prüfung im Projekt: in DevTools die Tokens auslesen und einmal je Modus durchrechnen; im Review
zusätzlich die Kombination Light **und** Dark testen (Projektregel: jede UI-Änderung in beiden
Modi).

### 2.4 Rezepte für das expressive Profil

Alle drei Effekte sind reine Dekoration: `aria-hidden`, `pointer-events-none`, hinter dem Inhalt,
nie als Träger von Information (R47).

**Radialer Glow** – bei A2 als Farbstopps mit 0.13, 0.20 und 0.40 Alpha hinter den Sektionen
gemessen. A3 setzt ebenfalls farbige Glows ein, dort aber in seinen vier Kategorienfarben und
ohne aus den Rohdaten ablesbare Alphawerte.

```tsx
// Korridor: 1–3 Glows pro Seite · Größe 40–70vw · blur 80–160px
// Farbstopp-Alpha 0.10–0.40 · zusätzliche Elementdeckkraft 0.15–0.30
<div
  aria-hidden
  className="pointer-events-none absolute left-1/2 top-[-10%] -z-10 h-[55vw] w-[55vw]
             -translate-x-1/2 rounded-full opacity-25 blur-[120px]
             [background:radial-gradient(circle,var(--color-primary),transparent_70%)]"
/>
```

**Punktraster** – gemessen bei A2 (`radial-gradient(rgba(125,170,255,.13) 1.5px, …)`)
und A3 (`radial-gradient(rgba(255,255,255,.07) 1px, …)`).

```css
/* Korridor: Punkt 1–1.5px · Raster 16–32px · Alpha 0.05–0.13 */
.dot-grid {
  background-image: radial-gradient(
    circle,
    color-mix(in oklab, var(--foreground) 8%, transparent) 1px,
    transparent 1px
  );
  background-size: 24px 24px;
  /* zum Rand ausblenden, sonst wirkt es wie ein Fehler */
  mask-image: radial-gradient(ellipse at center, black 35%, transparent 75%);
}
```

**Grain** – **im Benchmark nicht belegt.** Keine der 10 Seiten nutzt eine Rauschtextur; A1
erreicht seine Materialität über ein Canvas. Das folgende Rezept ist eine Empfehlung, keine
Messung.

```css
/* Korridor: opacity 0.02–0.06 · baseFrequency 0.6–0.9 · nur auf dunklem Grund */
.grain::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  opacity: 0.035;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

Über 0.06 Deckkraft frisst die Textur den Textkontrast – und der wird nach R42 gemessen, nicht
nach Gefühl. Bei Zweifel: Grain weglassen, der Effekt ist auf Bildschirmen mit hoher
Pixeldichte ohnehin kaum sichtbar.

---

## 3. Scroll-Animationen

Bibliothek: **Motion** (`npm i motion`, Import aus `motion/react` – der Nachfolger von
`framer-motion`).

### 3.1 Korridore

| Eigenschaft | Korridor |
|---|---|
| Bewegung | `y` 16–40 px, zusammen mit Deckkraft 0 → 1 |
| Dauer | 0.4–0.7 s |
| Kurve | ease-out (`[0.22, 1, 0.36, 1]` oder `[0, 0, 0.58, 1]`) |
| Stagger zwischen Geschwistern | 60–120 ms |
| Blur-Reveal | 8 px → 0 px, nur auf Flächen < ~600 px |
| Wiederholung | `once: true` – Inhalt darf beim Zurückscrollen nicht verschwinden |
| Auslöseschwelle | `amount: 0.2–0.35` |
| Gleichzeitig animierte Elemente | ≤ 10 |
| Animierte Eigenschaften | nur `opacity`, `transform`, `filter` |

### 3.2 Reveal-Komponente mit belastbarem Fallback

Der entscheidende Teil ist nicht die Animation, sondern was passiert, wenn sie **nicht** läuft.
Ein `initial={{ opacity: 0 }}` schreibt den Startzustand beim SSR bereits als Inline-Style ins
HTML – ohne JavaScript bliebe der Inhalt dann für immer unsichtbar. Der naheliegende Ausweg,
vor der Hydration ein schlichtes `<div>` und danach ein `motion.div` zurückzugeben, hat einen
eigenen Preis: React sieht darin einen Typwechsel, hängt den kompletten Teilbaum ab und baut ihn
neu auf – Kindzustand und Fokus gehen verloren.

Deshalb: **kein `initial`-Prop.** Der versteckte Startzustand kommt aus CSS und existiert nur
dort, wo JavaScript läuft und Bewegung erwünscht ist. Motion animiert von dem, was es vorfindet.

```css
/* globals.css */
@media (scripting: enabled) and (prefers-reduced-motion: no-preference) {
  [data-reveal] { opacity: 0; transform: translateY(24px); }
  [data-reveal='blur'] { filter: blur(8px); }
}
```

```tsx
'use client'
import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type RevealProps = { children: ReactNode; className?: string; delay?: number; blur?: boolean }

export function Reveal({ children, className, delay = 0, blur = false }: RevealProps) {
  const reduce = useReducedMotion()
  const shown = { opacity: 1, y: 0, ...(blur && { filter: 'blur(0px)' }) }

  return (
    <motion.div
      // Elementtyp bleibt immer motion.div – kein Remount beim Umschalten
      data-reveal={blur ? 'blur' : ''}
      className={className}
      // kein initial: der Startzustand steht in CSS, das HTML bleibt ohne JS sichtbar (R46)
      whileInView={reduce ? undefined : shown}
      viewport={{ once: true, amount: 0.25, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
```

Damit greifen drei Fallbacks ohne Sonderfall im Code:

| Situation | Was passiert |
|---|---|
| kein JavaScript | `scripting: enabled` trifft nicht zu → CSS versteckt nichts → Inhalt sichtbar |
| `prefers-reduced-motion: reduce` | CSS versteckt nichts **und** `whileInView` ist `undefined` → Inhalt sichtbar |
| Browser ohne `scripting`-Media-Feature | Regel greift nicht → Inhalt sichtbar, Animation entfällt |

### 3.3 Stagger für Gruppen

Dasselbe Fallback-Prinzip wie in 3.2: kein `initial`, Startzustand aus CSS, `whileInView` bei
`reduce` abgeschaltet.

```tsx
'use client'
import { motion, useReducedMotion, type Variants } from 'motion/react'

// Ohne Tupel-Typ verbreitert TypeScript das Array zu number[] – motion erwartet ein 4er-Tupel
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

const list: Variants = { shown: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }
const item: Variants = {
  shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
}

export function CardGrid({ cards }: { cards: { id: string; title: string }[] }) {
  const reduce = useReducedMotion()

  return (
    <motion.ul
      className="grid gap-6 md:grid-cols-3"
      // kein initial="hidden": die Kinder starten über [data-reveal] aus dem CSS
      whileInView={reduce ? undefined : 'shown'}
      viewport={{ once: true, amount: 0.2 }}
      variants={list}
    >
      {cards.map((c) => (
        <motion.li key={c.id} data-reveal variants={item} className="rounded-lg border p-6">
          {c.title}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

80 ms Stagger liegt mittig im Korridor: bei 6 Karten sind das 400 ms Gesamtversatz – die Gruppe
liest sich noch als eine Bewegung. Ab etwa 150 ms zerfällt sie in Einzelauftritte.

> **Typfalle beim Easing.** In einem `variants`-Objekt verbreitert TypeScript
> `[0.22, 1, 0.36, 1]` zu `number[]`; motion erwartet aber ein 4er-Tupel und bricht mit
> `TS2322: Type 'number[]' is not assignable to type 'Easing'` ab. Als Prop direkt am Element
> (Abschnitt 3.2) fällt das nicht auf, weil die Tupelform dort aus dem Kontext abgeleitet wird.
> Deshalb die Kurve einmal als typisierte Konstante ablegen und überall wiederverwenden – im
> Smoke-Test (Anhang) war das der einzige Typfehler.

### 3.4 Reduced Motion – und warum die CSS-Standardlösung nicht reicht

Diese Regel gehört in jedes Projekt, **löst das Reveal-Problem aber nicht**:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

*Messbeleg (Block 1.8, R46):* Sie verkürzt nur Dauern. Wenn der Startzustand `opacity: 0` per
JavaScript gesetzt wird und der Auslöser nie feuert, bleibt der Inhalt unsichtbar. Genau das ist
im Benchmark messbar – Elemente unterhalb des Folds, unsichtbar oder verschoben, ohne und mit
`prefers-reduced-motion: reduce`:

| Seite | ohne `reduce` | mit `reduce` |
|---|---|---|
| A2 | 122 von 408 | **120 von 408** |
| A3 | 17 von 239 | 16 von 239 |
| B4 | 13 von 222 | 13 von 222 |
| B2 | 8 von 71 | 8 von 111 |
| A4 | 11 von 153 | 21 von 593 |

Bei keiner der fünf Seiten räumt die Einstellung den versteckten Inhalt weg: A2 löst 2 von 122
Elementen, A3 eines von 17, B4 und B2 keines. A4 wird sogar schlechter – 11 → 21 versteckte
Elemente bei fast vervierfachter Grundmenge (153 → 593). A3 und A4 haben dabei **null**
`prefers-reduced-motion`-Regeln im Stylesheet, A2 genau eine – und trotzdem 120 versteckte
Elemente. Die Zahl der Regeln sagt nichts; entscheidend ist, dass der **Endzustand** gesetzt wird.
Deshalb der frühe `return` in 3.2: bei `reduce` wird gar nicht erst animiert.

### 3.5 CSS-Variante ohne JavaScript (Progressive Enhancement)

Wo keine Steuerung durch React nötig ist, ist die scroll-getriebene CSS-Animation die
robustere Lösung: Der Inhalt ist standardmäßig sichtbar, die Animation kommt nur dort dazu,
wo Browser **und** Nutzereinstellung sie zulassen.

```css
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .reveal {
      animation: reveal-in linear both;
      animation-timeline: view();
      animation-range: entry 10% cover 35%;
    }
    @keyframes reveal-in {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: none; }
    }
  }
}
```

Kein JavaScript, kein Hydrations-Sonderfall, kein unsichtbarer Inhalt bei Ausfall. Nachteil:
keine Stagger-Steuerung über Geschwister und (Stand 2026) noch keine vollständige
Browserabdeckung – deshalb als Ergänzung, nicht als Ersatz für 3.2.

### 3.6 Leistung

- Nur `opacity`, `transform` und `filter` animieren – alles andere löst Layout-Berechnungen aus.
- `filter: blur()` ist teuer: nur auf Karten und Textblöcken, nie auf ganzen Sektionen oder
  Bildflächen über 600 px.
- `will-change` nicht pauschal setzen; Motion verwaltet das selbst.
- Bei Listen mit mehr als ~10 Elementen den Stagger auf die ersten 6–8 begrenzen und den Rest
  ohne Versatz einblenden – sonst wartet der Nutzer am Ende der Liste sichtbar.

---

## Prüfliste vor der Abnahme

**Schriften**
1. `grep -rE "fonts\.(googleapis|gstatic)\.com" .next/ dist/` findet nichts.
2. DevTools → Netzwerk → Filter `font`: alle Anfragen gehen auf die eigene Domain.
3. Alle ausgelieferten Dateien sind woff2; ≤ 4 Dateien, ≤ 200 KB für die Startseite.
4. `font-display: swap` bei jeder Textschrift; `adjustFontFallback` nicht abgeschaltet.
5. Lizenztexte liegen im Repo, Schriften sind in DESIGN-SYSTEM.md dokumentiert.
6. Höchstens 2 Familien + 1 Akzentschrift (R6).

**Farben**
7. Genau ein `--primary`; `--secondary` und `--accent` sind neutral (R3).
8. Alle Token-Paare aus 2.3 geprüft – **in Light und Dark** (R42, R43, R45).
9. `--ring` gesetzt und ≥ 3 : 1 gegen `--background`; kein `outline: none` ohne Ersatz (R45).
10. Eine Radius-Familie, Zuordnung nach Elementtyp nachvollziehbar (R24, N6).
    - Jedes in `:root` definierte Farb-Token hat eine `--color-*`-Zeile in `@theme inline`.
      Stichprobe im Build: erzeugen `bg-secondary`, `bg-popover`, `bg-destructive` und
      `bg-chart-1` tatsächlich CSS?

**Animation**
11. Mit deaktiviertem JavaScript ist jeder Inhalt sichtbar (R46).
12. Mit „Bewegung reduzieren" im Betriebssystem ist jeder Inhalt sichtbar – nicht nur schneller.
13. `once: true` überall; beim Zurückscrollen verschwindet nichts.
14. Dauer 0.4–0.7 s, Versatz 16–40 px, Stagger 60–120 ms.

---

## Anhang: Smoke-Test der Codebeispiele

Die Beispiele aus 2.2 und 3.2/3.3 wurden am 01.09.2026 in einem leeren Projekt außerhalb dieses
Repos gebaut und geprüft. Einzige Abweichung vom Dokument: die Roh-Schriftvariablen kommen aus
`@fontsource` (Abschnitt 1.4) statt aus `next/font`, weil der Test kein Next.js verwendet.

**Aufbau:** Vite 8.2.2 · React 19.2.8 · TypeScript 6.0.2 · Tailwind 4.3.3 · `@tailwindcss/vite`
4.3.3 · motion 13.1.1 · tw-animate-css 1.4.0 · `@fontsource-variable/inter` 5.3.0 ·
`@fontsource/ibm-plex-mono` 5.3.0.

**Ergebnis**

| Prüfung | Ergebnis |
|---|---|
| `tsc --noEmit` | 0 Fehler |
| `vite build` | erfolgreich, keine Warnungen |
| Utilities aus den Tokens | alle 27 geprüften erzeugt CSS (`bg-background`, `bg-card`, `bg-popover`, `bg-primary`, `bg-secondary`, `bg-accent`, `bg-muted`, `bg-destructive`, `border-border`, `border-input`, `ring-ring`, `bg-chart-1…3`, `font-sans`, `font-display`, `font-mono`, `rounded-sm/md/lg` u. a.) |
| Gegenprobe ohne `--color-secondary` | `.bg-secondary` verschwindet ersatzlos aus dem Build – die Warnung in 2.2 ist empirisch bestätigt |
| `@media (scripting: enabled)`-Block | unverändert im gebauten CSS: `[data-reveal]{opacity:0;transform:translateY(24px)}` |
| Radius-Tokens | `.rounded-sm{border-radius:calc(var(--radius) - 4px)}`, `.rounded-lg{border-radius:var(--radius)}` |

**Zwei Korrekturen gingen aus dem Test in dieses Dokument zurück:**

1. Das Easing-Array im `variants`-Objekt war der einzige Typfehler (`TS2322`) – behoben durch die
   typisierte Konstante `EASE_OUT` in 3.3.
2. `@fontsource/ibm-plex-mono` lieferte 10 woff-Dateien zusätzlich zu woff2 aus – Anlass für den
   Hinweis zu Variable-Paketen in 1.4.

**Was der Test nicht abdeckt:** Laufzeitverhalten. Dass der Inhalt ohne JavaScript und bei
`prefers-reduced-motion: reduce` tatsächlich sichtbar bleibt, folgt aus der Konstruktion (kein
`initial`-Prop, Startzustand nur in einer doppelt bedingten Media Query) und ist im Build als CSS
nachweisbar – geprüft gehört es trotzdem im Browser, siehe Prüfliste 11 und 12.
