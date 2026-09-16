import {
  ArrowRightIcon,
  CodeXmlIcon,
  DownloadIcon,
  MapPinIcon,
  NetworkIcon,
  ServerIcon,
} from "lucide-react"
import { cn } from "cn"

import portrait from "@/assets/sujan.jpg"
import { SocialLinks } from "@/components/social-links"
import { Button } from "@/components/ui/button"
import { heroStats, profile, yearsOfExperience } from "@/data/portfolio"
import { useRotatingIndex } from "@/hooks/use-rotating-index"

const floatingCards = [
  {
    title: "Frontend",
    subtitle: "React · Next.js · Vue",
    icon: CodeXmlIcon,
    className: "top-10 -left-10 xl:-left-16",
    animation: "animate__fadeInLeft",
    delay: 700,
  },
  {
    title: "Backend",
    subtitle: "Django · PostgreSQL",
    icon: ServerIcon,
    className: "top-[44%] -right-10 xl:-right-14",
    animation: "animate__fadeInRight",
    delay: 900,
  },
  {
    title: "Architecture",
    subtitle: "Microservices · CAS",
    icon: NetworkIcon,
    className: "bottom-16 -left-8 xl:-left-12",
    animation: "animate__fadeInLeft",
    delay: 1100,
  },
]

/** Inline delay helper for staggered animate.css entrances. */
const delay = (ms: number) => ({ animationDelay: `${ms}ms` })

export function Hero() {
  const focusIndex = useRotatingIndex(profile.focusAreas.length, 2800)
  const years = yearsOfExperience()

  return (
    <section
      id="home"
      className="relative isolate flex min-h-svh items-center overflow-hidden pt-28 pb-20 lg:pt-24"
    >
      <HeroBackdrop />

      <div className="page-container grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <div className="animate__animated animate__fadeInDown">
            <span className="inline-flex items-center gap-2.5 rounded-full border bg-background/60 py-1.5 pr-3.5 pl-2.5 text-xs font-medium text-muted-foreground shadow-xs backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/70" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>
                {profile.role} at{" "}
                <span className="text-foreground">{profile.currentCompany}</span>
              </span>
            </span>
          </div>

          <h1 className="mt-7 animate__animated animate__fadeInUp" style={delay(100)}>
            <span className="block font-mono text-sm font-medium tracking-[0.2em] text-primary uppercase">
              Hi, I&apos;m
            </span>
            <span className="mt-3 block text-5xl font-bold tracking-tighter sm:text-6xl lg:text-7xl">
              {profile.name}
            </span>
          </h1>

          <p
            className="mt-5 text-xl font-medium tracking-tight text-muted-foreground sm:text-3xl animate__animated animate__fadeInUp"
            style={delay(200)}
          >
            <span className="sr-only">
              {profile.role} building {profile.focusAreas.join(", ")}.
            </span>
            <span aria-hidden className="block">
              <span className="text-foreground">{profile.role}</span> building
              <span className="block overflow-hidden whitespace-nowrap">
                <span
                  key={focusIndex}
                  className="inline-block bg-linear-to-r from-primary to-brand-warm bg-clip-text pb-1 text-transparent animate__animated animate__fadeInUp"
                >
                  {profile.focusAreas[focusIndex]}
                </span>
              </span>
            </span>
          </p>

          <p
            className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg animate__animated animate__fadeInUp"
            style={delay(300)}
          >
            {years}+ years turning complex requirements into polished interfaces,
            secure APIs and systems that scale — with a focus on microservices,
            multi-tenancy and CAS-based authentication.
          </p>

          <div
            className="mt-9 flex flex-wrap items-center gap-3 animate__animated animate__fadeInUp"
            style={delay(400)}
          >
            <Button
              asChild
              size="lg"
              className="h-11 rounded-full px-6 shadow-lg shadow-primary/25"
            >
              <a href="#work">
                View my work
                <ArrowRightIcon className="transition-transform group-hover/button:translate-x-0.5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-11 rounded-full px-6">
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                Download CV
                <DownloadIcon />
              </a>
            </Button>
            <SocialLinks className="ml-1" />
          </div>

          <dl
            className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t pt-8 animate__animated animate__fadeInUp"
            style={delay(500)}
          >
            {heroStats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse justify-end gap-1">
                <dt className="text-xs text-muted-foreground sm:text-sm">{stat.label}</dt>
                <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-sm lg:max-w-88 xl:max-w-sm">
          <div
            className="animate__animated animate__revealUp"
            style={{ ...delay(250), animationDuration: "1000ms" }}
          >
            <div
              aria-hidden
              className="absolute -inset-10 -z-10 rounded-[3rem] bg-linear-to-tr from-primary/40 via-primary/5 to-brand-warm/35 opacity-70 blur-3xl"
            />
            <div className="rounded-[2rem] border bg-card/70 p-2 shadow-2xl shadow-black/10 backdrop-blur-sm dark:shadow-black/40">
              <div className="relative overflow-hidden rounded-[1.55rem]">
                <img
                  src={portrait}
                  alt={`Portrait of ${profile.name}`}
                  width={960}
                  height={1200}
                  fetchPriority="high"
                  className="aspect-4/5 w-full object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/55 to-transparent"
                />
                <p className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 py-1.5 pr-3 pl-2 text-xs font-medium text-white backdrop-blur-md">
                  <MapPinIcon className="size-3.5" />
                  {profile.city}
                </p>
              </div>
            </div>
          </div>

          {floatingCards.map(({ title, subtitle, icon: Icon, className, animation, delay: ms }, index) => (
            <div key={title} className={cn("absolute z-10 hidden sm:block", className)}>
              <div className={cn("animate__animated", animation)} style={delay(ms)}>
                <div
                  className="flex animate-float items-center gap-3 rounded-2xl border bg-background/85 py-2.5 pr-4 pl-2.5 shadow-xl shadow-black/5 backdrop-blur-md dark:shadow-black/30"
                  style={{ animationDelay: `${index * -2}s` }}
                >
                  <span className="grid size-9 place-items-center rounded-xl bg-primary/12 text-primary">
                    <Icon className="size-4.5" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-semibold">{title}</span>
                    <span className="block text-xs text-muted-foreground">{subtitle}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to the About section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted-foreground transition-colors hover:text-foreground lg:tall:flex"
      >
        <span className="flex h-10 w-6 justify-center rounded-full border-2 border-current/40 pt-2">
          <span className="size-1.5 animate-scroll-hint rounded-full bg-current" />
        </span>
      </a>
    </section>
  )
}

function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="bg-grid absolute inset-0 mask-[radial-gradient(ellipse_80%_70%_at_50%_30%,black_20%,transparent_75%)]" />
      <div className="absolute -top-48 -left-40 size-152 rounded-full bg-primary/15 blur-[120px]" />
      <div className="absolute top-1/3 -right-48 size-128 rounded-full bg-brand-warm/10 blur-[120px]" />
    </div>
  )
}
