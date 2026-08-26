import type { Metadata } from 'next'
import GastroDemo from '@/components/demo/GastroDemo'
import { cafeKlee } from '@/data/demo/cafe-klee'

/**
 * Stille Demo-Route `/demo/cafe` – ein erfundener Gastro-Betrieb als
 * Anschauungsstück. Nicht verlinkt, nicht in der Sitemap, `noindex`
 * (letzteres kommt aus dem Layout der Demo-Gruppe).
 *
 * Die ganze Seite hängt an EINER Datendatei (`src/data/demo/cafe-klee.ts`).
 * Ein zweiter Betrieb = zweite Datendatei + Kopie dieser Datei mit anderem
 * Import; an den Komponenten ändert sich nichts.
 */
export const metadata: Metadata = {
  title: `${cafeKlee.name} – ${cafeKlee.kind}`,
  description: cafeKlee.tagline,
}

export default function CafeDemoPage() {
  return <GastroDemo business={cafeKlee} />
}
