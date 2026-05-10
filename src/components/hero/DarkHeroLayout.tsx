import { Suspense, lazy, useCallback, useRef } from "react";
import { Github, Linkedin } from "lucide-react";
import { personalInfo } from "@/data/portfolio-data";
import MagneticButton from "@/components/ui/MagneticButton";
import { ChessFallback } from "@/components/hero/ChessFallback";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/useGsapContext";

const MiniChess = lazy(() => import("@/components/MiniChess"));
const Hero3DChessPiece = lazy(() => import("@/components/ui/Hero3DChessPiece"));

interface DarkHeroLayoutProps {
  isVisible: boolean;
}

export function DarkHeroLayout({ isVisible }: DarkHeroLayoutProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  const setupHeroEntrance = useCallback((_context: gsap.Context, element: HTMLDivElement) => {
    if (!isVisible) {
      return undefined;
    }

    const panel = element.querySelectorAll("[data-hero-panel]");
    const portraits = element.querySelectorAll("[data-hero-portrait]");
    const title = element.querySelectorAll("[data-hero-title]");
    const copy = element.querySelectorAll("[data-hero-copy]");
    const actions = element.querySelectorAll("[data-hero-action]");
    const chess = element.querySelectorAll("[data-hero-chess]");
    const animatedGroups = [panel, portraits, title, copy, actions, chess];

    gsap.set(animatedGroups, { autoAlpha: 0 });
    gsap.set(panel, { y: 34, scale: 0.97, transformOrigin: "50% 52%" });
    gsap.set(portraits, {
      y: 20,
      scale: 0.92,
      filter: "blur(10px)",
      transformOrigin: "50% 55%",
    });
    gsap.set(title, { y: 26 });
    gsap.set(copy, { y: 16 });
    gsap.set(actions, { y: 18 });
    gsap.set(chess, { x: 30, scale: 0.985, transformOrigin: "50% 54%" });

    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    timeline
      .to(panel, { autoAlpha: 1, y: 0, scale: 1, duration: 0.72 }, 0)
      .to(
        portraits,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.72,
          stagger: 0.1,
        },
        0.18,
      )
      .to(title, { autoAlpha: 1, y: 0, duration: 0.58 }, 0.42)
      .to(copy, { autoAlpha: 1, y: 0, duration: 0.48 }, 0.58)
      .to(actions, { autoAlpha: 1, y: 0, duration: 0.46, stagger: 0.06 }, 0.72)
      .to(chess, { autoAlpha: 1, x: 0, scale: 1, duration: 0.72 }, 0.36);

    return () => {
      timeline.kill();
      gsap.set(animatedGroups, { clearProps: "all" });
    };
  }, [isVisible]);

  useGsapContext(heroRef, setupHeroEntrance);

  return (
    <div
      ref={heroRef}
      className={`${isVisible ? "block" : "hidden"} relative z-10 px-4 sm:px-6 xl:px-10 2xl:px-16 w-full max-w-[1700px]`}
    >
      <div
        data-hero-panel
        className="glass-panel rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 lg:p-12 border border-border shadow-2xl relative overflow-hidden"
      >
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-electric/20 rounded-full blur-[80px]" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />

        <div className="relative grid lg:grid-cols-[minmax(0,1.5fr)_minmax(360px,1fr)] xl:grid-cols-[minmax(0,1.65fr)_minmax(440px,1fr)] gap-6 sm:gap-8 lg:gap-10 xl:gap-14 items-center">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center gap-6 sm:gap-10 mb-5 sm:mb-8">
              <div
                data-hero-portrait
                className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 group shrink-0"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-electric to-purple-500 opacity-40 blur-[24px] group-hover:opacity-80 group-hover:scale-110 transition-all duration-700" />
                <div className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-b from-white/30 to-white/5 shadow-2xl backdrop-blur-md overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-500">
                  <img
                    src="/me.jpeg"
                    alt={`${personalInfo.name}, full-stack developer and builder`}
                    width={1600}
                    height={899}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover rounded-[calc(100%-3px)] border border-white/5"
                  />
                </div>
              </div>

              <div
                data-hero-portrait
                className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 group hidden sm:block shrink-0"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-electric to-purple-500 opacity-30 blur-[40px] group-hover:opacity-60 group-hover:scale-110 transition-all duration-700" />
                <Suspense fallback={<div className="w-full h-full rounded-full bg-white/5 animate-pulse" />}>
                  <Hero3DChessPiece />
                </Suspense>
              </div>
            </div>

            <h1
              data-hero-title
              className="text-4xl sm:text-6xl md:text-7xl 2xl:text-8xl font-serif font-bold text-gradient-heading leading-tight tracking-tight"
            >
              {personalInfo.name}
            </h1>

            <p
              data-hero-copy
              className="mt-3 sm:mt-6 text-sm sm:text-xl text-muted-foreground max-w-2xl font-light"
            >
              <span className="text-foreground font-medium">
                {personalInfo.title}
              </span>{" "}
              &bull; {personalInfo.subtitle}
            </p>

            <div className="mt-6 sm:mt-10 flex flex-wrap gap-3 sm:gap-5 justify-center lg:justify-start">
              <MagneticButton
                data-hero-action
                as="a"
                href="#projects"
                className="px-5 sm:px-8 py-2.5 sm:py-4 text-sm sm:text-base bg-white text-black font-semibold rounded-xl transition-transform hover:scale-105 active:scale-95 shadow-lg tracking-wide flex items-center justify-center"
              >
                View My Work
              </MagneticButton>
              <div className="flex gap-3">
                <MagneticButton
                  data-hero-action
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
                  data-hero-action
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

          <div
            data-hero-chess
            className="w-full max-w-sm sm:max-w-md xl:max-w-xl 2xl:max-w-[640px] mx-auto lg:mx-0 lg:justify-self-end"
          >
            <p className="inline-flex items-center rounded-full px-3 py-1 text-xs tracking-wide uppercase border border-border bg-surface/60 text-muted-foreground mb-3">
              Play Me In Chess
            </p>
            <Suspense fallback={<ChessFallback />}>
              <MiniChess
                minBoardWidth={240}
                maxBoardWidth={640}
                mobileMaxBoardWidth={300}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
