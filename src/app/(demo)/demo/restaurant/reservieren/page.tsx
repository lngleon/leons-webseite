import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoBooking from '@/components/demo/DemoBooking'
import { restaurantGlut } from '@/data/demo/restaurant-glut'

const booking = restaurantGlut.booking

/**
 * Die Reservierungs-ATTRAPPE – fünf Schritte, die nichts tun.
 *
 * `(Vorschau)` steht im Titel und damit im Browser-Tab: die erste
 * Kennzeichnung ist schon da, bevor jemand die Seite gelesen hat.
 *
 * `current="booking"` markiert bewusst KEINEN Punkt in der Navigations-Pille.
 * `DemoNav` zählt seine vier Einträge fest auf, `booking` ist keiner davon –
 * also gibt es hier kein `aria-current`, das eine Seite behauptet, auf der man
 * gar nicht ist. Genau so verhalten sich `imprint` und `privacy` schon heute.
 * Der Einstieg steht stattdessen auf der Kontaktseite; eine fünfte Beschriftung
 * in der Pille hätte bei 320 px die wichtigsten Ziele weiter aus dem Bild
 * geschoben (gemessene Zahlen im Kommentarkopf von `routes.ts`).
 */
export const metadata: Metadata = {
  title: booking
    ? `${booking.title} (Vorschau) – ${restaurantGlut.name}`
    : restaurantGlut.name,
  description: booking?.intro,
}

export default function RestaurantDemoBookingPage() {
  return (
    <DemoShell business={restaurantGlut} current="booking">
      <DemoBooking business={restaurantGlut} />
    </DemoShell>
  )
}
