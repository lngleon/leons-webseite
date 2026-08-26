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
}

export const viewport: Viewport = {
  // Überschreibt das Dark-Setting des Root-Layouts für die Demo-Gruppe.
  themeColor: '#f6f1e7',
  colorScheme: 'light',
}

export default function DemoLayout({ children }: { children: ReactNode }) {
  return children
}
