import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { ComponentType } from "react";
import type { ExperienceItem } from "@/data/portfolio-data";
import {
  ChessKing,
  ChessQueen,
  ChessRook,
  ChessKnight,
  ChessBishop,
  ChessPawn,
} from "@/components/ui/chess-pieces";

const pieceMap = {
  king: ChessKing,
  queen: ChessQueen,
  rook: ChessRook,
  knight: ChessKnight,
  bishop: ChessBishop,
  pawn: ChessPawn,
} satisfies Record<ExperienceItem["piece"], ComponentType<{ size?: number }>>;

const typeLabel = {
  work: "Career Move",
  education: "Foundation",
  achievement: "Mastery",
} satisfies Record<ExperienceItem["type"], string>;

interface ExperienceTimelineItemProps {
  experience: ExperienceItem;
  index: number;
  isActive: boolean;
  onToggle: () => void;
}

export function ExperienceTimelineItem({
  experience,
  index,
  isActive,
  onToggle,
}: ExperienceTimelineItemProps) {
  const PieceIcon = pieceMap[experience.piece];

  return (
    <div
      data-experience-item
      data-experience-index={index}
      className="relative pl-14 sm:pl-20"
    >
      <motion.div
        data-experience-node
        className={`absolute left-3.5 sm:left-5.5 top-5 sm:top-6 w-5 h-5 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center cursor-pointer z-10 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] before:absolute before:inset-[-5px] before:rounded-full before:border before:border-border/45 before:rotate-45 before:transition-colors ${
          isActive
            ? "border-electric bg-electric/20 shadow-[0_0_15px_var(--glow-color1),inset_0_1px_0_rgba(255,255,255,0.22)] scale-125 before:border-electric/50"
            : "border-border-hover bg-background hover:border-electric/50 hover:bg-electric/10 hover:shadow-[0_0_10px_var(--glow-color1),inset_0_1px_0_rgba(255,255,255,0.18)] hover:scale-110 before:border-border/45"
        }`}
        onClick={onToggle}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            isActive ? "bg-electric" : "bg-surface-light"
          }`}
        />
      </motion.div>

      {isActive && (
        <motion.div
          className="absolute left-3.5 sm:left-5.5 top-5 sm:top-6 w-5 h-5 sm:w-5 sm:h-5 rounded-full border border-accent/40"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      <div
        onClick={onToggle}
        className={`group relative rounded-3xl border cursor-pointer transition-all duration-300 overflow-hidden ${
          isActive
            ? "glass-panel border-electric/30 shadow-[0_4px_30px_rgba(56,189,248,0.15)]"
            : "glass border-border hover:border-border hover:bg-surface"
        }`}
      >
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="hidden dark:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-surface-light to-transparent experience-shimmer" />
        </div>

        <div className="absolute -right-16 -bottom-16 opacity-5 group-hover:opacity-10 transition-all duration-700 pointer-events-none transform group-hover:scale-110 group-hover:-rotate-6 z-0">
          <PieceIcon size={240} />
        </div>

        <div className="p-4 sm:p-6 relative z-10">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <div className="px-3 py-1 rounded-full bg-surface border border-border text-[10px] sm:text-xs text-electric font-mono uppercase tracking-wider">
                  {typeLabel[experience.type]}
                </div>
                <span className="text-[10px] sm:text-xs text-muted-foreground font-mono">
                  {experience.duration}
                </span>
              </div>

              <h3 className="text-base sm:text-xl font-bold text-foreground leading-tight tracking-tight">
                {experience.role}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1 font-medium">
                {experience.organization}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <motion.div
                animate={{ rotate: isActive ? 90 : 0 }}
                transition={{ duration: 0.3 }}
                className="p-2 rounded-full bg-surface text-muted hover:bg-surface transition-colors"
              >
                <ChevronRight size={16} />
              </motion.div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed">
            {experience.description}
          </p>
        </div>

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-border/50">
                <div className="mt-4">
                  <span className="text-[10px] sm:text-xs text-muted font-mono uppercase tracking-wider">
                    Key Moves
                  </span>
                  <ul className="mt-2 sm:mt-3 space-y-2">
                    {experience.highlights.map((highlight, highlightIndex) => (
                      <motion.li
                        key={highlight}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: highlightIndex * 0.1 }}
                        className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground"
                      >
                        <span className="w-1 h-1 rounded-full bg-accent-muted mt-1.5 shrink-0" />
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {experience.tech && experience.tech.length > 0 && (
                  <div className="mt-4">
                    <span className="text-[10px] sm:text-xs text-muted font-mono uppercase tracking-wider">
                      Arsenal Used
                    </span>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                      {experience.tech.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIndex * 0.05 }}
                          className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs rounded-lg bg-surface border border-border text-muted-foreground"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
