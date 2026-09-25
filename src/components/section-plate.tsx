import { LogoMark } from "@/components/logo"

const bands = [
  {
    number: "01",
    title: "Ground",
    detail: "Visit the site. Read what is already there.",
  },
  {
    number: "02",
    title: "Frame",
    detail: "Structure, scope, and the sequence of the job.",
  },
  {
    number: "03",
    title: "Finish",
    detail: "Fit-out, snags, and handover against the scope.",
  },
]

export function SectionPlate() {
  return (
    <aside
      aria-label="How the work is organised: ground, frame, and finish."
      className="relative flex min-h-[28rem] flex-col justify-between overflow-hidden bg-primary text-ink md:min-h-full"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(26,26,26,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,26,26,0.14) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative flex items-center justify-between px-6 pt-6 text-[11px] tracking-[0.22em] text-ink uppercase">
        <span>Section</span>
        <span>Bengaluru</span>
      </div>
      <ol className="relative mx-6 border-b border-ink/15">
        {bands.map((band) => (
          <li key={band.number} className="border-t border-ink/15 py-5">
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-heading text-3xl tracking-tight">{band.title}</p>
              <span className="text-xs tracking-[0.18em] text-ink">
                {band.number}
              </span>
            </div>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink/75">
              {band.detail}
            </p>
          </li>
        ))}
      </ol>
      <div className="relative flex items-center gap-4 px-6 pt-6 pb-7">
        <LogoMark inverted className="size-14" />
        <p className="font-heading text-4xl tracking-tight sm:text-5xl">BrickHome</p>
      </div>
    </aside>
  )
}
