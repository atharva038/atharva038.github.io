import { motion } from "framer-motion";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  Code2,
  Folder,
  Globe2,
  Server,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { personalInfo } from "@/data/portfolio-data";
import { NOISE_PNG } from "@/lib/noise-texture";
import MagneticButton from "@/components/ui/MagneticButton";

const availability = [
  {
    icon: BriefcaseBusiness,
    title: "Full-time / Intern roles",
    description: "Looking for impactful teams and exciting problems",
  },
  {
    icon: Globe2,
    title: "Freelance projects",
    description: "Available for product sites, dashboards, and MVP builds",
  },
  {
    icon: UsersRound,
    title: "Startup collaborations",
    description: "Love working with builders, founders, and early teams",
  },
];

const capabilities = [
  {
    icon: Code2,
    title: "Beautiful Frontend",
    description:
      "Pixel-perfect UI, animations, responsive layouts, and modern user experiences.",
    accent: "from-[#F5D000]/18 via-lime-300/8 to-transparent",
    iconClass: "text-[#F5D000] bg-[#F5D000]/10 border-[#F5D000]/30",
    borderClass:
      "hover:border-[#F5D000]/55 hover:shadow-[0_0_36px_rgba(245,208,0,0.14)]",
  },
  {
    icon: Server,
    title: "Robust Backend",
    description:
      "Scalable APIs, database design, secure systems, and production-ready architecture.",
    accent: "from-purple-400/14 via-purple-400/6 to-transparent",
    iconClass: "text-purple-400 bg-purple-400/10 border-purple-400/30",
    borderClass:
      "hover:border-purple-400/45 hover:shadow-[0_0_36px_rgba(168,85,247,0.13)]",
  },
  {
    icon: Bot,
    title: "AI Systems",
    description:
      "Automation workflows, smart integrations, AI agents, and intelligent product systems.",
    accent: "from-emerald-400/14 via-emerald-400/6 to-transparent",
    iconClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    borderClass:
      "hover:border-emerald-400/45 hover:shadow-[0_0_36px_rgba(52,211,153,0.13)]",
  },
];

const folders = ["api/", "routes/", "controllers/", "models/", "services/", "utils/"];

