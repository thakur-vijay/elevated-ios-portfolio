import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Adrian Vale" },
      { name: "description", content: "Senior iOS engineer with a decade of native experience. Apple HIG-obsessed, performance-driven, product-minded." },
      { property: "og:title", content: "About — Adrian Vale" },
      { property: "og:description", content: "Senior iOS engineer with a decade of native experience." },
    ],
  }),
  component: AboutPage,
});

const principles = [
  { title: "Native first", body: "I build with Apple's frameworks because they unlock motion, performance, and platform integration nothing else can." },
  { title: "Detail as discipline", body: "Spring curves, haptics, frame budgets — the pixels and milliseconds users feel before they see." },
  { title: "Architecture for change", body: "Modular, testable code that ships fast today and scales calmly for years." },
  { title: "Product over code", body: "Engineering is in service of the experience. The right answer is rarely the cleverest one." },
];

function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-32 sm:pt-40">
        <Reveal>
          <p className="text-eyebrow text-accent">About</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 text-display-2xl">A decade of native craft.</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            I'm Adrian — a senior iOS engineer based in San Francisco. I've spent the last ten years
            shipping native apps for ambitious teams across travel, music, and creator tools.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            My focus is the kind of polish that's hard to articulate but impossible to miss — the
            transitions, the haptics, the responsiveness, the quiet feeling that something was made by
            someone who cared. I lead end-to-end on architecture, animation, performance, and the App
            Store-ready details that turn shipped apps into beloved ones.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader eyebrow="Principles" title="Four ideas I keep returning to." />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <article className="h-full rounded-3xl border border-border bg-card p-10 transition-all duration-500 hover:-translate-y-1 hover:border-border-strong hover:shadow-glass">
                <p className="text-eyebrow text-accent">0{i + 1}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24">
        <SectionHeader eyebrow="Beyond code" title="Off-screen." />
        <Reveal delay={0.1}>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
            Outside of Xcode, I write about iOS engineering, mentor product teams, and chase good light
            with a Leica. I'm a frequent attendee at WWDC, a long-time advocate of small focused teams,
            and a quiet enthusiast of espresso, fountain pens, and well-typeset interfaces.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-32">
        <Reveal>
          <div className="rounded-3xl border border-border bg-card p-12 text-center sm:p-20">
            <h2 className="text-display-lg">Curious about a collaboration?</h2>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all duration-300 hover:gap-2.5"
            >
              Say hello <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
