import { cn } from "cn"

export function Logo({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-xl bg-linear-to-br from-primary to-primary/70 font-mono text-sm font-bold tracking-tight text-primary-foreground shadow-md ring-1 shadow-primary/20 ring-primary/30",
        className
      )}
    >
      SL
    </span>
  )
}
