import { useRef, useState, type MouseEvent } from "react";
import { ArrowRightIcon, DownloadIcon, MenuIcon } from "lucide-react";
import { cn } from "cn";

import { Logo } from "@/components/logo";
import { SocialLinks } from "@/components/social-links";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrolled } from "@/hooks/use-scrolled";
import { navItems, profile } from "@/data/portfolio";

const sectionIds = ["home", ...navItems.map((item) => item.id)];

export function SiteHeader() {
  const scrolled = useScrolled();
  const activeId = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const pendingTarget = useRef<string | null>(null);

  function handleMobileNavigate(
    event: MouseEvent<HTMLAnchorElement>,
    id: string,
  ) {
    event.preventDefault();
    pendingTarget.current = id;
    setMenuOpen(false);
  }

  function scrollToPendingTarget(event: Event) {
    const id = pendingTarget.current;
    if (!id) return;
    event.preventDefault();
    pendingTarget.current = null;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    history.pushState(null, "", `#${id}`);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-border/70 bg-background/75 shadow-sm backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="page-container flex h-16 items-center justify-between gap-4 animate__animated animate__fadeInDown">
        <a
          href="#home"
          className="flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Logo />
          <span className="text-[0.95rem] font-semibold tracking-tight">
            {profile.name}
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active ? "location" : undefined}
                    className={cn(
                      "relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
                      active && "text-foreground",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300",
                        active && "scale-x-100",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ModeToggle />
          <Button
            asChild
            variant="outline"
            className="ml-1 hidden h-9 px-3.5 lg:inline-flex"
          >
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
              Resume
              <DownloadIcon data-icon="inline-end" />
            </a>
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-lg"
                className="rounded-full lg:hidden"
                aria-label="Open navigation menu"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85%] max-w-xs"
              onCloseAutoFocus={scrollToPendingTarget}
            >
              <SheetHeader className="border-b">
                <SheetTitle className="flex items-center gap-2.5">
                  <Logo className="size-8 text-xs" />
                  {profile.name}
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Jump to a section of the portfolio
                </SheetDescription>
              </SheetHeader>

              <nav aria-label="Mobile" className="px-2">
                <ul className="flex flex-col gap-1">
                  {navItems.map((item, index) => (
                    <li
                      key={item.id}
                      className="animate__animated animate__fadeInRight"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animationDuration: "450ms",
                      }}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={(event) =>
                          handleMobileNavigate(event, item.id)
                        }
                        aria-current={
                          activeId === item.id ? "location" : undefined
                        }
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                          activeId === item.id && "bg-primary/10 text-primary",
                        )}
                      >
                        {item.label}
                        <ArrowRightIcon className="size-4 opacity-60" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <SheetFooter className="gap-3 border-t">
                <Button asChild size="lg" className="h-10">
                  <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                    Download resume
                    <DownloadIcon data-icon="inline-end" />
                  </a>
                </Button>
                <SocialLinks className="justify-center" />
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
