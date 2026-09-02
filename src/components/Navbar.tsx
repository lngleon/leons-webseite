'use client'

import { useState } from 'react'
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
        {/* Wortmarke "Leon Lang" (02.09.2026, User-Wunsch): Monogramm-Kachel
            plus voller Name in der Display-Schrift, "Lang" im warmen Verlauf.
            Als ANKER auf /#start statt Link auf "/": so landet der Klick von
            jeder Stelle wieder oben beim Hero (auf Unterseiten erst zur
            Startseite, dort an der Sprungmarke; smooth laut globals.css,
            hart bei reduced-motion). Sichtbarer Text = zugaenglicher Name
            (WCAG 2.5.3, "Klick Leon Lang" trifft). */}
        <a
          href="/#start"
          /* Tap-Flaeche (TODO 2): sichtbar ~38 px hoch; ab der Desktop-Leiste
             legt die unsichtbare Pseudo-Ebene 4 px rundum dazu (>= 44 px). */
          className="group relative inline-flex items-center gap-2.5 rounded-kante focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:before:absolute md:before:-inset-1 md:before:content-['']"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-kante border border-border-stark bg-muted font-display text-sm font-semibold text-foreground transition-colors duration-200 group-hover:border-accent"
          >
            {site.logoText}
          </span>
          <span className="font-display text-lg font-semibold leading-none tracking-tight text-foreground">
            Leon <span className="warm-gradient-text">Lang</span>
          </span>
          <span className="sr-only"> – nach oben zur Startseite</span>
        </a>

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
                className="relative rounded-kante text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background before:absolute before:inset-x-0 before:-inset-y-3.5 before:content-['']"
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
            className="btn-primaer btn-primaer-kompakt relative hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:inline-flex sm:before:absolute sm:before:inset-x-0 sm:before:-inset-y-1 sm:before:content-['']"
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-kante border border-border text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
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
                    className="block rounded-kante px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
                  className="btn-primaer w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
