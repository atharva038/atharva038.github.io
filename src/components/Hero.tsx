import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import { personalInfo } from "@/data/portfolio-data";

const MiniChess = lazy(() => import("@/components/MiniChess"));
const InfinitePlaneBg = lazy(() => import("@/components/ui/infinite-plane"));

function ChessFallback() {
  return (
    <div className="glass-panel p-5 sm:p-6 rounded-3xl min-h-[430px] animate-pulse">
      <div className="h-6 w-44 rounded-md bg-foreground/10 mb-4" />
      <div className="aspect-square w-full rounded-2xl border border-border bg-surface/30" />
      <div className="h-4 w-40 rounded-md bg-foreground/10 mt-4" />
      <div className="h-4 w-56 rounded-md bg-foreground/10 mt-2" />
    </div>
  );
}
 
export default function Hero() {
  const [showAnimatedPlane, setShowAnimatedPlane] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px), (prefers-reduced-motion: reduce)");

    const updatePlaneVisibility = () => {
      setShowAnimatedPlane(!mediaQuery.matches);
    };

    updatePlaneVisibility();
    mediaQuery.addEventListener("change", updatePlaneVisibility);

    return () => mediaQuery.removeEventListener("change", updatePlaneVisibility);
  }, []);

  return (
    <section id="hero" className="relative w-full min-h-screen overflow-hidden flex items-center justify-center pt-24 pb-10 sm:pt-28 sm:pb-16 lg:py-20">
      {/* 3D Infinite Plane Background */}
      {showAnimatedPlane && (
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <Suspense fallback={null}>
            <InfinitePlaneBg planeHeight={0} speed={0.8} />
          </Suspense>
        </div>
      )}

      {/* Main Glass Panel */}
      <div className="relative z-10 px-4 sm:px-6 xl:px-10 2xl:px-16 w-full max-w-[1700px]">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 lg:p-12 border border-border shadow-2xl relative overflow-hidden"
        >
          {/* Internal Glow Effect */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-electric/20 rounded-full blur-[80px]" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />

            <div className="relative grid lg:grid-cols-[minmax(0,1.5fr)_minmax(360px,1fr)] xl:grid-cols-[minmax(0,1.65fr)_minmax(440px,1fr)] gap-6 sm:gap-8 lg:gap-10 xl:gap-14 items-center">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Profile Photo */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 mb-5 sm:mb-8 group"
              >
                {/* Glowing Aura Behind Photo */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-electric to-purple-500 opacity-40 blur-[24px] group-hover:opacity-80 group-hover:scale-110 transition-all duration-700" />

                {/* Glassmorphic Image Container */}
                <div className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-b from-white/30 to-white/5 shadow-2xl backdrop-blur-md overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-500">
                  <img
                    src="/me.jpeg"
                    alt={personalInfo.name}
                    className="w-full h-full object-cover rounded-[calc(100%-3px)] border border-black/10 dark:border-white/5"
                  />
                </div>
              </motion.div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl 2xl:text-8xl font-serif font-bold text-gradient-heading leading-tight tracking-tight">
                {personalInfo.name}
              </h1>

              <p className="mt-3 sm:mt-6 text-sm sm:text-xl text-muted-foreground max-w-2xl font-light">
                <span className="text-foreground font-medium">{personalInfo.title}</span> &bull; {personalInfo.subtitle}
              </p>

              <div className="mt-6 sm:mt-10 flex flex-wrap gap-3 sm:gap-5 justify-center lg:justify-start">
                <a
                  href="#projects"
                  className="px-5 sm:px-8 py-2.5 sm:py-4 text-sm sm:text-base bg-white text-black font-semibold rounded-xl transition-transform hover:scale-105 active:scale-95 shadow-lg tracking-wide"
                >
                  View My Work
                </a>
                <div className="flex gap-3">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button p-2.5 sm:p-4 text-foreground rounded-xl flex items-center justify-center hover:text-foreground"
                    aria-label="GitHub"
                  >
                    <Github size={22} />
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button p-2.5 sm:p-4 text-foreground rounded-xl flex items-center justify-center hover:text-electric"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={22} />
                  </a>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
              className="w-full max-w-sm sm:max-w-md xl:max-w-xl 2xl:max-w-[640px] mx-auto lg:mx-0 lg:justify-self-end"
            >
              <p className="inline-flex items-center rounded-full px-3 py-1 text-xs tracking-wide uppercase border border-border bg-surface/60 text-muted-foreground mb-3">
                Play Me In Chess
              </p>
              <Suspense fallback={<ChessFallback />}>
                <MiniChess minBoardWidth={240} maxBoardWidth={640} mobileMaxBoardWidth={300} />
              </Suspense>
            </motion.div>
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
