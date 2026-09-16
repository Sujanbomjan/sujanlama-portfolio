import {
  CircleCheckIcon,
  GraduationCapIcon,
  KeyRoundIcon,
  ShoppingCartIcon,
  UserRoundIcon,
  type LucideIcon,
} from "lucide-react"
import { cn } from "cn"

import type { WorkItem } from "@/data/portfolio"

type Visual = NonNullable<WorkItem["visual"]>

const coverGradients: Record<Visual, string> = {
  sso: "from-primary/25 via-cyan-500/5 to-transparent",
  wallet: "from-indigo-500/25 via-sky-500/10 to-transparent",
  dashboard: "from-teal-500/25 via-emerald-500/10 to-transparent",
  shop: "from-amber-500/25 via-rose-500/10 to-transparent",
}

/** Decorative illustration at the top of a featured work card. */
export function WorkCover({ visual }: { visual: Visual }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative h-52 overflow-hidden border-b bg-linear-to-br",
        coverGradients[visual]
      )}
    >
      <div className="bg-grid absolute inset-0 opacity-70" />
      {visual === "sso" ? <SsoVisual /> : null}
      {visual === "wallet" ? <WalletVisual /> : null}
      {visual === "dashboard" ? <DashboardVisual /> : null}
      {visual === "shop" ? <ShopVisual /> : null}
    </div>
  )
}

const screenFrame =
  "absolute inset-x-6 top-7 bottom-0 rounded-t-xl border border-b-0 bg-background/90 p-4 shadow-xl backdrop-blur transition-transform duration-500 group-hover:-translate-y-1.5"

function SsoVisual() {
  return (
    <div className="relative flex h-full items-center justify-center gap-2 px-6 pb-6 sm:gap-3">
      <FlowNode icon={UserRoundIcon} label="User" />
      <FlowLink />
      <FlowNode icon={KeyRoundIcon} label="CAS" highlight />
      <FlowLink />
      <FlowNode icon={GraduationCapIcon} label="LMS" />

      <span className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full border bg-background/90 px-2.5 py-1 text-[11px] font-medium text-emerald-600 shadow-sm backdrop-blur dark:text-emerald-400">
        <CircleCheckIcon className="size-3.5" />
        Signed in once
      </span>
    </div>
  )
}

function FlowNode({
  icon: Icon,
  label,
  highlight,
}: {
  icon: LucideIcon
  label: string
  highlight?: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span
        className={cn(
          "grid size-14 place-items-center rounded-2xl border bg-background/90 shadow-md backdrop-blur transition-transform duration-500 group-hover:-translate-y-1",
          highlight &&
            "border-primary/50 bg-primary text-primary-foreground shadow-lg shadow-primary/30"
        )}
      >
        <Icon className="size-6" />
      </span>
      <span className="font-mono text-[11px] font-medium text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

function FlowLink() {
  return (
    <span className="mb-6 h-0.5 w-8 animate-flow-x bg-[linear-gradient(to_right,var(--color-primary)_50%,transparent_50%)] bg-size-[8px_2px] opacity-80 sm:w-12 md:w-8 lg:w-14" />
  )
}

function WalletVisual() {
  return (
    <div className="relative h-full">
      {/* Web app (React) */}
      <div className="absolute top-6 left-6 w-[58%] rounded-xl border bg-background/90 shadow-lg backdrop-blur transition-transform duration-500 group-hover:-translate-y-1">
        <div className="flex items-center gap-1 border-b px-3 py-2">
          <span className="size-1.5 rounded-full bg-red-400/80" />
          <span className="size-1.5 rounded-full bg-amber-400/80" />
          <span className="size-1.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 h-1.5 w-16 rounded-full bg-foreground/10" />
        </div>
        <div className="space-y-2.5 p-3">
          <div className="h-10 rounded-lg bg-linear-to-r from-indigo-500 to-sky-400 p-2">
            <span className="block h-1 w-8 rounded-full bg-white/70" />
            <span className="mt-2 block h-1.5 w-14 rounded-full bg-white/95" />
          </div>
          <div className="space-y-1.5">
            <span className="block h-1.5 w-full rounded-full bg-foreground/10" />
            <span className="block h-1.5 w-4/5 rounded-full bg-foreground/10" />
          </div>
        </div>
        <span className="absolute -bottom-6 left-0 font-mono text-[10px] font-medium text-muted-foreground">
          web · React
        </span>
      </div>

      {/* Mobile app (React Native) */}
      <div className="absolute top-5 right-8 w-24 rounded-[1.1rem] border-3 border-foreground/70 bg-background p-1.5 shadow-xl transition-transform duration-500 group-hover:-translate-y-2 dark:border-foreground/25">
        <span className="mx-auto block h-1 w-7 rounded-full bg-foreground/25" />
        <div className="mt-1.5 rounded-md bg-linear-to-br from-indigo-500 to-sky-400 p-1.5">
          <span className="block h-1 w-5 rounded-full bg-white/70" />
          <span className="mt-2 block h-1.5 w-10 rounded-full bg-white/95" />
        </div>
        <div className="mt-1.5 grid grid-cols-3 gap-1">
          {[0, 1, 2].map((key) => (
            <span key={key} className="mx-auto size-3.5 rounded-full bg-primary/25" />
          ))}
        </div>
        <div className="mt-1.5 space-y-1 pb-3">
          <span className="block h-1 w-full rounded-full bg-foreground/10" />
          <span className="block h-1 w-3/4 rounded-full bg-foreground/10" />
          <span className="block h-1 w-5/6 rounded-full bg-foreground/10" />
        </div>
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] font-medium whitespace-nowrap text-muted-foreground">
          mobile · React Native
        </span>
      </div>
    </div>
  )
}

function DashboardVisual() {
  return (
    <div className={screenFrame}>
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-14 rounded-full bg-foreground/20" />
        <span className="ml-auto h-1.5 w-8 rounded-full bg-primary/60" />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {["bg-primary/70", "bg-amber-500/70", "bg-sky-500/70"].map((accent) => (
          <div key={accent} className="rounded-md border bg-card p-2">
            <span className={cn("block h-1.5 w-6 rounded-full", accent)} />
            <span className="mt-1.5 block h-2 w-10 max-w-full rounded-full bg-foreground/25" />
          </div>
        ))}
      </div>
      <div className="mt-3 flex h-16 items-end gap-1.5">
        {[45, 70, 55, 85, 60, 95, 75, 65, 90].map((height, index) => (
          <span
            key={index}
            className="flex-1 rounded-t-sm bg-linear-to-t from-primary/40 to-primary"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  )
}

function ShopVisual() {
  const products = [
    "from-amber-400/70 to-rose-400/60",
    "from-rose-400/60 to-fuchsia-400/50",
    "from-orange-300/70 to-amber-500/60",
  ]

  return (
    <div className={screenFrame}>
      <div className="flex items-center gap-2">
        <span className="h-5 flex-1 rounded-full border bg-card" />
        <span className="relative grid size-6 place-items-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
          <ShoppingCartIcon className="size-3.5" />
          <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-amber-500 ring-2 ring-background" />
        </span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {products.map((gradient) => (
          <div key={gradient} className="space-y-1.5">
            <span className={cn("block h-16 rounded-md bg-linear-to-br", gradient)} />
            <span className="block h-1.5 w-3/4 rounded-full bg-foreground/20" />
            <span className="block h-1.5 w-1/2 rounded-full bg-amber-500/70" />
          </div>
        ))}
      </div>
    </div>
  )
}
