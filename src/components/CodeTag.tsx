import type { ReactNode } from 'react'

/**
 * Inline-„Code-Tag" für echte Tech-/Fach-Begriffe im Fließtext.
 * Rein dekorativ (kein Button, keine Semantik/aria, kein Link): ein <span> in
 * Mono mit dezentem, FLACHEM Akzent-Hintergrund/-Rahmen (--accent-Tokens, KEIN
 * Gradient), klein, vertikal mittig, ohne Zeilenumbruch-Bruch. Liest als Tag.
 */
export default function CodeTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block whitespace-nowrap rounded-md border border-accent/25 bg-accent/10 px-1.5 py-px align-middle font-mono text-[0.85em] leading-none text-foreground">
      {children}
    </span>
  )
}

/**
 * Markiert in `text` genau die angegebenen `terms` (Ganzwort) als CodeTag und
 * lässt den Rest unverändert. Nichts erzwingen: kommt ein Term nicht vor,
 * bleibt der Text unangetastet. Verändert NICHT die Datenquelle (rein im Render).
 */
export function withCodeTags(text: string, terms: string[]): ReactNode[] {
  if (!terms.length) return [text]
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const re = new RegExp(`(\\b(?:${escaped.join('|')})\\b)`, 'g')
  return text
    .split(re)
    .map((part, i) =>
      terms.includes(part) ? <CodeTag key={i}>{part}</CodeTag> : part,
    )
}
