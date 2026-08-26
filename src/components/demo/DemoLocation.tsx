import type { GastroBusiness } from '@/data/demo/types'
import DemoSection from './DemoSection'
import DemoPhoto from './DemoPhoto'

/** Vollständige Adresse als eine Zeile – für Anzeige und Routen-Link. */
export function fullAddress(business: GastroBusiness): string {
  const { street, postalCode, city, countryName } = business.location
  return `${street}, ${postalCode} ${city}, ${countryName}`
}

/**
 * Adresse + Routen-Link + die kleine Bildreihe.
 *
 * Der Routen-Link ist bewusst ein normaler `<a>` auf einen Karten-Dienst und
 * KEIN eingebettetes Kartenmodul: die Seite lädt dadurch nichts von Dritten
 * (Non-Goal), erst ein Antippen verlässt die Seite.
 */
export default function DemoLocation({ business }: { business: GastroBusiness }) {
  const { location } = business
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    fullAddress(business),
  )}`

  return (
    <DemoSection id="anfahrt" title={location.title}>
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
        href={directions}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex min-h-12 items-center gap-2 border border-accent px-6 text-[0.82rem] font-medium uppercase tracking-[0.16em] text-accent transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {location.directionsLabel}
        <span aria-hidden="true">↗</span>
      </a>

      <div className="mt-10 grid grid-cols-2 gap-2 sm:gap-3">
        {business.gallery.map((photo, index) => {
          // Ungerade Anzahl: das letzte Bild bekommt die volle Breite.
          const wide =
            business.gallery.length % 2 === 1 && index === business.gallery.length - 1
          return (
            <DemoPhoto
              key={photo.placeholderLabel}
              photo={photo}
              sizes={wide ? '(min-width: 640px) 660px, 100vw' : '(min-width: 640px) 330px, 50vw'}
              className={wide ? 'col-span-2 rounded-sm' : 'rounded-sm'}
            />
          )
        })}
      </div>
    </DemoSection>
  )
}
