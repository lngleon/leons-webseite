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
 * **Es stehen ZWEI Messungen da, und das ist der Punkt.** Gross die Werte der
 * **Startseite** – das ist die Seite, um die es im Verkaufsgespräch geht.
 * Daneben, kleiner aber nicht versteckt, die Zahl dieser Showcase-Seite. Keine
 * der beiden fällt weg, und die Zahl steht auf der Seite, die sie beschreibt:
 * eine veraltete Zahl wäre hier eine Falschaussage, keine Ungenauigkeit.
 *
 * Messbedingungen stehen HIER und nicht nur im Protokoll, weil eine
 * Lighthouse-Zahl ohne sie nichts bedeutet: Lighthouse 12.8.2 CLI, Preset
 * **Mobil** (412 × 823, DPR 1,75, simulierte Drosselung – Slow 4G, CPU 4×),
 * gegen den **Produktionsbuild** (`next build` + `next start`) auf dem eigenen
 * Rechner. Kein Deploy – die Vercel-Settings sind noch offen, siehe TODO.
 * **Median aus je drei Läufen**, beide Seiten gegen denselben Build.
 *
 * Rohläufe vom 31.08.2026 (Hero mit der fiktiven, gezeichneten Bühne –
 * kein Bild mehr im Hero):
 * Startseite **95 / 95 / 95** (LCP 2,9 s · TBT 58–97 ms · CLS 0),
 * `/moeglichkeiten` **95 / 96 / 95** (LCP 2,9 s · TBT 30–41 ms · CLS 0).
 * Die Startseite stand am 28.08.2026 bei 96 (LCP 2,6 s, Element: die H1);
 * LCP-Element ist jetzt die Hero-Unterzeile (Text, kein Bild), der eine
 * Punkt liegt an den ~0,2 s mehr bis dahin – im Bereich des Messrauschens
 * der Läufe selbst, hier nicht wegerklärt. Gemessen NUR auf ruhigem
 * Rechner: eine Runde mit 35 verwaisten `next start`-Servern im
 * Hintergrund zeigte 58–68 und wurde verworfen.
 *
 * **Vorher standen hier 79 gegen 96, und der Abstand hatte einen Grund, der
 * kein Naturgesetz war.** Gemessen per Ablation – jeden Effekt einzeln aus dem
 * Build genommen, drei Läufe je Variante – zeigte sich: mit allen Effekten
 * 431 ms Blocking Time, **ohne den Globus 28 ms, ohne die Funken 26 ms**.
 * Nicht additiv, sondern ein Paar: zwei gestapelte Canvas, die beim Mount
 * gleichzeitig hochfahren (WebGL-Context, Textur, Partikel) – und zwar beim
 * Seitenaufbau, zwei Bildschirme bevor man sie sieht. Ihre rAF-Schleifen
 * pausierten ausserhalb des Sichtfelds schon vorher; der Mount liess sich
 * nicht pausieren, nur verschieben. Genau das tut jetzt `LazyVisible`:
 * **kein Effekt ist verschwunden, keiner wurde abgeschwächt** – sie starten
 * 800 px vor dem Sichtfeld statt beim Seitenaufbau. Tilt, Marquee und CoolMode
 * blieben unangetastet; die Ablation hat ihnen keine messbare Zeit zugeordnet.
 *
 * Seit dem 31.08.2026 stehen beide Seiten bei 95 – ein Unterschied in der
 * Grössenordnung des Messrauschens wird hier weder behauptet noch wegerklärt.
 *
 * Best Practices 96 statt 100 hat auf BEIDEN Seiten genau eine Ursache, und
 * sie ist lokal: der 404 auf `/_vercel/insights/script.js`. Das Skript gibt es
 * nur auf Vercel – bei `next start` fehlt es zwangsläufig und landet als
 * Konsolenfehler im Bericht.
 */
export const lighthouse = {
  gemessenAm: '31.08.2026',
  bedingungen:
    'Lighthouse 12.8.2, Mobil-Preset, lokal gegen next start · Median aus je 3 Läufen',
  /** Die Hauptzahlen der Zelle – ausdrücklich die Startseite. */
  hauptseite: {
    label: 'Startseite',
    kategorien: [
      { label: 'Performance', wert: 95 },
      { label: 'Barrierefreiheit', wert: 100 },
      { label: 'Best Practices', wert: 96 },
      { label: 'SEO', wert: 100 },
    ],
    metriken: 'LCP 2,9 s · TBT 58–97 ms · CLS 0',
  },
  /** Diese Seite hier – bleibt sichtbar daneben stehen. */
  showcase: {
    label: 'Diese Showcase-Seite',
    performance: 95,
    grund:
      'Gleicher Stack, gleiche Auslieferung – Globus und Funken starten seit dem 28.08.2026 erst kurz vor dem Sichtfeld statt beim Seitenaufbau (LCP 2,9 s · TBT 30–41 ms · CLS 0, vorher 79 bei 450 ms). Kein Effekt wurde dafür entfernt.',
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
