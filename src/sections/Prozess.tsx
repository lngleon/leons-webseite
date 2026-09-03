'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe'
import SectionHeading from '@/components/SectionHeading'
import { withCodeTags } from '@/components/CodeTag'
import { processIntro, processSteps } from '@/data/process'

export default function Prozess() {
  const reduce = useReducedMotionSafe()

  // Bewusst useInView + animate statt whileInView: Die Stagger-/Linien-
  // Orchestrierung läuft über zwei Verschachtelungsebenen (ol → li → Linien).
  // Die whileInView-Geste propagiert diesen tiefen Variant-Baum NICHT zuverlässig,
  // wenn die Sektion beim Laden bereits im Viewport liegt (Reload an dieser
  // Scroll-Position) – dann blieben Schritte und Linie stehen. Ein per State
  // gesteuertes `animate` propagiert die Varianten dagegen verlässlich.
  const stepsRef = useRef<HTMLOListElement>(null)
  const stepsInView = useInView(stepsRef, { once: true, amount: 0.2 })

  /* Choreografie (02.09.2026, User-Wunsch "mehr Pepp an der richtigen
     Stelle"): die Animation erzaehlt die REIHENFOLGE. Pro Schritt ein Takt
     (STEP s): Badge ploppt per Spring auf, ein Ping-Ring laeuft einmal aus,
     die Linie zeichnet sich zum naechsten Badge, das genau dann aufploppt,
     wenn die Linie ankommt. Inhalte faden je Schritt kurz danach ein.
     Kein Loop, alles einmalig (once) - "subtil und edel, nie verspielt".
     custom={index} am <li> reicht: Framer reicht custom an die Varianten-
     Funktionen aller Kinder weiter. Reduced-motion: alles statisch. */
  const STEP = 0.5

  const stepItem: Variants = { hidden: {}, show: {} }

  const badge: Variants = reduce
    ? {
        hidden: { opacity: 1, scale: 1, transition: { duration: 0 } },
        show: { opacity: 1, scale: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, scale: 0.5 },
        show: (i: number) => ({
          opacity: 1,
          scale: 1,
          transition: { delay: i * STEP, type: 'spring', stiffness: 320, damping: 20 },
        }),
      }

  // Einmaliger Ping-Ring um das gerade gelandete Badge (dekorativ).
  const ping: Variants = reduce
    ? {
        hidden: { opacity: 0, transition: { duration: 0 } },
        show: { opacity: 0, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, scale: 1 },
        show: (i: number) => ({
          opacity: [0, 0.5, 0],
          scale: [1, 1.9, 1.9],
          transition: { delay: i * STEP + 0.15, duration: 0.7, ease: 'easeOut', times: [0, 0.25, 1] },
        }),
      }

  // Verbindungslinie zeichnet sich, NACHDEM das Badge steht, und kommt genau
  // dann beim naechsten Badge an, wenn dessen Takt beginnt.
  const lineVertical: Variants = reduce
    ? {
        hidden: { scaleY: 1, transition: { duration: 0 } },
        show: { scaleY: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { scaleY: 0 },
        show: (i: number) => ({
          scaleY: 1,
          transition: { delay: i * STEP + 0.2, duration: STEP - 0.15, ease: 'easeInOut' },
        }),
      }
  const lineHorizontal: Variants = reduce
    ? {
        hidden: { scaleX: 1, transition: { duration: 0 } },
        show: { scaleX: 1, transition: { duration: 0 } },
      }
    : {
        hidden: { scaleX: 0 },
        show: (i: number) => ({
          scaleX: 1,
          transition: { delay: i * STEP + 0.2, duration: STEP - 0.15, ease: 'easeInOut' },
        }),
      }

  const content: Variants = reduce
    ? {
        hidden: { opacity: 1, y: 0, transition: { duration: 0 } },
        show: { opacity: 1, y: 0, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 14 },
        show: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: { delay: i * STEP + 0.2, duration: 0.45, ease: 'easeOut' },
        }),
      }

  return (
    <section id="prozess" className="section-band py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduce ? 0 : 0.5, ease: 'easeOut' }}
        >
          <SectionHeading number="05"
            eyebrow={processIntro.eyebrow}
            title={processIntro.title}
            description={processIntro.subline}
          />
        </motion.div>

        <motion.ol
          ref={stepsRef}
          initial="hidden"
          animate={stepsInView ? 'show' : 'hidden'}
          className="relative mt-14 flex flex-col md:flex-row"
        >
          {processSteps.map((item, index) => {
            const isLast = index === processSteps.length - 1
            return (
              <motion.li
                key={item.title}
                variants={stepItem}
                custom={index}
                className="relative flex gap-x-5 md:flex-1 md:flex-col md:items-center md:gap-x-0"
              >
                {/* Nummer-Badge + Verbindungslinie */}
                <div className="relative flex flex-col items-center md:w-full">
                  {/* Der letzte Schritt (Launch) landet im WARMEN Akzent -
                      der Prozess kommt an. Davor bleibt alles violett. */}
                  <motion.span
                    variants={badge}
                    custom={index}
                    className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-background text-lg font-semibold ${
                      isLast
                        ? 'border-accent-warm/60 text-accent-warm'
                        : 'border-accent/50 text-accent'
                    }`}
                  >
                    {index + 1}
                    <motion.span
                      aria-hidden="true"
                      variants={ping}
                      custom={index}
                      className={`pointer-events-none absolute inset-0 rounded-full border ${
                        isLast ? 'border-accent-warm/70' : 'border-accent/60'
                      }`}
                    />
                  </motion.span>

                  {!isLast && (
                    <>
                      {/* Mobil: vertikale Linie unter dem Badge */}
                      <motion.span
                        aria-hidden="true"
                        variants={lineVertical}
                        custom={index}
                        className="mt-2 w-0.5 flex-1 origin-top rounded-full bg-linear-to-b from-accent/40 to-accent-warm/35 md:hidden"
                      />
                      {/* Desktop: horizontale Linie zum nächsten Badge */}
                      <motion.span
                        aria-hidden="true"
                        variants={lineHorizontal}
                        custom={index}
                        className="absolute left-1/2 top-6 hidden h-0.5 w-full -translate-y-1/2 origin-left rounded-full bg-linear-to-r from-accent/40 to-accent-warm/35 md:block"
                      />
                    </>
                  )}
                </div>

                {/* Inhalt */}
                <motion.div
                  variants={content}
                  custom={index}
                  className={`md:w-full md:px-4 md:pt-5 md:text-center ${
                    isLast ? '' : 'pb-12 md:pb-0'
                  }`}
                >
                  <h3 className="text-base font-semibold text-foreground sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {withCodeTags(item.text, item.tags ?? [])}
                  </p>
                </motion.div>
              </motion.li>
            )
          })}
        </motion.ol>
      </div>
    </section>
  )
}
