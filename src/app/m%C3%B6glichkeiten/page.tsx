import type { Metadata } from 'next'
import Moeglichkeiten from '@/sections/Moeglichkeiten'
import { pageMetadata, routeMeta } from '@/data/meta'

export const metadata: Metadata = pageMetadata(routeMeta.moeglichkeiten)

/**
 * Stille Route `/möglichkeiten` – existiert und wird statisch gerendert, ist
 * aber bewusst NICHT in Navbar/Footer verlinkt.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ ACHTUNG: Der Ordner heißt `m%C3%B6glichkeiten` und NICHT `möglichkeiten`.│
 * │ Das ist Absicht – NICHT „aufräumen".                                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * Grund: Next übernimmt statische Ordnernamen 1:1 in die Route-Regex des
 * Build-Manifests. Ein Ordner `möglichkeiten` erzeugt also die Regex
 * `^/möglichkeiten$` – Browser senden im Request-Pathname aber IMMER die
 * percent-encodete Form `/m%C3%B6glichkeiten`. Die beiden matchen nicht,
 * die Route lief damit trotz erfolgreichem Build in einen 404 (verifiziert
 * mit `next start` UND `next dev`, 24.08.2026). Mit dem encodeten Ordnernamen
 * lautet die Regex `^/m%C3%B6glichkeiten$` und trifft den echten Request.
 *
 * Für den Nutzer ändert sich nichts: in der Adresszeile steht weiterhin
 * „möglichkeiten", der Browser encodet nur beim Senden. Die Sitemap gibt die
 * URL ebenfalls encodet aus (`encodeURI` in `src/app/sitemap.ts`).
 */
export default function MoeglichkeitenPage() {
  return <Moeglichkeiten />
}
