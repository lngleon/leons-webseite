import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoLegalPage from '@/components/demo/DemoLegalPage'
import { barbierKlinge } from '@/data/demo/barbier-klinge'

/**
 * Impressum als eigene Seite, nur im Fuß verlinkt.
 *
 * Der Musterhinweis (`legal.note`) steht sichtbar über den Angaben: der
 * Betrieb ist erfunden, ebenso die drei Personen auf „Über uns". Er nennt
 * ausserdem, was ein echter Barbier (Friseurhandwerk) hier zusätzlich führen
 * müsste; für die Demo stehen dort Platzhalter.
 */
export const metadata: Metadata = {
  title: `${barbierKlinge.legal.title} – ${barbierKlinge.name}`,
  description: barbierKlinge.legal.note,
}

export default function BarbierDemoImprintPage() {
  return (
    <DemoShell business={barbierKlinge} current="imprint">
      <DemoLegalPage title={barbierKlinge.legal.title} note={barbierKlinge.legal.note}>
        <div className="space-y-1.5 text-[0.95rem] leading-relaxed text-foreground">
          {barbierKlinge.legal.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </DemoLegalPage>
    </DemoShell>
  )
}
