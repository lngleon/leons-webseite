/** Zentrale Marken- & Kontaktdaten. Inhalte werden später hier gepflegt.
 *  Wird auch von Client-Komponenten (Navbar/Footer) importiert – hier gehört
 *  deshalb NICHTS hinein, das Server-Env-Variablen liest (siehe site-url.ts). */
export const site = {
  name: 'Leon Lang',
  logoText: 'LL',
  tagline: 'Veränderungen, die spürbar werden.',
  contact: {
    email: 'leonlang95@gmail.com',
    whatsapp: 'https://wa.me/4917648072158',
    instagram: 'https://instagram.com/leon.vln',
  },
} as const
