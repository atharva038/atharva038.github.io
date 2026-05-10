import { lazy, Suspense, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { projects } from "@/data/portfolio-data";
import type { Project } from "@/data/portfolio-data";
import { ProjectModal } from "@/components/ProjectModal";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { SectionHeader } from "@/components/shared/SectionHeader";

const Projects3DModel = lazy(() =>
  import("@/components/ui/Section3DModels").then((module) => ({
    default: module.Projects3DModel,
  })),
);

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const topFeatured = projects.find((project) => project.title === "SmartNShine") ?? projects[0];
  const bottomFeatured = projects.find((project) => project.title === "KnockNFix") ?? projects[projects.length - 1];
  const middleProjects = projects.filter(
    (project) => project.id !== topFeatured.id && project.id !== bottomFeatured.id,
  );

  return (
    <>
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden">
        <Suspense fallback={null}>
          <Projects3DModel />
        </Suspense>

        <div className="relative max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Selected Work"
            title="Products I've Built"
            description="Real-world systems designed and engineered from scratch."
          />

          <ProjectsGrid
            topFeatured={topFeatured}
            middleProjects={middleProjects}
            bottomFeatured={bottomFeatured}
            onSelectProject={setSelectedProject}
          />
        </div>
      </section>

      <AnimatePresence>
        {selectedProject?.caseStudy && (
          <ProjectModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
