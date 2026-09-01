'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { ctaItem, navItems } from '@/data/navigation'
import { site } from '@/data/site'
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  /**
   * reduced-motion für das Aufklappen des Mobil-Menüs.
   *
   * Hier ist der HOOK richtig und das CSS-Gate `.entrance-anim` falsch – aus
   * zwei Gründen:
   *
   * 1. Zeitpunkt. `.entrance-anim` gibt es nur, weil `useReducedMotionSafe` im
   *    ERSTEN Render bewusst `false` liefert (Hydration-Regel) und Framer
   *    Mount-Animationen genau dann dispatcht – der echte Wert kommt einen Tick
   *    zu spät. Dieses Menü animiert aber erst auf Klick, also viele Frames
   *    nach dem Mount. Da steht der echte Wert längst bereit.
   *
   * 2. Endzustand. `.entrance-anim` erzwingt `transform: none; opacity: 1` –
   *    das ist der Endzustand einer Entrance-Animation. Der Endzustand hier ist
   *    `height: auto`, ein berechneter Layout-Wert. Ein `height: auto !important`
   *    würde das Zuklappen mit zerstören (Framer schreibt beim Schließen inline
   *    `height: 0px`), und `transition: none` griffe ohnehin ins Leere, weil
   *    Framer nicht über CSS-Transitions animiert, sondern den Inline-Style pro
   *    Frame neu schreibt.
   *
   * Deshalb bleibt die Animation strukturell wie sie ist (0 → auto, damit
   * Auf-/Zuklappen und `AnimatePresence`-Unmount weiter funktionieren) und nur
   * die DAUER fällt auf 0: das Menü erscheint und verschwindet schlagartig,
   * ohne Bewegung.
   */
  const reduceMotion = useReducedMotionSafe()

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="entrance-anim sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md"
    >
      <nav
        aria-label="Hauptnavigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo-Platzhalter "LL" */}
        <Link
          href="/"
          /* WCAG 2.5.3 „Label in Name": der SICHTBARE Text muss im
             zugänglichen Namen VORKOMMEN, nicht von ihm ersetzt werden. Bis
             zum 28.08.2026 stand hier nur „Leon Lang – Startseite" – der
             Screenreader las den Namen, aber Sprachsteuerung fand den Link
             nicht: „Klick LL" traf ins Leere, weil „LL" im Namen fehlte.
             Jetzt steht das Kürzel vorn, der Rest erklärt es. */
          aria-label={`${site.logoText} – Startseite von ${site.name}`}
          /* Tap-Fläche (TODO 2, 01.09.2026): die sichtbare Kachel ist 38 px hoch;
             ab der Desktop-Leiste legt eine unsichtbare Pseudo-Ebene 4 px rundum
             dazu → ≥ 44 × 44. Optik, Rand und Fokusring bleiben auf der Kachel.
             Mobil bewusst unangetastet (dort nachgemessen und freigegeben). */
          className="relative inline-flex items-center rounded-md border border-border px-2.5 py-1 text-lg font-semibold tracking-tight text-foreground transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:before:absolute md:before:-inset-1 md:before:content-['']"
        >
          {site.logoText}
        </Link>

        {/* Desktop-Navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                /* Tap-Fläche (TODO 2): der Textlink ist ~18 px hoch. Eine
                   unsichtbare Pseudo-Ebene ergänzt 14 px oben und unten → ~46 px,
                   ohne die Leiste auseinanderzuziehen (kein Innenabstand, keine
                   größere Schrift). Seitlich nichts: die Wörter sind breit genug,
                   und der Zwischenraum zum Nachbarn bleibt frei. */
                className="relative rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background before:absolute before:inset-x-0 before:-inset-y-3.5 before:content-['']"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Aktionen: CTA + Mobile-Menü-Button (kein Theme-Toggle mehr – Dark-only) */}
        <div className="flex items-center gap-3">
          <a
            href={ctaItem.href}
            /* Tap-Fläche (TODO 2): die Pille ist 36 px hoch; sobald sie sichtbar
               ist, legt eine unsichtbare Pseudo-Ebene 4 px oben/unten dazu → 44 px.
               Die Pille selbst bleibt, wie sie ist (Navbar-CTAs bleiben ruhig). */
            className="relative hidden rounded-full cta-gradient px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:inline-flex sm:before:absolute sm:before:inset-x-0 sm:before:-inset-y-1 sm:before:content-['']"
          >
            {ctaItem.label}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={open}
            /* h-11 w-11 = 44x44 px – Mindestgröße für eine Tap-Fläche. Vorher
               h-9 w-9 (36 px). Passt weiterhin in die 64 px hohe Leiste. */
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
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
            transition={reduceMotion ? { duration: 0 } : { duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    /* py-3 statt py-2: 12 + 20 (text-sm) + 12 = 44 px Tap-Fläche.
                       Vorher 36 px – über dem WCAG-2.2-AA-Minimum von 24 px,
                       aber unter den 44 px, die die Demo-Seiten erreichen. Diese
                       Seite ist das Portfolio-Stück und darf nicht schlechter sein. */
                    className="block rounded-md px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={ctaItem.href}
                  onClick={() => setOpen(false)}
                  /* py-3 wie die Links darüber → 44 px. */
                  className="block rounded-full cta-gradient px-4 py-3 text-center text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
