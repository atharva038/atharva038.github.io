import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Hero from "@/components/Hero";
import LiquidWipeOverlay from "@/components/LiquidWipeOverlay";
import Navbar from "@/components/Navbar";

const About = lazy(() => import("@/components/About"));
const Skills = lazy(() => import("@/components/Skills"));
const Experience = lazy(() => import("@/components/Experience"));
const Projects = lazy(() => import("@/components/Projects"));
const Achievements = lazy(() => import("@/components/Achievements"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

function SectionFallback() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background/50 backdrop-blur-sm z-50">
      <div className="h-12 w-12 border-4 border-electric border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

const sectionIds = ["hero", "about", "skills", "experience", "projects", "achievements", "contact"] as const;
type SectionId = (typeof sectionIds)[number];

const isSectionId = (value: string): value is SectionId => sectionIds.includes(value as SectionId);

const sectionComponents: Record<SectionId, React.ReactNode> = {
  hero: <Hero />,
  about: <About />,
  skills: <Skills />,
  experience: <Experience />,
  projects: <Projects />,
  achievements: <Achievements />,
  contact: (
    <>
      <Contact />
      <Footer />
    </>
  ),
};

interface SectionControllerProps {
  isTerminalMode: boolean;
  setIsTerminalMode: (val: boolean) => void;
}

const canUseLiquidWebGL = () => {
  const canvas = document.createElement("canvas");
  const context =
    canvas.getContext("webgl2", { antialias: false, alpha: false }) ||
    canvas.getContext("webgl", { antialias: false, alpha: false });
  return Boolean(context);
};

const getRandomTransition = () => {
  const types = ["depth", "iris", "flip", "split"];
  return types[Math.floor(Math.random() * types.length)];
};

export default function SectionController({ isTerminalMode, setIsTerminalMode }: SectionControllerProps) {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [transitionType, setTransitionType] = useState("depth");
  const [liquidTransitionId, setLiquidTransitionId] = useState<string | null>(null);
  const [suppressSectionMotion, setSuppressSectionMotion] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const activeSectionRef = useRef<SectionId>("hero");
  const transitionTargetRef = useRef<SectionId | null>(null);
  const queuedSectionRef = useRef<SectionId | null>(null);
  const isTransitioningRef = useRef(false);
  const isInitialLoadRef = useRef(true);
  const shouldReduceMotionRef = useRef(false);

  const shouldReduceMotion = useReducedMotion();

  const commitSection = useCallback((nextSection: SectionId, options?: { instant?: boolean }) => {
    activeSectionRef.current = nextSection;
    setTransitionType(getRandomTransition());

    if (options?.instant) {
      setSuppressSectionMotion(true);
      window.setTimeout(() => setSuppressSectionMotion(false), 0);
    }

    setActiveSection(nextSection);
  }, []);

  const navigateDirectly = useCallback((nextSection: SectionId) => {
    transitionTargetRef.current = null;
    isTransitioningRef.current = false;
    setLiquidTransitionId(null);
    commitSection(nextSection, { instant: shouldReduceMotionRef.current });
  }, [commitSection]);

  const startLiquidTransition = useCallback((nextSection: SectionId) => {
    if (activeSectionRef.current === nextSection) return;

    if (isTransitioningRef.current) {
      queuedSectionRef.current = nextSection;
      return;
    }

    if (shouldReduceMotionRef.current || isInitialLoadRef.current || !canUseLiquidWebGL()) {
      navigateDirectly(nextSection);
      return;
    }

    isTransitioningRef.current = true;
    transitionTargetRef.current = nextSection;
    setLiquidTransitionId(`${nextSection}-${Date.now()}`);
  }, [navigateDirectly]);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    shouldReduceMotionRef.current = Boolean(shouldReduceMotion);
  }, [shouldReduceMotion]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const nextSection = isSectionId(hash) ? hash : !hash ? "hero" : null;

      if (nextSection) {
        startLiquidTransition(nextSection);
      }
    };

    handleHashChange();
    const initialLoadTimer = window.setTimeout(() => {
      isInitialLoadRef.current = false;
      setIsInitialLoad(false);
    }, 100);

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.clearTimeout(initialLoadTimer);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [startLiquidTransition]);

  useEffect(() => {
    const container = document.getElementById("section-container");
    if (container) {
      container.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [activeSection]);

  const handleLiquidCovered = useCallback(() => {
    const targetSection = transitionTargetRef.current;

    if (targetSection) {
      commitSection(targetSection, { instant: true });
    }
  }, [commitSection]);

  const finishLiquidTransition = useCallback(() => {
    const targetSection = transitionTargetRef.current;
    setLiquidTransitionId(null);
    transitionTargetRef.current = null;
    isTransitioningRef.current = false;

    const queuedSection = queuedSectionRef.current;
    queuedSectionRef.current = null;

    if (queuedSection && queuedSection !== targetSection) {
      window.setTimeout(() => startLiquidTransition(queuedSection), 0);
    }
  }, [startLiquidTransition]);

  const handleScroll = () => {
    // scroll tracking reserved for future use
  };

  const getVariants = () => {
    if (shouldReduceMotion || suppressSectionMotion || liquidTransitionId) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0 } },
        exit: { opacity: 0, transition: { duration: 0 } },
      };
    }

    switch (transitionType) {
      case "iris":
        return {
          initial: {
            opacity: 0,
            clipPath: "circle(0% at 50% 50%)",
            scale: 0.95,
          },
          animate: {
            opacity: 1,
            clipPath: "circle(150% at 50% 50%)",
            scale: 1,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
          },
          exit: {
            opacity: 0,
            clipPath: "circle(0% at 50% 50%)",
            scale: 0.95,
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
          },
        };

      case "flip":
        return {
          initial: {
            opacity: 0,
            rotateY: 90,
            scale: 0.8,
            z: -400,
          },
          animate: {
            opacity: 1,
            rotateY: 0,
            scale: 1,
            z: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
          },
          exit: {
            opacity: 0,
            rotateY: -90,
            scale: 0.8,
            z: -400,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
          },
        };

      case "split":
        return {
          initial: {
            opacity: 0,
            clipPath: "inset(50% 0 50% 0)",
            scale: 1.05,
            filter: "blur(10px)",
          },
          animate: {
            opacity: 1,
            clipPath: "inset(0% 0 0% 0)",
            scale: 1,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
          },
          exit: {
            opacity: 0,
            clipPath: "inset(50% 0 50% 0)",
            scale: 0.95,
            filter: "blur(10px)",
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
          },
        };

      case "depth":
      default:
        return {
          initial: {
            opacity: 0,
            scale: 1.1,
            filter: "blur(16px)",
            y: 40,
          },
          animate: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
          },
          exit: {
            opacity: 0,
            scale: 0.85,
            filter: "blur(12px)",
            y: -30,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
          },
        };
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <Navbar
        isTerminalMode={isTerminalMode}
        setIsTerminalMode={setIsTerminalMode}
      />

      <div
        id="section-container"
        onScroll={handleScroll}
        className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden perspective-[1200px]"
      >
        <AnimatePresence mode="wait" initial={!isInitialLoad}>
          <motion.div
            key={activeSection}
            ref={sectionRef}
            tabIndex={-1}
            variants={getVariants()}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ transformStyle: "preserve-3d", transformOrigin: "center center" }}
            onAnimationComplete={(definition) => {
              if (definition === "animate" && sectionRef.current) {
                sectionRef.current.focus({ preventScroll: true });
              }
            }}
            className="min-h-full w-full flex flex-col focus:outline-none"
          >
            <Suspense fallback={<SectionFallback />}>
              {sectionComponents[activeSection]}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </div>

      <LiquidWipeOverlay
        transitionId={liquidTransitionId}
        onCovered={handleLiquidCovered}
        onComplete={finishLiquidTransition}
        onError={finishLiquidTransition}
      />
    </div>
  );
}
