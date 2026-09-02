'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { LayoutDashboard, Monitor, Paintbrush, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import Card from '@/components/Card'
import SectionHeading from '@/components/SectionHeading'
import ServiceDiagram from '@/components/ServiceDiagram'
import Terminal from '@/components/Terminal'
import { cn } from '@/lib/utils'
import { CoolMode } from '@/components/ui/CoolMode'
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton'
import LazyVisible from '@/components/ui/LazyVisible'
import { Marquee } from '@/components/ui/Marquee'
import { CardBody, CardContainer, CardItem } from '@/components/ui/Tilt'
import { lighthouse, moeglichkeitenIntro, techStack } from '@/data/moeglichkeiten'

/**
 * Die zwei schweren Effekte kommen als EIGENE Chunks und werden erst geladen,
 * wenn `LazyVisible` sie in den Baum hängt – siehe Block (6) unten und den
 * Kopfkommentar von `LazyVisible`.
 *
 * `ssr: false` ist hier richtig und nicht bequem: beide rendern serverseitig
 * ohnehin nur eine leere, `aria-hidden`-Canvas – es geht kein Inhalt aus dem
 * HTML verloren. Der Platz, den sie einnehmen, wird vom umgebenden Element
 * reserviert, das der Server ganz normal rendert; deshalb bleibt CLS 0.
 */
const Earth = dynamic(() => import('@/components/ui/Earth'), { ssr: false })
const SparklesCanvas = dynamic(() => import('@/components/ui/Sparkles'), { ssr: false })

/* Stille Showcase-Seite „Was möglich ist" (Route /moeglichkeiten, NICHT in der
   Navbar verlinkt). Reihenfolge: Kopf → Musterseiten → Bento → verspielt/seriös
   → Tilt → Live-Visual (Globe + Funken) → Marquee.
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
      className={cn('entrance-anim', className)}
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
          <h2 className="text-sm font-semibold text-foreground sm:text-base">{title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  )
}

/* Große Zelle „Diese Seite selbst": handgebaute, STATISCHE Mono-Grafik
   (Dark-System) – ein abstraktes Mini-Abbild dieser Seite.
   Seit 27.08.2026 stehen darunter ECHTE Lighthouse-Zahlen statt des
   Platzhalters „—", seit 28.08.2026 ZWEI Messungen. Gross die Startseite –
   das ist die Seite, um die es im Verkaufsgespräch geht. Klein, aber nicht
   versteckt, die Zahl DIESER Seite samt Grund: sie führt Effekte vor und
   zahlt dafür. Keine der beiden fällt weg – die 96 ohne die 79 wäre
   Rosinenpickerei, die 79 allein wäre die Effekt-Seite als Maßstab für alles
   andere. Werte, Rohläufe und Messbedingungen in data/moeglichkeiten.ts. */
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

      {/* Lighthouse: gemessen, nicht behauptet – und die gemessene Seite steht
          ausdrücklich dabei. Eine Zahl ohne Seitenangabe wäre eine Behauptung
          über „die Seite", nicht über eine Messung. */}
      <p className="text-xs text-muted-foreground">
        Lighthouse, Mobil ·{' '}
        <span className="text-foreground">{lighthouse.hauptseite.label}</span>
      </p>
      <div className="grid grid-cols-2 gap-3">
        {lighthouse.hauptseite.kategorien.map((k) => (
          <div key={k.label} className="rounded-lg border border-border p-3">
            <p className="text-xs text-muted-foreground">{k.label}</p>
            <p className="text-2xl font-semibold text-foreground">{k.wert}</p>
          </div>
        ))}
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground/70">
        {lighthouse.hauptseite.metriken} · {lighthouse.bedingungen}
      </p>

      {/* Die schwächere Zahl bleibt sichtbar – abgesetzt, aber nicht kleiner
          geredet. Der Grund steht in einem Satz daneben, nicht im Kleingedruckten
          einer anderen Datei. */}
      <p className="rounded-lg border border-dashed border-border p-3 text-xs leading-relaxed text-muted-foreground">
        <span className="text-foreground">
          {lighthouse.showcase.label}: Performance {lighthouse.showcase.performance}
        </span>{' '}
        – {lighthouse.showcase.grund}
      </p>
    </div>
  )
}

/**
 * `demos` ist der Musterseiten-Block und kommt von AUSSEN herein, statt hier
 * importiert zu werden: diese Datei ist eine Client-Komponente, und der Block
 * liest die drei vollständigen Betriebs-Objekte. Ein Import hier zöge Karten,
 * Öffnungszeiten und Rechtstexte aller drei Demos ins Browser-Bundle. Die
 * Server-Seite (`page.tsx`) reicht ihn deshalb als fertigen Knoten durch.
 */
