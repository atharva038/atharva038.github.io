import { lazy, Suspense, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
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

function App() {
  const [enableEffects, setEnableEffects] = useState(false);
  const [isTerminalMode, setIsTerminalMode] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px), (prefers-reduced-motion: reduce)");

    const updateEffects = () => {
      setEnableEffects(!mediaQuery.matches);
    };

    updateEffects();
    mediaQuery.addEventListener("change", updateEffects);

    return () => mediaQuery.removeEventListener("change", updateEffects);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      {!isTerminalMode && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-electric origin-left z-[100]"
          style={{ scaleX }}
        />
      )}
      {enableEffects && <GlobalRipple />}
      <div className="relative min-h-screen text-foreground overflow-x-hidden selection:bg-electric selection:text-background">
        {/* Ambient Animated Background */}
        <div className="ambient-bg">
          <div className="ambient-orb orb-1"></div>
          <div className="ambient-orb orb-2"></div>
          <div className="ambient-orb orb-3"></div>
        </div>

        <div className="relative z-10 font-sans">
          <Navbar isTerminalMode={isTerminalMode} setIsTerminalMode={setIsTerminalMode} />
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
