import type { GastroBusiness } from '@/data/demo/types'
import { demoHref } from './routes'

/**
 * Schlanker Seitenfuß auf allen Demo-Seiten: Betriebsname und die zwei
 * Rechtslinks.
 *
 * Bis zur Aufteilung stand hier das VOLLE Impressum – auf jeder Seite. Seit es
 * `/impressum` als eigene Seite gibt, wäre das dieselbe Angabe doppelt; der Fuß
 * verweist deshalb nur noch darauf. Die beiden Links stehen bewusst NICHT in
 * der Navigations-Pille: sechs Einträge in einer Leiste, die schon bei vier
 * scrollen muss, wäre unbrauchbar. Rechtslinks gehören ohnehin in den Fuß.
 */
export default function DemoLegal({ business }: { business: GastroBusiness }) {
  return (
    <footer
      className="border-t border-border px-5 py-10 sm:px-8"
      aria-label={business.name}
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="demo-eyebrow">{business.name}</p>

        <nav aria-label={business.legal.title}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.85rem]">
            <li>
              <a href={demoHref(business.slug, 'imprint')} className="demo-fuss-link">
                {business.legal.title}
              </a>
            </li>
            <li>
              <a href={demoHref(business.slug, 'privacy')} className="demo-fuss-link">
                {business.privacy.title}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
