import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoMenu from '@/components/demo/DemoMenu'
import DemoJsonLd from '@/components/demo/DemoJsonLd'
import { buildMenuSchema } from '@/components/demo/schema'
import { restaurantGlut } from '@/data/demo/restaurant-glut'

/**
 * Alle drei Karten auf einer Seite: Mittagstisch, Abendkarte, Weinkarte.
 * Die Sprungleiste unter der Navigation führt sie auf – beim Café stehen dort
 * die Kategorien, hier die Karten. Es ist dieselbe Ebene und dieselbe
 * Komponente; sie zählt schlicht auf, was in `menu.categories` steht.
 *
 * Das Segment heisst weiterhin `karte` (aus `routes.ts`, für alle Betriebe
 * gleich); wie die Seite ÜBERSCHRIEBEN ist, sagt die Datendatei – hier
 * „Karten".
 */
export const metadata: Metadata = {
  title: `${restaurantGlut.menu.title} – ${restaurantGlut.name}`,
  description: restaurantGlut.menu.note ?? restaurantGlut.tagline,
}

export default function RestaurantDemoMenuPage() {
  return (
    <DemoShell business={restaurantGlut} current="menu">
      <DemoJsonLd schema={buildMenuSchema(restaurantGlut)} />
      <DemoMenu business={restaurantGlut} />
    </DemoShell>
  )
}
