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
   * den Wert truthy, und ein `icon.svg` wird still verworfen – die Datei wird
   * zwar als Route gebaut, taucht aber in KEINEM `<head>` auf. Die Doku-Aussage
   * „file-based metadata has the higher priority" gilt für Icons in dieser
   * Version also NICHT. `icons: null` ist typisiert erlaubt
   * (`icons?: null | IconURL | Array<Icon> | Icons`), setzt den Wert zurück und
   * öffnet damit den Weg für die Datei. Im gebauten HTML verifiziert.
   *
   * **Seit 27.08.2026 liegen die Icons JE BETRIEB**, nicht mehr neben dieser
   * Datei: `demo/cafe/{icon.svg,apple-icon.png}` und
   * `demo/restaurant/{icon.svg,apple-icon.png}`. Die Rücksetzung hier gilt
   * unverändert für den ganzen Zweig und ist weiterhin die Bedingung dafür,
   * dass die Dateien überhaupt greifen; welches Paar eine Seite bekommt,
   * entscheidet das nächstgelegene Segment. Ein dritter Betrieb ohne eigenes
   * Paar bekäme deshalb GAR KEIN Icon-Tag.
   *
   * Das `apple-icon.png` gibt es, seit die Demo-Seiten sonst gar kein
   * `apple-touch-icon`-Tag trügen: Safari wäre beim „Zum Home-Bildschirm"
   * womöglich auf die Wurzel-Konvention `/apple-touch-icon.png`
   * zurückgefallen – Leons LL über einer fremden Gastro-Seite.
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
