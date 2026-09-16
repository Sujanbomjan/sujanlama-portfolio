import { cn } from "cn"

import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import {
  architectureLayers,
  architecturePrinciples,
  type DiagramLayer,
} from "@/data/portfolio"

export function Architecture() {
  return (
    <section
      id="architecture"
      className="border-y border-border/60 bg-muted/30 py-24 sm:py-32"
    >
      <div className="page-container">
        <SectionHeading
          eyebrow="System design"
          title="Architecture that scales with the business"
          description="Shipping features is only half the job. I think about how services talk to each other, how tenants stay isolated, and how people sign in once and reach everything they're allowed to."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {architecturePrinciples.map(({ title, description, icon: Icon }, index) => (
              <Reveal as="li" key={title} delay={index * 90}>
                <div className="group flex h-full gap-4 rounded-xl border bg-card p-5 transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-lg">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal animation="fadeIn" delay={150} duration={900}>
            <ArchitectureDiagram />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ArchitectureDiagram() {
  return (
    <figure className="relative overflow-hidden rounded-2xl border bg-card shadow-2xl shadow-primary/5">
      <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-3">
        <div aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-red-400/80" />
          <span className="size-2.5 rounded-full bg-amber-400/80" />
          <span className="size-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">
          multi-tenant-platform.arch
        </span>
      </div>

      <div className="relative p-4 sm:p-6">
        <div
          aria-hidden
          className="bg-grid absolute inset-0 mask-[linear-gradient(to_bottom,black,transparent)]"
        />
        <div className="relative">
          {architectureLayers.map((layer, index) => (
            <DiagramRow key={layer.label} layer={layer} delay={250 + index * 180} />
          ))}
        </div>
      </div>

      <figcaption className="border-t px-4 py-3 text-xs text-muted-foreground sm:px-6">
        Illustrative reference: clients reach tenant-scoped microservices through
        an API gateway, with CAS providing single sign-on.
      </figcaption>
    </figure>
  )
}

function DiagramRow({ layer, delay }: { layer: DiagramLayer; delay: number }) {
  return (
    <>
      <Reveal animation="fadeInUp" delay={delay} duration={600}>
        <div className="rounded-xl border border-dashed bg-background/70 p-3 backdrop-blur-sm">
          <p className="mb-2.5 font-mono text-[10px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
            {layer.label}
          </p>
          <ul className="flex flex-wrap gap-2">
            {layer.nodes.map(({ label, icon: Icon, highlight }) => (
              <li
                key={label}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border bg-card px-2.5 py-1.5 text-xs font-medium shadow-xs",
                  highlight && "border-primary/40 bg-primary/10 text-primary"
                )}
              >
                <Icon className="size-3.5" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {layer.connector ? (
        <div aria-hidden className="relative flex h-10 items-center justify-center">
          <span className="h-full w-0.5 animate-flow bg-[linear-gradient(to_bottom,var(--color-primary)_50%,transparent_50%)] bg-size-[2px_8px] opacity-70" />
          <span className="absolute left-1/2 ml-3 font-mono text-[10px] whitespace-nowrap text-muted-foreground">
            {layer.connector}
          </span>
        </div>
      ) : null}
    </>
  )
}
