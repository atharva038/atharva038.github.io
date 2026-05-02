import { motion } from "framer-motion";
import { Server, Brain, Code } from "lucide-react";

export default function OpenToWork() {
  return (
    <section id="open-to-work" className="py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-8 sm:p-12 md:p-16 rounded-3xl relative overflow-hidden text-center group"
        >
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-electric/10 rounded-full blur-[80px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
          
          <div className="inline-flex flex-col items-center mb-8 relative z-10">
            <span className="px-4 py-1.5 text-xs sm:text-sm font-mono tracking-widest uppercase border border-electric/30 bg-electric/5 text-foreground rounded-full mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
              Open to Work
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gradient-heading tracking-tight mb-6">
              Let's Build Something Extraordinary
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
              I am actively looking for new opportunities. I can build tailored full-stack solutions exactly to your needs, specializing in <span className="text-foreground font-medium">robust backend architectures</span> and <span className="text-foreground font-medium">intelligent AI agents</span>.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 relative z-10 max-w-4xl mx-auto mt-10">
            {[
              {
                icon: <Code className="w-6 h-6" />,
                title: "Custom Solutions",
                desc: "Tailored content and features built precisely for your business needs."
              },
              {
                icon: <Server className="w-6 h-6" />,
                title: "Backend Systems",
                desc: "Scalable, secure, and high-performance server-side architectures."
              },
              {
                icon: <Brain className="w-6 h-6" />,
                title: "AI Agents",
                desc: "Intelligent, agentic AI solutions to automate and enhance workflows."
              }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="glass p-6 rounded-2xl flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-electric/10 text-electric flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm shadow-sm text-muted-foreground font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-12 relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <a 
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium transition-colors bg-foreground text-background hover:bg-foreground/90 rounded-2xl gap-2 font-mono uppercase tracking-widest"
            >
              Start the Conversation
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
