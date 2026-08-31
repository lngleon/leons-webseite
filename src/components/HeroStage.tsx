'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowUpRight, Lock } from 'lucide-react'
import { CardBody, CardContainer, CardItem } from '@/components/ui/Tilt'
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe'

/**
 * Die Showcase-Bühne im Hero: ein FIKTIVES, komplett in Code gezeichnetes
 * Interface (Browser-Rahmen, Sidebar, Kennzahlen, Balkendiagramm, Listen) –
 * bewusst kein echter Screenshot (Entscheidung des Users, 31.08.2026: „nimm
 * da sowas Fiktives, aber man kann drauf klicken und kommt dann auf die
 * wirklich gebauten"). Die ganze Bühne ist ein Link zur Projekte-Sektion.
 *
 * Warum gezeichnet statt fotografiert: es zeigt ein Können-Versprechen,
 * nicht ein bestimmtes Projekt – und es kostet null Bytes Bild. Der LCP
 * bleibt damit die H1 (farbige Blöcke ohne Text/Bild sind keine LCP-
 * Kandidaten), die Bühne darf deshalb wieder ganz normal einfaden.
 *
 * Farben ausschließlich über Tokens: Akzent (`--accent`/`--accent-solid`)
 * für Pillen und Balken, `foreground`/`border`/`background` mit Alpha für
 * die Platzhalter-Zeilen. Kein Teal, kein zweiter Akzent – die Referenz-
 * Skizze war grün, die Seite hat EINE Akzentfarbe.
 *
 * Bewegung nach der Disziplin der `ServiceDiagram`-Schaubilder: EINMAL beim
 * Sichtbarwerden (Balken wachsen, Kacheln blenden gestaffelt ein), danach
 * statisches End-Frame, keine Dauerschleife. `useInView` + gesteuertes
 * `animate` (nicht `whileInView`), Server-Frame = erstes Client-Frame
 * (Ruhezustand), reduced-motion zeigt über `.entrance-anim` sofort das
 * End-Frame. Der Tilt zur Maus kommt vom bestehenden `CardContainer`.
 *
 * Perspektive: außen ein STATISCHER Kipp (ab lg, `rotateY(-8deg)`: die
 * rechte Kante rückt näher, die Fläche dreht sich zur Headline hin – die
 * Referenz-Skizze kippte spiegelbildlich, hier steht die Bühne aber rechts
 * vom Text und soll sich ihm zuwenden), innen der dynamische Tilt – zwei
 * getrennte Elemente, damit sich die Transforms nicht überschreiben.
 */

/** Balkenhöhen in Prozent der Diagrammfläche – fiktiv, bewusst ohne Achsen. */
const BARS = [38, 62, 55, 84, 42, 72, 60, 50, 80]
const ease = [0.22, 1, 0.36, 1] as const

