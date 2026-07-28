import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollProgress from './ScrollProgress'

export default function Layout() {
  const { pathname } = useLocation()

  // Bei echtem Seitenwechsel (z.B. /impressum) nach oben scrollen.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/* Vercel Web Analytics (cookielos). SSR-/prerender-sicher: rendert null,
          injiziert das Insights-Script erst nach Mount (useEffect) → kein Markup
          im prerenderten HTML, kein window im Render. Einmal hier im Layout →
          gilt für alle Routen; SPA-Routenwechsel werden automatisch als
          Pageviews erfasst (History-API). Daten erst nach Deploy + echten Besuchen. */}
      <Analytics />
    </div>
  )
}
