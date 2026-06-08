import { ArrowRight } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

/**
 * „Seriöser" Hover-Button (Magic-UI-Vorlage, on-brand): der Punkt wächst zum
 * gefüllten Akzent-Hintergrund, das Label gleitet weg und ein zweites Label mit
 * Pfeil gleitet herein – ruhig und edel.
 *
 * Fremd-Tokens gemappt: `bg-primary` → `bg-accent-solid`,
 * `text-primary-foreground` → `text-accent-foreground`, Rahmen über `--border`
 * (`border-border`), Fläche `bg-background`. Reine CSS-Transition (SSR-sicher);
 * der Hover ist via Tailwind an `@media (hover: hover)` gekoppelt.
 */
export function InteractiveHoverButton({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'group relative w-auto cursor-pointer overflow-hidden rounded-full border border-border bg-background p-2 px-6 text-center font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        <div className="h-2 w-2 rounded-full bg-accent-solid transition-all duration-300 group-hover:scale-[100.8]" />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-accent-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
        <span>{children}</span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </button>
  )
}
