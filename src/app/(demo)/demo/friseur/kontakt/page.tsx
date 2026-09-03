import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoLocation from '@/components/demo/DemoLocation'
import DemoHours from '@/components/demo/DemoHours'
import DemoContact from '@/components/demo/DemoContact'
import { friseurWirbel } from '@/data/demo/friseur-wirbel'

/**
 * Adresse, Öffnungszeiten, Telefon und die vorbereitete Terminanfrage.
 *
 * Seit 03.09.2026 trägt der Salon `booking` – `DemoContact` zeigt deshalb
 * unter Telefon und Mail von selbst den Einstieg in die Termin-Attrappe.
 * Die Komponente ist Zeichen für Zeichen dieselbe wie bei den anderen
 * Betrieben: sie fragt nach dem Feld, nicht nach der Branche.
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
