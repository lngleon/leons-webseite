import { site } from './site'

export const contactIntro = {
  eyebrow: 'Kontakt',
  title: 'Lass uns dein Projekt besprechen.',
  subline: 'Erzähl mir kurz, was du vorhast – ich melde mich zeitnah bei dir.',
} as const

export const contactMessages = {
  success:
    'Danke für deine Nachricht! Ich melde mich so schnell wie möglich bei dir.',
  error:
    'Da ist etwas schiefgelaufen. Versuch es bitte erneut oder schreib mir direkt per E-Mail.',
} as const

export type DirectChannelKey = 'email' | 'whatsapp' | 'instagram'

export type DirectChannel = {
  key: DirectChannelKey
  label: string
  description: string
  href: string
  /** true → in neuem Tab öffnen (mailto bleibt im selben Kontext). */
  external: boolean
}

export const directChannels: DirectChannel[] = [
  {
    key: 'email',
    label: 'E-Mail',
    description: site.contact.email,
    href: `mailto:${site.contact.email}`,
    external: false,
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    description: 'Schreib mir direkt',
    href: site.contact.whatsapp,
    external: true,
  },
  {
    key: 'instagram',
    label: 'Instagram',
    description: '@leon.vln',
    href: site.contact.instagram,
    external: true,
  },
]
