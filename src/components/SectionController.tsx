import { lazy, Suspense, useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Hero from "@/components/Hero";
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

const sectionComponents: Record<string, React.ReactNode> = {
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

export default function SectionController({ isTerminalMode, setIsTerminalMode }: SectionControllerProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [transitionType, setTransitionType] = useState("depth");
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const shouldReduceMotion = useReducedMotion();

  // Pick a random transition effect when navigating
  const getRandomTransition = () => {
    const types = ["depth", "iris", "flip", "split"];
    // Optional: avoid picking the same one twice in a row
    return types[Math.floor(Math.random() * types.length)];
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const nextSection = sectionComponents[hash] ? hash : !hash ? "hero" : null;

      if (nextSection) {
        setActiveSection((currentSection) => {
          if (currentSection === nextSection) return currentSection;
          setTransitionType(getRandomTransition());
          return nextSection;
        });
      }
    };

    handleHashChange(); // handle initial load
    const initialLoadTimer = window.setTimeout(() => setIsInitialLoad(false), 100);

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.clearTimeout(initialLoadTimer);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  // When section changes, reset scroll to top of the container
  useEffect(() => {
    const container = document.getElementById("section-container");
    if (container) {
      container.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [activeSection]);

  const handleScroll = () => {
    // scroll tracking reserved for future use
  };

  const getVariants = () => {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0 } },
        exit: { opacity: 0, transition: { duration: 0 } }
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
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number,number,number,number] }
          },
          exit: { 
            opacity: 0,
            clipPath: "circle(0% at 50% 50%)",
            scale: 0.95,
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as [number,number,number,number] }
          }
        };

      case "flip":
        return {
          initial: { 
            opacity: 0, 
            rotateY: 90,
            scale: 0.8,
            z: -400
          },
          animate: { 
            opacity: 1, 
            rotateY: 0,
            scale: 1,
            z: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }
          },
          exit: { 
            opacity: 0, 
            rotateY: -90,
            scale: 0.8,
            z: -400,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }
          }
        };

      case "split":
        return {
          initial: { 
            opacity: 0,
            clipPath: "inset(50% 0 50% 0)", // split horizontally from middle
            scale: 1.05,
            filter: "blur(10px)"
          },
          animate: { 
            opacity: 1,
            clipPath: "inset(0% 0 0% 0)",
            scale: 1,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number,number,number,number] }
          },
          exit: { 
            opacity: 0,
            clipPath: "inset(50% 0 50% 0)",
            scale: 0.95,
            filter: "blur(10px)",
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as [number,number,number,number] }
          }
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
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }
          },
          exit: { 
            opacity: 0, 
            scale: 0.85,
            filter: "blur(12px)",
            y: -30,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }
          }
        };
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <Navbar 
        isTerminalMode={isTerminalMode} 
        setIsTerminalMode={setIsTerminalMode} 
      />
      
      {/* Scrollable container for the active section, adding perspective for 3D Flips */}
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
    </div>
  );
}
