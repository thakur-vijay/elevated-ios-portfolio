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
import { fetchProjectPageResponse } from "@/redux/features/projectPageSlice.ts";
import { ProjectResponse } from "@/models/project.ts";
import { fetchUserData } from "@/sanity/sanityService.ts";

export const Route = createFileRoute("/projects/")({
  loader: async () => {
    const user = await fetchUserData(); // API / CMS / whatever
    console.log("user", user);
    return { user };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Projects — ${loaderData?.user?.name}` },
      {
        name: "description",
        content: loaderData?.user?.tagline,
      },
      { property: "og:title", content: `Projects — ${loaderData?.user?.name}` },
      {
        property: "og:description",
        content: loaderData?.user?.tagline,
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { project, status: status1 } = useSelector((state: RootState) => state.project);
  const { projectPage, status: status2 } = useSelector((state: RootState) => state.projectPage);

  useEffect(() => {
    if (status1 === "idle") {
      dispatch(fetchProjectResponse());
    }
    if (status2 === "idle"){
      dispatch(fetchProjectPageResponse());
    }
  }, [status1, dispatch]);
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-32 text-center sm:pt-40">
        <Reveal>
          <p className="text-eyebrow text-accent">{projectPage?.subtitle}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 text-display-2xl">{projectPage?.title}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-2xl text-lg text-muted-foreground">
            {projectPage?.description}
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
