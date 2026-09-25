"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { nav } from "@/lib/site"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="relative z-50 h-1 bg-announce" />
      <div className="relative z-50 mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 bg-background px-5 md:px-8">
        <Link href="/" aria-label="BrickHome Builders, home" className="text-ink">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm tracking-wide text-foreground/75 transition-colors hover:text-foreground",
                  active &&
                    "text-foreground underline decoration-oxide decoration-2 underline-offset-8",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden h-10 items-center rounded-sm border border-ink bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-line lg:inline-flex"
          >
            Start a project
          </Link>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-10 rounded-sm lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </Button>
        </div>
      </div>

      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-ink/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="absolute inset-x-0 top-full z-40 border-b border-border bg-background px-5 py-4 lg:hidden"
        >
          <ul className="grid gap-1">
            {nav.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block border-b border-border py-3 font-heading text-3xl tracking-tight",
                      active && "text-ink underline decoration-primary decoration-2 underline-offset-4",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-sm border border-ink bg-primary text-base font-medium text-primary-foreground"
          >
            Start a project
          </Link>
        </nav>
      ) : null}
    </header>
  )
}
