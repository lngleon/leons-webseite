import { motion, useScroll, useSpring } from 'framer-motion'
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe'

/**
 * ScrollProgress – schmaler Fortschrittsbalken fix am oberen Viewport-Rand, der
 * sich links→rechts mit der Scroll-Tiefe der ganzen Seite füllt.
 *
 * NUR Violett: Füllung über `--accent-gradient` (Token), kein Hex hardcodiert.
 *
 * Liegt mit `z-[60]` ÜBER der Sticky-Navbar (`z-50`) und `pointer-events-none`,
 * aber nur 3px hoch am äußersten Rand → verdeckt keinen Navbar-Inhalt.
 *
 * SSR-/Prerender-sicher: `useScroll` liest die Scroll-Position erst nach dem
 * Mount (kein window im Render). `scaleX` startet bei 0 → der Balken ist im
 * prerenderten HTML leer (rein dekorativ, nicht LCP-kritisch); Server-Frame =
 * erstes Client-Frame (`useReducedMotionSafe` liefert im ersten Render `false`,
 * also dieselbe Quelle wie der Server).
 *
 * reduced-motion: ohne Spring-Easing direkt an die Scroll-Tiefe gebunden – der
 * Balken bleibt sichtbar (er ist Information, kein Schmuck), folgt nur ohne
 * nachfedernde Animation.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reduced = useReducedMotionSafe()
  // skipInitialAnimation: bei einem Reload an einer gescrollten Position (bzw.
  // Back-Navigation mit Scroll-Restore) NICHT von 0 hochfedern, sondern sofort
  // den korrekten Füllstand zeigen (Balken ist Info). Live-Scrollen federt normal.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
    skipInitialAnimation: true,
  })
  // reduced-motion: direkt an scrollYProgress; sonst sanft nachfedernd.
  const scaleX = reduced ? scrollYProgress : smooth

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left [background-image:var(--accent-gradient)]"
    />
  )
}
