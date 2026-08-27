import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoAbout from '@/components/demo/DemoAbout'
import { restaurantGlut } from '@/data/demo/restaurant-glut'

/**
 * „Über uns" – Lead und drei Blöcke im Bild-Text-Wechsel, zum Schluss der Weg
 * zu den Karten bzw. zur Reservierung.
 *
 * Kein eigenes JSON-LD: die Seite behauptet nichts, was nicht schon im
 * `Restaurant`-Markup der Startseite steht.
 */
export const metadata: Metadata = {
  title: `${restaurantGlut.about.title} – ${restaurantGlut.name}`,
  description: restaurantGlut.about.lead,
}

export default function RestaurantDemoAboutPage() {
  return (
    <DemoShell business={restaurantGlut} current="about">
      <DemoAbout business={restaurantGlut} />
    </DemoShell>
  )
}
