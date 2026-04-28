import { motion } from "framer-motion";
import { personalInfo, skillCategories, experiences, projects } from "@/data/portfolio-data";
import { Terminal } from "lucide-react";

export default function TerminalView() {
  const sequence = [
    { type: "cmd", text: "whoami" },
    { type: "out", text: `Name: ${personalInfo.name}\nRole: ${personalInfo.title}\nBio: ${personalInfo.bio}` },
    { type: "cmd", text: "cat skills.json" },
    { type: "out", text: JSON.stringify(skillCategories, null, 2) },
    { type: "cmd", text: "ls ./projects" },
    { type: "out", text: projects.map(p => p.title).join("   ") },
    { type: "cmd", text: "npm run get-experience" },
    { type: "out", text: JSON.stringify(experiences.map(e => ({ role: e.role, company: e.organization, highlights: e.highlights })), null, 2) },
    { type: "cmd", text: "echo $CONTACT_INFO" },
    { type: "out", text: `{\n  "email": "${personalInfo.email}",\n  "github": "${personalInfo.github}",\n  "linkedin": "${personalInfo.linkedin}"\n}` },
  ];

  return (
    <section className="pt-32 pb-20 px-4 min-h-screen max-w-5xl mx-auto flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-[#0A0A0A]/90 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 shadow-2xl flex-1 flex flex-col font-mono text-sm sm:text-base relative z-20"
      >
        {/* Terminal Header */}
        <div className="bg-[#1A1A1A] px-4 py-3 flex items-center border-b border-white/10 sticky top-0 z-10">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
          </div>
          <div className="flex-1 text-center text-xs text-white/50 flex items-center justify-center gap-2">
            <Terminal size={14} /> atharva@macbook-pro:~
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-6 lg:p-8 flex-1 text-green-400 overflow-x-auto">
          <div className="mb-6 text-white/50">
            Last login: {new Date().toString().split(' ').slice(0, 4).join(' ')} on ttys001<br/>
            Atharva's Interactive Terminal. All systems operational.
          </div>

          {sequence.map((line, i) => (
            <motion.div 
              key={i} 
              className="mb-6"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {line.type === "cmd" ? (
                <div className="flex items-center gap-2">
                  <span className="text-[#38bdf8] font-semibold">~/portfolio</span>
                  <span className="text-white/50">$</span>
                  <span className="text-white font-medium">{line.text}</span>
                </div>
              ) : (
                <div className="text-[#a6accd] mt-2 opacity-90 pl-4 border-l-2 border-white/10 whitespace-pre-wrap">
                  {line.text}
                </div>
              )}
            </motion.div>
          ))}
          
          {/* Blinking Cursor */}
          <motion.div 
            className="flex items-center gap-2 mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
             <span className="text-[#38bdf8] font-semibold">~/portfolio</span>
             <span className="text-white/50">$</span>
             <span className="w-2.5 h-5 bg-white animate-pulse"></span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
