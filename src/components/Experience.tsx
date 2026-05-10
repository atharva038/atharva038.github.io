import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { experiences } from "@/data/portfolio-data";
import { ExperienceTimelineItem } from "@/components/experience/ExperienceTimelineItem";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/useGsapContext";

const Experience3DModel = lazy(() =>
  import("@/components/ui/Section3DModels").then((module) => ({
    default: module.Experience3DModel,
  })),
);

export default function Experience() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const setupTimelineDraw = useCallback((_context: gsap.Context, element: HTMLDivElement) => {
    const fill = element.querySelector<HTMLElement>("[data-experience-fill]");
    const items = gsap.utils.toArray<HTMLElement>(
      element.querySelectorAll("[data-experience-item]"),
    );
    const nodes = gsap.utils.toArray<HTMLElement>(
      element.querySelectorAll("[data-experience-node]"),
    );

    if (!fill || items.length === 0) {
      return undefined;
    }

    gsap.set(fill, {
      scaleY: 0,
      transformOrigin: "50% 0%",
      willChange: "transform",
    });

    gsap.set(items, {
      autoAlpha: 0,
      x: -24,
      willChange: "opacity, transform",
    });

    gsap.set(nodes, {
      autoAlpha: 0.55,
      scale: 0.78,
      willChange: "opacity, transform",
    });

    const timeline = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
      scrollTrigger: {
        trigger: element,
        start: "top 72%",
        end: "bottom 58%",
        scrub: 0.65,
      },
    });

    timeline
      .to(fill, { scaleY: 1, ease: "none", duration: 1 }, 0)
      .to(
        items,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.36,
          stagger: 0.12,
          clearProps: "willChange",
        },
        0.04,
      )
      .to(
        nodes,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.28,
          stagger: 0.12,
          ease: "back.out(1.8)",
          clearProps: "willChange",
        },
        0.04,
      );

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, []);

  useGsapContext(timelineRef, setupTimelineDraw);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [activeId]);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Ambient background glow (dark mode only) */}
      <div className="hidden dark:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-surface blur-[120px] pointer-events-none" />
      <Suspense fallback={null}>
        <Experience3DModel />
      </Suspense>

      <div className="max-w-6xl mx-auto relative">
        <SectionHeader
          eyebrow="The Game Record"
          title="Experience"
          description="Every grandmaster's journey is recorded move by move. Here's mine."
        />

        <div ref={timelineRef} className="relative">
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-surface" />

          <div
            data-experience-fill
            className="absolute left-6 sm:left-8 top-0 w-px bg-electric dark:bg-gradient-to-b dark:from-electric dark:to-transparent shadow-[0_0_10px_rgba(56,189,248,0.5)]"
            style={{ height: "100%" }}
          />

          <div className="space-y-4 sm:space-y-6">
            {experiences.map((experience, index) => (
              <ExperienceTimelineItem
                key={experience.id}
                experience={experience}
                index={index}
                isActive={activeId === experience.id}
                onToggle={() =>
                  setActiveId(activeId === experience.id ? null : experience.id)
                }
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="absolute left-4 sm:left-6 -bottom-4 w-4 h-4 sm:w-4 sm:h-4 rounded-full border-2 border-border bg-surface flex items-center justify-center"
          >
            <div className="w-1 h-1 rounded-full bg-muted" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <p className="text-muted-foreground italic font-serif text-sm sm:text-base max-w-lg mx-auto">
            "The opening defines the strategy. My journey has just begun, and every move counts."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
