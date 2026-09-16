import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { About } from "@/components/sections/about"
import { Architecture } from "@/components/sections/architecture"
import { Contact } from "@/components/sections/contact"
import { Hero } from "@/components/sections/hero"
import { Skills } from "@/components/sections/skills"
import { Work } from "@/components/sections/work"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <TooltipProvider delayDuration={200}>
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>

        <div className="relative flex min-h-svh flex-col overflow-x-clip">
          <SiteHeader />
          <main id="main" className="flex-1">
            <Hero />
            <About />
            <Work />
            <Skills />
            <Architecture />
            <Contact />
          </main>
          <SiteFooter />
        </div>

        <Toaster position="bottom-right" closeButton />
      </TooltipProvider>
    </ThemeProvider>
  )
}
