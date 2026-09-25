"use server"

import { handleInquiry } from "@/lib/handle-inquiry"
import type { InquiryState } from "@/lib/inquiry"

export async function submitInquiry(
  previous: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  if (previous.status === "success") return previous
  // Keep the sending state on screen long enough to read.
  await new Promise((resolve) => setTimeout(resolve, 450))
  return handleInquiry(formData)
}
