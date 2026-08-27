import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoLocation from '@/components/demo/DemoLocation'
import DemoHours from '@/components/demo/DemoHours'
import DemoContact from '@/components/demo/DemoContact'
import { friseurWirbel } from '@/data/demo/friseur-wirbel'

/**
 * Adresse, Öffnungszeiten, Telefon und die vorbereitete Terminanfrage.
 *
 * KEIN Buchungsflow – bewusst ein Non-Goal dieser Stufe. Weil `booking` in den
 * Daten fehlt, lässt `DemoContact` den Einstieg dorthin von selbst weg; die
 * Komponente ist Zeichen für Zeichen dieselbe wie beim Restaurant, das den
 * Einstieg zeigt. Genau das war der Punkt: sie fragt nach dem Feld, nicht nach
 * der Branche.
 *
 * Kein JSON-LD: Adresse und Zeiten stehen bereits im Betriebs-Markup der
 * Startseite; sie hier ein zweites Mal auszugeben würde denselben Betrieb
 * doppelt behaupten.
 */
export const metadata: Metadata = {
  title: `${friseurWirbel.contact.title} – ${friseurWirbel.name}`,
  description: friseurWirbel.contact.reservation.note,
}

export default function FriseurDemoContactPage() {
  return (
    <DemoShell business={friseurWirbel} current="contact">
      <DemoLocation business={friseurWirbel} />
      <DemoHours business={friseurWirbel} />
      <DemoContact business={friseurWirbel} />
    </DemoShell>
  )
}
