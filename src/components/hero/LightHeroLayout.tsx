import { Suspense, lazy, useCallback, useRef } from "react";
import { Brain, Github, LaptopMinimalCheck, Linkedin } from "lucide-react";
import { personalInfo } from "@/data/portfolio-data";
import MagneticButton from "@/components/ui/MagneticButton";
import { ChessFallback } from "@/components/hero/ChessFallback";
import { HeroFeatureRows } from "@/components/hero/HeroFeatureRows";
import { HeroStatusBar } from "@/components/hero/HeroStatusBar";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/useGsapContext";

const MiniChess = lazy(() => import("@/components/MiniChess"));
const Hero3DChessPiece = lazy(() => import("@/components/ui/Hero3DChessPiece"));

interface LightHeroLayoutProps {
  isLight: boolean;
  isVisible: boolean;
}

const heroFeatures = [
  {
    num: "01",
    icon: <LaptopMinimalCheck />,
    label: "Full-Stack",
    desc: "React, Node, Python, ThreeJS — end-to-end.",
  },
  {
    num: "02",
    icon: <Brain />,
    label: "Agentic AI",
    desc: "LLMs, computer vision, real solutions.",
  },
  {
    num: "03",
    icon: "</>",
    label: "Open Source",
    desc: "Contributing, shipping, collaborating.",
  },
];

