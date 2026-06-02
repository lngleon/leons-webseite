import type { ReactNode } from 'react'
import { clsx } from 'clsx'

/**
 * Wiederverwendbares Karten-Muster mit dezenter Desktop-Hover-Wirkung:
 * leichtes Anheben, betonter Akzent-Rand und weicher Akzent-Glow – smooth (~200ms, ease-out).
 *
 * Touch-sicher: Tailwind v4 koppelt die `hover`-Variante an `@media (hover: hover)`,
 * d.h. die Effekte greifen nur auf Geräten mit echtem Zeiger, nicht bei Touch.
 * Das Anheben ist zusätzlich an `motion-safe` gekoppelt (respektiert prefers-reduced-motion).
 *
 * Mit `highlight` ist der Akzent dauerhaft aktiv (dezenter Akzent-Rand + leiser Glow,
 * kein Badge) – der Hover bleibt unverändert obendrauf.
 *
 * Wichtig: Die Entrance-Animation (Fade-up/Stagger) gehört NICHT hierher, sondern auf ein
 * umschließendes motion-Element. So kollidieren die beiden transform-Quellen nicht
 * (Framer setzt ein inline-transform, das eine CSS-:hover-Transform sonst überschreibt).
 *
 * Hinweis: bewusst clsx statt cn/twMerge – damit `shadow-lg` + `shadow-accent/20`
 * (Größe + Farbe) nicht fälschlich zu einer Klasse zusammengeführt werden. Die ruhende
 * Rahmenfarbe wird genau einmal gesetzt (border-border ODER border-accent/50), damit es
 * keinen border-color-Konflikt gibt.
 */

// Basis ohne ruhende Rahmenfarbe: Breite, Transition, Hover-Wirkung, Lift.
const cardBaseClassName =
  'group rounded-2xl border bg-card p-6 sm:p-7 ' +
  'transition duration-200 ease-out ' +
  'hover:border-accent/50 hover:shadow-lg hover:shadow-accent/20 ' +
  'motion-safe:hover:-translate-y-1.5'

// Vollständiges Standard-Kartenmuster (ruhender, neutraler Rahmen).
export const cardClassName = cardBaseClassName + ' border-border'

// Highlight: Akzent dauerhaft aktiv – dezenter Akzent-Rand + leiser Glow (kein Badge).
const cardHighlightClassName = 'border-accent/50 shadow-lg shadow-accent/10'

type CardProps = {
  children: ReactNode
  className?: string
  /** Hebt die Karte dauerhaft per Akzent hervor (z.B. Highlight-Leistung). */
  highlight?: boolean
}

export default function Card({ children, className, highlight = false }: CardProps) {
  return (
    <div
      className={clsx(
        cardBaseClassName,
        highlight ? cardHighlightClassName : 'border-border',
        className,
      )}
    >
      {children}
    </div>
  )
}
