import { HeartHandshakeIcon } from "lucide-react"
import { cn } from "cn"

import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { skillGroups, softSkills } from "@/data/portfolio"

// Bento layout: frontend gets the wide slot; the last card fills its row on tablets.
const layout: Record<string, string> = {
  frontend: "lg:col-span-2",
  workflow: "md:col-span-2 lg:col-span-1",
}

export function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32">
      <div className="page-container">
        <SectionHeading
          eyebrow="Skills"
          title="A toolkit that spans the whole stack"
          description="The languages, frameworks and practices I use to take products from an idea to production — and keep them healthy as they grow."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map(({ id, title, description, icon: Icon, skills }, index) => (
            <Reveal key={id} delay={index * 80} className={layout[id]}>
              <Card className="group relative h-full overflow-hidden transition-[translate,box-shadow] duration-300 [--card-spacing:--spacing(6)] hover:-translate-y-1 hover:shadow-xl hover:ring-primary/30">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-20 -right-20 size-48 rounded-full bg-primary/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <CardHeader>
                  <div className="flex items-center gap-3.5">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <CardTitle className="text-base font-semibold">{title}</CardTitle>
                      <CardDescription>{description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="mt-2">
                  <ul className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <li key={skill}>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-lg border bg-background/70 px-3 py-1.5 text-sm font-medium transition-colors",
                            "hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                          )}
                        >
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-4">
          <div className="flex flex-col gap-4 rounded-xl border border-dashed bg-muted/30 p-5 sm:flex-row sm:items-center sm:p-6">
            <div className="flex items-center gap-3.5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-warm/15 text-brand-warm ring-1 ring-brand-warm/25">
                <HeartHandshakeIcon className="size-5" />
              </span>
              <div>
                <p className="text-base font-semibold">Beyond the code</p>
                <p className="text-sm text-muted-foreground">
                  The habits that make teams work
                </p>
              </div>
            </div>
            <ul className="flex flex-wrap gap-2 sm:ml-auto">
              {softSkills.map((skill) => (
                <li key={skill}>
                  <Badge variant="secondary" className="h-8 px-3.5 text-sm">
                    {skill}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
