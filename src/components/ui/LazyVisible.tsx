'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

/**
 * Hängt seinen Inhalt erst in den Baum, wenn er sich dem Sichtfeld NÄHERT.
 *
 * Gebaut für die schweren Effekte unterhalb des Falzes auf `/moeglichkeiten`
 * (Dot-Globe und Funken-Canvas). Gemessen kosteten die beiden zusammen rund
 * 400 ms Total Blocking Time – und zwar beim Seitenaufbau, zwei Bildschirme
 * bevor sie überhaupt zu sehen sind. Beide pausieren ihre rAF-Schleifen zwar
 * schon selbst, sobald sie ausserhalb des Sichtfelds liegen; was blieb, war
 * der MOUNT: cobe nachladen, WebGL-Context erzeugen, Textur dekodieren,
 * Partikel anlegen. Das lässt sich nicht pausieren, nur verschieben.
 *
 * **Kein Effekt verschwindet.** Verschoben wird ausschliesslich der Zeitpunkt.
 *
 * Vier Eigenschaften, die die Grenzen des Projekts einhalten:
 *
 * 1. **SSR-sicher.** Gerendert wird auf dem Server und im ersten Client-Frame
 *    exakt dasselbe: der leere Rahmen. `sichtbar` startet konstant auf `false`,
 *    kein `window` im Render – Server-Frame gleich erstes Client-Frame, genau
 *    wie es die Hydration-Regel verlangt.
 * 2. **CLS 0.** Diese Komponente reserviert selbst KEINEN Platz und soll es
 *    auch nicht: die Grössenangabe bleibt aussen am umgebenden Element stehen,
 *    das der Server ohnehin rendert. Der Rahmen hier ist nur ein Anker für den
 *    Observer und füllt, was ihm gegeben wird.
 * 3. **Kein Aufblitzen.** `rootMargin` ist mit 800 px bewusst grosszügig – gut
 *    einen Mobil-Bildschirm im Voraus. Der Inhalt ist da, bevor er ins Bild
 *    kommt; wer scrollt, sieht kein Nachladen.
 * 4. **Kein Ausschluss.** Ohne `IntersectionObserver` (sehr alte Browser) wird
 *    sofort gemountet. Lieber die alte Ladezeit als ein fehlender Inhalt.
 *
 * Bewusst NICHT `loading="lazy"`-Semantik mit Platzhalterbild und bewusst kein
 * Timer: ein Timer lädt auch das, was nie gesehen wird, und ein Platzhalterbild
 * wäre ein zweites Motiv, das zum echten nicht passt.
 */
export default function LazyVisible({
  children,
  className,
  rootMargin = '800px',
}: {
  children: ReactNode
  className?: string
  /** Vorlauf vor dem Sichtfeld. Grosszügig, damit nichts nachlädt, was man sieht. */
  rootMargin?: string
}) {
  const ankerRef = useRef<HTMLDivElement>(null)
  const [sichtbar, setSichtbar] = useState(false)

  useEffect(() => {
    const el = ankerRef.current
    if (!el || sichtbar) return

    if (typeof IntersectionObserver === 'undefined') {
      setSichtbar(true)
      return
    }

    const io = new IntersectionObserver(
      (eintraege) => {
        if (eintraege.some((e) => e.isIntersecting)) {
          setSichtbar(true)
          io.disconnect()
        }
      },
      { rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin, sichtbar])

  return (
    <div ref={ankerRef} className={className}>
      {sichtbar ? children : null}
    </div>
  )
}
