import { useEffect, useRef, useState } from "react";
import { useTheme, type Theme } from "./theme-context";
import MagneticButton from "@/components/ui/MagneticButton";

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
  const openRef = useRef(false);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!openRef.current) return;
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
      <MagneticButton
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
      </MagneticButton>

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
              <MagneticButton
                key={t.value}
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  setTheme(t.value);
                  setOpen(false);
                }}
                data-active={isActive}
                className="theme-option w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors duration-150 group"
                style={{ background: "transparent" }}
              >
                <span className="text-base w-5 text-center leading-none shrink-0">
                  {t.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider leading-none mb-0.5">
                    {t.label}
                  </p>
                  <p className="theme-option-muted font-mono text-[10px]">
                    {t.desc}
                  </p>
                </div>
                {isActive && (
                  <span className="text-xs shrink-0">
                    ✓
                  </span>
                )}
              </MagneticButton>
            );
          })}
        </div>
      )}
    </div>
  );
}