export default function HeroStage() {
  const reduce = useReducedMotionSafe()
  const bodyRef = useRef<HTMLDivElement>(null)
  const inView = useInView(bodyRef, { once: true, amount: 0.3 })
  const play = reduce || inView

  const container: Variants = {
    rest: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } },
  }
  const fade: Variants = {
    rest: { opacity: 0, y: 6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
  }
  const bar: Variants = {
    rest: { scaleY: 0 },
    show: { scaleY: 1, transition: { duration: 0.7, ease } },
  }

  return (
    <div className="lg:[perspective:1400px]">
      <div className="lg:[transform:rotateY(-8deg)_rotateX(3deg)]">
        <CardContainer containerClassName="w-full" className="w-full">
          <CardBody className="relative w-full pt-5 pb-4">
            {/* Zwei tonige Karten dahinter – reine Tiefe. Rotation auf einem
                INNEREN Div, weil `CardItem` sein translateZ als Inline-
                Transform schreibt. Insets größer als der Rotations-Überhang
                → kein x-Überlauf bei 320 px. */}
            <CardItem translateZ={-30} className="pointer-events-none absolute inset-x-[5%] top-0">
              <div
                aria-hidden="true"
                className="aspect-[16/10] rotate-[3deg] rounded-2xl border border-border/60 bg-card/70"
              />
            </CardItem>
            <CardItem translateZ={-15} className="pointer-events-none absolute inset-x-[3%] top-2.5">
              <div
                aria-hidden="true"
                className="aspect-[16/10] -rotate-[1.5deg] rounded-2xl border border-border/70 bg-card/80"
              />
            </CardItem>

            <CardItem translateZ={40} className="relative">
              <a
                href="/#projekte"
                // `transition` (nicht `transition-[box-shadow,transform]`): Tailwind v4
                // setzt -translate-y als eigene CSS-Eigenschaft `translate`, und
                // hover:border-* braucht border-color in der Liste – sonst springen
                // Lift und Rand, während nur der Schatten gleitet.
                className="group/stage relative block overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-accent/15 transition duration-300 ease-out hover:border-accent/50 hover:shadow-accent/30 motion-safe:hover:-translate-y-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {/* Browser-Kopfzeile – Kulisse, daher aria-hidden. Dummy-
                    Domain wie im Terminal (`deine-seite.de`), kein echter Host. */}
                <div
                  aria-hidden="true"
                  className="flex items-center gap-3 border-b border-border bg-muted/60 px-4 py-2.5"
                >
                  <span className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                  </span>
                  <span className="mx-auto flex h-6 items-center gap-1.5 rounded-md bg-background/60 px-3 font-mono text-[11px] text-muted-foreground">
                    <Lock className="h-3 w-3 text-accent" />
                    deine-seite.de
                  </span>
                  <span className="w-9" />
                </div>

                {/* Fiktives Dashboard: festes 16∶10, alles Platzhalter-Blöcke. */}
                <div
                  ref={bodyRef}
                  aria-hidden="true"
                  className="relative aspect-[16/10]"
                  style={{
                    background:
                      'radial-gradient(90% 70% at 30% 0%, color-mix(in oklab, var(--accent) 14%, transparent), transparent 70%)',
                  }}
                >
                  <motion.div
                    variants={container}
                    initial="rest"
                    animate={play ? 'show' : 'rest'}
                    className="absolute inset-0 grid grid-cols-[22%_1fr] gap-2.5 p-2.5 sm:gap-3.5 sm:p-3.5"
                  >
                    {/* Sidebar */}
                    <div className="flex flex-col gap-2 rounded-xl bg-background/40 p-2.5 sm:gap-2.5 sm:p-3">
                      <motion.span
                        variants={fade}
                        className="entrance-anim h-2.5 w-9 rounded-full bg-accent-solid"
                      />
                      {[78, 90, 66, 84, 72, 60].map((w, i) => (
                        <motion.span
                          key={i}
                          variants={fade}
                          className="entrance-anim h-1.5 rounded-full bg-foreground/10"
                          style={{ width: `${w}%` }}
                        />
                      ))}
                      <span className="mt-auto h-1.5 w-3/4 rounded-full bg-foreground/10" />
                    </div>

                    {/* Hauptfläche */}
                    <div className="flex min-h-0 flex-col gap-2 sm:gap-2.5">
                      <motion.span
                        variants={fade}
                        className="entrance-anim h-2.5 w-2/5 rounded-full bg-foreground/20 sm:h-3"
                      />

                      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            variants={fade}
                            className="entrance-anim flex flex-col items-center gap-1.5 rounded-lg border border-border/60 bg-background/40 p-2 sm:p-2.5"
                          >
                            <span className="h-2 w-8 rounded-full bg-accent" />
                            <span className="h-1.5 w-full rounded-full bg-foreground/10" />
                          </motion.div>
                        ))}
                      </div>

                      <div className="grid min-h-0 flex-1 grid-cols-[1fr_36%] gap-2 sm:gap-2.5">
                        {/* Balkendiagramm – die Balken wachsen einmal von unten */}
                        <motion.div
                          variants={fade}
                          className="entrance-anim flex min-h-0 items-end gap-[5%] rounded-lg border border-border/60 bg-background/40 px-2.5 pb-2.5 pt-3 sm:px-3 sm:pb-3 sm:pt-4"
                        >
                          {BARS.map((h, i) => (
                            <motion.span
                              key={i}
                              variants={bar}
                              style={{ height: `${h}%` }}
                              className="entrance-anim w-full origin-bottom rounded-t-sm bg-accent-solid"
                            />
                          ))}
                        </motion.div>

                        {/* Liste rechts – Einträge nach Platz: die Zeile hat bei 320 px
                            ~63 px, bei 400 px ~112 px, ab sm ≥ 200 px; ein Eintrag
                            misst 26 px + 6 px Lücke. Also 2 / 3 / 4 Einträge (im
                            Browser bei 320 nachgemessen: drei liefen 17 px in die
                            Fußreihe). overflow-hidden als zweite Sicherung. */}
                        <div className="flex min-h-0 flex-col justify-between gap-1.5 overflow-hidden sm:gap-2">
                          {[0, 1, 2, 3].map((i) => (
                            <motion.div
                              key={i}
                              variants={fade}
                              className={`entrance-anim ${
                                i === 3 ? 'hidden sm:flex' : i === 2 ? 'hidden min-[400px]:flex' : 'flex'
                              } items-center gap-2 rounded-lg border border-border/60 bg-background/40 p-1.5 sm:p-2`}
                            >
                              <span className="h-3 w-3 shrink-0 rounded bg-accent/40" />
                              <span className="h-1.5 w-full rounded-full bg-foreground/10" />
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Fußreihe: zwei Kacheln, die dritte Zelle bleibt frei –
                          dort sitzt die „Echte Projekte ansehen"-Pille, statt
                          eine Kachel zu überdecken. */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                        {[0, 1].map((i) => (
                          <motion.div
                            key={i}
                            variants={fade}
                            className="entrance-anim flex items-center gap-2 rounded-lg border border-border/60 bg-background/40 p-1.5 sm:p-2"
                          >
                            <span className="h-2.5 w-5 shrink-0 rounded bg-accent-solid" />
                            <span className="h-1.5 w-full rounded-full bg-foreground/10" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Der einzige Text im Link = sein zugänglicher Name. Außerhalb
                    der aria-hidden-Kulisse, immer sichtbar (auch mobil). */}
                <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur transition-colors duration-200 group-hover/stage:border-accent/60 group-hover/stage:text-accent sm:bottom-4 sm:right-4 sm:px-3 sm:py-1.5 sm:text-xs">
                  Echte Projekte ansehen
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </a>
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  )
}
