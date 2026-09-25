import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { handleInquiry } from "./handle-inquiry"
import { normalizePhone, readInquiry } from "./inquiry"

const valid = {
  name: "Asha Rao",
  phone: "+91 98450 12345",
  email: "asha@example.com",
  projectType: "residential-construction",
  message: "We need a new two-storey house on a plot in Bengaluru.",
}

function form(data: Record<string, string>) {
  const formData = new FormData()
  for (const [key, value] of Object.entries(data)) {
    formData.set(key, value)
  }
  return formData
}

describe("normalizePhone", () => {
  it("accepts mobile numbers with country and trunk prefixes", () => {
    assert.equal(normalizePhone("9845012345"), "9845012345")
    assert.equal(normalizePhone("+91 98450 12345"), "9845012345")
    assert.equal(normalizePhone("09845012345"), "9845012345")
  })

  it("accepts a Bengaluru landline written with the trunk prefix", () => {
    assert.equal(normalizePhone("080 4123 4567"), "8041234567")
  })

  it("rejects short and non-numeric values", () => {
    assert.equal(normalizePhone("98450"), null)
    assert.equal(normalizePhone("call me"), null)
  })
})

describe("readInquiry", () => {
  it("returns field errors for an empty form", () => {
    const result = readInquiry(form({}))
    assert.equal(result.ok, false)
    if (result.ok) return
    assert.ok(result.fieldErrors.name)
    assert.ok(result.fieldErrors.phone)
    assert.ok(result.fieldErrors.email)
    assert.ok(result.fieldErrors.projectType)
    assert.ok(result.fieldErrors.message)
  })

  it("accepts a complete inquiry", () => {
    const result = readInquiry(form(valid))
    assert.equal(result.ok, true)
    if (!result.ok) return
    assert.equal(result.receipt.projectLabel, "Residential construction")
    assert.equal(result.storedPhone, "9845012345")
  })
})

describe("handleInquiry", () => {
  it("does not save an invalid inquiry", async () => {
    let saved = false
    const result = await handleInquiry(
      form({ ...valid, email: "not-an-email" }),
      {
        save: async () => {
          saved = true
        },
      },
    )
    assert.equal(result.status, "error")
    assert.equal(saved, false)
    assert.match(result.fieldErrors.email ?? "", /email/i)
  })

  it("saves a valid inquiry and returns a reference", async () => {
    let stored: unknown = null
    const result = await handleInquiry(form(valid), {
      reference: () => "KC-ABC123",
      save: async (record) => {
        stored = record
      },
    })
    assert.equal(result.status, "success")
    assert.equal(result.reference, "KC-ABC123")
    assert.equal(result.receipt?.name, "Asha Rao")
    assert.deepEqual(
      {
        reference: "KC-ABC123",
        phone: "9845012345",
        projectType: "residential-construction",
      },
      {
        reference: (stored as { reference: string }).reference,
        phone: (stored as { phone: string }).phone,
        projectType: (stored as { projectType: string }).projectType,
      },
    )
  })

  it("returns an error when the inquiry cannot be saved", async () => {
    const result = await handleInquiry(form(valid), {
      save: async () => {
        throw new Error("disk full")
      },
    })
    assert.equal(result.status, "error")
    assert.equal(result.reference, null)
    assert.equal(result.receipt, null)
    assert.match(result.message, /not saved/i)
    assert.deepEqual(result.fieldErrors, {})
  })
})
