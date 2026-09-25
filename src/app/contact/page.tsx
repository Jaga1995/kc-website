import type { Metadata } from "next"
import { InquiryForm } from "@/components/inquiry-form"
import { PageHero } from "@/components/page-hero"
import { company } from "@/lib/site"

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a project with ${company.brand}. Send an inquiry with your name, phone, email, project type, and a short description.`,
}

const notes = [
  {
    title: "What to send",
    text: "Your name, a phone number, an email, the type of project, and a short description of the site.",
  },
  {
    title: "What happens next",
    text: "The form is checked, then the inquiry is saved on this website with a reference code. It is not emailed, because a public email address has not been added yet.",
  },
  {
    title: "Still to be published",
    text: "Office phone, email, and street address will be added to this page when they are ready to publish.",
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start a project."
        lede="Tell BrickHome Builders what you need built, changed, or managed. The inquiry is the contact path while the office phone, email, and address are still to be published."
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-12 md:px-8 md:py-20">
        <aside className="grid content-start gap-8 md:col-span-4">
          {notes.map((note) => (
            <section key={note.title}>
              <h2 className="text-xs font-medium tracking-[0.2em] text-brass uppercase">
                {note.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {note.text}
              </p>
            </section>
          ))}
        </aside>
        <div className="md:col-span-8">
          <InquiryForm />
        </div>
      </div>
    </>
  )
}
