import type { CSSProperties, ReactNode } from "react"
import { cn } from "cn"

import { useInView } from "@/hooks/use-in-view"

/** animate.css entrance animations used across the site (plus the subtle custom `revealUp`). */
export type RevealAnimation =
  | "revealUp"
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "fadeInLeft"
  | "fadeInRight"
  | "zoomIn"

type RevealProps = {
  children: ReactNode
  animation?: RevealAnimation
  /** Delay in milliseconds, handy for staggering lists. */
  delay?: number
  /** Override animate.css's duration, in milliseconds. */
  duration?: number
  as?: "div" | "li" | "span"
  className?: string
}

/** Plays an animate.css entrance animation the first time the element scrolls into view. */
export function Reveal({
  children,
  animation = "revealUp",
  delay,
  duration,
  as: Component = "div",
  className,
}: RevealProps) {
  const [ref, inView] = useInView()

  const style: CSSProperties | undefined = inView
    ? {
        animationDelay: delay ? `${delay}ms` : undefined,
        animationDuration: duration ? `${duration}ms` : undefined,
      }
    : undefined

  return (
    <Component
      ref={ref}
      data-reveal=""
      style={style}
      className={cn(
        inView ? `animate__animated animate__${animation}` : "opacity-0",
        className
      )}
    >
      {children}
    </Component>
  )
}
