import Link from "next/link"
import type { NavHref } from "@/lib/site"
import { cn } from "@/lib/utils"

const variants = {
  primary:
    "border border-ink bg-primary text-primary-foreground hover:bg-brand-line",
  secondary:
    "border border-border bg-background text-foreground hover:bg-sand",
} as const

export function CtaLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: NavHref | `/services#${string}` | `/approach#${string}`
  children: React.ReactNode
  variant?: keyof typeof variants
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-sm px-5 text-base font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  )
}
