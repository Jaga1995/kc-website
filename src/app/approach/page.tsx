import type { Metadata } from "next"
import { CtaLink } from "@/components/cta-link"
import { PageHero } from "@/components/page-hero"
import { stages } from "@/lib/site"

export const metadata: Metadata = {
  title: "Approach",
  description:
    "How a project with BrickHome Builders runs: enquire, site visit, scope, build, and handover.",
}

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="Approach"
        title="How a project runs."
        lede="Enquire, visit the site, write the scope, build, and hand over. This page is the method. Completed projects will be published when the company is ready to put them on record."
      />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {stages.map((stage) => (
          <article
            key={stage.id}
            id={stage.id}
            className="scroll-mt-28 grid gap-6 border-b border-border py-12 md:grid-cols-12 md:py-16"
          >
            <div className="md:col-span-4">
              <p className="font-heading text-5xl tracking-tight text-ink">
                {stage.number}
              </p>
              <h2 className="mt-3 font-heading text-4xl tracking-tight">
                {stage.title}
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground md:col-span-7 md:col-start-6">
              {stage.detail}
            </p>
          </article>
        ))}
      </div>
      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-2 md:px-8 md:py-20">
        <div>
          <h2 className="font-heading text-4xl tracking-tight text-balance">
            The same sequence, whatever the building.
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            A house, a commercial shell, a renovation, a structural repair, a
            fit-out, or the management of a job already underway: the enquiry
            still comes first, and the scope is still written before the build.
          </p>
        </div>
        <div className="flex flex-col items-start justify-end gap-4 border border-border bg-sand p-6">
          <p className="text-sm leading-relaxed">
            Office phone, email, and street address will be added when they are
            ready to publish. The inquiry form is the way in.
          </p>
          <CtaLink href="/contact">Start a project</CtaLink>
        </div>
      </section>
    </>
  )
}
