import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import localFont from 'next/font/local'
import { routeMeta } from '@/data/meta'
import './globals.css'

/* Marken-Schriften, self-hosted (DSGVO: kein CDN-Request zur Laufzeit).
   Quelle Fontshare (ITF), Dateien unter src/app/fonts/ – siehe LIZENZ.txt.
   Nur CSS-Variablen ans <html>; die Zuordnung passiert in globals.css
   (@theme inline: --font-sans / --font-display). */
const switzer = localFont({
  src: [
    { path: './fonts/switzer-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/switzer-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/switzer-600.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-switzer',
  display: 'swap',
})
const clashDisplay = localFont({
  src: './fonts/clash-display-600.woff2',
  weight: '600',
  variable: '--font-clash-display',
  display: 'swap',
})

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
  // theme-color = --background (#070b21); Meta-Tags können kein var() nutzen → Literal.
  // Die Demo-Gruppe überschreibt beides in ihrem eigenen viewport-Export.
  themeColor: '#070b21',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={`${switzer.variable} ${clashDisplay.variable}`}>
      <body>{children}</body>
    </html>
  )
}
