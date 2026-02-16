import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Component as ProjectSlider } from "@/components/ui/argent-loop-infinite-slider";
import { projects } from "@/data/portfolio-data";

export default function Projects() {
  return (
    <section id="projects">
      <ProjectSlider />

      {/* Projects list after slider */}
      <div className="bg-background py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-accent-dim text-xs sm:text-sm font-mono tracking-widest uppercase mb-8 sm:mb-12"
          >
            All Projects
          </motion.p>

          <div className="flex flex-col divide-y divide-border">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group py-5 sm:py-6 first:pt-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                      <span className="text-xs font-mono text-white/20">
                        {(idx + 1).toString().padStart(2, "0")}
                      </span>
                      <h3 className="text-base sm:text-lg font-serif font-semibold text-foreground group-hover:text-white transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-accent-dim px-2 py-0.5 rounded-full border border-border bg-white/[0.02]">
                        {project.category}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1 ml-0 sm:ml-9 mb-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 ml-0 sm:ml-9">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/40"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pt-1">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 sm:p-2 rounded-full border border-border text-muted-foreground hover:text-white hover:border-border-hover transition-colors"
                      >
                        <Github size={14} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 sm:p-2 rounded-full border border-border text-muted-foreground hover:text-white hover:border-border-hover transition-colors"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
