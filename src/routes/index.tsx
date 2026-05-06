import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ChevronDown, Sparkles, Zap, Layers, Cpu } from "lucide-react";
import heroPhone from "@/assets/hero-iphone.png";
import { projects } from "@/lib/projects";
import { AppCard } from "@/components/site/AppCard";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adrian Vale — Senior iOS Engineer" },
      { name: "description", content: "Premium native iOS engineering. Swift, SwiftUI, and uncompromising product craft for the Apple ecosystem." },
      { property: "og:title", content: "Adrian Vale — Senior iOS Engineer" },
      { property: "og:description", content: "Premium native iOS engineering for the Apple ecosystem." },
    ],
  }),
  component: HomePage,
});

const stack = [
  { name: "Swift", icon: Zap },
  { name: "SwiftUI", icon: Sparkles },
  { name: "UIKit", icon: Layers },
  { name: "Combine", icon: Cpu },
  { name: "Async/Await", icon: Zap },
  { name: "Core Data", icon: Layers },
  { name: "CloudKit", icon: Sparkles },
  { name: "Metal", icon: Cpu },
  { name: "AVFoundation", icon: Zap },
  { name: "WidgetKit", icon: Layers },
  { name: "App Intents", icon: Sparkles },
  { name: "TCA", icon: Cpu },
];

const metrics = [
  { value: "10+", label: "Years shipping iOS" },
  { value: "24", label: "Apps on the App Store" },
  { value: "8M+", label: "Cumulative downloads" },
  { value: "4.8★", label: "Average rating" },
];

const testimonials = [
  {
    quote: "Adrian raises the bar for what 'native' should feel like. Every interaction is considered.",
    author: "Sara Lin",
    role: "Head of Product, Northwind",
  },
  {
    quote: "The closest I've worked with someone who genuinely thinks like an Apple HIG architect.",
    author: "Marcus Reid",
    role: "Engineering Director, Helio",
  },
  {
    quote: "He shipped a flagship app with the polish of a 50-person team — alone.",
    author: "Yuki Tanaka",
    role: "Founder, Rivet Studio",
  },
];

const experience = [
  { year: "2024 — Now", role: "Principal iOS Engineer", company: "Yatts" },
  { year: "2021 — 2024", role: "Senior iOS Engineer", company: "Northwind Travel" },
  { year: "2018 — 2021", role: "iOS Engineer", company: "Helio Health" },
  { year: "2015 — 2018", role: "iOS Developer", company: "Rivet Studio" },
];

