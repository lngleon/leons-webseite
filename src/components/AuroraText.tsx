import type { ReactNode } from 'react'

/**
 * Inline-„Aurora-Text" für EIN Headline-Akzentwort: derselbe Violett-Gradient
 * wie `.accent-gradient-text`, nur fließend – der Verlauf wandert langsam.
 *
 * Bewusst KEINE Framer-Motion: der Effekt läuft als reine CSS-@keyframes
 * (background-position auf einem verbreiterten Gradient, siehe `.aurora-text`
 * in index.css). Dadurch SSR-/hydration-sicher und durchgehend sichtbar (LCP) –
 * das Wort wird sofort als solider Fallback (`var(--accent)`) gemalt und nur dort,
 * wo `background-clip:text` unterstützt wird, in den Verlauf geclippt.
 * `prefers-reduced-motion` friert auf den jetzigen statischen Gradient ein.
 *
 * Ausschließlich Violett: nutzt `--accent-gradient` (Source-of-Truth) verbatim,
 * keine eigenen Farbwerte. API analog Magic UI: `<AuroraText>Wort</AuroraText>`.
 * Bewusst NUR am Hero-Akzentwort einsetzen – nicht auf Eyebrows, Hero-Zähler
 * oder andere Gradient-Stellen (die bleiben statisch via `.accent-gradient-text`).
 */
export default function AuroraText({ children }: { children: ReactNode }) {
  return <span className="aurora-text">{children}</span>
}
