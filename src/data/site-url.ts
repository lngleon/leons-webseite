/**
 * NUR SERVER – wird ausschließlich von `src/app/sitemap.ts` und
 * `src/app/robots.ts` importiert (beide laufen zur Build-Zeit auf dem Server).
 *
 * ⚠️ NICHT aus einer Client-Komponente (`'use client'`) importieren:
 * `VERCEL_PROJECT_PRODUCTION_URL` hat kein `NEXT_PUBLIC_`-Präfix und ist im
 * Browser-Bundle immer `undefined` – `siteUrl` fiele dort still auf
 * `http://localhost:3000` zurück. Deshalb liegt das hier und nicht in
 * `site.ts` (das Navbar/Footer importieren).
 */

/**
 * Absolute Basis-URL der Seite – nur für `sitemap.xml` / `robots.txt` nötig
 * (beide brauchen absolute URLs). Bewusst NICHT hardcodiert, weil die finale
 * Domain noch nicht steht:
 *   1. `NEXT_PUBLIC_SITE_URL` (setzen, sobald die eigene Domain live ist),
 *   2. sonst die von Vercel automatisch gesetzte Production-Domain,
 *   3. sonst localhost (lokaler Build/Dev).
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')
).replace(/\/$/, '')

/** Alle öffentlichen, indexierbaren Routen (Quelle für die sitemap.xml). */
export const routes = ['/', '/impressum', '/datenschutz', '/möglichkeiten'] as const