export default function OpenToWork() {
  return (
    <section
      id="open-to-work"
      className="relative scroll-mt-28 overflow-hidden bg-transparent px-4 pb-16 pt-28 text-foreground sm:px-6 sm:pb-24 sm:pt-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] dark:opacity-0 blkdev:opacity-[0.12]"
        style={{ backgroundImage: `url(${NOISE_PNG})` }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] dark:opacity-0 blkdev:opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(var(--theme-border) 1px, transparent 1px), linear-gradient(90deg, var(--theme-border) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/10 blur-[120px] dark:bg-electric/[0.035]" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel relative z-10 mx-auto max-w-7xl overflow-hidden rounded-none p-5 sm:p-8 lg:p-10 xl:p-12 dark:rounded-[2rem] blkdev:rounded-none"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(245,208,0,0.11),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(168,85,247,0.08),transparent_30%),radial-gradient(circle_at_76%_78%,rgba(34,197,94,0.08),transparent_30%)] opacity-70 dark:opacity-40" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/70 to-transparent" />

        <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.3fr] lg:gap-12">
          <div className="flex min-w-0 flex-col justify-between">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.08)] light:rounded-none blkdev:rounded-none">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.75)]" />
                Open to Work + Freelance
              </div>

              <h2 className="max-w-3xl text-4xl font-serif font-black leading-[0.98] tracking-tight text-foreground sm:text-5xl xl:text-6xl">
                Designing{" "}
                <span className="text-electric">Beautiful Frontends.</span>{" "}
                Engineering{" "}
                <span className="text-foreground underline decoration-electric/45 decoration-4 underline-offset-[0.18em]">
                  Powerful Systems.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
                I build high-performance websites and robust backend architectures,
                including AI-driven and automation-based systems.
              </p>

              <div className="glass mt-8 grid gap-3 rounded-none p-4 sm:grid-cols-2 dark:rounded-3xl">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-none border border-emerald-400/25 bg-emerald-400/10 text-emerald-400 dark:rounded-2xl">
                    <Sparkles size={19} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Available Now</p>
                    <p className="text-xs text-muted-foreground">Open for new opportunities</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-t border-border pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
                  <span className="flex h-10 w-10 items-center justify-center rounded-none border border-[#F5D000]/30 bg-[#F5D000]/10 text-[#F5D000] dark:rounded-2xl">
                    <CalendarDays size={19} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Also Taking</p>
                    <p className="text-xs text-muted-foreground">Freelance and startup work</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {availability.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + index * 0.08, duration: 0.45 }}
                      className="flex items-start gap-4"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-border bg-surface text-muted-foreground dark:rounded-2xl">
                        <Icon size={19} />
                      </span>
                      <span>
                        <span className="block text-base font-semibold text-foreground">
                          {item.title}
                        </span>
                        <span className="text-sm text-muted-foreground">{item.description}</span>
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              <MagneticButton
                href="#contact"
                className="group inline-flex w-full min-h-14 items-center justify-center gap-2 whitespace-nowrap border border-electric bg-electric px-4 py-3 text-sm font-bold text-background shadow-[var(--glass-btn-shadow-full)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--glass-btn-hover-shadow-full)]"
              >
                Hire Me
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </MagneticButton>
              <MagneticButton
                href="#experience"
                className="glass-button inline-flex w-full min-h-14 items-center justify-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-semibold text-foreground"
              >
                View Resume
                <ArrowDownToLine size={17} />
              </MagneticButton>
              <MagneticButton
                href={`mailto:${personalInfo.email}?subject=Quick%20call%20with%20Atharva&body=Hi%20Atharva%2C%20I%27d%20like%20to%20schedule%20a%20call%20about...`}
                className="glass-button inline-flex w-full min-h-14 items-center justify-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-semibold text-foreground"
              >
                Schedule a Call
                <ArrowRight size={17} />
              </MagneticButton>
            </div>
          </div>

          <div className="min-w-0 space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              {capabilities.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.08, duration: 0.5 }}
                    className={`glass group relative min-h-[15.5rem] overflow-hidden rounded-none p-6 transition-all duration-300 hover:-translate-y-1 dark:rounded-3xl ${item.borderClass}`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
                    />
                    <div className="relative z-10 flex h-full flex-col">
                      <span
                        className={`mb-8 flex h-13 w-13 items-center justify-center rounded-none border dark:rounded-2xl ${item.iconClass}`}
                      >
                        <Icon size={27} />
                      </span>
                      <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                      <ArrowRight
                        size={18}
                        className="mt-auto text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground"
                      />
                    </div>
                  </motion.article>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.55 }}
              className="glass overflow-hidden rounded-none dark:rounded-3xl"
            >
              <div className="flex items-center gap-2 border-b border-border px-5 py-4">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-[#F5D000]" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">
                  architecture.config.js
                </span>
              </div>

              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="border-b border-border p-6 lg:border-b-0 lg:border-r">
                  <p className="max-w-sm text-2xl font-bold leading-tight text-foreground">
                    Building scalable solutions with{" "}
                    <span className="text-electric">clean code</span> and{" "}
                    <span className="text-purple-400">smart architecture</span>.
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-2 font-mono text-xs text-muted-foreground sm:grid-cols-3 lg:grid-cols-2">
                    {folders.map((folder) => (
                      <div
                        key={folder}
                        className="flex items-center gap-2 border border-border bg-surface px-3 py-2 dark:rounded-xl"
                      >
                        <Folder size={14} className="text-purple-400/80" />
                        {folder}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <pre className="overflow-x-auto font-mono text-[12px] leading-6 text-muted-foreground sm:text-[13px]">
                    <code>
                      <span className="text-purple-400">const</span>{" "}
                      <span className="text-foreground">architecture</span>{" "}
                      <span className="text-muted-foreground">=</span>{" "}
                      <span className="text-muted-foreground">{"{"}</span>
                      {"\n  "}
                      <span className="text-[#e85d75]">frontend</span>:{" "}
                      <span className="text-emerald-400">"React + Next.js"</span>,
                      {"\n  "}
                      <span className="text-[#e85d75]">backend</span>:{" "}
                      <span className="text-emerald-400">"Node.js + Express"</span>,
                      {"\n  "}
                      <span className="text-[#e85d75]">database</span>:{" "}
                      <span className="text-emerald-400">"MongoDB / SQL"</span>,
                      {"\n  "}
                      <span className="text-[#e85d75]">ai</span>:{" "}
                      <span className="text-emerald-400">"Agents + Automation"</span>,
                      {"\n  "}
                      <span className="text-[#e85d75]">deployment</span>:{" "}
                      <span className="text-emerald-400">"Vercel / AWS"</span>
                      {"\n"}
                      <span className="text-muted-foreground">{"};"}</span>
                    </code>
                  </pre>
                </div>
              </div>

              <div className="grid border-t border-border sm:grid-cols-[1fr_1.2fr]">
                <div className="flex flex-col items-start gap-3 border-b border-border px-5 py-4 sm:border-b-0 sm:border-r">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.65)]" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Explore</p>
                      <p className="text-sm font-semibold text-foreground">Selected projects</p>
                    </div>
                  </div>
                  <MagneticButton
                    href="#projects"
                    className="group inline-flex min-h-10 items-center justify-center gap-2 border border-electric/50 bg-electric px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-background shadow-[var(--glass-btn-hover-shadow-full)] transition-all duration-300 hover:border-electric"
                  >
                    My work
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </MagneticButton>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 px-5 py-4 text-sm text-muted-foreground">
                  <span className="text-xs uppercase tracking-[0.22em]">Focus</span>
                  <span className="text-foreground">Scalable</span>
                  <span>Reliable</span>
                  <span>User-first</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
