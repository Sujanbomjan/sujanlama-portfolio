import {
  ArrowUpRightIcon,
  Building2Icon,
  ExternalLinkIcon,
  UserRoundIcon,
} from "lucide-react"
import { cn } from "cn"

import { GitHubIcon } from "@/components/brand-icons"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { WorkCover } from "@/components/sections/work-visuals"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  profile,
  workItems,
  type Company,
  type WorkItem,
} from "@/data/portfolio"

const featuredItems = workItems.filter((item) => item.visual)
const highlightItems = workItems.filter((item) => !item.visual)

export function Work() {
  return (
    <section
      id="work"
      className="border-y border-border/60 bg-muted/30 py-24 sm:py-32"
    >
      <div className="page-container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Work & projects"
            title="What I've built"
            description="Products and systems I've shipped — from centralized authentication and digital payments to retail and e-commerce."
          />
          <Reveal animation="fadeInUp" delay={200} className="shrink-0">
            <Button asChild variant="outline" className="h-10 rounded-full px-5">
              <a href={profile.socials.github} target="_blank" rel="noreferrer">
                <GitHubIcon />
                More on GitHub
                <ArrowUpRightIcon />
              </a>
            </Button>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {featuredItems.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 90}>
              <FeaturedCard item={item} />
            </Reveal>
          ))}
        </ul>

        <ul className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {highlightItems.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={index * 90}
              className={cn(
                // An odd card out fills its row on tablets.
                highlightItems.length % 2 === 1 &&
                  index === highlightItems.length - 1 &&
                  "md:col-span-2 lg:col-span-1"
              )}
            >
              <HighlightCard item={item} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

const cardInteraction =
  "group h-full transition-[translate,box-shadow] duration-300 [--card-spacing:--spacing(6)] hover:-translate-y-1 hover:shadow-xl hover:ring-primary/30"

function FeaturedCard({ item }: { item: WorkItem }) {
  const Icon = item.icon

  return (
    <Card className={cn(cardInteraction, "gap-0 pt-0")}>
      {item.visual ? <WorkCover visual={item.visual} /> : null}

      <CardHeader className="gap-2 pt-6">
        <div className="flex min-h-7 items-center justify-between gap-3">
          <p className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.18em] text-primary uppercase">
            <Icon className="size-3.5" />
            {item.category}
          </p>
          {item.link ? <ItemLink title={item.title} link={item.link} /> : null}
        </div>
        <CardTitle className="text-xl font-semibold tracking-tight">{item.title}</CardTitle>
        <p className="flex flex-wrap items-center gap-x-1.5 text-sm text-muted-foreground">
          {item.company ? (
            <>
              <Building2Icon className="size-3.5" />
              <CompanyName company={item.company} />
              {item.role ? <span aria-hidden>·</span> : null}
            </>
          ) : (
            <UserRoundIcon className="size-3.5" />
          )}
          {item.role ? <span>{item.role}</span> : null}
        </p>
        <CardDescription className="mt-1 leading-relaxed">{item.description}</CardDescription>
      </CardHeader>

      <CardContent className="mt-auto pt-5">
        <StackList stack={item.stack} />
      </CardContent>
    </Card>
  )
}

function HighlightCard({ item }: { item: WorkItem }) {
  const Icon = item.icon

  return (
    <Card className={cardInteraction}>
      <CardHeader className="gap-2">
        <span className="mb-3 grid size-11 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="size-5" />
        </span>
        {item.company ? (
          <p className="inline-flex w-fit items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
            <Building2Icon className="size-3.5" />
            <CompanyName company={item.company} />
          </p>
        ) : null}
        <CardTitle className="text-base font-semibold">{item.title}</CardTitle>
        <CardDescription className="leading-relaxed">{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto pt-5">
        <StackList stack={item.stack} />
      </CardContent>
    </Card>
  )
}

function CompanyName({ company }: { company: Company }) {
  return company.url ? (
    <a
      href={company.url}
      target="_blank"
      rel="noreferrer"
      className="transition-colors hover:text-primary"
    >
      {company.name}
    </a>
  ) : (
    <span>{company.name}</span>
  )
}

function ItemLink({
  title,
  link,
}: {
  title: string
  link: NonNullable<WorkItem["link"]>
}) {
  const Icon = link.kind === "source" ? GitHubIcon : ExternalLinkIcon

  return (
    <Button asChild variant="outline" size="sm" className="shrink-0 rounded-full">
      <a href={link.href} target="_blank" rel="noreferrer">
        <Icon />
        {link.label}
        <span className="sr-only"> for {title}</span>
      </a>
    </Button>
  )
}

function StackList({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {stack.map((tech) => (
        <li key={tech}>
          <Badge variant="outline" className="h-6 px-2.5">
            {tech}
          </Badge>
        </li>
      ))}
    </ul>
  )
}
