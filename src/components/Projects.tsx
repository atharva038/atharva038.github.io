import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/portfolio-data";
import type { Project } from "@/data/portfolio-data";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const topFeatured = projects.find((project) => project.title === "SmartNShine") ?? projects[0];
  const bottomFeatured = projects.find((project) => project.title === "KnockNFix") ?? projects[projects.length - 1];
  const middleProjects = projects.filter(
    (project) => project.id !== topFeatured.id && project.id !== bottomFeatured.id,
  );

  return (
    <>
      <section
        id="projects"
        className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden"
      >

        <div className="relative max-w-6xl mx-auto">

          {/* ── Section Header ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16 sm:mb-24"
          >
            <span className="text-electric text-sm font-mono tracking-widest uppercase mb-3 block opacity-80">
              Selected Work
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gradient-heading tracking-tight mb-4">
              Products I've Built
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground font-light max-w-lg mx-auto leading-relaxed">
              Real-world systems designed and engineered from scratch.
            </p>
          </motion.div>

          {/* ── Card Grid ───────────────────────────────────────────── */}
          <div className="flex flex-col gap-4">

            {/* Top featured — full width */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard
                project={topFeatured}
                featured
                onClick={() => setSelectedProject(topFeatured)}
              />
            </motion.div>

            {/* Center cards — 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {middleProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <ProjectCard
                    project={project}
                    onClick={() => setSelectedProject(project)}
                  />
                </motion.div>
              ))}
            </div>

            {/* Bottom featured — full width */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard
                project={bottomFeatured}
                featured
                onClick={() => setSelectedProject(bottomFeatured)}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Modal ────────────────────────────────────────────────────── */}
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
