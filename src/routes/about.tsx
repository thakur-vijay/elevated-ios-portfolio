import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { fetchAboutResponse } from "../redux/features/aboutSlice";
import { useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { PortableText } from "@portabletext/react";
import { useEffect } from "react";

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

const portableTextComponents = {
  list: {
    bullet: ({ children }: any) => <ul className="my-6 list-disc space-y-3 pl-6">{children}</ul>,
    number: ({ children }: any) => <ol className="my-6 list-decimal space-y-3 pl-6">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="pl-2">{children}</li>,
    number: ({ children }: any) => <li className="pl-2">{children}</li>,
  },
  block: {
    normal: ({ children }: any) => <p className="mb-4">{children}</p>,
  },
};

function AboutPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { about, status } = useSelector((state: RootState) => state.about);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAboutResponse());
    }
  }, [status, dispatch]);
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-32 sm:pt-40">
        <Reveal>
          <p className="text-eyebrow text-accent">{about?.aboutSection?.subtitle}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 text-display-2xl">{about?.aboutSection?.title}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground [&_p]:mb-4">
            <PortableText
              value={about?.aboutSection?.about ?? []}
              components={portableTextComponents}
            />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader
          eyebrow={about?.principleSection?.subtitle}
          title={about?.principleSection?.title ?? ""}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {about?.principleSection?.principles?.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <article className="h-full rounded-3xl border border-border bg-card p-10 transition-all duration-500 hover:-translate-y-1 hover:border-border-strong hover:shadow-glass">
                <p className="text-eyebrow text-accent">0{i + 1}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24">
        <SectionHeader
          eyebrow={about?.beyondCodeSection?.subtitle}
          title={about?.beyondCodeSection?.title ?? ""}
        />
        <Reveal delay={0.1}>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
            {about?.beyondCodeSection?.description}
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-32">
        <Reveal>
          <div className="rounded-3xl border border-border bg-card p-12 text-center sm:p-20">
            <h2 className="text-display-lg">{about?.collaborationMessage}</h2>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all duration-300 hover:gap-2.5"
            >
              Say Hello <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
