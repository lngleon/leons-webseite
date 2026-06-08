import { useEffect, useId, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { CircleAlert, CircleCheck, Loader2, Send } from 'lucide-react'
import { clsx } from 'clsx'
import { contactMessages } from '@/data/contact'

type Status = 'idle' | 'sending' | 'success' | 'error'
type Field = 'name' | 'email' | 'message'
type Values = Record<Field, string>
type Errors = Partial<Record<Field, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const FIELD_ORDER: Field[] = ['name', 'email', 'message']
const emptyValues: Values = { name: '', email: '', message: '' }

function validate(values: Values): Errors {
  const errors: Errors = {}
  if (!values.name.trim()) errors.name = 'Bitte gib deinen Namen ein.'
  if (!values.email.trim()) errors.email = 'Bitte gib deine E-Mail-Adresse ein.'
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = 'Bitte gib eine gültige E-Mail-Adresse ein.'
  if (!values.message.trim())
    errors.message = 'Bitte schreib mir kurz, worum es geht.'
  return errors
}

const fieldBase =
  'w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring'

function fieldClass(hasError: boolean) {
  return clsx(
    fieldBase,
    hasError ? 'border-destructive' : 'border-border focus:border-accent',
  )
}

export default function ContactForm() {
  const [values, setValues] = useState<Values>(emptyValues)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  // Stabile, eindeutige IDs für Label/Fehler-Verknüpfung (a11y).
  const uid = useId()
  const fieldId = (field: Field) => `${uid}-${field}`
  const errorId = (field: Field) => `${uid}-${field}-error`

  // Refs für Fokus-Steuerung (a11y): erstes Fehlerfeld bzw. Erfolgs-Panel.
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const fieldRefs = { name: nameRef, email: emailRef, message: messageRef }
  const successRef = useRef<HTMLDivElement>(null)

  // Schützt synchron vor Doppelsenden (greift sofort, nicht erst beim Re-Render).
  const sendingRef = useRef(false)

  // Nach Erfolg den Fokus ins Erfolgs-Panel setzen, damit er nicht verloren geht.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  function handleChange(field: Field) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = event.target.value
      setValues((prev) => ({ ...prev, [field]: next }))
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))
      // Eine frühere Fehlermeldung verschwindet, sobald der Nutzer weitertippt.
      setStatus((prev) => (prev === 'error' ? 'idle' : prev))
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sendingRef.current) return

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      // Fokus auf das erste fehlerhafte Feld – dessen aria-describedby liest
      // den Fehlertext für Screenreader vor (WCAG 3.3.1).
      const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field])
      if (firstInvalid) fieldRefs[firstInvalid].current?.focus()
      return
    }

    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT
    if (!endpoint) {
      setStatus('error')
      return
    }

    sendingRef.current = true
    setStatus('sending')
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        }),
      })
      if (response.ok) {
        setValues(emptyValues)
        setErrors({})
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      sendingRef.current = false
    }
  }

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="flex h-full flex-col items-start justify-center gap-4 rounded-2xl border border-accent/40 bg-accent/5 p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-8"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent/50 text-accent">
          <CircleCheck className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="text-base text-foreground">{contactMessages.success}</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-sm font-medium text-accent transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Noch eine Nachricht schreiben
        </button>
      </div>
    )
  }

  const sending = status === 'sending'

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <label
          htmlFor={fieldId('name')}
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Name
        </label>
        <input
          ref={nameRef}
          id={fieldId('name')}
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={handleChange('name')}
          disabled={sending}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? errorId('name') : undefined}
          className={fieldClass(!!errors.name)}
          placeholder="Dein Name"
        />
        {errors.name && (
          <p id={errorId('name')} className="mt-1.5 text-sm text-destructive">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor={fieldId('email')}
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          E-Mail
        </label>
        <input
          ref={emailRef}
          id={fieldId('email')}
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange('email')}
          disabled={sending}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? errorId('email') : undefined}
          className={fieldClass(!!errors.email)}
          placeholder="du@beispiel.de"
        />
        {errors.email && (
          <p id={errorId('email')} className="mt-1.5 text-sm text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor={fieldId('message')}
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Nachricht
        </label>
        <textarea
          ref={messageRef}
          id={fieldId('message')}
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange('message')}
          disabled={sending}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? errorId('message') : undefined}
          className={clsx(fieldClass(!!errors.message), 'resize-y')}
          placeholder="Worum geht es bei deinem Projekt?"
        />
        {errors.message && (
          <p id={errorId('message')} className="mt-1.5 text-sm text-destructive">
            {errors.message}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/5 px-3.5 py-3 text-sm text-destructive"
        >
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{contactMessages.error}</span>
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        aria-busy={sending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-solid px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-70"
      >
        {sending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Wird gesendet…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Projekt anfragen
          </>
        )}
      </button>
    </form>
  )
}
