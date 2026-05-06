import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Adrian Vale" },
      { name: "description", content: "A decade of native iOS roles, projects, and platform expertise." },
      { property: "og:title", content: "Experience — Adrian Vale" },
      { property: "og:description", content: "A decade of native iOS engineering roles." },
    ],
  }),
  component: ExperiencePage,
});

const roles = [
  {
    year: "2024 — Now",
    role: "Principal iOS Engineer",
    company: "Yatts",
    summary: "Leading native iOS for a music platform serving half a million monthly listeners. Owner of playback engine, spatial audio, and the artist tooling apps.",
    points: [
      "Architected gapless playback pipeline replacing AVQueuePlayer.",
      "Shipped Dolby Atmos head-tracking for AirPods Pro.",
      "Mentor and tech lead for a 4-person iOS team.",
    ],
  },
  {
    year: "2021 — 2024",
    role: "Senior iOS Engineer",
    company: "Northwind Travel",
    summary: "Built MyTuur from concept to App Store, leading product engineering across map rendering, sync, and offline-first architecture.",
    points: [
      "Reduced cold start by 73% (1.4s → 380ms).",
      "Designed CRDT-inspired CloudKit sync layer.",
      "Featured app launch in 14 countries.",
    ],
  },
  {
    year: "2018 — 2021",
    role: "iOS Engineer",
    company: "Helio Health",
    summary: "Senior contributor to a HealthKit-integrated wellness platform with strict privacy and performance requirements.",
    points: [
      "Owned HealthKit ingestion and on-device ML inference.",
      "Migrated 200K LOC from Objective-C to Swift.",
      "Reduced app size by 38% via modularization.",
    ],
  },
  {
    year: "2015 — 2018",
    role: "iOS Developer",
    company: "Rivet Studio",
    summary: "Generalist iOS developer at a boutique studio shipping client apps for finance, retail, and lifestyle brands.",
    points: [
      "Shipped 11 App Store apps over three years.",
      "Built reusable internal SDK adopted across projects.",
      "Introduced SwiftUI in 2020 as a senior advocate.",
    ],
  },
];

const certs = [
  "WWDC Scholarship Recipient",
  "Apple Developer Academy Mentor",
  "Speaker · iOSDevUK 2023",
  "Speaker · NSSpain 2022",
];

function ExperiencePage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-32 sm:pt-40">
        <Reveal><p className="text-eyebrow text-accent">Experience</p></Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 text-display-2xl">A decade. Four chapters.</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-2xl text-xl text-muted-foreground">
            Roles where I shipped meaningful iOS products, built calm systems, and helped teams move with conviction.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="relative">
          <div aria-hidden className="absolute left-0 top-2 bottom-2 w-px bg-border sm:left-[12rem]" />
          <div className="space-y-16">
            {roles.map((r, i) => (
              <Reveal key={r.role} delay={i * 0.06}>
                <article className="relative grid gap-6 pl-6 sm:grid-cols-[12rem_1fr] sm:gap-12 sm:pl-0">
                  <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-background sm:left-[11.7rem]" />
                  <p className="text-sm font-medium text-muted-foreground tabular-nums">{r.year}</p>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight">{r.role}</h3>
                    <p className="mt-1 text-base text-accent">{r.company}</p>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">{r.summary}</p>
                    <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                      {r.points.map((p) => (
                        <li key={p} className="flex gap-3">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-32">
        <Reveal>
          <div className="rounded-3xl border border-border bg-card p-10 sm:p-14">
            <p className="text-eyebrow text-accent">Recognitions</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {certs.map((c) => (
                <li key={c} className="text-base text-foreground/90">{c}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  );
}
