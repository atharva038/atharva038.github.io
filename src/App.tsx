import { lazy, Suspense, useCallback, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LiquidWipeOverlay from "@/components/LiquidWipeOverlay";
import { ThemeProvider } from "@/components/ThemeProvider";
import TerminalView from "@/components/TerminalView";
import SpotlightBackground from "@/components/SpotlightBackground";
import LazyOnVisible from "@/components/LazyOnVisible";
import ThemeFavicon from "@/components/ThemeFavicon";
import SmoothScroll from "@/components/SmoothScroll";
import SidePeeks from "@/components/SidePeeks";

const About = lazy(() => import("@/components/About"));
const Skills = lazy(() => import("@/components/Skills"));
const Experience = lazy(() => import("@/components/Experience"));
const Projects = lazy(() => import("@/components/Projects"));
const Achievements = lazy(() => import("@/components/Achievements"));
const OpenToWork = lazy(() => import("@/components/OpenToWork"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

function SectionFallback() {
  return <div data-section-fallback="true" className="h-24 sm:h-32" aria-hidden="true" />;
}

const ModelsGallery = lazy(() => import("@/components/ModelsGallery"));
const AdminPanel = lazy(() => import("@/components/AdminPanel"));
const AnnouncementBanner = lazy(() => import("@/components/AnnouncementBanner"));

const canUseLiquidWebGL = () => {
  const canvas = document.createElement("canvas");
  const context =
    canvas.getContext("webgl2", { antialias: false, alpha: false }) ||
    canvas.getContext("webgl", { antialias: false, alpha: false });
  return Boolean(context);
};

const scrollToHash = (hash: string) => {
  const element = document.querySelector(hash);
  if (!element) return;

  const offset = element.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: offset, behavior: "instant" });
  window.history.pushState(null, "", hash);
};

function App() {
  const [isTerminalMode, setIsTerminalMode] = useState(false);
  const [liquidTransitionId, setLiquidTransitionId] = useState<string | null>(null);
  const transitionTargetHashRef = useRef<string | null>(null);
  const queuedHashRef = useRef<string | null>(null);
  const isLiquidTransitioningRef = useRef(false);
  const isModelsRoute = window.location.pathname === "/models";
  const isAdminRoute =
    window.location.pathname === "/admin" ||
    window.location.hash === "#/admin" ||
    window.location.hash === "#admin";

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleNavClick = useCallback((hash: string) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scrollToHash(hash);
      return;
    }

    if (!canUseLiquidWebGL()) {
      scrollToHash(hash);
      return;
    }

    if (isLiquidTransitioningRef.current) {
      queuedHashRef.current = hash;
      return;
    }

    isLiquidTransitioningRef.current = true;
    transitionTargetHashRef.current = hash;
    setLiquidTransitionId(`${hash}-${Date.now()}`);
  }, []);

  const handleLiquidCovered = useCallback(() => {
    const targetHash = transitionTargetHashRef.current;
    if (targetHash) {
      scrollToHash(targetHash);
    }
  }, []);

  const finishLiquidTransition = useCallback(() => {
    const targetHash = transitionTargetHashRef.current;
    setLiquidTransitionId(null);
    transitionTargetHashRef.current = null;
    isLiquidTransitioningRef.current = false;

    const queuedHash = queuedHashRef.current;
    queuedHashRef.current = null;

    if (queuedHash && queuedHash !== targetHash) {
      window.setTimeout(() => handleNavClick(queuedHash), 0);
    }
  }, [handleNavClick]);

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

  if (isAdminRoute) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
        <ThemeFavicon />
        <Suspense fallback={<SectionFallback />}>
          <AdminPanel />
        </Suspense>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
      <ThemeFavicon />
      <SmoothScroll />

      {!isTerminalMode && (
        <Suspense fallback={null}>
          <AnnouncementBanner />
        </Suspense>
      )}

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
              <SidePeeks />
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

      <LiquidWipeOverlay
        transitionId={liquidTransitionId}
        onCovered={handleLiquidCovered}
        onComplete={finishLiquidTransition}
        onError={finishLiquidTransition}
      />
    </ThemeProvider>
  );
}

export default App;
