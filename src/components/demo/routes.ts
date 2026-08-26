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
 */
export type DemoPage = 'start' | 'menu' | 'about' | 'contact' | 'imprint' | 'privacy'

const SEGMENT: Record<DemoPage, string> = {
  start: '',
  menu: 'karte',
  about: 'ueber-uns',
  contact: 'kontakt',
  imprint: 'impressum',
  privacy: 'datenschutz',
}

/** `/demo/cafe`, `/demo/cafe/karte`, `/demo/cafe/ueber-uns`, … */
export function demoHref(slug: string, page: DemoPage): string {
  const segment = SEGMENT[page]
  return segment ? `/demo/${slug}/${segment}` : `/demo/${slug}`
}
