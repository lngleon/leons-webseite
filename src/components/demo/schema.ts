import type { GastroBusiness, MenuItem, MenuSection } from '@/data/demo/types'
import { directionsUrl } from './DemoLocation'
import { demoHref } from './routes'
import { bundleCourses } from './menu'

/**
 * schema.org-Markup der Demo, aufgeteilt wie die Seiten selbst: der BETRIEB auf
 * der Startseite, seine PREISLISTE auf `/karte`.
 *
 * Vorher steckte das `Menu` als `hasMenu` im `Restaurant`, weil alles auf EINER
 * Seite lag. Bei getrennten Seiten gehört jede Aussage auf die Seite, die sie
 * auch zeigt – das `Restaurant` verweist stattdessen per URL auf die Karte
 * (`hasMenu` akzeptiert laut schema.org eine URL).
 *
 * Alles kommt aus den Daten; ein zweiter Betrieb bekommt sein Markup ohne eine
 * Zeile Zusatzcode.
 *
 * **Hier – und nur hier – hat Demo 3 (Friseur) den gemeinsamen Baum wirklich
 * gedehnt.** Der Betriebs-Knoten liess sich verallgemeinern (der Typ steht in
 * den Daten, siehe unten). Die PREISLISTE nicht: `Menu`/`MenuSection`/
 * `MenuItem` ist in schema.org ausdrücklich „food or drink items available
 * from a FoodEstablishment". Für Dienstleistungen heisst dasselbe Konzept
 * `OfferCatalog` → `Offer` → `Service` und hat eine ANDERE Form, nicht nur
 * andere Namen. Deshalb steht darunter ein zweiter Aufbauer statt eines `if`
 * im ersten: welchen eine Seite ruft, entscheidet die Seite – so wie sie auch
 * entscheidet, welche Datendatei sie hineinreicht. Keine Komponente fragt nach
 * der Branche, und `buildMenuSchema` ist Zeichen für Zeichen unverändert.
 */

/**
 * Wie heisst die Eigenschaft, die einen Betrieb mit seiner Preisliste
 * verbindet? Das ist eine Tatsache über schema.org, keine über unsere Betriebe
 * – deshalb eine Tabelle und kein `if`.
 *
 * `hasMenu` ist an `FoodEstablishment` definiert, `hasOfferCatalog` an
 * `Organization` (und damit an jedem `LocalBusiness`). Ein neuer Betriebstyp
 * ergänzt hier eine Zeile – an derselben Stelle, an der er ohnehin in die Union
 * `seo.schemaType` eingetragen wird.
 */
const PREISLISTEN_PROP: Record<
  NonNullable<GastroBusiness['seo']['schemaType']>,
  string
> = {
  Restaurant: 'hasMenu',
  HairSalon: 'hasOfferCatalog',
  BarberShop: 'hasOfferCatalog',
}

/**
 * Der BETRIEB für die Startseite – Adresse, Kontakt, Öffnungszeiten.
 *
 * Hiess bis Demo 3 `buildRestaurantSchema`. Umbenannt, weil der Typ jetzt aus
 * den Daten kommt: eine Funktion, die `HairSalon` ausgibt und `Restaurant`
 * heisst, führt jeden in die Irre, der später danach greppt. Das Ergebnis für
 * Café und Restaurant ist unverändert – sie tragen kein `seo.schemaType`, und
 * der Vorgabewert ist derselbe Typ wie vorher.
 *
 * Ruhetage werden bewusst NICHT als `openingHoursSpecification` ausgegeben (nur
 * geöffnete Zeiträume gehören dort hinein; ein Tag, der fehlt, gilt als
 * geschlossen).
 */
