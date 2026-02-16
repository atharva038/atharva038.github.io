import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ChevronDown } from "lucide-react";
import { projects } from "@/data/portfolio-data";

function BrowserFrame({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl bg-[#1a1a1a]">
      {/* Browser top bar */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#0d0d0d] border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-3 sm:px-4 py-1 rounded-md bg-white/[0.06] text-[9px] sm:text-[10px] text-white/30 font-mono max-w-[180px] sm:max-w-[250px] truncate text-center">
            {url}
          </div>
        </div>
        <div className="w-[40px] sm:w-[52px]" />
      </div>
      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
}

export function Component() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrollLocked = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const accumulatedDelta = useRef(0);

  const changeSlide = useCallback((direction: 1 | -1) => {
    if (isScrollLocked.current) return;

    setActiveIndex((prev) => {
      const next = prev + direction;
      if (next < 0 || next >= projects.length) return prev;
      return next;
    });

    isScrollLocked.current = true;
    setTimeout(() => {
      isScrollLocked.current = false;
      accumulatedDelta.current = 0;
    }, 800);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const DELTA_THRESHOLD = 50;

    const handleWheel = (e: WheelEvent) => {
      const rect = container.getBoundingClientRect();
      const isInView = rect.top <= 0 && rect.bottom >= window.innerHeight;

      if (!isInView) return;

      // Allow native scroll at boundaries
      if (activeIndex === 0 && e.deltaY < 0) return;
      if (activeIndex === projects.length - 1 && e.deltaY > 0) return;

      e.preventDefault();

      if (isScrollLocked.current) return;

      accumulatedDelta.current += e.deltaY;

      if (Math.abs(accumulatedDelta.current) >= DELTA_THRESHOLD) {
        const direction = accumulatedDelta.current > 0 ? 1 : -1;
        accumulatedDelta.current = 0;
        changeSlide(direction as 1 | -1);
      }
    };

    // Touch handling for mobile
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const isInView = rect.top <= 0 && rect.bottom >= window.innerHeight;
      if (!isInView) return;

      if (activeIndex === 0 && e.touches[0].clientY > touchStartY) return;
      if (activeIndex === projects.length - 1 && e.touches[0].clientY < touchStartY) return;

      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const isInView = rect.top <= 0 && rect.bottom >= window.innerHeight;
      if (!isInView) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;

      if (Math.abs(diff) > 50) {
        const direction = diff > 0 ? 1 : -1;
        if (activeIndex === 0 && direction === -1) return;
        if (activeIndex === projects.length - 1 && direction === 1) return;
        changeSlide(direction as 1 | -1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [activeIndex, changeSlide]);

  const project = projects[activeIndex];
  const num = (activeIndex + 1).toString().padStart(2, "0");
  const total = projects.length.toString().padStart(2, "0");

  const displayUrl = project.live
    ? project.live.replace(/^https?:\/\//, "")
    : project.title.toLowerCase().replace(/\s+/g, "") + ".local";

  return (
    <div
      ref={containerRef}
      style={{ height: `${projects.length * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-[#0d0d0d]" />

        {/* Section header - top */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-6 sm:top-8 left-0 right-0 z-20 text-center px-4"
        >
          <span className="text-accent-dim text-xs sm:text-sm font-mono tracking-widest uppercase">
            The Board
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mt-2 text-gradient-heading">
            Featured Projects
          </h2>
        </motion.div>

        {/* Main content area */}
        <div className="absolute inset-0 flex items-center justify-center z-10 px-4 sm:px-6 pt-20 sm:pt-16 pb-20 sm:pb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 50, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col lg:flex-row items-center gap-5 sm:gap-8 lg:gap-12 max-w-[1000px] w-full"
            >
              {/* Left: Browser-framed video/image */}
              <div className="w-full lg:w-[55%] shrink-0">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  <BrowserFrame url={displayUrl}>
                    <div className="aspect-[16/10] overflow-hidden">
                      {project.video ? (
                        <video
                          src={project.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-top"
                        />
                      )}
                    </div>
                  </BrowserFrame>
                </motion.div>
              </div>

              {/* Right: Project info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="flex flex-col gap-3 sm:gap-4 lg:w-[45%] w-full"
              >
                {/* Project number & category */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-white/10">
                    {num}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-dim px-2 sm:px-3 py-1 rounded-full border border-white/[0.1] bg-white/[0.03]">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm leading-relaxed text-white/50 max-w-[420px]">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1">
                  {project.tech.map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 + i * 0.05 }}
                      className="text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/60 font-medium"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 mt-2 sm:mt-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-xs sm:text-sm font-medium text-white/80 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/[0.12] hover:border-white/30 hover:bg-white/[0.05] transition-all duration-300"
                    >
                      <Github size={14} className="group-hover:scale-110 transition-transform" />
                      Source
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-xs sm:text-sm font-medium text-black bg-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-white/90 transition-all duration-300 shadow-lg shadow-white/10"
                    >
                      <ExternalLink size={14} className="group-hover:scale-110 transition-transform" />
                      Live Demo
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom bar: progress + counter */}
        <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-10 px-4 sm:px-8">
          <div className="max-w-[1000px] mx-auto flex items-center justify-between">
            {/* Progress bar */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex gap-1.5 sm:gap-2">
                {projects.map((_, i) => (
                  <div
                    key={i}
                    className="relative h-1 rounded-full overflow-hidden transition-all duration-500"
                    style={{ width: i === activeIndex ? "2rem" : "0.5rem" }}
                  >
                    <div className="absolute inset-0 bg-white/10 rounded-full" />
                    {i === activeIndex && (
                      <motion.div
                        layoutId="progress-fill"
                        className="absolute inset-0 bg-white rounded-full"
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    )}
                  </div>
                ))}
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-white/30">
                {num}<span className="text-white/15 mx-1">/</span>{total}
              </span>
            </div>

            {/* Scroll hint */}
            {activeIndex === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="flex items-center gap-2 text-white/25"
              >
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] font-medium hidden sm:inline">
                  Scroll to explore
                </span>
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ChevronDown size={14} />
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
