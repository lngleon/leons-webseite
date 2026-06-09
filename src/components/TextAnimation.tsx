import { Children, useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe'
import { cn } from '@/lib/utils'

type Tag = 'div' | 'p' | 'span' | 'h2' | 'h3'
type Direction = 'up' | 'down' | 'left' | 'right'

type TextAnimationProps = {
  /** Text als String – wird je nach Modus in Zeilen (`\n`) bzw. Buchstaben zerlegt. */
  text?: string
  /**
   * Alternativ zu `text`: jedes unmittelbare Kind-Element wird zu EINER
   * gestaffelt einblendenden Zeile. So kann eine Zeile reichen Inhalt tragen
   * (z.B. ein Akzentwort via `.accent-gradient-text`), was ein reiner String
   * nicht kann. Kinder als echte Elemente (`<span>…</span>`) übergeben –
   * NICHT als Fragmente: `React.Children.toArray` flacht Fragmente ab und
   * würde die Zeilen-Gruppierung verlieren.
   */
  children?: ReactNode
  /** Wrapper-Element (Default `p`). */
  as?: Tag
  /** Pro Buchstabe einblenden (nur mit `text`, nicht mit `children`). */
  letterAnime?: boolean
  /**
   * Pro Zeile einblenden – Default (greift, wenn `letterAnime` aus). Sind
   * `letterAnime` UND `lineAnime` aus, blendet der gesamte Inhalt als EIN
   * Block ein (keine Zerlegung).
   */
  lineAnime?: boolean
  /** Aus welcher Richtung die Einheiten einrücken (y bzw. x). */
  direction?: Direction
  /** Überschreibt die Default-Einheiten-Variante (blur + fade + y). */
  variants?: Variants
  /** Schreibweise der Vorlage. */
  classname?: string
  /** Repo-Schreibweise – wird mit `classname` zusammengeführt. */
  className?: string
}

const DISTANCE = 22

function offsetFor(direction: Direction) {
  switch (direction) {
    case 'down':
      return { y: -DISTANCE }
    case 'left':
      return { x: DISTANCE }
    case 'right':
      return { x: -DISTANCE }
    case 'up':
    default:
      return { y: DISTANCE }
  }
}

/**
 * TextAnimation – sanftes Scroll-Reveal (blur + fade + y) für Text, wahlweise
 * zeilen- oder buchstabenweise gestaffelt. Nachbau der `TextAnimation`-API aus
 * Leons Vorlage (Props text/as/letterAnime/lineAnime/direction/variants/classname),
 * an dieses Repo angepasst: KEIN Next / kein `'use client'`, `@/`-Alias, und
 * BEWUSST KEIN lowercase/capitalize-Transform (anders als die Vorlage – der Text
 * wird 1:1 ausgegeben).
 *
 * SSR/Prerender (Pflicht, siehe PROJEKT-STAND):
 * - `useReducedMotionSafe` statt framers `useReducedMotion`: erstes Render
 *   liefert immer `false` (= wie der Server ohne matchMedia) → Server-Frame =
 *   erstes Client-Frame, kein Hydration-Mismatch.
 * - Orchestrierung via `useInView` + gesteuertes `animate` (wie Prozess), NICHT
 *   `whileInView` – das propagiert die Varianten auch dann verlässlich, wenn die
 *   Sektion beim Laden schon im Viewport liegt.
 * - Der Text steht als echter Knoten im prerenderten HTML (below-the-fold nur
 *   mit `opacity:0` gestartet) → SEO ok. Bewusst NICHT above-the-fold/Hero.
 * - reduced-motion → sofort voll sichtbar (nach dem Mount), kein Blur, kein
 *   Stagger.
 */
export default function TextAnimation({
  text,
  children,
  as = 'p',
  letterAnime = false,
  lineAnime = true,
  direction = 'up',
  variants,
  classname,
  className,
}: TextAnimationProps) {
  const reduce = useReducedMotionSafe()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  // reduced-motion: direkt sichtbar (einen Tick nach dem Mount), sonst beim
  // Reinscrollen. `reduce` ist im ersten Render `false` → matcht den Server.
  const active = reduce || inView

  const useLetters = letterAnime && children == null && !!text
  const stagger = useLetters ? 0.035 : 0.18

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  }

  const off = offsetFor(direction)
  const defaultItem: Variants = reduce
    ? {
        // reduced-motion: nach dem Mount OHNE Bewegung in den Endzustand
        // springen – `duration: 0`, sonst spielt framers Default-Transition
        // (Tween/Spring) doch noch ein Fade/De-Blur/Slide ab (wie Prozess).
        hidden: { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', transition: { duration: 0 } },
        show: { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, ...off, filter: 'blur(8px)' },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      }
  const item = variants ?? defaultItem

  // `motion[as]` als ein konkreter Motion-Typ – `ref`/Props lösen sauber auf;
  // der echte Tag wird zur Laufzeit über die Proxy-Property gewählt.
  const MotionTag = motion[as] as typeof motion.div
  const mergedClass = cn(classname, className)

  // Einheiten je Modus: Buchstaben > Zeilen > ein Block.
  let units: ReactNode[]
  let unitDisplay: 'block' | 'inline-block'
  if (useLetters) {
    // Inline-block-Buchstaben kollabieren ein normales Leerzeichen auf Breite 0
    // (Wörter klebten zusammen) → geschütztes Leerzeichen behält die Breite.
    units = [...(text ?? '')].map((ch) => (ch === ' ' ? ' ' : ch))
    unitDisplay = 'inline-block'
  } else if (lineAnime) {
    // Zeilen: jedes Kind = eine Zeile, sonst Text an `\n` splitten.
    units = children != null ? Children.toArray(children) : (text ?? '').split('\n')
    unitDisplay = 'block'
  } else {
    // Weder Buchstaben noch Zeilen → gesamter Inhalt blendet als EIN Block ein.
    units = [children != null ? children : (text ?? '')]
    unitDisplay = 'block'
  }

  return (
    <MotionTag
      ref={ref}
      className={mergedClass}
      variants={container}
      initial="hidden"
      animate={active ? 'show' : 'hidden'}
      // Buchstaben-Modus zerlegt das Wort optisch – für Screenreader als Ganzes.
      {...(useLetters ? { 'aria-label': text } : {})}
    >
      {units.map((unit, i) => (
        <motion.span
          key={i}
          variants={item}
          style={{ display: unitDisplay }}
          {...(useLetters ? { 'aria-hidden': true } : {})}
        >
          {unit}
        </motion.span>
      ))}
    </MotionTag>
  )
}
