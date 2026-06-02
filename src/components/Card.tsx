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
 * Wichtig: Die Entrance-Animation (Fade-up/Stagger) gehört NICHT hierher, sondern auf ein
 * umschließendes motion-Element. So kollidieren die beiden transform-Quellen nicht
 * (Framer setzt ein inline-transform, das eine CSS-:hover-Transform sonst überschreibt).
 *
 * Hinweis: bewusst clsx statt cn/twMerge – damit `shadow-lg` + `shadow-accent/20`
 * (Größe + Farbe) nicht fälschlich zu einer Klasse zusammengeführt werden.
 */
export const cardClassName =
  'group rounded-2xl border border-border bg-card p-6 sm:p-7 ' +
  'transition duration-200 ease-out ' +
  'hover:border-accent/50 hover:shadow-lg hover:shadow-accent/20 ' +
  'motion-safe:hover:-translate-y-1.5'

type CardProps = {
  children: ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return <div className={clsx(cardClassName, className)}>{children}</div>
}
