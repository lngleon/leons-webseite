import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoAbout from '@/components/demo/DemoAbout'
import { barbierKlinge } from '@/data/demo/barbier-klinge'

/**
 * „Über uns" – Lead, drei Blöcke im Bild-Text-Wechsel, das Team und zum
 * Schluss der Weg zu den Preisen bzw. zum Termin. Der Team-Block hängt am
 * Feld `team` und rendert in `DemoAbout` – dieselbe Mechanik wie beim
 * Friseur.
 *
 * Kein eigenes JSON-LD: die Personen stehen als `employee` bereits im
 * Betriebs-Knoten der Startseite.
 */
export const metadata: Metadata = {
  title: `${barbierKlinge.about.title} – ${barbierKlinge.name}`,
  description: barbierKlinge.about.lead,
}

export default function BarbierDemoAboutPage() {
  return (
    <DemoShell business={barbierKlinge} current="about">
      <DemoAbout business={barbierKlinge} />
    </DemoShell>
  )
}
