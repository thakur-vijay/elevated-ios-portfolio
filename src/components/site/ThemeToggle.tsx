import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const getIsDarkMode = () => {
  if (typeof window === "undefined") return false;

  const stored = localStorage.getItem("theme");
  const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return stored ? stored === "dark" : prefers;
};

const applyTheme = (isDark: boolean) => {
  document.documentElement.classList.toggle("dark", isDark);

  window.dispatchEvent(
    new CustomEvent("themechange", {
      detail: { dark: isDark },
    }),
  );
};

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = getIsDarkMode();

    setDark(isDark);
    applyTheme(isDark);
  }, []);

  const toggle = () => {
    const next = !dark;

    setDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    applyTheme(next);
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
