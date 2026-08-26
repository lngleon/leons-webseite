import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { routeMeta } from '@/data/meta'
import './globals.css'

/**
 * Root-Layout – bewusst minimal: nur `<html>`, `<body>` und der Head.
 *
 * Die sichtbare Hülle der Hauptseite (Navbar/Footer/ScrollProgress/Analytics)
 * liegt seit 25.08.2026 eine Ebene tiefer in `src/app/(site)/layout.tsx`
 * (Komponente `SiteChrome`). Grund: Das Root-Layout umschließt ALLE Routen –
 * auch die stillen Demo-Seiten unter `/demo/*`, die eine komplett eigene
 * Gestaltung haben und die Hülle NICHT erben sollen. Ein Eltern-Layout lässt
 * sich von unten nicht abwählen, also gehört hier nur hinein, was wirklich für
 * jede Route gilt.
 *
 * Head: komplett über die Metadata API. `charSet` und der Viewport-Tag kommen
 * von Next selbst; Favicon-Satz, Titel und Description stehen hier als Default
 * (jede Route überschreibt Title/Description/OG).
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
  // Die Demo-Gruppe überschreibt beides in ihrem eigenen viewport-Export.
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}
