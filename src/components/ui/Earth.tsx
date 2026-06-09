import { useEffect, useRef } from 'react'
import type { Globe } from 'cobe'
import { cn } from '@/lib/utils'

/**
 * Earth – interaktiver Dot-Globe (cobe, WebGL) als reine Können-Demo
 * („ich baue WebGL-Visuals"). Auf /möglichkeiten, NICHT auf der Startseite.
 *
 * NUR Violett: Punkte (baseColor) und Glow lesen `--accent` / `--accent-solid`
 * zur Laufzeit aus den zentralen Tokens und füttern cobe als [r,g,b] – KEIN
 * hardcodiertes Hex, keine blauen cobe-Defaults. Dark-only.
 *
 * SSR-/Prerender-sicher: im Render nur eine stabile <canvas>-Hülle, KEIN
 * window/document/WebGL/Zufall. cobe wird erst nach dem Mount im Effect
 * dynamisch importiert (`import('cobe')`) und initialisiert – der Prerender
 * lädt/zeichnet cobe nie. reduced-motion → KEIN Auto-Spin (statisch, keine
 * laufende rAF-Schleife); Drag bleibt möglich (nutzer-initiiert). Spin-Schleife
 * wird beim Unmount sauber abgebaut (wie CoolMode), der Globe via `destroy()`
 * zerstört und der WebGL-Context aktiv freigegeben.
 *
 * cobe-v2-Besonderheiten (aus der Quelle verifiziert):
 * - kein `onRender`/keine interne Schleife → wir treiben selbst eine rAF-Schleife
 *   mit `update({phi})`; `update({width,height})` realloziert den GL-Buffer →
 *   NUR bei echtem Resize (ResizeObserver), nie pro Frame.
 * - die Map-Textur wird async geladen (`Image.onload`) → der erste Frame ist
 *   leer; unter reduced-motion (ohne Schleife) ein paar Redraws nachschieben.
 * - `createGlobe` hängt die <canvas> in einen EIGENEN Wrapper um → diese
 *   Komponente rendert ein eigenes Wrapper-<div> (React entfernt beim Unmount
 *   nur dieses, nie die umgehängte Canvas → kein removeChild-Fehler).
 */

/** '#a78bfa' → [r,g,b] in 0..1 für cobe. Fallback Violett (nie NaN an WebGL). */
function hexToRgbNorm(hex: string): [number, number, number] {
  const h = hex.trim().replace(/^#/, '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const int = Number.parseInt(full, 16)
  if (full.length !== 6 || Number.isNaN(int)) return [0.66, 0.55, 0.98]
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255]
}

function readToken(name: string, fallback: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

export default function Earth({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let phi = 0
    let drag = 0 // Rotations-Offset aus dem Ziehen (in px)
    let pointerStart: number | null = null
    let width = canvas.offsetWidth
    let frame: number | undefined
    let visible = true
    let globe: Globe | null = null
    let cancelled = false
    const timers: number[] = []

    // Farben NUR aus den Tokens (nicht hardcoden).
    const baseColor = hexToRgbNorm(readToken('--accent', '#a78bfa'))
    const glowColor = hexToRgbNorm(readToken('--accent-solid', '#6d4dff'))

    const draw = () => globe?.update({ phi: phi + drag / 200 })

    const startLoop = () => {
      if (frame !== undefined || reduced || !globe || !visible) return
      const tick = () => {
        if (pointerStart === null) phi += 0.0035 // sanfter, edler Auto-Spin
        draw()
        frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }
    const stopLoop = () => {
      if (frame !== undefined) {
        cancelAnimationFrame(frame)
        frame = undefined
      }
    }

    // Resize über ResizeObserver: fängt auch reine Container-Resizes (kein
    // window-resize) und eine 0-Breite beim Start ab. `update({width,height})`
    // realloziert den GL-Buffer → nur bei echter Änderung, nie pro Frame.
    const onResize = () => {
      const w = canvas.offsetWidth
      if (w > 0 && w !== width) {
        width = w
        globe?.update({ width, height: width }) // re-rendert auch → self-heal
      }
    }
    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(canvas)

    // Perf: Spin-Schleife nur laufen lassen, solange der Globus im Viewport ist
    // (Tab-Hintergrund drosselt rAF ohnehin der Browser).
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true
        if (visible) startLoop()
        else stopLoop()
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    // Drag rotiert den Globus (auch unter reduced-motion – nutzer-initiiert).
    const onPointerDown = (e: PointerEvent) => {
      pointerStart = e.clientX - drag
      canvas.style.cursor = 'grabbing'
    }
    const onPointerUp = () => {
      if (pointerStart === null) return
      pointerStart = null
      canvas.style.cursor = 'grab'
    }
    const onPointerMove = (e: PointerEvent) => {
      if (pointerStart === null) return
      drag = e.clientX - pointerStart
      if (reduced) draw() // unter reduced läuft keine Schleife → direkt zeichnen
    }
    canvas.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    import('cobe')
      .then(({ default: createGlobe }) => {
        if (cancelled || !canvasRef.current) return
        width = canvas.offsetWidth || width
        globe = createGlobe(canvas, {
          devicePixelRatio: dpr,
          width,
          height: width,
          phi: 0,
          theta: 0.25,
          dark: 1,
          diffuse: 1.2,
          mapSamples: 16000,
          mapBrightness: 6,
          baseColor,
          markerColor: glowColor,
          glowColor,
          opacity: 0.95,
          markers: [],
        })

        // Sanftes Einblenden (unter reduced-motion ohne Transition → instant).
        if (!reduced) canvas.style.transition = 'opacity 0.8s ease'
        canvas.style.opacity = '1'

        if (reduced) {
          // cobe lädt die Map-Textur async (Image.onload) → der erste Frame ist
          // leer. Ohne Schleife (statisch) ein paar Redraws nachschieben, bis die
          // Textur da ist; danach steht der Globus still (kein Spin).
          ;[0, 60, 160, 360, 700, 1200].forEach((d) => timers.push(window.setTimeout(draw, d)))
          return
        }
        startLoop()
      })
      .catch(() => {
        /* cobe/WebGL nicht verfügbar → Hülle bleibt leer, kein Crash */
      })

    return () => {
      cancelled = true
      stopLoop()
      timers.forEach((t) => window.clearTimeout(t))
      resizeObserver.disconnect()
      io.disconnect()
      canvas.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      if (globe) {
        globe.destroy()
        // WebGL-Context aktiv freigeben (cobe.destroy() gibt ihn nicht frei) →
        // begrenzt die Context-Anzahl bei wiederholtem Routenwechsel. Nur wenn
        // cobe wirklich initialisiert hat (sonst würde getContext erst einen
        // Context ERZEUGEN, nur um ihn zu verlieren).
        try {
          const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
          gl?.getExtension('WEBGL_lose_context')?.loseContext()
        } catch {
          /* Context evtl. schon verloren – ignorieren */
        }
      }
    }
  }, [])

  return (
    <div className={cn('relative', className)}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="h-full w-full"
        style={{ opacity: 0, cursor: 'grab', touchAction: 'pan-y' }}
      />
    </div>
  )
}
