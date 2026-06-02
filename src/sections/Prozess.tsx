import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import SectionHeading from '@/components/SectionHeading'
import { processIntro, processSteps } from '@/data/process'

export default function Prozess() {
  const reduce = useReducedMotion()

  // Bewusst useInView + animate statt whileInView: Die Stagger-/Linien-
  // Orchestrierung läuft über zwei Verschachtelungsebenen (ol → li → Linien).
  // Die whileInView-Geste propagiert diesen tiefen Variant-Baum NICHT zuverlässig,
  // wenn die Sektion beim Laden bereits im Viewport liegt (Reload an dieser
  // Scroll-Position) – dann blieben Schritte und Linie stehen. Ein per State
  // gesteuertes `animate` propagiert die Varianten dagegen verlässlich.
  const stepsRef = useRef<HTMLOListElement>(null)
  const stepsInView = useInView(stepsRef, { once: true, amount: 0.2 })

  // Reduced-motion: keine Bewegung/kein Aufbau – alles direkt im Endzustand.
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.18 } },
  }
  const step: Variants = reduce
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }
  // Verbindungslinie baut sich auf: vertikal (mobil) bzw. horizontal (Desktop).
  const lineVertical: Variants = reduce
    ? { hidden: { scaleY: 1 }, show: { scaleY: 1 } }
    : {
        hidden: { scaleY: 0 },
        show: { scaleY: 1, transition: { duration: 0.4, ease: 'easeOut', delay: 0.15 } },
      }
  const lineHorizontal: Variants = reduce
    ? { hidden: { scaleX: 1 }, show: { scaleX: 1 } }
    : {
        hidden: { scaleX: 0 },
        show: { scaleX: 1, transition: { duration: 0.4, ease: 'easeOut', delay: 0.15 } },
      }

  return (
    <section id="prozess" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduce ? 0 : 0.5, ease: 'easeOut' }}
        >
          <SectionHeading
            eyebrow={processIntro.eyebrow}
            title={processIntro.title}
            description={processIntro.subline}
          />
        </motion.div>

        <motion.ol
          ref={stepsRef}
          variants={container}
          initial="hidden"
          animate={stepsInView ? 'show' : 'hidden'}
          className="relative mt-14 flex flex-col md:flex-row"
        >
          {processSteps.map((item, index) => {
            const isLast = index === processSteps.length - 1
            return (
              <motion.li
                key={item.title}
                variants={step}
                className="relative flex gap-x-5 md:flex-1 md:flex-col md:items-center md:gap-x-0"
              >
                {/* Nummer-Badge + Verbindungslinie */}
                <div className="relative flex flex-col items-center md:w-full">
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-background text-lg font-semibold text-accent">
                    {index + 1}
                  </span>

                  {!isLast && (
                    <>
                      {/* Mobil: vertikale Linie unter dem Badge */}
                      <motion.span
                        aria-hidden="true"
                        variants={lineVertical}
                        className="mt-2 w-0.5 flex-1 origin-top rounded-full bg-accent/30 md:hidden"
                      />
                      {/* Desktop: horizontale Linie zum nächsten Badge */}
                      <motion.span
                        aria-hidden="true"
                        variants={lineHorizontal}
                        className="absolute left-1/2 top-6 hidden h-0.5 w-full -translate-y-1/2 origin-left rounded-full bg-accent/30 md:block"
                      />
                    </>
                  )}
                </div>

                {/* Inhalt */}
                <div
                  className={`md:w-full md:px-4 md:pt-5 md:text-center ${
                    isLast ? '' : 'pb-12 md:pb-0'
                  }`}
                >
                  <h3 className="text-base font-semibold text-foreground sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </motion.li>
            )
          })}
        </motion.ol>
      </div>
    </section>
  )
}
