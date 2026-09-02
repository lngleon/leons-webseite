import type { GastroBusiness } from '@/data/demo/types'
import DemoSection from './DemoSection'

/** Vollständige Adresse als eine Zeile – für Anzeige und Routen-Link. */
export function fullAddress(business: GastroBusiness): string {
  const { street, postalCode, city, countryName } = business.location
  return `${street}, ${postalCode} ${city}, ${countryName}`
}

/** Link auf den Karten-Dienst mit der Adresse als Ziel. */
export function directionsUrl(business: GastroBusiness): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    fullAddress(business),
  )}`
}

/**
 * Adresse + Routen-Link.
 *
 * Der Routen-Link ist bewusst ein normaler `<a>` auf einen Karten-Dienst und
 * KEIN eingebettetes Kartenmodul: die Seite lädt dadurch nichts von Dritten
 * (Non-Goal), erst ein Antippen verlässt die Seite.
 *
 * Die Bildreihe, die hier früher darunter stand, liegt seit der Aufteilung auf
 * drei Routen als `DemoGallery` auf der Startseite – die Kontaktseite soll
 * „wo, wann, wie erreiche ich euch" beantworten, ohne Bildstrecke dazwischen.
 */
export default function DemoLocation({ business }: { business: GastroBusiness }) {
  const { location } = business

  return (
    <DemoSection id="anfahrt" title={location.title} wide split>
      <address className="mt-8 not-italic">
        <p
          className="demo-display text-foreground"
          style={{ fontSize: 'clamp(1.35rem, 6vw, 1.9rem)' }}
        >
          {location.street}
        </p>
        <p
          className="demo-display mt-1 text-muted-foreground"
          style={{ fontSize: 'clamp(1.1rem, 5vw, 1.5rem)' }}
        >
          {location.postalCode} {location.city}
        </p>
      </address>

      {location.note ? (
        <p className="mt-5 max-w-prose text-[0.9rem] leading-relaxed text-muted-foreground">
          {location.note}
        </p>
      ) : null}

      <a
        href={directionsUrl(business)}
        target="_blank"
        rel="noopener noreferrer"
        className="demo-cta mt-7"
      >
        {location.directionsLabel}
        <span aria-hidden="true">↗</span>
      </a>
    </DemoSection>
  )
}
