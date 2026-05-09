import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Github, Linkedin, Twitter, Send, Check } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useUser } from "../context/UserContext";
import { useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { fetchContactPageResponse } from "../redux/features/contactPageSlice";
import { useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useEffect } from "react";
import { fetchAboutResponse } from "@/redux/features/aboutSlice.ts";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Adrian Vale" },
      { name: "description", content: "Get in touch about iOS engineering engagements, advisory, or collaborations." },
      { property: "og:title", content: "Contact — Adrian Vale" },
      { property: "og:description", content: "Get in touch about iOS engagements." },
    ],
  }),
  component: ContactPage,
});

export const sendContactMail = async (
  name: string,
  email: string,
  company: string,
  message: string,
) => {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "cd4761b5-38c2-4ad0-acaf-d2414a2682d1",
        name,
        email,
        company,
        message,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Failed to send message");
    }

    return {
      success: true,
      message: "Message sent successfully",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

function ContactPage() {
  const [sent, setSent] = useState(false);
  const user = useUser();
  const dispatch = useDispatch<AppDispatch>();
  const { contactPage, status } = useSelector((state: RootState) => state.contactPage);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchContactPageResponse());
    }
  }, [status, dispatch]);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const company = formData.get("company") as string;

    const result = await sendContactMail(name, email, company, message);

    console.log(result);

    if (result.success) {
      setSent(true);
      e.currentTarget.reset();
    }
  };

  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-32 sm:pt-40">
        <Reveal>
          <p className="text-eyebrow text-accent">{contactPage?.subtitle}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 text-display-2xl">{contactPage?.title}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-2xl text-xl text-muted-foreground">{contactPage?.description}</p>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-5xl gap-12 px-6 pb-32 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <div className="space-y-8">
            <div>
              <p className="text-eyebrow text-muted-foreground">Email</p>
              <a
                href={`mailto:${user?.socialLinks?.mail}`}
                className="mt-2 flex items-center gap-2 text-lg text-foreground"
              >
                <Mail className="h-4 w-4" /> {user?.socialLinks?.mail}
              </a>
            </div>
            <div>
              <p className="text-eyebrow text-muted-foreground">Based in</p>
              <p className="mt-2 text-lg">{user?.location}</p>
            </div>
            <div>
              <p className="text-eyebrow text-muted-foreground">Elsewhere</p>
              <ul className="mt-4 flex gap-2">
                {user?.socialLinks?.github && (
                  <li>
                    <a
                      href={user.socialLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="grid h-12 w-12 place-items-center rounded-full border border-border bg-card text-foreground/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:text-foreground hover:shadow-glass"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </li>
                )}

                {user?.socialLinks?.linkedin && (
                  <li>
                    <a
                      href={user.socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="grid h-12 w-12 place-items-center rounded-full border border-border bg-card text-foreground/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:text-foreground hover:shadow-glass"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </li>
                )}

                {user?.socialLinks?.twitter && (
                  <li>
                    <a
                      href={user.socialLinks.twitter}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Twitter"
                      className="grid h-12 w-12 place-items-center rounded-full border border-border bg-card text-foreground/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:text-foreground hover:shadow-glass"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-border bg-card p-8 shadow-glass sm:p-10"
          >
            <div className="grid gap-5">
              <Field label="Your name" id="name" required />
              <Field label="Email" id="email" type="email" required />
              <Field label="Company (optional)" id="company" />
              <div>
                <label htmlFor="message" className="text-sm font-medium text-foreground/90">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="mt-2 w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                  placeholder="Tell me about your product…"
                />
              </div>
              <button
                type="submit"
                disabled={sent}
                className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all duration-300 hover:gap-3 disabled:opacity-80"
              >
                {sent ? (
                  <>
                    <Check className="h-4 w-4" /> Message sent
                  </>
                ) : (
                  <>
                    Send message <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </Reveal>
      </section>
    </>
  );
}

function Field({
  label,
  id,
  type = "text",
  required,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-foreground/90">{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}
