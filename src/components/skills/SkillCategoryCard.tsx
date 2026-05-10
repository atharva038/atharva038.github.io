import { motion } from "framer-motion";
import type { SkillCategory } from "@/data/portfolio-data";

interface SkillCategoryCardProps {
  category: SkillCategory;
  index: number;
}

export function SkillCategoryCard({ category, index }: SkillCategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
      className="p-6 sm:p-8 rounded-3xl group hover:-translate-y-2 transition-all duration-500 relative overflow-hidden flex flex-col backdrop-blur-2xl bg-surface border border-border shadow-[0_8px_32px_var(--glass-shadow)] hover:bg-surface hover:border-border-hover hover:shadow-[0_0_40px_var(--glow-color1)]"
    >
      <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />
      <div className="hidden dark:block absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-surface-light to-transparent" />
      <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-surface via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="hidden dark:block absolute -inset-24 bg-gradient-to-br from-electric/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />

      <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mb-6 sm:mb-8 text-center sm:text-left relative z-10">
        {category.title}
      </h3>

      <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 relative z-10">
        {category.skills.map((skill) => (
          <span
            key={skill.name}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-xl glass bg-surface text-foreground hover:bg-surface hover:text-foreground transition-colors duration-200"
          >
            <img
              src={skill.icon}
              alt={skill.name}
              width={20}
              height={20}
              loading="lazy"
              decoding="async"
              className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
            />
            {skill.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
