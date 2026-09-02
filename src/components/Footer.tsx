import Link from 'next/link'
import { InstagramIcon } from '@/components/BrandIcons'
import { site } from '@/data/site'

export default function Footer() {
  return (
    <footer className="bg-background">
      {/* Haarlinie als Verlauf Violett -> Warm statt neutralem border-t:
          das leise Echo des Scroll-Balkens am Seitenende. */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-linear-to-r from-accent/45 via-accent-warm/45 to-transparent"
      />
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="font-display text-lg font-semibold text-foreground">{site.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{site.tagline}</p>
        </div>

        {/* Tap-Flächen (TODO 2, 01.09.2026): Textlinks sind 20 px hoch, das
            Instagram-Icon 16 × 16. Unsichtbare Pseudo-Ebenen bringen jedes Ziel
            auf ≥ 44 px (Text: 12 px oben/unten; Icon: 14 px rundum), ohne dass
            sich Abstand, Schrift oder Fokusring ändern. Gilt in jeder Breite –
            die Fußzeile hat keine eigene Mobil-Variante, und die Ebene ist
            unsichtbar. Das Icon greift 14 px in die 24-px-Lücke zum Nachbarn;
            der hat seitlich keine Erweiterung, also keine Überlappung. */}
        <nav
          aria-label="Rechtliches"
          className="flex items-center gap-6 text-sm text-muted-foreground"
        >
          <Link
            href="/impressum"
            className="relative rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background before:absolute before:inset-x-0 before:-inset-y-3 before:content-['']"
          >
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="relative rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background before:absolute before:inset-x-0 before:-inset-y-3 before:content-['']"
          >
            Datenschutz
          </Link>
          <a
            href={site.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="relative rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background before:absolute before:-inset-3.5 before:content-['']"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
        </nav>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {site.name}. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  )
}
