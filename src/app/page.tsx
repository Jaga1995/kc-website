import Link from "next/link"
import { CtaLink } from "@/components/cta-link"
import { SectionPlate } from "@/components/section-plate"
import { services } from "@/lib/services"
import { stages } from "@/lib/site"

const facts = [
  {
    label: "Base",
    text: "Bengaluru, India. The company works from this city.",
  },
  {
    label: "Work",
    text: "Construction, and the services that carry a building through.",
  },
  {
    label: "Start",
    text: "An inquiry form. Phone, email, and address are still to be published.",
  },
]

export default function HomePage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl md:grid-cols-12">
          <div className="flex flex-col justify-center px-5 py-14 md:col-span-7 md:px-8 md:py-20">
            <p className="text-xs font-medium tracking-[0.22em] text-brass uppercase">
              Bengaluru · Construction and services
            </p>
            <h1 className="mt-5 max-w-xl font-heading text-[2.75rem] leading-[0.95] tracking-tight text-balance sm:text-6xl md:text-7xl">
              The building,{" "}
              <span className="text-ink italic">carried through.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              K and C Constructions is a construction and services company based
              in Bengaluru. We take residential and commercial work, renovation,
              civil and structural jobs, interior fit-out, and project
              management — from the first enquiry to handover.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaLink href="/contact">Start a project</CtaLink>
              <CtaLink href="/services" variant="secondary">
                See the services
              </CtaLink>
            </div>
          </div>
          <div className="md:col-span-5">
            <SectionPlate />
          </div>
        </div>
      </section>

      <section aria-label="Company facts" className="border-b border-border">
        <ul className="mx-auto grid max-w-6xl md:grid-cols-3">
          {facts.map((fact) => (
            <li
              key={fact.label}
              className="border-b border-border px-5 py-6 last:border-b-0 md:border-r md:border-b-0 md:px-8 md:last:border-r-0"
            >
              <p className="text-[11px] tracking-[0.2em] text-brass uppercase">
                {fact.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed">{fact.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
        <div className="md:col-span-4">
          <p className="text-xs font-medium tracking-[0.22em] text-brass uppercase">
            01 — Who we are
          </p>
          <h2 className="mt-3 font-heading text-4xl tracking-tight text-balance md:text-5xl">
            A construction company, stated plainly.
          </h2>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <p className="text-lg leading-relaxed">
            We work from Bengaluru. A project with us is a construction job
            with a written scope, a site that is actually visited, and a
            handover checked against what was agreed.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            This site publishes the services we offer now and the way a job
            runs. Company history, awards, and a list of clients will be added
            only when we are ready to put them in writing.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex text-sm font-medium underline decoration-primary underline-offset-4"
          >
            Read about the company
          </Link>
        </div>
      </section>

      <section className="border-y border-border bg-sand">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-medium tracking-[0.22em] text-brass uppercase">
                02 — What we build
              </p>
              <h2 className="mt-3 max-w-xl font-heading text-4xl tracking-tight text-balance md:text-5xl">
                Six lines of work, as offered now.
              </h2>
            </div>
            <Link
              href="/services"
              className="text-sm font-medium underline decoration-primary underline-offset-4"
            >
              Open the full catalog
            </Link>
          </div>
          <ul className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug} className="bg-background">
                <Link
                  href={`/services#${service.slug}`}
                  className="group flex h-full flex-col p-5 transition-colors hover:bg-card md:p-6"
                >
                  <span className="text-xs tracking-[0.18em] text-brass">
                    {service.number}
                  </span>
                  <span className="mt-8 font-heading text-2xl tracking-tight group-hover:underline group-hover:decoration-primary">
                    {service.title}
                  </span>
                  <span className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-xs font-medium tracking-[0.22em] text-brass uppercase">
          03 — How a project starts
        </p>
        <h2 className="mt-3 max-w-2xl font-heading text-4xl tracking-tight text-balance md:text-5xl">
          Enquire, visit, scope, build, hand over.
        </h2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {stages.map((stage) => (
            <li key={stage.id} className="border-t border-border pt-4">
              <p className="text-xs tracking-[0.18em] text-brass">{stage.number}</p>
              <h3 className="mt-3 font-heading text-2xl tracking-tight">
                <Link href={`/approach#${stage.id}`} className="hover:underline hover:decoration-primary">
                  {stage.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {stage.summary}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <CtaLink href="/approach" variant="secondary">
            Read the full approach
          </CtaLink>
        </div>
      </section>

      <section className="border-t border-ink bg-primary text-ink">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-16 md:flex-row md:items-end md:justify-between md:px-8 md:py-20">
          <div className="max-w-xl">
            <h2 className="font-heading text-4xl tracking-tight text-balance md:text-5xl">
              Begin with an enquiry.
            </h2>
            <p className="mt-4 leading-relaxed text-ink">
              Tell us the project type and what the site needs. Office phone,
              email, and street address will be added when they are ready to
              publish. Until then, the form is how a project starts.
            </p>
          </div>
          <CtaLink href="/contact" className="border-ink bg-paper text-ink hover:bg-sand">
            Go to the inquiry form
          </CtaLink>
        </div>
      </section>
    </>
  )
}
