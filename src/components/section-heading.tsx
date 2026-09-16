import type { ReactNode } from "react"
import { cn } from "cn"

import { Reveal } from "@/components/reveal"

type SectionHeadingProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <Reveal animation="fadeInUp">
        <p className="inline-flex items-center gap-3 font-mono text-xs font-medium tracking-[0.2em] text-primary uppercase">
          <span aria-hidden className="h-px w-8 bg-primary/60" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal animation="fadeInUp" delay={80}>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal animation="fadeInUp" delay={160}>
          <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}
