import type { MenuBundle, MenuCategory, MenuItem, MenuSection } from '@/data/demo/types'

/**
 * Lesehilfen für die Karte.
 *
 * Beide Funktionen gibt es, weil die oberste Ebene der Karte seit Demo 2 zwei
 * Formen hat: flach (Gerichte direkt darunter, wie beim Café) und gegliedert
 * (Abschnitte darunter, wie bei der Abendkarte des Restaurants). Die
 * Komponenten sollen deshalb NICHT selbst nachsehen müssen, welche Form gerade
 * vorliegt – sie fragen hier nach dem, was sie brauchen.
 *
 * Bewusst reine Funktionen ohne JSX: sie sind das Gegenstück zu `routes.ts`
 * (Pfade) – kleine, gemeinsam genutzte Regeln neben den Bausteinen.
 */

/**
 * Die ersten `count` Gerichte einer Karten-Ebene, egal wie tief sie liegen.
 *
 * Flache Karte: die ersten Gerichte selbst. Gegliederte Karte: die ersten
 * Gerichte des ERSTEN Abschnitts (und, falls der kürzer ist, weiter im
 * nächsten) – bei der Abendkarte also die ersten Vorspeisen.
 *
 * Genutzt vom Karten-Auszug auf der Startseite. Für das Café ist das Ergebnis
 * Zeichen für Zeichen dasselbe wie das frühere `category.items.slice(0, n)`.
 */
export function leadItems(category: MenuCategory, count: number): MenuItem[] {
  const all = category.items ?? category.sections?.flatMap((section) => section.items) ?? []
  return all.slice(0, count)
}

/**
 * Die Gänge eines Bündels als echte Abschnitte – in der REIHENFOLGE des
 * Bündels, nicht in der der Karte.
 *
 * Das Bündel nennt nur `id`s; die Titel kommen aus den Abschnitten selbst,
 * damit ein umbenannter Gang nicht an zwei Stellen gepflegt werden muss.
 * Eine `id`, die zu keinem Abschnitt dieser Karte gehört, fällt heraus.
 */
export function bundleCourses(sections: MenuSection[], bundle: MenuBundle): MenuSection[] {
  return bundle.courses
    .map((id) => sections.find((section) => section.id === id))
    .filter((section): section is MenuSection => section !== undefined)
}
