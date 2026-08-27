import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoHero from '@/components/demo/DemoHero'
import DemoMarquee from '@/components/demo/DemoMarquee'
import DemoGallery from '@/components/demo/DemoGallery'
import DemoMenuTeaser from '@/components/demo/DemoMenuTeaser'
import DemoJsonLd from '@/components/demo/DemoJsonLd'
import { buildBusinessSchema } from '@/components/demo/schema'
import { restaurantGlut } from '@/data/demo/restaurant-glut'

/**
 * Startseite der zweiten stillen Demo `/demo/restaurant` – Kopf, Laufband,
 * Bildreihe und ein Auszug aus den Karten. Nicht verlinkt, nicht in der
 * Sitemap, `noindex` (letzteres kommt aus dem Layout der Demo-Gruppe).
 *
 * Der Ordner ist eine Kopie von `demo/cafe/` mit anderem Import – mehr nicht.
 * Genau das war der Zweck der zweiten Demo: die Bausteine bleiben dieselben,
 * nur die Datendatei ist eine andere.
 */
export const metadata: Metadata = {
  title: `${restaurantGlut.name} – ${restaurantGlut.kind}`,
  description: restaurantGlut.tagline,
}

export default function RestaurantDemoPage() {
  return (
    <DemoShell business={restaurantGlut} current="start">
      <DemoJsonLd schema={buildBusinessSchema(restaurantGlut)} />
      <DemoHero business={restaurantGlut} />
      <DemoMarquee business={restaurantGlut} />
      <DemoGallery business={restaurantGlut} />
      <DemoMenuTeaser business={restaurantGlut} />
    </DemoShell>
  )
}
