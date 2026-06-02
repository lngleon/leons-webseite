import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useMotionValue, useReducedMotion } from 'framer-motion'

type CounterProps = {
  /** Zielwert, auf den hochgezählt wird. */
  value: number
  /** Suffix hinter der Zahl, z.B. "%". */
  suffix?: string
  /** Dauer in Sekunden. */
  duration?: number
}

/**
 * Zählt beim Sichtbarwerden von 0 auf `value` hoch.
 * Respektiert prefers-reduced-motion (zeigt dann direkt den Endwert).
 */
export default function Counter({ value, suffix = '', duration = 1.6 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduceMotion = useReducedMotion()
  const count = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const unsubscribe = count.on('change', (v) => setDisplay(Math.round(v)))
    return () => unsubscribe()
  }, [count])

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      setDisplay(value)
      return
    }
    const controls = animate(count, value, { duration, ease: 'easeOut' })
    return () => controls.stop()
  }, [inView, value, duration, reduceMotion, count])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}
