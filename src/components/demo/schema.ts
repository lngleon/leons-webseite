import type { GastroBusiness } from '@/data/demo/types'
import { fullAddress } from './DemoLocation'

/**
 * Baut aus dem Betriebs-Objekt das schema.org-JSON-LD: `Restaurant` mit
 * eingehängtem `Menu` (Sections → Items mit Preis-Offer).
 *
 * Alles kommt aus den Daten – ein zweiter Betrieb bekommt sein Markup ohne
 * eine Zeile Zusatzcode. Ruhetage werden bewusst NICHT als
 * `openingHoursSpecification` ausgegeben (nur geöffnete Zeiträume gehören dort
 * hinein; ein Tag, der fehlt, gilt als geschlossen).
 */
export function buildRestaurantSchema(business: GastroBusiness) {
  const { location, contact, menu, seo } = business

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: business.name,
    description: business.intro,
    slogan: business.tagline,
    priceRange: seo.priceRange,
    servesCuisine: seo.servesCuisine,
    telephone: contact.phone.e164,
    email: contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.street,
      postalCode: location.postalCode,
      addressLocality: location.city,
      addressCountry: location.country,
    },
    openingHoursSpecification: business.hours.entries
      .filter((entry) => !entry.closed && entry.opens && entry.closes)
      .map((entry) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: entry.days.map((day) => `https://schema.org/${day}`),
        opens: entry.opens,
        closes: entry.closes,
      })),
    hasMenu: {
      '@type': 'Menu',
      name: menu.title,
      hasMenuSection: menu.categories.map((category) => ({
        '@type': 'MenuSection',
        name: category.title,
        ...(category.note ? { description: category.note } : {}),
        hasMenuItem: category.items.map((item) => ({
          '@type': 'MenuItem',
          name: item.name,
          ...(item.description ? { description: item.description } : {}),
          offers: {
            '@type': 'Offer',
            price: item.price.toFixed(2),
            priceCurrency: 'EUR',
          },
        })),
      })),
    },
    // Nur zur Vollständigkeit der Demo – die Adresse steht ohnehin im Markup.
    hasMap: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      fullAddress(business),
    )}`,
  }
}
