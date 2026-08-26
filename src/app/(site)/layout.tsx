import type { ReactNode } from 'react'
import SiteChrome from '@/components/SiteChrome'

/**
 * Layout der eigentlichen Website (`/`, `/impressum`, `/datenschutz`,
 * `/moeglichkeiten`). Trägt Navbar, Footer, ScrollProgress und Analytics.
 *
 * Die Route-Gruppe `(site)` taucht NICHT in der URL auf – sie trennt nur die
 * Hauptseite von der Demo-Gruppe `(demo)`, die eine komplett eigene Hülle hat.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>
}
