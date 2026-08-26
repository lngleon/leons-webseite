import type { GastroBusiness } from '@/data/demo/types'
import DemoPhoto from './DemoPhoto'
import { demoHref } from './routes'

/**
 * „Über uns": Lead, danach Blöcke im Bild-Text-Wechsel, zum Schluss zwei Links
 * auf Karte und Kontakt.
 *
 * Der Wechsel läuft über den Index: gerade Blöcke haben das Bild links, ungerade
 * rechts. Ab `md` stehen Bild und Text nebeneinander, darunter gestapelt (Bild
 * oben) – auf einem Handy ist eine zweispaltige Aufteilung bei 350 px Spalte
 * nicht lesbar.
 *
 * Auf dem Desktop wird das Bild rechts per `order` umgestellt, nicht per zweitem
 * Markup-Zweig: so steht im Quelltext IMMER erst das Bild und dann der Text,
 * und die Vorlesereihenfolge bleibt über alle Blöcke gleich.
 */
export default function DemoAbout({ business }: { business: GastroBusiness }) {
  const { about } = business

  return (
    <>
      <header className="px-5 pb-2 pt-10 sm:px-8 sm:pt-14">
        <div className="mx-auto max-w-3xl">
          <h1
            className="demo-display text-foreground"
            style={{ fontSize: 'clamp(2.25rem, 12vw, 4.5rem)' }}
          >
            {about.title}
          </h1>
          <p className="mt-6 max-w-prose text-[1.05rem] leading-relaxed text-muted-foreground">
            {about.lead}
          </p>
        </div>
      </header>

      {about.blocks.map((block, index) => {
        const bildRechts = index % 2 === 1
        return (
          <section
            key={block.id}
            aria-labelledby={`ueber-${block.id}`}
            className="border-t border-border px-5 py-12 sm:px-8 sm:py-16"
          >
            <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2 md:items-center md:gap-10">
              <DemoPhoto
                photo={block.photo}
                sizes="(min-width: 768px) 364px, 100vw"
                className={bildRechts ? 'rounded-sm md:order-2' : 'rounded-sm'}
              />
              <div>
                <h2
                  id={`ueber-${block.id}`}
                  className="demo-display text-foreground"
                  style={{ fontSize: 'clamp(1.5rem, 7vw, 2.1rem)' }}
                >
                  {block.title}
                </h2>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {block.text}
                </p>
              </div>
            </div>
          </section>
        )
      })}

      <section
        aria-label={about.title}
        className="border-t border-border px-5 py-12 sm:px-8 sm:py-16"
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row">
          <a href={demoHref(business.slug, 'menu')} className="demo-cta demo-cta--fill">
            {about.outro.menuLabel}
            <span aria-hidden="true">→</span>
          </a>
          <a href={demoHref(business.slug, 'contact')} className="demo-cta">
            {about.outro.contactLabel}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </>
  )
}
