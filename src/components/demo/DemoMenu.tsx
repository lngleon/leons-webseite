import type { GastroBusiness, MenuItem } from '@/data/demo/types'
import DemoSection from './DemoSection'
import DemoCategoryRail from './DemoCategoryRail'
import DemoMenuBundles from './DemoMenuBundles'
import { formatDuration, formatItemPrice } from './menu'

/**
 * Eine Zeile der Preisliste: Posten links, gepunktete Führungslinie, Preis
 * rechts in Tabellenziffern. Beim Café und beim Restaurant ist der Posten ein
 * Gericht, beim Friseur eine Leistung – die Zeile weiss davon nichts.
 *
 * Drei Dinge unter dem Namen, jedes an SEIN Feld gebunden und keins an eine
 * Branche: die Allergen-Kürzel (`allergens`), die Dauer (`durationMinutes`)
 * und die Beschreibung (`description`). Ein Betrieb, der ein Feld nicht
 * ausfüllt, bekommt die Zeile ohne – so wie `description` das seit jeher hält.
 *
 * Auch der PREIS steht nicht mehr fest: `formatItemPrice` macht daraus je nach
 * Feldern „3,80 €", „ab 39,00 €" oder „45,00 – 75,00 €". Für einen Posten ohne
 * die beiden Zusatzfelder ist das Ergebnis Zeichen für Zeichen dasselbe wie
 * vorher.
 *
 * `compact` lässt Beschreibung, Dauer und Allergen-Kürzel weg – gedacht für den
 * Karten-Auszug auf der Startseite, wo die Allergen-Legende NICHT steht. Kürzel
 * ohne die zugehörige Legende wären dort nur unerklärte Buchstaben; die volle
 * Zeile inklusive Legende gibt es auf der Kartenseite. Der Preis bleibt auch
 * dort vollständig – ein „ab" wegzulassen wäre kein Kürzen, sondern eine
 * falsche Zahl.
 */
export function MenuRow({ item, compact = false }: { item: MenuItem; compact?: boolean }) {
  return (
    <li className="py-3">
      <div className="demo-leader">
        <span className="font-medium text-foreground">
          {item.name}
          {!compact && item.allergens?.length ? (
            <span className="ml-1.5 align-super text-[0.62rem] font-normal tracking-wider text-muted-foreground">
              {item.allergens.join(',')}
            </span>
          ) : null}
        </span>
        <span aria-hidden="true" className="demo-leader__fill" />
        <span className="demo-price font-medium text-foreground">
          {formatItemPrice(item)}
        </span>
      </div>
      {/*
        Eigene Zeile und nicht in die Beschreibung hineingezogen: nicht jede
        Leistung hat beides, und in derselben Zeile stünde die Dauer mal vorn,
        mal allein, mal gar nicht. Optisch dieselbe kleine Versalienzeile wie
        die `note` eines Abschnitts – es ist auch dieselbe Art Angabe.
      */}
      {!compact && item.durationMinutes ? (
        <p className="mt-1 text-[0.8rem] uppercase tracking-[0.14em] text-muted-foreground">
          {formatDuration(item.durationMinutes)}
        </p>
      ) : null}
      {!compact && item.description ? (
        <p className="mt-1 pr-16 text-[0.85rem] leading-snug text-muted-foreground">
          {item.description}
        </p>
      ) : null}
    </li>
  )
}

/**
 * Die volle Speisekarte – gesetzt wie eine gedruckte Preisliste. Allergene als
 * kleine Kürzel hinter dem Namen, Legende am Ende.
 *
 * Seit der Aufteilung auf drei Routen ist das der Inhalt der eigenen Seite
 * `/karte`; darüber klebt die Kategorie-Leiste als Sprungmarken-Rail.
 *
 * Die oberste Ebene (`menu.categories`) hat zwei Formen, und die Komponente
 * fragt NICHT, welcher Betrieb gerade rendert, sondern nur, welche Felder da
 * sind – dieselbe Regel wie beim `note` seit jeher:
 *
 * - `items` → flache Karte, Posten direkt unter der Überschrift (Café; beim
 *   Friseur „Schnitt", „Pflege & Styling", „Bart & Rasur").
 * - `sections` → gegliederte Karte, darunter die Abschnitte in der Reihenfolge
 *   des Arrays, jeder mit eigener Überschrift (Restaurant: Mittagstisch flach,
 *   Abendkarte in Gängen, Weinkarte in Gruppen; Friseur: „Farbe" mit „Ansatz &
 *   Ton" und „Strähnen & Aufhellung").
 * - `bundles` → darunter die Menüs zum Festpreis (`DemoMenuBundles`).
 * - `allergens` am Betrieb → die Legende am Ende. Fehlt das Feld, fehlt der
 *   Block; ein Betrieb, der nichts serviert, hat nichts zu kennzeichnen.
 *
 * Der Typ lässt nur ENTWEDER `items` ODER `sections` zu, deshalb steht hier
 * kein `else`: beide Blöcke sind unabhängig voneinander an ihr eigenes Feld
 * gebunden, und es kann nie beides zugleich erscheinen.
 */
