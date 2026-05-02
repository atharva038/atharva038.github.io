import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Github, Mail, Linkedin } from "lucide-react";
import emailjs from "@emailjs/browser";
import { personalInfo } from "@/data/portfolio-data";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (submitStatus !== "success") return;
    const timer = setTimeout(() => setSubmitStatus("idle"), 5000);
    return () => clearTimeout(timer);
  }, [submitStatus]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_im12pji";
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_llw2pyt";
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "gCfpr50F88PRPOQbK";

      if (!templateId || !publicKey) {
        throw new Error("Missing EmailJS template ID or public key");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          message: form.message,
          to_name: personalInfo.shortName,
        },
        publicKey,
      );

      setSubmitStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
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
            onSubmit={handleSubmit}
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
                className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-2xl glass border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all duration-300"
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
                className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-2xl glass border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all duration-300"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-xs sm:text-sm text-muted-foreground mb-1.5">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-2xl glass border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all duration-300"
                placeholder="Your phone number"
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
                className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-2xl glass border border-border text-foreground placeholder:text-muted focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-all duration-300 resize-none"
                placeholder="Let's build something great..."
              />
            </div>
            <MagneticButton
              type="submit"
              disabled={isSubmitting}
              className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-foreground text-background font-semibold rounded-xl hover:bg-electric hover:text-foreground hover:shadow-[0_0_20px_var(--glow-color1)] transition-all duration-300 flex items-center justify-center gap-2 group w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </MagneticButton>

            {submitStatus === "success" && (
              <div className="rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-200">
                Message sent successfully. I will get back to you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                Failed to send message. Please try again or contact me directly via email.
              </div>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-5 sm:space-y-6"
          >
            <div className="glass-panel p-6 sm:p-8 rounded-3xl group relative overflow-hidden flex flex-col justify-center">
              <div className="hidden dark:block absolute top-0 right-0 w-32 h-32 bg-electric/10 rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2 group-hover:bg-electric/20 transition-colors duration-500" />
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
                  <div className="p-2 rounded-lg bg-surface">
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
                  <div className="p-2 rounded-lg bg-surface">
                    <Linkedin size={20} />
                  </div>
                  <span className="text-sm sm:text-base">Atharva Joshi</span>
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-4 text-muted-foreground hover:text-electric transition-colors"
                >
                  <div className="p-2 rounded-lg bg-surface">
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
