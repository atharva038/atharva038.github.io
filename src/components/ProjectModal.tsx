import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  MapPin,
  CreditCard,
  Percent,
  LayoutDashboard,
  Zap,
  ShieldCheck,
  Sparkles,
  Target,
  FileText,
  Download,
  Layers,
  Palette,
  Users,
  ArrowRight,
  ArrowDown,
} from "lucide-react";
import type { Project, ArchLayer } from "@/data/portfolio-data";
import MagneticButton from "@/components/ui/MagneticButton";

// ─── Icon registry ────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ReactNode> = {
  MapPin: <MapPin size={16} />,
  CreditCard: <CreditCard size={16} />,
  Percent: <Percent size={16} />,
  LayoutDashboard: <LayoutDashboard size={16} />,
  Zap: <Zap size={16} />,
  ShieldCheck: <ShieldCheck size={16} />,
  Sparkles: <Sparkles size={16} />,
  Target: <Target size={16} />,
  FileText: <FileText size={16} />,
  Download: <Download size={16} />,
  Layers: <Layers size={16} />,
  Palette: <Palette size={16} />,
  Users: <Users size={16} />,
};

// ─── Architecture colour map ──────────────────────────────────────────────────
const ARCH_COLORS = {
  blue:   { bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.22)",  text: "#60a5fa" },
  green:  { bg: "rgba(34,197,94,0.08)",   border: "rgba(34,197,94,0.22)",   text: "#4ade80" },
  orange: { bg: "rgba(249,115,22,0.08)",  border: "rgba(249,115,22,0.22)",  text: "#fb923c" },
  purple: { bg: "rgba(168,85,247,0.08)",  border: "rgba(168,85,247,0.22)",  text: "#c084fc" },
  pink:   { bg: "rgba(236,72,153,0.08)",  border: "rgba(236,72,153,0.22)",  text: "#f472b6" },
} as const;

