'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMetroStore } from '@/store/useMetroStore';

interface Skill {
  name: string;
  description: string;
  level: string;
  project?: string;
}

interface SkillLine {
  id: string;
  name: string;
  color: string;
  colorVar: string;
  skills: Skill[];
}

const SKILL_LINES: SkillLine[] = [
  {
    id: 'frontend',
    name: 'FRONTEND LINE',
    color: '#00a8e8',
    colorVar: 'var(--metro-blue)',
    skills: [
      { name: 'HTML', description: 'Semantic markup & accessibility', level: 'Expert', project: 'Portfolio Site' },
      { name: 'CSS', description: 'Modern layouts & animations', level: 'Expert', project: 'Metro Portfolio' },
      { name: 'JavaScript', description: 'ES6+ & async patterns', level: 'Expert', project: 'Interactive Apps' },
      { name: 'React', description: 'Component architecture & hooks', level: 'Advanced', project: 'Dashboard Systems' },
      { name: 'Next.js', description: 'SSR & App Router', level: 'Advanced', project: 'This Portfolio' },
      { name: 'Tailwind', description: 'Utility-first styling', level: 'Advanced', project: 'Rapid Prototyping' },
    ],
  },
  {
    id: 'backend',
    name: 'BACKEND LINE',
    color: '#00d68f',
    colorVar: 'var(--metro-green)',
    skills: [
      { name: 'Node.js', description: 'Server-side JavaScript runtime', level: 'Advanced', project: 'API Services' },
      { name: 'Express.js', description: 'RESTful API development', level: 'Advanced', project: 'E-commerce Backend' },
      { name: 'REST APIs', description: 'API design & integration', level: 'Advanced', project: 'Microservices' },
    ],
  },
  {
    id: 'database',
    name: 'DATABASE LINE',
    color: '#ffd700',
    colorVar: 'var(--metro-yellow)',
    skills: [
      { name: 'MongoDB', description: 'NoSQL document storage', level: 'Intermediate', project: 'Content Management' },
      { name: 'PostgreSQL', description: 'Relational database', level: 'Intermediate', project: 'Analytics Platform' },
    ],
  },
  {
    id: 'tools',
    name: 'TOOLS LINE',
    color: '#a55eea',
    colorVar: 'var(--metro-purple)',
    skills: [
      { name: 'Git', description: 'Version control & branching', level: 'Expert', project: 'All Projects' },
      { name: 'GitHub', description: 'Collaboration & CI/CD', level: 'Advanced', project: 'Open Source' },
      { name: 'Docker', description: 'Containerization', level: 'Intermediate', project: 'Deployment' },
      { name: 'CI/CD', description: 'Automated pipelines', level: 'Intermediate', project: 'DevOps Workflow' },
    ],
  },
];

