import type { Viewport } from 'next'
import type { ReactNode } from 'react'

/**
 * Layout NUR dieses Betriebs – und es tut genau eine Sache: die Browser-Farbe
 * auf seinen eigenen Hintergrund setzen (dieselbe Mechanik wie beim Friseur).
 *
 * Das Gruppen-Layout (`(demo)/layout.tsx`) setzt `themeColor` auf das warme
 * Papier des Cafés. Seit Glut seinen eigenen DUNKLEN Token-Satz hat
 * (`.demo-scope--glut` in `demo.css`, 03.09.2026), stünde die Adressleiste
 * sonst in Sandbeige über einer braunschwarzen Seite.
 *
 * Muss der Wert je geändert werden: er ist eine Kopie von `--background` aus
 * dem `.demo-scope--glut`-Block in `demo.css`. Zwei Stellen, weil ein
 * `<meta>`-Attribut keine CSS-Variable lesen kann.
 */
export const viewport: Viewport = {
  themeColor: '#171110',
  colorScheme: 'dark',
}

export default function RestaurantDemoLayout({ children }: { children: ReactNode }) {
  return children
}
