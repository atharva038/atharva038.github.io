import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeProviderContext, type Theme } from "./theme-context";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark", "blkdev");
    root.classList.add(theme);
  }, [theme]);

  const updateTheme = useCallback((theme: Theme) => {
    localStorage.setItem(storageKey, theme);
    setTheme(theme);
  }, [storageKey]);

  const value = useMemo(() => ({
    theme,
    setTheme: updateTheme,
  }), [theme, updateTheme]);

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
