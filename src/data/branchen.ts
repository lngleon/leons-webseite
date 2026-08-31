import {
  Briefcase,
  Camera,
  Coffee,
  Dumbbell,
  Flower2,
  Rocket,
  Scissors,
  Sparkles,
  Stethoscope,
  Users,
  UtensilsCrossed,
  Wrench,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * Branchen-Laufband direkt unter dem Hero – die Antwort auf „ist meine
 * Branche dabei?" in Sekunde zwei.
 *
 * Bewusst als ANGEBOT formuliert („Websites & Tools für …"), nicht als
 * Referenzliste: es sagt, für wen gebaut wird, nicht, für wen schon gebaut
 * wurde (Regel „keine erfundenen Claims"). Die tatsächlich gebauten
 * Branchen stehen in der Projekte-Sektion.
 */
export type Branche = {
  label: string
  icon: LucideIcon
}

export const branchenIntro = 'Websites & Tools für'

export const branchen: Branche[] = [
  { label: 'Cafés & Bäckereien', icon: Coffee },
  { label: 'Restaurants', icon: UtensilsCrossed },
  { label: 'Friseure & Barbiere', icon: Scissors },
  { label: 'Nagelstudios', icon: Sparkles },
  { label: 'Gärtnereien & Floristik', icon: Flower2 },
  { label: 'Handwerk', icon: Wrench },
  { label: 'Praxen', icon: Stethoscope },
  { label: 'Vereine', icon: Users },
  { label: 'Startups', icon: Rocket },
  { label: 'Selbstständige', icon: Briefcase },
  { label: 'Studios & Fitness', icon: Dumbbell },
  { label: 'Fotografie & Kreative', icon: Camera },
]
