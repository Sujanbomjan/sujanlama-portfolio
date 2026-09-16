import { MoonIcon, SunIcon } from "lucide-react"

import { useTheme } from "@/components/theme/theme-context"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark"

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          className="relative rounded-full"
          onClick={() => setTheme(nextTheme)}
          aria-label={`Switch to ${nextTheme} mode`}
        >
          <SunIcon className="scale-100 rotate-0 transition-transform duration-300 dark:scale-0 dark:-rotate-90" />
          <MoonIcon className="absolute scale-0 rotate-90 transition-transform duration-300 dark:scale-100 dark:rotate-0" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Switch to {nextTheme} mode</TooltipContent>
    </Tooltip>
  )
}
