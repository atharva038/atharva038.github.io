import { motion } from "framer-motion";
import { skillCategories, allSkills } from "@/data/portfolio-data";
import { ChessBishop, ChessRook, ChessQueen, ChessKnight } from "@/components/ui/chess-pieces";

const categoryPieces = [ChessBishop, ChessRook, ChessQueen, ChessKnight];

function MarqueeRow({ skills, reverse = false }: { skills: { name: string; icon: string }[]; reverse?: boolean }) {
  const doubled = [...skills, ...skills];
  return (
    <div className="overflow-hidden py-3">
      <div className={reverse ? "flex marquee-right w-max" : "flex marquee-left w-max"}>
        {doubled.map((skill, i) => {
          return (
            <div
              key={`${skill.name}-${i}`}
              className="flex items-center gap-2 px-4 py-2 mx-2 rounded-full bg-surface border border-border text-sm text-foreground whitespace-nowrap hover:border-border-hover transition-colors"
            >
              <img src={skill.icon} alt={skill.name} className="w-6 h-6 object-contain" />
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
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-dim text-sm font-mono tracking-widest uppercase">
            The Pieces
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-3 text-gradient-heading">
            Skills & Arsenal
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            Every chess piece has its strength. Here are the tools I command.
          </p>
        </motion.div>

        {/* Infinite Marquee Slider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <MarqueeRow skills={firstHalf} />
          <MarqueeRow skills={secondHalf} reverse />
        </motion.div>

        {/* Category Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, catIdx) => {
            const PieceIcon = categoryPieces[catIdx];
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1 }}
                className="p-5 rounded-2xl bg-surface border border-border hover:border-border-hover transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-accent-muted">
                    <PieceIcon size={28} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    return (
                      <span
                        key={skill.name}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-surface-light border border-border text-muted-foreground"
                      >
                        <img src={skill.icon} alt={skill.name} className="w-4 h-4 object-contain" />
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
