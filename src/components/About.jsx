import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="max-w-2xl mx-auto py-16 sm:py-20"
    >
      {/* Section Title */}
      <h2 className="text-xs sm:text-sm font-mono text-[#6b5d52] dark:text-[#737373] uppercase tracking-wider mb-8 text-center">
        About the builder
      </h2>
      
      {/* Photo and Name */}
      <div className="flex flex-col items-center mb-8">
        {/* Profile Photo Placeholder */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#d4cfc5] dark:bg-[#262626] mb-4 flex items-center justify-center overflow-hidden border-2 border-[#b8b0a3] dark:border-[#404040]">
          {/* Replace profile.svg with your actual photo (profile.jpg, profile.png, etc.) */}
          <img 
            src="/effective-portfolio/profile.svg" 
            alt="Atharva" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="hidden w-full h-full items-center justify-center text-4xl sm:text-5xl">
            👨‍💻
          </div>
        </div>
        
        {/* Name */}
        <h3 className="text-2xl sm:text-3xl font-semibold text-[#0a0a0a] dark:text-[#e5e5e5] mb-2">
          Atharva
        </h3>
        
        {/* Title */}
        <p className="text-sm sm:text-base text-[#6b5d52] dark:text-[#737373] font-mono">
          Full-Stack Developer & System Builder
        </p>
      </div>
      
      {/* Bio */}
      <div className="space-y-4 text-center px-4">
        <p className="text-base sm:text-lg text-[#0a0a0a] dark:text-[#e5e5e5] leading-relaxed">
          I build systems that scale and ship products that solve real problems.
        </p>
        <p className="text-base sm:text-lg text-[#0a0a0a] dark:text-[#e5e5e5] leading-relaxed">
          My focus is on clean architecture, practical execution, and measurable outcomes — not buzzwords or frameworks for their own sake.
        </p>
        <p className="text-base sm:text-lg text-[#0a0a0a] dark:text-[#e5e5e5] leading-relaxed">
          Each project here represents working software in production, not demos or side experiments.
        </p>
      </div>
    </motion.section>
  );
};

export default About;
