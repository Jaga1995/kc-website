/**
 * Current service catalog for BrickHome Builders.
 * Home, the services page, and the inquiry form all read this list.
 * Add, rename, or retire a service here.
 */
export const services = [
  {
    slug: "residential-construction",
    number: "01",
    title: "Residential construction",
    summary:
      "New houses and other residential buildings, from foundation through a home that can be lived in.",
    detail:
      "We build new residential structures and additions. The work covers the load-bearing building and the coordination a house needs before someone moves in.",
    covers: [
      "New residential buildings",
      "Additions to existing homes",
      "Coordination of the building services a house needs",
    ],
  },
  {
    slug: "commercial-construction",
    number: "02",
    title: "Commercial construction",
    summary:
      "Workplaces, retail, and other commercial buildings, taken through to a shell that is ready for fit-out.",
    detail:
      "Commercial work covers the structure and the shell: workplaces, retail, and similar premises, sequenced so interior work has a sound building to land in.",
    covers: [
      "New commercial buildings",
      "Structural shells and cores",
      "Coordination before interior work begins",
    ],
  },
  {
    slug: "renovation-and-remodeling",
    number: "03",
    title: "Renovation and remodeling",
    summary:
      "Changes to buildings that already stand, scoped before a wall is opened.",
    detail:
      "Renovation starts from what is already built. Layouts change, worn finishes come out, and any alteration is written down before work begins.",
    covers: [
      "Layout changes in existing buildings",
      "Remodeling of homes and commercial rooms",
      "Alterations planned against the existing structure",
    ],
  },
  {
    slug: "civil-and-structural-works",
    number: "04",
    title: "Civil and structural works",
    summary:
      "Foundations, frames, site civil work, and structural repair — the part of the job that carries load.",
    detail:
      "Civil and structural work is the load path: foundations, frames, site civil works, and repairs where the structure itself needs attention.",
    covers: [
      "Foundations and frames",
      "Site civil works",
      "Structural repair and strengthening",
    ],
  },
  {
    slug: "interior-fit-out",
    number: "05",
    title: "Interior fit-out",
    summary:
      "Partitions, ceilings, flooring, and finishes once the shell is ready for interior construction.",
    detail:
      "Fit-out is the interior construction after the shell allows it. Partitions, ceilings, flooring, and finishes for homes and commercial spaces, with the trades coordinated.",
    covers: [
      "Partitions, ceilings, and flooring",
      "Finish work for homes and workplaces",
      "Coordination of joinery and interior trades",
    ],
  },
  {
    slug: "project-management",
    number: "06",
    title: "Project management",
    summary:
      "The programme of the job: sequence, site coordination, and a handover that matches the agreed scope.",
    detail:
      "Project management keeps one line through the job. We set the sequence, coordinate the site, and close against the scope that was agreed.",
    covers: [
      "Programme and sequencing",
      "Coordination of trades on site",
      "Handover against the written scope",
    ],
  },
] as const

export type Service = (typeof services)[number]
export type ServiceSlug = Service["slug"]

export const projectTypes = [
  ...services.map((service) => ({
    value: service.slug,
    label: service.title,
  })),
  { value: "not-sure" as const, label: "Not sure yet" },
]

export type ProjectType = (typeof projectTypes)[number]["value"]

export function projectTypeLabel(value: string) {
  return projectTypes.find((type) => type.value === value)?.label ?? value
}
