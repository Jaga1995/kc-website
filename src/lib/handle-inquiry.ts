import { randomBytes } from "node:crypto"
import {
  readInquiry,
  type InquiryState,
  type StoredInquiry,
} from "./inquiry"
import { saveInquiry } from "./inquiry-store"

const saveErrorMessage =
  "The inquiry was not saved. Please try again in a moment. There is no public email to fall back on yet."

export function createReference() {
  return `KC-${randomBytes(3).toString("hex").toUpperCase()}`
}

type InquiryDeps = {
  save?: (record: StoredInquiry) => Promise<void>
  reference?: () => string
}

export async function handleInquiry(
  formData: FormData,
  deps: InquiryDeps = {},
): Promise<InquiryState> {
  const read = readInquiry(formData)
  if (!read.ok) {
    return {
      status: "error",
      message: read.message,
      fieldErrors: read.fieldErrors,
      reference: null,
      receipt: null,
    }
  }

  const reference = deps.reference?.() ?? createReference()
  const save = deps.save ?? saveInquiry
  const record: StoredInquiry = {
    reference,
    createdAt: new Date().toISOString(),
    name: read.receipt.name,
    phone: read.storedPhone,
    email: read.receipt.email,
    projectType: read.receipt.projectType,
    message: read.receipt.message,
  }

  try {
    await save(record)
  } catch {
    console.error("Inquiry save failed")
    return {
      status: "error",
      message: saveErrorMessage,
      fieldErrors: {},
      reference: null,
      receipt: null,
    }
  }

  return {
    status: "success",
    message:
      "Your inquiry is saved on this site. It has not been emailed, because a public email address is not listed yet.",
    fieldErrors: {},
    reference,
    receipt: read.receipt,
  }
}
