import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Medal, Star, Flame, Crown, Zap, Bot, CheckCheck, MessageSquare } from "lucide-react";
import { achievements } from "@/data/portfolio-data";

const iconMap = {
  trophy: Trophy,
  medal: Medal,
  star: Star,
  flame: Flame,
  crown: Crown,
  zap: Zap,
} as const;

const glowColors: Record<string, string> = {
  trophy: "from-amber-500/20 to-yellow-500/5",
  medal: "from-slate-300/20 to-slate-400/5",
  star: "from-violet-400/20 to-purple-500/5",
  flame: "from-orange-500/20 to-red-500/5",
  crown: "from-yellow-400/20 to-amber-500/5",
  zap: "from-cyan-400/20 to-blue-500/5",
};

const accentColors: Record<string, string> = {
  trophy: "text-amber-400",
  medal: "text-slate-300",
  star: "text-violet-400",
  flame: "text-orange-400",
  crown: "text-yellow-400",
  zap: "text-cyan-400",
};

const bgAccentColors: Record<string, string> = {
  trophy: "bg-amber-500/10 border-amber-500/20",
  medal: "bg-slate-300/10 border-slate-400/20",
  star: "bg-violet-400/10 border-violet-500/20",
  flame: "bg-orange-500/10 border-orange-500/20",
  crown: "bg-yellow-400/10 border-yellow-500/20",
  zap: "bg-cyan-400/10 border-cyan-500/20",
};

// Typewriter hook for the chat description
const useTypewriter = (text: string, start: boolean, speed = 15) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!start) {
      setDisplayedText("");
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, start, speed]);

  return { displayedText, isTyping };
};

const ChatBubble = ({ 
  achievement, 
  index 
}: { 
  achievement: typeof achievements[0]; 
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  // Start typing slightly after the bubble animates in
  const [startTyping, setStartTyping] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setStartTyping(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const { displayedText, isTyping } = useTypewriter(achievement.description, startTyping, 20);
  const Icon = iconMap[achievement.icon];
  
  const isEven = index % 2 === 0;

  return (
    <div 
      ref={ref}
      className={`relative flex w-full mb-12 sm:mb-24 ${isEven ? 'md:justify-start' : 'md:justify-end'}`}
    >
      {/* Timeline Node - Only visible on desktop in the center */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center z-10 w-12 h-12">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className={`w-10 h-10 rounded-full border-2 bg-background flex items-center justify-center ${bgAccentColors[achievement.icon]} relative`}
        >
          {/* Pulse effect */}
          {startTyping && isTyping && (
             <span className={`absolute inset-0 rounded-full animate-ping opacity-30 ${bgAccentColors[achievement.icon]}`} />
          )}
          <Icon size={16} className={`${accentColors[achievement.icon]}`} />
        </motion.div>
      </div>

      {/* Message Container */}
      <motion.div
        initial={{ opacity: 0, y: 50, x: isEven ? -50 : 50 }}
        animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 50, x: isEven ? -50 : 50 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        className={`w-[95%] sm:w-[90%] md:w-[45%] relative group`}
      >
        {/* Glow behind the card */}
        <div 
          className={`absolute inset-0 bg-gradient-radial ${glowColors[achievement.icon]} rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} 
        />

        {/* The Card */}
        <div className={`relative backdrop-blur-xl bg-surface/60 border border-border/50 overflow-hidden transition-all duration-300 shadow-2xl ${
          isEven ? 'rounded-2xl rounded-tr-md sm:rounded-3xl sm:rounded-tr-xl' : 'rounded-2xl rounded-tl-md sm:rounded-3xl sm:rounded-tl-xl md:rounded-tr-3xl md:rounded-tl-xl md:rounded-bl-3xl md:rounded-br-xl'
        }`}>
          {/* Header Area */}
          <div className="flex items-center justify-between px-4 pt-4 pb-3 sm:px-5 sm:pt-5 sm:pb-3 border-b border-border/30 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-inner">
                <Bot size={16} className="text-white drop-shadow-md" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground/90 tracking-wide">System_Log</p>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1.5 font-mono">
                  <span className={`w-1.5 h-1.5 rounded-full ${isTyping ? 'bg-green-500 animate-pulse' : 'bg-green-500/50'}`} /> 
                  {isTyping ? 'Drafting...' : 'Delivered'}
                </p>
              </div>
            </div>
            <div className="text-[10px] font-mono text-muted flex items-center gap-1.5">
              {achievement.year}
              <CheckCheck size={14} className={startTyping && !isTyping ? "text-blue-400" : "text-muted/50"} />
            </div>
          </div>

          {/* Body Area */}
          <div className="p-4 sm:p-5 md:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {/* Icon/Rank display for mobile or inside card */}
              <div className={`hidden sm:flex w-12 h-12 rounded-xl shrink-0 items-center justify-center border shadow-inner ${bgAccentColors[achievement.icon]}`}>
                <Icon size={24} className={accentColors[achievement.icon]} />
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className={`sm:hidden w-8 h-8 rounded-lg shrink-0 flex items-center justify-center border ${bgAccentColors[achievement.icon]}`}>
                     <Icon size={16} className={accentColors[achievement.icon]} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight">
                    {achievement.title}
                  </h3>
                  {achievement.rank && (
                    <span className={`px-2 py-0.5 text-[10px] sm:text-xs font-mono font-semibold rounded-full border shadow-sm ${bgAccentColors[achievement.icon]} ${accentColors[achievement.icon]}`}>
                      {achievement.rank}
                    </span>
                  )}
                </div>
                
                <p className="text-xs font-medium text-accent-dim">
                  {achievement.event}
                </p>
                
                {/* Typing Text Area */}
                <div className="relative mt-3 min-h-[60px] text-sm text-muted-foreground leading-relaxed">
                  {displayedText}
                  {isTyping && (
                     <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-primary animate-pulse" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Edge line */}
          <div className="absolute left-0 bottom-0 w-full h-[2px] overflow-hidden">
             <motion.div 
               className={`h-full w-full bg-gradient-to-r ${glowColors[achievement.icon].replace("/20", "/60").replace("/5", "/10")}`}
               initial={{ x: "-100%" }}
               animate={startTyping && !isTyping ? { x: "0%" } : { x: "-100%" }}
               transition={{ duration: 0.8, ease: "easeOut" }}
             />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden bg-background">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
        
        {/* Subtle grid pattern for tactical feel */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] opacity-50" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 md:mb-32"
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-surface shadow-inner border border-border/50 text-xs font-mono text-accent-dim">
            <MessageSquare size={14} className="text-primary animate-pulse" />
            <span>Incoming_Transmissions</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gradient-heading tracking-tight mb-6">
            The Trophy Room
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            A conversational log of checkmates, victories, and milestones earned along the journey of building and creating.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Line (Desktop) & Left Line (Mobile) */}
          <div className="absolute left-[24px] md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-border/50 to-transparent md:-translate-x-1/2" />

          <div className="flex flex-col relative pl-14 md:pl-0">
            {achievements.map((achievement, index) => (
              <ChatBubble key={achievement.id} achievement={achievement} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
