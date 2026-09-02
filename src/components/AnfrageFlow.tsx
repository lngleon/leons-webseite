'use client'

import { useEffect, useId, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleAlert,
  CircleCheck,
  Loader2,
  Send,
} from 'lucide-react'
import { anfrageCopy, anfrageFragen } from '@/data/anfrage'
import type { AnfrageFrage } from '@/data/anfrage'
import { contactMessages } from '@/data/contact'
import { fieldClass } from '@/components/formField'
import { useReducedMotionSafe } from '@/hooks/useReducedMotionSafe'

/**
 * Der geführte Anfrage-Fragebogen der Kontakt-Sektion.
 *
 * Vier Fragen, dann der Kontaktschritt, dann die Bestätigung. Die Fragen
 * kommen vollständig aus `src/data/anfrage.ts`; hier steht nur die Mechanik.
 * Am Ende geht EINE Formspree-Sendung raus – dieselbe wie beim freien
 * Formular, nur mit den Antworten als zusätzlichen, deutsch beschrifteten
 * Feldern (sie werden in Leons Mail zu je einer Zeile).
 *
 * Hydration-Regel (CLAUDE.md): der Startzustand ist konstant (Schritt 1, keine
 * Auswahl), es gibt kein `window`/`document`/`Date`/`Math.random` im Render,
 * und die Schritt-Animation hängt an `useReducedMotionSafe` – nicht an framers
 * `useReducedMotion`.
 *
 * Der Schrittwechsel ist eine INTERAKTIONS-Animation (DESIGN-SYSTEM M3), also
 * per Hook gegated und nicht über `.entrance-anim`. Beim allerersten Rendern
 * darf er nicht laufen, sonst wäre er eine ungegatete Mount-Animation –
 * dafür das `bewegt`-Ref: es ist erst gesetzt, nachdem der Nutzer geklickt hat.
 */

type Status = 'idle' | 'sending' | 'error'
type KontaktFeld = 'name' | 'email' | 'message'
type KontaktFehler = Partial<Record<'name' | 'email', string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Vier Fragen + Kontaktschritt. Nirgends als Zahl verdrahtet. */
const GESAMT = anfrageFragen.length + 1
const KONTAKT_SCHRITT = GESAMT

const leererKontakt: Record<KontaktFeld, string> = { name: '', email: '', message: '' }

function labelFuer(frage: AnfrageFrage, ids: string[]): string {
  return ids
    .map((id) => frage.options.find((o) => o.id === id)?.label)
    .filter((label): label is string => Boolean(label))
    .join(', ')
}

