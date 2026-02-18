import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Trophy, ChevronRight } from "lucide-react";
import { experiences } from "@/data/portfolio-data";
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
} as const;

const typeIconMap = {
  work: Briefcase,
  education: GraduationCap,
  achievement: Trophy,
} as const;

const typeLabel = {
  work: "Career Move",
  education: "Foundation",
  achievement: "Mastery",
} as const;

export default function Experience() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.015] blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-accent-dim text-xs sm:text-sm font-mono tracking-widest uppercase">
            The Game Record
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mt-3 text-gradient-heading">
            Experience
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-3 max-w-md mx-auto">
            Every grandmaster's journey is recorded move by move. Here's mine.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border-hover to-transparent" />

          {/* Animated progress line */}
          <motion.div
            className="absolute left-6 sm:left-8 top-0 w-px bg-gradient-to-b from-accent-muted to-transparent"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <div className="space-y-4 sm:space-y-6">
            {experiences.map((exp, index) => {
              const PieceIcon = pieceMap[exp.piece];
              const TypeIcon = typeIconMap[exp.type];
              const isActive = activeId === exp.id;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="relative pl-14 sm:pl-20"
                >
                  {/* Timeline node */}
                  <motion.div
                    className={`absolute left-3.5 sm:left-5.5 top-5 sm:top-6 w-5 h-5 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center cursor-pointer z-10 transition-all duration-300 ${
                      isActive
                        ? "border-accent bg-accent scale-125"
                        : "border-border-hover bg-surface hover:border-accent-muted hover:scale-110"
                    }`}
                    onClick={() => setActiveId(isActive ? null : exp.id)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        isActive ? "bg-background" : "bg-accent-dim"
                      }`}
                    />
                  </motion.div>

                  {/* Pulse ring on active */}
                  {isActive && (
                    <motion.div
                      className="absolute left-3.5 sm:left-5.5 top-5 sm:top-6 w-5 h-5 sm:w-5 sm:h-5 rounded-full border border-accent/40"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}

                  {/* Card */}
                  <motion.div
                    onClick={() => setActiveId(isActive ? null : exp.id)}
                    className={`group relative rounded-2xl border cursor-pointer transition-all duration-500 ${
                      isActive
                        ? "bg-surface-light border-border-hover shadow-[0_0_40px_rgba(255,255,255,0.03)]"
                        : "bg-surface border-border hover:border-border-hover hover:bg-surface-light"
                    }`}
                    layout
                  >
                    {/* Shimmer overlay on hover */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent experience-shimmer" />
                    </div>

                    {/* Card header */}
                    <div className="p-4 sm:p-6 relative">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          {/* Type badge */}
                          <div className="flex items-center gap-2 mb-2 sm:mb-3">
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-light border border-border text-[10px] sm:text-xs text-accent-dim font-mono uppercase tracking-wider">
                              <TypeIcon size={12} />
                              {typeLabel[exp.type]}
                            </div>
                            <span className="text-[10px] sm:text-xs text-muted font-mono">
                              {exp.duration}
                            </span>
                          </div>

                          {/* Role & org */}
                          <h3 className="text-base sm:text-xl font-semibold text-foreground leading-tight">
                            {exp.role}
                          </h3>
                          <p className="text-xs sm:text-sm text-accent-dim mt-0.5 sm:mt-1 font-medium">
                            {exp.organization}
                          </p>
                        </div>

                        {/* Chess piece + expand arrow */}
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="text-accent-muted opacity-60 group-hover:opacity-100 transition-opacity">
                            <PieceIcon size={32} />
                          </div>
                          <motion.div
                            animate={{ rotate: isActive ? 90 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-muted"
                          >
                            <ChevronRight size={16} />
                          </motion.div>
                        </div>
                      </div>

                      {/* Description - always visible */}
                      <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>

                    {/* Expandable section */}
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
                            {/* Highlights */}
                            <div className="mt-4">
                              <span className="text-[10px] sm:text-xs text-muted font-mono uppercase tracking-wider">
                                Key Moves
                              </span>
                              <ul className="mt-2 sm:mt-3 space-y-2">
                                {exp.highlights.map((highlight, hIdx) => (
                                  <motion.li
                                    key={hIdx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: hIdx * 0.1 }}
                                    className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground"
                                  >
                                    <span className="w-1 h-1 rounded-full bg-accent-muted mt-1.5 shrink-0" />
                                    {highlight}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>

                            {/* Tech tags */}
                            {exp.tech && exp.tech.length > 0 && (
                              <div className="mt-4">
                                <span className="text-[10px] sm:text-xs text-muted font-mono uppercase tracking-wider">
                                  Arsenal Used
                                </span>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                                  {exp.tech.map((t, tIdx) => (
                                    <motion.span
                                      key={t}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: tIdx * 0.05 }}
                                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs rounded-lg bg-surface border border-border text-muted-foreground"
                                    >
                                      {t}
                                    </motion.span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Timeline end marker */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="absolute left-4 sm:left-6 -bottom-4 w-4 h-4 sm:w-4 sm:h-4 rounded-full border-2 border-border bg-surface flex items-center justify-center"
          >
            <div className="w-1 h-1 rounded-full bg-muted" />
          </motion.div>
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <p className="text-muted-foreground italic font-serif text-sm sm:text-base max-w-lg mx-auto">
            "The opening defines the strategy. My journey has just begun, and every move counts."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
