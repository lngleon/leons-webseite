import type { GastroBusiness } from '@/data/demo/types'
import DemoPhoto from './DemoPhoto'

/**
 * Die kleine Bildreihe des Betriebs.
 *
 * Lag vorher am Ende von `DemoLocation`. Seit die Seiten getrennt sind, gehört
 * sie auf die Startseite: dort zeigt sie, wie es im Laden aussieht. Die
 * Kontaktseite soll dagegen die Frage „wo, wann, wie erreiche ich euch"
 * beantworten, ohne dass man an Bildern vorbeiscrollen muss.
 *
 * Zwei Spalten; bei ungerader Anzahl bekommt das letzte Bild die volle Breite.
 * Die `sizes` entsprechen den real gerenderten Breiten (Spalte max. 768 px).
 */
export default function DemoGallery({ business }: { business: GastroBusiness }) {
  if (business.gallery.length === 0) return null

  return (
    // Bewusst ein <div> und keine <section>: der Block hat keine Überschrift
    // (es gibt keine Copy dafür), eine Sektion ohne zugänglichen Namen wäre nur
    // ein leerer Eintrag mehr in der Struktur. Die Bilder tragen ihren Alt-Text.
    <div className="border-t border-border px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-2 sm:gap-3">
        {business.gallery.map((photo, index) => {
          // Ungerade Anzahl: das letzte Bild bekommt die volle Breite.
          const wide =
            business.gallery.length % 2 === 1 && index === business.gallery.length - 1
          return (
            <DemoPhoto
              key={photo.placeholderLabel}
              photo={photo}
              sizes={
                wide ? '(min-width: 640px) 768px, 100vw' : '(min-width: 640px) 378px, 50vw'
              }
              className={wide ? 'col-span-2 rounded-sm' : 'rounded-sm'}
            />
          )
        })}
      </div>
    </div>
  )
}
