import type { Viewport } from 'next'
import type { ReactNode } from 'react'

/**
 * Layout NUR dieses Betriebs – und es tut genau eine Sache: die Browser-Farbe
 * auf seinen eigenen Hintergrund setzen.
 *
 * Das Gruppen-Layout (`(demo)/layout.tsx`) setzt `themeColor` auf das warme
 * Papier von Café und Restaurant. Seit der Friseur einen eigenen Token-Satz
 * hat (`.demo-scope--friseur` in `demo.css`), stimmt das für ihn nicht mehr:
 * die Adressleiste auf einem Handy stünde in Sandbeige über einer kühlen,
 * grauen Seite. Ein tieferes Segment überschreibt den Wert für seinen Zweig;
 * alles andere – `robots: noindex`, `icons: null`, `colorScheme` – bleibt
 * geerbt.
 *
 * Bewusst ein Layout und nicht sechs `viewport`-Exporte in den sechs Seiten:
 * der Wert gehört zum BETRIEB, nicht zur einzelnen Seite. Das Layout gibt
 * `children` unverändert zurück und erzeugt deshalb kein zusätzliches Element
 * im DOM – genau wie das Gruppen-Layout darüber.
 *
 * Muss der Wert je geändert werden: er ist eine Kopie von `--background` aus
 * dem `.demo-scope--friseur`-Block in `demo.css`. Zwei Stellen, weil ein
 * `<meta>`-Attribut keine CSS-Variable lesen kann.
 */
export const viewport: Viewport = {
  themeColor: '#edeef0',
}

export default function FriseurDemoLayout({ children }: { children: ReactNode }) {
  return children
}
