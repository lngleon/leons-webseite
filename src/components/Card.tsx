import type { ReactNode } from 'react'
import { clsx } from 'clsx'

/**
 * Wiederverwendbares Karten-Muster: 2-px-Kante, tragender Rand, Kartenfläche.
 *
 * Seit 02.09.2026 trägt der Rand (`--border-stark`, 4.73 : 1 gegen den Grund)
 * die Tiefe. Vorher lag die Kartenfläche nur 1.05 : 1 über dem Hintergrund –
 * die Karte war als Fläche gar nicht zu erkennen und brauchte deshalb einen
 * farbigen Glow, um überhaupt zu existieren. Der Glow ist ersatzlos entfallen,
 * ebenso der Hover-Lift auf JEDER Karte (auch die Problem-Karten hoben ab,
 * obwohl sie nicht klickbar sind).
 *
 * Hover: betonter Akzent-Rand plus ein neutraler, versetzter Schatten
 * (`shadow-1`). Touch-sicher, weil Tailwind v4 `hover` an
 * `@media (hover: hover)` koppelt – auf Touch passiert nichts.
 *
 * Mit `highlight` steht der Akzent-Rand dauerhaft (kein Badge, kein Schein).
 *
 * Wichtig: Die Entrance-Animation (Fade-up/Stagger) gehört NICHT hierher, sondern auf ein
 * umschließendes motion-Element – sonst kollidieren zwei transform-Quellen.
 *
 * Hinweis: bewusst clsx statt cn/twMerge – die ruhende Rahmenfarbe wird genau
 * einmal gesetzt, damit es keinen border-color-Konflikt gibt.
 */

const cardBaseClassName =
  'group rounded-kante border border-border-stark bg-card p-6 sm:p-7 ' +
  'transition duration-200 ease-out ' +
  'hover:border-accent hover:shadow-1'

// Vollständiges Standard-Kartenmuster (ruhender, tragender Rahmen).
export const cardClassName = cardBaseClassName

// Highlight: voll deckender Akzent-Rand statt des früheren Verlaufsrands
// (.card-gradient-border, am 02.09.2026 ersatzlos gestrichen – ein leuchtender
// 1-px-Verlauf um eine hervorgehobene Karte ist das kanonische Pricing-Tier-
// Highlight aus SaaS-Vorlagen).
const cardHighlightClassName = 'border-accent'

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
        highlight ? cardHighlightClassName : '',
        className,
      )}
    >
      {children}
    </div>
  )
}