export function buildBusinessSchema(business: GastroBusiness) {
  const { location, contact, seo } = business
  const typ = seo.schemaType ?? 'Restaurant'

  return {
    '@context': 'https://schema.org',
    '@type': typ,
    name: business.name,
    description: business.intro,
    slogan: business.tagline,
    priceRange: seo.priceRange,
    // Nur, wer serviert, hat eine Küche – der Friseur lässt das Feld weg, und
    // dann fehlt der Schlüssel im Markup, statt leer dazustehen.
    ...(seo.servesCuisine ? { servesCuisine: seo.servesCuisine } : {}),
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
    // Die Preisliste hat eine eigene Seite – hier nur der Verweis darauf.
    // Wie die Eigenschaft heisst, sagt die Tabelle oben; der WERT ist in beiden
    // Fällen eine URL auf die Seite, die den vollen Knoten trägt.
    [PREISLISTEN_PROP[typ]]: demoHref(business.slug, 'menu'),
    // Nur zur Vollständigkeit der Demo – die Adresse steht ohnehin im Markup.
    hasMap: directionsUrl(business),
    // Mitarbeiter, falls der Betrieb sie als eigene Ebene führt. `employee`
    // hängt an `Organization` und gilt damit für jeden `LocalBusiness`.
    ...(business.team
      ? {
          employee: business.team.members.map((member) => ({
            '@type': 'Person',
            name: member.name,
            jobTitle: member.role,
          })),
        }
      : {}),
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

/** Ein Posten als `Offer` – das Angebot, nicht die Sache selbst. */
function offerNode(item: MenuItem) {
  return {
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: item.name,
      ...(item.description ? { description: item.description } : {}),
    },
    ...preisAngabe(item),
  }
}

/**
 * Der Preis eines Postens im schema.org-Vokabular – in genau den drei Formen,
 * die {@link MenuItem} kennt.
 *
 * Das ist die Stelle, an der sich zeigt, dass die Preis-Union nicht bloss
 * Anzeige ist: schema.org unterscheidet dieselben Fälle. Ein fester Preis ist
 * `price`, alles Unscharfe eine `PriceSpecification` mit `minPrice` – und
 * `maxPrice` nur, wenn es eine Obergrenze gibt. Ein Ab-Preis als `price`
 * auszugeben wäre eine falsche Zusage an eine Maschine, die sie nicht
 * nachlesen kann.
 *
 * Die DAUER (`durationMinutes`) steht bewusst NICHT im Markup: schema.org hat
 * für „so lange dauert diese Dienstleistung" keine Eigenschaft an `Service`
 * oder `Offer`. Eine zweckentfremdete zu nehmen wäre schlechter als die
 * Auslassung – auf der Seite steht die Zeit ja.
 */
function preisAngabe(item: MenuItem) {
  const spanne = (min: number, max?: number) => ({
    priceSpecification: {
      '@type': 'PriceSpecification',
      priceCurrency: 'EUR',
      minPrice: min.toFixed(2),
      ...(max !== undefined ? { maxPrice: max.toFixed(2) } : {}),
    },
  })

  if (item.priceTo !== undefined) return spanne(item.price, item.priceTo)
  if (item.priceOpen) return spanne(item.price)

  return { price: item.price.toFixed(2), priceCurrency: 'EUR' }
}

/**
 * `OfferCatalog` für die Preisliste eines Betriebs, der DIENSTLEISTUNGEN
 * verkauft – das Gegenstück zu {@link buildMenuSchema}.
 *
 * Zwei Aufbauer statt eines mit Weiche, weil es zwei Vokabulare sind und nicht
 * zwei Schreibweisen desselben: `Menu` verschachtelt `MenuSection` und hängt
 * `MenuItem` daran, `OfferCatalog` verschachtelt sich selbst und hängt `Offer`
 * daran, die wiederum ein `Service` UMSCHLIESSEN. Ein gemeinsamer Aufbauer
 * hätte an jeder zweiten Zeile fragen müssen, welches Vokabular gerade gilt –
 * und genau das ist die Verzweigung, die dieser Baum nicht haben soll. So
 * bleibt `buildMenuSchema` unangetastet, und beide Funktionen sind je für sich
 * lesbar.
 *
 * Die Struktur bildet dieselben Ebenen ab wie die Seite: oberste Ebene je
 * Kategorie, darunter entweder Posten direkt (flache Liste) oder Abschnitte
 * (gegliederte Liste). Weil `MenuCategory` eine exklusive Union ist, kann immer
 * nur eins von beidem gefüllt sein.
 */
export function buildOfferCatalogSchema(business: GastroBusiness) {
  const { menu } = business

  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: menu.title,
    inLanguage: 'de',
    provider: {
      '@type': business.seo.schemaType ?? 'Restaurant',
      name: business.name,
      url: demoHref(business.slug, 'start'),
    },
    itemListElement: menu.categories.map((category) => ({
      '@type': 'OfferCatalog',
      name: category.title,
      ...(category.note ? { description: category.note } : {}),
      itemListElement: [
        ...(category.items ?? []).map(offerNode),
        ...(category.sections ?? []).map((section) => ({
          '@type': 'OfferCatalog',
          name: section.title,
          ...(section.note ? { description: section.note } : {}),
          itemListElement: section.items.map(offerNode),
        })),
      ],
    })),
  }
}
