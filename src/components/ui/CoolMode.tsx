import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

/**
 * Klick-/Tap-Partikel („CoolMode", Magic-UI-Vorlage, on-brand integriert).
 *
 * BUNTE hsl-Zufallsfarben sind hier BEWUSST erlaubt – die einzige Ausnahme vom
 * Violett-System, strikt in DIESER Komponente gekapselt (nirgends sonst).
 *
 * SSR-sicher: jeder window/document/performance-Zugriff passiert ausschließlich
 * in `useEffect` nach dem Mount, nie im Render (der Prerender darf nicht brechen).
 * Bei `prefers-reduced-motion` werden GAR KEINE Partikel angehängt.
 *
 * Kein Leak: beim Unmount / Route-Verlassen wird das Nachlegen sofort gestoppt,
 * die fliegenden Partikel laufen aus, danach werden die rAF-Schleife UND der
 * globale `#_coolMode_effect`-Layer restlos abgebaut (Instanz-Zähler → 0).
 */

interface BaseParticle {
  element: HTMLElement | SVGSVGElement
  left: number
  size: number
  top: number
}
interface CoolParticle extends BaseParticle {
  direction: number
  speedHorz: number
  speedUp: number
  spinSpeed: number
  spinVal: number
}
export interface CoolParticleOptions {
  size?: number
  speedHorz?: number
  speedUp?: number
}

const SVG_NS = 'http://www.w3.org/2000/svg'

const getContainer = () => {
  const id = '_coolMode_effect'
  const existing = document.getElementById(id)
  if (existing) return existing
  const container = document.createElement('div')
  container.setAttribute('id', id)
  container.setAttribute(
    'style',
    'overflow:hidden;position:fixed;height:100%;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:2147483647',
  )
  document.body.appendChild(container)
  return container
}

// Modulweit: zählt aktive Instanzen, damit der gemeinsame Layer erst entfernt
// wird, wenn die LETZTE Instanz weg ist.
let instanceCounter = 0

const applyParticleEffect = (
  element: HTMLElement,
  options?: CoolParticleOptions,
): (() => void) => {
  instanceCounter++
  const sizes = [15, 20, 25, 35, 45]
  const limit = 45
  let particles: CoolParticle[] = []
  let autoAddParticle = false
  let mouseX = 0
  let mouseY = 0
  const container = getContainer()

  const appendCircleParticle = (particle: HTMLDivElement, size: number) => {
    const svg = document.createElementNS(SVG_NS, 'svg')
    const circle = document.createElementNS(SVG_NS, 'circle')
    circle.setAttributeNS(null, 'cx', (size / 2).toString())
    circle.setAttributeNS(null, 'cy', (size / 2).toString())
    circle.setAttributeNS(null, 'r', (size / 2).toString())
    // Bunte Zufallsfarbe – bewusste Ausnahme, nur hier.
    circle.setAttributeNS(null, 'fill', `hsl(${Math.random() * 360}, 70%, 50%)`)
    svg.appendChild(circle)
    svg.setAttribute('width', size.toString())
    svg.setAttribute('height', size.toString())
    particle.appendChild(svg)
  }

  const generateParticle = () => {
    const size = options?.size || sizes[Math.floor(Math.random() * sizes.length)]
    const speedHorz = options?.speedHorz || Math.random() * 10
    const speedUp = options?.speedUp || Math.random() * 25
    const spinVal = Math.random() * 360
    const spinSpeed = Math.random() * 35 * (Math.random() <= 0.5 ? -1 : 1)
    const top = mouseY - size / 2
    const left = mouseX - size / 2
    const direction = Math.random() <= 0.5 ? -1 : 1

    const particle = document.createElement('div')
    appendCircleParticle(particle, size)
    particle.style.position = 'absolute'
    particle.style.transform = `translate3d(${left}px, ${top}px, 0px) rotate(${spinVal}deg)`
    container.appendChild(particle)

    particles.push({
      direction,
      element: particle,
      left,
      size,
      speedHorz,
      speedUp,
      spinSpeed,
      spinVal,
      top,
    })
  }

  const refreshParticles = () => {
    particles.forEach((p) => {
      p.left = p.left - p.speedHorz * p.direction
      p.top = p.top - p.speedUp
      p.speedUp = Math.min(p.size, p.speedUp - 1)
      p.spinVal = p.spinVal + p.spinSpeed
      if (p.top >= Math.max(window.innerHeight, document.body.clientHeight) + p.size) {
        particles = particles.filter((o) => o !== p)
        p.element.remove()
      }
      p.element.setAttribute(
        'style',
        [
          'position:absolute',
          'will-change:transform',
          `top:${p.top}px`,
          `left:${p.left}px`,
          `transform:rotate(${p.spinVal}deg)`,
        ].join(';'),
      )
    })
  }

  let animationFrame: number | undefined
  let lastParticleTimestamp = 0
  const particleGenerationDelay = 30

  const loop = () => {
    const now = performance.now()
    if (
      autoAddParticle &&
      particles.length < limit &&
      now - lastParticleTimestamp > particleGenerationDelay
    ) {
      generateParticle()
      lastParticleTimestamp = now
    }
    refreshParticles()
    animationFrame = requestAnimationFrame(loop)
  }
  loop()

  const isTouch = 'ontouchstart' in window
  const tap = isTouch ? 'touchstart' : 'mousedown'
  const tapEnd = isTouch ? 'touchend' : 'mouseup'
  const move = isTouch ? 'touchmove' : 'mousemove'

  const updateMousePosition = (e: Event) => {
    const ev = e as MouseEvent | TouchEvent
    if ('touches' in ev) {
      const t = ev.touches[0]
      if (t) {
        mouseX = t.clientX
        mouseY = t.clientY
      }
    } else {
      mouseX = ev.clientX
      mouseY = ev.clientY
    }
  }
  const tapHandler = (e: Event) => {
    updateMousePosition(e)
    autoAddParticle = true
  }
  const disableAutoAddParticle = () => {
    autoAddParticle = false
  }

  element.addEventListener(move, updateMousePosition, { passive: true })
  element.addEventListener(tap, tapHandler, { passive: true })
  element.addEventListener(tapEnd, disableAutoAddParticle, { passive: true })
  element.addEventListener('mouseleave', disableAutoAddParticle, { passive: true })

  return () => {
    element.removeEventListener(move, updateMousePosition)
    element.removeEventListener(tap, tapHandler)
    element.removeEventListener(tapEnd, disableAutoAddParticle)
    element.removeEventListener('mouseleave', disableAutoAddParticle)
    // Keine neuen Partikel mehr erzeugen → auslaufen lassen → rAF + Layer abbauen,
    // sobald nichts mehr fliegt (verhindert einen rAF-/DOM-Leak beim Route-Verlassen).
    autoAddParticle = false
    const interval = setInterval(() => {
      if (animationFrame !== undefined && particles.length === 0) {
        cancelAnimationFrame(animationFrame)
        clearInterval(interval)
        if (--instanceCounter === 0) {
          container.remove()
        }
      }
    }, 500)
  }
}

interface CoolModeProps {
  children: ReactNode
  options?: CoolParticleOptions
}

export function CoolMode({ children, options }: CoolModeProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    // reduced-motion: keine Partikel.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    return applyParticleEffect(element, options)
  }, [options])

  return <span ref={ref}>{children}</span>
}
