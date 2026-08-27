import type { Metadata } from 'next'
import Moeglichkeiten from '@/sections/Moeglichkeiten'
import DemoShowcase from '@/components/DemoShowcase'
import { pageMetadata, routeMeta } from '@/data/meta'

export const metadata: Metadata = pageMetadata(routeMeta.moeglichkeiten)

/**
 * Stille Route `/moeglichkeiten` – existiert und wird statisch gerendert, ist
 * aber bewusst NICHT in Navbar/Footer verlinkt.
 *
 * Bewusst ASCII (25.08.2026): die Route hieß bis dahin `/möglichkeiten` und
 * brauchte dafür einen percent-encodeten Ordnernamen plus einen zweiten
 * Re-Export-Ordner, weil Next statische Ordnernamen 1:1 in die Route-Regex
 * übernimmt, Browser den Pfad aber encodet senden. Ein ASCII-Segment hat das
 * Problem gar nicht erst – ein Ordner, eine Regex, keine Encoding-Fallstricke.
 * KEIN Redirect von der alten URL: die Seite war nie verlinkt.
 *
 * Titel/Description sind unverändert („Möglichkeiten – Leon Lang") – der
 * Umlaut lebt weiter im sichtbaren Text, nur nicht mehr in der URL.
 *
 * `DemoShowcase` wird HIER gerendert und als Prop hineingereicht, statt in
 * `Moeglichkeiten` importiert zu werden: die Sektion ist eine Client-Komponente,
 * der Block liest die drei vollständigen Betriebs-Objekte. So bleiben Karten,
 * Öffnungszeiten und Rechtstexte der drei Demos auf dem Server und wandern
 * nicht für drei Überschriften ins Browser-Bundle.
 */
export default function MoeglichkeitenPage() {
  return <Moeglichkeiten demos={<DemoShowcase />} />
}
