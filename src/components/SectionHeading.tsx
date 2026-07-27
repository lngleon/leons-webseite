import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  /** Kleine Akzent-Zeile über dem Titel (optional). */
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  /** Überschrift-Ebene. Default `h2` (Sektion einer Seite mit eigenem h1);
   *  `h1` für Seiten, deren Kern-Überschrift dieser Kopf selbst IST (z.B. /möglichkeiten). */
  as?: 'h1' | 'h2'
  className?: string
}

/** Wiederverwendbare Sektions-Überschrift für die Single-Page. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  as: Heading = 'h2',
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
      <Heading className="mt-3 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </Heading>
      {description && (
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}
