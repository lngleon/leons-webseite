import type { GastroBusiness } from '@/data/demo/types'
import { directionsUrl } from './DemoLocation'

/**
 * Der praktische Streifen der Startseite: Öffnungszeiten, Adresse, kurzer Draht
 * nebeneinander.
 *
 * Warum es ihn gibt: die Startseite endete bisher mit dem Karten-Auszug. Wer
 * wissen wollte, wann offen ist und wo der Laden steht – also das, weswegen man
 * die Seite eines Cafés überhaupt aufruft –, musste erst auf `/kontakt`
 * wechseln. Die Angaben stehen dort weiterhin ausführlich; hier ist die
 * Kurzfassung, wie sie auf jeder guten Gastro-Startseite steht.
 *
 * KEINE neue Copy: jede Zeile kommt aus derselben Datendatei wie die
 * Kontaktseite (`hours`, `location`, `contact`). Ein zweiter Betrieb bekommt
 * den Streifen also ohne eine einzige zusätzliche Angabe.
 *
 * Bewusst OHNE grosse Display-Überschrift: drei Spalten mit je einem
 * Versalien-Label lesen sich als Abbinder des Inhalts, nicht als viertes
 * Kapitel. Jede Spalte ist trotzdem eine eigene `<section>` mit echter `h2` –
 * so heisst in der Dokumentstruktur jeder Block, wie er auch aussieht, statt
 * dass drei Spalten unter einer erfundenen Sammelüberschrift hängen.
 */
export default function DemoFacts({ business }: { business: GastroBusiness }) {
  const { hours, location, contact } = business

  return (
    <div className="demo-abschnitt border-t border-border">
      <div className="demo-bahn demo-praktisch">
        <section aria-labelledby="praktisch-zeiten">
          <h2 id="praktisch-zeiten" className="demo-eyebrow">
            {hours.title}
          </h2>
          <dl className="mt-4 text-[0.9rem]">
            {hours.entries.map((entry) => (
              <div key={entry.label} className="demo-leader py-1.5">
                <dt className="text-muted-foreground">{entry.label}</dt>
                <span aria-hidden="true" className="demo-leader__fill" />
                <dd
                  className={
                    entry.closed
                      ? 'demo-price text-muted-foreground'
                      : 'demo-price font-medium text-foreground'
                  }
                >
                  {entry.closed ? 'geschlossen' : `${entry.opens} – ${entry.closes}`}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="praktisch-ort">
          <h2 id="praktisch-ort" className="demo-eyebrow">
            {location.title}
          </h2>
          <address className="mt-4 not-italic text-[0.9rem] leading-relaxed text-foreground">
            {location.street}
            <br />
            {location.postalCode} {location.city}
          </address>
          <a
            href={directionsUrl(business)}
            target="_blank"
            rel="noopener noreferrer"
            className="demo-fuss-link mt-3 inline-block text-[0.85rem]"
          >
            {location.directionsLabel}
            <span aria-hidden="true"> ↗</span>
          </a>
        </section>

        <section aria-labelledby="praktisch-draht">
          <h2 id="praktisch-draht" className="demo-eyebrow">
            {contact.title}
          </h2>
          <ul className="mt-4 text-[0.9rem] leading-relaxed">
            <li>
              <a href={`tel:${contact.phone.e164}`} className="demo-fuss-link">
                {contact.phone.display}
              </a>
            </li>
            <li className="mt-1">
              <a href={`mailto:${contact.email}`} className="demo-fuss-link">
                {contact.email}
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