function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const phoneScale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const phoneRotate = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative -mt-12 flex min-h-screen flex-col items-center justify-center overflow-hidden pt-12">
        <div className="absolute inset-0 -z-10 grad-hero" />
        <div className="absolute inset-0 -z-10 noise-overlay" />

        <motion.div
          style={{ y: headlineY, opacity: headlineOpacity }}
          className="mx-auto max-w-5xl px-6 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-eyebrow text-accent"
          >
            Senior iOS Engineer · San Francisco
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-display-2xl text-foreground"
          >
            Building premium
            <br />
            <span className="bg-gradient-to-r from-accent via-foreground to-accent bg-clip-text text-transparent">
              iOS experiences.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-7 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            A decade of native engineering, obsessed with the details that make great Apple apps feel inevitable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              to="/projects"
              className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all duration-300 hover:gap-2.5 hover:shadow-glass"
            >
              See selected work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full border border-border-strong bg-background/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition-all duration-300 hover:bg-background"
            >
              Get in touch
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: phoneY, scale: phoneScale, rotate: phoneRotate }}
          className="relative mx-auto mt-16 w-full max-w-3xl px-6"
        >
          <div className="relative animate-float">
            <div className="absolute inset-x-12 -bottom-8 h-24 -z-10 rounded-full bg-foreground/30 blur-3xl" />
            <img
              src={heroPhone}
              alt="iOS device showcase"
              width={1280}
              height={1280}
              className="mx-auto h-auto w-full max-w-2xl select-none drop-shadow-2xl"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
        >
          <ChevronDown className="h-5 w-5 animate-scroll-hint" />
        </motion.div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-4xl px-6 py-32 text-center sm:py-40">
        <Reveal>
          <p className="text-eyebrow text-accent">Engineer · Designer · Shipper</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 text-display-xl text-foreground">
            I build apps people quietly fall in love with.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            I lead native iOS engineering for ambitious products — from architecture and animation to launch
            and the long tail of polish that separates good from extraordinary.
          </p>
        </Reveal>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <SectionHeader
          eyebrow="Selected work"
          title="Apps shipped with intention."
          description="Each one engineered end-to-end with native frameworks and obsessive attention to motion, performance, and product feel."
        />
        <div className="mt-16 space-y-12">
          {projects.map((p, i) => (
            <AppCard key={p.slug} project={p} reverse={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* TECH STACK */}
      <section className="mx-auto max-w-6xl px-6 py-32">
        <SectionHeader
          eyebrow="The toolkit"
          title="A native-first stack."
          description="Built around Apple's frameworks. No web wrappers. No compromises."
          align="center"
        />
        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {stack.map(({ name, icon: Icon }, i) => (
            <Reveal key={name} delay={i * 0.03}>
              <div className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-border-strong hover:shadow-glass">
                <Icon className="h-5 w-5 text-accent transition-transform duration-500 group-hover:scale-110" />
                <span className="text-sm font-medium text-foreground/90">{name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* METRICS */}
      <section className="mx-auto max-w-6xl px-6 py-32">
        <Reveal>
          <div className="rounded-3xl border border-border bg-gradient-to-br from-surface to-card p-12 sm:p-20 noise-overlay">
            <p className="text-eyebrow text-accent">Impact</p>
            <h2 className="mt-3 text-display-lg">A decade of measured results.</h2>
            <div className="mt-12 grid grid-cols-2 gap-10 sm:grid-cols-4">
              {metrics.map((m, i) => (
                <Reveal key={m.label} delay={i * 0.08}>
                  <div>
                    <p className="text-display-lg !text-5xl text-foreground sm:!text-6xl">{m.value}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* EXPERIENCE PREVIEW */}
      <section className="mx-auto max-w-4xl px-6 py-32">
        <SectionHeader eyebrow="Experience" title="Ten years of building for Apple platforms." />
        <div className="mt-14 divide-y divide-border border-y border-border">
          {experience.map((e, i) => (
            <Reveal key={e.role} delay={i * 0.05}>
              <div className="flex items-baseline justify-between gap-6 py-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{e.role}</h3>
                  <p className="text-sm text-muted-foreground">{e.company}</p>
                </div>
                <p className="shrink-0 text-sm text-muted-foreground tabular-nums">{e.year}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Link to="/experience" className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent">
            Full timeline <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/*/!* TESTIMONIALS *!/*/}
      {/*<section className="mx-auto max-w-6xl px-6 py-32">*/}
      {/*  <SectionHeader eyebrow="Recommendations" title="What collaborators say." align="center" />*/}
      {/*  <div className="mt-14 grid gap-6 md:grid-cols-3">*/}
      {/*    {testimonials.map((t, i) => (*/}
      {/*      <Reveal key={t.author} delay={i * 0.08}>*/}
      {/*        <figure className="flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-glass">*/}
      {/*          <blockquote className="text-base leading-relaxed text-foreground/90">"{t.quote}"</blockquote>*/}
      {/*          <figcaption className="mt-6 border-t border-border pt-6">*/}
      {/*            <p className="text-sm font-medium text-foreground">{t.author}</p>*/}
      {/*            <p className="text-sm text-muted-foreground">{t.role}</p>*/}
      {/*          </figcaption>*/}
      {/*        </figure>*/}
      {/*      </Reveal>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</section>*/}

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-foreground px-8 py-20 text-center text-background sm:px-16 sm:py-28">
            <div className="absolute inset-0 -z-10 grad-aurora opacity-40" />
            <p className="text-eyebrow text-background/70">Let's build</p>
            <h2 className="mx-auto mt-3 max-w-3xl text-display-xl">
              Have an iOS product worth obsessing over?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-background/75">
              I take on a small number of engagements each year. Tell me about yours.
            </p>
            <div className="mt-10">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-1.5 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:gap-2.5"
              >
                Start a conversation <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
