import { z } from "zod"
import {
  projectTypeLabel,
  projectTypes,
  type ProjectType,
} from "./services"

const projectTypeValues = projectTypes.map((type) => type.value) as [
  ProjectType,
  ...ProjectType[],
]

export const inquiryFields = [
  "name",
  "phone",
  "email",
  "projectType",
  "message",
] as const

export type InquiryField = (typeof inquiryFields)[number]

export type FieldErrors = Partial<Record<InquiryField, string>>

export type InquiryReceipt = {
  name: string
  phone: string
  email: string
  projectType: ProjectType
  projectLabel: string
  message: string
}

export type InquiryState = {
  status: "idle" | "success" | "error"
  message: string
  fieldErrors: FieldErrors
  reference: string | null
  receipt: InquiryReceipt | null
}

export const initialInquiryState: InquiryState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  reference: null,
  receipt: null,
}

export type StoredInquiry = {
  reference: string
  createdAt: string
  name: string
  phone: string
  email: string
  projectType: ProjectType
  message: string
}

const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(80, "Use a name under 80 characters.")
    .regex(
      /^[\p{L}\s.'-]+$/u,
      "Use letters, spaces, apostrophes, or hyphens in your name.",
    ),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email.")
    .max(120, "Use an email under 120 characters.")
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Enter an email address like name@example.com.",
    ),
  projectType: z.enum(projectTypeValues, {
    error: "Choose a project type.",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Describe the project in at least a sentence.")
    .max(2000, "Keep the message under 2,000 characters."),
})

export function normalizePhone(input: string): string | null {
  const compact = input.trim().replace(/[\s().-]/g, "")
  if (!compact) return null

  let digits = compact.startsWith("+") ? compact.slice(1) : compact
  if (!/^\d+$/.test(digits)) return null
  if (digits.startsWith("91") && digits.length === 12) {
    digits = digits.slice(2)
  }
  if (digits.startsWith("0") && digits.length === 11) {
    digits = digits.slice(1)
  }
  if (!/^[1-9]\d{9}$/.test(digits)) return null
  return digits
}

function readString(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === "string" ? value : ""
}

function fieldErrorsFromZod(error: z.ZodError): FieldErrors {
  const fieldErrors: FieldErrors = {}
  for (const issue of error.issues) {
    const key = issue.path[0]
    if (typeof key !== "string") continue
    if (!inquiryFields.includes(key as InquiryField)) continue
    const field = key as InquiryField
    if (!fieldErrors[field]) fieldErrors[field] = issue.message
  }
  return fieldErrors
}

export type InquiryReadResult =
  | { ok: true; receipt: InquiryReceipt; storedPhone: string }
  | { ok: false; message: string; fieldErrors: FieldErrors }

export function readInquiry(formData: FormData): InquiryReadResult {
  const raw = {
    name: readString(formData, "name"),
    phone: readString(formData, "phone"),
    email: readString(formData, "email"),
    projectType: readString(formData, "projectType"),
    message: readString(formData, "message"),
  }

  const parsed = inquirySchema.safeParse({
    name: raw.name,
    email: raw.email,
    projectType: raw.projectType,
    message: raw.message,
  })

  const fieldErrors = parsed.success ? {} : fieldErrorsFromZod(parsed.error)
  const storedPhone = normalizePhone(raw.phone)

  if (!raw.phone.trim()) {
    fieldErrors.phone = "Enter a phone number."
  } else if (!storedPhone) {
    fieldErrors.phone =
      "Enter a 10-digit Indian phone number. You can include +91 or a leading 0."
  }

  if (Object.keys(fieldErrors).length > 0 || !parsed.success || !storedPhone) {
    return {
      ok: false,
      message: "Check the highlighted fields, then send the inquiry again.",
      fieldErrors,
    }
  }

  const projectType = parsed.data.projectType

  return {
    ok: true,
    storedPhone,
    receipt: {
      name: parsed.data.name,
      phone: raw.phone.trim(),
      email: parsed.data.email,
      projectType,
      projectLabel: projectTypeLabel(projectType),
      message: parsed.data.message,
    },
  }
}
