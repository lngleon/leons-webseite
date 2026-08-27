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
 * `imprint` und `privacy` nur in der Fußzeile. Das war zuerst eine Platzfrage;
 * seit die Pille umbricht statt zu scrollen, ist es eine RANGFRAGE: Impressum
 * und Datenschutz sind Pflichtangaben, keine Ziele, zu denen man einen Betrieb
 * besucht. Sie stehen dort, wo man sie sucht.
 *
 * `booking` (die Reservierungs-Attrappe) steht WEDER in der Pille NOCH im Fuß,
 * sondern nur als Fläche auf der Kontaktseite. Ursprünglich war das eine
 * Platzfrage: die Pille war eine Zeile mit waagerechtem Scrollen, und ein
 * fünfter Eintrag hätte die wichtigsten Ziele aus dem Bild geschoben.
 *
 * **Seit dem 27.08.2026 ist die Platzfrage gelöst** – die Pille bricht um,
 * statt zu scrollen, und trägt gemessen sechs Ziele (Einzelheiten im
 * Navigationsabschnitt von `demo.css`). Der Grund, `booking` draussen zu
 * lassen, ist damit ein ANDERER geworden und gilt weiterhin: eine Attrappe ist
 * ein vorgeführtes Feature, kein Ziel des Betriebs – sie gehört dorthin, wo
 * man ohnehin nach dem Weg zum Tisch sucht, und nicht neben „Karte" und
 * „Kontakt". Weil `DemoNav` seine Einträge fest aufzählt, trägt
 * `current="booking"` folgerichtig KEIN `aria-current` – genau wie `imprint`
 * und `privacy` heute schon.
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
