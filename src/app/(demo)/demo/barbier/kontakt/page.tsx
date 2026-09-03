import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoLocation from '@/components/demo/DemoLocation'
import DemoHours from '@/components/demo/DemoHours'
import DemoContact from '@/components/demo/DemoContact'
import { barbierKlinge } from '@/data/demo/barbier-klinge'

/**
 * Adresse, Öffnungszeiten, Telefon und die vorbereitete Terminanfrage.
 * Weil der Betrieb `booking` trägt, zeigt `DemoContact` darunter von selbst
 * den Einstieg in die Termin-Attrappe – eine Feldfrage, keine Betriebsfrage.
 *
 * Kein JSON-LD: Adresse und Zeiten stehen bereits im Betriebs-Markup der
 * Startseite; sie hier ein zweites Mal auszugeben würde denselben Betrieb
 * doppelt behaupten.
 */
export const metadata: Metadata = {
  title: `${barbierKlinge.contact.title} – ${barbierKlinge.name}`,
  description: barbierKlinge.contact.reservation.note,
}

export default function BarbierDemoContactPage() {
  return (
    <DemoShell business={barbierKlinge} current="contact">
      <DemoLocation business={barbierKlinge} />
      <DemoHours business={barbierKlinge} />
      <DemoContact business={barbierKlinge} />
    </DemoShell>
  )
}
