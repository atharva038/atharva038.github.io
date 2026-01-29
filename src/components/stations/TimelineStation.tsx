'use client';

import { motion } from 'framer-motion';
import { useMetroStore } from '@/store/useMetroStore';

interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  startDate: string;
  endDate: string;
  type: 'work' | 'education' | 'freelance';
  achievements: string[];
  skills: string[];
}

const EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    role: 'Full-Stack Developer',
    company: 'Tech Startup Inc.',
    duration: '2024 - Present',
    startDate: '2024-01',
    endDate: 'Present',
    type: 'work',
    achievements: [
      'Architected and deployed microservices handling 100k+ daily requests',
      'Reduced API response time by 65% through optimization and caching',
      'Led team of 3 developers in sprint planning and code reviews',
    ],
    skills: ['React', 'Node.js', 'AWS', 'PostgreSQL'],
  },
  {
    id: 'exp-2',
    role: 'Freelance Web Developer',
    company: 'Self-Employed',
    duration: '2023 - 2024',
    startDate: '2023-06',
    endDate: '2024-01',
    type: 'freelance',
    achievements: [
      'Delivered 15+ production-ready websites for clients across industries',
      'Maintained 5-star rating with 100% client satisfaction',
      'Generated $50k+ revenue through direct client relationships',
    ],
    skills: ['Next.js', 'Tailwind', 'Firebase', 'Vercel'],
  },
  {
    id: 'exp-3',
    role: 'Bachelor of Technology',
    company: 'University of Technology',
    duration: '2020 - 2024',
    startDate: '2020-08',
    endDate: '2024-05',
    type: 'education',
    achievements: [
      'Graduated with First Class Honors (CGPA: 8.5/10)',
      'Published research paper on distributed systems',
      'Led university tech club with 200+ members',
    ],
    skills: ['CS Fundamentals', 'Algorithms', 'System Design'],
  },
  {
    id: 'exp-4',
    role: 'Software Engineering Intern',
    company: 'Enterprise Corp',
    duration: 'Summer 2023',
    startDate: '2023-05',
    endDate: '2023-08',
    type: 'work',
    achievements: [
      'Built internal dashboard reducing manual reporting time by 80%',
      'Contributed to CI/CD pipeline improvements',
      'Received "Outstanding Intern" recognition',
    ],
    skills: ['Python', 'Django', 'Docker', 'Jenkins'],
  },
];

const TYPE_CONFIG = {
  work: {
    color: '#00a8e8',
    icon: '💼',
    label: 'Professional',
  },
  education: {
    color: '#a55eea',
    icon: '🎓',
    label: 'Academic',
  },
  freelance: {
    color: '#ffd700',
    icon: '⚡',
    label: 'Freelance',
  },
};

