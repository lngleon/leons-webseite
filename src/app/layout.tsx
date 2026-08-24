import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import { routeMeta } from '@/data/meta'
import './globals.css'

/**
 * Root-Layout – ersetzt das frühere `index.html`-Template UND `components/Layout.tsx`.
 *
 * Head: komplett über die Metadata API (kein handgeschriebener <head> mehr).
 * `charSet` und der Viewport-Tag kommen von Next selbst; Favicon-Satz, Titel und
 * Description stehen hier als Default (jede Route überschreibt Title/Description/OG).
 *
 * Kein Scroll-nach-oben-Effekt mehr nötig: der App Router scrollt bei echtem
 * Seitenwechsel selbst an den Seitenanfang.
 */
export const metadata: Metadata = {
  // Default-Head (Fallback). Jede Route exportiert ihre eigene Metadata.
  title: routeMeta.home.title,
  description: routeMeta.home.description,
  // Favicon-Satz aus public/: SVG primär (moderne Browser), .ico Fallback
  // (Legacy, sizes="any" → SVG gewinnt wo unterstützt), PNG-Sizes + Apple-Touch-Icon.
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  // theme-color = --background (#0a0a0a); Meta-Tags können kein var() nutzen → Literal.
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>
        <div className="flex min-h-dvh flex-col bg-background text-foreground">
          <ScrollProgress />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          {/* Vercel Web Analytics (cookielos). SSR-/SSG-sicher: rendert im
              statischen HTML kein Markup, das Insights-Script wird erst im
              Browser nachgeladen. Einmal hier im Root-Layout → gilt für alle
              Routen; Routenwechsel werden automatisch als Pageviews erfasst.
              Daten erst nach Deploy + echten Besuchen. */}
          <Analytics />
        </div>
      </body>
    </html>
  )
}
