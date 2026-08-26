import type { GastroBusiness } from '@/data/demo/types'
import { directionsUrl } from './DemoLocation'
import { demoHref } from './routes'

/**
 * schema.org-Markup der Demo, aufgeteilt wie die Seiten selbst:
 * `Restaurant` auf der Startseite, `Menu` auf `/karte`.
 *
 * Vorher steckte das `Menu` als `hasMenu` im `Restaurant`, weil alles auf EINER
 * Seite lag. Bei getrennten Seiten gehört jede Aussage auf die Seite, die sie
 * auch zeigt – das `Restaurant` verweist stattdessen per URL auf die Karte
 * (`hasMenu` akzeptiert laut schema.org eine URL).
 *
 * Alles kommt aus den Daten; ein zweiter Betrieb bekommt sein Markup ohne eine
 * Zeile Zusatzcode.
 */

/**
 * `Restaurant` für die Startseite – Adresse, Kontakt, Öffnungszeiten.
 *
 * Ruhetage werden bewusst NICHT als `openingHoursSpecification` ausgegeben (nur
 * geöffnete Zeiträume gehören dort hinein; ein Tag, der fehlt, gilt als
 * geschlossen).
 */
export function buildRestaurantSchema(business: GastroBusiness) {
  const { location, contact, seo } = business

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
    // Die Karte hat eine eigene Seite – hier nur der Verweis darauf.
    hasMenu: demoHref(business.slug, 'menu'),
    // Nur zur Vollständigkeit der Demo – die Adresse steht ohnehin im Markup.
    hasMap: directionsUrl(business),
  }
}

/**
 * `Menu` für `/karte` – Sections → Items mit Preis-Offer.
 *
 * Steht als eigenständiger Knoten auf der Kartenseite und trägt über
 * `provider` den Bezug zum Betrieb, damit das Markup auch ohne die Startseite
 * verständlich bleibt.
 */
export function buildMenuSchema(business: GastroBusiness) {
  const { menu } = business

  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: menu.title,
    inLanguage: 'de',
    provider: {
      '@type': 'Restaurant',
      name: business.name,
      url: demoHref(business.slug, 'start'),
    },
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
  }
}
