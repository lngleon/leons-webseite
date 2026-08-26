import type { GastroBusiness } from '@/data/demo/types'
import DemoPhoto from './DemoPhoto'

/**
 * Kopf der Demo-Seite: Betriebsart, sehr grosser Versalien-Name, Tagline,
 * Intro – darunter das Hauptfoto im Hochformat (mobile-first gedacht).
 *
 * Der Name steht als eine Zeile in der Serifen-Display-Schrift; die Grösse
 * skaliert über `clamp()` mit dem Viewport, damit er auf dem Handy die Seite
 * trägt und auf dem Desktop nicht auseinanderfällt.
 */
export default function DemoHero({ business }: { business: GastroBusiness }) {
  return (
    <header className="px-5 pb-10 pt-12 sm:px-8 sm:pt-16">
      <div className="mx-auto max-w-3xl">
        <p className="demo-eyebrow">{business.kind}</p>

        <h1
          className="demo-display mt-4 text-foreground"
          style={{ fontSize: 'clamp(3.25rem, 22vw, 9rem)' }}
        >
          {business.displayName}
        </h1>

        <p
          className="demo-display mt-3 text-accent"
          style={{ fontSize: 'clamp(1rem, 4.6vw, 1.6rem)', letterSpacing: '0.06em' }}
        >
          {business.tagline}
        </p>

        <hr className="mt-8 border-0 border-t border-border" />

        <p className="mt-6 max-w-prose text-[0.95rem] leading-relaxed text-muted-foreground">
          {business.intro}
        </p>

        <DemoPhoto
          photo={business.hero.photo}
          priority
          sizes="(min-width: 640px) 768px, 100vw"
          className="mt-8 rounded-sm"
        />
      </div>
    </header>
  )
}
