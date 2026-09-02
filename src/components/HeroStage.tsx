'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowUpRight, Lock, MousePointer2 } from 'lucide-react'
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe'

/**
 * Die Showcase-Bühne im Hero: ein FIKTIVES, komplett in Code gezeichnetes
 * Website-Layout im Browser-Rahmen (Navigation, großes Bild links, Text und
 * CTA rechts, vier Karten unten) – bewusst kein echter Screenshot
 * (Entscheidung des Users, 31.08.2026). Die ganze Bühne ist ein Link zur
 * Projekte-Sektion („Echte Projekte ansehen").
 *
 * **Lade-Sequenz (User-Wunsch: „es soll laden und dann so aussehen"):**
 * einmal beim Sichtbarwerden spielt die Bühne den Aufbau einer Seite nach –
 * Ladebalken im Browser-Kopf, dann Navigation, Bild (mit Kreis und Kachel),
 * Textzeilen, die von links aufwachsen, Button, Avatare, die vier Karten
 * rutschen nacheinander hoch; zum Schluss gleitet ein Mauszeiger auf die
 * dritte Karte, sie hebt sich und bekommt einen Akzent-Rand. Danach steht
 * das fertige Bild, keine Dauerschleife (Disziplin der `ServiceDiagram`-
 * Schaubilder). Jedes Element hat eigene `rest`/`show`-Varianten mit
 * festem `delay`; der Container schaltet über `useInView` + gesteuertes
 * `animate` (nicht `whileInView`), Server-Frame = erstes Client-Frame
 * (Ruhezustand). reduced-motion zeigt über `.entrance-anim` sofort das
 * End-Frame; der Ladebalken (dessen Ende „unsichtbar" ist) wird dort gar
 * nicht erst gerendert.
 *
 * Farben ausschließlich über Tokens: Akzent für Pillen und Formen, der
 * große Mock-CTA trägt `--accent-gradient-strong` – das ist die Füllung
 * eines dargestellten Primär-CTAs, genau der Zweck dieses Tokens. Kein
 * Teal/Blau wie in den Referenz-Skizzen – die Seite hat EINE Akzentfarbe.
 *
 * **Maus-Verfolgung:** in Ruhe plan nach vorne; die Bühne dreht sich zur
 * Cursor-Position im GANZEN Sichtfeld hin (±12° Y / ±9° X, gefedert),
 * federt zurück, wenn die Maus das Fenster verlässt. Nur bei echtem Zeiger,
 * nicht unter reduced-motion, nie auf Touch. Listener im Effekt am
 * `window`, Motion-Values starten bei 0. Drei Ebenen mit festem
 * `translateZ` unter `preserve-3d` geben der Drehung Parallaxe.
 */

const MAX_ROT_Y = 12
const MAX_ROT_X = 9
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
const ease = [0.22, 1, 0.36, 1] as const

/** Kleine Varianten-Fabriken – jedes Element mit eigener Verzögerung. */
const pop = (delay: number): Variants => ({
  rest: { opacity: 0, scale: 0.7 },
  show: { opacity: 1, scale: 1, transition: { delay, duration: 0.45, ease } },
})
const fadeUp = (delay: number): Variants => ({
  rest: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { delay, duration: 0.5, ease } },
})
const grow = (delay: number): Variants => ({
  rest: { opacity: 0, scaleX: 0 },
  show: { opacity: 1, scaleX: 1, transition: { delay, duration: 0.5, ease } },
})

