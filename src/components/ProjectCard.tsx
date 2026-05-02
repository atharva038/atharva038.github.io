import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Project } from "@/data/portfolio-data";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  featured?: boolean;
}

export function ProjectCard({ project, onClick, featured = false }: ProjectCardProps) {
  const cs = project.caseStudy;
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [project.image]);

  return (
    <motion.article
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`View case study for ${project.title}`}
      className={`
        group relative cursor-pointer rounded-3xl overflow-hidden
        glass-panel
        ${featured ? "lg:flex lg:flex-row min-h-[350px]" : "flex flex-col h-full"}
      `}
      whileHover={{ scale: 1.015, y: -4 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      style={{ willChange: "transform" }}
    >
      {/* Electric border glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{
          boxShadow: "0 0 0 1px var(--glow-color1), inset 0 8px 40px rgba(56,189,248,0.15)",
        }}
      />
      
      {/* Background ambient hover glow */}
      <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-electric/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image section */}
      <div
        className={`
          relative overflow-hidden bg-surface-light shrink-0
          ${featured
            ? "w-full lg:w-[52%] aspect-video lg:aspect-auto"
            : "w-full aspect-[16/9]"
          }
          px-1.5 sm:px-2.5 py-1.5 sm:py-2
        `}
      >
        <div
          className={`absolute inset-0 bg-surface/80 transition-opacity duration-300 ${imageLoaded ? "opacity-0" : "opacity-100"}`}
        />
        <img
          src={project.image}
          alt={`${project.title} ${project.category} project screenshot by Atharva Joshi`}
          className={`w-full h-full object-cover group-hover:scale-[1.04] transition-all duration-500 ${imageLoaded ? "opacity-65 group-hover:opacity-85" : "opacity-0"}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
        />
        {/* Bottom fade overlay */}
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
        {/* Right fade overlay for featured */}
        {featured && (
          <div className="hidden dark:lg:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0a0a]" />
        )}

        {featured && (
          <div className="absolute top-4 left-4 z-10">
            <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-electric/20 border border-electric/30 text-electric font-semibold backdrop-blur-md shadow-[0_0_15px_var(--glow-color1)]">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div
        className={`
          flex flex-col justify-between
          ${featured ? "p-7 sm:p-10 lg:w-[48%]" : "p-6"}
        `}
      >
        <div>
          {/* Top action */}
          {project.live && (
            <div className="mb-4">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-full bg-electric/15 border border-electric/35 text-electric hover:bg-electric/25 transition-colors"
                aria-label={`Open live demo for ${project.title}`}
              >
                Live Demo
                <ExternalLink size={12} />
              </a>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4 relative z-10">
            {(cs?.tags ?? [project.category]).map((tag) => (
              <span
                key={tag}
                className="text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-surface border border-border text-muted-foreground font-medium group-hover:border-electric group-hover:text-electric transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3
            className={`font-bold text-foreground leading-tight mb-2 ${
              featured ? "text-2xl sm:text-3xl" : "text-xl"
            }`}
          >
            {project.title}
          </h3>

          {/* Tagline */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {cs?.tagline ?? project.description}
          </p>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-1.5 mt-6 text-sm text-electric/80 font-medium group-hover:text-electric transition-colors duration-200">
          <span>View Case Study</span>
          <ArrowRight
            size={13}
            className="group-hover:translate-x-1.5 transition-transform duration-200"
          />
        </div>
      </div>
    </motion.article>
  );
}
