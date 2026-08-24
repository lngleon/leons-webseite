import Link from 'next/link'
import { InstagramIcon } from '@/components/BrandIcons'
import { site } from '@/data/site'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="text-base font-semibold text-foreground">{site.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{site.tagline}</p>
        </div>

        <nav
          aria-label="Rechtliches"
          className="flex items-center gap-6 text-sm text-muted-foreground"
        >
          <Link
            href="/impressum"
            className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Impressum
          </Link>
          <Link
            href="/datenschutz"
            className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Datenschutz
          </Link>
          <a
            href={site.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
