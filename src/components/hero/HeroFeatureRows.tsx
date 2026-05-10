import { motion } from "framer-motion";
import type { ReactNode } from "react";

export interface HeroFeature {
  num: string;
  icon: ReactNode;
  label: string;
  desc: string;
}

interface HeroFeatureRowsProps {
  features: HeroFeature[];
}

export function HeroFeatureRows({ features }: HeroFeatureRowsProps) {
  return (
    <>
      {features.map((item, i) => (
        <motion.div
          key={item.num}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
          className="flex items-start gap-4 p-5 border-b border-border last:border-b-0 group hover:bg-muted transition-colors duration-200"
        >
          <span className="font-mono text-[10px] text-muted-foreground/50 mt-0.5 shrink-0">
            {item.num}
          </span>
          <span className="font-mono text-sm shrink-0">{item.icon}</span>
          <div>
            <p className="font-mono text-xs font-bold text-foreground uppercase tracking-wider mb-0.5">
              {item.label}
            </p>
            <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">
              {item.desc}
            </p>
          </div>
          <span className="ml-auto font-mono text-xs text-muted-foreground/40 group-hover:text-electric transition-colors duration-200 mt-0.5">
            →
          </span>
        </motion.div>
      ))}
    </>
  );
}
