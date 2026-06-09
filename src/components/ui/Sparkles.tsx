import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Sparkles – aufsteigende Funken auf einem 2D-Canvas, hand-gebaut (KEIN Paket,
 * wie der generative Hero-BG / CoolMode). Reine Können-Demo („ich baue
 * Canvas-Visuals"), nur auf /möglichkeiten.
 *
 * NUR Violett: die Farbe wird zur Laufzeit aus `--accent` gelesen (kein
 * hardcodiertes Hex). Dark-only.
 *
 * SSR-/Prerender-sicher: im Render nur die <canvas>-Hülle, alle window-/Canvas-
 * Zugriffe im Effect nach dem Mount. reduced-motion → GAR KEINE Funken (die
 * Schleife startet nicht). Die rAF-Schleife wird beim Unmount sauber abgebaut
 * (wie CoolMode). Dichte bewusst NIEDRIG gehalten (Perf, nicht 800).
 */

function readToken(name: string, fallback: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

type SparklesProps = {
  className?: string
  /** Ungefähre Partikel-Obergrenze (bewusst niedrig – NICHT 800). */
  density?: number
  minSize?: number
  maxSize?: number
  /** Aufstiegs-Geschwindigkeit (px pro Frame). */
  speed?: number
}

type Particle = {
  x: number
  y: number
  r: number
  vy: number
  a: number
  tw: number
  tws: number
}

export default function Sparkles({
  className,
  density = 64,
  minSize = 0.6,
  maxSize = 1.6,
  speed = 0.35,
}: SparklesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    // reduced-motion: keine Funken.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const color = readToken('--accent', '#a78bfa')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let lastW = -1
    let lastH = -1
    let frame: number | undefined
    let visible = true
    let particles: Particle[] = []

    const rand = (min: number, max: number) => min + Math.random() * (max - min)

    const spawn = (atBottom: boolean): Particle => ({
      x: Math.random() * width,
      y: atBottom ? height + rand(2, 24) : Math.random() * height,
      r: rand(minSize, maxSize),
      vy: rand(speed * 0.5, speed * 1.5),
      a: rand(0.2, 0.9),
      tw: Math.random() * Math.PI * 2,
      tws: rand(0.008, 0.03),
    })

    const build = () => {
      // Anzahl skaliert leicht mit der Fläche, hart auf `density` gedeckelt.
      const count = Math.max(8, Math.min(density, Math.round((width * height) / 240000 * density)))
      particles = Array.from({ length: count }, () => spawn(false))
    }

    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      if (width === lastW && height === lastH) return
      lastW = width
      lastH = height
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    const tick = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = color
      for (const p of particles) {
        p.y -= p.vy
        p.tw += p.tws
        if (p.y < -p.r) Object.assign(p, spawn(true))
        ctx.globalAlpha = p.a * (0.35 + 0.65 * Math.abs(Math.sin(p.tw)))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      frame = requestAnimationFrame(tick)
    }

    const startLoop = () => {
      if (frame !== undefined || !visible) return
      frame = requestAnimationFrame(tick)
    }
    const stopLoop = () => {
      if (frame !== undefined) {
        cancelAnimationFrame(frame)
        frame = undefined
      }
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Perf: nur animieren, solange der Block im Viewport ist.
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true
        if (visible) startLoop()
        else stopLoop()
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    startLoop()

    return () => {
      stopLoop()
      ro.disconnect()
      io.disconnect()
    }
  }, [density, minSize, maxSize, speed])

  return <canvas ref={canvasRef} aria-hidden="true" className={cn('block h-full w-full', className)} />
}
