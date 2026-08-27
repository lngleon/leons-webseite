import type { GastroBusiness } from '@/data/demo/types'
import DemoSection from './DemoSection'
import { MenuRow } from './DemoMenu'
import { leadItems } from './menu'
import { demoHref } from './routes'

/** Wie viele Gerichte je Kategorie der Auszug auf der Startseite zeigt. */
const ITEMS_PER_CATEGORY = 2

/**
 * Karten-Auszug für die Startseite: je Kategorie die ersten Gerichte, darunter
 * der Weg zur vollen Karte.
 *
 * Bewusst eine sichtbare, einfache Regel (die ersten {@link ITEMS_PER_CATEGORY}
 * je Kategorie) statt einer handverlesenen „Empfehlungs"-Liste – letztere wäre
 * neue Copy und müsste bei jeder Kartenänderung gepflegt werden. So bleibt die
 * Datendatei die einzige Quelle.
 *
 * Die Gerichte holt `leadItems`, nicht `category.items` direkt: seit es
 * gegliederte Karten gibt, hängen sie nicht mehr zwingend eine Ebene tiefer.
 * Bei einer flachen Karte sind es die ersten Gerichte selbst, bei einer
 * gegliederten die des ersten Abschnitts – bei einer Abendkarte also die ersten
 * Vorspeisen. Für das Café ändert das nichts.
 *
 * Die Zeilen laufen `compact`: ohne Beschreibung und ohne Allergen-Kürzel. Die
 * Legende steht auf der Kartenseite, und unerklärte Buchstaben wären hier
 * schlechter als gar keine.
 */
export default function DemoMenuTeaser({ business }: { business: GastroBusiness }) {
  const { menu } = business

  return (
    <DemoSection id="karte-auszug" title={menu.title} note={menu.note}>
      <div className="mt-8 space-y-8">
        {menu.categories.map((category) => (
          <section key={category.id} aria-labelledby={`auszug-${category.id}`}>
            <h3 id={`auszug-${category.id}`} className="demo-eyebrow">
              {category.title}
            </h3>
            <ul className="mt-2 divide-y divide-border">
              {leadItems(category, ITEMS_PER_CATEGORY).map((item) => (
                <MenuRow key={item.name} item={item} compact />
              ))}
            </ul>
          </section>
        ))}
      </div>

      <a href={demoHref(business.slug, 'menu')} className="demo-cta mt-10">
        {menu.title}
        <span aria-hidden="true">→</span>
      </a>
    </DemoSection>
  )
}
