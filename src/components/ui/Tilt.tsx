import { createContext, useContext, useEffect, useRef, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe'

/**
 * Subtiler 3D-Tilt (Aceternity-„3d-card"-Mechanik – aus der Demo als Referenz
 * on-brand NEU gebaut, kein Fremd-Inhalt übernommen): Die Karte neigt sich
 * leicht zur Maus, Kinder „schweben" gestaffelt via `translateZ`.
 *
 * Bewusst DEZENT (max. ~6° Neigung, weiche 200ms-Transition) – edel, kein
 * starkes Wackeln. SSR-sicher: `transform` wird nur in Event-Handlern bzw.
 * Effects nach dem Mount gesetzt, nie im Render. Bei `prefers-reduced-motion`
 * (und mangels `mousemove` auch auf Touch) bleibt die Karte flach.
 */

const TiltContext = createContext<boolean>(false)

const MAX_DEG = 6 // bewusst klein → subtil

export function CardContainer({
  children,
  className,
  containerClassName,
}: {
  children: ReactNode
  className?: string
  containerClassName?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)
  const reduced = useReducedMotionSafe()

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || reduced) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width - 0.5) * MAX_DEG
    const y = ((e.clientY - top) / height - 0.5) * MAX_DEG
    ref.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`
  }
  const handleMouseEnter = () => {
    if (!reduced) setEntered(true)
  }
  const handleMouseLeave = () => {
    setEntered(false)
    if (ref.current) ref.current.style.transform = 'rotateY(0deg) rotateX(0deg)'
  }

  return (
    <TiltContext.Provider value={entered}>
      <div
        className={cn('flex items-center justify-center', containerClassName)}
        style={{ perspective: '1000px' }}
      >
        <div
          ref={ref}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            'relative transition-transform duration-200 ease-out [transform-style:preserve-3d]',
            className,
          )}
        >
          {children}
        </div>
      </div>
    </TiltContext.Provider>
  )
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('[transform-style:preserve-3d]', className)}>{children}</div>
}

export function CardItem({
  children,
  className,
  translateZ = 0,
}: {
  children: ReactNode
  className?: string
  translateZ?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const entered = useContext(TiltContext)

  useEffect(() => {
    if (!ref.current) return
    ref.current.style.transform = entered ? `translateZ(${translateZ}px)` : 'translateZ(0px)'
  }, [entered, translateZ])

  return (
    <div ref={ref} className={cn('transition-transform duration-200 ease-out', className)}>
      {children}
    </div>
  )
}
