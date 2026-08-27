import type { GastroBusiness } from '@/data/demo/types'
import { demoHref, type DemoPage } from './routes'

/**
 * Navigation der Demo-Seiten: die Ziele des Betriebs als Pille, oben klebend.
 *
 * Bewusst normale `<a href>` statt `next/link` – `next/link` ist in Next 16
 * eine Client-Komponente und würde die Zusicherung der Demo brechen, dass die
 * Seite ohne JavaScript vollständig bedienbar ist. Ein voller Seitenwechsel
 * kostet hier nichts: die Seiten sind statisch und winzig.
 *
 * Die aktive Seite kommt als Prop, nicht aus `usePathname()` (Client-Hook).
 *
 * ── Warum diese Komponente fast leer ist ──────────────────────────────────
 *
 * Bis zum 27.08.2026 war die Pille EINE Zeile mit `overflow-x: auto`. Gemessen
 * bei 320 px: 286 px sichtbar, vier Ziele brauchen beim Café 380 px und beim
 * Friseur 422 px. Die Leiste scrollte also – und der AKTIVE Eintrag konnte
 * dabei ausserhalb des Sichtfelds liegen. Das war der eigentliche Bruch, nicht
 * die Enge.
 *
 * Seitdem bricht die Pille um, statt zu scrollen. Das passiert vollständig in
 * `demo.css`: ein Gitter mit fester Spaltenzahl, dessen Zeilenzahl CSS sich
 * selbst über `:has(> li:nth-child(n))` abzählt. Deshalb steht hier **keine
 * Zahl** – kein `items.length`, kein Inline-Style mit der Anzahl, kein
 * Umbruchpunkt. Die Liste IST die Zählung; eine Zahl daneben wäre eine zweite
 * Wahrheit, die irgendwann nicht mehr stimmt.
 *
 * Was hier bleibt, sind zwei Dinge:
 *
 * - `min-w-0` am `<nav>`: ein Flex-Item darf per Default nicht unter seine
 *   Inhaltsbreite schrumpfen. Ohne das wächst das `<nav>` auf die Breite der
 *   längsten Zeile und zieht die ganze Seite horizontal auf – auch mit
 *   umbrechendem Gitter.
 * - Die Reihenfolge der Einträge. Sie ist zugleich DOM-, Lese- und
 *   Fokusreihenfolge und ändert sich nie, auch nicht auf der aktiven Seite
 *   (WCAG 2.4.3 und 3.2.3). Der aktive Eintrag wird markiert, nicht
 *   umsortiert.
 *
 * KEIN Burger und keine Aufklappung: ein selbstgebauter Aufklapper bräuchte
 * Zustand und damit JavaScript, und ein `<details>`- oder `:target`-Muster
 * käme zwar ohne aus, versteckte aber Ziele hinter einem zusätzlichen Tipp –
 * der aktive Eintrag wäre dann nur noch mittelbar zu sehen.
 */
export default function DemoNav({
  business,
  current,
}: {
  business: GastroBusiness
  current: DemoPage
}) {
  const items: { page: DemoPage; label: string }[] = [
    { page: 'start', label: business.nav.start },
    { page: 'menu', label: business.nav.menu },
    { page: 'about', label: business.nav.about },
    { page: 'contact', label: business.nav.contact },
  ]

  return (
    <div className="demo-nav-band px-4 sm:px-8">
      <nav aria-label={business.name} className="mx-auto min-w-0 max-w-3xl">
        <ul className="demo-nav-pill">
          {items.map((item) => {
            const active = item.page === current
            return (
              // Kein `shrink-0` mehr: im Gitter deckelt die Spur die Breite,
              // und `min-width: 0` am `<li>` steht in `demo.css`.
              <li key={item.page}>
                <a
                  href={demoHref(business.slug, item.page)}
                  aria-current={active ? 'page' : undefined}
                  className={
                    active
                      ? 'demo-nav-link demo-nav-link--active'
                      : 'demo-nav-link'
                  }
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
