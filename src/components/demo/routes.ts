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
 * `booking` (die Buchungs-Attrappe) steht NICHT als fünftes Ziel in der
 * Pille, ist aber seit dem 03.09.2026 von JEDER Seite aus erreichbar
 * (User-Auftrag: das Buchungs-Feature soll gut auffindbar sein): ab 640 px
 * als eigener Knopf NEBEN der Pille im Navigationsband, darunter als
 * klebende Leiste am unteren Rand (`DemoShell`), dazu der gefüllte CTA im
 * Kopf der Startseite und weiterhin der Einstieg auf der Kontaktseite.
 *
 * Warum trotzdem kein fünftes `<li>`: die :has()-Zählung in `demo.css`
 * rechnet die Bandhöhe aus der Zahl der Listeneinträge; ein Eintrag, der auf
 * dem Handy per CSS verschwindet (dort übernimmt die Leiste), stünde
 * trotzdem im DOM und machte die Formel falsch. Der Knopf ist deshalb
 * Geschwister der Liste. `current="booking"` markiert ihn per
 * `aria-current`, sobald man auf der Strecke ist.
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
