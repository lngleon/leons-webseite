import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Card from '@/components/Card'
import SectionHeading from '@/components/SectionHeading'
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe'
import { projects, projectsIntro } from '@/data/projects'

/**
 * Projekte – zwei große Showcase-Karten nebeneinander (mobil gestapelt).
 * BEWUSST KEINE Tabs, KEINE Detail-Ansicht/Overlay (geparkt). Pro Karte: ein
 * statisches Vorschaubild (oben, voll-bleed + abgerundet via Card-Clip) + Name
 * + Typzeile + Link „zur Website". Card/SectionHeading wiederverwendet.
 *
 * SSR-/reduced-motion-sicher: statische `<img>` (im prerenderten HTML), Reveal
 * über `useReducedMotionSafe`-gegatete Varianten (reduced → sofort sichtbar,
 * kein y/Stagger). Server-Frame = erstes Client-Frame.
 */
export default function Projekte() {
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

  return (
    <section id="projekte" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduce ? 0 : 0.5, ease: 'easeOut' }}
        >
          <SectionHeading
            eyebrow={projectsIntro.eyebrow}
            title={projectsIntro.title}
            description={projectsIntro.subline}
          />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-8"
        >
          {projects.map((project) => (
            <motion.article key={project.name} variants={card} className="h-full">
              <Card className="flex h-full flex-col overflow-hidden">
                {/* Vorschaubild: voll-bleed oben (negative Margins heben das
                    Card-Padding auf), an den abgerundeten Card-Ecken geclippt
                    (overflow-hidden der Card). aspect-Box → kein Layout-Shift. */}
                <div className="-mx-6 -mt-6 mb-6 aspect-[21/10] overflow-hidden bg-muted sm:-mx-7 sm:-mt-7">
                  <img
                    src={project.image}
                    alt={`Vorschau von ${project.name}`}
                    width={project.width}
                    height={project.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>

                <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                  {project.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {project.type}
                </p>

                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`zur Website von ${project.name} (öffnet in neuem Tab)`}
                  className="mt-5 inline-flex items-center gap-1.5 self-start rounded-md text-sm font-medium text-accent transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  zur Website
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </Card>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
