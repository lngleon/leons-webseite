/** Inhalte der Projekte-Sektion (zwei Showcases).
 *  Live-Links sind bewusst ÄNDERBARE Felder – bei Umstellung auf die finalen
 *  Domains hier anpassen (siehe docs/CURRENT-SCHEMA: Blumen Lang / Naillery).
 *  Keine erfundenen Zahlen/Claims – nur Name, Typzeile, Vorschaubild, Live-URL. */

export type Project = {
  name: string
  /** Kurze Typzeile, z.B. „Website · …". */
  type: string
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
  title: 'Schon live im Netz.',
  subline: 'Eine Website und eine eigene Plattform — beide kannst du dir direkt ansehen.',
} as const

export const projects: Project[] = [
  {
    name: 'Blumen Lang',
    type: 'Website · Gärtnerei & Blumengroßhandel',
    href: 'https://blumen-lang-start.vercel.app/',
    image: '/blumen-lang-preview.webp',
    width: 1280,
    height: 610,
  },
  {
    name: 'Naillery',
    type: 'Eigene Plattform · für Nagelstudios',
    href: 'https://naillery-v2.vercel.app/',
    image: '/naillery-preview.webp',
    width: 1280,
    height: 603,
  },
]
