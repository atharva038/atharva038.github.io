import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import { personalInfo } from "@/data/portfolio-data";
import MagneticButton from "@/components/ui/MagneticButton";
import { useTheme } from "@/components/ThemeProvider";

const MiniChess = lazy(() => import("@/components/MiniChess"));
const InfinitePlaneBg = lazy(() => import("@/components/ui/infinite-plane"));
const Hero3DChessPiece = lazy(() => import("@/components/ui/Hero3DChessPiece"));

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
  const { theme } = useTheme();
  const isLight = theme === "light";
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
    <section id="hero" className="relative w-full min-h-screen overflow-hidden flex items-center justify-center pt-24 pb-10 sm:pt-28 sm:pb-16 lg:py-20 bg-transparent">
      {/* 3D Infinite Plane Background — dark mode only */}
      {showAnimatedPlane && (
        <div className="hidden dark:block absolute inset-0 pointer-events-none opacity-40">
          <Suspense fallback={null}>
            <InfinitePlaneBg planeHeight={0} speed={0.8} />
          </Suspense>
        </div>
      )}

      {/* ── DEFAULT MODE: BLK/DEV Industrial layout (light + blkdev themes) ── */}
      <div className="dark:hidden relative z-10 px-4 sm:px-8 xl:px-16 w-full max-w-[1700px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* ── Top label row ── */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              // Built for impact
            </span>
            <span
              className="font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1 border font-semibold"
              style={isLight
                ? { backgroundColor: "#F5D000", borderColor: "#F5D000", color: "#000" }
                : { borderColor: "#F5D000", color: "#F5D000" }
              }
            >
              ● Available for work
            </span>
          </div>

          {/* ── Hero grid ── */}
          <div className="grid lg:grid-cols-[minmax(0,1.55fr)_minmax(340px,1fr)] xl:grid-cols-[minmax(0,1.65fr)_minmax(420px,1fr)] gap-0 border border-border">
            {/* Left: Text content */}
            <div className="p-7 sm:p-10 lg:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border">
              {/* Profile pill */}
              <div className="flex items-center gap-4 mb-8 sm:mb-10">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 overflow-hidden border border-border"
                >
                  <img
                    src="/me.jpeg"
                    alt={personalInfo.name}
                    className="w-full h-full object-cover grayscale"
                  />
                </motion.div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-0.5">Developer</p>
                  <p className="font-mono text-xs font-semibold text-foreground">{personalInfo.title}</p>
                </div>
              </div>

              {/* Big name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[clamp(3rem,8vw,7.5rem)] font-serif font-black text-foreground leading-[0.88] tracking-tighter mb-8 sm:mb-10 uppercase"
              >
                {personalInfo.name.split(" ").map((word, i) => (
                  <span key={i} className="block">{word}_</span>
                ))}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-sm sm:text-base text-muted-foreground max-w-lg font-light leading-relaxed mb-10"
              >
                {personalInfo.subtitle}
              </motion.p>

              {/* Terminal command row */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="flex items-center gap-0 mb-10 border border-border overflow-hidden max-w-md"
              >
                <div className="flex-1 px-4 py-3 font-mono text-xs text-muted-foreground bg-surface">
                  $ contact --hire atharva
                </div>
                <a
                  href="#contact"
                  className="flex items-center justify-center px-5 py-3 font-mono text-xs font-bold text-black transition-colors duration-200"
                  style={{ backgroundColor: "#F5D000", minWidth: "3rem" }}
                  aria-label="Go to contact"
                >
                  →
                </a>
              </motion.div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a
                  href="#projects"
                  className="px-7 py-3 text-sm font-bold uppercase tracking-widest transition-all duration-200 border"
                  style={{
                    backgroundColor: "#F5D000",
                    borderColor: "#F5D000",
                    color: "#000",
                  }}
                >
                  View Work →
                </a>
                <MagneticButton
                  as="a"
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 border border-border text-foreground flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:border-border-hover transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <Github size={16} /> GitHub
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 border border-border text-foreground flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:border-border-hover transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} /> LinkedIn
                </MagneticButton>
              </div>
            </div>

            {/* Right: Chess board + feature list */}
            <div className="flex flex-col">
              {/* Chess panel */}
              <div className="p-5 sm:p-7 flex flex-col border-b border-border">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
                  ◆ Play Me In Chess
                </p>
                <div className="flex items-center">
                  <Suspense fallback={<ChessFallback />}>
                    <MiniChess minBoardWidth={220} maxBoardWidth={500} mobileMaxBoardWidth={280} />
                  </Suspense>
                </div>
              </div>

              {/* Numbered feature rows — BLK/DEV style */}
              {[
                { num: "01", icon: "⚡", label: "Full-Stack", desc: "React, Node, Python — end-to-end." },
                { num: "02", icon: "🧠", label: "AI / ML", desc: "LLMs, computer vision, real solutions." },
                { num: "03", icon: "</>", label: "Open Source", desc: "Contributing, shipping, collaborating." },
              ].map((item, i) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-4 p-5 border-b border-border last:border-b-0 group hover:bg-muted transition-colors duration-200"
                >
                  <span className="font-mono text-[10px] text-muted-foreground/50 mt-0.5 shrink-0">{item.num}</span>
                  <span className="font-mono text-sm shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-mono text-xs font-bold text-foreground uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                  <span className="ml-auto font-mono text-xs text-muted-foreground/40 group-hover:text-electric transition-colors duration-200 mt-0.5">→</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Status bar ── */}
          <div className="flex items-center justify-between px-5 sm:px-8 py-2.5 border-x border-b border-border font-mono text-[10px] uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: "#4ade80" }}
              />
              Status: All Systems Operational
            </div>
            <div className="hidden sm:flex gap-8 text-muted-foreground/60">
              <span>Full-Stack</span>
              <span>AI/ML</span>
              <span>Chess</span>
            </div>
            <span className="text-muted-foreground/60">© {new Date().getFullYear()}</span>
          </div>
        </motion.div>
      </div>


      {/* ── DARK MODE: Glassmorphic panel (original) ── */}
      <div className="hidden dark:block relative z-10 px-4 sm:px-6 xl:px-10 2xl:px-16 w-full max-w-[1700px]">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 lg:p-12 border border-border shadow-2xl relative overflow-hidden"
        >
          {/* Internal Glow Effect (dark mode only) */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-electric/20 rounded-full blur-[80px]" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />

          <div className="relative grid lg:grid-cols-[minmax(0,1.5fr)_minmax(360px,1fr)] xl:grid-cols-[minmax(0,1.65fr)_minmax(440px,1fr)] gap-6 sm:gap-8 lg:gap-10 xl:gap-14 items-center">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex items-center gap-6 sm:gap-10 mb-5 sm:mb-8">
                {/* Profile Photo */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                  animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 group shrink-0"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-electric to-purple-500 opacity-40 blur-[24px] group-hover:opacity-80 group-hover:scale-110 transition-all duration-700" />
                  <div className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-b from-white/30 to-white/5 shadow-2xl backdrop-blur-md overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-500">
                    <img
                      src="/me.jpeg"
                      alt={personalInfo.name}
                      className="w-full h-full object-cover rounded-[calc(100%-3px)] border border-white/5"
                    />
                  </div>
                </motion.div>

                {/* 3D Chess Piece */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                  animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 group hidden sm:block shrink-0"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-electric to-purple-500 opacity-30 blur-[40px] group-hover:opacity-60 group-hover:scale-110 transition-all duration-700" />
                  <Suspense fallback={<div className="w-full h-full rounded-full bg-white/5 animate-pulse" />}>
                    <Hero3DChessPiece />
                  </Suspense>
                </motion.div>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl 2xl:text-8xl font-serif font-bold text-gradient-heading leading-tight tracking-tight">
                {personalInfo.name}
              </h1>

              <p className="mt-3 sm:mt-6 text-sm sm:text-xl text-muted-foreground max-w-2xl font-light">
                <span className="text-foreground font-medium">{personalInfo.title}</span> &bull; {personalInfo.subtitle}
              </p>

              <div className="mt-6 sm:mt-10 flex flex-wrap gap-3 sm:gap-5 justify-center lg:justify-start">
                <MagneticButton
                  as="a"
                  href="#projects"
                  className="px-5 sm:px-8 py-2.5 sm:py-4 text-sm sm:text-base bg-white text-black font-semibold rounded-xl transition-transform hover:scale-105 active:scale-95 shadow-lg tracking-wide flex items-center justify-center"
                >
                  View My Work
                </MagneticButton>
                <div className="flex gap-3">
                  <MagneticButton
                    as="a"
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button p-2.5 sm:p-4 text-foreground rounded-xl flex items-center justify-center hover:text-foreground"
                    aria-label="GitHub"
                  >
                    <Github size={22} />
                  </MagneticButton>
                  <MagneticButton
                    as="a"
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button p-2.5 sm:p-4 text-foreground rounded-xl flex items-center justify-center hover:text-electric"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={22} />
                  </MagneticButton>
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
        className="absolute bottom-6 sm:bottom-10 text-muted-foreground/60 hover:text-foreground transition-colors bounce-arrow z-10 p-2 dark:glass-button rounded-full border border-foreground dark:border-transparent"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  );
}


