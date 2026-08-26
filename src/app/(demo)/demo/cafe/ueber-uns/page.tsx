import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoAbout from '@/components/demo/DemoAbout'
import { cafeKlee } from '@/data/demo/cafe-klee'

/**
 * „Über uns" – Lead und drei Blöcke im Bild-Text-Wechsel, zum Schluss der Weg
 * zur Karte bzw. zum Kontakt.
 *
 * Kein eigenes JSON-LD: die Seite behauptet nichts, was nicht schon im
 * `Restaurant`-Markup der Startseite steht.
 */
export const metadata: Metadata = {
  title: `${cafeKlee.about.title} – ${cafeKlee.name}`,
  description: cafeKlee.about.lead,
}

export default function CafeDemoAboutPage() {
  return (
    <DemoShell business={cafeKlee} current="about">
      <DemoAbout business={cafeKlee} />
    </DemoShell>
  )
}
