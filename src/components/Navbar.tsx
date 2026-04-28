import { useState, useEffect } from "react";
import { Menu, X, TerminalSquare, MonitorSmartphone } from "lucide-react";
import { navLinks } from "@/data/portfolio-data";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

interface NavbarProps {
  isTerminalMode?: boolean;
  setIsTerminalMode?: (val: boolean) => void;
}

export default function Navbar({ isTerminalMode = false, setIsTerminalMode }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[94%] sm:w-[92%] max-w-5xl rounded-full border",
        scrolled 
          ? "backdrop-blur-2xl bg-surface border-border shadow-[0_8px_32px_var(--glass-shadow)]" 
          : "bg-transparent border-transparent"
      )}
    >
      <div className={cn(
        "flex items-center justify-between px-4 sm:px-6 transition-all duration-300", 
        scrolled ? "py-2.5 sm:py-3" : "py-3 sm:py-4"
      )}>
        <a
          href="#hero"
          className="text-xl font-bold text-foreground flex items-center gap-2 hover:text-electric transition-colors"
          onClick={(e) => {
            if (isTerminalMode && setIsTerminalMode) {
              e.preventDefault();
              setIsTerminalMode(false);
            }
          }}
        >
          <span className="font-serif tracking-wide">AJ</span>
        </a>

        <div className="flex items-center gap-4 md:gap-8">
          {!isTerminalMode && (
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
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
            <button
              onClick={() => setIsTerminalMode(!isTerminalMode)}
              className="text-muted-foreground hover:text-foreground p-2 hover:bg-surface-light rounded-full transition-colors flex items-center"
              aria-label="Toggle Terminal Mode"
              title={isTerminalMode ? "Switch to Visual Mode" : "Switch to Terminal Mode"}
            >
              {isTerminalMode ? <MonitorSmartphone size={20} /> : <TerminalSquare size={20} />}
            </button>
          )}

          <ThemeToggle />

          {!isTerminalMode && (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-foreground p-2 hover:bg-surface-light rounded-full transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden backdrop-blur-2xl bg-surface absolute top-full left-0 right-0 mt-2 mx-auto rounded-3xl p-5 border border-border shadow-[0_8px_32px_var(--glass-shadow)] animate-in fade-in slide-in-from-top-4 duration-300">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
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
