import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoLegalPage from '@/components/demo/DemoLegalPage'
import { cafeKlee } from '@/data/demo/cafe-klee'

/**
 * Datenschutz als eigene Seite.
 *
 * Der Text beschreibt bewusst den TATSÄCHLICHEN Zustand dieser Seite – keine
 * Cookies, kein Tracking, keine Fremd-Requests, Auslieferung als statisches
 * HTML – statt Standardbausteine zu behaupten, die hier gar nicht zutreffen.
 * Die Demo-Gruppe `(demo)` bindet insbesondere KEIN Analytics ein; das liegt in
 * `SiteChrome` und damit nur auf Leons eigener Seite.
 *
 * Muster- und Demo-Hinweis steht sichtbar ganz oben, inklusive der Klarstellung,
 * dass das keine Rechtsberatung ist.
 */
export const metadata: Metadata = {
  title: `${cafeKlee.privacy.title} – ${cafeKlee.name}`,
  description: cafeKlee.privacy.note,
}

export default function CafeDemoPrivacyPage() {
  return (
    <DemoShell business={cafeKlee} current="privacy">
      <DemoLegalPage title={cafeKlee.privacy.title} note={cafeKlee.privacy.note}>
        <div className="space-y-9">
          {cafeKlee.privacy.sections.map((section) => (
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
