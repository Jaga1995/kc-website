export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string
  title: string
  lede: string
}) {
  return (
    <header className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-xs font-medium tracking-[0.22em] text-brass uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl leading-[1.02] tracking-tight text-balance md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {lede}
        </p>
      </div>
    </header>
  )
}
