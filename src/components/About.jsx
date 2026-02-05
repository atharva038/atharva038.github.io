import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="max-w-xl mx-auto text-center py-16"
    >
      <h2 className="text-sm font-mono text-[#6b5d52] dark:text-[#737373] uppercase tracking-wider mb-6">
        About the builder
      </h2>
      
      <div className="space-y-4 text-[#0a0a0a] dark:text-[#e5e5e5] leading-relaxed">
        <p>
          I build systems that scale and ship products that solve real problems.
        </p>
        <p>
          My focus is on clean architecture, practical execution, and measurable outcomes — not buzzwords or frameworks for their own sake.
        </p>
        <p>
          Each project here represents working software in production, not demos or side experiments.
        </p>
      </div>
    </motion.section>
  );
};

export default About;
