import { cn } from "@/lib/utils"

/**
 * Brick courses in running bond, capped by a roof.
 * Yellow and black only, matching the site theme.
 */
export function LogoMark({
  inverted = false,
  className,
}: {
  inverted?: boolean
  className?: string
}) {
  const field = inverted ? "fill-ink" : "fill-primary"
  const brick = inverted ? "fill-primary" : "fill-ink"

  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden
      className={cn("size-10 shrink-0", className)}
    >
      <rect width="64" height="64" className={field} />
      <polygon points="12,31 32,10 52,31" className={brick} />
      <rect x="12" y="33" width="19" height="6" className={brick} />
      <rect x="33" y="33" width="19" height="6" className={brick} />
      <rect x="12" y="41" width="9" height="6" className={brick} />
      <rect x="23" y="41" width="19" height="6" className={brick} />
      <rect x="44" y="41" width="8" height="6" className={brick} />
      <rect x="12" y="49" width="14" height="6" className={brick} />
      <rect x="38" y="49" width="14" height="6" className={brick} />
    </svg>
  )
}

export function Logo({
  inverted = false,
  wordmark = true,
  className,
}: {
  inverted?: boolean
  wordmark?: boolean
  className?: string
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark inverted={inverted} />
      {wordmark ? (
        <span className="leading-none text-current">
          <span className="block font-sans text-[15px] font-semibold tracking-[-0.03em]">
            BrickHome
          </span>
          <span className="mt-1 block text-[10px] font-medium tracking-[0.22em] uppercase">
            Builders
          </span>
        </span>
      ) : null}
    </span>
  )
}
