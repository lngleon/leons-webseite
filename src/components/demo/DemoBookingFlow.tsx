'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import type { BookingDemo } from '@/data/demo/types'
import type { BookingDayView } from './booking'

/**
 * Die Reservierungs-ATTRAPPE – die EINZIGE Datei im Demo-Baum mit
 * `'use client'`.
 *
 * Sie tut nichts. Kein `fetch`, kein `sendBeacon`, keine Mail, kein
 * `localStorage`, keine URL-Änderung: der ganze Zustand lebt in `useState` und
 * ist beim Neuladen weg. Der Abschluss ist ein lokal gerenderter Bildschirm.
 *
 * Warum die Ausnahme überhaupt: eine fünfschrittige Strecke, die die Eingaben
 * mitzählt und am Ende einen getippten Namen spiegelt, geht ohne eigenen Code
 * nicht. Reine CSS-Lösungen (Radios plus `:has()`) kommen bis Schritt 3 – aber
 * genau der Moment, in dem die Bestätigung den eingetippten Namen trägt, ist
 * das, was im Verkaufsgespräch zieht. Deshalb hier eine Insel, und sonst
 * nirgends: `DemoShell`, `DemoNav`, `DemoSection` und alle zwölf anderen
 * Demo-Seiten bleiben Server-Komponenten ohne eigenen Client-Code.
 *
 * Grenzen, die diese Datei einhält:
 * - Nur `useState`, `useRef`, `useEffect`, `useId` (plus `flushSync`, siehe
 *   `weiter()`).
 * - Startzustand KONSTANT (`schritt = 1`, alles andere `null`/`{}`) → der
 *   Server-Frame ist gleich dem ersten Client-Frame (Hydration-Regel).
 * - Kein `window`/`document`/`Date`/`Math.random`/`Intl` im Render;
 *   `matchMedia` und `document` ausschliesslich im Effekt bzw. im Handler.
 * - Kein `framer-motion` und kein `useReducedMotionSafe` (der Hook zieht
 *   framer mit); Übergänge sind ein CSS-Keyframe mit reduced-motion-Gate.
 * - Kein `next/link` (Client-Komponente samt Prefetch), kein `useRouter`.
 * - **Keine Tailwind-Utility, die es im Repo nicht ohnehin schon gibt.**
 *   Tailwind v4 baut EINEN Utility-Chunk für die ganze App; eine hier neu
 *   eingeführte Klasse änderte dessen Inhalts-Hash und damit auch die
 *   Auslieferung von Leons Hauptseite, die denselben Chunk lädt. Was die
 *   Attrappe an Optik braucht, steht deshalb in `demo.css` – inklusive der
 *   Screenreader-Klasse und der Breiten-Umschaltung. (Und die vermiedenen
 *   Klassennamen stehen hier bewusst nicht ausgeschrieben: Tailwind liest die
 *   Quellen als Text und findet sie auch im Kommentar.)
 * - Sie bekommt NIE das ganze `business`: sonst läge die komplette Speise- und
 *   Weinkarte als Flight-Payload im HTML dieser Seite – und es lüde dazu ein,
 *   hier doch wieder nach `slug` zu greifen.
 * - Kein deutscher UI-Text im Code. Auch der Schrittzähler, das Wort
 *   „(optional)" und die Uhrzeit-Endung kommen aus den Daten; sonst wäre eine
 *   Attrappe für einen zweiten Betrieb eben doch nicht „nur Daten".
 */
