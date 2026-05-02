import { lazy, Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { experiences } from "@/data/portfolio-data";
import {
  ChessKing,
  ChessQueen,
  ChessRook,
  ChessKnight,
  ChessBishop,
  ChessPawn,
} from "@/components/ui/chess-pieces";

const Experience3DModel = lazy(() =>
  import("@/components/ui/Section3DModels").then((module) => ({
    default: module.Experience3DModel,
  })),
);

const pieceMap = {
  king: ChessKing,
  queen: ChessQueen,
  rook: ChessRook,
  knight: ChessKnight,
  bishop: ChessBishop,
  pawn: ChessPawn,
} as const;

const typeLabel = {
  work: "Career Move",
  education: "Foundation",
  achievement: "Mastery",
} as const;

export default function Experience() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Ambient background glow (dark mode only) */}
      <div className="hidden dark:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-surface blur-[120px] pointer-events-none" />
      <Suspense fallback={null}>
        <Experience3DModel />
      </Suspense>

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-24"
        >
          <span className="text-electric text-sm font-mono tracking-widest uppercase mb-3 block opacity-80">
            The Game Record
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-gradient-heading">
            Experience
          </h2>
          <p className="text-base sm:text-lg font-light text-muted-foreground mt-4 max-w-lg mx-auto">
            Every grandmaster's journey is recorded move by move. Here's mine.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-surface" />

          {/* Animated progress line */}
          <motion.div
            className="absolute left-6 sm:left-8 top-0 w-px bg-electric dark:bg-gradient-to-b dark:from-electric dark:to-transparent shadow-[0_0_10px_rgba(56,189,248,0.5)]"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <div className="space-y-4 sm:space-y-6">
            {experiences.map((exp, index) => {
              const PieceIcon = pieceMap[exp.piece];
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
                    className={`absolute left-3.5 sm:left-5.5 top-5 sm:top-6 w-5 h-5 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center cursor-pointer z-10 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] before:absolute before:inset-[-5px] before:rounded-full before:border before:border-border/45 before:rotate-45 before:transition-colors ${
                      isActive
                        ? "border-electric bg-electric/20 shadow-[0_0_15px_var(--glow-color1),inset_0_1px_0_rgba(255,255,255,0.22)] scale-125 before:border-electric/50"
                        : "border-border-hover bg-background hover:border-electric/50 hover:bg-electric/10 hover:shadow-[0_0_10px_var(--glow-color1),inset_0_1px_0_rgba(255,255,255,0.18)] hover:scale-110 before:border-border/45"
                    }`}
                    onClick={() => setActiveId(isActive ? null : exp.id)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        isActive ? "bg-electric" : "bg-surface-light"
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
                  <div
                    onClick={() => setActiveId(isActive ? null : exp.id)}
                    className={`group relative rounded-3xl border cursor-pointer transition-all duration-300 overflow-hidden ${
                      isActive
                        ? "glass-panel border-electric/30 shadow-[0_4px_30px_rgba(56,189,248,0.15)]"
                        : "glass border-border hover:border-border hover:bg-surface"
                    }`}
                  >
                    {/* Shimmer overlay on hover */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                      <div className="hidden dark:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-surface-light to-transparent experience-shimmer" />
                    </div>

                    {/* Massive Background Chess Piece Watermark */}
                    <div className="absolute -right-16 -bottom-16 opacity-5 group-hover:opacity-10 transition-all duration-700 pointer-events-none transform group-hover:scale-110 group-hover:-rotate-6 z-0">
                      <PieceIcon size={240} />
                    </div>

                    {/* Card header */}
                    <div className="p-4 sm:p-6 relative z-10">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          {/* Type badge */}
                          <div className="flex items-center gap-2 mb-2 sm:mb-3">
                            <div className="px-3 py-1 rounded-full bg-surface border border-border text-[10px] sm:text-xs text-electric font-mono uppercase tracking-wider">
                              {typeLabel[exp.type]}
                            </div>
                            <span className="text-[10px] sm:text-xs text-muted-foreground font-mono">
                              {exp.duration}
                            </span>
                          </div>

                          {/* Role & org */}
                          <h3 className="text-base sm:text-xl font-bold text-foreground leading-tight tracking-tight">
                            {exp.role}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1 font-medium">
                            {exp.organization}
                          </p>
                        </div>

                        {/* expand arrow */}
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
                  </div>
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
