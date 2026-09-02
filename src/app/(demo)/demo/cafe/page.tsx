import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoHero from '@/components/demo/DemoHero'
import DemoMarquee from '@/components/demo/DemoMarquee'
import DemoGallery from '@/components/demo/DemoGallery'
import DemoMenuTeaser from '@/components/demo/DemoMenuTeaser'
import DemoFacts from '@/components/demo/DemoFacts'
import DemoJsonLd from '@/components/demo/DemoJsonLd'
import { buildBusinessSchema } from '@/components/demo/schema'
import { cafeKlee } from '@/data/demo/cafe-klee'

/**
 * Startseite der stillen Demo `/demo/cafe` – Kopf, Laufband, Bildreihe und ein
 * Auszug aus der Karte. Nicht verlinkt, nicht in der Sitemap, `noindex`
 * (letzteres kommt aus dem Layout der Demo-Gruppe).
 *
 * Die ganze Seite hängt an EINER Datendatei (`src/data/demo/cafe-klee.ts`).
 * Ein zweiter Betrieb = zweite Datendatei + Kopie dieses Ordners (drei kleine
 * `page.tsx`) mit anderem Import; an den Komponenten ändert sich nichts.
 */
export const metadata: Metadata = {
  title: `${cafeKlee.name} – ${cafeKlee.kind}`,
  description: cafeKlee.tagline,
}

export default function CafeDemoPage() {
  return (
    <DemoShell business={cafeKlee} current="start">
      <DemoJsonLd schema={buildBusinessSchema(cafeKlee)} />
      <DemoHero business={cafeKlee} />
      <DemoMarquee business={cafeKlee} />
      <DemoGallery business={cafeKlee} />
      <DemoMenuTeaser business={cafeKlee} />
      <DemoFacts business={cafeKlee} />
    </DemoShell>
  )
}
