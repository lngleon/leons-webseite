import type { GastroBusiness, MenuItem } from '@/data/demo/types'
import DemoSection from './DemoSection'

/**
 * Preis in Euro → „3,80 €".
 *
 * Bewusst von Hand statt `Intl.NumberFormat`: die Funktion läuft im Render, und
 * die Hydration-Regel verlangt, dass Server- und Client-Frame identisch sind.
 * `toFixed` + Komma ist dafür deterministisch, `Intl` hängt an der ICU-Version.
 */
export function formatEuro(value: number): string {
  return `${value.toFixed(2).replace('.', ',')} €`
}

function MenuRow({ item }: { item: MenuItem }) {
  return (
    <li className="py-3">
      <div className="demo-leader">
        <span className="font-medium text-foreground">
          {item.name}
          {item.allergens?.length ? (
            <span className="ml-1.5 align-super text-[0.62rem] font-normal tracking-wider text-muted-foreground">
              {item.allergens.join(',')}
            </span>
          ) : null}
        </span>
        <span aria-hidden="true" className="demo-leader__fill" />
        <span className="demo-price font-medium text-foreground">
          {formatEuro(item.price)}
        </span>
      </div>
      {item.description ? (
        <p className="mt-1 pr-16 text-[0.85rem] leading-snug text-muted-foreground">
          {item.description}
        </p>
      ) : null}
    </li>
  )
}

/**
 * Speisekarte – gesetzt wie eine gedruckte Preisliste: Gericht links, gepunktete
 * Führungslinie, Preis rechts in Tabellenziffern. Allergene als kleine Kürzel
 * hinter dem Namen, Legende am Ende.
 */
export default function DemoMenu({ business }: { business: GastroBusiness }) {
  return (
    <DemoSection id="karte" title={business.menu.title} note={business.menu.note}>
      <div className="mt-8 space-y-10">
        {business.menu.categories.map((category) => (
          <section key={category.id} aria-labelledby={`kat-${category.id}`}>
            <h3
              id={`kat-${category.id}`}
              className="demo-display text-foreground"
              style={{ fontSize: 'clamp(1.5rem, 7vw, 2.1rem)' }}
            >
              {category.title}
            </h3>
            {category.note ? (
              <p className="mt-1 text-[0.8rem] uppercase tracking-[0.14em] text-muted-foreground">
                {category.note}
              </p>
            ) : null}
            <ul className="mt-4 divide-y divide-border">
              {category.items.map((item) => (
                <MenuRow key={item.name} item={item} />
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* Allergen-Legende */}
      <div className="mt-10 border-t border-border pt-6">
        <h3 className="demo-eyebrow">Allergene</h3>
        <dl className="mt-3 grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-2">
          {business.allergens.map((allergen) => (
            <div key={allergen.code} className="flex gap-2 text-[0.85rem]">
              <dt className="w-5 shrink-0 font-medium text-accent">{allergen.code}</dt>
              <dd className="text-muted-foreground">{allergen.label}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 max-w-prose text-[0.8rem] leading-relaxed text-muted-foreground">
          {business.menu.allergenNote}
        </p>
      </div>
    </DemoSection>
  )
}
