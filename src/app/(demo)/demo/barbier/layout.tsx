import type { Viewport } from 'next'
import type { ReactNode } from 'react'

/**
 * Layout NUR dieses Betriebs – und es tut genau eine Sache: die Browser-Farbe
 * auf seinen eigenen Hintergrund setzen (dieselbe Mechanik wie bei Friseur
 * und Restaurant).
 *
 * Der Barbier hat den zweiten dunklen Token-Satz (`.demo-scope--barbier` in
 * `demo.css`: Flaschengrün + Messing); ohne diese Überschreibung stünde die
 * Adressleiste im Sandbeige des Gruppen-Layouts über einer dunkelgrünen Seite.
 *
 * Muss der Wert je geändert werden: er ist eine Kopie von `--background` aus
 * dem `.demo-scope--barbier`-Block in `demo.css`. Zwei Stellen, weil ein
 * `<meta>`-Attribut keine CSS-Variable lesen kann.
 */
export const viewport: Viewport = {
  themeColor: '#141f19',
  colorScheme: 'dark',
}

export default function BarbierDemoLayout({ children }: { children: ReactNode }) {
  return children
}
