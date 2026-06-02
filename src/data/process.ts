export const processIntro = {
  eyebrow: 'Prozess',
  title: 'So entsteht dein Projekt.',
  subline:
    'Klar, transparent und ohne böse Überraschungen – du weißt jederzeit, woran wir sind.',
} as const

export type ProcessStep = {
  title: string
  text: string
}

export const processSteps: ProcessStep[] = [
  {
    title: 'Kennenlernen & Idee',
    text: 'Wir sprechen über dein Vorhaben, dein Ziel und deine Wünsche. Unverbindlich und in Ruhe – damit ich verstehe, worum es dir wirklich geht.',
  },
  {
    title: 'Konzept & Design',
    text: 'Ich entwickle Struktur und Design, abgestimmt auf dich. Du siehst, wie deine Seite aussehen wird, bevor die erste Zeile Code steht.',
  },
  {
    title: 'Umsetzung',
    text: 'Ich setze alles individuell um – sauber programmiert, schnell und auf jedem Gerät. Du bleibst dabei immer auf dem Laufenden.',
  },
  {
    title: 'Launch & Betreuung',
    text: 'Deine Seite geht online. Und danach? Bin ich weiter für dich da, wenn du Anpassungen oder Unterstützung brauchst.',
  },
]
