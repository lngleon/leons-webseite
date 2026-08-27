import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoLegalPage from '@/components/demo/DemoLegalPage'
import { restaurantGlut } from '@/data/demo/restaurant-glut'

/**
 * Impressum als eigene Seite, nur im Fuß verlinkt.
 *
 * Der Musterhinweis (`legal.note`) steht sichtbar über den Angaben: der Betrieb
 * ist erfunden, das darf im Kundengespräch nicht untergehen.
 */
export const metadata: Metadata = {
  title: `${restaurantGlut.legal.title} – ${restaurantGlut.name}`,
  description: restaurantGlut.legal.note,
}

export default function RestaurantDemoImprintPage() {
  return (
    <DemoShell business={restaurantGlut} current="imprint">
      <DemoLegalPage title={restaurantGlut.legal.title} note={restaurantGlut.legal.note}>
        <div className="space-y-1.5 text-[0.95rem] leading-relaxed text-foreground">
          {restaurantGlut.legal.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </DemoLegalPage>
    </DemoShell>
  )
}
