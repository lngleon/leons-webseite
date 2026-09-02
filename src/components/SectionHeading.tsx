import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  /** Sektionsnummer ("01" …) vor dem Eyebrow – mono im warmen Verlauf (optional). */
  number?: string
  /** Kleine Akzent-Zeile über dem Titel (optional). */
  eyebrow?: string
  title: string
  description?: string
  align?: 'center' | 'left'
  /** Überschrift-Ebene. Default `h2` (Sektion einer Seite mit eigenem h1);
   *  `h1` für Seiten, deren Kern-Überschrift dieser Kopf selbst IST (z.B. /moeglichkeiten). */
  as?: 'h1' | 'h2'
  className?: string
}

/** Wiederverwendbare Sektions-Überschrift für die Single-Page. */
export default function SectionHeading({
  number,
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
      {(eyebrow || number) && (
        <span className="flex items-baseline gap-2.5 font-mono text-xs font-medium uppercase tracking-[0.2em]">
          {number && <span className="warm-gradient-text">{number}</span>}
          {eyebrow && <span className="accent-gradient-text">{eyebrow}</span>}
        </span>
      )}
      <Heading className="font-display mt-3 max-w-2xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
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
