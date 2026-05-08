import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { ProjectResponse } from "@/models/project.ts";
import { urlFor } from "@/sanity/sanityService.ts";

export function AppCard({
  project,
  reverse = false,
}: {
  project: ProjectResponse;
  reverse?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl border border-border/70 bg-card shadow-card"
    >
      <div className={cn("absolute inset-0 -z-10 bg-gradient-to-br")} />
      <div
        className={cn(
          "grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16",
          reverse && "lg:[&>*:first-child]:order-2",
        )}
      >
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <img
              src={urlFor(project.appIcon).url()}
              alt={project.appName}
              width={48}
              height={48}
              loading="lazy"
              className="h-12 w-12 rounded-[12px] shadow-md object-cover"
            />
            <div>
              <p className="text-eyebrow text-muted-foreground">{project.appType}</p>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight">{project.appName}</h3>
            </div>
          </div>

          <p className="mt-6 text-display-lg !text-3xl !leading-tight sm:!text-4xl lg:!text-[2.6rem]">
            {project.tagline}
          </p>
          <p className="mt-5 max-w-md text-base text-muted-foreground">{project.description}</p>

          <div className="mt-7 flex flex-wrap gap-2">
            {project.techStack?.slice(0, 5).map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-foreground/80"
              >
                {s}
              </span>
            ))}
          </div>

          <Link
            to="/projects/$slug"
            params={{ slug: project._id }}
            className="group mt-8 inline-flex w-fit items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all duration-300 hover:gap-2.5 hover:shadow-glass"
          >
            View project
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
          </Link>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 -z-10 grad-aurora rounded-[2rem] blur-2xl opacity-60" />
          <motion.img
            src={urlFor(project.screenshots?.[0]).url()}
            alt={`${project.appName} app screenshot`}
            width={420}
            height={860}
            loading="lazy"
            className="max-h-[520px] w-auto rounded-[2rem] border border-border/40 shadow-card"
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
        </div>
      </div>
    </motion.article>
  );
}
