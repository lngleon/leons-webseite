/**
 * Die drei Seiten einer Gastro-Demo und ihre Pfade.
 *
 * Bewusst an EINER Stelle: Navigation, Metadaten und das schema.org-Markup
 * bauen ihre Links darüber, statt Pfade zu wiederholen. Die Segmente sind rein
 * ASCII (`karte`, `kontakt`) – Sonderzeichen gehören unter Next nicht in ein
 * Routen-Segment, siehe „Umlaut-/Sonderzeichen-Routen" in PROJEKT-STAND.md.
 */
export type DemoPage = 'start' | 'menu' | 'contact'

const SEGMENT: Record<DemoPage, string> = {
  start: '',
  menu: 'karte',
  contact: 'kontakt',
}

/** `/demo/cafe`, `/demo/cafe/karte`, `/demo/cafe/kontakt`. */
export function demoHref(slug: string, page: DemoPage): string {
  const segment = SEGMENT[page]
  return segment ? `/demo/${slug}/${segment}` : `/demo/${slug}`
}
