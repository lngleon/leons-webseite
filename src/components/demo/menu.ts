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
 * Seit Demo 3 (Friseur) stehen hier auch die drei FORMATIERER. Sie sind
 * dieselbe Art Regel: „wie schreibt man einen Preis, eine Preisspanne, eine
 * Dauer" gehört an genau eine Stelle, sonst stehen in einer Preisliste
 * irgendwann „45 Min", „45 min" und „45 Minuten" untereinander. `formatEuro`
 * lag vorher in `DemoMenu.tsx`; von dort hätten die neuen Funktionen sie
 * importieren müssen, während `DemoMenu` schon aus dieser Datei liest – ein
 * Zirkel. Deshalb ist die Formatierung hierher gewandert und `DemoMenu.tsx`
 * behält nur noch JSX.
 *
 * Bewusst reine Funktionen ohne JSX: sie sind das Gegenstück zu `routes.ts`
 * (Pfade) – kleine, gemeinsam genutzte Regeln neben den Bausteinen.
 */

/**
 * Eurobetrag ohne Zeichen: 3.8 → „3,80".
 *
 * Von Hand statt `Intl.NumberFormat`: die Funktion läuft im Render, und die
 * Hydration-Regel verlangt, dass Server- und Client-Frame identisch sind.
 * `toFixed` + Komma ist dafür deterministisch, `Intl` hängt an der ICU-Version
 * der jeweiligen Umgebung.
 */
function euroZahl(value: number): string {
  return value.toFixed(2).replace('.', ',')
}

/** Preis in Euro → „3,80 €". */
export function formatEuro(value: number): string {
  return `${euroZahl(value)} €`
}

/**
 * Der Preis EINES Postens – in der Form, die zu ihm gehört.
 *
 * Drei Formen, entsprechend der Union in {@link MenuItem}:
 *
 *   Festpreis  → „3,80 €"
 *   Spanne     → „45,00 – 75,00 €"
 *   Ab-Preis   → „ab 39,00 €"
 *
 * Bei der Spanne trägt nur die ZWEITE Zahl das Währungszeichen – so machen es
 * gedruckte Preislisten, und es hält die Zeile kurz; `.demo-price` setzt sie
 * ohnehin auf `white-space: nowrap`, jedes Zeichen zählt also auf einem
 * 320-px-Gerät. Der Gedankenstrich ist derselbe wie bei den Öffnungszeiten
 * („09:00 – 18:30"), damit beide Listen dieselbe Sprache sprechen.
 *
 * Ein Posten ohne beide Zusatzfelder ergibt Zeichen für Zeichen dasselbe wie
 * das frühere `formatEuro(item.price)` – Café und Restaurant merken davon
 * nichts.
 */
export function formatItemPrice(item: MenuItem): string {
  if (item.priceTo !== undefined) {
    return `${euroZahl(item.price)} – ${formatEuro(item.priceTo)}`
  }
  if (item.priceOpen) {
    return `ab ${formatEuro(item.price)}`
  }
  return formatEuro(item.price)
}

/**
 * Dauer in Minuten → „45 Min.", „2 Std.", „1 Std. 30 Min.".
 *
 * Ab einer vollen Stunde wird umgerechnet: „210 Min." liest sich niemand als
 * dreieinhalb Stunden, und genau bei den langen Leistungen (Balayage, Dauerwelle)
 * ist die Dauer die Information, auf die es ankommt.
 *
 * Die beiden Einheiten stehen hier fest und nicht in den Daten – dieselbe
 * Entscheidung wie beim „€" in {@link formatEuro}: eine Einheit ist keine Copy,
 * sondern Teil des Zahlenformats.
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} Min.`

  const stunden = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest === 0 ? `${stunden} Std.` : `${stunden} Std. ${rest} Min.`
}

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
