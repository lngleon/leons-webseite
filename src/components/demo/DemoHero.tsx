import type { GastroBusiness } from '@/data/demo/types'
import DemoPhoto from './DemoPhoto'

/**
 * Kopf der Demo-Seite: Betriebsart, sehr grosser Versalien-Name, Tagline,
 * Intro – und das Hauptfoto.
 *
 * Auf dem Handy stehen die Teile untereinander (so war der Kopf ursprünglich
 * entworfen). Ab 60 rem greift `.demo-kopf` und stellt Text und Foto
 * nebeneinander: vorher lief die schmale Spalte auf 1440 px einfach weiter und
 * liess rechts die halbe Seite leer.
 *
 * Die Trennlinie zwischen Tagline und Intro ist am 02.09.2026 entfallen. Der
 * Eyebrow über dem Namen leistet dasselbe – ein Abschnitt, der schon ein Label
 * trägt, braucht keinen zweiten Strich (Prinzip aus der Vorbild-Recherche:
 * kleines Versalien-Label statt Deko-Linie).
 *
 * Die Obergrenze des Namens ist 8.25rem und nicht mehr 9rem: im Zweispalter ist
 * die linke Spalte rund 580 px breit, und der längste Betriebsname im Repo
 * („Wirbel", 6 Zeichen) braucht bei Fraunces etwa 3.94 px Breite je px
 * Schriftgrösse. 132 px Schriftgrad ergeben 520 px – 60 px Reserve. Mit den
 * ursprünglichen 144 px stand das „L" auf 4 px genau an der Spaltenkante (im
 * Browser nachgemessen); die nächste Schriftversion hätte umgebrochen.
 * Bei schmalen Fenstern gewinnt weiterhin der vw-Wert, die Handy-Fassung
 * ändert sich also nicht.
 */
export default function DemoHero({ business }: { business: GastroBusiness }) {
  return (
    <header className="demo-abschnitt">
      <div className="demo-bahn demo-kopf">
        <div>
          <p className="demo-eyebrow">{business.kind}</p>

          <h1
            className="demo-display mt-4 text-foreground"
            style={{ fontSize: 'clamp(3.25rem, 22vw, 8.25rem)' }}
          >
            {business.displayName}
          </h1>

          <p
            className="demo-display demo-kopf__zeile mt-3 text-accent"
            style={{ fontSize: 'clamp(1rem, 4.6vw, 1.6rem)', letterSpacing: '0.06em' }}
          >
            {business.tagline}
          </p>

          <p className="demo-lese mt-7 text-[0.95rem] leading-relaxed text-muted-foreground">
            {business.intro}
          </p>
        </div>

        {/* `sizes` folgt den drei real gerenderten Breiten: im Zweispalter rund
            520 px, darunter die volle Bahn bzw. die Fensterbreite. */}
        <DemoPhoto
          photo={business.hero.photo}
          priority
          sizes="(min-width: 60rem) 520px, (min-width: 40rem) 768px, 100vw"
          className="demo-kopf__bild rounded-sm"
        />
      </div>
    </header>
  )
}
