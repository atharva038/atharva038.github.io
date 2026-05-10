import { useCallback, useRef } from "react";
import type { Project } from "@/data/portfolio-data";
import { gsap } from "@/lib/gsap";
import { useGsapContext } from "@/hooks/useGsapContext";
import { ProjectCard } from "@/components/ProjectCard";

interface ProjectsGridProps {
  topFeatured: Project;
  middleProjects: Project[];
  bottomFeatured: Project;
  onSelectProject: (project: Project) => void;
}

export function ProjectsGrid({
  topFeatured,
  middleProjects,
  bottomFeatured,
  onSelectProject,
}: ProjectsGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  const setupProjectReveal = useCallback((_context: gsap.Context, element: HTMLDivElement) => {
    const cards = gsap.utils.toArray<HTMLElement>(
      element.querySelectorAll("[data-project-reveal]"),
    );

    if (cards.length === 0) {
      return undefined;
    }

    gsap.set(cards, {
      autoAlpha: 0,
      y: 34,
      scale: 0.985,
      transformOrigin: "50% 56%",
      willChange: "opacity, transform",
    });

    const timeline = gsap.timeline({
      defaults: {
        duration: 0.72,
        ease: "power3.out",
      },
      scrollTrigger: {
        trigger: element,
        start: "top 78%",
        once: true,
      },
    });

    timeline.to(cards, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      stagger: {
        each: 0.08,
        from: "start",
      },
      clearProps: "willChange",
    });

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, []);

  useGsapContext(gridRef, setupProjectReveal);

  return (
    <div ref={gridRef} className="flex flex-col gap-4">
      <div data-project-reveal>
        <ProjectCard
          project={topFeatured}
          featured
          onClick={() => onSelectProject(topFeatured)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {middleProjects.map((project) => (
          <div
            key={project.id}
            data-project-reveal
          >
            <ProjectCard
              project={project}
              onClick={() => onSelectProject(project)}
            />
          </div>
        ))}
      </div>

      <div data-project-reveal>
        <ProjectCard
          project={bottomFeatured}
          featured
          onClick={() => onSelectProject(bottomFeatured)}
        />
      </div>
    </div>
  );
}
