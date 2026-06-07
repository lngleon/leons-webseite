import { Link } from 'react-router-dom'
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
