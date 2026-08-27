import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoLegalPage from '@/components/demo/DemoLegalPage'
import { friseurWirbel } from '@/data/demo/friseur-wirbel'

/**
 * Datenschutz als eigene Seite, nur im Fuß verlinkt.
 *
 * Der Text beschreibt bewusst den TATSÄCHLICHEN Zustand dieser Seite – keine
 * Cookies, kein Tracking, keine Fremd-Requests, Auslieferung als statisches
 * HTML – statt Standardbausteine zu behaupten, die hier gar nicht zutreffen.
 *
 * Für diesen Betrieb gilt der Satz „kein Formular, kein Buchungssystem" wieder
 * uneingeschränkt: es gibt keine Attrappe. Beim Restaurant musste derselbe
 * Absatz umgeschrieben werden, als die Reservierungs-Strecke dazukam – ein
 * Datenschutztext ist eine Aussage über die Seite und veraltet mit ihr.
 *
 * Muster- und Demo-Hinweis steht sichtbar ganz oben, inklusive der
 * Klarstellung, dass das keine Rechtsberatung ist.
 */
export const metadata: Metadata = {
  title: `${friseurWirbel.privacy.title} – ${friseurWirbel.name}`,
  description: friseurWirbel.privacy.note,
}

export default function FriseurDemoPrivacyPage() {
  return (
    <DemoShell business={friseurWirbel} current="privacy">
      <DemoLegalPage title={friseurWirbel.privacy.title} note={friseurWirbel.privacy.note}>
        <div className="space-y-9">
          {friseurWirbel.privacy.sections.map((section) => (
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
