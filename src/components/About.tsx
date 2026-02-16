import { motion } from "framer-motion";
import { GraduationCap, Target } from "lucide-react";
import { personalInfo, stats } from "@/data/portfolio-data";
import { ChessKing, ChessRook, ChessKnight, ChessPawn } from "@/components/ui/chess-pieces";

const pieceMap = {
  king: ChessKing,
  rook: ChessRook,
  knight: ChessKnight,
  pawn: ChessPawn,
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-dim text-sm font-mono tracking-widest uppercase">
            The Middlegame
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-3 text-gradient-heading">
            About Me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              {personalInfo.bio}
            </p>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-border">
              <GraduationCap className="text-accent-muted mt-1 shrink-0" size={20} />
              <div>
                <p className="font-semibold text-foreground">
                  {personalInfo.degree}
                </p>
                <p className="text-sm text-muted-foreground">
                  {personalInfo.college}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-border">
              <Target className="text-accent-muted mt-1 shrink-0" size={20} />
              <div>
                <p className="font-semibold text-foreground">The Endgame Goal</p>
                <p className="text-sm text-muted-foreground italic">
                  "{personalInfo.goal}"
                </p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => {
                const PieceIcon = pieceMap[stat.piece];
                return (
                  <motion.div
                    key={stat.label}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="p-5 rounded-xl bg-surface border border-border text-center hover:border-border-hover transition-colors"
                  >
                    <div className="flex justify-center mb-2 text-accent-muted">
                      <PieceIcon size={36} />
                    </div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-5 rounded-xl bg-surface border border-border text-center"
            >
              <p className="text-muted-foreground italic font-serif text-lg">
                "In chess, as in life, the best move is always the one you make
                next."
              </p>
              <span className="text-xs text-accent-dim mt-2 block">
                My Philosophy
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
