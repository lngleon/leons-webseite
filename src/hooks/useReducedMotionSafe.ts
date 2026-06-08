import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * SSG/Hydration-sichere Variante von useReducedMotion.
 *
 * Problem: `useReducedMotion` liest matchMedia und liefert beim ersten Client-
 * Render bereits den echten Wert – auf dem Server (Prerender) gibt es kein
 * matchMedia, dort ist es immer `false`. Bei Nutzern mit reduce-Präferenz
 * würde das erste Client-Render also vom Server-HTML abweichen → Hydration-
 * Mismatch.
 *
 * Lösung: Das ERSTE Render (Server UND erster Client-Frame) liefert immer
 * `false`; erst nach dem Mount wird der echte Wert übernommen. So gilt
 * „Server-Frame = erstes Client-Frame", und reduced-motion greift einen Tick
 * später (die Komponenten springen dann ohne Bewegung in ihren Endzustand).
 */
export function useReducedMotionSafe(): boolean {
  const reduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted ? (reduced ?? false) : false
}
