# K and C Constructions

Marketing site for K and C Constructions, a construction and services company based in Bengaluru, India.

The site explains who the company is, the current services, how a project runs, and a project-inquiry form. Office phone, email, and street address are not published yet.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:4317](http://localhost:4317).

The dev server listens on `0.0.0.0:4317`.

## Pages

| Path | What it is |
| --- | --- |
| `/` | Home: who the company is, what it builds, how a project starts |
| `/services` | Current service catalog |
| `/approach` | How a project runs, from enquiry to handover |
| `/about` | The company, stated with the facts that are on record |
| `/contact` | Project inquiry form |

## Inquiry form

The contact form asks for name, phone, email, project type, and a message. It validates those fields, shows a sending state, and either saves the inquiry or shows an error.

Saved inquiries are appended to `data/inquiries.jsonl`. That file is gitignored because it holds personal details. Nothing is emailed: a public email address has not been added yet.

## Edit the service list

Update `src/lib/services.ts`. The home page, the services page, and the project-type field all read that list.

## Checks

```bash
npm test
npm run lint
```