export default function DemoMenu({ business }: { business: GastroBusiness }) {
  return (
    <DemoSection id="karte" title={business.menu.title} note={business.menu.note} wide>
      <DemoCategoryRail categories={business.menu.categories} />

      {/* Ab 60 rem zwei Spalten – eine gedruckte Karte setzt ihre Rubriken auch
          nebeneinander. Die Sprungmarken der Leiste funktionieren unverändert:
          ein Anker findet seine Überschrift auch in der rechten Spalte. */}
      <div className="demo-menue-spalten mt-8">
        {business.menu.categories.map((category) => (
          <section key={category.id} aria-labelledby={`kat-${category.id}`}>
            <h3
              id={`kat-${category.id}`}
              className="demo-anchor demo-display text-foreground"
              style={{ fontSize: 'clamp(1.5rem, 7vw, 2.1rem)' }}
            >
              {category.title}
            </h3>
            {category.note ? (
              <p className="mt-1 text-[0.8rem] uppercase tracking-[0.14em] text-muted-foreground">
                {category.note}
              </p>
            ) : null}
            {category.items ? (
              <ul className="mt-4 divide-y divide-border">
                {category.items.map((item) => (
                  <MenuRow key={item.name} item={item} />
                ))}
              </ul>
            ) : null}

            {category.sections ? (
              <div className="mt-6 space-y-8">
                {category.sections.map((section) => (
                  <section key={section.id} aria-labelledby={`gang-${section.id}`}>
                    <h4
                      id={`gang-${section.id}`}
                      className="demo-anchor demo-display text-foreground"
                      style={{ fontSize: 'clamp(1.15rem, 5vw, 1.5rem)' }}
                    >
                      {section.title}
                    </h4>
                    {section.note ? (
                      <p className="mt-1 text-[0.8rem] uppercase tracking-[0.14em] text-muted-foreground">
                        {section.note}
                      </p>
                    ) : null}
                    <ul className="mt-3 divide-y divide-border">
                      {section.items.map((item) => (
                        <MenuRow key={item.name} item={item} />
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            ) : null}

            {category.sections && category.bundles ? (
              <DemoMenuBundles sections={category.sections} bundles={category.bundles} />
            ) : null}
          </section>
        ))}
      </div>

      {/*
        Allergen-Legende – hängt am FELD `allergens`, nicht an der Branche.
        Ein Betrieb, der nichts serviert, hat nichts zu kennzeichnen und
        bekommt den Block gar nicht erst; die Überschrift „Allergene" darf
        deshalb im Klartext hier stehen, denn sie erscheint nur, wenn es
        wirklich um Allergene geht.
      */}
      {business.allergens?.length ? (
        <div className="demo-lese mt-12 border-t border-border pt-6">
          <h3 className="demo-eyebrow">Allergene</h3>
          <dl className="mt-3 grid grid-cols-1 gap-x-8 gap-y-1.5 sm:grid-cols-2">
            {business.allergens.map((allergen) => (
              <div key={allergen.code} className="flex gap-2 text-[0.85rem]">
                <dt className="w-5 shrink-0 font-medium text-accent">{allergen.code}</dt>
                <dd className="text-muted-foreground">{allergen.label}</dd>
              </div>
            ))}
          </dl>
          {business.menu.allergenNote ? (
            <p className="mt-4 max-w-prose text-[0.8rem] leading-relaxed text-muted-foreground">
              {business.menu.allergenNote}
            </p>
          ) : null}
        </div>
      ) : null}
    </DemoSection>
  )
}
