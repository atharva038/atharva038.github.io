import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import InfinitePlaneBg from "@/components/ui/infinite-plane";
import { personalInfo } from "@/data/portfolio-data";
 
export default function Hero() {
  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* 3D Infinite Plane Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <InfinitePlaneBg planeHeight={0} speed={0.8} />
      </div>

      {/* Main Glass Panel */}
      <div className="relative z-10 px-4 sm:px-6 w-full max-w-4xl mt-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel rounded-[2rem] p-8 sm:p-14 border border-border shadow-2xl relative overflow-hidden"
        >
          {/* Internal Glow Effect */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-electric/20 rounded-full blur-[80px]" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />

          <div className="relative flex flex-col items-center text-center">

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-gradient-heading leading-tight tracking-tight">
              {personalInfo.name}
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-xl text-muted-foreground max-w-2xl font-light">
              <span className="text-foreground font-medium">{personalInfo.title}</span> &bull; {personalInfo.subtitle}
            </p>

            <div className="mt-8 sm:mt-10 flex flex-wrap gap-4 sm:gap-5 justify-center">
              <a
                href="#projects"
                className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-white text-black font-semibold rounded-xl transition-transform hover:scale-105 active:scale-95 shadow-lg tracking-wide"
              >
                View My Work
              </a>
              <div className="flex gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button p-3 sm:p-4 text-foreground rounded-xl flex items-center justify-center hover:text-foreground"
                  aria-label="GitHub"
                >
                  <Github size={22} />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button p-3 sm:p-4 text-foreground rounded-xl flex items-center justify-center hover:text-electric"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 sm:bottom-10 text-muted-foreground/60 hover:text-foreground transition-colors bounce-arrow z-10 p-2 glass-button rounded-full"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  );
}
