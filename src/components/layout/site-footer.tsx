import { ArrowUpIcon } from "lucide-react";

import { Logo } from "@/components/logo";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { navItems, profile } from "@/data/portfolio";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="page-container py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <div>
              <p className="font-semibold tracking-tight">{profile.name}</p>
              <p className="text-sm text-muted-foreground">
                {profile.role} · {profile.city}
              </p>
            </div>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            © {year} {profile.name}. Built with React, shadcn/ui &amp; Tailwind
            CSS.
          </p>
          <div className="flex items-center gap-2">
            <SocialLinks />
            <Separator orientation="vertical" className="mx-1 h-6!" />
            <Button
              asChild
              variant="outline"
              size="icon-lg"
              className="rounded-full"
            >
              <a href="#home" aria-label="Back to top">
                <ArrowUpIcon />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
