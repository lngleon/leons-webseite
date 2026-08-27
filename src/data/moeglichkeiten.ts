/** Inhalte der stillen Showcase-Seite /moeglichkeiten ("Was möglich ist").
 *  Keine erfundenen Daten/Zahlen/Testimonials – nur echte Effekte + echter Stack. */

export const moeglichkeitenIntro = {
  eyebrow: 'Showcase',
  title: 'Was möglich ist',
  subline:
    'Ein paar Effekte und Interaktionen aus meinem Werkzeugkasten – ein Eindruck davon, was für deine Seite möglich ist.',
} as const

/**
 * Lighthouse, gemessen am 27.08.2026 – die Zahlen der Bento-Zelle „Diese Seite
 * selbst". Bis dahin stand dort ein sichtbarer Platzhalter („—"), weil keine
 * erfundene Zahl auf dieser Seite stehen sollte.
 *
 * Messbedingungen stehen HIER und nicht nur im Protokoll, weil eine
 * Lighthouse-Zahl ohne sie nichts bedeutet: Lighthouse 12.8.2 CLI, Preset
 * **Mobil** (412 × 823, DPR 1,75, simulierte Drosselung – Slow 4G, CPU 4×),
 * gegen den **Produktionsbuild** (`next build` + `next start`) auf dem
 * eigenen Rechner. Kein Deploy, keine Vercel-Umgebung – die Vercel-Settings
 * sind noch offen, siehe TODO.
 *
 * **Median aus drei Läufen gegen den FINALEN Build**, nicht der beste:
 * Performance kam auf 80 / 80 / 81. Genommen ist die mittlere Zahl.
 *
 * Protokolliert, weil es sonst nach Schönrechnen aussähe: eine erste Runde auf
 * einem noch beschäftigten Rechner (parallel laufender Build) ergab 66 / 70 /
 * 78 – dieselben vier Kategorien, aber eine Streuung von zwölf Punkten. Die
 * hier eingetragene Runde streut einen Punkt und ist deshalb die belastbarere.
 * Gemessen wurde beide Male derselbe Produktionsbuild-Modus, nicht zwei
 * verschiedene Seiten.
 *
 * Warum 80 und nicht 100 – ungeschönt: **LCP 3,4 s** und **TBT 460 ms** (beide
 * Median). Die Seite liefert statisches HTML, holt aber für Tilt, Globus,
 * Funken, Marquee und die Entrance-Animationen eine ganze Menge JavaScript
 * nach – auf einem gedrosselten Mobilgerät kostet genau das. Das ist keine
 * Panne, sondern der Preis der Showcase-Seite: sie führt Effekte vor. **CLS
 * ist 0.** Auf der Startseite, die kaum etwas davon lädt, wäre die Zahl eine
 * andere; gemessen ist hier ausdrücklich DIESE Seite, weil die Zelle „die
 * Seite, auf der du gerade bist" verspricht.
 *
 * Best Practices 96 statt 100 hat genau eine Ursache, und sie ist lokal: der
 * 404 auf `/_vercel/insights/script.js`. Das Skript gibt es nur auf Vercel –
 * bei `next start` fehlt es zwangsläufig und landet als Konsolenfehler im
 * Bericht.
 */
export const lighthouse = {
  gemessenAm: '27.08.2026',
  bedingungen: 'Lighthouse 12.8.2, Mobil-Preset, lokal gegen next start · Median aus 3 Läufen',
  kategorien: [
    { label: 'Performance', wert: 80 },
    { label: 'Barrierefreiheit', wert: 100 },
    { label: 'Best Practices', wert: 96 },
    { label: 'SEO', wert: 100 },
  ],
  /** Die zwei Zahlen, die die 70 erklären, plus der Wert, der stimmt. */
  metriken: 'LCP 3,4 s · TBT 460 ms · CLS 0',
} as const

/** Leons echter Tech-Stack (Marquee). Keine Logos/Zahlen, nur Namen. */
export const techStack: string[] = [
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Framer Motion',
  'Vercel',
]
