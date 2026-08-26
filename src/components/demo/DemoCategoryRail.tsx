import type { MenuCategory } from '@/data/demo/types'

/**
 * Sprungmarken auf die Kategorien der Karte – als klebende Leiste unter der
 * Navigation.
 *
 * Reine Anker-Links (`#kat-…`), also ohne eine Zeile JavaScript: der Browser
 * springt selbst. Die Überschriften tragen dafür `.demo-anchor`
 * (`scroll-margin-top`), damit sie nicht unter den beiden klebenden Leisten
 * landen.
 *
 * Auf dem Handy scrollt die Leiste horizontal statt umzubrechen – dieselbe
 * Mechanik wie die Navigations-Pille, damit beide als ein System lesen. Die
 * Vorlage (dr-smusy) stellt die Rail auf dem Desktop links neben die Karte;
 * das setzt eine ~1200 px breite Spalte voraus. Diese Demo führt bewusst eine
 * schmale 768-px-Spalte, deshalb bleibt die Leiste hier auf allen Breiten oben.
 */
export default function DemoCategoryRail({
  categories,
}: {
  categories: MenuCategory[]
}) {
  if (categories.length < 2) return null

  return (
    // Auf dem Handy zieht die Leiste bis an den Rand des Abschnitts-Innenrands
    // (`-mx-5 px-5`), damit die Chips bis zur Bildschirmkante scrollen können.
    // Ab `sm` deckt sie sich exakt mit der Inhaltsspalte – dort ist der Bereich
    // links und rechts leer, ein Überstand liesse die Trennlinie nur breiter
    // aussehen als den Text darunter.
    <div className="demo-rail -mx-5 mt-6 px-5 sm:mx-0 sm:px-0">
      <ul className="demo-rail-list">
        {categories.map((category) => (
          <li key={category.id} className="shrink-0">
            <a href={`#kat-${category.id}`} className="demo-rail-link">
              {category.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
