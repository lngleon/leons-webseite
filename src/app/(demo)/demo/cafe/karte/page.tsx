import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoMenu from '@/components/demo/DemoMenu'
import DemoJsonLd from '@/components/demo/DemoJsonLd'
import { buildMenuSchema } from '@/components/demo/schema'
import { cafeKlee } from '@/data/demo/cafe-klee'

/**
 * Die volle Speisekarte als eigene Seite. Sprungmarken auf die Kategorien
 * klebt `DemoCategoryRail` unter die Navigation; die Allergen-Legende steht
 * am Ende der Karte, dort wo auch die Kürzel stehen.
 *
 * Titel und Beschreibung setzen sich aus vorhandenen Daten zusammen – auf der
 * Demo gibt es keine eigene SEO-Copy je Seite.
 */
export const metadata: Metadata = {
  title: `${cafeKlee.menu.title} – ${cafeKlee.name}`,
  description: cafeKlee.menu.note ?? cafeKlee.tagline,
}

export default function CafeDemoMenuPage() {
  return (
    <DemoShell business={cafeKlee} current="menu">
      <DemoJsonLd schema={buildMenuSchema(cafeKlee)} />
      <DemoMenu business={cafeKlee} />
    </DemoShell>
  )
}
