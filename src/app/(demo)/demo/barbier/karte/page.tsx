import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoMenu from '@/components/demo/DemoMenu'
import DemoJsonLd from '@/components/demo/DemoJsonLd'
import { buildOfferCatalogSchema } from '@/components/demo/schema'
import { barbierKlinge } from '@/data/demo/barbier-klinge'

/**
 * Alle Preise auf einer Seite: Schnitt, Bart & Rasur, Kombis, Kleinigkeiten.
 * Das Segment heisst weiterhin `karte` (aus `routes.ts`, für alle Betriebe
 * gleich); wie die Seite ÜBERSCHRIEBEN ist, sagt die Datendatei – hier
 * „Preise". Dieselbe Entscheidung wie bei Friseur und Restaurant.
 *
 * `buildOfferCatalogSchema` statt `buildMenuSchema`, wie beim Friseur: ein
 * Barbier verkauft Dienstleistungen, kein Essen – `Menu` wäre nach schema.org
 * schlicht falsch.
 */
export const metadata: Metadata = {
  title: `${barbierKlinge.menu.title} – ${barbierKlinge.name}`,
  description: barbierKlinge.menu.note ?? barbierKlinge.tagline,
}

export default function BarbierDemoMenuPage() {
  return (
    <DemoShell business={barbierKlinge} current="menu">
      <DemoJsonLd schema={buildOfferCatalogSchema(barbierKlinge)} />
      <DemoMenu business={barbierKlinge} />
    </DemoShell>
  )
}
