import type { NextConfig } from 'next'

/**
 * Next.js (App Router). Reines Frontend, kein Backend – die vier Routen fallen
 * beim Build als statisches HTML raus (SSG), genau wie zuvor der selbstgebaute
 * Prerender. Keine Rewrites/Redirects, keine Middleware, kein Bild-Loader von
 * aussen: alle Bilder liegen in `public/` und laufen ueber next/image.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
}

export default nextConfig
