import type { ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'

/**
 * Die sichtbare Hülle der Hauptseite: Fortschrittsbalken, Navbar, Footer,
 * Analytics. Lag bis 25.08.2026 direkt im Root-Layout.
 *
 * Warum ausgelagert: Das Root-Layout umschließt in Next ALLE Routen – auch die
 * stillen Demo-Seiten unter `/demo/*`, die bewusst KEINE Navbar/Footer/
 * ScrollProgress bekommen sollen (eigene Layout-Gruppe, eigenes Design). Ein
 * Elternteil-Layout lässt sich von unten nicht „abwählen", also wandert die
 * Hülle eine Ebene tiefer: `src/app/(site)/layout.tsx` nutzt sie, die
 * Demo-Gruppe nicht. Für die Hauptseite ändert sich dadurch NICHTS – das
 * gerenderte Markup ist identisch (verifiziert).
 *
 * `not-found.tsx` liegt weiterhin an der App-Wurzel (Next verlangt das für den
 * globalen 404) und rendert die Hülle deshalb selbst.
 */
export default function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* Vercel Web Analytics (cookielos). SSG-sicher: kein Markup im statischen
          HTML, das Insights-Script wird erst im Browser nachgeladen. Bewusst
          hier und nicht im Root-Layout → die Demo-Seiten werden NICHT getrackt. */}
      <Analytics />
    </div>
  )
}
