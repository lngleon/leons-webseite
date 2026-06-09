import { motion } from 'framer-motion'
import { LayoutDashboard, Monitor, Paintbrush, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import Card from '@/components/Card'
import SectionHeading from '@/components/SectionHeading'
import ServiceDiagram from '@/components/ServiceDiagram'
import { cn } from '@/lib/utils'
import { CoolMode } from '@/components/ui/CoolMode'
import Earth from '@/components/ui/Earth'
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton'
import { Marquee } from '@/components/ui/Marquee'
import SparklesCanvas from '@/components/ui/Sparkles'
import { CardBody, CardContainer, CardItem } from '@/components/ui/Tilt'
import { moeglichkeitenIntro, techStack } from '@/data/moeglichkeiten'

/* Stille Showcase-Seite „Was möglich ist" (Route /möglichkeiten, NICHT in der
   Navbar verlinkt). Reihenfolge: Kopf → Bento → verspielt/seriös → Tilt →
   Live-Visual (Globe + Funken) → Marquee.
   Alles SSR-/prerender-sicher; reduced-motion respektiert (Tilt/Partikel/Globe/
   Sparkles/Marquee). */

// Subtile Entrance-Animation für die Abschnitte unter dem Kopf (wie auf der
// Startseite). Der Kopf selbst bleibt ungeanimiert → ohne JS sofort sichtbar.
function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

/* ── Bento-Zelle: Schaubild oben (subtiler Hover-Scale), Label unten.
   Reine on-brand-Variante des Bento-Musters – nutzt das Card-Hover-Vokabular. */
function BentoCard({
  className,
  highlight,
  icon: Icon,
  title,
  description,
  children,
}: {
  className?: string
  highlight?: boolean
  icon: LucideIcon
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <Card highlight={highlight} className={cn('flex h-full flex-col', className)}>
      <div className="relative flex-1 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-[1.02]">
        {children}
      </div>
      <div className="mt-4 flex items-start gap-3">
        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
        <div>
          <h3 className="text-sm font-semibold text-foreground sm:text-base">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  )
}

/* Große Zelle „Diese Seite selbst": handgebaute, STATISCHE Mono-Grafik
   (Dark-System) – ein abstraktes Mini-Abbild dieser Seite. Performance-Zahl
   bewusst NICHT erfunden: sichtbarer Platzhalter („—", Messwerte folgen). */
function ThisSiteGraphic() {
  return (
    <div className="flex h-full flex-col gap-3">
      {/* Mini-Fenster (statisch) */}
      <div className="overflow-hidden rounded-lg border border-border bg-background">
        <div className="flex items-center gap-1.5 border-b border-border bg-muted/60 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/20" />
        </div>
        <div className="space-y-2.5 p-4">
          {/* Akzent-„Hero"-Balken über den Token-Gradient (nicht hardcoden) */}
          <span className="block h-3.5 w-1/2 rounded [background-image:var(--accent-gradient)]" />
          <span className="block h-2 w-3/4 rounded bg-foreground/15" />
          <span className="block h-2 w-2/3 rounded bg-foreground/10" />
          <span className="mt-1 block h-5 w-24 rounded-full bg-accent-solid/80" />
        </div>
      </div>

      {/* Performance: bewusst OHNE Zahl – sichtbarer Platzhalter */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-dashed border-border p-3">
          <p className="text-xs text-muted-foreground">Lighthouse</p>
          <p className="text-2xl font-semibold text-muted-foreground/40">—</p>
        </div>
        <div className="rounded-lg border border-dashed border-border p-3">
          <p className="text-xs text-muted-foreground">Ladezeit</p>
          <p className="text-2xl font-semibold text-muted-foreground/40">—</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground/70">Messwerte folgen.</p>
    </div>
  )
}

export default function Moeglichkeiten() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      {/* (1) Kopf + ein Satz Intro (ohne Entrance → ohne JS sichtbar) */}
      <SectionHeading
        eyebrow={moeglichkeitenIntro.eyebrow}
        title={moeglichkeitenIntro.title}
        description={moeglichkeitenIntro.subline}
        className="mx-auto"
      />

      {/* (2) Bento-Grid (das Herz) */}
      <Reveal className="mt-14 sm:mt-16">
        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3">
          <BentoCard
            highlight
            className="lg:col-span-2"
            icon={LayoutDashboard}
            title="Diese Seite selbst"
            description="Handgebaut, statisch ausgeliefert, Dark-System – die Seite, auf der du gerade bist."
          >
            <ThisSiteGraphic />
          </BentoCard>

          <BentoCard
            className="lg:col-span-1"
            icon={Sparkles}
            title="KI-Chat"
            description="Ein Assistent, dessen Antwort live hereinläuft."
          >
            <ServiceDiagram kind="chat" icon={Sparkles} />
          </BentoCard>

          <BentoCard
            className="lg:col-span-1"
            icon={Paintbrush}
            title="Redesign"
            description="Vom veralteten Layout zum cleanen Auftritt – ein Wisch."
          >
            <ServiceDiagram kind="redesign" icon={Paintbrush} />
          </BentoCard>

          <BentoCard
            className="lg:col-span-2"
            icon={Monitor}
            title="Webseite im Aufbau"
            description="Eine Seite, die sich Stück für Stück zusammensetzt."
          >
            <ServiceDiagram kind="browser" icon={Monitor} />
          </BentoCard>
        </div>
      </Reveal>

      {/* (3) Verspielt vs. seriös – zwei Knöpfe */}
      <Reveal className="mt-24 sm:mt-32">
        <div className="flex flex-col items-center gap-5 text-center">
          <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Verspielt oder seriös?
          </h3>
          <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Mikro-Interaktionen dürfen verspielt sein – oder ganz ruhig. Beides geht, je nachdem,
            was zu dir passt. Probier die zwei Knöpfe aus.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <CoolMode>
              <button
                type="button"
                className="rounded-full cta-gradient px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Mach's bunt
              </button>
            </CoolMode>
            <InteractiveHoverButton>Ganz seriös</InteractiveHoverButton>
          </div>
        </div>
      </Reveal>

      {/* (4) Tilt-Karte (Platzhalter für ein echtes Projekt) */}
      <Reveal className="mt-24 sm:mt-32">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Tiefe auf Hover
            </h3>
            <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Eine Karte, die sich subtil zur Maus neigt. Inhalt hier als Platzhalter – später ein
              echtes Projekt.
            </p>
          </div>

          <CardContainer>
            <CardBody className="w-[19rem] rounded-2xl border border-border bg-card p-6 text-left transition-shadow duration-200 hover:shadow-2xl hover:shadow-accent/10 sm:w-[24rem]">
              <CardItem translateZ={30}>
                <span className="accent-gradient-text text-xs font-medium uppercase tracking-[0.2em]">
                  Beispiel-Leistung · Platzhalter
                </span>
              </CardItem>
              <CardItem translateZ={45} className="mt-2">
                <h4 className="text-lg font-semibold text-foreground">Webseiten</h4>
              </CardItem>
              <CardItem translateZ={60} className="mt-4 w-full">
                <ServiceDiagram kind="browser" icon={Monitor} />
              </CardItem>
              <CardItem translateZ={20} className="mt-4">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Hier kommt später ein echtes Projekt-Bild.
                </p>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </Reveal>

      {/* (5) Live-Visual: Dot-Globe (WebGL via cobe) + aufsteigende Funken (Canvas).
         Reine Können-Demo – beides läuft live im Browser, nur Violett aus den
         Tokens, SSR-/reduced-motion-sicher. Keine „global"-/Reichweiten-Aussage. */}
      <Reveal className="mt-24 sm:mt-32">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Live im Browser gerechnet
            </h3>
            <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Ein interaktiver Punkte-Globus und aufsteigende Funken – in Echtzeit gezeichnet
              (WebGL und Canvas), kein Video. Zieh am Globus.
            </p>
          </div>

          <div className="relative w-full max-w-[34rem]">
            <SparklesCanvas className="pointer-events-none absolute inset-0" density={70} />
            <Earth className="relative z-10 mx-auto aspect-square w-full max-w-[26rem]" />
          </div>
        </div>
      </Reveal>

      {/* (6) Marquee – Leons echter Tech-Stack */}
      <Reveal className="mt-24 sm:mt-32">
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Mein Werkzeugkasten
          </h3>
          <div className="relative w-full">
            <Marquee pauseOnHover className="[--duration:28s]">
              {techStack.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-muted-foreground"
                >
                  {tool}
                </span>
              ))}
            </Marquee>
            {/* Rand-Verläufe für ein edles Aus-/Einblenden */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background sm:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background sm:w-24" />
          </div>
        </div>
      </Reveal>
    </div>
  )
}