// ─── Section animation variant ────────────────────────────────────────────────
const sectionVariant = { 
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.38, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

// ─── Architecture node ────────────────────────────────────────────────────────
function ArchNode({ layer }: { layer: ArchLayer }) {
  const c = ARCH_COLORS[layer.color] ?? ARCH_COLORS.blue;
  return (
    <div
      className="rounded-xl px-4 py-3 min-w-[120px] text-center"
      style={{ background: c.bg, border: `1px solid ${c.border}` }}
    >
      <p
        className="text-[9px] uppercase tracking-[0.18em] font-mono mb-2"
        style={{ color: c.text }}
      >
        {layer.label}
      </p>
      <div className="space-y-0.5">
        {layer.items.map((item) => (
          <p key={item} className="text-[11px] text-muted-foreground leading-snug">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

// ─── Architecture diagram ─────────────────────────────────────────────────────
function ArchitectureDiagram({ layers }: { layers: ArchLayer[] }) {
  const mainLayers = layers.filter((l) => !l.isIntegration);
  const integrationLayers = layers.filter((l) => l.isIntegration);

  return (
    <div className="rounded-2xl bg-surface border border-border p-5 sm:p-7 overflow-x-auto hover:scale-[1.01] transition-transform duration-300 origin-center cursor-zoom-in">
      {/* Main flow row */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap min-w-max mx-auto">
        {mainLayers.map((layer, i) => (
          <div key={layer.id} className="flex items-center gap-2 sm:gap-3">
            <ArchNode layer={layer} />
            {i < mainLayers.length - 1 && (
              <ArrowRight size={14} className="text-muted shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Integration row */}
      {integrationLayers.length > 0 && (
        <div className="flex flex-col items-center mt-4 sm:mt-5">
          <ArrowDown size={14} className="text-muted mb-3" />
          <div className="flex gap-3 flex-wrap justify-center">
            {integrationLayers.map((layer) => (
              <ArchNode key={layer.id} layer={layer} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Section divider ─────────────────────────────────────────────────────────
function Divider() {
  return <div className="h-px bg-surface mx-8" />;
}

// ─── Section heading ─────────────────────────────────────────────────────────
function SectionHeading({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-[3px] h-5 rounded-full shrink-0" style={{ background: color }} />
      <h3 className="text-base sm:text-lg font-semibold text-foreground">{children}</h3>
    </div>
  );
}

// ─── Main modal ───────────────────────────────────────────────────────────────
interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const scrollRafRef = useRef<number | null>(null);

  const cs = project.caseStudy!;

  // ESC key
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [onClose]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Reset scroll progress on open
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    if (progressRef.current) progressRef.current.style.transform = "scaleX(0)";
  }, [project.id]);

  const handleScroll = useCallback(() => {
    if (scrollRafRef.current !== null) return;

    scrollRafRef.current = requestAnimationFrame(() => {
      if (!scrollRef.current || !progressRef.current) {
        scrollRafRef.current = null;
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const max = scrollHeight - clientHeight;
      const progress = max > 0 ? Math.min(scrollTop / max, 1) : 0;
      progressRef.current.style.transform = `scaleX(${progress})`;
      scrollRafRef.current = null;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (scrollRafRef.current !== null) {
        cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel wrapper — centres panel, absorbs backdrop clicks */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-5 pointer-events-none">
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} case study`}
          className="relative w-full sm:max-w-4xl max-h-[94dvh] sm:max-h-[88vh] rounded-t-[28px] sm:rounded-3xl bg-background border border-border flex flex-col overflow-hidden pointer-events-auto"
          initial={{ opacity: 0, scale: 0.97, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Progress bar ───────────────────────────────────────────── */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-surface z-20 rounded-full overflow-hidden">
            <motion.div
              ref={progressRef}
              className="h-full bg-electric rounded-full"
              style={{ transform: "scaleX(0)", transformOrigin: "left" }}
            />
          </div>

          {/* ── Close button ───────────────────────────────────────────── */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/85 text-muted-foreground shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-surface hover:text-foreground sm:right-4 sm:top-4"
            aria-label="Close case study"
          >
            <X size={16} />
          </button>

          {/* ── Scrollable content ─────────────────────────────────────── */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto overscroll-contain"
          >
            {/* ── 1. Hero ──────────────────────────────────────────────── */}
            <motion.section
              custom={0}
              variants={sectionVariant}
              initial="hidden"
              animate="visible"
            >
              {/* Screenshot */}
              <div className="relative w-full aspect-[16/7] overflow-hidden bg-surface-light">
                <img
                  src={project.image}
                  alt={`${project.title} case study preview screenshot`}
                  width={1600}
                  height={700}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover opacity-75"
                />
                <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-[#0f0f14] via-[#0f0f14]/30 to-transparent" />
              </div>

              <div className="px-6 sm:px-10 pb-8 pt-5">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cs.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider px-2.5 py-[3px] rounded-full bg-electric/[0.08] border border-electric/[0.16] text-electric/80 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 leading-tight">
                  {project.title}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-2xl leading-relaxed">
                  {cs.overview}
                </p>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-3">
                  {project.live && (
                    <MagneticButton
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-electric text-foreground text-sm font-medium hover:bg-electric/85 transition-colors duration-200"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </MagneticButton>
                  )}
                  {project.github && (
                    <MagneticButton
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border text-foreground text-sm font-medium hover:bg-white/[0.1] transition-colors duration-200"
                    >
                      <Github size={14} />
                      GitHub
                    </MagneticButton>
                  )}
                </div>
              </div>
            </motion.section>

            <Divider />

            {/* ── 2. Problem ───────────────────────────────────────────── */}
            <motion.section
              custom={1}
              variants={sectionVariant}
              initial="hidden"
              animate="visible"
              className="px-6 sm:px-10 py-8"
            >
              <SectionHeading color="rgba(239,68,68,0.7)">The Problem</SectionHeading>
              <ul className="space-y-3">
                {cs.problem.map((item, i) => (
                  <motion.li
                    key={i}
                    custom={1 + i * 0.3}
                    variants={sectionVariant}
                    initial="hidden"
                    animate="visible"
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-red-500/50 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.section>

            <Divider />

            {/* ── 3. Solution ──────────────────────────────────────────── */}
            <motion.section
              custom={2}
              variants={sectionVariant}
              initial="hidden"
              animate="visible"
              className="px-6 sm:px-10 py-8"
            >
              <SectionHeading color="rgba(59,130,246,0.7)">My Approach</SectionHeading>
              <p className="text-sm text-muted-foreground leading-relaxed">{cs.solution}</p>
            </motion.section>

            <Divider />

            {/* ── 4. Architecture ──────────────────────────────────────── */}
            <motion.section
              custom={3}
              variants={sectionVariant}
              initial="hidden"
              animate="visible"
              className="px-6 sm:px-10 py-8"
            >
              <SectionHeading color="rgba(168,85,247,0.7)">Architecture</SectionHeading>
              <ArchitectureDiagram layers={cs.architecture} />
            </motion.section>

            <Divider />

            {/* ── 5. Key Features ──────────────────────────────────────── */}
            <motion.section
              custom={4}
              variants={sectionVariant}
              initial="hidden"
              animate="visible"
              className="px-6 sm:px-10 py-8"
            >
              <SectionHeading color="rgba(59,130,246,0.7)">Key Features</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {cs.features.map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    custom={4 + i * 0.25}
                    variants={sectionVariant}
                    initial="hidden"
                    animate="visible"
                    className="p-4 rounded-2xl bg-surface border border-border hover:border-electric/[0.2] transition-colors duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-electric/[0.1] border border-electric/[0.18] flex items-center justify-center text-electric mb-3">
                      {ICON_MAP[feature.icon] ?? <Zap size={16} />}
                    </div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <Divider />

            {/* ── 6. Challenges ────────────────────────────────────────── */}
            <motion.section
              custom={5}
              variants={sectionVariant}
              initial="hidden"
              animate="visible"
              className="px-6 sm:px-10 py-8"
            >
              <SectionHeading color="rgba(245,158,11,0.7)">Engineering Challenges I Solved</SectionHeading>
              <div className="space-y-3">
                {cs.challenges.map((ch, i) => (
                  <motion.div
                    key={ch.title}
                    custom={5 + i * 0.25}
                    variants={sectionVariant}
                    initial="hidden"
                    animate="visible"
                    className="p-5 rounded-2xl bg-surface border border-border border-l-[3px]"
                    style={{ borderLeftColor: "rgba(245,158,11,0.45)" }}
                  >
                    <h4 className="text-sm font-semibold text-foreground mb-1.5">{ch.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{ch.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <Divider />

            {/* ── 7. Tech Stack ────────────────────────────────────────── */}
            <motion.section
              custom={6}
              variants={sectionVariant}
              initial="hidden"
              animate="visible"
              className="px-6 sm:px-10 py-8 pb-12"
            >
              <SectionHeading color="rgba(34,197,94,0.7)">Tech Stack</SectionHeading>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                {cs.techStack.map((cat) => (
                  <div key={cat.category}>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-2.5 font-mono">
                      {cat.category}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((item) => (
                        <span
                          key={item}
                          className="text-[11px] px-2.5 py-[3px] rounded-full bg-surface border border-border text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Scroll end indicator */}
              <div className="flex items-center gap-3 mt-10 pt-6 border-t border-border">
                <div className="flex-1 h-px bg-surface" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted">
                  End of Case Study
                </span>
                <div className="flex-1 h-px bg-surface" />
              </div>
            </motion.section>
          </div>
        </motion.div>
      </div>
    </>
  );
}
