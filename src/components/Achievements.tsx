import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Star, Flame, Crown, Zap } from "lucide-react";
import { achievements } from "@/data/portfolio-data";

const iconMap = {
  trophy: Trophy,
  medal: Medal,
  star: Star,
  flame: Flame,
  crown: Crown,
  zap: Zap,
} as const;

const glowColors: Record<string, string> = {
  trophy: "from-amber-500/20 to-yellow-500/5",
  medal: "from-slate-300/20 to-slate-400/5",
  star: "from-violet-400/20 to-purple-500/5",
  flame: "from-orange-500/20 to-red-500/5",
  crown: "from-yellow-400/20 to-amber-500/5",
  zap: "from-cyan-400/20 to-blue-500/5",
};

const accentColors: Record<string, string> = {
  trophy: "text-amber-400",
  medal: "text-slate-300",
  star: "text-violet-400",
  flame: "text-orange-400",
  crown: "text-yellow-400",
  zap: "text-cyan-400",
};

const borderAccent: Record<string, string> = {
  trophy: "group-hover:border-amber-500/30",
  medal: "group-hover:border-slate-400/30",
  star: "group-hover:border-violet-500/30",
  flame: "group-hover:border-orange-500/30",
  crown: "group-hover:border-yellow-500/30",
  zap: "group-hover:border-cyan-500/30",
};

export default function Achievements() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="achievements" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle radial background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-white/[0.02] to-transparent rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-accent-dim text-xs sm:text-sm font-mono tracking-widest uppercase">
            The Trophy Room
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mt-3 text-gradient-heading">
            Achievements
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-3 max-w-md mx-auto">
            Checkmates, victories, and milestones earned along the way.
          </p>
        </motion.div>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {achievements.map((achievement, index) => {
            const Icon = iconMap[achievement.icon];
            const isHovered = hoveredId === achievement.id;

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoveredId(achievement.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative"
              >
                <div
                  className={`relative h-full rounded-2xl border border-border bg-surface p-5 sm:p-6 transition-all duration-500 cursor-default overflow-hidden ${borderAccent[achievement.icon]} ${
                    isHovered ? "bg-surface-light" : ""
                  }`}
                >
                  {/* Glow background on hover */}
                  <div
                    className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-radial ${glowColors[achievement.icon]} blur-3xl transition-opacity duration-700 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* Top row: icon + year */}
                  <div className="relative flex items-center justify-between mb-4">
                    <motion.div
                      animate={isHovered ? { scale: 1.15, rotate: [0, -8, 8, 0] } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5 }}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-surface-light border border-border flex items-center justify-center ${accentColors[achievement.icon]} transition-colors`}
                    >
                      <Icon size={20} className="sm:w-6 sm:h-6" />
                    </motion.div>

                    <div className="flex items-center gap-2">
                      {achievement.rank && (
                        <span className={`text-[10px] sm:text-xs font-mono font-semibold px-2 py-0.5 rounded-full border border-border ${accentColors[achievement.icon]}`}>
                          {achievement.rank}
                        </span>
                      )}
                      <span className="text-[10px] sm:text-xs text-muted font-mono">
                        {achievement.year}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="relative text-sm sm:text-base font-semibold text-foreground leading-tight mb-1.5">
                    {achievement.title}
                  </h3>

                  {/* Event/Org */}
                  <p className="relative text-[10px] sm:text-xs text-accent-dim font-medium mb-3">
                    {achievement.event}
                  </p>

                  {/* Description — reveals on hover */}
                  <AnimatePresence>
                    {isHovered ? (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative text-xs sm:text-sm text-muted-foreground leading-relaxed overflow-hidden"
                      >
                        {achievement.description}
                      </motion.p>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative flex items-center gap-1 text-[10px] sm:text-xs text-muted"
                      >
                        <span className="w-4 h-px bg-muted" />
                        Hover to reveal
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${glowColors[achievement.icon].replace("/20", "/60").replace("/5", "/20")}`}
                      initial={{ x: "-100%" }}
                      animate={isHovered ? { x: "0%" } : { x: "-100%" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Counter bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
        >
          {[
            { label: "Milestones", value: achievements.length, icon: Star },
            { label: "Apps Shipped", value: "3+", icon: Zap },
            { label: "Chess Games", value: "500+", icon: Crown },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 sm:gap-3">
              <item.icon size={16} className="text-accent-dim" />
              <div className="text-center">
                <p className="text-lg sm:text-xl font-bold text-foreground">{item.value}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">{item.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
