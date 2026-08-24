import type { MetadataRoute } from 'next'
import { routes, siteUrl } from '@/data/site'

/**
 * sitemap.xml über die Next-Dateikonvention (ersetzt nichts – gab es vorher nicht).
 * Quelle der Routen ist `routes` in `src/data/site.ts` (dieselbe Liste, die früher
 * als `ROUTES` im Prerender-Skript stand). Die Basis-URL kommt aus `siteUrl`
 * (Env-gesteuert, siehe dort) – keine Domain hardcodiert.
 *
 * `lastModified` bewusst weggelassen: es gibt kein echtes Änderungsdatum pro Route,
 * und die Build-Zeit einzusetzen würde bei jedem Deploy „alles geändert" behaupten.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    // encodeURI: /möglichkeiten muss in der XML als /m%C3%B6glichkeiten stehen.
    url: encodeURI(`${siteUrl}${route === '/' ? '' : route}`),
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.6,
  }))
}
