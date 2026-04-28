import { lazy, Suspense, useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ThemeProvider } from "@/components/ThemeProvider";
import GlobalRipple from "@/components/ui/global-ripple";
import TerminalView from "@/components/TerminalView";

const About = lazy(() => import("@/components/About"));
const Skills = lazy(() => import("@/components/Skills"));
const Experience = lazy(() => import("@/components/Experience"));
const Projects = lazy(() => import("@/components/Projects"));
const Achievements = lazy(() => import("@/components/Achievements"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

function SectionFallback() {
  return <div className="h-24 sm:h-32" aria-hidden="true" />;
}

// Cinematic Dissolve Overlay Component
function PageTransitionOverlay({
  isActive,
  onCovered
}: {
  isActive: boolean,
  onCovered: () => void
}) {
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(onCovered, 600); // Wait 600ms for full blur fade-in
      return () => clearTimeout(timer);
    }
  }, [isActive, onCovered]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none bg-background/60 backdrop-blur-[50px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.32, 0, 0.67, 0] } }}
        >
          {/* Ambient central glow for the "birth" effect */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }}
            exit={{ scale: 1.5, opacity: 0, transition: { duration: 0.8, ease: "easeIn" } }}
            className="w-[50vw] max-w-[500px] aspect-square bg-electric/20 rounded-full blur-[100px]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function App() {
  const [enableEffects, setEnableEffects] = useState(false);
  const [isTerminalMode, setIsTerminalMode] = useState(false);

  // Transition state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetHash, setTargetHash] = useState("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px), (prefers-reduced-motion: reduce)");
    const updateEffects = () => setEnableEffects(!mediaQuery.matches);
    updateEffects();
    mediaQuery.addEventListener("change", updateEffects);
    return () => mediaQuery.removeEventListener("change", updateEffects);
  }, []);

  const handleNavClick = (hash: string) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.location.hash = hash;
      return;
    }
    setTargetHash(hash);
    setIsTransitioning(true);
  };

  const handleTransitionCovered = () => {
    const element = document.querySelector(targetHash);
    if (element) {
      const offset = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: offset, behavior: 'instant' });
      window.history.pushState(null, '', targetHash);
    }
    setIsTransitioning(false);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <PageTransitionOverlay
        isActive={isTransitioning}
        onCovered={handleTransitionCovered}
      />

      {!isTerminalMode && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-electric origin-left z-[100]"
          style={{ scaleX }}
        />
      )}
      {enableEffects && <GlobalRipple />}
      <div className="relative min-h-screen text-foreground overflow-x-hidden selection:bg-electric selection:text-background">
        <div className="ambient-bg">
          <div className="ambient-orb orb-1"></div>
          <div className="ambient-orb orb-2"></div>
          <div className="ambient-orb orb-3"></div>
        </div>

        <div className="relative z-10 font-sans">
          <Navbar
            isTerminalMode={isTerminalMode}
            setIsTerminalMode={setIsTerminalMode}
            onNavClick={handleNavClick}
          />
          {isTerminalMode ? (
            <Suspense fallback={<SectionFallback />}>
              <TerminalView />
            </Suspense>
          ) : (
            <>
              <Hero />
              <Suspense fallback={<SectionFallback />}>
                <About />
                <Skills />
                <Experience />
                <Projects />
                <Achievements />
                <Contact />
                <Footer />
              </Suspense>
            </>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
