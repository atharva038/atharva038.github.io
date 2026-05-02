import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { personalInfo, stats } from "@/data/portfolio-data";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, type: "spring", stiffness: 50 },
  }),
};

export default function About() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-24"
        >
          <span className="text-electric text-sm font-mono tracking-widest uppercase mb-3 block opacity-80">
            The Middlegame
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gradient-heading tracking-tight">
            About Me
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden group">
              <div className="hidden dark:block absolute top-0 right-0 w-64 h-64 bg-electric/10 rounded-full blur-[60px] transform translate-x-1/2 -translate-y-1/2 transition-transform duration-700 group-hover:scale-150" />
              
              <p className="text-lg sm:text-xl text-foreground leading-relaxed font-light relative z-10">
                {personalInfo.bio}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="glass p-6 sm:p-8 rounded-3xl flex flex-col justify-center group hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
                <div className="hidden dark:block absolute top-0 right-0 w-32 h-32 bg-electric/10 rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />
                <p className="text-xs font-mono tracking-[0.2em] uppercase text-electric mb-2 relative z-10">
                  Education
                </p>
                <div className="relative z-10">
                  <p className="font-semibold text-foreground text-lg sm:text-xl">
                    {personalInfo.degree}
                  </p>
                  <p className="text-base text-muted-foreground mt-1 font-light">
                    {personalInfo.college}
                  </p>
                </div>
              </div>

              <div className="glass p-6 sm:p-8 rounded-3xl flex flex-col justify-center group hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
                <div className="hidden dark:block absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] translate-x-1/4 translate-y-1/4 group-hover:scale-150 transition-transform duration-700" />
                <p className="text-xs font-mono tracking-[0.2em] uppercase text-purple-400 mb-2 relative z-10">
                  Mission
                </p>
                <div className="relative z-10">
                  <p className="font-semibold text-foreground text-lg sm:text-xl line-clamp-1">
                    The Endgame Goal
                  </p>
                  <p className="text-base text-muted-foreground mt-1 italic font-light">
                    "{personalInfo.goal}"
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, i) => {
                return (
                  <motion.div
                    key={stat.label}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="glass p-8 sm:p-10 rounded-3xl text-left group relative overflow-hidden flex flex-col justify-end min-h-[160px]"
                  >
                    <div className="hidden dark:block absolute inset-0 bg-gradient-to-br from-surface to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <p className="text-4xl sm:text-5xl font-bold text-foreground mb-2 relative z-10 tracking-tight group-hover:scale-105 group-hover:text-electric origin-left transition-all duration-300">
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-[0.15em] font-medium relative z-10">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="glass-panel p-8 sm:p-10 rounded-3xl text-center relative overflow-hidden"
            >
              <div className="hidden dark:block absolute -left-10 w-32 h-32 bg-purple-500/20 blur-[50px] rounded-full" />
              <p className="text-foreground italic font-serif text-lg sm:text-xl lg:text-2xl leading-relaxed relative z-10">
                "In chess, as in life, the best move is always the one you make
                next."
              </p>
              <span className="text-sm text-electric mt-4 block font-medium tracking-wide uppercase relative z-10">
                My Philosophy
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
