import type { GastroBusiness } from '@/data/demo/types'
import DemoSection from './DemoSection'

/**
 * Öffnungszeiten als schlichte Zeile-für-Zeile-Liste. Ruhetage stehen mit
 * „geschlossen" drin statt zu fehlen – im Laden ist genau das die Frage.
 */
export default function DemoHours({ business }: { business: GastroBusiness }) {
  return (
    <DemoSection id="zeiten" title={business.hours.title} note={business.hours.note}>
      <dl className="mt-8 divide-y divide-border">
        {business.hours.entries.map((entry) => (
          <div key={entry.label} className="demo-leader py-3">
            <dt className="font-medium text-foreground">{entry.label}</dt>
            <span aria-hidden="true" className="demo-leader__fill" />
            <dd
              className={
                entry.closed
                  ? 'demo-price text-muted-foreground'
                  : 'demo-price font-medium text-foreground'
              }
            >
              {entry.closed ? 'geschlossen' : `${entry.opens} – ${entry.closes}`}
            </dd>
          </div>
        ))}
      </dl>
    </DemoSection>
  )
}
