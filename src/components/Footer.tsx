import { ArrowUp, Eye } from "lucide-react";
import { ChessPawn } from "@/components/ui/chess-pieces";
import MagneticButton from "@/components/ui/MagneticButton";
import { useSiteVisits } from "@/hooks/useSiteVisits";

export default function Footer() {
  const { viewerVisits, ownerVisits, isOwner, isLoading, error } = useSiteVisits();

  return (
    <footer className="py-8 px-6 border-t border-border bg-background relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <p className="text-sm text-muted-foreground flex items-center gap-1.5 font-light">
            Built with <ChessPawn size={14} className="inline text-electric mx-1" /> and code &copy; {new Date().getFullYear()} Atharva Joshi
          </p>

          {!error && (
            <div className="glass px-3 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 text-muted-foreground transition-all duration-300">
              <Eye size={12} className="text-electric" />
              <span>
                {isLoading ? (
                  <span className="opacity-50">loading stats...</span>
                ) : (
                  <>
                    <span>{viewerVisits.toLocaleString()} visits</span>
                    {isOwner && (
                      <>
                        <span className="text-border mx-1">|</span>
                        <span className="text-electric font-semibold">{ownerVisits} owner</span>
                      </>
                    )}
                  </>
                )}
              </span>
            </div>
          )}
        </div>

        <MagneticButton
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="p-3 rounded-xl glass border border-border text-muted-foreground hover:text-electric hover:border-electric/30 transition-all duration-300"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </MagneticButton>
      </div>
    </footer>
  );
}
