/**
 * Die Seiten einer Gastro-Demo und ihre Pfade.
 *
 * Bewusst an EINER Stelle: Navigation, Fußzeile, Metadaten und das
 * schema.org-Markup bauen ihre Links darüber, statt Pfade zu wiederholen.
 * Die Segmente sind rein ASCII (`karte`, `kontakt`, `ueber-uns`, …) –
 * Sonderzeichen gehören unter Next nicht in ein Routen-Segment, siehe
 * „Umlaut-/Sonderzeichen-Routen" in PROJEKT-STAND.md.
 *
 * `start`, `menu`, `about` und `contact` stehen in der Navigations-Pille,
 * `imprint` und `privacy` nur in der Fußzeile – sonst wären es sechs Einträge
 * in einer Leiste, die schon bei vier scrollen muss.
 *
 * `booking` (die Reservierungs-Attrappe) steht WEDER in der Pille NOCH im Fuß,
 * sondern nur als Fläche auf der Kontaktseite. Gemessen: vier Beschriftungen
 * brauchen bei 320 px 401 px bei 288 px verfügbarer Breite – die Pille scrollt
 * bereits. Ein fünfter Eintrag machte ausgerechnet die wichtigste Fläche zu
 * der einen, die man erst freiwischen muss. Weil `DemoNav` seine Einträge fest
 * aufzählt, trägt `current="booking"` folgerichtig KEIN `aria-current` – genau
 * wie `imprint` und `privacy` heute schon.
 */
export type DemoPage =
  | 'start'
  | 'menu'
  | 'about'
  | 'contact'
  | 'imprint'
  | 'privacy'
  | 'booking'

const SEGMENT: Record<DemoPage, string> = {
  start: '',
  menu: 'karte',
  about: 'ueber-uns',
  contact: 'kontakt',
  imprint: 'impressum',
  privacy: 'datenschutz',
  booking: 'reservieren',
}

/** `/demo/cafe`, `/demo/cafe/karte`, `/demo/cafe/ueber-uns`, … */
export function demoHref(slug: string, page: DemoPage): string {
  const segment = SEGMENT[page]
  return segment ? `/demo/${slug}/${segment}` : `/demo/${slug}`
}
