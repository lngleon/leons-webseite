import { demoHref } from '@/components/demo/routes'
import type { GastroBusiness } from './demo/types'
import { cafeKlee } from './demo/cafe-klee'
import { restaurantGlut } from './demo/restaurant-glut'
import { friseurWirbel } from './demo/friseur-wirbel'

/**
 * Die drei Musterseiten, wie sie auf `/moeglichkeiten` als Karten erscheinen.
 *
 * **Abgeleitet, nicht abgeschrieben.** Name, Branche und die eine Zeile je
 * Karte kommen aus den Datendateien der Betriebe selbst (`name`, `kind`,
 * `tagline`) – dieselben Strings, die auch im Kopf der jeweiligen Demo stehen.
 * Wer dort etwas ändert, ändert die Karte mit; hier gibt es keinen zweiten
 * Wortlaut, der auseinanderlaufen könnte. Auch der Link kommt nicht als
 * getippter Pfad, sondern aus `demoHref()`, derselben Funktion, die schon
 * Navigation, Fuß und schema.org der Demos bedient.
 *
 * **Diese Datei darf NUR aus Server-Komponenten importiert werden.** Sie zieht
 * die drei vollständigen Betriebs-Objekte herein – Karten, Öffnungszeiten,
 * Rechtstexte, alles. In einer Client-Komponente landete das komplett im
 * Browser-Bundle, für drei Überschriften und drei Sätze. `DemoShowcase` ist
 * deshalb bewusst ohne `'use client'` und wird als fertiger Knoten in die
 * Client-Komponente `Moeglichkeiten` hineingereicht.
 *
 * Das Vorschaubild ist das Einzige, was hier NEU dazukommt und nicht aus der
 * Datendatei stammen kann: es ist ein echter Screenshot der eigenen Demo-
 * Startseite aus dem eigenen Build (1280×800 bei DPR 2 aufgenommen, auf
 * 1120×700 heruntergerechnet, WebP q80). Alle drei haben exakt dasselbe Maß –
 * ein Verhältnis für alle drei Karten, damit die Reihe ruhig steht.
 */
export type DemoPreview = {
  slug: string
  /** Betriebsname, z.B. „Café Klee" – aus der Datendatei. */
  name: string
  /** Branche als Eyebrow, z.B. „Café & Backstube" – aus der Datendatei. */
  kind: string
  /** Die eine Zeile der Karte, z.B. „Erst beraten, dann schneiden." */
  tagline: string
  /** `/demo/<slug>`, gebaut mit `demoHref` statt getippt. */
  href: string
  image: string
  width: number
  height: number
}

/** Einheitliches Maß aller drei Screenshots – siehe Kopfkommentar. */
const SHOT_WIDTH = 1120
const SHOT_HEIGHT = 700

function toPreview(business: GastroBusiness): DemoPreview {
  return {
    slug: business.slug,
    name: business.name,
    kind: business.kind,
    tagline: business.tagline,
    href: demoHref(business.slug, 'start'),
    image: `/demo-${business.slug}-preview.webp`,
    width: SHOT_WIDTH,
    height: SHOT_HEIGHT,
  }
}

/** Reihenfolge = Entstehungsreihenfolge der drei Demos. */
export const demoPreviews: DemoPreview[] = [cafeKlee, restaurantGlut, friseurWirbel].map(
  toPreview,
)

export const demoShowcaseIntro = {
  title: 'Drei Betriebe, drei Seiten.',
  subline:
    'Die Betriebe sind erfunden, die Seiten sind echt – jede vollständig begehbar, sechs Unterseiten, ohne JavaScript bedienbar.',
} as const
