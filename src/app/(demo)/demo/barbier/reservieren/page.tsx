import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoBooking from '@/components/demo/DemoBooking'
import { barbierKlinge } from '@/data/demo/barbier-klinge'

const booking = barbierKlinge.booking

/**
 * Die Termin-ATTRAPPE des Barbiers – fünf Schritte, die nichts tun.
 * Schritt 1 läuft im LEISTUNGS-Modus (`booking.choices`): „Was dürfen wir
 * machen?" statt einer Personenzahl.
 *
 * `(Vorschau)` steht im Titel und damit im Browser-Tab: die erste
 * Kennzeichnung ist schon da, bevor jemand die Seite gelesen hat.
 */
export const metadata: Metadata = {
  title: booking ? `${booking.title} (Vorschau) – ${barbierKlinge.name}` : barbierKlinge.name,
  description: booking?.intro,
}

export default function BarbierDemoBookingPage() {
  return (
    <DemoShell business={barbierKlinge} current="booking">
      <DemoBooking business={barbierKlinge} />
    </DemoShell>
  )
}
