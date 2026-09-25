import { appendFile, mkdir } from "node:fs/promises"
import path from "node:path"
import type { StoredInquiry } from "./inquiry"

export async function saveInquiry(record: StoredInquiry) {
  const directory = path.join(process.cwd(), "data")
  await mkdir(directory, { recursive: true })
  const file = path.join(directory, "inquiries.jsonl")
  await appendFile(file, `${JSON.stringify(record)}\n`, "utf8")
}
