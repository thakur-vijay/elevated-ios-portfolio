import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Twitter, Mail, Apple } from "lucide-react";

import { useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchHomeResponse } from "../../redux/features/homeSlice";
import { useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useEffect } from "react";
import { fetchFooterResponse } from "@/redux/features/footerSlice.ts";

export function Footer() {
  const dispatch = useDispatch<AppDispatch>();
  const { footer, status } = useSelector((state: RootState) => state.footer);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchFooterResponse());
    }
  }, [status, dispatch]);
  return (
    <footer className="border-t border-border/60 bg-surface/60">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Apple className="h-4 w-4" strokeWidth={2.4} />
              Adrian Vale
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Senior iOS Engineer crafting premium native experiences for the Apple ecosystem.
            </p>
          </div>

          <div>
            <p className="text-eyebrow text-muted-foreground">Explore</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/projects" className="text-foreground/80 hover:text-foreground">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/experience" className="text-foreground/80 hover:text-foreground">
                  Experience
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground/80 hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-foreground/80 hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-eyebrow text-muted-foreground">Connect</p>
            <ul className="mt-4 flex gap-2">
              <ul className="mt-4 flex gap-2">
                {footer?.socialLinks?.github && (
                  <li>
                    <a
                      href={footer.socialLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:text-foreground hover:shadow-glass"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </li>
                )}

                {footer?.socialLinks?.linkedin && (
                  <li>
                    <a
                      href={footer.socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:text-foreground hover:shadow-glass"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </li>
                )}

                {footer?.socialLinks?.twitter && (
                  <li>
                    <a
                      href={footer.socialLinks.twitter}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Twitter"
                      className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:text-foreground hover:shadow-glass"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  </li>
                )}

                {footer?.socialLinks?.mail && (
                  <li>
                    <a
                      href={footer.socialLinks.mail}
                      aria-label="Email"
                      className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:text-foreground hover:shadow-glass"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </li>
                )}
              </ul>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {footer?.copyrightMessage}
          </p>
          <p>{footer?.rightSideMessage}</p>
        </div>
      </div>
    </footer>
  );
}
