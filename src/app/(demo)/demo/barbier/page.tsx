import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoHero from '@/components/demo/DemoHero'
import DemoMarquee from '@/components/demo/DemoMarquee'
import DemoGallery from '@/components/demo/DemoGallery'
import DemoMenuTeaser from '@/components/demo/DemoMenuTeaser'
import DemoFacts from '@/components/demo/DemoFacts'
import DemoJsonLd from '@/components/demo/DemoJsonLd'
import { buildBusinessSchema } from '@/components/demo/schema'
import { barbierKlinge } from '@/data/demo/barbier-klinge'

/**
 * Startseite der vierten stillen Demo `/demo/barbier` – Kopf, Laufband,
 * Bildreihe und ein Auszug aus den Preisen. Nicht verlinkt, nicht in der
 * Sitemap, `noindex` (letzteres kommt aus dem Layout der Demo-Gruppe).
 *
 * Der Ordner ist eine Kopie von `demo/friseur/` mit anderem Import – dieselben
 * Bausteine in derselben Reihenfolge, nur die Datendatei ist eine andere.
 * Neu an diesem Betrieb ist nichts Strukturelles: dunkler Token-Satz wie Glut,
 * Team wie Wirbel, Buchungsstrecke wie alle – er ist der Beleg, dass ein
 * vierter Betrieb wirklich nur noch Daten plus Ordnerkopie ist.
 */
export const metadata: Metadata = {
  title: `${barbierKlinge.name} – ${barbierKlinge.kind}`,
  description: barbierKlinge.tagline,
}

export default function BarbierDemoPage() {
  return (
    <DemoShell business={barbierKlinge} current="start">
      <DemoJsonLd schema={buildBusinessSchema(barbierKlinge)} />
      <DemoHero business={barbierKlinge} />
      <DemoMarquee business={barbierKlinge} />
      <DemoGallery business={barbierKlinge} />
      <DemoMenuTeaser business={barbierKlinge} />
      <DemoFacts business={barbierKlinge} />
    </DemoShell>
  )
}
