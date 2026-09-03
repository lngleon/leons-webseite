'use client'

import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { cardClassName } from '@/components/Card'
import SectionHeading from '@/components/SectionHeading'
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe'
import { projects, projectsIntro, musterIntro } from '@/data/projects'
import type { DemoPreview } from '@/data/demos'

/**
 * Projekte – das komplette Schaufenster der Startseite: oben die zwei
 * Live-Projekte als große Karten, darunter die drei Musterseiten als
 * Dreierreihe. Jede Karte trägt ihre Branche als Akzent-Eyebrow und ein
 * Badge („Live im Netz" / „Musterseite") auf dem Screenshot – ehrlich
 * getrennt, was echter Kunde ist und was Können-Beweis.
 *
 * **Die Musterseiten kommen als Prop (`muster`) herein**, nicht per Import:
 * `src/data/demos.ts` darf nur aus Server-Komponenten importiert werden (zieht
 * die vollen Betriebs-Objekte). `page.tsx` lädt `demoPreviews` auf dem Server
 * und reicht NUR die kleinen Preview-Objekte hierher – ins Bundle wandert
 * nichts Großes. Der Typ-Import oben ist reiner Typ, kein Laufzeit-Code.
 *
 * **Die ganze Karte ist der Link** (Muster von `DemoShowcase` auf
 * `/moeglichkeiten`): ein `<a>` mit `cardClassName` um Bild, Branche, Name –
 * die Fläche IST das Angebot, gleiche Hover-Sprache wie jede andere Karte.
 * Live-Karten öffnen extern in neuem Tab (sr-only-Hinweis IM Namen, kein
 * aria-label – WCAG 2.5.3: der sichtbare Text bleibt Teil des Namens);
 * Musterseiten gehen intern zu `/demo/*` im selben Tab (Rückweg existiert).
 *
 * SSR-/reduced-motion-sicher: statische Bilder via next/image (intrinsische
 * width/height → kein CLS), Reveal über `useReducedMotionSafe`-gegatete
 * Varianten, Screenshot-Zoom nur `motion-safe` + `group-hover` (touch-sicher,
 * Tailwind koppelt hover an echte Zeiger). Server-Frame = erstes Client-Frame.
 */

/** Badge auf dem Screenshot – oben rechts, über Tokens, kein Hex. */
function ImageBadge({ live, children }: { live?: boolean; children: string }) {
  return (
    <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur">
      {live && <span className="h-1.5 w-1.5 rounded-full bg-accent-warm" aria-hidden="true" />}
      {children}
    </span>
  )
}

type ProjekteProps = {
  /** Die drei Musterseiten – vom Server aus `demoPreviews` hineingereicht. */
  muster: DemoPreview[]
}

export default function Projekte({ muster }: ProjekteProps) {
  const reduce = useReducedMotionSafe()

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  }
  const card: Variants = reduce
    ? {
        hidden: { opacity: 1, y: 0, transition: { duration: 0 } },
        show: { opacity: 1, y: 0, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }

  // outline-hidden statt outline-none (Tailwind v4): im Forced-Colors-Modus
  // (Windows-Kontrast) entfernt der Browser box-shadows – der Ring wäre weg,
  // ein hartes outline:none ließe den Tastatur-Fokus dort unsichtbar.
  const linkClassName =
    `${cardClassName} flex w-full flex-col overflow-hidden ` +
    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring ' +
    'focus-visible:ring-offset-2 focus-visible:ring-offset-background'

  return (
    <section id="projekte" className="section-glow py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduce ? 0 : 0.5, ease: 'easeOut' }}
        >
          <SectionHeading number="04"
            eyebrow={projectsIntro.eyebrow}
            title={projectsIntro.title}
            description={projectsIntro.subline}
          />
        </motion.div>

        {/* ── Live-Projekte: zwei große Karten ─────────────────────── */}
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          // role explizit wie in Hero: Safari/Tailwind-Preflight entfernen bei
          // list-style:none die Listen-Semantik aus dem a11y-Baum.
          role="list"
          className="mt-14 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2 lg:gap-8"
        >
          {projects.map((project) => (
            <motion.li key={project.name} variants={card} role="listitem" className="flex">
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                {/* Vorschaubild: voll-bleed oben (negative Margins heben das
                    Card-Padding auf), an den abgerundeten Card-Ecken geclippt.
                    aspect-Box → kein Layout-Shift. `relative` fürs Badge. */}
                <div className="relative -mx-6 -mt-6 mb-6 aspect-[21/10] overflow-hidden bg-muted sm:-mx-7 sm:-mt-7">
                  {/* alt="": das Bild liegt IM Link, dessen sichtbarer Text
                      (Branche, Name, Art, CTA) das Ziel vollständig beschreibt
                      – ein alt würde den Namen doppelt vorlesen (WAI H2).
                      Zoom-Dauer 200ms wie der Card-Hover (ein Endzeitpunkt). */}
                  <Image
                    src={project.image}
                    alt=""
                    width={project.width}
                    height={project.height}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="h-full w-full object-cover transition-transform duration-200 ease-out motion-safe:group-hover:scale-[1.03]"
                  />
                  <ImageBadge live>Live im Netz</ImageBadge>
                </div>

                <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                  {project.branche}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground sm:text-xl">
                  {project.name}
                </h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.art}
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  zur Website
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="sr-only"> (öffnet in neuem Tab)</span>
              </a>
            </motion.li>
          ))}
        </motion.ul>

        {/* ── Musterseiten: Zwischenkopf + Dreierreihe ─────────────── */}
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduce ? 0 : 0.5, ease: 'easeOut' }}
          className="mt-20 flex flex-col items-center gap-3 text-center"
        >
          <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {musterIntro.title}
          </h3>
          <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            {musterIntro.subline}
          </p>
        </motion.div>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          role="list"
          className="mt-10 grid list-none grid-cols-1 gap-5 p-0 lg:grid-cols-2"
        >
          {muster.map((demo) => (
            <motion.li key={demo.slug} variants={card} role="listitem" className="flex">
              <a href={demo.href} className={linkClassName}>
                <div className="relative -mx-6 -mt-6 mb-6 aspect-[8/5] overflow-hidden bg-muted sm:-mx-7 sm:-mt-7">
                  <Image
                    src={demo.image}
                    alt=""
                    width={demo.width}
                    height={demo.height}
                    // Seit der vierten Musterseite (03.09.2026) 2×2 statt
                    // Dreierreihe – vier Karten in drei Spalten hiessen eine
                    // verwaiste vierte. Zwei Spalten ab lg ≈ 532 px je Bild
                    // ((1084 − 20) / 2 aus der bisherigen 348er-Messung).
                    sizes="(min-width: 1024px) 532px, (min-width: 640px) calc(100vw - 50px), calc(100vw - 34px)"
                    className="h-full w-full object-cover object-top transition-transform duration-200 ease-out motion-safe:group-hover:scale-[1.03]"
                  />
                  <ImageBadge>Musterseite</ImageBadge>
                </div>

                <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                  {demo.kind}
                </p>
                {/* h4, nicht h3: die Karten gehören ZUM Zwischenkopf (h3)
                    „Und vier komplette Musterbetriebe." – als h3 wären sie im
                    Outline dessen Geschwister statt untergeordnet (1.3.1). */}
                <h4 className="mt-2 text-lg font-semibold text-foreground sm:text-xl">
                  {demo.name}
                </h4>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {demo.tagline}
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  Musterseite ansehen
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