export default function Moeglichkeiten({ demos }: { demos?: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      {/* (1) Kopf + ein Satz Intro (ohne Entrance → ohne JS sichtbar) */}
      <SectionHeading
        as="h1"
        eyebrow={moeglichkeitenIntro.eyebrow}
        title={moeglichkeitenIntro.title}
        description={moeglichkeitenIntro.subline}
        className="mx-auto"
      />

      {/* (2) Die drei Musterseiten – der stärkste Beleg der Seite und deshalb
         GANZ OBEN, direkt unter dem Intro. Alles darunter zeigt Effekte; das
         hier zeigt fertige Seiten. Der Knoten kommt aus `page.tsx`, siehe
         Kommentar an der Signatur. */}
      {demos ? <Reveal className="mt-14 sm:mt-16">{demos}</Reveal> : null}

      {/* (3) Bento-Grid (das Herz) */}
      <Reveal className="mt-24 sm:mt-32">
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

      {/* (4) Verspielt vs. seriös – zwei Knöpfe */}
      <Reveal className="mt-24 sm:mt-32">
        <div className="flex flex-col items-center gap-5 text-center">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Verspielt oder seriös?
          </h2>
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

      {/* (5) Tilt-Karte – seit 27.08.2026 mit echtem Inhalt statt Platzhalter.
         Bewusst NICHT einer der drei Demo-Screenshots aus Block (2): dasselbe
         Bild zweimal auf einer Seite entwertet beide. Stattdessen ein Blick
         INS Innere einer Demo – die Reservierungs-Attrappe von Restaurant
         Glut, aufgenommen auf Schritt 3 von 5, damit man dem Bild ansieht,
         dass es eine Strecke ist und nicht ein Formular.
         Der Text bleibt ehrlich: der Ablauf steht, gebucht wird nichts. */}
      <Reveal className="mt-24 sm:mt-32">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Tiefe auf Hover
            </h2>
            <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Eine Karte, die sich subtil zur Maus neigt – hier mit einem Blick in die
              Reservierungs-Strecke von Restaurant Glut.
            </p>
          </div>

          <CardContainer>
            <CardBody className="w-[19rem] rounded-2xl border border-border bg-card p-6 text-left transition-shadow duration-200 hover:shadow-2xl hover:shadow-accent/10 sm:w-[24rem]">
              <CardItem translateZ={30}>
                <span className="accent-gradient-text text-xs font-medium uppercase tracking-[0.2em]">
                  Aus der Demo · Restaurant Glut
                </span>
              </CardItem>
              <CardItem translateZ={45} className="mt-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Reservierung, Schritt 3 von 5
                </h3>
              </CardItem>
              <CardItem translateZ={60} className="mt-4 w-full">
                {/* aspect-Box → kein Layout-Shift, gleiches 8∶5 wie die drei
                    Vorschauen in Block (2). Im Browser gemessene Slot-Breite:
                    332 px ab `sm`, 252 px darunter (Karte 24 bzw. 19 rem, minus
                    p-6 beidseitig und minus Rahmen). */}
                <div className="aspect-[8/5] overflow-hidden rounded-lg border border-border bg-muted">
                  <Image
                    src="/demo-reservierung-preview.webp"
                    alt="Schritt 3 von 5 der Reservierungs-Vorschau von Restaurant Glut: eine Uhrzeit wählen, belegte Zeiten sind ausgegraut"
                    width={1120}
                    height={700}
                    sizes="(min-width: 640px) 332px, 252px"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </CardItem>
              <CardItem translateZ={20} className="mt-4">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Fünf Schritte, gerechnet aus den Öffnungszeiten des Betriebs – der Ablauf steht
                  komplett. Gebucht wird nichts: kein Tisch, keine Mail, kein Kalender.
                </p>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </Reveal>

      {/* (6) Live-Visual: Dot-Globe (WebGL via cobe) + aufsteigende Funken (Canvas).
         Reine Können-Demo – beides läuft live im Browser, nur Violett aus den
         Tokens, SSR-/reduced-motion-sicher. Keine „global"-/Reichweiten-Aussage. */}
      <Reveal className="mt-24 sm:mt-32">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Live im Browser gerechnet
            </h2>
            <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Ein interaktiver Punkte-Globus und aufsteigende Funken – in Echtzeit gezeichnet
              (WebGL und Canvas), kein Video. Zieh am Globus.
            </p>
          </div>

          {/* Die Boxen aussen rendert der Server wie bisher – sie reservieren
              den Platz, deshalb bleibt CLS 0. Gemountet werden die beiden
              Canvas erst, wenn der Block sich dem Sichtfeld nähert (800 px
              Vorlauf): gemessen kosteten sie zusammen rund 400 ms Blocking
              Time beim Seitenaufbau, zwei Bildschirme bevor man sie sieht. */}
          <div className="relative w-full max-w-[34rem]">
            <LazyVisible className="pointer-events-none absolute inset-0">
              <SparklesCanvas className="h-full w-full" density={70} />
            </LazyVisible>
            <div className="relative z-10 mx-auto aspect-square w-full max-w-[26rem]">
              <LazyVisible className="h-full w-full">
                <Earth className="h-full w-full" />
              </LazyVisible>
            </div>
          </div>
        </div>
      </Reveal>

      {/* (6b) Terminal – bis 31.08.2026 im Hero der Startseite, seitdem hier:
         die Zielgruppe der Startseite will Websites sehen, keine Build-
         Ausgabe; auf der Effekt-Seite passt es als Technik-Schaufenster.
         Ehrlich beschriftet: Stack und Ablauf sind echt, Projektname und
         Routen sind bewusst Platzhalter (siehe `src/data/hero.ts`) – kein
         „echter Build dieser Seite". Mountet über `LazyVisible` (800 px
         Vorlauf), damit das Tippen erst startet, wenn man es sehen kann,
         statt unsichtbar beim Seitenaufbau (~5 s Timer-Updates umsonst);
         die min-Höhe reserviert den Platz, der Mount passiert außerhalb
         des Sichtfelds → kein sichtbarer Shift. */}
      <Reveal className="mt-24 sm:mt-32">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              So sieht ein Next-Build aus
            </h2>
            <p className="max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Kein Baukasten, kein gekauftes Theme: Next.js, TypeScript und Tailwind. Stack und
              Ablauf sind echt, Projektname und Routen sind Platzhalter – tippt sich Tab für Tab.
            </p>
          </div>
          <LazyVisible className="min-h-[20rem] w-full max-w-2xl text-left">
            <Terminal />
          </LazyVisible>
        </div>
      </Reveal>

      {/* (7) Marquee – Leons echter Tech-Stack */}
      <Reveal className="mt-24 sm:mt-32">
        <div className="flex flex-col items-center gap-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Mein Werkzeugkasten
          </h2>
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
