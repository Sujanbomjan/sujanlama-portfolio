import { ArrowUpRightIcon, MailIcon, MapPinIcon } from "lucide-react"

import { LinkedInIcon } from "@/components/brand-icons"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { ContactForm } from "@/components/sections/contact-form"
import { profile } from "@/data/portfolio"

const contactMethods = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: MailIcon,
  },
  {
    label: "LinkedIn",
    value: "in/sujan-bomjan",
    href: profile.socials.linkedin,
    icon: LinkedInIcon,
  },
  {
    label: "Location",
    value: profile.location,
    icon: MapPinIcon,
  },
]

export function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden border-t border-border/60 bg-muted/30 py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 -z-10 size-128 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="page-container grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something great together"
            description="Have a project in mind, a role to discuss, or just want to say hello? My inbox is always open."
          />

          <ul className="mt-10 space-y-3">
            {contactMethods.map(({ label, value, href, icon: Icon }, index) => {
              const content = (
                <>
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted-foreground">{label}</span>
                    <span className="block truncate font-medium">{value}</span>
                  </span>
                </>
              )

              return (
                <Reveal as="li" key={label} delay={index * 80}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noreferrer" : undefined}
                      className="group flex items-center gap-4 rounded-xl border bg-card p-4 transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-lg"
                    >
                      {content}
                      <ArrowUpRightIcon className="ml-auto size-4 shrink-0 text-muted-foreground transition-[translate,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-xl border bg-card p-4">
                      {content}
                    </div>
                  )}
                </Reveal>
              )
            })}
          </ul>
        </div>

        <Reveal delay={150} className="lg:pt-4">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
