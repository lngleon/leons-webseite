import type { GastroBusiness } from '@/data/demo/types'
import DemoBookingFlow from './DemoBookingFlow'
import { buildBookingWeek } from './booking'
import { demoHref } from './routes'

/**
 * Server-Rahmen der Reservierungs-Attrappe: Vorschau-Band, Kopf, Hinweis – und
 * der Umschalter zwischen der Client-Insel und dem Ersatzstück ohne JavaScript.
 *
 * Der Rahmen bleibt Server-Komponente. `'use client'` färbt nur nach UNTEN ab;
 * eine Server-Komponente darf eine Client-Komponente einbinden, ohne selbst
 * eine zu werden. Deshalb liegt hier alles, was nicht zwingend im Browser
 * laufen muss – und die Insel bekommt nur fertige, kleine Props statt des
 * ganzen `business` (sonst läge die komplette Speise- und Weinkarte als
 * Flight-Payload im HTML dieser Seite).
 *
 * `if (!b) return null` ist die ganze Fallunterscheidung: eine Feldfrage, nie
 * „ist das ein Restaurant?".
 *
 * OHNE JAVASCRIPT: Beide Blöcke stehen im ausgelieferten HTML; umgeschaltet
 * wird rein per CSS. `demo.css` hält `.demo-buchung-ohne-js` auf `display:none`,
 * der `<style>` im `<noscript>` dreht das um und blendet dafür die Strecke aus.
 * Der Inhalt eines `<noscript>` wird nur dann als Markup geparst, wenn
 * Scripting AUS ist – es blitzt also in keiner der beiden Richtungen etwas auf,
 * weil die Regel schon beim Parsen im Dokument steht.
 *
 * `dangerouslySetInnerHTML` ist dabei nötig und nicht bequem: React legt für
 * `noscript` keine Kind-Fiber an; ein Element-Kind würde bei einem reinen
 * Client-Render still verschluckt – also ausgerechnet in der Lage, in der der
 * Ersatz gebraucht wird. Der Hinweistext selbst bleibt normales JSX aus den
 * Daten; nur die eine feste Regel steht im String.
 */
export default function DemoBooking({ business }: { business: GastroBusiness }) {
  const b = business.booking
  if (!b) return null

  const week = buildBookingWeek(business)
  const { contact } = business

  return (
    <>
      {/*
        Das klebende Band ist GESCHWISTER des Abschnitts, nicht Kind: `position:
        sticky` stirbt in einem Vorfahren mit `overflow-*` oder `transform`.
      */}
      <p className="demo-vorschau-band">{b.band}</p>

      <section className="px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        <div className="mx-auto max-w-2xl">
          <h1
            className="demo-display text-foreground"
            style={{ fontSize: 'clamp(2rem, 10vw, 3.5rem)' }}
          >
            {b.title}
          </h1>

          <p className="demo-hinweis mt-6">{b.hinweis}</p>

          <p className="mt-6 text-[0.95rem] leading-relaxed text-muted-foreground">{b.intro}</p>

          <noscript
            dangerouslySetInnerHTML={{
              __html:
                '<style>.demo-buchung-live{display:none}.demo-buchung-ohne-js{display:block}</style>',
            }}
          />

          <div className="demo-buchung-live mt-8">
            <DemoBookingFlow
              copy={b}
              week={week}
              phone={contact.phone}
              email={contact.email}
              contactHref={demoHref(business.slug, 'contact')}
            />
          </div>

          <div className="demo-buchung-ohne-js mt-8">
            <h2
              className="demo-display text-foreground"
              style={{ fontSize: 'clamp(1.5rem, 7vw, 2.25rem)' }}
            >
              {b.noscript.title}
            </h2>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
              {b.noscript.body}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a href={`tel:${contact.phone.e164}`} className="demo-cta demo-cta--fill w-full">
                {contact.phone.display}
              </a>
              <a href={`mailto:${contact.email}`} className="demo-cta w-full">
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
