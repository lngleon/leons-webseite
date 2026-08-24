import type { Metadata } from 'next'
import Moeglichkeiten from '@/sections/Moeglichkeiten'
import { pageMetadata, routeMeta } from '@/data/meta'

export const metadata: Metadata = pageMetadata(routeMeta.moeglichkeiten)

/**
 * Stille Route `/möglichkeiten` – existiert und wird statisch gerendert, ist
 * aber bewusst NICHT in Navbar/Footer verlinkt. Der Ordnername trägt den Umlaut;
 * Next liefert die Seite auch unter der percent-encodeten URL `/m%C3%B6glichkeiten` aus.
 */
export default function MoeglichkeitenPage() {
  return <Moeglichkeiten />
}
