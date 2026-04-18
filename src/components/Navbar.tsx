import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/portfolio-data";
import { cn } from "@/lib/utils";

export default function Navbar() {
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
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[92%] max-w-5xl rounded-full border border-transparent",
        scrolled ? "backdrop-blur-2xl bg-white/[0.03] py-3 px-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-white/10" : "py-4 px-6"
      )}
    >
      <div className="flex items-center justify-between">
        <a
          href="#hero"
          className="text-xl font-bold text-foreground flex items-center gap-2 hover:text-electric transition-colors"
        >
          <span className="font-serif tracking-wide">AJ</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-electric transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden backdrop-blur-2xl bg-white/[0.03] absolute top-full left-0 right-0 mt-2 mx-auto rounded-3xl p-5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] animate-in fade-in slide-in-from-top-4 duration-300">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-muted-foreground hover:text-white transition-colors block p-2 rounded-lg hover:bg-white/5 w-full text-center"
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
