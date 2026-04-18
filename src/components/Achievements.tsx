import { motion } from "framer-motion";
import { achievements } from "@/data/portfolio-data";
import {
  ChessKing,
  ChessQueen,
  ChessRook,
  ChessKnight,
  ChessBishop,
  ChessPawn,
} from "@/components/ui/chess-pieces";

const pieceMap = {
  king: ChessKing,
  queen: ChessQueen,
  rook: ChessRook,
  knight: ChessKnight,
  bishop: ChessBishop,
  pawn: ChessPawn,
} as const;

// Helper to determine bento grid spanning classes
function getBentoClasses(index: number) {
  switch (index) {
    case 0:
      return "md:col-span-2 min-h-[280px]";
    case 1:
      return "md:col-span-1 min-h-[280px]";
    case 2:
      return "md:col-span-1 min-h-[240px]";
    case 3:
      return "md:col-span-2 min-h-[240px]";
    case 4:
      return "md:col-span-2 min-h-[240px]";
    case 5:
      return "md:col-span-1 min-h-[240px]";
    default:
      return "md:col-span-1 min-h-[240px]";
  }
}

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 sm:py-32 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-24"
        >
          <span className="text-purple-400 text-sm font-mono tracking-widest uppercase mb-3 block opacity-80">
            The Grandmaster Circle
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-gradient-heading">
            Achievements
          </h2>
          <p className="text-base sm:text-lg font-light text-muted-foreground mt-4 max-w-lg mx-auto">
            Notable victories and milestones from the battlefield.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 auto-rows-fr">
          {achievements.map((achievement, index) => {
            const PieceComponent = pieceMap[achievement.piece ?? "pawn"];

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 40,
                }}
                className={`glass-panel rounded-3xl p-6 sm:p-8 group hover:-translate-y-2 transition-all duration-500 relative overflow-hidden flex flex-col justify-end ${getBentoClasses(
                  index
                )}`}
              >
                {/* Accent Glows */}
                <div className="absolute inset-0 bg-gradient-to-br from-electric/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Massive Background Chess Piece Watermark */}
                <div className="absolute -bottom-8 -right-8 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 pointer-events-none transform group-hover:scale-110 group-hover:-rotate-12">
                  <PieceComponent size={index === 0 || index === 1 ? 320 : 200} />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Top: Rank Edge Badge */}
                  <div className="flex items-start justify-end mb-6 min-h-[28px]">
                    {achievement.rank && (
                      <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-electric/10 text-electric border border-electric/20 backdrop-blur-md">
                        {achievement.rank}
                      </span>
                    )}
                  </div>

                  {/* Bottom: Text */}
                  <div>
                    <h3
                      className={`font-semibold text-foreground leading-tight mb-2 ${
                        index === 0 ? "text-2xl sm:text-4xl" : "text-xl sm:text-2xl"
                      }`}
                    >
                      {achievement.title}
                    </h3>
                    <p className="text-electric/80 font-mono text-xs sm:text-sm mb-3">
                      {achievement.event} &bull; {achievement.year}
                    </p>
                    <p
                      className={`text-muted-foreground font-light leading-relaxed line-clamp-3 ${
                        index === 0 || index === 1 ? "text-sm sm:text-base" : "text-xs sm:text-sm"
                      }`}
                    >
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
