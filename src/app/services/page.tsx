import type { Metadata } from "next"
import Link from "next/link"
import { CtaLink } from "@/components/cta-link"
import { PageHero } from "@/components/page-hero"
import { services } from "@/lib/services"

export const metadata: Metadata = {
  title: "Services",
  description:
    "The current services of BrickHome Builders: residential construction, commercial construction, renovation and remodeling, civil and structural works, interior fit-out, and project management.",
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="The work we take on now."
        lede="Residential construction, commercial construction, renovation and remodeling, civil and structural works, interior fit-out, and project management. This is the current set."
      />
      <nav
        aria-label="Service catalog"
        className="border-b border-border"
      >
        <ul className="mx-auto flex max-w-6xl gap-x-6 gap-y-3 overflow-x-auto px-5 py-4 text-sm md:px-8">
          {services.map((service) => (
            <li key={service.slug} className="shrink-0">
              <a
                href={`#${service.slug}`}
                className="whitespace-nowrap text-foreground/80 underline-offset-4 hover:text-ink hover:underline hover:decoration-primary"
              >
                {service.number} {service.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {services.map((service) => (
          <article
            key={service.slug}
            id={service.slug}
            className="scroll-mt-28 grid gap-6 border-b border-border py-12 md:grid-cols-12 md:py-16"
          >
            <div className="md:col-span-4">
              <p className="text-xs tracking-[0.18em] text-brass">
                {service.number}
              </p>
              <h2 className="mt-3 font-heading text-4xl tracking-tight text-balance">
                {service.title}
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <p className="text-lg leading-relaxed">{service.detail}</p>
              <h3 className="mt-8 text-xs font-medium tracking-[0.2em] text-brass uppercase">
                Covers
              </h3>
              <ul className="mt-4 grid gap-3">
                {service.covers.map((item) => (
                  <li
                    key={item}
                    className="border-t border-border pt-3 text-sm leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
      <section className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-16 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <h2 className="font-heading text-4xl tracking-tight">
            Not sure which line fits?
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Choose “Not sure yet” on the inquiry form and describe the site.
            We will sort the work after a visit.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <CtaLink href="/contact">Start a project</CtaLink>
          <Link
            href="/approach"
            className="inline-flex h-12 items-center justify-center px-2 text-sm font-medium underline decoration-primary underline-offset-4"
          >
            See how a project runs
          </Link>
        </div>
      </section>
    </>
  )
}
