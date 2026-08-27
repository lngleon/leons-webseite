import type { GastroBusiness, MenuItem, MenuSection } from '@/data/demo/types'
import { directionsUrl } from './DemoLocation'
import { demoHref } from './routes'
import { bundleCourses } from './menu'

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

/** Ein Gericht als `MenuItem` mit Preis-Offer. */
function menuItemNode(item: MenuItem) {
  return {
    '@type': 'MenuItem',
    name: item.name,
    ...(item.description ? { description: item.description } : {}),
    offers: {
      '@type': 'Offer',
      price: item.price.toFixed(2),
      priceCurrency: 'EUR',
    },
  }
}

/** Ein Gang bzw. eine Gruppe als verschachtelte `MenuSection`. */
function menuSectionNode(section: MenuSection) {
  return {
    '@type': 'MenuSection',
    name: section.title,
    ...(section.note ? { description: section.note } : {}),
    hasMenuItem: section.items.map(menuItemNode),
  }
}

/**
 * `Menu` für `/karte` – Sections → Items mit Preis-Offer.
 *
 * Steht als eigenständiger Knoten auf der Kartenseite und trägt über
 * `provider` den Bezug zum Betrieb, damit das Markup auch ohne die Startseite
 * verständlich bleibt.
 *
 * Die oberste Ebene wird immer als `MenuSection` ausgegeben – beim Café ist das
 * die Kategorie, beim Restaurant die ganze Karte. Was darunter hängt, richtet
 * sich nach den vorhandenen Feldern, nicht nach der Art des Betriebs:
 * `hasMenuItem` für Gerichte, `hasMenuSection` für Gänge und Gruppen (beides
 * lässt schema.org an einer `MenuSection` zu, auch verschachtelt).
 *
 * Menü-Bündel stehen als `MenuItem` an ihrer Karte: schema.org kennt kein
 * eigenes Festpreis-Menü, ein Bündel ist aber genau das – ein bestellbares
 * Angebot mit EINEM Preis. Die Gänge, aus denen es besteht, stehen in seiner
 * `description`; sie als `MenuItem` zu wiederholen würde die Gerichte doppelt
 * behaupten. Weil die oberste Ebene entweder Gerichte ODER Abschnitte trägt
 * (Typ-Union), kann `hasMenuItem` nie beides zugleich meinen.
 *
 * Bewusst KEIN `position` an den Abschnitten: die Reihenfolge steht im Array,
 * und ein zweites Feld daneben wäre eine zweite Wahrheit.
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
    hasMenuSection: menu.categories.map((category) => {
      const sections = category.sections ?? []
      const items = [
        ...(category.items ?? []).map(menuItemNode),
        ...(category.bundles ?? []).map((bundle) => {
          const courses = bundleCourses(sections, bundle)
            .map((course) => course.title)
            .join(' · ')
          const description = [bundle.description, courses].filter(Boolean).join(' – ')

          return {
            '@type': 'MenuItem',
            name: bundle.name,
            ...(description ? { description } : {}),
            offers: {
              '@type': 'Offer',
              price: bundle.price.toFixed(2),
              priceCurrency: 'EUR',
            },
          }
        }),
      ]

      return {
        '@type': 'MenuSection',
        name: category.title,
        ...(category.note ? { description: category.note } : {}),
        ...(items.length ? { hasMenuItem: items } : {}),
        ...(sections.length ? { hasMenuSection: sections.map(menuSectionNode) } : {}),
      }
    }),
  }
}
