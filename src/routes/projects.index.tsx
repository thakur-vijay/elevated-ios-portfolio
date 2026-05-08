import { createFileRoute } from "@tanstack/react-router";
import { projects } from "@/lib/projects";
import { AppCard } from "@/components/site/AppCard";
import { Reveal } from "@/components/site/Reveal";
import { useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { fetchProjectResponse } from "../redux/features/projectSlice.ts";
import { useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useEffect } from "react";
import { fetchExperiencePageResponse } from "@/redux/features/experiencePageSlice.ts";
import { fetchExperienceResponse } from "@/redux/features/experienceSlice.ts";
import { ProjectResponse } from "@/models/project.ts";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Adrian Vale" },
      {
        name: "description",
        content:
          "A selection of native iOS apps I've architected, engineered, and shipped to the App Store.",
      },
      { property: "og:title", content: "Projects — Adrian Vale" },
      { property: "og:description", content: "Native iOS apps shipped with intention." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { project, status } = useSelector((state: RootState) => state.project);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProjectResponse());
    }
  }, [status, dispatch]);
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-32 text-center sm:pt-40">
        <Reveal>
          <p className="text-eyebrow text-accent">Projects</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 text-display-2xl">Work I'm proud to put my name on.</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-2xl text-lg text-muted-foreground">
            A small, deliberate catalog of native iOS apps — each engineered end-to-end, from
            architecture to App Store launch.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl space-y-12 px-6 pb-32">
        {project?.map((p: ProjectResponse) => (
          <AppCard key={p._id} project={p} />
        ))}
      </section>
    </>
  );
}
