import type { Metadata } from 'next'

/**
 * Pro-Route-Metadaten – Single Source of Truth fuer Title/Description/OpenGraph.
 * Loest die frueher hier lebende `META`-Map aus `scripts/prerender.mjs` ab;
 * die Werte sind inhaltlich UNVERAENDERT uebernommen.
 *
 * og:title/og:description spiegeln Title/Description, og:type = "website".
 * og:image/og:url bewusst NICHT gesetzt (kein Logo, keine finale Domain).
 */
export type RouteMeta = { title: string; description: string }

export const routeMeta = {
  home: {
    title: 'Leon Lang – Webseiten, Web-Apps & KI-Integration',
    description:
      'Moderne Webseiten, Web-Apps und KI-Lösungen – individuell programmiert von Leon Lang. Von der Idee bis zum Launch, alles aus einer Hand.',
  },
  impressum: {
    title: 'Impressum – Leon Lang',
    description: 'Impressum und rechtliche Angaben von Leon Lang.',
  },
  datenschutz: {
    title: 'Datenschutz – Leon Lang',
    description: 'Datenschutzerklärung von Leon Lang.',
  },
  moeglichkeiten: {
    title: 'Möglichkeiten – Leon Lang',
    description:
      'Interaktive Demos und Effekte – ein Einblick, was für deine Seite möglich ist.',
  },
} as const satisfies Record<string, RouteMeta>

/**
 * Baut aus einem Meta-Eintrag das `Metadata`-Objekt fuer eine Route: Title +
 * Description + gespiegeltes Basis-OpenGraph. Genau ein Title/eine Description
 * pro Route (Next ueberschreibt die Layout-Defaults).
 */
export function pageMetadata({ title, description }: RouteMeta): Metadata {
  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
  }
}
