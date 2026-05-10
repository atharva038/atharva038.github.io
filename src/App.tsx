import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ThemeProvider } from "@/components/ThemeProvider";
import TerminalView from "@/components/TerminalView";
import SpotlightBackground from "@/components/SpotlightBackground";
import LazyOnVisible from "@/components/LazyOnVisible";
import ThemeFavicon from "@/components/ThemeFavicon";
import SmoothScroll from "@/components/SmoothScroll";

const About = lazy(() => import("@/components/About"));
const Skills = lazy(() => import("@/components/Skills"));
const Experience = lazy(() => import("@/components/Experience"));
const Projects = lazy(() => import("@/components/Projects"));
const Achievements = lazy(() => import("@/components/Achievements"));
const OpenToWork = lazy(() => import("@/components/OpenToWork"));
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

const ModelsGallery = lazy(() => import("@/components/ModelsGallery"));

function App() {
  const [isTerminalMode, setIsTerminalMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetHash, setTargetHash] = useState("");
  const isModelsRoute = window.location.pathname === "/models";

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleNavClick = useCallback((hash: string) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.location.hash = hash;
      return;
    }
    setTargetHash(hash);
    setIsTransitioning(true);
  }, []);

  const handleTransitionCovered = useCallback(() => {
    const element = document.querySelector(targetHash);
    if (element) {
      const offset = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: offset, behavior: 'instant' });
      window.history.pushState(null, '', targetHash);
    }
    setIsTransitioning(false);
  }, [targetHash]);

  if (isModelsRoute) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
        <ThemeFavicon />
        <Suspense fallback={<SectionFallback />}>
          <ModelsGallery />
        </Suspense>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
      <ThemeFavicon />
      <SmoothScroll />
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
      <div className="relative min-h-screen text-foreground overflow-x-hidden selection:bg-electric selection:text-background">
        <SpotlightBackground />

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
              <LazyOnVisible id="open-to-work" minHeight="18rem">
                <Suspense fallback={<SectionFallback />}>
                  <OpenToWork />
                </Suspense>
              </LazyOnVisible>
              <LazyOnVisible id="about">
                <Suspense fallback={<SectionFallback />}>
                  <About />
                </Suspense>
              </LazyOnVisible>
              <LazyOnVisible id="skills">
                <Suspense fallback={<SectionFallback />}>
                  <Skills />
                </Suspense>
              </LazyOnVisible>
              <LazyOnVisible id="experience">
                <Suspense fallback={<SectionFallback />}>
                  <Experience />
                </Suspense>
              </LazyOnVisible>
              <LazyOnVisible id="projects" minHeight="32rem">
                <Suspense fallback={<SectionFallback />}>
                  <Projects />
                </Suspense>
              </LazyOnVisible>
              <LazyOnVisible id="achievements" minHeight="32rem">
                <Suspense fallback={<SectionFallback />}>
                  <Achievements />
                </Suspense>
              </LazyOnVisible>
              <LazyOnVisible id="contact" minHeight="18rem">
                <Suspense fallback={<SectionFallback />}>
                  <Contact />
                  <Footer />
                </Suspense>
              </LazyOnVisible>
            </>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
