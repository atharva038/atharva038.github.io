'use client';

import { motion } from 'framer-motion';
import { useMetroStore } from '@/store/useMetroStore';

interface Achievement {
  id: string;
  title: string;
  context: string;
  description: string;
  outcome: string;
  year: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'achievement-1',
    title: 'Built Full-Stack E-Commerce Platform',
    context: 'Freelance Project • Client Success Story',
    description: 'Developed and deployed a complete e-commerce solution with payment integration, inventory management, and analytics dashboard. Reduced client operational costs by 60% and processed $100k+ in transactions.',
    outcome: '5 Active Clients • $100k+ Transactions',
    year: '2024',
  },
  {
    id: 'achievement-2',
    title: 'Open Source Contribution Recognition',
    context: 'GitHub • Community Impact',
    description: 'Contributed critical bug fixes and features to popular open-source projects. Pull requests merged with 1000+ stars combined across repositories.',
    outcome: '1000+ GitHub Stars • 10+ Merged PRs',
    year: '2023',
  },
  {
    id: 'achievement-3',
    title: 'Hackathon Winner - Best Technical Implementation',
    context: 'State-Level Competition • 200+ Participants',
    description: 'Led a team to build a real-time collaboration tool with WebSocket integration and conflict-free editing. Judged on innovation, technical depth, and execution quality.',
    outcome: '1st Place • Technical Excellence Award',
    year: '2023',
  },
  {
    id: 'achievement-4',
    title: 'Performance Optimization Achievement',
    context: 'Production Application • User Impact',
    description: 'Reduced page load time from 4.2s to 1.1s through code splitting, lazy loading, and optimized bundle size. Improved Core Web Vitals scores by 85%.',
    outcome: '74% Load Time Reduction • 85% CWV Improvement',
    year: '2024',
  },
];

