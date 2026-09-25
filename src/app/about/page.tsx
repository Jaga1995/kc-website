import type { Metadata } from "next"
import { CtaLink } from "@/components/cta-link"
import { PageHero } from "@/components/page-hero"
import { company } from "@/lib/site"

export const metadata: Metadata = {
  title: "About",
  description:
    "K and C Constructions is a construction and services company based in Bengaluru, India.",
}

const facts = [
  { label: "Name", value: company.name },
  { label: "Base", value: `${company.city}, ${company.country}` },
  { label: "Work", value: "Construction and services" },
  {
    label: "Contact",
    value: "Inquiry form. Phone, email, and address to be published.",
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Based in Bengaluru. Building, and the services around it."
        lede="K and C Constructions is a construction and services company working from Bengaluru, India. This page says what that means, and only what we can stand behind today."
      />
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
        <div className="md:col-span-5">
          <dl className="border-y border-border">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="grid gap-1 border-b border-border py-4 last:border-b-0 sm:grid-cols-3"
              >
                <dt className="text-xs tracking-[0.18em] text-brass uppercase">
                  {fact.label}
                </dt>
                <dd className="text-sm leading-relaxed sm:col-span-2">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid gap-10 md:col-span-6 md:col-start-7">
          <section>
            <h2 className="font-heading text-3xl tracking-tight">The work</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We build and we run construction services. That covers new
              residential and commercial buildings, renovation and remodeling,
              civil and structural works, interior fit-out, and project
              management. The catalog on this site is the current set, kept in
              one place so it can change when the company does.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-3xl tracking-tight">The city</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Bengaluru is the base. A project starts with a conversation about
              the site, then a visit, then a written scope. We describe work we
              can go and see.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-3xl tracking-tight">
              Still to be published
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Office phone, email, and street address will be added when they
              are ready to publish. Years in business, project counts, awards,
              and client names will be added only when the company chooses to
              put them in writing. Until then, the inquiry form is the way to
              start.
            </p>
          </section>
        </div>
      </section>
      <section className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-14 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="max-w-xl font-heading text-3xl tracking-tight text-balance">
            If you have a site in mind, send the inquiry.
          </p>
          <CtaLink href="/contact">Start a project</CtaLink>
        </div>
      </section>
    </>
  )
}