export function SkillsStation() {
  const { currentStation, isMobile } = useMetroStore();
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const [activeLine, setActiveLine] = useState<string | null>(null);
  const [showListView, setShowListView] = useState(false);
  const isActive = currentStation === 1;

  return (
    <section
      id="skills"
      data-station={1}
      className={`station relative ${
        isMobile ? 'min-h-screen' : 'w-screen h-screen flex-shrink-0'
      } flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]`}
      style={{
        paddingTop: 'var(--spacing-12)',
        paddingBottom: 'var(--spacing-12)',
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(var(--accent-primary) 1px, transparent 1px),
              linear-gradient(90deg, var(--accent-primary) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Ambient Glow */}
      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--metro-blue)] rounded-full blur-[120px] pointer-events-none"
      />

      {/* Main Content */}
      <div
        className="relative z-10 w-full mx-auto"
        style={{
          maxWidth: 'var(--max-width-content)',
          paddingLeft: 'var(--gutter-mobile)',
          paddingRight: 'var(--gutter-mobile)',
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2.5 h-2.5 rounded-full bg-[var(--metro-green)]"
            />
            <span
              className="station-name text-[var(--metro-green)] font-bold"
              style={{ fontSize: '11px', letterSpacing: '0.25em' }}
            >
              STATION 01
            </span>
          </div>

          <h2
            className="station-name font-black text-white leading-tight mb-4"
            style={{
              fontSize: isMobile ? '48px' : '64px',
              letterSpacing: '0.02em',
            }}
          >
            THE ROUTES
            <br />
            I'VE MASTERED
          </h2>

          <p
            className="text-[var(--text-secondary)] max-w-2xl mx-auto"
            style={{
              fontSize: isMobile ? '16px' : '18px',
              lineHeight: 'var(--line-height-relaxed)',
            }}
          >
            Every product I build travels through these lines.
          </p>

          {/* Toggle View Button */}
          <motion.button
            onClick={() => setShowListView(!showListView)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-4 py-2 border border-[var(--text-muted)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] rounded-lg transition-all duration-300"
            style={{ fontSize: '13px', letterSpacing: '0.05em' }}
          >
            {showListView ? '← SHOW MAP VIEW' : 'SHOW LIST VIEW →'}
          </motion.button>
        </motion.div>

        {/* Metro Map or List View */}
        <AnimatePresence mode="wait">
          {!showListView ? (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
              style={{
                minHeight: isMobile ? '600px' : '500px',
              }}
            >
              {/* Metro Lines Network */}
              <div className="relative flex flex-col gap-16">
                {SKILL_LINES.map((line, lineIndex) => (
                  <motion.div
                    key={line.id}
                    initial={{ opacity: 0, x: -60 }}
                    animate={isActive ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 + lineIndex * 0.15 }}
                    className="relative"
                    onMouseEnter={() => setActiveLine(line.id)}
                    onMouseLeave={() => setActiveLine(null)}
                  >
                    {/* Line Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: line.color,
                          boxShadow: activeLine === line.id ? `0 0 20px ${line.color}` : 'none',
                          transition: 'box-shadow 0.3s',
                        }}
                      />
                      <span
                        className="station-name font-bold"
                        style={{
                          fontSize: '13px',
                          letterSpacing: '0.2em',
                          color: activeLine === line.id ? line.color : 'var(--text-muted)',
                          transition: 'color 0.3s',
                        }}
                      >
                        {line.name}
                      </span>
                    </div>

                    {/* Route Line with Stations */}
                    <div className="relative">
                      {/* Background Line */}
                      <motion.div
                        className="absolute top-2 left-0 h-1 rounded-full"
                        style={{
                          width: '100%',
                          backgroundColor: line.color,
                          opacity: activeLine === line.id ? 0.6 : 0.2,
                          transition: 'opacity 0.3s',
                        }}
                        initial={{ scaleX: 0 }}
                        animate={isActive ? { scaleX: 1 } : {}}
                        transition={{ duration: 1, delay: 0.6 + lineIndex * 0.15 }}
                      />

                      {/* Stations (Skills) */}
                      <div
                        className="relative flex justify-between"
                        style={{
                          paddingLeft: isMobile ? '0' : '20px',
                          paddingRight: isMobile ? '0' : '20px',
                        }}
                      >
                        {line.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill.name}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={isActive ? { scale: 1, opacity: 1 } : {}}
                            transition={{
                              duration: 0.4,
                              delay: 0.8 + lineIndex * 0.15 + skillIndex * 0.1,
                            }}
                            className="relative group cursor-pointer"
                            onMouseEnter={() => !isMobile && setActiveSkill(skill)}
                            onMouseLeave={() => !isMobile && setActiveSkill(null)}
                            onClick={() => isMobile && setActiveSkill(activeSkill?.name === skill.name ? null : skill)}
                          >
                            {/* Station Node */}
                            <motion.div
                              whileHover={{ scale: 1.3 }}
                              className="relative z-10 rounded-full border-2 transition-all duration-300"
                              style={{
                                width: isMobile ? '14px' : '18px',
                                height: isMobile ? '14px' : '18px',
                                backgroundColor: 'var(--bg-primary)',
                                borderColor: line.color,
                                boxShadow:
                                  activeSkill?.name === skill.name
                                    ? `0 0 20px ${line.color}, 0 0 40px ${line.color}`
                                    : `0 0 10px ${line.color}`,
                              }}
                            />

                            {/* Pulse Ring on Hover */}
                            <AnimatePresence>
                              {activeSkill?.name === skill.name && (
                                <motion.div
                                  initial={{ scale: 1, opacity: 0.6 }}
                                  animate={{ scale: 2, opacity: 0 }}
                                  exit={{ scale: 1, opacity: 0 }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                  className="absolute inset-0 rounded-full border-2"
                                  style={{ borderColor: line.color }}
                                />
                              )}
                            </AnimatePresence>

                            {/* Skill Label (Always Visible) */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={isActive ? { opacity: 1, y: 0 } : {}}
                              transition={{
                                duration: 0.4,
                                delay: 0.8 + lineIndex * 0.15 + skillIndex * 0.1,
                              }}
                              className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                            >
                              <span
                                className="station-name text-white font-semibold"
                                style={{
                                  fontSize: isMobile ? '9px' : '11px',
                                  letterSpacing: '0.1em',
                                  textShadow: '0 2px 8px rgba(0,0,0,0.8)',
                                }}
                              >
                                {skill.name}
                              </span>
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            // List View
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap justify-center gap-6"
              style={{
                marginTop: 'var(--spacing-8)',
                paddingLeft: isMobile ? 'var(--spacing-4)' : 'var(--spacing-8)',
                paddingRight: isMobile ? 'var(--spacing-4)' : 'var(--spacing-8)',
              }}
            >
              {SKILL_LINES.map((line, index) => (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[var(--bg-card)]/50 backdrop-blur-sm border border-[var(--accent-primary)]/20 rounded-xl"
                  style={{
                    padding: 'var(--spacing-5)',
                    minWidth: isMobile ? '100%' : '280px',
                    maxWidth: isMobile ? '100%' : '320px',
                  }}
                >
                  <div 
                    className="flex items-center gap-3"
                    style={{ marginBottom: 'var(--spacing-3)' }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ 
                        backgroundColor: line.color,
                        flexShrink: 0,
                      }}
                    />
                    <h3
                      className="station-name font-bold text-white"
                      style={{ fontSize: '14px', letterSpacing: '0.15em' }}
                    >
                      {line.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {line.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="px-3 py-1.5 bg-[var(--bg-secondary)] border border-[var(--accent-primary)]/30 rounded-lg text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all cursor-pointer"
                        style={{ fontSize: '12px' }}
                        onClick={() => setActiveSkill(skill)}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skill Detail Modal */}
        <AnimatePresence>
          {activeSkill && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={() => setActiveSkill(null)}
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[var(--bg-card)] border-2 border-[var(--accent-primary)] rounded-2xl shadow-2xl"
                style={{
                  width: isMobile ? '90%' : '480px',
                  maxWidth: '90vw',
                  padding: 'var(--spacing-6)',
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3
                    className="station-name font-black text-white"
                    style={{ fontSize: '24px', letterSpacing: '0.05em' }}
                  >
                    {activeSkill.name}
                  </h3>
                  <button
                    onClick={() => setActiveSkill(null)}
                    className="text-[var(--text-muted)] hover:text-white transition-colors"
                    style={{ fontSize: '24px', lineHeight: '1' }}
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <span
                      className="text-[var(--text-muted)] uppercase font-semibold"
                      style={{ fontSize: '11px', letterSpacing: '0.1em' }}
                    >
                      Description
                    </span>
                    <p
                      className="text-[var(--text-secondary)] mt-1"
                      style={{ fontSize: '15px', lineHeight: '1.6' }}
                    >
                      {activeSkill.description}
                    </p>
                  </div>

                  <div>
                    <span
                      className="text-[var(--text-muted)] uppercase font-semibold"
                      style={{ fontSize: '11px', letterSpacing: '0.1em' }}
                    >
                      Experience Level
                    </span>
                    <p
                      className="text-[var(--accent-primary)] mt-1 font-bold"
                      style={{ fontSize: '15px' }}
                    >
                      {activeSkill.level}
                    </p>
                  </div>

                  {activeSkill.project && (
                    <div>
                      <span
                        className="text-[var(--text-muted)] uppercase font-semibold"
                        style={{ fontSize: '11px', letterSpacing: '0.1em' }}
                      >
                        Used In
                      </span>
                      <p
                        className="text-[var(--text-secondary)] mt-1"
                        style={{ fontSize: '15px' }}
                      >
                        {activeSkill.project}
                      </p>
                    </div>
                  )}
                </div>

                <motion.button
                  onClick={() => setActiveSkill(null)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-6 w-full py-3 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--metro-blue)] text-white font-bold rounded-lg"
                  style={{ fontSize: '14px', letterSpacing: '0.05em' }}
                >
                  GOT IT
                </motion.button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent pointer-events-none" />
    </section>
  );
}
