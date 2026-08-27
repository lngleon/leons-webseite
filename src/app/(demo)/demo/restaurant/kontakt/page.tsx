import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoLocation from '@/components/demo/DemoLocation'
import DemoHours from '@/components/demo/DemoHours'
import DemoContact from '@/components/demo/DemoContact'
import { restaurantGlut } from '@/data/demo/restaurant-glut'

/**
 * Adresse, Öffnungszeiten, Telefon und die vorbereitete Reservierungs-Mail.
 *
 * Die Zeiten stehen als drei Zeilen: Mittag, Abend, Ruhetage. Kein
 * Buchungsflow – das ist bewusst ein Non-Goal dieser Stufe; reserviert wird
 * per Anruf oder Mail.
 *
 * Kein JSON-LD: Adresse und Zeiten stehen bereits im `Restaurant`-Markup der
 * Startseite; sie hier ein zweites Mal auszugeben würde denselben Betrieb
 * doppelt behaupten.
 */
export const metadata: Metadata = {
  title: `${restaurantGlut.contact.title} – ${restaurantGlut.name}`,
  description: restaurantGlut.contact.reservation.note,
}

export default function RestaurantDemoContactPage() {
  return (
    <DemoShell business={restaurantGlut} current="contact">
      <DemoLocation business={restaurantGlut} />
      <DemoHours business={restaurantGlut} />
      <DemoContact business={restaurantGlut} />
    </DemoShell>
  )
}
