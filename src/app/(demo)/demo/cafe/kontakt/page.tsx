import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoLocation from '@/components/demo/DemoLocation'
import DemoHours from '@/components/demo/DemoHours'
import DemoContact from '@/components/demo/DemoContact'
import { cafeKlee } from '@/data/demo/cafe-klee'

/**
 * Alles, was man im Laden wissen will, auf einer Seite: Adresse mit Routen-Link,
 * Öffnungszeiten inklusive Ruhetag, Telefonnummer zum Antippen und die
 * vorbereitete Reservierungs-Mail.
 *
 * Reihenfolge bewusst „wo → wann → wie erreiche ich euch". Kein JSON-LD: Adresse
 * und Zeiten stehen bereits im `Restaurant`-Markup der Startseite; sie hier ein
 * zweites Mal auszugeben würde denselben Betrieb doppelt behaupten.
 */
export const metadata: Metadata = {
  title: `${cafeKlee.contact.title} – ${cafeKlee.name}`,
  description: cafeKlee.contact.reservation.note,
}

export default function CafeDemoContactPage() {
  return (
    <DemoShell business={cafeKlee} current="contact">
      <DemoLocation business={cafeKlee} />
      <DemoHours business={cafeKlee} />
      <DemoContact business={cafeKlee} />
    </DemoShell>
  )
}