export function TimelineStation() {
  const { currentStation, isMobile } = useMetroStore();
  const isActive = currentStation === 4;

  return (
    <section
      id="timeline"
      data-station={4}
      className={`station relative ${
        isMobile ? 'min-h-screen' : 'w-screen h-screen flex-shrink-0'
      } ${isMobile ? '' : 'overflow-y-auto'}`}
      style={{
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0f1f 50%, #0a0a0f 100%)',
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
              radial-gradient(circle at 30% 50%, rgba(165, 94, 234, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 50%, rgba(0, 168, 232, 0.15) 0%, transparent 50%),
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
              color: '#a55eea',
              fontWeight: 600,
            }}
          >
            Career Express
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
            Professional Journey
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
            Tracking my growth from student to professional developer through key experiences and continuous learning.
          </p>
        </motion.div>

        {/* EXPERIENCE TIMELINE */}
        <div className="relative">
          {/* Central Timeline Line - Desktop */}
          {!isMobile && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
              style={{
                transformOrigin: 'top',
                background: 'linear-gradient(180deg, #a55eea 0%, #00a8e8 50%, rgba(0, 214, 143, 0.3) 100%)',
                filter: 'drop-shadow(0 0 8px rgba(165, 94, 234, 0.5))',
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
                background: 'linear-gradient(180deg, #a55eea 0%, #00a8e8 50%, rgba(0, 214, 143, 0.3) 100%)',
              }}
            />
          )}

          {/* Experience Cards */}
          <div className="relative">
            {EXPERIENCES.map((experience, index) => {
              const isLeft = index % 2 === 0;
              const config = TYPE_CONFIG[experience.type];
              
              return (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + index * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative"
                  style={{
                    marginBottom: index === EXPERIENCES.length - 1 ? '0' : isMobile ? '64px' : '80px',
                  }}
                >
                  {/* Desktop: Alternating Layout */}
                  {!isMobile && (
                    <div
                      className="flex items-start"
                      style={{
                        justifyContent: isLeft ? 'flex-start' : 'flex-end',
                      }}
                    >
                      {/* Card */}
                      <ExperienceCard
                        experience={experience}
                        config={config}
                        index={index}
                        isLeft={isLeft}
                      />

                      {/* Timeline Node */}
                      <div className="absolute left-1/2 -translate-x-1/2 z-10">
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
                              background: config.color,
                              border: '4px solid #0a0a0f',
                              boxShadow: `0 0 20px ${config.color}90, 0 0 40px ${config.color}40`,
                            }}
                          />
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
                      {/* Timeline Node */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.15 }}
                        className="absolute left-0 top-0 -translate-x-1/2"
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            background: config.color,
                            border: '3px solid #0a0a0f',
                            boxShadow: `0 0 15px ${config.color}90`,
                          }}
                        />
                      </motion.div>

                      {/* Type Badge */}
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold"
                        style={{
                          marginBottom: '12px',
                          background: `${config.color}15`,
                          color: config.color,
                          border: `1px solid ${config.color}30`,
                        }}
                      >
                        <span>{config.icon}</span>
                        <span>{config.label}</span>
                      </div>

                      {/* Card */}
                      <ExperienceCard
                        experience={experience}
                        config={config}
                        index={index}
                        isLeft={true}
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Journey Continues Marker */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className={`${isMobile ? 'ml-0' : 'absolute left-1/2 -translate-x-1/2'} flex flex-col items-center gap-3`}
            style={{
              marginTop: '64px',
            }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                background: '#00d68f',
                boxShadow: '0 0 20px rgba(0, 214, 143, 0.6), 0 0 40px rgba(0, 214, 143, 0.3)',
              }}
            >
              <span className="text-sm">🚀</span>
            </div>
            <p className="font-mono text-sm" style={{ color: '#606070', fontWeight: 600 }}>
              Journey Continues...
            </p>
          </motion.div>
        </div>

        {/* Bottom Spacer */}
        <div style={{ height: isMobile ? '48px' : '64px' }} />
      </div>
    </section>
  );
}

// Experience Card Component
interface ExperienceCardProps {
  experience: Experience;
  config: { color: string; icon: string; label: string };
  index: number;
  isLeft: boolean;
}

function ExperienceCard({ experience, config, index, isLeft }: ExperienceCardProps) {
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
          0 0 0 1px ${config.color}10
        `,
        border: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `
          0 12px 48px ${config.color}30,
          inset 0 1px 0 rgba(255, 255, 255, 0.15),
          0 0 0 1px ${config.color}40
        `;
        e.currentTarget.style.background = 'rgba(30, 30, 42, 0.8)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `
          0 8px 32px rgba(0, 0, 0, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.1),
          0 0 0 1px ${config.color}10
        `;
        e.currentTarget.style.background = 'rgba(30, 30, 42, 0.6)';
      }}
    >
      {/* Top Accent Gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
        style={{
          background: `linear-gradient(90deg, ${config.color} 0%, transparent 70%)`,
        }}
      />

      {/* Type Badge (Desktop Only) */}
      {!isMobile && (
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold"
          style={{
            marginBottom: '12px',
            background: `${config.color}15`,
            color: config.color,
            border: `1px solid ${config.color}30`,
          }}
        >
          <span>{config.icon}</span>
          <span>{config.label}</span>
        </div>
      )}

      {/* 1. Role/Title */}
      <h3
        className="text-xl font-bold leading-snug"
        style={{
          marginBottom: '8px',
          color: '#ffffff',
          fontFamily: 'Space Grotesk, sans-serif',
          letterSpacing: '-0.01em',
        }}
      >
        {experience.role}
      </h3>

      {/* 2. Company & Duration */}
      <div
        className="flex items-center gap-2 text-sm font-mono"
        style={{
          marginBottom: '16px',
          color: '#8a8a9a',
          fontWeight: 500,
        }}
      >
        <span>{experience.company}</span>
        <span>•</span>
        <span>{experience.duration}</span>
      </div>

      {/* 3. Key Achievements */}
      <ul
        className="space-y-2"
        style={{
          marginBottom: '18px',
        }}
      >
        {experience.achievements.map((achievement, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2"
            style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#b0b0c0',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{
                background: config.color,
                marginTop: '6px',
                boxShadow: `0 0 6px ${config.color}80`,
              }}
            />
            <span>{achievement}</span>
          </li>
        ))}
      </ul>

      {/* 4. Skills */}
      <div className="flex flex-wrap gap-2">
        {experience.skills.map((skill, idx) => (
          <span
            key={idx}
            className="px-3 py-1 rounded-lg text-xs font-medium"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              color: '#b0b0c0',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
