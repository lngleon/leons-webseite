import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children: ReactNode
  vertical?: boolean
  repeat?: number
}

/**
 * Endlos laufendes Laufband (Magic-UI-Vorlage, on-brand integriert).
 *
 * Reine CSS-Animation über die Keyframes `marquee` / `marquee-vertical` und die
 * Utilities `animate-marquee(-vertical)` – beides in index.css ergänzt (in der
 * Vorlage nicht enthalten). Dadurch SSR-/hydration-sicher (kein JS-State).
 * `prefers-reduced-motion` friert das Band statisch ein (Gate in index.css).
 * `pauseOnHover` greift via Tailwind nur auf Geräten mit echtem Zeiger
 * (`@media (hover: hover)`). Tokens-frei – die Inhalte bringen die Akzentfarben mit.
 */
export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        'group flex gap-(--gap) overflow-hidden p-2 [--duration:40s] [--gap:1rem]',
        {
          'flex-row': !vertical,
          'flex-col': vertical,
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn('flex shrink-0 justify-around gap-(--gap)', {
              'animate-marquee flex-row': !vertical,
              'animate-marquee-vertical flex-col': vertical,
              'group-hover:[animation-play-state:paused]': pauseOnHover,
              '[animation-direction:reverse]': reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  )
}
