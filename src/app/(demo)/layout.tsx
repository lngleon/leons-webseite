import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import './demo.css'

/**
 * Layout der stillen Demo-Seiten (`/demo/*`).
 *
 * Bewusst OHNE Navbar, Footer, ScrollProgress und Analytics: die Demos sollen
 * wie eigenständige Kundenseiten wirken, nicht wie Unterseiten von Leons Site.
 * Möglich wird das durch die Trennung in zwei Route-Gruppen – die Hülle der
 * Hauptseite liegt in `(site)/layout.tsx`, nicht mehr im Root-Layout.
 *
 * `demo.css` bringt die eigenen, auf `.demo-scope` gescopten Design-Tokens mit
 * und wird NUR hier geladen; die globalen `:root`-Tokens bleiben unberührt.
 *
 * Alle Demo-Seiten sind auf `noindex` gesetzt und stehen nicht in der Sitemap.
 * `robots.txt` sperrt sie bewusst NICHT aus: eine per `robots.txt` blockierte
 * Seite kann von Suchmaschinen gar nicht erst gelesen werden – dann sähen sie
 * das `noindex` nie. Crawlen erlauben, Indexieren verbieten ist der richtige Weg.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },

  /**
   * `icons: null` löscht den LL-Satz des Root-Layouts NUR für diese Gruppe –
   * und ist die Bedingung dafür, dass `icon.svg` daneben überhaupt greift.
   *
   * Grund steht in Next selbst (`lib/metadata/resolve-metadata.js`): die aus
   * Dateien gesammelten Icons werden ganz am Ende nur dann übernommen, wenn
   * `resolvedMetadata.icons` FALSY ist –
   *
   *     if (leafSegmentStaticIcons.icon.length > 0 || …) {
   *       if (!resolvedMetadata.icons) { … unshift(…leafSegmentStaticIcons) }
   *     }
   *
   * Ein `metadata.icons` IRGENDWO in der Kette (hier: im Root-Layout) macht
   * den Wert truthy, und `icon.svg` wird still verworfen – die Datei wird zwar
   * als Route gebaut, taucht aber in KEINEM `<head>` auf. Die Doku-Aussage
   * „file-based metadata has the higher priority" gilt für Icons in dieser
   * Version also NICHT. `icons: null` ist typisiert erlaubt
   * (`icons?: null | IconURL | Array<Icon> | Icons`), setzt den Wert zurück und
   * öffnet damit den Weg für die Datei. Im gebauten HTML verifiziert.
   *
   * Nebenwirkung, bewusst in Kauf genommen: Es gibt keinen `apple-icon` – die
   * Bild-Konvention kennt dafür nur JPG/PNG, und ein PNG-Satz war
   * ausgeschlossen. Die Demo-Seiten tragen deshalb GAR kein
   * `apple-touch-icon`-Tag mehr (vorher: Leons LL als explizites Tag).
   *
   * Was iOS beim „Zum Home-Bildschirm" dann nimmt, ist von uns NICHT
   * kontrolliert und hier auch nicht nachprüfbar: Safari kann auf die alte
   * Wurzel-Konvention `/apple-touch-icon.png` zurückfallen – das wäre wieder
   * Leons LL – oder das deklarierte `rel="icon"` heranziehen. Der Tab, um den
   * es hier geht, ist eindeutig gelöst; der Homescreen bliebe offen und
   * bräuchte ein PNG. Nicht behaupten, was nicht gemessen ist.
   */
  icons: null,
}

export const viewport: Viewport = {
  // Überschreibt das Dark-Setting des Root-Layouts für die Demo-Gruppe.
  themeColor: '#f6f1e7',
  colorScheme: 'light',
}

export default function DemoLayout({ children }: { children: ReactNode }) {
  return children
}
