import Image from 'next/image'
import type { Photo } from '@/data/demo/types'
import { cn } from '@/lib/utils'

/**
 * Bildfläche mit fest reserviertem Seitenverhältnis.
 *
 * Solange in den Daten kein `src` steht, rendert ein gestalteter Platzhalter –
 * in EXAKT derselben Box wie das spätere Foto. Beim Nachreichen echter
 * Handyfotos springt deshalb nichts (kein Layout-Shift): nur `src` in der
 * Datendatei ergänzen.
 *
 * Der Platzhalter ist bewusst kein graues Kästchen, sondern trägt die
 * Demo-Farben und ein Wort – die Seite soll auch OHNE Bilder vorzeigbar sein.
 */
export default function DemoPhoto({
  photo,
  className,
  priority = false,
  sizes = '100vw',
}: {
  photo: Photo
  className?: string
  priority?: boolean
  sizes?: string
}) {
  return (
    <div
      className={cn('relative overflow-hidden bg-muted', className)}
      style={{ aspectRatio: photo.ratio }}
    >
      {photo.src ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={photo.alt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 border border-border"
        >
          {/* Dezentes Rautenmuster – trägt Farbe, lenkt nicht ab. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.25]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(135deg, var(--border) 0 1px, transparent 1px 11px)',
            }}
          />
          <span
            aria-hidden="true"
            className="demo-eyebrow relative z-10 text-[0.6rem] opacity-80"
          >
            {photo.placeholderLabel}
          </span>
          <span
            aria-hidden="true"
            className="relative z-10 text-[0.65rem] text-muted-foreground"
          >
            Foto folgt
          </span>
        </div>
      )}
    </div>
  )
}
