import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoLegalPage from '@/components/demo/DemoLegalPage'
import { barbierKlinge } from '@/data/demo/barbier-klinge'

/**
 * Datenschutz als eigene Seite, nur im Fuß verlinkt.
 *
 * Der Text beschreibt bewusst den TATSÄCHLICHEN Zustand dieser Seite – keine
 * Cookies, kein Tracking, keine Fremd-Requests, Auslieferung als statisches
 * HTML – und die Termin-Attrappe ausdrücklich (sie sendet und speichert
 * nichts). Muster- und Demo-Hinweis steht sichtbar ganz oben, inklusive der
 * Klarstellung, dass das keine Rechtsberatung ist.
 */
export const metadata: Metadata = {
  title: `${barbierKlinge.privacy.title} – ${barbierKlinge.name}`,
  description: barbierKlinge.privacy.note,
}

export default function BarbierDemoPrivacyPage() {
  return (
    <DemoShell business={barbierKlinge} current="privacy">
      <DemoLegalPage title={barbierKlinge.privacy.title} note={barbierKlinge.privacy.note}>
        <div className="space-y-9">
          {barbierKlinge.privacy.sections.map((section) => (
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
