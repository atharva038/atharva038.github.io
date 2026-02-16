import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import InfinitePlaneBg from "@/components/ui/infinite-plane";
import { ChessKing } from "@/components/ui/chess-pieces";
import { personalInfo } from "@/data/portfolio-data";

export default function Hero() {
  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        <InfinitePlaneBg planeHeight={0} speed={0.8} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <motion.div
            className="mb-4 sm:mb-6 text-white/80"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChessKing size={48} />
          </motion.div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold text-gradient-heading leading-tight">
            {personalInfo.name}
          </h1>

          <p className="mt-3 sm:mt-4 text-sm sm:text-lg md:text-xl text-muted-foreground max-w-xl">
            {personalInfo.title} &bull; {personalInfo.subtitle}
          </p>

          <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4 justify-center">
            <a
              href="#projects"
              className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-white text-background font-semibold rounded-lg hover:bg-accent-muted transition-colors"
            >
              View My Moves
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base border border-border text-foreground rounded-lg hover:border-accent-muted hover:text-white transition-colors flex items-center gap-2"
            >
              <Github size={16} />
              GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base border border-border text-foreground rounded-lg hover:border-accent-muted hover:text-white transition-colors flex items-center gap-2"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          </div>
        </motion.div>

        <motion.a
          href="#about"
          className="absolute bottom-8 sm:bottom-10 text-muted-foreground hover:text-foreground transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={22} />
        </motion.a>
      </div>
    </section>
  );
}
