"use client"

import { useState } from "react"
import { useActionState } from "react"
import { ChevronDown } from "lucide-react"
import { CtaLink } from "@/components/cta-link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { submitInquiry } from "@/app/contact/actions"
import {
  initialInquiryState,
  readInquiry,
  type FieldErrors,
  type InquiryField,
  type InquiryState,
} from "@/lib/inquiry"
import { projectTypes } from "@/lib/services"
import { cn } from "@/lib/utils"

const fieldClass =
  "h-12 rounded-sm bg-background px-3 text-base md:text-base"

const focusOrder: InquiryField[] = [
  "name",
  "phone",
  "email",
  "projectType",
  "message",
]

export function InquiryForm() {
  const [session, setSession] = useState(0)
  return (
    <InquiryFormSession
      key={session}
      onAnother={() => setSession((value) => value + 1)}
    />
  )
}

function InquiryFormSession({ onAnother }: { onAnother: () => void }) {
  const [state, formAction, pending] = useActionState(
    submitInquiry,
    initialInquiryState,
  )
  const [sending, setSending] = useState(false)
  const [clientState, setClientState] = useState<Pick<
    InquiryState,
    "message" | "fieldErrors"
  > | null>(null)
  const busy = sending || pending

  if (sending && !pending && state.status === "error") {
    setSending(false)
  }

  const fieldErrors = clientState?.fieldErrors ?? state.fieldErrors
  const banner = busy
    ? ""
    : clientState?.message || (state.status === "error" ? state.message : "")

  if (state.status === "success" && state.reference && state.receipt) {
    return (
      <SuccessState
        reference={state.reference}
        message={state.message}
        receipt={state.receipt}
        onAnother={onAnother}
      />
    )
  }

  return (
    <form
      className="grid gap-5 border border-border bg-card p-5 sm:p-7"
      aria-busy={busy}
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const read = readInquiry(data)
        if (!read.ok) {
          setClientState({
            message: read.message,
            fieldErrors: read.fieldErrors,
          })
          const first = focusOrder.find((field) => read.fieldErrors[field])
          if (first) {
            document.getElementById(fieldId(first))?.focus()
          }
          return
        }
        setClientState(null)
        setSending(true)
        window.setTimeout(() => {
          formAction(data)
        }, 40)
      }}
    >
      <div>
        <p className="text-xs font-medium tracking-[0.2em] text-brass uppercase">
          Project inquiry
        </p>
        <h2 className="mt-2 font-heading text-3xl tracking-tight">
          Tell us about the job
        </h2>
      </div>

      {banner ? (
        <p
          role="alert"
          className="border border-error-line bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {banner}
        </p>
      ) : null}

      <Field
        id="name"
        label="Name"
        error={fieldErrors.name}
        hint="The person we should speak with."
      >
        <Input
          id={fieldId("name")}
          name="name"
          autoComplete="name"
          disabled={busy}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={describedBy("name", fieldErrors)}
          className={fieldClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="phone" label="Phone" error={fieldErrors.phone}>
          <Input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            disabled={busy}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={describedBy("phone", fieldErrors)}
            className={fieldClass}
          />
        </Field>
        <Field id="email" label="Email" error={fieldErrors.email}>
          <Input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            disabled={busy}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={describedBy("email", fieldErrors)}
            className={fieldClass}
          />
        </Field>
      </div>

      <Field
        id="projectType"
        label="Project type"
        error={fieldErrors.projectType}
      >
        <div className="relative">
          <select
            id={fieldId("projectType")}
            name="projectType"
            defaultValue=""
            disabled={busy}
            aria-invalid={Boolean(fieldErrors.projectType)}
            aria-describedby={describedBy("projectType", fieldErrors)}
            className={cn(
              fieldClass,
              "w-full appearance-none border border-input bg-transparent pr-10 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
            )}
          >
            <option value="" disabled>
              Select a project type
            </option>
            {projectTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
          />
        </div>
      </Field>

      <Field
        id="message"
        label="Message"
        error={fieldErrors.message}
        hint="What needs building, changing, or managing, and where the site is."
      >
        <Textarea
          id={fieldId("message")}
          name="message"
          rows={6}
          disabled={busy}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={describedBy("message", fieldErrors, true)}
          className="min-h-36 rounded-sm bg-background px-3 py-3 text-base md:text-base"
        />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          disabled={busy}
          className="h-12 rounded-sm px-6 text-base"
        >
          {busy ? "Sending inquiry…" : "Send inquiry"}
        </Button>
        <p className="text-sm text-muted-foreground">
          Saved on this site. Not emailed.
        </p>
      </div>
    </form>
  )
}

function SuccessState({
  reference,
  message,
  receipt,
  onAnother,
}: {
  reference: string
  message: string
  receipt: NonNullable<InquiryState["receipt"]>
  onAnother: () => void
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="border border-ink bg-success p-6 text-inverse sm:p-8"
    >
      <p className="text-xs font-medium tracking-[0.2em] text-inverse uppercase">
        Inquiry received
      </p>
      <p className="mt-4 font-heading text-5xl tracking-tight">{reference}</p>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-inverse">
        {message} Keep this reference. Office phone, email, and street address
        will be added when they are ready to publish.
      </p>
      <dl className="mt-8 grid gap-4 border-t border-inverse/25 pt-6 text-sm sm:grid-cols-2">
        <ReceiptItem label="Name" value={receipt.name} />
        <ReceiptItem label="Phone" value={receipt.phone} />
        <ReceiptItem label="Email" value={receipt.email} />
        <ReceiptItem label="Project type" value={receipt.projectLabel} />
        <div className="sm:col-span-2">
          <dt className="text-[11px] tracking-[0.16em] text-inverse uppercase">
            Message
          </dt>
          <dd className="mt-1 leading-relaxed text-inverse">{receipt.message}</dd>
        </div>
      </dl>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={onAnother}
          className="h-12 rounded-sm border-ink bg-primary px-5 text-base text-ink hover:bg-brand-line"
        >
          Send another inquiry
        </Button>
        <CtaLink href="/services" variant="secondary" className="border-inverse bg-transparent text-inverse hover:bg-inverse/10">
          Read the services
        </CtaLink>
      </div>
    </div>
  )
}

function ReceiptItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] tracking-[0.16em] text-inverse uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-inverse">{value}</dd>
    </div>
  )
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: InquiryField
  label: string
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={fieldId(id)}>{label}</Label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="text-sm text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function fieldId(field: InquiryField) {
  return `inquiry-${field}`
}

function describedBy(
  field: InquiryField,
  errors: FieldErrors,
  hasHint = false,
) {
  const ids = [
    hasHint ? `${field}-hint` : null,
    errors[field] ? `${field}-error` : null,
  ].filter(Boolean)
  return ids.length > 0 ? ids.join(" ") : undefined
}
