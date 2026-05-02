import { memo, useState, useEffect, useRef } from "react";
import { Menu, X, TerminalSquare, MonitorSmartphone } from "lucide-react";
import { navLinks } from "@/data/portfolio-data";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import MagneticButton from "@/components/ui/MagneticButton";

interface NavbarProps {
  isTerminalMode?: boolean;
  setIsTerminalMode?: (val: boolean) => void;
  onNavClick?: (hash: string) => void;
}

function Navbar({ isTerminalMode = false, setIsTerminalMode, onNavClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const scrolledRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const nextScrolled = window.scrollY > 50;
      if (scrolledRef.current === nextScrolled) return;
      scrolledRef.current = nextScrolled;
      setScrolled(nextScrolled);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[94%] sm:w-[92%] max-w-5xl rounded-full border",
        scrolled 
          ? "backdrop-blur-md sm:backdrop-blur-xl bg-surface border-border shadow-[0_8px_32px_var(--glass-shadow)]" 
          : "bg-transparent border-transparent"
      )}
    >
      <div className={cn(
        "flex items-center justify-between px-4 sm:px-6 transition-all duration-300", 
        scrolled ? "py-2.5 sm:py-3" : "py-3 sm:py-4"
      )}>
        <a
          href="#hero"
          aria-label="Atharva Sachin Joshi - Home"
          className="group/logo relative inline-flex h-10 w-12 items-center overflow-hidden rounded-full text-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#F5D000]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-36"
          onClick={(e) => {
            if (isTerminalMode && setIsTerminalMode) {
              e.preventDefault();
              setIsTerminalMode(false);
            }
          }}
        >
          <span className="inline-flex h-9 w-10 items-center justify-center rounded-full border border-border/70 bg-surface/70 font-serif text-lg font-bold tracking-wide shadow-[2px_2px_0_var(--theme-border)] transition-all duration-300 motion-reduce:transition-none sm:group-hover/logo:-translate-x-2 sm:group-hover/logo:opacity-0 sm:group-focus-visible/logo:-translate-x-2 sm:group-focus-visible/logo:opacity-0">
            <span>A</span>
            <span className="text-[#F5D000]">J</span>
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1 hidden h-9 translate-x-3 items-center whitespace-nowrap font-mono text-sm font-semibold opacity-0 transition-all duration-300 motion-reduce:transition-none sm:inline-flex sm:group-hover/logo:translate-x-0 sm:group-hover/logo:opacity-100 sm:group-focus-visible/logo:translate-x-0 sm:group-focus-visible/logo:opacity-100"
          >
            <span className="text-[#F5D000]">&lt;</span>
            <span>Atharva</span>
            <span className="text-[#F5D000]">&nbsp;/&gt;</span>
            <span className="ml-1 h-4 w-px bg-[#F5D000] opacity-80 transition-opacity duration-150 group-hover/logo:animate-pulse group-focus-visible/logo:animate-pulse" />
          </span>
        </a>

        <div className="flex items-center gap-4 md:gap-8">
          {!isTerminalMode && (
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (onNavClick) {
                        e.preventDefault();
                        e.stopPropagation();
                        onNavClick(link.href);
                      }
                    }}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-electric transition-all duration-300 group-hover:w-full rounded-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          )}
          
          {setIsTerminalMode && (
            <MagneticButton
              onClick={() => {
                setMobileOpen(false);
                setIsTerminalMode(!isTerminalMode);
              }}
              className="text-muted-foreground hover:text-foreground p-2 hover:bg-surface-light rounded-full transition-colors flex items-center"
              aria-label="Toggle Terminal Mode"
              title={isTerminalMode ? "Switch to Visual Mode" : "Switch to Terminal Mode"}
            >
              {isTerminalMode ? <MonitorSmartphone size={20} /> : <TerminalSquare size={20} />}
            </MagneticButton>
          )}

          <ThemeToggle />

          {!isTerminalMode && (
            <MagneticButton
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-foreground p-2 hover:bg-surface-light rounded-full transition-colors"
              aria-label="Toggle menu"
              aria-controls="mobile-nav-menu"
              aria-expanded={mobileOpen}
              type="button"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </MagneticButton>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden backdrop-blur-md bg-surface absolute top-full left-0 right-0 mt-2 mx-auto rounded-3xl p-5 border border-border shadow-[0_8px_32px_var(--glass-shadow)] animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    setMobileOpen(false);
                    if (onNavClick) {
                      e.preventDefault();
                      e.stopPropagation();
                      onNavClick(link.href);
                    }
                  }}
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors block p-2 rounded-lg hover:bg-surface-light w-full text-center"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default memo(Navbar);
