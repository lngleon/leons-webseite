import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { ctaItem, navItems } from '@/data/navigation'
import { site } from '@/data/site'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo-Platzhalter "LL" */}
        <Link
          to="/"
          aria-label={`${site.name} – Startseite`}
          className="inline-flex items-center rounded-md border border-border px-2.5 py-1 text-lg font-semibold tracking-tight text-foreground transition-colors hover:border-accent"
        >
          {site.logoText}
        </Link>

        {/* Desktop-Navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Aktionen: Toggle + CTA + Mobile-Menü-Button */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={ctaItem.href}
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            {ctaItem.label}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile-Navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={ctaItem.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-accent px-4 py-2 text-center text-sm font-medium text-accent-foreground"
                >
                  {ctaItem.label}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
