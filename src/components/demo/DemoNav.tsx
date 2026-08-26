import type { GastroBusiness } from '@/data/demo/types'
import { demoHref, type DemoPage } from './routes'

/**
 * Navigation der Demo-Seiten: eine Pille mit drei Links, oben klebend.
 *
 * Bewusst normale `<a href>` statt `next/link` – `next/link` ist in Next 16
 * eine Client-Komponente und würde die Zusicherung der Demo brechen, dass die
 * Seite ohne JavaScript vollständig bedienbar ist. Ein voller Seitenwechsel
 * kostet hier nichts: die Seiten sind statisch und winzig.
 *
 * Ebenso bewusst KEIN Burger-Menü: das bräuchte State und damit JS. Auf dem
 * Handy scrollt die Pille stattdessen horizontal (`overflow-x-auto`) – drei
 * Ziele sind sichtbar genug, ein aufklappbares Menü wäre hier nur Ballast.
 *
 * Die aktive Seite kommt als Prop, nicht aus `usePathname()` (Client-Hook).
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
    { page: 'contact', label: business.nav.contact },
  ]

  return (
    <div className="demo-nav-band px-4 sm:px-8">
      <nav aria-label={business.name} className="mx-auto max-w-3xl">
        <ul className="demo-nav-pill">
          {items.map((item) => {
            const active = item.page === current
            return (
              <li key={item.page} className="shrink-0">
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
