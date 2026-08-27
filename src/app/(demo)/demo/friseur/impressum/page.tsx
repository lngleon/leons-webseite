import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoLegalPage from '@/components/demo/DemoLegalPage'
import { friseurWirbel } from '@/data/demo/friseur-wirbel'

/**
 * Impressum als eigene Seite, nur im Fuß verlinkt.
 *
 * Der Musterhinweis (`legal.note`) steht sichtbar über den Angaben: der Betrieb
 * ist erfunden – und diesmal auch die drei Personen auf „Über uns", was der
 * Hinweis ausdrücklich sagt. Er nennt ausserdem, was ein echter Friseurbetrieb
 * hier zusätzlich führen müsste (Handwerkskammer, Berufsbezeichnung samt
 * Verleihungsstaat); für die Demo stehen dort Platzhalter.
 */
export const metadata: Metadata = {
  title: `${friseurWirbel.legal.title} – ${friseurWirbel.name}`,
  description: friseurWirbel.legal.note,
}

export default function FriseurDemoImprintPage() {
  return (
    <DemoShell business={friseurWirbel} current="imprint">
      <DemoLegalPage title={friseurWirbel.legal.title} note={friseurWirbel.legal.note}>
        <div className="space-y-1.5 text-[0.95rem] leading-relaxed text-foreground">
          {friseurWirbel.legal.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </DemoLegalPage>
    </DemoShell>
  )
}
