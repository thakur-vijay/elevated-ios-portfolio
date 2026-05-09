import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Download, Star, ArrowLeft, ChevronLeft, ChevronRight, X, Play } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import { ProjectResponse } from "@/models/project.ts";
import { fetchProjectDetailResponse } from "@/redux/features/projectDetailSlice.ts";
import { fetchProjectDetailData, fileUrl, urlFor } from "@/sanity/sanityService.ts";
import { getPalette } from "colorthief";

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ params }) => {
    const project = await fetchProjectDetailData(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    if (!p) return { meta: [{ title: "Project not found" }] };
    return {
      meta: [
        { title: `${p?.appName} — Adrian Vale` },
        { name: "description", content: p.tagline },
        { property: "og:title", content: `${p.appName} — ${p.tagline}` },
        { property: "og:description", content: p.description },
        { property: "og:image", content: urlFor(p.appIcon).url() },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <h1 className="text-display-xl">Project not found</h1>
        <Link to="/projects" className="mt-6 inline-block text-accent">
          Back to projects
        </Link>
      </div>
    </div>
  ),
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { project } = Route.useLoaderData() as { project: ProjectResponse };
  console.log("project", project);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  const [lightbox, setLightbox] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (dir: 1 | -1) => {
    sliderRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  // const next = projects[(projects.findIndex((p) => p.slug === project.slug) + 1) % projects.length];

  const [gradient, setGradient] = useState("linear-gradient(135deg, #ffffff, #f8fafc)");
  const handleIconLoad = async (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log("Icon loaded");
    try {
      const img = e.currentTarget;
      const lighten = (value: number, amount = 0.99) => {
        return Math.round(value + (255 - value) * amount);
      };

      const mediumLight = (value: number) => {
        return Math.round(value + (255 - value) * 0.6);
      };

      const rgb = (r: number, g: number, b: number) => `${r}, ${g}, ${b}`;

      const palette = await getPalette(img);
      if (palette) {
        const c1 = palette[0];
        const c2 = palette[1];
        const generatedGradient = `
linear-gradient(
  to bottom,
  rgb(
    ${mediumLight(c1._r)},
    ${mediumLight(c1._g)},
    ${mediumLight(c1._b)}
  ) 0%,

  rgb(
    ${lighten(c2._r)},
    ${lighten(c2._g)},
    ${lighten(c2._b)}
  ) 100%
)
`;

        console.log("Gradient is", generatedGradient);

        setGradient(generatedGradient);
      }
    } catch (error) {
      console.error("Gradient error:", error);
    }
  };

  return (
    <>
      {/* HERO BANNER */}
      <section ref={heroRef} className="relative -mt-12 overflow-hidden pt-20 pb-24 sm:pt-32">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className={cn("absolute inset-0 -z-10 bg-gradient-to-b")}
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: gradient,
          }}
        />

        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> All projects
            </Link>
          </Reveal>

          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:gap-10">
            <Reveal>
              <img
                crossOrigin="anonymous"
                src={urlFor(project?.appIcon).url()}
                alt=""
                width={128}
                height={128}
                onLoad={handleIconLoad}
                className="h-28 w-28 rounded-3xl shadow-card sm:h-36 sm:w-36"
              />
            </Reveal>
            <div className="flex-1">
              <Reveal delay={0.05}>
                <p className="text-eyebrow text-accent">{project?.appType}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-3 text-display-xl">{project?.appName}</h1>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-3 max-w-2xl text-xl text-muted-foreground">{project?.tagline}</p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={project.appStoreUrl}
                    className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all duration-300 hover:gap-2.5"
                  >
                    <Download className="h-4 w-4" /> App Store
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Stats */}
          <Reveal delay={0.25}>
            <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-4">
              {project?.stats?.map((s) => (
                <div key={s.label} className="bg-card p-6 text-center">
                  <p className="text-3xl font-semibold tracking-tight">{s.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TECH PILLS */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <p className="text-eyebrow text-muted-foreground">Tech stack</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project?.techStack?.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-card px-4 py-1.5 text-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* OVERVIEW */}
      <section className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-2">
        <Reveal>
          <p className="text-eyebrow text-accent">Overview</p>
          <p className="mt-4 text-2xl leading-relaxed">{project.description}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-eyebrow text-muted-foreground">Role</p>
            <p className="mt-2 text-lg">{project.role}</p>
            <p className="mt-6 text-eyebrow text-muted-foreground">Architecture</p>
            <p className="mt-2 text-base text-muted-foreground">{project.architecture}</p>
          </div>
        </Reveal>
      </section>

      {/* GALLERY */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-end justify-between">
            <Reveal>
              <p className="text-eyebrow text-accent">{project?.gallerySection?.subtitle}</p>
              <h2 className="mt-3 text-display-lg">{project?.gallerySection?.title}</h2>
            </Reveal>

            <div className="hidden gap-2 sm:flex">
              <button
                onClick={() => scrollSlider(-1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-muted"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                onClick={() => scrollSlider(1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-muted"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={sliderRef}
          className="scrollbar-none mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 sm:px-[max(1.5rem,calc((100vw-64rem)/2))]"
        >
          {/* APP CLIP FIRST */}
          {project?.appClip?.asset?._ref && (
            <motion.div className="relative shrink-0 snap-center overflow-hidden rounded-[2rem] border border-border bg-card shadow-card">
              <video
                src={fileUrl(project.appClip.asset._ref)}
                poster={urlFor(project.hero).url()}
                controls
                playsInline
                preload="none"
                className="h-[560px] w-[260px] object-cover sm:h-[640px] sm:w-[300px]"
              />
            </motion.div>
          )}

          {/* SCREENSHOTS AFTER VIDEO */}
          {project?.screenshots?.map((src, i) => (
            <motion.button
              key={i}
              onClick={() => setLightbox(i)}
              className="relative shrink-0 snap-center overflow-hidden rounded-[2rem] border border-border bg-card shadow-card"
            >
              <img
                src={urlFor(src).url()}
                alt={`${project?.appName} screenshot ${i + 1}`}
                width={300}
                height={650}
                loading="lazy"
                className="h-[560px] w-[260px] object-cover sm:h-[640px] sm:w-[300px]"
              />
            </motion.button>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <p className="text-eyebrow text-accent">{project?.featureSection?.subtitle}</p>
          <h2 className="mt-3 text-display-lg">{project?.featureSection?.title}</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {project?.features?.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-border-strong">
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-muted-foreground">{f.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CHALLENGES & PERFORMANCE */}
      <section className="mx-auto grid max-w-5xl gap-10 px-6 py-20 md:grid-cols-2">
        <div>
          <Reveal>
            <p className="text-eyebrow text-accent">{project?.challengeSection?.subtitle}</p>
            <h3 className="mt-3 text-2xl font-semibold">{project?.challengeSection?.title}</h3>
          </Reveal>
          <ul className="mt-8 space-y-6">
            {project?.challenges?.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <li>
                  <p className="font-medium">{c.title}</p>
                  <p className="mt-1.5 text-muted-foreground">{c.description}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
        <div>
          <Reveal>
            <p className="text-eyebrow text-accent">{project?.performanceSection?.subtitle}</p>
            <h3 className="mt-3 text-2xl font-semibold">{project?.performanceSection?.title}</h3>
          </Reveal>
          <ul className="mt-8 space-y-6">
            {project?.performance?.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <li>
                  <p className="font-medium">{c.title}</p>
                  <p className="mt-1.5 text-muted-foreground">{c.description}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <p className="text-eyebrow text-accent">{project?.timelineSection?.subtitle}</p>
          <h2 className="mt-3 text-display-lg">{project?.timelineSection?.title}</h2>
        </Reveal>
        <ol className="mt-14 space-y-px overflow-hidden rounded-2xl border border-border">
          {project?.timeline?.map((t, i) => (
            <Reveal key={t.phase} delay={i * 0.05}>
              <li className="flex flex-col gap-2 bg-card p-7 sm:flex-row sm:items-baseline sm:gap-10">
                <p className="w-32 shrink-0 text-sm font-medium text-accent">
                  0{i + 1} · {t.phase}
                </p>
                <p className="text-base text-muted-foreground">{t.description}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* NEXT PROJECT */}
      {/*<section className="mx-auto max-w-5xl px-6 pb-32">*/}
      {/*  <Reveal>*/}
      {/*    <Link*/}
      {/*      to="/projects/$slug"*/}
      {/*      params={{ slug: next.slug }}*/}
      {/*      className="group flex items-center justify-between rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-glass sm:p-12"*/}
      {/*    >*/}
      {/*      <div>*/}
      {/*        <p className="text-eyebrow text-muted-foreground">Next project</p>*/}
      {/*        <p className="mt-2 text-2xl font-semibold sm:text-3xl">{next.name}</p>*/}
      {/*        <p className="mt-1 text-muted-foreground">{next.tagline}</p>*/}
      {/*      </div>*/}
      {/*      <img src={next.icon} alt="" width={64} height={64} className="h-16 w-16 rounded-2xl shadow-md transition-transform duration-500 group-hover:scale-105" />*/}
      {/*    </Link>*/}
      {/*  </Reveal>*/}
      {/*</section>*/}

      {/* LIGHTBOX */}
      {/*{lightbox !== null && (*/}
      {/*  <motion.div*/}
      {/*    initial={{ opacity: 0 }}*/}
      {/*    animate={{ opacity: 1 }}*/}
      {/*    exit={{ opacity: 0 }}*/}
      {/*    onClick={() => setLightbox(null)}*/}
      {/*    className="fixed inset-0 z-[60] grid place-items-center bg-foreground/90 px-6 backdrop-blur-md"*/}
      {/*  >*/}
      {/*    <button className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-background/20 text-background">*/}
      {/*      <X className="h-5 w-5" />*/}
      {/*    </button>*/}
      {/*    <motion.img*/}
      {/*      initial={{ scale: 0.95 }}*/}
      {/*      animate={{ scale: 1 }}*/}
      {/*      src={project.screenshots[lightbox]}*/}
      {/*      alt=""*/}
      {/*      className="max-h-[90vh] w-auto rounded-3xl border border-background/10 shadow-card"*/}
      {/*      onClick={(e) => e.stopPropagation()}*/}
      {/*    />*/}
      {/*  </motion.div>*/}
      {/*)}*/}
    </>
  );
}
