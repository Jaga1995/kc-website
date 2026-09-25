export const company = {
  brand: "BrickHome Builders",
  registeredName: "K and C Constructions",
  name: "BrickHome Builders",
  city: "Bengaluru",
  country: "India",
  description:
    "BrickHome Builders is the brand of K and C Constructions, a Bengaluru-based construction and services company. Residential and commercial construction, renovation, civil and structural works, interior fit-out, and project management.",
}

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/approach", label: "Approach" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const

export type NavHref = (typeof nav)[number]["href"]

export const stages = [
  {
    id: "enquire",
    number: "01",
    title: "Enquire",
    summary: "Send the project through the inquiry form.",
    detail:
      "You send your name, a phone number, an email, the type of project, and a description of the work. Office phone, email, and street address are not published yet, so the form is how a project starts.",
  },
  {
    id: "site-visit",
    number: "02",
    title: "Site visit",
    summary: "We look at the ground, or at drawings you already have.",
    detail:
      "We come to the site, or we review drawings you already have. The visit is to understand access, what is already built, and what the job is asking of the ground. A price is not guessed from a message alone.",
  },
  {
    id: "scope",
    number: "03",
    title: "Scope",
    summary: "The work is written down before construction starts.",
    detail:
      "We write what is included, what sits outside the job, and the order of work. Construction starts after that scope is agreed.",
  },
  {
    id: "build",
    number: "04",
    title: "Build",
    summary: "The site runs against the agreed scope.",
    detail:
      "The site is run against the written scope. When the work changes, the change is recorded. You can ask where the job stands.",
  },
  {
    id: "handover",
    number: "05",
    title: "Handover",
    summary: "The finished work is checked against the scope.",
    detail:
      "We walk the finished work against the scope, list snags, and close the job with the drawings and keys that are due to you.",
  },
] as const
