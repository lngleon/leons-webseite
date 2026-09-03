import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoBooking from '@/components/demo/DemoBooking'
import { cafeKlee } from '@/data/demo/cafe-klee'

const booking = cafeKlee.booking

/**
 * Die Reservierungs-ATTRAPPE des Cafés – fünf Schritte, die nichts tun
 * (seit 03.09.2026, gleiche Strecke wie beim Restaurant, nur mit den Zeiten
 * und Texten dieses Betriebs aus `cafe-klee.ts`).
 *
 * `(Vorschau)` steht im Titel und damit im Browser-Tab: die erste
 * Kennzeichnung ist schon da, bevor jemand die Seite gelesen hat.
 */
export const metadata: Metadata = {
  title: booking ? `${booking.title} (Vorschau) – ${cafeKlee.name}` : cafeKlee.name,
  description: booking?.intro,
}

export default function CafeDemoBookingPage() {
  return (
    <DemoShell business={cafeKlee} current="booking">
      <DemoBooking business={cafeKlee} />
    </DemoShell>
  )
}
