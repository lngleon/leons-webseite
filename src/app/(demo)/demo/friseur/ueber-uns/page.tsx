import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoAbout from '@/components/demo/DemoAbout'
import { friseurWirbel } from '@/data/demo/friseur-wirbel'

/**
 * „Über uns" – Lead, drei Blöcke im Bild-Text-Wechsel, DAS TEAM und zum
 * Schluss der Weg zu den Leistungen bzw. zum Termin.
 *
 * Der Team-Block ist neu und die dritte Eigenheit, die dieser Betrieb
 * mitbringt. Er steht nicht hier in der Seite, sondern in `DemoAbout`:
 * zwischen den Erzählblöcken und dem Abbinder, gebunden an das Feld `team`.
 * Café und Restaurant haben das Feld nicht und rendern dort unverändert
 * nichts – die Seite hier sieht deshalb aus wie ihre beiden Vorgänger.
 *
 * Kein eigenes JSON-LD: die Personen stehen als `employee` bereits im
 * Betriebs-Knoten der Startseite.
 */
export const metadata: Metadata = {
  title: `${friseurWirbel.about.title} – ${friseurWirbel.name}`,
  description: friseurWirbel.about.lead,
}

export default function FriseurDemoAboutPage() {
  return (
    <DemoShell business={friseurWirbel} current="about">
      <DemoAbout business={friseurWirbel} />
    </DemoShell>
  )
}
