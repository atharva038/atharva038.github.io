import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Mail, Linkedin } from "lucide-react";
import { personalInfo } from "@/data/portfolio-data";
import { ChessKing } from "@/components/ui/chess-pieces";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-dim text-sm font-mono tracking-widest uppercase">
            The Endgame
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-3 text-gradient-heading">
            Your Move
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            The board is set. Let's make the next move together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = `mailto:${personalInfo.email}?subject=Hello from ${form.name}&body=${form.message}`;
            }}
          >
            <div>
              <label htmlFor="name" className="block text-sm text-muted-foreground mb-1.5">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-accent-dim transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-muted-foreground mb-1.5">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-accent-dim transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-muted-foreground mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-accent-dim transition-colors resize-none"
                placeholder="Let's build something great..."
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-white text-background font-semibold rounded-xl hover:bg-accent-muted transition-colors flex items-center gap-2"
            >
              <Send size={16} />
              Send Message
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-6"
          >
            <div className="p-5 rounded-xl bg-surface border border-border">
              <h3 className="font-serif font-bold text-foreground mb-4">
                Connect
              </h3>
              <div className="space-y-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github size={18} />
                  <span className="text-sm">atharva038</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin size={18} />
                  <span className="text-sm">Atharva Joshi</span>
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail size={18} />
                  <span className="text-sm">{personalInfo.email}</span>
                </a>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-surface border border-border text-center">
              <div className="flex justify-center mb-3 text-accent-muted">
                <ChessKing size={40} />
              </div>
              <p className="text-sm text-muted-foreground italic font-serif">
                "The game of chess is not just about king & queen, it's about
                all 16 pieces working together."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
