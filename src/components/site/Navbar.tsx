import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Apple } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "../../context/UserContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();
  const user = useUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass-strong border-b border-border/60" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-12 max-w-6xl items-center justify-between px-6 text-[13px]">
        <Link to="/" className="flex items-center gap-2 font-medium tracking-tight">
          <Apple className="h-4 w-4" strokeWidth={2.4} />
          <span>{user?.name}</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const active =
              location.pathname === l.to || (l.to !== "/" && location.pathname.startsWith(l.to));
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={cn(
                    "relative text-foreground/80 transition-colors duration-300 hover:text-foreground",
                    active && "text-foreground",
                  )}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 mx-auto h-px w-4 bg-foreground"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-1.5 text-foreground/80 transition-colors hover:text-foreground md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.42, 0, 0.16, 1] }}
            className="glass-strong border-t border-border/60 md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="block rounded-md px-2 py-3 text-base text-foreground/85 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
