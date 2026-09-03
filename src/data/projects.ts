/** Inhalte der Projekte-Sektion (zwei Live-Showcases + Intro-Texte).
 *  Die drei Musterseiten der Sektion kommen NICHT von hier, sondern aus
 *  `src/data/demos.ts` (`demoPreviews`) – dieselbe Quelle wie auf
 *  `/moeglichkeiten`, damit es keinen zweiten Wortlaut gibt. Sie werden in
 *  `page.tsx` (Server) geladen und der Client-Sektion als Prop hineingereicht.
 *  Live-Links sind bewusst ÄNDERBARE Felder – bei Umstellung auf die finalen
 *  Domains hier anpassen (siehe docs/CURRENT-SCHEMA: Blumen Lang / Naillery).
 *  Keine erfundenen Zahlen/Claims – nur Name, Branche, Art, Vorschaubild, Live-URL. */

export type Project = {
  name: string
  /** Branche als Eyebrow in Akzent, z.B. „Gärtnerei & Blumengroßhandel". */
  branche: string
  /** Was es ist, z.B. „Website" oder „Eigene Plattform". */
  art: string
  /** Live-URL (aktuell) – änderbar (später finale Domain). */
  href: string
  /** Statisches Vorschaubild aus public/. */
  image: string
  /** Intrinsische Bildmaße (für width/height am <img> → CLS/Lighthouse, wie das Porträt). */
  width: number
  height: number
}

export const projectsIntro = {
  eyebrow: 'Ausgewählte Projekte',
  title: 'Sechs Projekte, sechs Branchen.',
  subline:
    'Zwei Projekte sind live im Netz, vier sind vollständige Musterseiten – alle kannst du dir direkt ansehen. Vielleicht ist deine Branche schon dabei.',
} as const

/** Zwischenüberschrift über der Musterseiten-Reihe (unter den Live-Karten). */
export const musterIntro = {
  title: 'Und vier komplette Musterbetriebe.',
  subline:
    'Die Betriebe sind erfunden, die Seiten sind echt – jede vollständig begehbar, mit Buchungs-Vorschau und einen Klick entfernt.',
} as const

export const projects: Project[] = [
  {
    name: 'Blumen Lang',
    branche: 'Gärtnerei & Blumengroßhandel',
    art: 'Website',
    href: 'https://blumen-lang-start.vercel.app/',
    image: '/blumen-lang-preview.webp',
    width: 1280,
    height: 610,
  },
  {
    name: 'Naillery',
    branche: 'Nagelstudios',
    art: 'Eigene Plattform',
    href: 'https://naillery-v2.vercel.app/',
    image: '/naillery-preview.webp',
    width: 1280,
    height: 603,
  },
]
