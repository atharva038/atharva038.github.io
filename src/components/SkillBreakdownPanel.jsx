import { motion } from 'framer-motion';

const TechBadge = ({ tech }) => (
  <span className="px-2 py-1 text-xs font-mono bg-[#d4cfc5] dark:bg-[#262626] text-[#6b5d52] dark:text-[#737373] rounded">
    {tech}
  </span>
);

const SkillBreakdownPanel = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-sm font-mono text-[#6b5d52] dark:text-[#737373] uppercase tracking-wider">
        Skills in this capability
      </h2>
      
      {skills.map((skill) => (
        <div key={skill.id} className="border-l-2 border-blue-500/30 pl-4">
          <h3 className="text-lg font-medium text-[#0a0a0a] dark:text-[#e5e5e5] mb-3">
            {skill.name}
          </h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {skill.tech.map((tech) => (
              <TechBadge key={tech} tech={tech} />
            ))}
          </div>
          
          <ul className="space-y-2">
            {skill.responsibilities.map((responsibility, idx) => (
              <li key={idx} className="text-sm text-[#6b5d52] dark:text-[#737373] flex items-start">
                <span className="text-blue-500 mr-2 mt-1">→</span>
                <span>{responsibility}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </motion.div>
  );
};

export default SkillBreakdownPanel;
