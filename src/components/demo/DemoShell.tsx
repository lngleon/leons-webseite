import type { ReactNode } from 'react'
import { demoDisplay } from '@/app/(demo)/font'
import type { GastroBusiness } from '@/data/demo/types'
import DemoGrain from './DemoGrain'
import DemoNav from './DemoNav'
import DemoLegal from './DemoLegal'
import { demoHref, type DemoPage } from './routes'

/**
 * Gemeinsame Hülle aller Seiten eines Gastro-Betriebs: Farbwelt (`.demo-scope`),
 * Papier-Korn, Navigation und Impressum-Fuß. Start, Karte und Kontakt rendern
 * sie jeweils um ihren eigenen Inhalt.
 *
 * Vorher lag das alles in `GastroDemo.tsx`, weil es nur EINE Seite gab.
 *
 * Warum die Hülle hier steht und nicht in einem `layout.tsx`: die Navigation
 * muss wissen, welche Seite gerade aktiv ist. Ein Layout kennt den Pfad nicht –
 * `usePathname()` wäre ein Client-Hook und würde die Zusicherung „diese Seite
 * braucht kein JavaScript" brechen. Also reicht jede Seite ihr `current` selbst
 * herein; das kostet eine Zeile pro Seite und bleibt vollständig server-seitig.
 *
 * Die FARBWELT kommt seit Demo 3 nicht mehr zwingend aus `.demo-scope` allein:
 * nennt der Betrieb ein `theme`, hängt hier eine zweite Klasse
 * (`demo-scope--<theme>`) daneben, die in `demo.css` dieselben Variablen neu
 * belegt. Café und Restaurant tragen kein `theme` – sie bekommen deshalb auch
 * keine zweite Klasse und ihr Markup bleibt unverändert. Wieder eine
 * Feldfrage, keine Betriebsfrage.
 */
export default function DemoShell({
  business,
  current,
  children,
}: {
  business: GastroBusiness
  current: DemoPage
  children: ReactNode
}) {
  // Ohne `theme` entsteht exakt die Zeichenfolge von vorher – kein
  // zusätzliches Leerzeichen, keine leere Klasse.
  const scope = business.theme ? `demo-scope demo-scope--${business.theme}` : 'demo-scope'

  return (
    // `demoDisplay.variable` setzt `--font-demo-display` – bewusst HIER auf dem
    // bestehenden `.demo-scope`-Element und nicht in `(demo)/layout.tsx`: das
    // Layout gibt `children` unverändert zurück und hat gar kein eigenes Element,
    // ein Wrapper nur für die Klasse wäre ein zusätzlicher DOM-Knoten. So kostet
    // die Schrift kein Markup. `demo.css` liest die Variable in `--demo-display`.
    <div className={`${demoDisplay.variable} ${scope} relative flex min-h-dvh flex-col`}>
      <DemoGrain />

      <div className="relative z-10 flex flex-1 flex-col">
        <DemoNav business={business} current={current} />
        <main className="flex-1">{children}</main>
        <DemoLegal business={business} />

        {/* Die klebende Buchungsleiste am UNTEREN Rand – nur unter 640 px
            (darüber sitzt der Knopf im Navigationsband, siehe `DemoNav`).
            `position: sticky` am Ende der Spalte statt `fixed`: während des
            Scrollens klebt sie an der Unterkante, am Seitenende legt sie sich
            in ihre natürliche Position HINTER den Fuß – nichts wird verdeckt,
            kein Ausgleichs-Abstand nötig. Auf der Strecke selbst entfällt sie:
            dort klebt bereits das Vorschau-Band, und eine dritte klebende
            Reihe ist die Grenze, die demo.css oben ausdrücklich zieht. */}
        {business.booking && current !== 'booking' ? (
          <a href={demoHref(business.slug, 'booking')} className="demo-buchungsleiste">
            {business.booking.ctaLabel}
            <span aria-hidden="true">→</span>
          </a>
        ) : null}
      </div>
    </div>
  )
}
