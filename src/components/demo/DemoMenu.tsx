import type { GastroBusiness, MenuItem } from '@/data/demo/types'
import DemoSection from './DemoSection'
import DemoCategoryRail from './DemoCategoryRail'
import DemoMenuBundles from './DemoMenuBundles'

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

/**
 * Eine Zeile der Preisliste: Gericht links, gepunktete Führungslinie, Preis
 * rechts in Tabellenziffern.
 *
 * `compact` lässt Beschreibung und Allergen-Kürzel weg – gedacht für den
 * Karten-Auszug auf der Startseite, wo die Allergen-Legende NICHT steht. Kürzel
 * ohne die zugehörige Legende wären dort nur unerklärte Buchstaben; die volle
 * Zeile inklusive Legende gibt es auf der Kartenseite.
 */
export function MenuRow({ item, compact = false }: { item: MenuItem; compact?: boolean }) {
  return (
    <li className="py-3">
      <div className="demo-leader">
        <span className="font-medium text-foreground">
          {item.name}
          {!compact && item.allergens?.length ? (
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
      {!compact && item.description ? (
        <p className="mt-1 pr-16 text-[0.85rem] leading-snug text-muted-foreground">
          {item.description}
        </p>
      ) : null}
    </li>
  )
}

/**
 * Die volle Speisekarte – gesetzt wie eine gedruckte Preisliste. Allergene als
 * kleine Kürzel hinter dem Namen, Legende am Ende.
 *
 * Seit der Aufteilung auf drei Routen ist das der Inhalt der eigenen Seite
 * `/karte`; darüber klebt die Kategorie-Leiste als Sprungmarken-Rail.
 *
 * Die oberste Ebene (`menu.categories`) hat zwei Formen, und die Komponente
 * fragt NICHT, welcher Betrieb gerade rendert, sondern nur, welche Felder da
 * sind – dieselbe Regel wie beim `note` seit jeher:
 *
 * - `items` → flache Karte, Gerichte direkt unter der Überschrift (Café).
 * - `sections` → gegliederte Karte, darunter die Gänge bzw. Gruppen in der
 *   Reihenfolge des Arrays, jeder mit eigener Überschrift (Restaurant:
 *   Mittagstisch flach, Abendkarte in Gängen, Weinkarte in Gruppen).
 * - `bundles` → darunter die Menüs zum Festpreis (`DemoMenuBundles`).
 *
 * Der Typ lässt nur ENTWEDER `items` ODER `sections` zu, deshalb steht hier
 * kein `else`: beide Blöcke sind unabhängig voneinander an ihr eigenes Feld
 * gebunden, und es kann nie beides zugleich erscheinen.
 */
export default function DemoMenu({ business }: { business: GastroBusiness }) {
  return (
    <DemoSection id="karte" title={business.menu.title} note={business.menu.note}>
      <DemoCategoryRail categories={business.menu.categories} />

      <div className="mt-8 space-y-10">
        {business.menu.categories.map((category) => (
          <section key={category.id} aria-labelledby={`kat-${category.id}`}>
            <h3
              id={`kat-${category.id}`}
              className="demo-anchor demo-display text-foreground"
              style={{ fontSize: 'clamp(1.5rem, 7vw, 2.1rem)' }}
            >
              {category.title}
            </h3>
            {category.note ? (
              <p className="mt-1 text-[0.8rem] uppercase tracking-[0.14em] text-muted-foreground">
                {category.note}
              </p>
            ) : null}
            {category.items ? (
              <ul className="mt-4 divide-y divide-border">
                {category.items.map((item) => (
                  <MenuRow key={item.name} item={item} />
                ))}
              </ul>
            ) : null}

            {category.sections ? (
              <div className="mt-6 space-y-8">
                {category.sections.map((section) => (
                  <section key={section.id} aria-labelledby={`gang-${section.id}`}>
                    <h4
                      id={`gang-${section.id}`}
                      className="demo-anchor demo-display text-foreground"
                      style={{ fontSize: 'clamp(1.15rem, 5vw, 1.5rem)' }}
                    >
                      {section.title}
                    </h4>
                    {section.note ? (
                      <p className="mt-1 text-[0.8rem] uppercase tracking-[0.14em] text-muted-foreground">
                        {section.note}
                      </p>
                    ) : null}
                    <ul className="mt-3 divide-y divide-border">
                      {section.items.map((item) => (
                        <MenuRow key={item.name} item={item} />
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            ) : null}

            {category.sections && category.bundles ? (
              <DemoMenuBundles sections={category.sections} bundles={category.bundles} />
            ) : null}
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
