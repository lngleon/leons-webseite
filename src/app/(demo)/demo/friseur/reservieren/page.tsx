import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoBooking from '@/components/demo/DemoBooking'
import { friseurWirbel } from '@/data/demo/friseur-wirbel'

const booking = friseurWirbel.booking

/**
 * Die Termin-ATTRAPPE des Salons – fünf Schritte, die nichts tun
 * (seit 03.09.2026). Erste Strecke im LEISTUNGS-Modus: Schritt 1 zeigt die
 * buchbaren Leistungen (`booking.choices`) statt einer Personenzahl; alles,
 * was eine Haarprobe braucht, verweist die Strecke bewusst ans Telefon.
 *
 * `(Vorschau)` steht im Titel und damit im Browser-Tab: die erste
 * Kennzeichnung ist schon da, bevor jemand die Seite gelesen hat.
 */
export const metadata: Metadata = {
  title: booking ? `${booking.title} (Vorschau) – ${friseurWirbel.name}` : friseurWirbel.name,
  description: booking?.intro,
}

export default function FriseurDemoBookingPage() {
  return (
    <DemoShell business={friseurWirbel} current="booking">
      <DemoBooking business={friseurWirbel} />
    </DemoShell>
  )
}
