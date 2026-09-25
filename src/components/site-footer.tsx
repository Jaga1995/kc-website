import Link from "next/link"
import { company, nav } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <p className="font-heading text-3xl tracking-tight">
            {company.name}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper/75">
            Construction and services, based in {company.city}, {company.country}.
          </p>
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <p className="text-[11px] tracking-[0.2em] text-[#cbbd9a] uppercase">
            Pages
          </p>
          <ul className="mt-4 grid gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-paper/85 hover:text-paper"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <p className="text-[11px] tracking-[0.2em] text-[#cbbd9a] uppercase">
            Contact
          </p>
          <p className="mt-4 text-sm leading-relaxed text-paper/75">
            Office phone, email, and street address will be added when they are
            ready to publish. Until then, start a project with the inquiry form.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex text-sm font-medium text-paper underline decoration-[#cbbd9a] underline-offset-4"
          >
            Go to the inquiry form
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-4 text-xs tracking-wide text-paper/55 md:px-8">
          {company.city}, {company.country}
        </p>
      </div>
    </footer>
  )
}
