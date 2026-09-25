import { CtaLink } from "@/components/cta-link"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-24 md:px-8">
      <p className="text-xs font-medium tracking-[0.22em] text-brass uppercase">
        404
      </p>
      <h1 className="mt-4 max-w-xl font-heading text-5xl tracking-tight text-balance">
        This page is not on the site.
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
        The address does not match a page. The work lives on the home page, the
        services, the approach, and the inquiry form.
      </p>
      <div className="mt-8">
        <CtaLink href="/">Back to the home page</CtaLink>
      </div>
    </div>
  )
}
