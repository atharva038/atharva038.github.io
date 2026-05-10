import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className = "text-center mb-16 sm:mb-24",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={className}
    >
      <span className="text-electric text-sm font-mono tracking-widest uppercase mb-3 block opacity-80">
        {eyebrow}
      </span>
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gradient-heading tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-muted-foreground mt-4 max-w-lg mx-auto font-light leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
