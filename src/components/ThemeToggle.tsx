import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative inline-flex items-center justify-center rounded-full p-2 text-foreground hover:bg-surface-light transition-colors focus:outline-none focus:ring-2 focus:ring-electric"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
