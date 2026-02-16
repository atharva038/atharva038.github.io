import { ArrowUp } from "lucide-react";
import { ChessPawn } from "@/components/ui/chess-pieces";

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
          Built with <ChessPawn size={14} className="inline text-accent-muted" /> and code &copy; {new Date().getFullYear()} Atharva Joshi
        </p>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-border-hover transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
}
