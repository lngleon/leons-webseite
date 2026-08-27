import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoLegalPage from '@/components/demo/DemoLegalPage'
import { restaurantGlut } from '@/data/demo/restaurant-glut'

/**
 * Datenschutz als eigene Seite, nur im Fuß verlinkt.
 *
 * Der Text beschreibt bewusst den TATSÄCHLICHEN Zustand dieser Seite – keine
 * Cookies, kein Tracking, keine Fremd-Requests, Auslieferung als statisches
 * HTML – statt Standardbausteine zu behaupten, die hier gar nicht zutreffen.
 * Für diese Demo kommt ein Punkt dazu: es gibt auch KEIN Buchungssystem,
 * reserviert wird per Telefon oder Mail.
 *
 * Muster- und Demo-Hinweis steht sichtbar ganz oben, inklusive der
 * Klarstellung, dass das keine Rechtsberatung ist.
 */
export const metadata: Metadata = {
  title: `${restaurantGlut.privacy.title} – ${restaurantGlut.name}`,
  description: restaurantGlut.privacy.note,
}

export default function RestaurantDemoPrivacyPage() {
  return (
    <DemoShell business={restaurantGlut} current="privacy">
      <DemoLegalPage title={restaurantGlut.privacy.title} note={restaurantGlut.privacy.note}>
        <div className="space-y-9">
          {restaurantGlut.privacy.sections.map((section) => (
            <section key={section.title} aria-labelledby={`ds-${section.id}`}>
              <h2 id={`ds-${section.id}`} className="demo-eyebrow">
                {section.title}
              </h2>
              <div className="mt-3 space-y-3 text-[0.95rem] leading-relaxed text-muted-foreground">
                {section.body.map((absatz, i) => (
                  // Liste ist statisch und wird nie umsortiert – Index als Key ist hier korrekt.
                  <p key={i}>{absatz}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </DemoLegalPage>
    </DemoShell>
  )
}