export function LightHeroLayout({ isLight, isVisible }: LightHeroLayoutProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  const setupHeroEntrance = useCallback((_context: gsap.Context, element: HTMLDivElement) => {
    if (!isVisible) {
      return undefined;
    }

    const topbar = element.querySelectorAll("[data-hero-topbar]");
    const media = element.querySelectorAll("[data-hero-media]");
    const meta = element.querySelectorAll("[data-hero-meta]");
    const titleWords = element.querySelectorAll("[data-hero-title-word]");
    const copy = element.querySelectorAll("[data-hero-copy]");
    const actions = element.querySelectorAll("[data-hero-action]");
    const chess = element.querySelectorAll("[data-hero-chess]");
    const features = element.querySelectorAll("[data-hero-features]");
    const status = element.querySelectorAll("[data-hero-status]");
    const animatedGroups = [topbar, media, meta, titleWords, copy, actions, chess, features, status];

    gsap.set(animatedGroups, { autoAlpha: 0 });
    gsap.set(topbar, { y: -10 });
    gsap.set(media, { y: 18, scale: 0.96, transformOrigin: "50% 55%" });
    gsap.set(meta, { y: 12 });
    gsap.set(titleWords, { yPercent: 105, rotateX: -18, transformOrigin: "0% 100%" });
    gsap.set(copy, { y: 14 });
    gsap.set(actions, { y: 16 });
    gsap.set(chess, { x: 28, scale: 0.985, transformOrigin: "50% 55%" });
    gsap.set(features, { y: 18 });
    gsap.set(status, { y: 10 });

    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    timeline
      .to(topbar, { autoAlpha: 1, y: 0, duration: 0.42 }, 0.05)
      .to(media, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.08 }, 0.12)
      .to(meta, { autoAlpha: 1, y: 0, duration: 0.42 }, 0.22)
      .to(
        titleWords,
        {
          autoAlpha: 1,
          yPercent: 0,
          rotateX: 0,
          duration: 0.72,
          stagger: 0.08,
        },
        0.28,
      )
      .to(copy, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.7)
      .to(actions, { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.06 }, 0.82)
      .to(chess, { autoAlpha: 1, x: 0, scale: 1, duration: 0.72 }, 0.36)
      .to(features, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.8)
      .to(status, { autoAlpha: 1, y: 0, duration: 0.38 }, 1.02);

    return () => {
      timeline.kill();
      gsap.set(animatedGroups, { clearProps: "all" });
    };
  }, [isVisible]);

  useGsapContext(heroRef, setupHeroEntrance);

  return (
    <div
      ref={heroRef}
      className={`${isVisible ? "block" : "hidden"} relative z-10 px-4 sm:px-8 xl:px-16 w-full max-w-[1700px]`}
    >
      <div>
        <div data-hero-topbar className="flex items-center justify-between mb-6 sm:mb-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            // Built for impact
          </span>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1 border font-semibold"
            style={
              isLight
                ? {
                    backgroundColor: "#F5D000",
                    borderColor: "#F5D000",
                    color: "#000",
                  }
                : { borderColor: "#F5D000", color: "#F5D000" }
            }
          >
            ● Available for work
          </span>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1.55fr)_minmax(340px,1fr)] xl:grid-cols-[minmax(0,1.65fr)_minmax(420px,1fr)] gap-0 border border-border">
          <div className="p-7 sm:p-10 lg:p-14 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border">
            <div className="flex flex-wrap items-center gap-4 mb-8 sm:mb-10">
              <div
                data-hero-media
                className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 overflow-hidden border border-border"
              >
                <img
                  src="/me.jpeg"
                  alt={`${personalInfo.name}, full-stack developer`}
                  width={1600}
                  height={899}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                data-hero-media
                className="w-20 h-20 sm:w-28 sm:h-28 hidden sm:block shrink-0 relative"
              >
                <Suspense fallback={<div className="w-full h-full animate-pulse bg-muted rounded-xl" />}>
                  <Hero3DChessPiece />
                </Suspense>
              </div>

              <div data-hero-meta className="ml-0 sm:ml-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-0.5">
                  Developer
                </p>
                <p className="font-mono text-xs font-semibold text-foreground">
                  {personalInfo.title}
                </p>
              </div>
            </div>

            <h1 className="text-[clamp(3rem,8vw,7.5rem)] font-serif font-black text-foreground leading-[0.88] tracking-tighter mb-8 sm:mb-10 uppercase">
              {personalInfo.name.split(" ").map((word) => (
                <span key={word} className="block overflow-hidden">
                  <span data-hero-title-word className="block">
                    {word}_
                  </span>
                </span>
              ))}
            </h1>

            <p
              data-hero-copy
              className="text-sm sm:text-base text-muted-foreground max-w-lg font-light leading-relaxed mb-10"
            >
              {personalInfo.subtitle}
            </p>

            <div
              data-hero-action
              className="flex items-center gap-0 mb-10 border border-border overflow-hidden max-w-md"
            >
              <div className="flex-1 px-4 py-3 font-mono text-xs text-muted-foreground bg-surface">
                $ contact --hire atharva
              </div>
              <MagneticButton
                href="#contact"
                className="flex items-center justify-center px-5 py-3 font-mono text-xs font-bold text-black transition-colors duration-200"
                style={{ backgroundColor: "#F5D000", minWidth: "3rem" }}
                aria-label="Go to contact"
              >
                →
              </MagneticButton>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <MagneticButton
                data-hero-action
                href="#projects"
                className="px-7 py-3 text-sm font-bold uppercase tracking-widest transition-all duration-200 border bg-[#F5D000] border-[#F5D000] text-black"
              >
                View Work →
              </MagneticButton>
              <MagneticButton
                data-hero-action
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
                data-hero-action
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

          <div className="flex flex-col">
            <div data-hero-chess className="p-5 sm:p-7 flex flex-col border-b border-border">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
                ◆ Play Me In Chess
              </p>
              <div className="flex-1 items-center">
                <Suspense fallback={<ChessFallback />}>
                  <MiniChess
                    minBoardWidth={220}
                    maxBoardWidth={600}
                    mobileMaxBoardWidth={280}
                  />
                </Suspense>
              </div>
            </div>

            <div data-hero-features>
              <HeroFeatureRows features={heroFeatures} />
            </div>
          </div>
        </div>

        <div data-hero-status>
          <HeroStatusBar />
        </div>
      </div>
    </div>
  );
}
