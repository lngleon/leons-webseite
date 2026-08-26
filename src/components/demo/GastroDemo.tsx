import type { GastroBusiness } from '@/data/demo/types'
import DemoGrain from './DemoGrain'
import DemoHero from './DemoHero'
import DemoMarquee from './DemoMarquee'
import DemoMenu from './DemoMenu'
import DemoHours from './DemoHours'
import DemoLocation from './DemoLocation'
import DemoContact from './DemoContact'
import DemoLegal from './DemoLegal'
import { buildRestaurantSchema } from './schema'

/**
 * Die komplette Gastro-Demoseite – rein datengetrieben.
 *
 * Bekommt EIN `GastroBusiness` und rendert daraus alles: Kopf, Laufband, Karte,
 * Zeiten, Anfahrt, Kontakt, Impressum und das schema.org-Markup. Für einen
 * zweiten Betrieb genügt eine zweite Datendatei plus eine `page.tsx`, die sie
 * hier hineinreicht – an dieser Komponente ändert sich nichts.
 *
 * Bewusst KEINE Client-Komponente: die Seite braucht kein JavaScript.
 * Telefon, Route und Reservierung sind normale Links, das Laufband läuft über
 * CSS. Auf einem Handy im Laden ist das der robusteste Weg.
 */
export default function GastroDemo({ business }: { business: GastroBusiness }) {
  const schema = buildRestaurantSchema(business)

  return (
    <div className="demo-scope relative min-h-dvh">
      <DemoGrain />

      {/* schema.org: Restaurant + Menu. `<` wird escaped, damit der JSON-Inhalt
          das Script nicht vorzeitig schliessen kann. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\u003c'),
        }}
      />

      <div className="relative z-10">
        <DemoHero business={business} />
        <DemoMarquee business={business} />
        <main>
          <DemoMenu business={business} />
          <DemoHours business={business} />
          <DemoLocation business={business} />
          <DemoContact business={business} />
        </main>
        <DemoLegal business={business} />
      </div>
    </div>
  )
}
