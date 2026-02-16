import { motion } from "framer-motion";
import { skillCategories } from "@/data/portfolio-data";
import { ChessBishop, ChessRook, ChessQueen, ChessKnight } from "@/components/ui/chess-pieces";

const categoryPieces = [ChessBishop, ChessRook, ChessQueen, ChessKnight];

function MarqueeRow({ skills, reverse = false }: { skills: { name: string; icon: string }[]; reverse?: boolean }) {
  const doubled = [...skills, ...skills];
  return (
    <div className="overflow-hidden py-2 sm:py-3">
      <div className={reverse ? "flex marquee-right w-max" : "flex marquee-left w-max"}>
        {doubled.map((skill, i) => {
          return (
            <div
              key={`${skill.name}-${i}`}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mx-1.5 sm:mx-2 rounded-full bg-surface border border-border text-xs sm:text-sm text-foreground whitespace-nowrap hover:border-border-hover transition-colors"
            >
              <img src={skill.icon} alt={skill.name} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
              {skill.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Skills() {
  const allSkillsWithIcons = skillCategories.flatMap((cat) => cat.skills);
  const firstHalf = allSkillsWithIcons.slice(0, Math.ceil(allSkillsWithIcons.length / 2));
  const secondHalf = allSkillsWithIcons.slice(Math.ceil(allSkillsWithIcons.length / 2));

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-accent-dim text-xs sm:text-sm font-mono tracking-widest uppercase">
            The Pieces
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mt-3 text-gradient-heading">
            Skills & Arsenal
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-3 max-w-md mx-auto">
            Every chess piece has its strength. Here are the tools I command.
          </p>
        </motion.div>

        {/* Infinite Marquee Slider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-16"
        >
          <MarqueeRow skills={firstHalf} />
          <MarqueeRow skills={secondHalf} reverse />
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {skillCategories.map((category, catIdx) => {
            const PieceIcon = categoryPieces[catIdx];
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1 }}
                className="p-4 sm:p-5 rounded-2xl bg-surface border border-border hover:border-border-hover transition-colors"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="text-accent-muted">
                    <PieceIcon size={24} />
                  </div>
                  <h3 className="text-sm sm:text-lg font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {category.skills.map((skill) => {
                    return (
                      <span
                        key={skill.name}
                        className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs rounded-lg bg-surface-light border border-border text-muted-foreground"
                      >
                        <img src={skill.icon} alt={skill.name} className="w-3 h-3 sm:w-4 sm:h-4 object-contain" />
                        {skill.name}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
