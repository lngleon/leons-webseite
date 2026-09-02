import { clsx } from 'clsx'

/**
 * Feld-Optik der Formulare an EINER Stelle – `ContactForm` (freies Formular)
 * und `AnfrageFlow` (geführter Fragebogen) stehen direkt nebeneinander und
 * müssen deshalb pixelgleich aussehen.
 *
 * Muster laut DESIGN-SYSTEM §8 (Formular): Label außerhalb, Feld 8 px Radius,
 * neutraler Rand, Fokus → Akzent-Rand + Ring, Fehler → `--destructive`-Rand
 * (die Meldung samt Icon setzt die jeweilige Komponente).
 */
export const fieldBase =
  'w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring'

export function fieldClass(hasError: boolean) {
  return clsx(
    fieldBase,
    hasError ? 'border-destructive' : 'border-border focus:border-accent',
  )
}
