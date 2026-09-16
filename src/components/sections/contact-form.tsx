import { useRef, useState, type ChangeEvent, type FormEvent } from "react"
import { Loader2Icon, SendIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { profile } from "@/data/portfolio"
import {
  isFirebaseConfigured,
  saveContactMessage,
  type ContactMessage,
} from "@/lib/firebase"

type FieldName = keyof ContactMessage
type FormErrors = Partial<Record<FieldName, string>>

const emptyForm: ContactMessage = { name: "", email: "", subject: "", message: "" }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Limits mirror firestore.rules so invalid submissions never reach Firebase.
const LIMITS = { name: 100, email: 200, subject: 150, message: 5000 }

function openEmailDraft(message: ContactMessage) {
  const subject = message.subject || `Portfolio enquiry from ${message.name}`
  const body = `${message.message}\n\n— ${message.name} (${message.email})`
  window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function validate(values: ContactMessage): FormErrors {
  const errors: FormErrors = {}
  if (values.name.trim().length < 2) {
    errors.name = "Please tell me your name."
  }
  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address."
  }
  if (values.message.trim().length < 10) {
    errors.message = "Your message should be at least 10 characters."
  }
  return errors
}

export function ContactForm() {
  const [values, setValues] = useState<ContactMessage>(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const shakeRef = useRef<HTMLDivElement>(null)
  const honeypotRef = useRef<HTMLInputElement>(null)

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = event.target.name as FieldName
    const { value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }))
    }
  }

  // Replays animate.css's headShake to draw attention to validation errors.
  function shake() {
    const node = shakeRef.current
    if (!node) return
    node.classList.remove("animate__animated", "animate__headShake")
    void node.offsetWidth
    node.classList.add("animate__animated", "animate__headShake")
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Bots tend to fill every field, including this hidden one.
    if (honeypotRef.current?.value) return

    const nextErrors = validate(values)
    setErrors(nextErrors)
    const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0]
    if (firstInvalid) {
      shake()
      document.getElementById(`contact-${firstInvalid}`)?.focus()
      return
    }

    const message: ContactMessage = {
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    }

    if (!isFirebaseConfigured) {
      // Without Firebase keys, fall back to a pre-filled email draft.
      openEmailDraft(message)
      toast.info("Opening your email app…", {
        description: "Your message is drafted and ready to send.",
      })
      return
    }

    setSubmitting(true)
    try {
      await saveContactMessage(message)
      setValues(emptyForm)
      toast.success("Message sent!", {
        description: "Thanks for reaching out — I'll get back to you soon.",
      })
    } catch (error) {
      console.error("Failed to send contact message", error)
      // Keep what the visitor typed and offer email as a way to still reach me.
      toast.error("Your message couldn't be sent.", {
        description: "Please try again, or send it by email instead.",
        action: { label: "Send via email", onClick: () => openEmailDraft(message) },
        duration: 10000,
      })
    } finally {
      setSubmitting(false)
    }
  }

  const fieldProps = (name: FieldName) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    maxLength: LIMITS[name],
    disabled: submitting,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  })

  return (
    <div ref={shakeRef}>
      <Card className="shadow-xl shadow-black/5 [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(8)] dark:shadow-black/30">
        <CardHeader>
          <CardTitle className="text-xl font-semibold tracking-tight">
            Send me a message
          </CardTitle>
          <CardDescription>
            Fill in the form and I&apos;ll reply to you by email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form noValidate onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field data-invalid={Boolean(errors.name)}>
                  <FieldLabel htmlFor="contact-name">Name</FieldLabel>
                  <Input
                    {...fieldProps("name")}
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className="h-10"
                  />
                  {errors.name ? (
                    <FieldError id="contact-name-error">{errors.name}</FieldError>
                  ) : null}
                </Field>

                <Field data-invalid={Boolean(errors.email)}>
                  <FieldLabel htmlFor="contact-email">Email</FieldLabel>
                  <Input
                    {...fieldProps("email")}
                    type="email"
                    autoComplete="email"
                    placeholder="jane@company.com"
                    className="h-10"
                  />
                  {errors.email ? (
                    <FieldError id="contact-email-error">{errors.email}</FieldError>
                  ) : null}
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="contact-subject">
                  Subject <span className="font-normal text-muted-foreground">(optional)</span>
                </FieldLabel>
                <Input
                  {...fieldProps("subject")}
                  placeholder="Project, role or just saying hello"
                  className="h-10"
                />
              </Field>

              <Field data-invalid={Boolean(errors.message)}>
                <FieldLabel htmlFor="contact-message">Message</FieldLabel>
                <Textarea
                  {...fieldProps("message")}
                  rows={6}
                  placeholder="Tell me a little about what you have in mind…"
                  className="min-h-36 resize-y"
                />
                {errors.message ? (
                  <FieldError id="contact-message-error">{errors.message}</FieldError>
                ) : null}
              </Field>

              {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
              <div aria-hidden className="sr-only">
                <label htmlFor="contact-company">Company</label>
                <input
                  ref={honeypotRef}
                  id="contact-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="h-11 w-full rounded-full px-6 shadow-lg shadow-primary/25 sm:w-auto"
                >
                  {submitting ? (
                    <>
                      <Loader2Icon className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <SendIcon />
                    </>
                  )}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
