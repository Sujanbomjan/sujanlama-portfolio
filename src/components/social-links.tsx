import { MailIcon } from "lucide-react"
import { cn } from "cn"

import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { profile } from "@/data/portfolio"

const links = [
  { label: "GitHub", href: profile.socials.github, icon: GitHubIcon },
  { label: "LinkedIn", href: profile.socials.linkedin, icon: LinkedInIcon },
  { label: "Email", href: `mailto:${profile.email}`, icon: MailIcon },
]

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {links.map(({ label, href, icon: Icon }) => {
        const external = href.startsWith("http")
        return (
          <li key={label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="ghost"
                  size="icon-lg"
                  className="rounded-full text-muted-foreground hover:text-primary"
                >
                  <a
                    href={href}
                    aria-label={label}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                  >
                    <Icon />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>{label}</TooltipContent>
            </Tooltip>
          </li>
        )
      })}
    </ul>
  )
}
