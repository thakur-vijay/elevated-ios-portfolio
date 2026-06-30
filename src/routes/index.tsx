import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroPhone from "@/assets/hero-iphone.png";
import { projects } from "@/lib/projects";
import { AppCard } from "@/components/site/AppCard";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import { useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { fetchHomeResponse } from "../redux/features/homeSlice";
import { fetchHomeExperienceResponse } from "@/redux/features/homeExperienceSlice.ts";
import { fetchHomeProjectResponse } from "@/redux/features/homeProjectSlice.ts";
import { useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { formatExperienceDuration } from "@/routes/experience.tsx";
import { fetchSkillResponse } from "@/redux/features/skillsSlice.ts";
import { useUser } from "@/context/UserContext.tsx";
import { fetchUserData } from "@/sanity/sanityService.ts";

export const Route = createFileRoute("/")({
  loader: async () => {
    const user = await fetchUserData(); // API / CMS / whatever
    console.log("user", user);
    return { user };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.user?.name} — ${loaderData?.user?.role}` },
      {
        name: "description",
        content: loaderData?.user?.tagline,
      },
      { property: "og:title", content: `${loaderData?.user?.name} - ${loaderData?.user?.role}` },
      {
        property: "og:description",
        content: loaderData?.user?.tagline,
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const phoneScale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const phoneRotate = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const user = Route.useLoaderData().user;
  const dispatch = useDispatch<AppDispatch>();
  const { home, status: status1 } = useSelector((state: RootState) => state.home);
  const { experience: homeExperience, status: status2 } = useSelector(
    (state: RootState) => state.homeExperience,
  );

  const { homeProject, status: status3 } = useSelector((state: RootState) => state.homeProject);
  const { skill: skills, status: status4 } = useSelector((state: RootState) => state.skills);

  useEffect(() => {
    if (status1 === "idle") {
      dispatch(fetchHomeResponse());
    }
    if (status2 === "idle") {
      dispatch(fetchHomeExperienceResponse());
    }
    if (status3 === "idle") {
      dispatch(fetchHomeProjectResponse());
    }
    if (status4 === "idle") {
      dispatch(fetchSkillResponse());
    }
  }, [status1, status2, status3, status4, dispatch]);
  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative -mt-12 flex min-h-screen flex-col items-center justify-center overflow-hidden pt-12"
      >
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
            {user?.role} · {user?.location}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-display-2xl text-foreground"
          >
            {home?.homeSection?.title1}
            <br />
            <span className="bg-gradient-to-r from-accent via-foreground to-accent bg-clip-text text-transparent">
              {home?.homeSection?.title2}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-7 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            {home?.homeSection?.subtitle}
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
          <p className="text-eyebrow text-accent">
            {home?.philosophySection?.roleTags?.join(" · ")}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 text-display-xl text-foreground">{home?.philosophySection?.title}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {home?.philosophySection?.subtitle}
          </p>
        </Reveal>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <SectionHeader
          eyebrow={home?.workSection?.subTitle}
          title={home?.workSection?.title ?? ""}
          description={home?.workSection?.description}
        />
        <div className="mt-16 space-y-12">
          {homeProject?.map((p) => (
            <AppCard key={p._id} project={p} />
          ))}
        </div>
      </section>

      {/* TECH STACK */}
      <section className="mx-auto max-w-6xl px-6 py-32">
        <SectionHeader
          eyebrow={home?.skillsSection?.subTitle}
          title={home?.skillsSection?.title ?? ""}
          description={home?.skillsSection?.description}
          align="center"
        />
        <div className="mt-12 space-y-8">
          {skills?.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.035}>
              <div>
                <h3 className="mb-4 text-sm font-semibold tracking-tight text-foreground">
                  {group.label}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-full border border-border-strong bg-background/60 px-4 py-2 text-sm font-medium text-foreground/80 backdrop-blur transition-all duration-300 hover:bg-background"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* METRICS */}
      <section className="mx-auto max-w-6xl px-6 py-32">
        <Reveal>
          <div className="rounded-3xl border border-border bg-gradient-to-br from-surface to-card p-12 sm:p-20 noise-overlay">
            <p className="text-eyebrow text-accent">{home?.impactSection?.subTitle}</p>
            <h2 className="mt-3 text-display-lg">{home?.impactSection?.title}</h2>
            <div className="mt-12 grid grid-cols-2 gap-10 sm:grid-cols-4">
              {home?.impactSection?.stats?.map((m, i) => (
                <Reveal key={m.label} delay={i * 0.08}>
                  <div>
                    <p className="text-display-lg !text-5xl text-foreground sm:!text-6xl">
                      {m.value}
                    </p>
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
        <SectionHeader
          eyebrow={home?.experienceSection?.subTitle}
          title={home?.experienceSection?.title ?? ""}
        />
        <div className="mt-14 divide-y divide-border border-y border-border">
          {homeExperience?.map((e, i) => (
            <Reveal key={e.role} delay={i * 0.05}>
              <div className="flex items-baseline justify-between gap-6 py-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{e.role}</h3>
                  <p className="text-sm text-muted-foreground">{e.company}</p>
                </div>
                <p className="shrink-0 text-sm text-muted-foreground tabular-nums">
                  {formatExperienceDuration(e?.startDate, e?.endDate)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Link
            to="/experience"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent"
          >
            Full timeline{" "}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-foreground px-8 py-20 text-center text-background sm:px-16 sm:py-28">
            <div className="absolute inset-0 -z-10 grad-aurora opacity-40" />
            <p className="text-eyebrow text-background/70">{home?.ctaSection?.eyebrow}</p>
            <h2 className="mx-auto mt-3 max-w-3xl text-display-xl">{home?.ctaSection?.title}</h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-background/75">
              {home?.ctaSection?.description}
            </p>
            <div className="mt-10">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-1.5 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:gap-2.5"
              >
                Start a conversation{" "}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
