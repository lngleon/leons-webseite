import type { MetadataRoute } from 'next'
import { siteUrl } from '@/data/site-url'

/**
 * robots.txt über die Next-Dateikonvention. Die Seite ist komplett öffentlich –
 * alles erlaubt, nichts gesperrt (auch die stille Route /möglichkeiten darf
 * indexiert werden, sie ist nur nicht verlinkt). Verweist auf die sitemap.xml.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
