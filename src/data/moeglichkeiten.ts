/** Inhalte der stillen Showcase-Seite /moeglichkeiten ("Was möglich ist").
 *  Keine erfundenen Daten/Zahlen/Testimonials – nur echte Effekte + echter Stack. */

export const moeglichkeitenIntro = {
  eyebrow: 'Showcase',
  title: 'Was möglich ist',
  subline:
    'Ein paar Effekte und Interaktionen aus meinem Werkzeugkasten – ein Eindruck davon, was für deine Seite möglich ist.',
} as const

/**
 * Lighthouse – die Zahlen der Bento-Zelle „Diese Seite selbst". Bis zum
 * 27.08.2026 stand dort ein sichtbarer Platzhalter („—"), weil keine erfundene
 * Zahl auf dieser Seite stehen sollte.
 *
 * **Seit dem 28.08.2026 stehen ZWEI Messungen da, und das ist der Punkt.**
 * Gross sind die Werte der **Startseite** – das ist die Seite, um die es im
 * Verkaufsgespräch geht, und sie ist die ehrliche Antwort auf „wie schnell
 * baust du?". Daneben, kleiner aber nicht versteckt, bleibt die Zahl dieser
 * Showcase-Seite stehen, samt Grund. Keine der beiden fällt weg: die 96 ohne
 * die 79 wäre Rosinenpickerei, die 79 allein wäre die Effekt-Seite als Maßstab
 * für alles andere.
 *
 * Messbedingungen stehen HIER und nicht nur im Protokoll, weil eine
 * Lighthouse-Zahl ohne sie nichts bedeutet: Lighthouse 12.8.2 CLI, Preset
 * **Mobil** (412 × 823, DPR 1,75, simulierte Drosselung – Slow 4G, CPU 4×),
 * gegen den **Produktionsbuild** (`next build` + `next start`) auf dem eigenen
 * Rechner. Kein Deploy, keine Vercel-Umgebung – die Vercel-Settings sind noch
 * offen, siehe TODO. **Median aus je drei Läufen**, nicht der beste, und beide
 * Seiten gegen denselben Build in derselben Sitzung gemessen.
 *
 * Die Rohläufe, damit der Median überprüfbar bleibt:
 * Startseite 96 / 96 / 96 (LCP 2,6 s · TBT 81 ms · CLS 0),
 * `/moeglichkeiten` 79 / 74 / 79 (LCP 3,6 s · TBT 450 ms · CLS 0).
 *
 * Protokolliert, weil es sonst nach Schönrechnen aussähe: eine allererste
 * Runde am 27.08.2026 auf einem noch mit dem Build beschäftigten Rechner ergab
 * für `/moeglichkeiten` 66 / 70 / 78 – dieselbe Seite, derselbe Modus, eine
 * Streuung von zwölf Punkten. Wer eine einzelne Lighthouse-Zahl notiert,
 * notiert unter Umständen die Auslastung seines Rechners.
 *
 * **Warum 79 und nicht 96 auf dieser Seite** – ungeschönt: LCP 3,6 s und TBT
 * 450 ms gegen 2,6 s und 81 ms auf der Startseite. Beide liefern statisches
 * HTML; diese hier holt zusätzlich Tilt, Globus, Funken, Marquee und die
 * Entrance-Animationen nach, und genau das kostet auf einem gedrosselten
 * Mobilgerät. Das ist keine Panne, sondern der Preis einer Seite, die Effekte
 * vorführt – und der Grund, warum die Startseite ohne sie auskommt. **CLS ist
 * auf beiden 0.**
 *
 * Best Practices 96 statt 100 hat auf BEIDEN Seiten genau eine Ursache, und
 * sie ist lokal: der 404 auf `/_vercel/insights/script.js`. Das Skript gibt es
 * nur auf Vercel – bei `next start` fehlt es zwangsläufig und landet als
 * Konsolenfehler im Bericht.
 */
export const lighthouse = {
  gemessenAm: '28.08.2026',
  bedingungen:
    'Lighthouse 12.8.2, Mobil-Preset, lokal gegen next start · Median aus je 3 Läufen',
  /** Die Hauptzahlen der Zelle – ausdrücklich die Startseite. */
  hauptseite: {
    label: 'Startseite',
    kategorien: [
      { label: 'Performance', wert: 96 },
      { label: 'Barrierefreiheit', wert: 100 },
      { label: 'Best Practices', wert: 96 },
      { label: 'SEO', wert: 100 },
    ],
    metriken: 'LCP 2,6 s · TBT 81 ms · CLS 0',
  },
  /** Diese Seite hier – bleibt sichtbar daneben stehen, mit ihrem Grund. */
  showcase: {
    label: 'Diese Showcase-Seite',
    performance: 79,
    grund:
      'Effekt-Seite: Tilt, Globus, Funken und Marquee laden zusätzlich JavaScript nach (LCP 3,6 s · TBT 450 ms · CLS 0). Barrierefreiheit, Best Practices und SEO sind identisch.',
  },
} as const

/** Leons echter Tech-Stack (Marquee). Keine Logos/Zahlen, nur Namen. */
export const techStack: string[] = [
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Framer Motion',
  'Vercel',
]