export default function HeroStage() {
  const reduce = useReducedMotionSafe()
  const bodyRef = useRef<HTMLDivElement>(null)
  const inView = useInView(bodyRef, { once: true, amount: 0.3 })
  const play = reduce || inView

  // Zeitachse der Lade-Sequenz (Sekunden nach dem Sichtbarwerden).
  const T = {
    nav: 0.35,
    image: 0.75,
    text: 0.95,
    cta: 1.85,
    avatars: 2.0,
    cards: 1.7,
    cursor: 2.5,
    hover: 3.35,
  }

  const loadingBar: Variants = {
    rest: { scaleX: 0, opacity: 1 },
    show: {
      scaleX: [0, 0.55, 1, 1],
      opacity: [1, 1, 1, 0],
      transition: { duration: 1.15, times: [0, 0.45, 0.8, 1], ease: 'easeInOut' },
    },
  }
  const cursor: Variants = {
    rest: { opacity: 0, x: 110, y: 70 },
    show: {
      opacity: [0, 1, 1, 1],
      x: [110, 0, 0, 0],
      y: [70, 0, 0, 0],
      scale: [1, 1, 0.82, 1],
      transition: { delay: T.cursor, duration: 1.15, times: [0, 0.7, 0.85, 1], ease },
    },
  }
  const hoveredCard: Variants = {
    rest: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: [10, 0, 0, -3],
      transition: { delay: T.cards + 0.24, duration: 1.4, times: [0, 0.3, 0.8, 1], ease },
    },
  }
  const hoverRing: Variants = {
    rest: { opacity: 0 },
    show: { opacity: 1, transition: { delay: T.hover, duration: 0.3 } },
  }

  // Maus-Verfolgung: Rohwerte → Federn → Transform der Bühne.
  const stageRef = useRef<HTMLDivElement>(null)
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const springRotX = useSpring(rotX, { stiffness: 110, damping: 18, mass: 0.7 })
  const springRotY = useSpring(rotY, { stiffness: 110, damping: 18, mass: 0.7 })

  useEffect(() => {
    if (reduce) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const el = stageRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      if (r.bottom < -100 || r.top > window.innerHeight + 100) return
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = clamp((e.clientX - cx) / (window.innerWidth / 2), -1, 1)
      const dy = clamp((e.clientY - cy) / (window.innerHeight / 2), -1, 1)
      rotY.set(dx * MAX_ROT_Y)
      rotX.set(-dy * MAX_ROT_X)
    }
    const onLeave = () => {
      rotX.set(0)
      rotY.set(0)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [reduce, rotX, rotY])

  return (
    <div className="w-full [perspective:1200px]">
      <motion.div
        ref={stageRef}
        style={{ rotateX: springRotX, rotateY: springRotY, transformStyle: 'preserve-3d' }}
        className="relative w-full pt-5 pb-4"
      >
        {/* Zwei tonige Karten dahinter – reine Tiefe, mit festem translateZ. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[5%] top-0"
          style={{ transform: 'translateZ(-40px)' }}
        >
          <div className="aspect-[16/10] rotate-[3deg] rounded-kante border border-border/60 bg-card/70" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[3%] top-2.5"
          style={{ transform: 'translateZ(-20px)' }}
        >
          <div className="aspect-[16/10] -rotate-[1.5deg] rounded-kante border border-border/70 bg-card/80" />
        </div>

        <div className="relative" style={{ transform: 'translateZ(30px)' }}>
          <a
            href="/#projekte"
            className="group/stage relative block overflow-hidden rounded-kante border border-border-stark bg-card shadow-2 transition duration-300 ease-out hover:border-accent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {/* Browser-Kopfzeile – Kulisse, daher aria-hidden. Dummy-Domain wie
                im Terminal (`deine-seite.de`). Der Ladebalken liegt an ihrer
                Unterkante und ist Teil der Sequenz. */}
            <div
              aria-hidden="true"
              className="relative flex items-center gap-3 border-b border-border bg-muted/60 px-4 py-2.5"
            >
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-punkt bg-foreground/15" />
                <span className="h-2.5 w-2.5 rounded-punkt bg-foreground/15" />
                <span className="h-2.5 w-2.5 rounded-punkt bg-foreground/15" />
              </span>
              <span className="mx-auto flex h-6 items-center gap-1.5 rounded-kante bg-background/60 px-3 font-mono text-[11px] text-muted-foreground">
                <Lock className="h-3 w-3 text-accent" />
                deine-seite.de
              </span>
              <span className="w-9" />
              {!reduce && (
                <motion.span
                  variants={loadingBar}
                  initial="rest"
                  animate={play ? 'show' : 'rest'}
                  className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-accent"
                />
              )}
            </div>

            {/* Fiktive Seite: festes 16∶10, alles Platzhalter-Blöcke. */}
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
                initial="rest"
                animate={play ? 'show' : 'rest'}
                className="absolute inset-0 grid grid-rows-[auto_1fr_36%] gap-2 p-2.5 sm:gap-3 sm:p-3.5"
              >
                {/* Navigation: Logo-Pille links, drei Menüpunkte rechts */}
                <div className="flex items-center justify-between">
                  <motion.span
                    variants={pop(T.nav)}
                    className="entrance-anim h-2.5 w-12 origin-left rounded-kante bg-accent-solid sm:h-3 sm:w-16"
                  />
                  <span className="flex gap-2 sm:gap-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        variants={fadeUp(T.nav + 0.1 + i * 0.08)}
                        className="entrance-anim h-1.5 w-6 rounded-kante bg-foreground/15 sm:w-8"
                      />
                    ))}
                  </span>
                </div>

                {/* Hero der fiktiven Seite: Bild links, Text + CTA rechts */}
                <div className="grid min-h-0 grid-cols-[56%_1fr] gap-2 sm:gap-3">
                  <motion.div
                    variants={{
                      rest: { opacity: 0, scale: 0.96 },
                      show: { opacity: 1, scale: 1, transition: { delay: T.image, duration: 0.6, ease } },
                    }}
                    className="entrance-anim relative min-h-0 overflow-hidden rounded-kante border border-border/60 bg-background/40"
                    style={{
                      backgroundImage:
                        'radial-gradient(70% 80% at 65% 35%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 75%)',
                    }}
                  >
                    <motion.span
                      variants={pop(T.image + 0.35)}
                      className="entrance-anim absolute right-[7%] top-[10%] aspect-square h-[24%] rounded-punkt bg-accent/25"
                    />
                    <motion.span
                      variants={pop(T.image + 0.5)}
                      className="entrance-anim absolute bottom-[10%] left-[6%] aspect-square h-[30%] rounded-kante bg-accent/30"
                    />
                  </motion.div>

                  <div className="flex min-h-0 flex-col justify-center gap-1.5 sm:gap-2.5">
                    <motion.span
                      variants={grow(T.text)}
                      className="entrance-anim h-2.5 w-full origin-left rounded-kante bg-foreground/25 sm:h-3.5"
                    />
                    <motion.span
                      variants={grow(T.text + 0.12)}
                      className="entrance-anim h-1 w-4/5 origin-left rounded-kante bg-foreground/10 sm:h-1.5"
                    />
                    <motion.span
                      variants={grow(T.text + 0.24)}
                      className="entrance-anim h-2.5 w-1/3 origin-left rounded-kante bg-accent-solid sm:h-3.5"
                    />
                    <motion.span
                      variants={grow(T.text + 0.36)}
                      className="entrance-anim h-1 w-full origin-left rounded-kante bg-foreground/10 sm:h-1.5"
                    />
                    <motion.span
                      variants={grow(T.text + 0.48)}
                      className="entrance-anim h-1 w-3/4 origin-left rounded-kante bg-foreground/10 sm:h-1.5"
                    />
                    {/* Primär-CTA der fiktiven Seite – Gradient-Füllung wie ein echter CTA */}
                    <motion.span
                      variants={pop(T.cta)}
                      className="entrance-anim mt-0.5 h-4 w-1/2 origin-left rounded-kante sm:h-6"
                      style={{ background: 'var(--accent-solid)' }}
                    />
                    <span className="flex items-center gap-1.5">
                      <span className="flex -space-x-1">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            variants={pop(T.avatars + i * 0.1)}
                            className="entrance-anim h-2.5 w-2.5 rounded-punkt border border-card bg-accent/40 sm:h-3.5 sm:w-3.5"
                          />
                        ))}
                      </span>
                      <motion.span
                        variants={grow(T.avatars + 0.3)}
                        className="entrance-anim h-1 w-1/4 origin-left rounded-kante bg-foreground/10 sm:h-1.5"
                      />
                    </span>
                  </div>
                </div>

                {/* Vier Karten – rutschen nacheinander hoch; die dritte wird
                    am Ende vom Zeiger „angefahren" und hebt sich. */}
                <div className="grid min-h-0 grid-cols-4 gap-2 sm:gap-2.5">
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      variants={i === 2 ? hoveredCard : fadeUp(T.cards + i * 0.12)}
                      className="entrance-anim relative min-h-0 overflow-hidden rounded-kante border border-border/60 bg-background/40"
                      style={{
                        backgroundImage:
                          'linear-gradient(160deg, color-mix(in oklab, var(--accent) 10%, transparent), transparent 60%)',
                      }}
                    >
                      {i === 2 && (
                        <motion.span
                          variants={hoverRing}
                          className="entrance-anim pointer-events-none absolute inset-0 rounded-kante border border-accent"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Der Mauszeiger der Sequenz – gleitet von rechts unten auf die
                  dritte Karte und „klickt" kurz. Endlage steht still. */}
              <motion.span
                variants={cursor}
                initial="rest"
                animate={play ? 'show' : 'rest'}
                className="entrance-anim pointer-events-none absolute left-[63%] top-[80%] text-foreground drop-shadow-md"
              >
                <MousePointer2 className="h-3.5 w-3.5 fill-foreground sm:h-4 sm:w-4" />
              </motion.span>
            </div>

            {/* Der einzige Text im Link = sein zugänglicher Name. Außerhalb
                der aria-hidden-Kulisse, immer sichtbar (auch mobil). */}
            <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-kante border border-border-stark bg-background px-2.5 py-1 text-[11px] font-medium text-foreground transition-colors duration-200 group-hover/stage:border-accent group-hover/stage:text-accent sm:bottom-4 sm:right-4 sm:px-3 sm:py-1.5 sm:text-xs">
              Echte Projekte ansehen
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </a>
        </div>
      </motion.div>
    </div>
  )
}
