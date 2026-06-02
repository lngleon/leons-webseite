import { Link } from 'react-router-dom'
import { site } from '@/data/site'

/** Instagram-Glyph als Inline-SVG (lucide führt keine Marken-Logos mehr). */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="text-base font-semibold text-foreground">{site.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{site.tagline}</p>
        </div>

        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link to="/impressum" className="transition-colors hover:text-foreground">
            Impressum
          </Link>
          <Link to="/datenschutz" className="transition-colors hover:text-foreground">
            Datenschutz
          </Link>
          <a
            href={site.contact.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="transition-colors hover:text-foreground"
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
