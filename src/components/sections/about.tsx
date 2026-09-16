import {
  BriefcaseBusinessIcon,
  GraduationCapIcon,
  MailIcon,
  MapPinIcon,
  TimerIcon,
} from "lucide-react"
import { cn } from "cn"

import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  bio,
  education,
  focusAreas,
  profile,
  yearsOfExperience,
} from "@/data/portfolio"

const cardLabel =
  "flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase"

export function About() {
  const facts = [
    { label: "Based in", value: profile.location, icon: MapPinIcon },
    {
      label: "Currently",
      value: `${profile.role} at ${profile.currentCompany}`,
      icon: BriefcaseBusinessIcon,
    },
    {
      label: "Experience",
      value: `${yearsOfExperience()}+ years, since ${profile.careerStart.getFullYear()}`,
      icon: TimerIcon,
    },
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: MailIcon,
    },
  ]

  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="page-container">
        <SectionHeading
          eyebrow="About me"
          title="From pixel-perfect interfaces to the architecture behind them"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <Reveal className="space-y-5 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            {bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Reveal delay={120}>
              <Card className="h-full [--card-spacing:--spacing(6)]">
                <CardHeader>
                  <CardTitle className={cardLabel}>Quick facts</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-4">
                    {facts.map(({ label, value, href, icon: Icon }) => (
                      <div key={label} className="flex items-start gap-3.5">
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="size-4" />
                        </span>
                        <div className="min-w-0">
                          <dt className="text-xs text-muted-foreground">{label}</dt>
                          <dd className="mt-0.5 text-sm font-medium wrap-break-word">
                            {href ? (
                              <a
                                href={href}
                                className="underline-offset-4 hover:text-primary hover:underline"
                              >
                                {value}
                              </a>
                            ) : (
                              value
                            )}
                          </dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={220}>
              <Card className="h-full [--card-spacing:--spacing(6)]">
                <CardHeader>
                  <CardTitle className={cardLabel}>
                    <GraduationCapIcon className="size-4 text-primary" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="relative space-y-5 before:absolute before:top-2 before:bottom-2 before:left-1.25 before:w-px before:bg-border">
                    {education.map((item, index) => (
                      <li key={item.degree} className="relative pl-6">
                        <span
                          aria-hidden
                          className={cn(
                            "absolute top-1.5 left-0 size-2.75 rounded-full border-2 bg-card",
                            index === 0 ? "border-primary" : "border-muted-foreground/40"
                          )}
                        />
                        <p className="text-sm leading-snug font-medium">{item.degree}</p>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {item.institution}
                        </p>
                        <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                          {item.period} · {item.location}
                        </p>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map(({ title, description, icon: Icon }, index) => (
            <Reveal as="li" key={title} delay={index * 100}>
              <Card className="group h-full transition-[translate,box-shadow] duration-300 [--card-spacing:--spacing(6)] hover:-translate-y-1 hover:shadow-xl hover:ring-primary/30">
                <CardHeader className="gap-2">
                  <span className="mb-3 grid size-11 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <CardTitle className="text-base font-semibold">{title}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
