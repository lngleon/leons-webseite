'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useMotionValue } from 'framer-motion'
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe'

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
 *
 * Start-Bedingung (Mobil-Bug 03.09.2026, im Browser nachgemessen): mit
 * `amount: 0.4` blieben auf dem Handy Zähler auf 0 stehen. Bei 390×844 ragen
 * die unteren zwei Hero-Karten nur ~28 px über die Falz – die Ziffern-Spans
 * selbst waren zu <40 % sichtbar, der Observer feuerte nie, die Karte zeigte
 * dauerhaft „0". Deshalb:
 *   1. `amount: 'some'` + `margin` nach unten: ein angeschnittener Zähler
 *      (oder einer knapp unter der Falz) startet sofort beim Laden.
 *   2. Fallback-Timer nach dem Mount: falls der Observer gar nicht feuert
 *      (tief unter der Falz, Browser-Eigenheiten), zählt der Wert trotzdem
 *      hoch – eine „0" darf nie stehen bleiben. Counter läuft nur im Hero,
 *      dessen Entrance ohnehin beim Laden spielt; ein Start ohne Sicht
 *      verschenkt also nichts.
 */
export default function Counter({ value, suffix = '', duration = 1.6 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 'some', margin: '0px 0px 15% 0px' })
  const [fallback, setFallback] = useState(false)
  const reduceMotion = useReducedMotionSafe()
  const count = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setFallback(true), 1800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const unsubscribe = count.on('change', (v) => setDisplay(Math.round(v)))
    return () => unsubscribe()
  }, [count])

  // Als EIN boolescher Ausdruck in den Deps: kippt der jeweils zweite
  // Auslöser später auch noch auf true, bleibt `start` unverändert true und
  // der Effekt startet die laufende Animation nicht neu.
  const start = inView || fallback

  useEffect(() => {
    if (!start) return
    if (reduceMotion) {
      setDisplay(value)
      return
    }
    const controls = animate(count, value, { duration, ease: 'easeOut' })
    return () => controls.stop()
  }, [start, value, duration, reduceMotion, count])

  return (
    /**
     * `tabular-nums` schaltet auf Tabellenziffern – dieselbe Technik wie in der
     * Preisspalte der Demo (`.demo-price`). Sie ist hier aber nur die halbe
     * Miete, und das ist gemessen, nicht vermutet:
     *
     * Der Zähler „100%" verschiebt beim Hochzählen das `%`, weil die ZIFFERN-
     * ANZAHL wächst (0 → 37 → 100). Tabellenziffern vereinheitlichen nur die
     * Breite EINER Ziffer, nicht die Länge der Zahl. Mit `tabular-nums` allein
     * blieb der Layout-Shift deshalb praktisch unverändert (0,00036 gegen
     * 0,00031 vorher, im Browser gegengemessen).
     *
     * Was ihn schliesst, ist die feste Breite: Die Ziffern laufen in einer
     * `inline-block`-Box, die von Anfang an so breit ist wie der Endwert –
     * `1ch` ist die Vorschubbreite der „0", und mit Tabellenziffern hat JEDE
     * Ziffer exakt diese Breite (im Browser nachgemessen: 19,094 px für „0",
     * für jede weitere Ziffer und für das FIGURE SPACE). `String(value).length`
     * Zeichen reichen also exakt. Das `%` steht damit vom ersten Frame an an
     * seiner Endposition und wandert nicht mehr.
     *
     * Genau dafür braucht es die Tabellenziffern: ohne sie wäre `ch` die Breite
     * der „0", die anderen Ziffern wären schmaler, und die Reservierung würde
     * zu gross ausfallen.
     */
    <span ref={ref} className="tabular-nums">
      <span className="inline-block" style={{ minWidth: `${String(value).length}ch` }}>
        {display}
      </span>
      {suffix}
    </span>
  )
}
