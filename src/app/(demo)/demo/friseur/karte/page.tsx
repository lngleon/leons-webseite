import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoMenu from '@/components/demo/DemoMenu'
import DemoJsonLd from '@/components/demo/DemoJsonLd'
import { buildOfferCatalogSchema } from '@/components/demo/schema'
import { friseurWirbel } from '@/data/demo/friseur-wirbel'

/**
 * Alle Leistungen auf einer Seite: Schnitt, Farbe, Pflege & Styling, Bart &
 * Rasur. Die Sprungleiste unter der Navigation führt sie auf – beim Café
 * stehen dort die Kategorien, beim Restaurant die Karten, hier die
 * Leistungsbereiche. Dieselbe Ebene, dieselbe Komponente; sie zählt schlicht
 * auf, was in `menu.categories` steht.
 *
 * Das Segment heisst weiterhin `karte` (aus `routes.ts`, für alle Betriebe
 * gleich); wie die Seite ÜBERSCHRIEBEN ist, sagt die Datendatei – hier
 * „Leistungen". Dieselbe Entscheidung wie beim Restaurant.
 *
 * **Der einzige Unterschied zur Kartenseite der beiden Vorgänger** steht in
 * der Zeile mit dem JSON-LD: `buildOfferCatalogSchema` statt
 * `buildMenuSchema`. `Menu` ist in schema.org ausdrücklich für Speisen und
 * Getränke einer Gastronomie definiert – für Dienstleistungen heisst dasselbe
 * Konzept `OfferCatalog` und hat eine andere Form. Welchen Aufbauer eine Seite
 * ruft, entscheidet die Seite; die Komponente `DemoMenu` darüber bleibt
 * dieselbe und weiss von alldem nichts.
 */
export const metadata: Metadata = {
  title: `${friseurWirbel.menu.title} – ${friseurWirbel.name}`,
  description: friseurWirbel.menu.note ?? friseurWirbel.tagline,
}

export default function FriseurDemoMenuPage() {
  return (
    <DemoShell business={friseurWirbel} current="menu">
      <DemoJsonLd schema={buildOfferCatalogSchema(friseurWirbel)} />
      <DemoMenu business={friseurWirbel} />
    </DemoShell>
  )
}
