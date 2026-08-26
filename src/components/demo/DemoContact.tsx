import type { GastroBusiness } from '@/data/demo/types'
import DemoSection from './DemoSection'

/**
 * Kontakt: Telefonnummer zum Antippen und eine vorbereitete Reservierungs-Mail.
 *
 * Bewusst KEIN Formular und kein Tischsystem (Non-Goal) – im Laden am Handy
 * sind ein Anruf und eine vorausgefüllte Mail der kürzeste Weg. Beide Flächen
 * sind mindestens 48 px hoch, damit sie sich mit dem Daumen sicher treffen lassen.
 */
export default function DemoContact({ business }: { business: GastroBusiness }) {
  const { contact } = business
  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(
    contact.reservation.subject,
  )}&body=${encodeURIComponent(contact.reservation.body)}`

  return (
    <DemoSection id="kontakt" title={contact.title}>
      <p className="mt-6 max-w-prose text-[0.95rem] leading-relaxed text-muted-foreground">
        {contact.reservation.note}
      </p>

      <div className="mt-8 flex flex-col gap-3">
        <a
          href={`tel:${contact.phone.e164}`}
          className="group flex min-h-16 items-center justify-between gap-4 border border-border bg-card px-5 transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span>
            <span className="demo-eyebrow block text-[0.6rem]">Anrufen</span>
            <span className="demo-price mt-0.5 block text-lg font-medium text-foreground">
              {contact.phone.display}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="text-xl text-accent transition-transform group-hover:translate-x-0.5"
          >
            ↗
          </span>
        </a>

        <a
          href={mailto}
          className="group flex min-h-16 items-center justify-between gap-4 border border-accent bg-accent px-5 text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span>
            <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.22em] opacity-80">
              {contact.reservation.label}
            </span>
            <span className="mt-0.5 block text-base font-medium">
              {contact.email}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="text-xl transition-transform group-hover:translate-x-0.5"
          >
            ↗
          </span>
        </a>
      </div>
    </DemoSection>
  )
}
