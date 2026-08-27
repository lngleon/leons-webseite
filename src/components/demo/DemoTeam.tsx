import type { GastroBusiness } from '@/data/demo/types'
import DemoPhoto from './DemoPhoto'

/**
 * Die Mitarbeiter des Betriebs als Raster – Bild, Rolle, Name, ein kurzer Satz.
 *
 * Steht auf „Über uns" ZWISCHEN den Erzählblöcken und dem Abbinder, gerendert
 * aus `DemoAbout` heraus. Bewusst keine eigene Seite: die Navigations-Pille
 * trägt keinen fünften Eintrag (gemessen, siehe `routes.ts`), und die Frage
 * „wer arbeitet hier?" ist ohnehin ein Teil von „wer sind wir?".
 *
 * Warum ein Raster und nicht der Bild-Text-Wechsel der Blöcke darüber: Blöcke
 * erzählen nacheinander, jeder etwas anderes. Mitarbeiter sind gleichrangig
 * und werden verglichen – im Wechsel bekäme die erste Person eine halbe Seite,
 * die letzte den Rest, und die Reihenfolge läse sich als Rangfolge.
 *
 * Reihenfolge im Markup: Bild, dann Rolle, dann Name, dann Text. Die Rolle
 * steht ÜBER dem Namen wie das Eyebrow über jeder Überschrift dieser Seiten –
 * wer die Seite überfliegt, sucht zuerst „wer macht Farbe?" und erst dann den
 * Namen dazu.
 *
 * Zwei Spalten ab `sm`, darunter gestapelt: bei 320 px wäre eine zweite Spalte
 * rund 140 px breit, das trägt weder Porträt noch Satz.
 */
export default function DemoTeam({ business }: { business: GastroBusiness }) {
  const { team } = business
  if (!team) return null

  return (
    <section
      aria-labelledby="team-titel"
      className="border-t border-border px-5 py-12 sm:px-8 sm:py-16"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="team-titel"
          className="demo-display text-foreground"
          style={{ fontSize: 'clamp(1.5rem, 7vw, 2.1rem)' }}
        >
          {team.title}
        </h2>

        {team.lead ? (
          <p className="mt-4 max-w-prose text-[0.95rem] leading-relaxed text-muted-foreground">
            {team.lead}
          </p>
        ) : null}

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {team.members.map((member) => (
            <article key={member.id} aria-labelledby={`team-${member.id}`}>
              <DemoPhoto
                photo={member.photo}
                sizes="(min-width: 640px) 372px, 100vw"
                className="rounded-sm"
              />
              <p className="demo-eyebrow mt-4 text-[0.6rem]">{member.role}</p>
              <h3
                id={`team-${member.id}`}
                className="demo-display mt-1 text-foreground"
                style={{ fontSize: 'clamp(1.15rem, 5vw, 1.45rem)' }}
              >
                {member.name}
              </h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-muted-foreground">
                {member.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
