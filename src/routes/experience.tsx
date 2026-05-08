import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { fetchExperiencePageResponse } from "../redux/features/experiencePageSlice.ts";
import { fetchExperienceResponse } from "../redux/features/experienceSlice.ts";
import { useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useEffect } from "react";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Adrian Vale" },
      {
        name: "description",
        content: "A decade of native iOS roles, projects, and platform expertise.",
      },
      { property: "og:title", content: "Experience — Adrian Vale" },
      { property: "og:description", content: "A decade of native iOS engineering roles." },
    ],
  }),
  component: ExperiencePage,
});

export const formatExperienceDuration = (startDate?: string, endDate?: string | null): string => {
  if (!startDate) return "";

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const formattedStart = formatDate(startDate);
  const formattedEnd = endDate ? formatDate(endDate) : "Present";

  return `${formattedStart} — ${formattedEnd}`;
};

function ExperiencePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { experiencePage, status: status1 } = useSelector(
    (state: RootState) => state.experiencePage,
  );
  const { experience, status: status2 } = useSelector((state: RootState) => state.experience);

  useEffect(() => {
    if (status1 === "idle") {
      dispatch(fetchExperiencePageResponse());
    }
    if (status2 === "idle") {
      dispatch(fetchExperienceResponse());
    }
  }, [status1, status2, dispatch]);

  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-32 sm:pt-40">
        <Reveal>
          <p className="text-eyebrow text-accent">{experiencePage?.subtitle}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 text-display-2xl">{experiencePage?.title}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-2xl text-xl text-muted-foreground">
            {experiencePage?.description}
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="relative">
          <div
            aria-hidden
            className="absolute left-0 top-2 bottom-2 w-px bg-border sm:left-[12rem]"
          />
          <div className="space-y-16">
            {experience?.map((r, i) => (
              <Reveal key={r.role} delay={i * 0.06}>
                <article className="relative grid gap-6 pl-6 sm:grid-cols-[12rem_1fr] sm:gap-12 sm:pl-0">
                  <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-background sm:left-[11.7rem]" />
                  <p className="text-sm font-medium text-muted-foreground tabular-nums">
                    {formatExperienceDuration(r?.startDate, r?.endDate)}
                  </p>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight">{r.role}</h3>
                    <p className="mt-1 text-base text-accent">{r.company}</p>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                      {r.description}
                    </p>
                    <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                      {r?.points?.map((p) => (
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
    </>
  );
}
