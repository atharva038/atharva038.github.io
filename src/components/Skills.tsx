import { motion } from "framer-motion";
import { skillCategories } from "@/data/portfolio-data";

function MarqueeRow({ skills, reverse = false }: { skills: { name: string; icon: string }[]; reverse?: boolean }) {
  const doubled = [...skills, ...skills, ...skills]; // Extra duplication for seamless scrolling
  return (
    <div className="overflow-hidden py-3 sm:py-4 relative">
      {/* Fade Edges */}
      <div className="absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div className={reverse ? "flex marquee-right w-max" : "flex marquee-left w-max"}>
        {doubled.map((skill, i) => {
          return (
            <div
              key={`${skill.name}-${i}`}
              className="flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-2 sm:py-3 mx-2 sm:mx-3 rounded-full glass hover:bg-surface text-sm sm:text-base text-foreground whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_var(--glow-color1)] cursor-default"
            >
              <img src={skill.icon} alt={skill.name} className="w-5 h-5 sm:w-6 sm:h-6 object-contain drop-shadow-md" />
              <span className="font-medium tracking-wide">{skill.name}</span>
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
    <section id="skills" className="py-20 sm:py-32 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="text-electric text-sm font-mono tracking-widest uppercase mb-3 block opacity-80">
            The Pieces
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gradient-heading tracking-tight">
            Skills & Arsenal
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mt-4 max-w-lg mx-auto font-light">
            Every chess piece has its strength. Here are the tools I command on the board.
          </p>
        </motion.div>

      </div>

      {/* Infinite Marquee Slider (Full Width) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16 sm:mb-24 relative left-1/2 -translate-x-1/2 w-screen"
      >
        <MarqueeRow skills={firstHalf} />
        <MarqueeRow skills={secondHalf} reverse />
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {skillCategories.map((category, catIdx) => {
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1, duration: 0.6, type: "spring" }}
                className="p-6 sm:p-8 rounded-3xl group hover:-translate-y-2 transition-all duration-500 relative overflow-hidden flex flex-col backdrop-blur-2xl bg-surface border border-border shadow-[0_8px_32px_var(--glass-shadow)] hover:bg-surface hover:border-border-hover hover:shadow-[0_0_40px_var(--glow-color1)]"
              >
                {/* Glass edge highlights */}
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-surface-light to-transparent" />
                
                {/* Diagonal glassy sheen */}
                <div className="absolute inset-0 bg-gradient-to-br from-surface via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Background ambient hover glow */}
                <div className="absolute -inset-24 bg-gradient-to-br from-electric/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />
                
                <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mb-6 sm:mb-8 text-center sm:text-left relative z-10">
                  {category.title}
                </h3>

                <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 relative z-10">
                  {category.skills.map((skill) => {
                    return (
                      <span
                        key={skill.name}
                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-xl glass bg-surface text-foreground hover:bg-surface hover:text-foreground transition-colors duration-200"
                      >
                        <img src={skill.icon} alt={skill.name} className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
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
