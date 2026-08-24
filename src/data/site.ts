/** Zentrale Marken- & Kontaktdaten. Inhalte werden später hier gepflegt. */
export const site = {
  name: 'Leon Lang',
  logoText: 'LL',
  tagline: 'Veränderungen, die spürbar werden.',
  contact: {
    email: 'leonlang95@gmail.com',
    whatsapp: 'https://wa.me/4917648072158',
    instagram: 'https://instagram.com/leon.vln',
  },
} as const

/**
 * Absolute Basis-URL der Seite – nur fuer `sitemap.xml` / `robots.txt` noetig
 * (beide brauchen absolute URLs). Bewusst NICHT hardcodiert, weil die finale
 * Domain noch nicht steht:
 *   1. `NEXT_PUBLIC_SITE_URL` (setzen, sobald die eigene Domain live ist),
 *   2. sonst die von Vercel automatisch gesetzte Production-Domain,
 *   3. sonst localhost (lokaler Build/Dev).
 * Wird nur zur Build-Zeit auf dem Server gelesen.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/$/, '')

/** Alle oeffentlichen, indexierbaren Routen (Quelle fuer die sitemap.xml). */
export const routes = ['/', '/impressum', '/datenschutz', '/möglichkeiten'] as const
