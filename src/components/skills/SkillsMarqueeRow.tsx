import { useCallback, useRef } from "react";
import type { SkillItem } from "@/data/portfolio-data";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/useGsapContext";

interface SkillsMarqueeRowProps {
  skills: SkillItem[];
  reverse?: boolean;
}

export function SkillsMarqueeRow({
  skills,
  reverse = false,
}: SkillsMarqueeRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const doubled = [...skills, ...skills, ...skills];

  const setupMarqueeLoop = useCallback((_context: gsap.Context, element: HTMLDivElement) => {
    const segmentWidth = element.scrollWidth / 3;

    if (segmentWidth <= 0) {
      return undefined;
    }

    gsap.set(element, {
      x: reverse ? -segmentWidth : 0,
      willChange: "transform",
    });

    tweenRef.current = gsap.to(element, {
      x: reverse ? 0 : -segmentWidth,
      duration: reverse ? 34 : 30,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
      tweenRef.current = null;
      gsap.set(element, { clearProps: "transform,willChange" });
    };
  }, [reverse]);

  useGsapContext(trackRef, setupMarqueeLoop);

  const pauseLoop = () => {
    tweenRef.current?.pause();
  };

  const resumeLoop = () => {
    tweenRef.current?.resume();
  };

  return (
    <div
      className="overflow-hidden py-3 sm:py-4 relative"
      data-skill-marquee-row
      onMouseEnter={pauseLoop}
      onMouseLeave={resumeLoop}
      onFocus={pauseLoop}
      onBlur={resumeLoop}
    >
      <div className="absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div
        ref={trackRef}
        data-skill-marquee-track
        className="flex w-max"
      >
        {doubled.map((skill, i) => (
          <div
            key={`${skill.name}-${i}`}
            className="flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-2 sm:py-3 mx-2 sm:mx-3 rounded-full glass hover:bg-surface text-sm sm:text-base text-foreground whitespace-nowrap transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_var(--glow-color1)] cursor-default"
          >
            <img
              src={skill.icon}
              alt={skill.name}
              width={24}
              height={24}
              loading="lazy"
              decoding="async"
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain drop-shadow-md"
            />
            <span className="font-medium tracking-wide">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