export default function AnfrageFlow({ onWechsel }: { onWechsel?: () => void }) {
  const [schritt, setSchritt] = useState(1)
  const [auswahl, setAuswahl] = useState<Record<string, string[]>>({})
  const [kontakt, setKontakt] = useState(leererKontakt)
  const [frageFehler, setFrageFehler] = useState<string | null>(null)
  const [kontaktFehler, setKontaktFehler] = useState<KontaktFehler>({})
  const [status, setStatus] = useState<Status>('idle')
  const [fertig, setFertig] = useState(false)

  const uid = useId()
  const reduziert = useReducedMotionSafe()

  const kopfRef = useRef<HTMLHeadingElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const erfolgRef = useRef<HTMLDivElement>(null)

  /**
   * Refs, keine States: beide sollen kein zusätzliches Render auslösen.
   * `bewegt` schaltet die Schritt-Animation frei (siehe Kopfkommentar),
   * `absicht` erlaubt den Fokussprung nur nach einem echten Schrittwechsel –
   * sonst klaute die Komponente beim Mount den Fokus, und im StrictMode
   * zusätzlich beim doppelten Effektlauf.
   */
  const bewegt = useRef(false)
  const absicht = useRef(false)
  /** Schützt synchron vor Doppelsenden (greift sofort, nicht erst beim Re-Render). */
  const sendetRef = useRef(false)

  // Fokus auf die Überschrift des neuen Schritts: der geklickte Knopf kann aus
  // dem DOM verschwinden, sonst fiele der Fokus auf <body>. Der Sprung ist
  // gleichzeitig die Ansage des Wechsels – eine zusätzliche aria-live-Region
  // fiele ihm nur ins Wort.
  useEffect(() => {
    if (!absicht.current) return
    absicht.current = false
    kopfRef.current?.focus({ preventScroll: true })
  }, [schritt])

  useEffect(() => {
    if (fertig) erfolgRef.current?.focus()
  }, [fertig])

  function geheZu(n: number) {
    bewegt.current = true
    absicht.current = true
    setFrageFehler(null)
    setSchritt(n)
  }

  function waehle(frage: AnfrageFrage, optionId: string) {
    setAuswahl((prev) => {
      const bisher = prev[frage.id] ?? []
      if (!frage.mehrfach) return { ...prev, [frage.id]: [optionId] }
      return {
        ...prev,
        [frage.id]: bisher.includes(optionId)
          ? bisher.filter((id) => id !== optionId)
          : [...bisher, optionId],
      }
    })
    setFrageFehler(null)
  }

  function aendereKontakt(feld: KontaktFeld) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const wert = event.target.value
      setKontakt((prev) => ({ ...prev, [feld]: wert }))
      if (feld !== 'message') {
        setKontaktFehler((prev) => (prev[feld] ? { ...prev, [feld]: undefined } : prev))
      }
      setStatus((prev) => (prev === 'error' ? 'idle' : prev))
    }
  }

  async function sende() {
    const fehler: KontaktFehler = {}
    if (!kontakt.name.trim()) fehler.name = 'Bitte gib deinen Namen ein.'
    if (!kontakt.email.trim()) fehler.email = 'Bitte gib deine E-Mail-Adresse ein.'
    else if (!EMAIL_RE.test(kontakt.email.trim()))
      fehler.email = 'Bitte gib eine gültige E-Mail-Adresse ein.'

    setKontaktFehler(fehler)
    if (fehler.name) return nameRef.current?.focus()
    if (fehler.email) return emailRef.current?.focus()

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT
    if (!endpoint) return setStatus('error')

    if (sendetRef.current) return
    sendetRef.current = true
    setStatus('sending')

    // Die Antworten als eigene, deutsch beschriftete Felder – Formspree macht
    // daraus je eine Zeile in der Mail. `message` bleibt der Freitext, damit
    // das Feld dieselbe Bedeutung hat wie beim klassischen Formular.
    const antworten: Record<string, string> = {}
    for (const frage of anfrageFragen) {
      antworten[frage.feld] = labelFuer(frage, auswahl[frage.id] ?? [])
    }

    try {
      const antwort = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: kontakt.name.trim(),
          email: kontakt.email.trim(),
          message: kontakt.message.trim() || 'Keine zusätzliche Nachricht.',
          ...antworten,
          _subject: `Projektanfrage: ${antworten[anfrageFragen[0].feld]} – ${kontakt.name.trim()}`,
        }),
      })
      if (antwort.ok) setFertig(true)
      else setStatus('error')
    } catch {
      setStatus('error')
    } finally {
      sendetRef.current = false
      setStatus((prev) => (prev === 'sending' ? 'idle' : prev))
    }
  }

  function weiter() {
    if (schritt <= anfrageFragen.length) {
      const frage = anfrageFragen[schritt - 1]
      if ((auswahl[frage.id] ?? []).length === 0) return setFrageFehler(frage.id)
      return geheZu(schritt + 1)
    }
    void sende()
  }

  function vonVorn() {
    setAuswahl({})
    setKontakt(leererKontakt)
    setKontaktFehler({})
    setStatus('idle')
    setFertig(false)
    bewegt.current = true
    setSchritt(1)
  }

  if (fertig) {
    return (
      <div
        ref={erfolgRef}
        role="status"
        tabIndex={-1}
        className="flex h-full flex-col items-start justify-center gap-4 rounded-2xl border border-accent/40 bg-accent/5 p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-8"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent/50 text-accent">
          <CircleCheck className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="text-base text-foreground">{anfrageCopy.erfolg}</p>
        <button
          type="button"
          onClick={vonVorn}
          className="rounded-sm text-sm font-medium text-accent transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {anfrageCopy.neueAnfrage}
        </button>
      </div>
    )
  }

  const frage = schritt <= anfrageFragen.length ? anfrageFragen[schritt - 1] : null
  const sendet = status === 'sending'
  const zaehler = anfrageCopy.counter
    .replace('{n}', String(schritt))
    .replace('{gesamt}', String(GESAMT))

  const stufe = { opacity: 0, y: 8 }

  return (
    <form
      noValidate
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        weiter()
      }}
      className="flex flex-col"
    >
      {/* Fortschritt: reine Dekoration – die Zahl steht schon in der
          Überschrift, fünf zusätzliche Listeneinträge wären nur Wiederholung. */}
      <div className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: GESAMT }, (_, i) => i + 1).map((n) => (
          <span
            key={n}
            className={clsx(
              'h-1 flex-1 rounded-full transition-colors duration-300 ease-out',
              n < schritt && 'bg-accent/60',
              n === schritt && 'bg-accent',
              n > schritt && 'bg-border',
            )}
          />
        ))}
      </div>

      <motion.div
        key={schritt}
        initial={bewegt.current && !reduziert ? stufe : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduziert ? 0 : 0.28, ease: 'easeOut' }}
        className="mt-6 min-h-[21rem]"
      >
        <h3 ref={kopfRef} tabIndex={-1} className="focus:outline-none">
          <span className="block font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {zaehler}
          </span>
          <span className="font-display mt-2 block text-2xl font-semibold tracking-tight text-foreground">
            {frage ? frage.title : anfrageCopy.kontakt.title}
          </span>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {frage ? frage.note : anfrageCopy.kontakt.note}
        </p>

        {frage ? (
          <fieldset className="mt-5">
            <legend className="sr-only">{frage.title}</legend>
            <div className="grid gap-2.5">
              {frage.options.map((option) => {
                const gewaehlt = (auswahl[frage.id] ?? []).includes(option.id)
                return (
                  <label key={option.id} className="block">
                    <input
                      type={frage.mehrfach ? 'checkbox' : 'radio'}
                      name={`${uid}-${frage.id}`}
                      className="peer sr-only"
                      checked={gewaehlt}
                      onChange={() => waehle(frage, option.id)}
                    />
                    <span
                      className={clsx(
                        'flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition duration-200 ease-out',
                        'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background',
                        gewaehlt
                          ? 'border-accent bg-accent/10 text-foreground'
                          : 'border-border bg-card text-muted-foreground hover:border-accent/50 hover:text-foreground',
                      )}
                    >
                      {/* Kreis = eine Antwort, abgerundetes Quadrat = mehrere.
                          Die Form sagt die Auswahlart, bevor man es ausprobiert. */}
                      <span
                        aria-hidden="true"
                        className={clsx(
                          'flex h-5 w-5 shrink-0 items-center justify-center border transition-colors duration-200',
                          frage.mehrfach ? 'rounded-md' : 'rounded-full',
                          gewaehlt
                            ? 'border-accent bg-accent text-background'
                            : 'border-border',
                        )}
                      >
                        {gewaehlt && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                      </span>
                      <span className="leading-snug">{option.label}</span>
                    </span>
                  </label>
                )
              })}
            </div>
            {frageFehler === frage.id && (
              <p
                role="alert"
                className="mt-3 flex items-start gap-2 text-sm text-destructive"
              >
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{frage.error}</span>
              </p>
            )}
          </fieldset>
        ) : (
          <div className="mt-5">
            {/* Zusammenfassung: der Nutzer sieht vor dem Absenden, was gleich
                bei mir landet – und kann per „Zurück" noch korrigieren. */}
            {/* `<dl>` darf nur dt/dd/div enthalten – die Überschrift steht
                deshalb davor, nicht darin. */}
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {anfrageCopy.kontakt.zusammenfassung}
            </p>
            <dl className="mt-2 rounded-xl border border-border bg-card px-4 py-3 text-sm">
              {anfrageFragen.map((f) => (
                <div
                  key={f.id}
                  className="flex flex-col gap-0.5 border-b border-border py-2 last:border-b-0 sm:flex-row sm:gap-4"
                >
                  <dt className="shrink-0 text-muted-foreground sm:w-28">{f.feld}</dt>
                  <dd className="text-foreground">{labelFuer(f, auswahl[f.id] ?? [])}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 flex flex-col gap-4">
              <div>
                <label
                  htmlFor={`${uid}-name`}
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <input
                  ref={nameRef}
                  id={`${uid}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={kontakt.name}
                  onChange={aendereKontakt('name')}
                  disabled={sendet}
                  aria-invalid={!!kontaktFehler.name}
                  aria-describedby={kontaktFehler.name ? `${uid}-name-fehler` : undefined}
                  className={fieldClass(!!kontaktFehler.name)}
                  placeholder="Dein Name"
                />
                {kontaktFehler.name && (
                  <p id={`${uid}-name-fehler`} className="mt-1.5 text-sm text-destructive">
                    {kontaktFehler.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`${uid}-email`}
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  E-Mail
                </label>
                <input
                  ref={emailRef}
                  id={`${uid}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={kontakt.email}
                  onChange={aendereKontakt('email')}
                  disabled={sendet}
                  aria-invalid={!!kontaktFehler.email}
                  aria-describedby={kontaktFehler.email ? `${uid}-email-fehler` : undefined}
                  className={fieldClass(!!kontaktFehler.email)}
                  placeholder="du@beispiel.de"
                />
                {kontaktFehler.email && (
                  <p id={`${uid}-email-fehler`} className="mt-1.5 text-sm text-destructive">
                    {kontaktFehler.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={`${uid}-message`}
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  {anfrageCopy.kontakt.nachricht.label}{' '}
                  <span className="font-normal text-muted-foreground">
                    {anfrageCopy.kontakt.nachricht.optional}
                  </span>
                </label>
                <textarea
                  id={`${uid}-message`}
                  name="message"
                  rows={3}
                  value={kontakt.message}
                  onChange={aendereKontakt('message')}
                  disabled={sendet}
                  className={clsx(fieldClass(false), 'resize-y')}
                  placeholder={anfrageCopy.kontakt.nachricht.placeholder}
                />
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {status === 'error' && (
        <p
          role="alert"
          className="mt-5 flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/5 px-3.5 py-3 text-sm text-destructive"
        >
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{contactMessages.error}</span>
        </p>
      )}

      <div className="mt-6 flex items-center gap-3">
        {schritt > 1 && (
          <button
            type="button"
            onClick={() => geheZu(schritt - 1)}
            disabled={sendet}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-muted-foreground transition-colors duration-200 ease-out hover:border-accent/50 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-70"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {anfrageCopy.zurueck}
          </button>
        )}
        <button
          type="submit"
          disabled={sendet}
          aria-busy={sendet}
          className="cta-gradient inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-70"
        >
          {sendet ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              {anfrageCopy.sendet}
            </>
          ) : schritt === KONTAKT_SCHRITT ? (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              {anfrageCopy.senden}
            </>
          ) : (
            <>
              {anfrageCopy.weiter}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      {onWechsel && (
        <p className="mt-5 text-center">
          <button
            type="button"
            onClick={onWechsel}
            className="rounded-sm text-sm text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {anfrageCopy.zumFreitext}
          </button>
        </p>
      )}
    </form>
  )
}
