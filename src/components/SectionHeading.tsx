import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  /** Kleine Akzent-Zeile über dem Titel (optional). */
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  className?: string
}

/** Wiederverwendbare Sektions-Überschrift für die Single-Page. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <span className="accent-gradient-text text-xs font-medium uppercase tracking-[0.2em]">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}
