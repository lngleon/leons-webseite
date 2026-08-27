import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoHero from '@/components/demo/DemoHero'
import DemoMarquee from '@/components/demo/DemoMarquee'
import DemoGallery from '@/components/demo/DemoGallery'
import DemoMenuTeaser from '@/components/demo/DemoMenuTeaser'
import DemoJsonLd from '@/components/demo/DemoJsonLd'
import { buildBusinessSchema } from '@/components/demo/schema'
import { friseurWirbel } from '@/data/demo/friseur-wirbel'

/**
 * Startseite der dritten stillen Demo `/demo/friseur` – Kopf, Laufband,
 * Bildreihe und ein Auszug aus den Leistungen. Nicht verlinkt, nicht in der
 * Sitemap, `noindex` (letzteres kommt aus dem Layout der Demo-Gruppe).
 *
 * Der Ordner ist wieder eine Kopie von `demo/cafe/` mit anderem Import – und
 * das ist diesmal die eigentliche Aussage: der Betrieb ist KEINE Gastronomie
 * mehr, und trotzdem stehen hier dieselben fünf Bausteine in derselben
 * Reihenfolge. `DemoMenuTeaser` zeigt statt Gerichten Leistungen, weil in den
 * Daten Leistungen stehen – nicht, weil er etwas über Friseure wüsste.
 */
export const metadata: Metadata = {
  title: `${friseurWirbel.name} – ${friseurWirbel.kind}`,
  description: friseurWirbel.tagline,
}

export default function FriseurDemoPage() {
  return (
    <DemoShell business={friseurWirbel} current="start">
      <DemoJsonLd schema={buildBusinessSchema(friseurWirbel)} />
      <DemoHero business={friseurWirbel} />
      <DemoMarquee business={friseurWirbel} />
      <DemoGallery business={friseurWirbel} />
      <DemoMenuTeaser business={friseurWirbel} />
    </DemoShell>
  )
}
