import type { GastroBusiness } from '@/data/demo/types'
import { Marquee } from '@/components/ui/Marquee'

/**
 * Das eine bewegte Element der Seite: ein Laufband mit den Kurzversprechen
 * aus den Daten.
 *
 * Nutzt bewusst die bestehende `Marquee`-Komponente – die läuft über reine
 * CSS-Keyframes und ist in `globals.css` bereits gegen `prefers-reduced-motion`
 * abgesichert (`animation: none`), steht dann also still. Kein JS, kein State.
 */
export default function DemoMarquee({ business }: { business: GastroBusiness }) {
  return (
    <div className="demo-marquee-band relative z-10 border-y border-foreground/10 py-3">
      <Marquee className="[--duration:34s] [--gap:2.5rem] p-0">
        {business.marquee.map((line) => (
          <span key={line} className="demo-marquee-item text-[0.78rem] sm:text-sm">
            {line}
            <span aria-hidden="true" className="ml-10 opacity-60">
              ✳
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  )
}
