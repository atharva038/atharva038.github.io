import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Mail, Linkedin } from "lucide-react";
import { personalInfo } from "@/data/portfolio-data";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-24"
        >
          <span className="text-electric text-sm font-mono tracking-widest uppercase mb-3 block opacity-80">
            The Endgame
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-gradient-heading">
            Your Move
          </h2>
          <p className="text-base sm:text-lg font-light text-muted-foreground mt-4 max-w-lg mx-auto">
            The board is set. Let's make the next move together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 sm:gap-10">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3 space-y-4 sm:space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = `mailto:${personalInfo.email}?subject=Hello from ${form.name}&body=${form.message}`;
            }}
          >
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm text-muted-foreground mb-1.5">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-2xl glass border border-white/10 text-foreground placeholder:text-muted focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all duration-300"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm text-muted-foreground mb-1.5">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-2xl glass border border-white/10 text-foreground placeholder:text-muted focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all duration-300"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs sm:text-sm text-muted-foreground mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-2xl glass border border-white/10 text-foreground placeholder:text-muted focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all duration-300 resize-none"
                placeholder="Let's build something great..."
              />
            </div>
            <button
              type="submit"
              className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-white text-background font-semibold rounded-xl hover:bg-electric hover:text-white hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group w-full sm:w-auto"
            >
              <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              Send Message
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-5 sm:space-y-6"
          >
            <div className="glass-panel p-6 sm:p-8 rounded-3xl group relative overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-electric/10 rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2 group-hover:bg-electric/20 transition-colors duration-500" />
              <h3 className="font-serif font-bold text-foreground mb-6 sm:mb-8 text-2xl sm:text-3xl relative z-10 text-center sm:text-left">
                Connect
              </h3>
              <div className="space-y-6 relative z-10 flex flex-col items-center sm:items-start text-center sm:text-left">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-muted-foreground hover:text-electric transition-colors"
                >
                  <div className="p-2 rounded-lg bg-white/5">
                    <Github size={20} />
                  </div>
                  <span className="text-sm sm:text-base">atharva038</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-muted-foreground hover:text-electric transition-colors"
                >
                  <div className="p-2 rounded-lg bg-white/5">
                    <Linkedin size={20} />
                  </div>
                  <span className="text-sm sm:text-base">Atharva Joshi</span>
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-4 text-muted-foreground hover:text-electric transition-colors"
                >
                  <div className="p-2 rounded-lg bg-white/5">
                    <Mail size={20} />
                  </div>
                  <span className="text-sm sm:text-base break-all">{personalInfo.email}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
