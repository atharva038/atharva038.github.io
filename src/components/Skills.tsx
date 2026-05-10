import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "@/data/portfolio-data";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SkillCategoryCard } from "@/components/skills/SkillCategoryCard";
import { SkillsMarqueeRow } from "@/components/skills/SkillsMarqueeRow";

const Skills3DModel = lazy(() =>
  import("@/components/ui/Section3DModels").then((module) => ({
    default: module.Skills3DModel,
  })),
);

export default function Skills() {
  const allSkillsWithIcons = skillCategories.flatMap((cat) => cat.skills);
  const firstHalf = allSkillsWithIcons.slice(0, Math.ceil(allSkillsWithIcons.length / 2));
  const secondHalf = allSkillsWithIcons.slice(Math.ceil(allSkillsWithIcons.length / 2));

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
      <Suspense fallback={null}>
        <Skills3DModel />
      </Suspense>

      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="The Pieces"
          title="Skills & Arsenal"
          description="Every chess piece has its strength. Here are the tools I command on the board."
          className="text-center mb-16 sm:mb-20"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-16 sm:mb-24 relative left-1/2 -translate-x-1/2 w-screen"
      >
        <SkillsMarqueeRow skills={firstHalf} />
        <SkillsMarqueeRow skills={secondHalf} reverse />
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {skillCategories.map((category, catIdx) => (
            <SkillCategoryCard
              key={category.title}
              category={category}
              index={catIdx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
