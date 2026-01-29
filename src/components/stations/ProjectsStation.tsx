'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMetroStore } from '@/store/useMetroStore';
import { projectsData } from '@/data/portfolio';

export function ProjectsStation() {
  const { currentStation, isMobile } = useMetroStore();
  const isActive = currentStation === 2;
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [deepDiveProject, setDeepDiveProject] = useState<string | null>(null);

  return (
    <section
      id="projects"
      data-station={2}
      className={`station relative ${
        isMobile ? 'min-h-screen' : 'w-screen h-screen flex-shrink-0'
      } flex items-center justify-center overflow-hidden`}
      style={{
        paddingTop: isMobile ? '96px' : '128px',
        paddingBottom: isMobile ? '96px' : '128px',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #0a0a0f 100%)',
      }}
    >
      {/* Metro Interchange Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, #00a8e8 0px, transparent 1px, transparent 80px),
              repeating-linear-gradient(90deg, #00a8e8 0px, transparent 1px, transparent 80px)
            `,
          }}
        />
      </div>

      {/* Ambient Glow */}
      <motion.div
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: '#ffd700' }}
      />

      {/* Main Content Container */}
      <div 
        className="relative w-full h-full flex flex-col"
        style={{
          paddingLeft: isMobile ? '32px' : '96px',
          paddingRight: isMobile ? '32px' : '96px',
        }}
      >
        {/* Station Header - INTERCHANGE TITLE */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: '#ffd700' }}>
              <span className="text-black text-2xl font-bold">⚡</span>
            </div>
            <div className="text-left">
              <div className="station-name text-xs uppercase tracking-widest mb-1" style={{ color: '#606070' }}>
                STATION 02
              </div>
              <h2 className="station-name text-3xl md:text-5xl" style={{ color: '#ffffff' }}>
                PROJECTS CENTRAL
              </h2>
            </div>
          </div>
          <p className="text-sm" style={{ color: '#a0a0b0' }}>
            Major Metro Interchange • {projectsData.length} Active Lines
          </p>
        </motion.div>

        {/* Main Metro Line with Project Branches */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="w-full max-w-7xl relative">
            {/* MAIN HORIZONTAL METRO LINE */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2"
              style={{ 
                transformOrigin: 'center',
                background: 'linear-gradient(to right, transparent, #ffd700, transparent)',
              }}
            />

            {/* PROJECT NODES & CARDS */}
            <div 
              className={`grid ${
                isMobile 
                  ? 'grid-cols-1 gap-8' 
                  : 'grid-cols-3 gap-12'
              } relative z-10`}
            >
              {projectsData.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.4 + index * 0.2,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="relative"
                  onMouseEnter={() => setActiveProject(index)}
                  onMouseLeave={() => setActiveProject(null)}
                >
                  {/* VERTICAL BRANCH LINE to Main Line */}
                  {!isMobile && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                      className="absolute left-1/2 -translate-x-1/2 w-0.5"
                      style={{
                        height: '60px',
                        top: '-60px',
                        transformOrigin: 'bottom',
                        background: 'linear-gradient(to bottom, #ffd700, transparent)',
                      }}
                    />
                  )}

                  {/* PROJECT STATION NODE */}
                  <motion.div
                    animate={
                      activeProject === index
                        ? { scale: 1.1, boxShadow: `0 0 30px ${project.color}80` }
                        : { scale: 1, boxShadow: `0 0 15px ${project.color}40` }
                    }
                    className="w-6 h-6 rounded-full absolute left-1/2 -translate-x-1/2 z-20 cursor-pointer"
                    style={{
                      backgroundColor: project.color,
                      top: isMobile ? '-12px' : '-63px',
                    }}
                    onClick={() => setDeepDiveProject(project.id)}
                  >
                    <div className="absolute inset-0 rounded-full border-4" style={{ borderColor: '#0a0a0f' }} />
                  </motion.div>

                  {/* PROJECT CARD */}
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="relative rounded-xl overflow-hidden cursor-pointer group"
                    style={{
                      border: `2px solid ${activeProject === index ? project.color : '#1a1a25'}`,
                      boxShadow: activeProject === index 
                        ? `0 20px 40px -10px ${project.color}30` 
                        : '0 10px 30px -5px rgba(0,0,0,0.3)',
                      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                      background: 'rgba(30, 30, 42, 0.6)',
                      backdropFilter: 'blur(20px)',
                    }}
                    onClick={() => setDeepDiveProject(project.id)}
                  >
                    {/* Card Header with Accent Strip */}
                    <div 
                      className="h-2"
                      style={{
                        background: `linear-gradient(90deg, ${project.color}, transparent)`,
                      }}
                    />

                    {/* Card Content */}
                    <div style={{ padding: '48px' }}>
                      {/* 1. Project Title */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div 
                            className="station-name text-xs uppercase tracking-widest mb-2"
                            style={{ color: project.color }}
                          >
                            LINE {index + 1}
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold transition-colors mb-2" style={{ color: '#ffffff' }}>
                            {project.title}
                          </h3>
                        </div>
                        <motion.div
                          animate={{ x: activeProject === index ? 4 : 0 }}
                          className="transition-colors"
                          style={{ color: '#606070' }}
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </motion.div>
                      </div>

                      {/* 2. One-Line Impact Statement */}
                      <p className="font-medium text-sm mb-4 leading-relaxed" style={{ color: '#ffffff' }}>
                        {project.subtitle}
                      </p>

                      {/* 3. Problem (Brief) */}
                      <div className="mb-4">
                        <div className="text-xs uppercase tracking-wider mb-2" style={{ color: '#606070' }}>
                          Problem
                        </div>
                        <p className="text-sm leading-relaxed line-clamp-2" style={{ color: '#a0a0b0' }}>
                          {project.problem}
                        </p>
                      </div>

                      {/* 5. Tech Stack Pills */}
                      <div className="mb-4">
                        <div className="text-xs uppercase tracking-wider mb-2" style={{ color: '#606070' }}>
                          Tech Stack
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.slice(0, 5).map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs rounded-full border transition-colors"
                              style={{
                                background: '#1a1a25',
                                color: '#a0a0b0',
                                borderColor: '#1a1a25',
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 5 && (
                            <span className="px-3 py-1 text-xs rounded-full" style={{ color: '#606070' }}>
                              +{project.techStack.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* 7. Action: View Details */}
                      <div className="flex items-center gap-2 text-sm">
                        <span 
                          className="font-medium transition-colors"
                          style={{ 
                            color: activeProject === index ? project.color : '#606070' 
                          }}
                        >
                          View Case Study
                        </span>
                        <motion.span
                          animate={{ x: activeProject === index ? [0, 4, 0] : 0 }}
                          transition={{ duration: 0.6, repeat: activeProject === index ? Infinity : 0 }}
                          style={{ color: project.color }}
                        >
                          →
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mini-Map Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center gap-2 text-sm" style={{ color: '#606070' }}>
            <span className="station-name text-xs tracking-widest">QUICK JUMP:</span>
            {projectsData.map((project, index) => (
              <button
                key={project.id}
                onClick={() => setDeepDiveProject(project.id)}
                className="w-3 h-3 rounded-full transition-all hover:scale-125"
                style={{
                  backgroundColor: activeProject === index ? project.color : '#1a1a25',
                  border: `2px solid ${project.color}`,
                }}
                aria-label={`Jump to ${project.title}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Deep Dive Modal */}
        <AnimatePresence>
          {deepDiveProject && (
            <DeepDiveModal
              project={projectsData.find(p => p.id === deepDiveProject)!}
              onClose={() => setDeepDiveProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Deep Dive Modal Component
function DeepDiveModal({ project, onClose }: { project: any; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 40 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ 
          border: `3px solid ${project.color}`,
          background: 'rgba(20, 20, 30, 0.95)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{
            background: '#1a1a25',
            color: '#ffffff',
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header Strip */}
        <div 
          className="h-3"
          style={{
            background: `linear-gradient(90deg, ${project.color}, transparent)`,
          }}
        />

        {/* Modal Content */}
        <div style={{ padding: '64px' }}>
          {/* Title */}
          <div className="mb-6">
            <div 
              className="station-name text-xs uppercase tracking-widest mb-2"
              style={{ color: project.color }}
            >
              PROJECT CASE STUDY
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#ffffff' }}>
              {project.title}
            </h2>
            <p className="text-lg" style={{ color: '#ffffff' }}>
              {project.subtitle}
            </p>
          </div>

          {/* Problem Section */}
          <div className="mb-6">
            <h3 className="station-name text-sm uppercase tracking-widest mb-3" style={{ color: '#00a8e8' }}>
              01 • The Problem
            </h3>
            <p className="leading-relaxed" style={{ color: '#a0a0b0' }}>
              {project.problem}
            </p>
          </div>

          {/* Solution Section */}
          <div className="mb-6">
            <h3 className="station-name text-sm uppercase tracking-widest mb-3" style={{ color: '#00a8e8' }}>
              02 • The Solution
            </h3>
            <p className="leading-relaxed" style={{ color: '#a0a0b0' }}>
              {project.solution}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="mb-6">
            <h3 className="station-name text-sm uppercase tracking-widest mb-3" style={{ color: '#00a8e8' }}>
              03 • Technology Stack
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {project.techStack.map((tech: string) => (
                <div
                  key={tech}
                  className="px-4 py-2 text-sm text-center rounded-lg border transition-colors"
                  style={{
                    background: '#1a1a25',
                    color: '#a0a0b0',
                    borderColor: '#1a1a25',
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Outcome/Results */}
          <div className="mb-6">
            <h3 className="station-name text-sm uppercase tracking-widest mb-3" style={{ color: '#00a8e8' }}>
              04 • Outcome & Impact
            </h3>
            <p className="leading-relaxed" style={{ color: '#a0a0b0' }}>
              {project.outcome}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 border-t" style={{ borderColor: '#1a1a25' }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: project.color,
                  color: '#000',
                }}
              >
                View Live Demo →
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg font-medium transition-colors"
                style={{
                  background: '#1a1a25',
                  color: '#ffffff',
                }}
              >
                View on GitHub
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
