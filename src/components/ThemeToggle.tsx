import { useEffect, useRef, useState } from "react";
import { useTheme, type Theme } from "./ThemeProvider";

const themes: { value: Theme; label: string; icon: string; desc: string }[] = [
  {
    value: "light",
    label: "Light",
    icon: "☀",
    desc: "BLK/DEV — White",
  },
  {
    value: "blkdev",
    label: "BLK/DEV",
    icon: "⚡",
    desc: "Industrial Dark",
  },
  {
    value: "dark",
    label: "Dark Glass",
    icon: "◈",
    desc: "Glassmorphic",
  },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = themes.find((t) => t.value === theme) ?? themes[0];

  return (
    <div ref={ref} className="relative" id="theme-dropdown">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select theme"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-mono font-semibold text-muted-foreground hover:text-foreground hover:border-border-hover transition-all duration-200"
        style={{ background: "var(--theme-surface)" }}
      >
        <span className="text-sm leading-none">{current.icon}</span>
        <span className="hidden sm:inline tracking-wider uppercase">{current.label}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          role="listbox"
          aria-label="Theme options"
          className="absolute right-0 mt-2 w-44 rounded-xl overflow-hidden border border-border shadow-lg z-[200] animate-in fade-in slide-in-from-top-2 duration-150"
          style={{ background: "var(--theme-surface)", borderColor: "var(--theme-border)" }}
        >
          {/* Header */}
          <div
            className="px-3 py-2 border-b font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground/60"
            style={{ borderColor: "var(--theme-border)" }}
          >
            // Select theme
          </div>

          {themes.map((t) => {
            const isActive = theme === t.value;
            return (
              <button
                key={t.value}
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  setTheme(t.value);
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors duration-150 group"
                style={{
                  background: isActive ? "var(--theme-muted)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--theme-muted)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                }}
              >
                <span className="text-base w-5 text-center leading-none shrink-0">
                  {t.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-xs font-bold text-foreground uppercase tracking-wider leading-none mb-0.5">
                    {t.label}
                  </p>
                  <p className="font-mono text-[10px] text-muted-foreground">
                    {t.desc}
                  </p>
                </div>
                {isActive && (
                  <span style={{ color: "var(--theme-electric)" }} className="text-xs shrink-0">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