export default function DemoBookingFlow({
  copy,
  week,
  phone,
  email,
  contactHref,
}: {
  copy: BookingDemo
  week: BookingDayView[]
  phone: { display: string; e164: string }
  email: string
  /** Rückweg auf Schritt 1 – kommt fertig von der Server-Komponente, damit die
   *  Insel den `slug` nicht kennen muss (und niemand hier danach greift). */
  contactHref: string
}) {
  const [schritt, setSchritt] = useState(1)
  /**
   * Schritt 1 hat zwei Formen (exklusive Union in den Daten): Personenzahl
   * (Gastro) ODER Leistung (Salon, Barbier). Zwei getrennte Zustände statt
   * eines gemeinsamen `string | number`: so kann eine Personenzahl nie als
   * Leistungs-id gelesen werden und umgekehrt. Pro Betrieb lebt ohnehin nur
   * einer von beiden.
   */
  const [personen, setPersonen] = useState<number | null>(null)
  const [wahl, setWahl] = useState<string | null>(null)
  const [tagKey, setTagKey] = useState<string | null>(null)
  const [zeit, setZeit] = useState<{ serviceId: string; time: string } | null>(null)
  const [gast, setGast] = useState<Record<string, string>>({})
  const [fehler, setFehler] = useState<string | null>(null)

  const gid = useId()
  const kopfRef = useRef<HTMLHeadingElement>(null)
  // Ein Ref, kein State: das Setzen soll kein zusätzliches Render auslösen.
  const absicht = useRef(false)

  const schrittTexte = [copy.steps.party, copy.steps.day, copy.steps.time, copy.steps.guest]
  /** Vier Eingabeschritte plus die Bestätigung – nirgends als Zahl verdrahtet. */
  const gesamt = schrittTexte.length + 1
  const aktuell = schritt <= schrittTexte.length ? schrittTexte[schritt - 1] : null

  /**
   * Fokus auf die Überschrift des neuen Schritts – der einzige Mechanismus,
   * der den Wechsel ansagt. Eine zusätzliche `aria-live`-Region fiele sich mit
   * ihm ins Wort, und bewegt werden muss der Fokus ohnehin: der geklickte
   * Knopf verschwindet aus dem DOM, sonst fiele der Fokus auf `<body>`.
   *
   * `absicht` schützt vor dem Fokusklau beim ersten Mount UND vor dem
   * doppelten Effektlauf des StrictMode (steht in `next.config.ts` an).
   */
  useEffect(() => {
    if (!absicht.current) return
    absicht.current = false
    const el = kopfRef.current
    if (!el) return
    // Ohne `preventScroll` scrollt der Browser die Überschrift bündig an den
    // Viewport-Rand – und damit unter die beiden klebenden Reihen.
    el.focus({ preventScroll: true })
    const versatz = Number.parseFloat(getComputedStyle(el).scrollMarginTop) || 0
    if (el.getBoundingClientRect().top < versatz) {
      const reduziert = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollIntoView({ block: 'start', behavior: reduziert ? 'auto' : 'smooth' })
    }
  }, [schritt])

  function geheZu(n: number) {
    absicht.current = true
    setFehler(null)
    setSchritt(n)
  }

  const tag = week.find((t) => t.key === tagKey) ?? null
  const service = tag?.services.find((s) => s.id === zeit?.serviceId) ?? null

  /** Der Tageswechsel MUSS die Zeit verwerfen – sonst behauptet die
   *  Zusammenfassung „Samstag · Mittag", was es bei Glut nicht gibt. */
  function waehleTag(key: string) {
    setTagKey(key)
    setZeit(null)
    setFehler(null)
  }

  function weiter() {
    // Schritte 1–3: es gibt kein Feld, auf das der Fokus wandern könnte – die
    // Meldung trägt deshalb `role="alert"` und wird von dort angesagt.
    // Schritt 1 prüft die Form, die der Betrieb anbietet (Feldfrage).
    if (schritt === 1 && (copy.choices ? wahl === null : personen === null))
      return setFehler('personen')
    if (schritt === 2 && !tagKey) return setFehler('tag')
    if (schritt === 3 && !zeit) return setFehler('zeit')

    if (schritt === 4) {
      const fehlend = copy.fields.find((f) => f.required && !(gast[f.id] ?? '').trim())
      if (fehlend) {
        /**
         * `flushSync` ist hier nicht Zierde: React bündelt das `setFehler` bis
         * zum Ende des Handlers. Ohne den erzwungenen Commit landete der Fokus
         * auf einem Feld, das in diesem Moment weder `aria-invalid` noch
         * `aria-describedby` trägt und dessen Fehlerabsatz noch gar nicht im
         * DOM steht – Screenreader berechnen die Beschreibung beim
         * Fokus-Ereignis und verschluckten die Meldung genau dann.
         */
        flushSync(() => setFehler(fehlend.id))
        document.getElementById(`${gid}-${fehlend.id}`)?.focus()
        return
      }
    }
    geheZu(schritt + 1)
  }

  function vonVorn() {
    setPersonen(null)
    setWahl(null)
    setTagKey(null)
    setZeit(null)
    setGast({})
    geheZu(1)
  }

  const zaehler = copy.stepCounterLabel
    .replace('{n}', String(schritt))
    .replace('{gesamt}', String(gesamt))
  /**
   * Was Schritt 1 ergeben hat, als EIN Text für Zusammenfassung und
   * Bestätigung – „2 Personen" oder „Herrenschnitt", je nach Form.
   */
  const personenText = copy.choices
    ? (copy.choices.find((c) => c.id === wahl)?.label ?? '')
    : personen === null
      ? ''
      : `${personen} ${personen === 1 ? copy.partyUnit.one : copy.partyUnit.other}`

  return (
    <form
      /**
       * `method="dialog"` ohne `<dialog>`-Vorfahr bricht die Submission laut
       * HTML-Spezifikation ab. Das ist der Gürtel zum Hosenträger: Sollte der
       * Insel-Chunk einmal gar nicht laden, während JavaScript AN ist (dann
       * greift `noscript` nicht), lädt die Enter-Taste im Namensfeld trotzdem
       * nicht die Seite neu.
       */
      method="dialog"
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        weiter()
      }}
      className="demo-buchung"
    >
      {/* Fortschritt: reine Dekoration. Der Zähler steht bereits in der
          Überschrift; fünf zusätzliche Listeneinträge wären nur Wiederholung. */}
      <div className="demo-buchung__fortschritt" aria-hidden="true">
        {Array.from({ length: gesamt }, (_, i) => i + 1).map((n) => (
          <span
            key={n}
            data-zustand={n === schritt ? 'aktuell' : n < schritt ? 'fertig' : 'offen'}
          />
        ))}
      </div>

      {/* Zurück steht im Markup VOR der Überschrift: Shift+Tab von der frisch
          fokussierten Überschrift landet damit auf dem Rückweg. */}
      <div className="demo-buchung__zurueck-zeile">
        {schritt > 1 ? (
          <button
            type="button"
            className="demo-buchung__zurueck"
            onClick={() => geheZu(schritt - 1)}
          >
            <span aria-hidden="true">←</span>
            {copy.backLabel}
          </button>
        ) : (
          <a href={contactHref} className="demo-buchung__zurueck">
            <span aria-hidden="true">←</span>
            {copy.backToContactLabel}
          </a>
        )}
      </div>

      <div className="demo-buchung__buehne">
        <div key={schritt} className="demo-buchung__schritt">
          <h2 ref={kopfRef} tabIndex={-1} className="demo-buchung__kopf">
            <span className="demo-eyebrow demo-buchung__zaehler block">{zaehler}</span>
            <span
              className="demo-display block text-foreground"
              style={{ fontSize: 'clamp(1.5rem, 7vw, 2.25rem)' }}
            >
              {aktuell ? aktuell.title : copy.done.title}
            </span>
          </h2>

          {/* Kennzeichnung Ebene 3: je Schritt ein ANDERER Satz. Fünfmal
              derselbe wird ab Schritt zwei nicht mehr gelesen. */}
          {aktuell ? <p className="demo-buchung__notiz">{aktuell.note}</p> : null}

          {/* Schritt 1 in der Form, die der Betrieb anbietet: Leistungs-Kacheln
              (Label links, Dauer/Preis rechts – dieselbe Zeilen-Kachel wie die
              Tage in Schritt 2) ODER das Personenzahl-Raster. Die Union in den
              Daten stellt sicher, dass genau eine der beiden Formen da ist. */}
          {schritt === 1 && copy.choices ? (
            <fieldset className="demo-buchung__feld mt-6">
              <legend className="demo-buchung__nur-sr">{copy.steps.party.title}</legend>
              <div className="demo-buchung__tage">
                {copy.choices.map((c) => (
                  <label key={c.id} className="demo-buchung__kachel">
                    <input
                      type="radio"
                      name={`${gid}-wahl`}
                      className="demo-buchung__nur-sr"
                      checked={wahl === c.id}
                      onChange={() => {
                        setWahl(c.id)
                        setFehler(null)
                      }}
                    />
                    <span className="demo-buchung__flaeche demo-buchung__tag-flaeche">
                      <span>{c.label}</span>
                      {c.note ? <span className="demo-buchung__tag">{c.note}</span> : null}
                    </span>
                  </label>
                ))}
              </div>
              {copy.choicesNote ? <p className="demo-buchung__zusatz">{copy.choicesNote}</p> : null}
              {fehler === 'personen' && copy.steps.party.error ? (
                <p className="demo-buchung__fehler" role="alert">
                  {copy.steps.party.error}
                </p>
              ) : null}
            </fieldset>
          ) : null}

          {schritt === 1 && copy.partySizes ? (
            <fieldset className="demo-buchung__feld mt-6">
              <legend className="demo-buchung__nur-sr">{copy.steps.party.title}</legend>
              <div className="demo-buchung__raster">
                {copy.partySizes.map((n) => (
                  <label key={n} className="demo-buchung__kachel">
                    <input
                      type="radio"
                      name={`${gid}-personen`}
                      className="demo-buchung__nur-sr"
                      checked={personen === n}
                      onChange={() => {
                        setPersonen(n)
                        setFehler(null)
                      }}
                    />
                    <span className="demo-buchung__flaeche">
                      <span className="demo-price text-lg">{n}</span>
                    </span>
                  </label>
                ))}
              </div>
              <p className="demo-buchung__zusatz">{copy.partyMore}</p>
              {fehler === 'personen' && copy.steps.party.error ? (
                <p className="demo-buchung__fehler" role="alert">
                  {copy.steps.party.error}
                </p>
              ) : null}
            </fieldset>
          ) : null}

          {schritt === 2 ? (
            <fieldset className="demo-buchung__feld mt-6">
              <legend className="demo-buchung__nur-sr">{copy.steps.day.title}</legend>
              <div className="demo-buchung__tage">
                {week.map((t) =>
                  t.services.length ? (
                    <label key={t.key} className="demo-buchung__kachel">
                      <input
                        type="radio"
                        name={`${gid}-tag`}
                        className="demo-buchung__nur-sr"
                        checked={tagKey === t.key}
                        onChange={() => waehleTag(t.key)}
                      />
                      <span className="demo-buchung__flaeche demo-buchung__tag-flaeche">
                        <span>{t.label}</span>
                        {/* Die Fensterzeile nur, wenn der Tag MEHRERE Fenster
                            hat („Mittag & Abend") – bei einem einzigen wäre sie
                            die Wiederholung des Wochentags in anderer Form
                            („Sonntag / Sonntag"). Dieselbe Regel wie in der
                            Bestätigung. */}
                        {t.services.length > 1 ? (
                          <span className="demo-buchung__tag">
                            {t.services.map((s) => s.short).join(' & ')}
                          </span>
                        ) : null}
                      </span>
                    </label>
                  ) : (
                    // Ruhetag: KEIN Bedienelement. `disabled` nähme ihn aus der
                    // Tabreihenfolge – ein Screenreader hörte eine lückenhafte
                    // Liste, ohne den Grund für die Lücke zu erfahren.
                    <span
                      key={t.key}
                      className="demo-buchung__flaeche demo-buchung__tag-flaeche demo-buchung__flaeche--weg"
                    >
                      <span>{t.label}</span>
                      <span className="demo-buchung__tag">{copy.closedLabel}</span>
                    </span>
                  )
                )}
              </div>
              <p className="demo-buchung__zusatz">{copy.dayNote}</p>
              {fehler === 'tag' && copy.steps.day.error ? (
                <p className="demo-buchung__fehler" role="alert">
                  {copy.steps.day.error}
                </p>
              ) : null}
            </fieldset>
          ) : null}

          {schritt === 3 && tag ? (
            <div className="mt-6">
              <p className="demo-buchung__legende">{copy.slotLegend}</p>
              {tag.services.map((s) => (
                <fieldset key={s.id} className="demo-buchung__feld mt-5">
                  {/* Spezifischer als die Überschrift, sonst hört man zweimal
                      dasselbe Wort. */}
                  <legend className="demo-buchung__nur-sr">{`${copy.steps.time.title} – ${tag.label}, ${s.short}, ${s.window}`}</legend>
                  <p className="demo-eyebrow text-[0.62rem]">
                    {s.short} · {s.window}
                  </p>
                  <div className="demo-buchung__raster mt-2">
                    {s.slots.map((slot) =>
                      slot.state === 'belegt' ? (
                        <span
                          key={`${s.id}-${slot.time}`}
                          className="demo-buchung__flaeche demo-buchung__flaeche--weg"
                        >
                          <span className="demo-price">{slot.time}</span>
                          <span className="demo-buchung__tag">{copy.slotStates.busy}</span>
                        </span>
                      ) : (
                        <label key={`${s.id}-${slot.time}`} className="demo-buchung__kachel">
                          <input
                            type="radio"
                            // Ein gemeinsamer `name` über beide Servicefenster:
                            // es soll genau EINE Zeit wählbar sein.
                            name={`${gid}-zeit`}
                            className="demo-buchung__nur-sr"
                            checked={zeit?.serviceId === s.id && zeit?.time === slot.time}
                            onChange={() => {
                              setZeit({ serviceId: s.id, time: slot.time })
                              setFehler(null)
                            }}
                          />
                          <span className="demo-buchung__flaeche">
                            <span className="demo-price">{slot.time}</span>
                            {slot.state === 'knapp' ? (
                              <span className="demo-buchung__tag">{copy.slotStates.tight}</span>
                            ) : null}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </fieldset>
              ))}
              {fehler === 'zeit' && copy.steps.time.error ? (
                <p className="demo-buchung__fehler" role="alert">
                  {copy.steps.time.error}
                </p>
              ) : null}
            </div>
          ) : null}

          {schritt === 4 ? (
            <div className="mt-6">
              <p className="demo-buchung__auswahl">
                {personenText} · {tag?.label} · {zeit?.time} {copy.timeSuffix}
              </p>
              <div className="mt-4 space-y-4">
                {copy.fields.map((f) => {
                  const id = `${gid}-${f.id}`
                  const hatFehler = fehler === f.id
                  const gemeinsam = {
                    id,
                    className: 'demo-buchung__input mt-1.5',
                    value: gast[f.id] ?? '',
                    // Pflichtfeld auch programmatisch auszeichnen – sonst ist es
                    // nur aus der ABWESENHEIT des Wortes „(optional)" zu
                    // erschliessen. `noValidate` am Formular hält die native
                    // Validierung trotzdem draussen.
                    required: f.required || undefined,
                    'aria-invalid': hatFehler || undefined,
                    'aria-describedby': hatFehler ? `${id}-fehler` : undefined,
                    onChange: (
                      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                    ) => {
                      setGast({ ...gast, [f.id]: e.target.value })
                      // Die Meldung verschwindet, sobald der Nutzer sie behebt –
                      // sonst bliebe `aria-invalid` stehen, während er tippt.
                      if (hatFehler) setFehler(null)
                    },
                  }
                  return (
                    <p key={f.id}>
                      <label htmlFor={id} className="demo-buchung__label">
                        {f.label}
                        {f.required ? null : (
                          <span className="demo-buchung__optional"> {copy.optionalLabel}</span>
                        )}
                      </label>
                      {f.multiline ? (
                        <textarea rows={3} {...gemeinsam} />
                      ) : (
                        <input type={f.type ?? 'text'} inputMode={f.inputMode} autoComplete={f.autoComplete} {...gemeinsam} />
                      )}
                      {hatFehler && f.error ? (
                        <span id={`${id}-fehler`} className="demo-buchung__fehler">
                          {f.error}
                        </span>
                      ) : null}
                    </p>
                  )
                })}
              </div>
            </div>
          ) : null}

          {schritt === 5 ? (
            <div className="mt-6">
              <p className="demo-buchung__haken" aria-hidden="true">
                ✓
              </p>

              <dl className="mt-5 border border-border bg-card px-4 py-3">
                {[
                  [copy.done.labels.party, personenText],
                  /* Das Servicefenster steht nur dabei, wenn der Tag MEHRERE
                     hat – dann unterscheidet es („Samstag · Abend"). Bei einem
                     einzigen Fenster wäre es eine Wiederholung des Wochentags
                     in anderer Form („Donnerstag · Di – Fr"). */
                  [
                    copy.done.labels.day,
                    `${tag?.label ?? ''}${service && (tag?.services.length ?? 0) > 1 ? ` · ${service.short}` : ''}`,
                  ],
                  [copy.done.labels.time, `${zeit?.time ?? ''} ${copy.timeSuffix}`],
                  [
                    copy.done.labels.guest,
                    (gast[copy.fields[0]?.id ?? ''] ?? '').trim() || copy.done.guestFallback,
                  ],
                ].map(([k, v]) => (
                  <div key={k} className="demo-leader py-2">
                    <dt className="text-muted-foreground">{k}</dt>
                    <span aria-hidden="true" className="demo-leader__fill" />
                    <dd className="font-medium text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="demo-hinweis mt-6">
                <strong className="block font-semibold text-foreground">
                  {copy.done.truth.title}
                </strong>
                <ul className="mt-2 space-y-1">
                  {copy.done.truth.points.map((punkt) => (
                    <li key={punkt} className="flex gap-2">
                      <span aria-hidden="true">·</span>
                      <span>{punkt}</span>
                    </li>
                  ))}
                </ul>
                <span className="mt-3 block text-accent">{copy.done.truth.outlook}</span>
              </div>

              <p className="demo-eyebrow mt-8">{copy.done.realTitle}</p>
              <div className="mt-3 flex flex-col gap-3">
                <a href={`tel:${phone.e164}`} className="demo-cta demo-cta--fill w-full">
                  {phone.display}
                </a>
                <a href={`mailto:${email}`} className="demo-cta w-full">
                  {email}
                </a>
              </div>

              <button type="button" className="demo-buchung__zurueck mt-6" onClick={vonVorn}>
                <span aria-hidden="true">↺</span>
                {copy.done.restartLabel}
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {aktuell ? (
        <div className="mt-8">
          {/* Genau EIN `type="submit"` je Schritt – sonst wäre die Enter-Taste
              im Namensfeld tot oder täte etwas Unerwartetes. */}
          <button type="submit" className="demo-cta demo-cta--fill w-full">
            {aktuell.action}
            <span aria-hidden="true">→</span>
          </button>
          {/* Kennzeichnung Ebene 4: UNTER dem Knopf, nicht darin. */}
          <p className="demo-buchung__knopfnotiz">{aktuell.actionNote}</p>
        </div>
      ) : null}
    </form>
  )
}
