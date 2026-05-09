import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const prefers = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefers;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;

    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");

    window.dispatchEvent(
      new CustomEvent("themechange", {
        detail: { dark: next },
      }),
    );
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-border bg-card/80 text-foreground/80 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground hover:shadow-glass"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
