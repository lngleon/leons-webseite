import type { Metadata } from 'next'
import DemoShell from '@/components/demo/DemoShell'
import DemoLegalPage from '@/components/demo/DemoLegalPage'
import { cafeKlee } from '@/data/demo/cafe-klee'

/**
 * Impressum als eigene Seite. Inhalt unverändert aus `cafe-klee.ts` – bis zur
 * Aufteilung stand derselbe Block als Fuß auf jeder Seite.
 *
 * Der Musterhinweis (`legal.note`) steht sichtbar über den Angaben: der Betrieb
 * ist erfunden, das darf im Kundengespräch nicht untergehen.
 */
export const metadata: Metadata = {
  title: `${cafeKlee.legal.title} – ${cafeKlee.name}`,
  description: cafeKlee.legal.note,
}

export default function CafeDemoImprintPage() {
  return (
    <DemoShell business={cafeKlee} current="imprint">
      <DemoLegalPage title={cafeKlee.legal.title} note={cafeKlee.legal.note}>
        <div className="space-y-1.5 text-[0.95rem] leading-relaxed text-foreground">
          {cafeKlee.legal.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </DemoLegalPage>
    </DemoShell>
  )
}