export function AchievementsStation() {
  const { currentStation, isMobile } = useMetroStore();
  const isActive = currentStation === 3;

  return (
    <section
      id="achievements"
      data-station={3}
      className={`station relative ${
        isMobile ? 'min-h-screen' : 'w-screen h-screen flex-shrink-0'
      } ${isMobile ? '' : 'overflow-y-auto'}`}
      style={{
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0a1f 50%, #0a0a0f 100%)',
        paddingTop: isMobile ? '96px' : '128px',
        paddingBottom: isMobile ? '96px' : '128px',
      }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(255, 159, 67, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(165, 94, 234, 0.15) 0%, transparent 50%),
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)
            `,
          }}
        />
      </div>

      {/* Main Content Container */}
      <div
        className="relative w-full"
        style={{
          maxWidth: '1280px',
          paddingLeft: isMobile ? '24px' : '40px',
          paddingRight: isMobile ? '24px' : '40px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {/* PAGE HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
          style={{
            marginBottom: isMobile ? '64px' : '96px',
          }}
        >
          {/* Label */}
          <div
            className="font-mono text-xs tracking-[0.3em] uppercase"
            style={{
              marginBottom: '12px',
              color: '#ff9f43',
              fontWeight: 600,
            }}
          >
            Milestones
          </div>

          {/* Main Heading */}
          <h2
            className="text-3xl md:text-5xl font-bold"
            style={{
              marginBottom: '16px',
              color: '#ffffff',
              fontFamily: 'Space Grotesk, sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            Achievements & Impact
          </h2>

          {/* Supporting Text */}
          <p
            className="text-base md:text-lg"
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.7',
              color: '#a0a0b0',
            }}
          >
            Key milestones that demonstrate technical depth, problem-solving ability, and measurable impact.
          </p>
        </motion.div>

        {/* ACHIEVEMENT TIMELINE */}
        <div className="relative">
          {/* Central Timeline Line */}
          {!isMobile && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
              style={{
                transformOrigin: 'top',
                background: 'linear-gradient(180deg, #ff9f43 0%, rgba(255, 159, 67, 0.3) 70%, transparent 100%)',
                filter: 'drop-shadow(0 0 8px rgba(255, 159, 67, 0.5))',
              }}
            />
          )}

          {/* Mobile Timeline Line */}
          {isMobile && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 top-0 bottom-0 w-0.5"
              style={{
                transformOrigin: 'top',
                background: 'linear-gradient(180deg, #ff9f43 0%, rgba(255, 159, 67, 0.3) 70%, transparent 100%)',
              }}
            />
          )}

          {/* Achievement Cards */}
          <div className="relative">
            {ACHIEVEMENTS.map((achievement, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + index * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative"
                  style={{
                    marginBottom: index === ACHIEVEMENTS.length - 1 ? '0' : isMobile ? '64px' : '80px',
                  }}
                >
                  {/* Desktop: Alternating Layout */}
                  {!isMobile && (
                    <div
                      className="flex items-center"
                      style={{
                        justifyContent: isLeft ? 'flex-start' : 'flex-end',
                      }}
                    >
                      {/* Card */}
                      <AchievementCard
                        achievement={achievement}
                        index={index}
                        isLeft={isLeft}
                      />

                      {/* Milestone Node */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 z-10"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.4 + index * 0.15 }}
                          className="relative"
                        >
                          {/* Node Circle */}
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{
                              background: '#ff9f43',
                              border: '4px solid #0a0a0f',
                              boxShadow: '0 0 20px rgba(255, 159, 67, 0.6), 0 0 40px rgba(255, 159, 67, 0.3)',
                            }}
                          />
                          
                          {/* Year Label */}
                          <div
                            className="absolute left-1/2 -translate-x-1/2 font-mono text-xs whitespace-nowrap"
                            style={{
                              top: isLeft ? '24px' : '-28px',
                              color: '#606070',
                              fontWeight: 600,
                            }}
                          >
                            {achievement.year}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {/* Mobile: Single Column */}
                  {isMobile && (
                    <div
                      className="relative"
                      style={{
                        paddingLeft: '28px',
                      }}
                    >
                      {/* Milestone Node */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.15 }}
                        className="absolute left-0 top-0 -translate-x-1/2"
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            background: '#ff9f43',
                            border: '3px solid #0a0a0f',
                            boxShadow: '0 0 15px rgba(255, 159, 67, 0.6)',
                          }}
                        />
                      </motion.div>

                      {/* Year Badge */}
                      <div
                        className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold"
                        style={{
                          marginBottom: '12px',
                          background: 'rgba(255, 159, 67, 0.1)',
                          color: '#ff9f43',
                          border: '1px solid rgba(255, 159, 67, 0.2)',
                        }}
                      >
                        {achievement.year}
                      </div>

                      {/* Card */}
                      <AchievementCard
                        achievement={achievement}
                        index={index}
                        isLeft={true}
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Spacer */}
        <div style={{ height: isMobile ? '48px' : '64px' }} />
      </div>
    </section>
  );
}

// Achievement Card Component
interface AchievementCardProps {
  achievement: Achievement;
  index: number;
  isLeft: boolean;
}

function AchievementCard({ achievement, index, isLeft }: AchievementCardProps) {
  const { isMobile } = useMetroStore();

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl cursor-default group"
      style={{
        width: isMobile ? '100%' : '520px',
        paddingTop: '28px',
        paddingBottom: '28px',
        paddingLeft: '32px',
        paddingRight: '32px',
        background: 'rgba(30, 30, 42, 0.6)',
        backdropFilter: 'blur(20px)',
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.1),
          0 0 0 1px rgba(255, 159, 67, 0.1)
        `,
        border: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `
          0 12px 48px rgba(255, 159, 67, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.15),
          0 0 0 1px rgba(255, 159, 67, 0.3)
        `;
        e.currentTarget.style.background = 'rgba(30, 30, 42, 0.8)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `
          0 8px 32px rgba(0, 0, 0, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.1),
          0 0 0 1px rgba(255, 159, 67, 0.1)
        `;
        e.currentTarget.style.background = 'rgba(30, 30, 42, 0.6)';
      }}
    >
      {/* Top Accent Gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
        style={{
          background: 'linear-gradient(90deg, #ff9f43 0%, transparent 70%)',
        }}
      />

      {/* 1. Achievement Title */}
      <h3
        className="text-xl font-bold leading-snug"
        style={{
          marginBottom: '10px',
          color: '#ffffff',
          fontFamily: 'Space Grotesk, sans-serif',
          letterSpacing: '-0.01em',
        }}
      >
        {achievement.title}
      </h3>

      {/* 2. Context Line */}
      <div
        className="text-sm font-mono tracking-wide"
        style={{
          marginBottom: '14px',
          color: '#8a8a9a',
          fontWeight: 500,
        }}
      >
        {achievement.context}
      </div>

      {/* 3. Description */}
      <p
        className="leading-relaxed"
        style={{
          fontSize: '15px',
          lineHeight: '1.65',
          marginBottom: '18px',
          maxWidth: '60ch',
          color: '#b0b0c0',
        }}
      >
        {achievement.description}
      </p>

      {/* 4. Outcome Badge */}
      <div
        className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl group-hover:scale-105 transition-transform"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 159, 67, 0.15) 0%, rgba(255, 159, 67, 0.05) 100%)',
          border: '1px solid rgba(255, 159, 67, 0.3)',
        }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{
            background: '#ff9f43',
            boxShadow: '0 0 12px rgba(255, 159, 67, 0.8)',
          }}
        />
        <span className="text-sm font-semibold" style={{ color: '#ff9f43' }}>
          {achievement.outcome}
        </span>
      </div>
    </motion.div>
  );
}
