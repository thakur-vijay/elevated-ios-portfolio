import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Github, Linkedin, Twitter, Send, Check } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

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

function ContactPage() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-32 sm:pt-40">
        <Reveal><p className="text-eyebrow text-accent">Contact</p></Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 text-display-2xl">Let's make something exceptional.</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-2xl text-xl text-muted-foreground">
            I respond personally to every message — usually within a day or two.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-5xl gap-12 px-6 pb-32 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <div className="space-y-8">
            <div>
              <p className="text-eyebrow text-muted-foreground">Email</p>
              <a href="mailto:hello@adrianvale.dev" className="mt-2 flex items-center gap-2 text-lg text-foreground">
                <Mail className="h-4 w-4" /> hello@adrianvale.dev
              </a>
            </div>
            <div>
              <p className="text-eyebrow text-muted-foreground">Based in</p>
              <p className="mt-2 text-lg">San Francisco, CA</p>
            </div>
            <div>
              <p className="text-eyebrow text-muted-foreground">Elsewhere</p>
              <div className="mt-3 flex gap-2">
                {[
                  { Icon: Github, label: "GitHub" },
                  { Icon: Linkedin, label: "LinkedIn" },
                  { Icon: Twitter, label: "Twitter" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-glass"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-8 shadow-glass sm:p-10">
            <div className="grid gap-5">
              <Field label="Your name" id="name" required />
              <Field label="Email" id="email" type="email" required />
              <Field label="Company (optional)" id="company" />
              <div>
                <label htmlFor="message" className="text-sm font-medium text-foreground/90">Message</label>
                <textarea
                  id="message"
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
                {sent ? (<><Check className="h-4 w-4" /> Message sent</>) : (<>Send message <Send className="h-4 w-4" /></>)}
              </button>
            </div>
          </form>
        </Reveal>
      </section>
    </>
  );
}

function Field({ label, id, type = "text", required }: { label: string; id: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-foreground/90">{label}</label>
      <input
        id={id}
        type={type}
        required={required}
        className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}
