import type { GastroBusiness } from '@/data/demo/types'

/**
 * Leitet die Beispielwoche der Reservierungs-Attrappe ab – aus den
 * Öffnungszeiten und sonst nichts.
 *
 * Der Sinn: es gibt KEINEN zweiten Zeit-Datensatz. Wer `hours.entries` ändert,
 * ändert die Strecke mit; zwei Wahrheiten können nicht auseinanderlaufen. Nur
 * die BELEGUNG ist Redaktion (`busySlots`/`tightSlots`), die Struktur ist
 * Ableitung.
 *
 * Geschwister von `routes.ts` und `menu.ts`: kein JSX, kein `'use client'`.
 * Das Modul läuft ausschliesslich beim Build; die Client-Insel bekommt das
 * fertige Ergebnis als Prop und importiert von hier NUR Typen – sonst wanderte
 * der Helfer mit ins Bundle.
 *
 * Keine Zeit-API: die Rechnung läuft auf Minuten-Zahlen aus „HH:MM"-Strings.
 * Kein `Date`, kein `Intl`, keine Zeitzone – und damit auch kein Ergebnis, das
 * sich zwischen Server-Frame und erstem Client-Frame unterscheiden könnte.
 */

const zuMinuten = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5))
const zuUhrzeit = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`

export type BookingSlot = {
  time: string
  /** `frei` ist auswählbar, `knapp` auch – `belegt` ist gar kein Bedienelement. */
  state: 'frei' | 'knapp' | 'belegt'
}

export type BookingServiceView = {
  id: string
  short: string
  /** „18:00 – 23:00" – die ausgewiesene Öffnungszeit, nicht die letzte Sitzung. */
  window: string
  slots: BookingSlot[]
}

export type BookingDayView = {
  key: string
  label: string
  /** Leer = Ruhetag. Das ergibt sich aus `hours`, es gibt keinen Schalter dafür. */
  services: BookingServiceView[]
}

export function buildBookingWeek(business: GastroBusiness): BookingDayView[] {
  const booking = business.booking
  if (!booking) return []

  return booking.weekdays.map(({ key, label }) => ({
    key,
    label,
    services: booking.services.flatMap((service) => {
      const entry = business.hours.entries.find((e) => e.label === service.hoursLabel)

      // Feldfragen, keine Betriebsfragen. Ein `closed`-Eintrag hat kein
      // opens/closes – `zuMinuten(undefined)` wäre NaN und die Schleife liefe
      // gar nicht oder endlos.
      if (!entry || entry.closed || !entry.opens || !entry.closes) return []
      if (!entry.days.includes(key)) return []

      const auf = zuMinuten(entry.opens)
      const zu = zuMinuten(entry.closes)
      // Sperrstunde nach Mitternacht wird bewusst NICHT gedeutet: ein Fenster
      // über den Tageswechsel wirft die Frage auf, an welchem Wochentag der
      // Gast dann sitzt. Lieber sichtbar nichts anbieten als still etwas Falsches.
      if (zu <= auf) return []

      const letzte = zu - service.lastSeatingBeforeCloseMinutes
      if (letzte < auf) return [] // Fenster kürzer als der Vorlauf → kein Service

      const slots: BookingSlot[] = []
      for (let m = auf; m <= letzte; m += booking.slotStepMinutes) {
        const time = zuUhrzeit(m)
        slots.push({
          time,
          state: service.busySlots?.includes(time)
            ? 'belegt'
            : service.tightSlots?.includes(time)
              ? 'knapp'
              : 'frei',
        })
      }

      return [
        { id: service.id, short: service.short, window: `${entry.opens} – ${entry.closes}`, slots },
      ]
    }),
  }))
}
