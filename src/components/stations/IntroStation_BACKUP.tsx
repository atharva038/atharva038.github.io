'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMetroStore } from '@/store/useMetroStore';
import { LaptopCanvas } from '@/components/three/LaptopCanvas';

export function IntroStation() {
  const { startJourney, hasStartedJourney, currentStation, isMobile } = useMetroStore();
  const [gatesOpen, setGatesOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const isActive = currentStation === 0;

  useEffect(() => {
    if (!hasStartedJourney) {
      const timer = setTimeout(() => setShowContent(true), 300);
      return () => clearTimeout(timer);
    }
  }, [hasStartedJourney]);

  const handleStartJourney = () => {
    setGatesOpen(true);
    setTimeout(() => {
      startJourney();
    }, 1000);
  };

  const handleSkipToProjects = () => {
    const projectsSection = document.querySelector('[data-station="2"]');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="start"
      data-station={0}
      className={`station relative ${
        isMobile ? 'min-h-screen' : 'w-screen h-screen flex-shrink-0'
      } flex items-center overflow-hidden bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]`}
      style={{
        paddingTop: isMobile ? 'var(--spacing-12)' : 'var(--spacing-16)',
        paddingBottom: isMobile ? 'var(--spacing-12)' : 'var(--spacing-16)',
      }}
    >
      {/* Animated Metro Platform Background */}
      <div className="absolute inset-0 opacity-10">
        {/* Abstract Rails Pattern */}
        <motion.div
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 0%'],
          }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: 'linear'
          }}
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 0%, var(--accent-primary) 48%, var(--accent-primary) 52%, transparent 100%),
              linear-gradient(90deg, transparent 0%, var(--metro-purple) 48%, var(--metro-purple) 52%, transparent 100%)
            `,
            backgroundSize: '200px 2px, 200px 2px',
            backgroundPosition: '0 40%, 0 60%',
            backgroundRepeat: 'repeat-x',
          }}
        />
        
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(var(--accent-primary) 1px, transparent 1px),
              linear-gradient(90deg, var(--accent-primary) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Ambient Light Effects */}
      <motion.div
        animate={{ 
          opacity: [0.15, 0.25, 0.15],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[var(--metro-blue)] rounded-full blur-[150px] pointer-events-none"
      />
      <motion.div
        animate={{ 
          opacity: [0.15, 0.25, 0.15],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 4 }}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[var(--metro-purple)] rounded-full blur-[150px] pointer-events-none"
      />

      {/* Metro Gate Animation */}
      <AnimatePresence>
        {!hasStartedJourney && !gatesOpen ? (
          <>
            {/* Left Gate */}
            <motion.div
              initial={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
              className="absolute left-0 top-0 w-1/2 h-full bg-[var(--bg-secondary)] z-30 border-r-4 border-[var(--accent-primary)]"
            >
              <div className="absolute right-8 top-1/2 -translate-y-1/2 text-right">
                <div className="text-[var(--accent-primary)] text-4xl mb-2">←</div>
                <div className="station-name text-sm text-[var(--text-muted)]">GATE OPENING</div>
              </div>
            </motion.div>
            {/* Right Gate */}
            <motion.div
              initial={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 1 }}
              className="absolute right-0 top-0 w-1/2 h-full bg-[var(--bg-secondary)] z-30 border-l-4 border-[var(--accent-primary)]"
            >
              <div className="absolute left-8 top-1/2 -translate-y-1/2">
                <div className="text-[var(--accent-primary)] text-4xl mb-2">→</div>
                <div className="station-name text-sm text-[var(--text-muted)]">GATE OPENING</div>
              </div>
            </motion.div>

            {/* Center Gate Opening Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            >
              <div className="relative">
                {/* Pulsing Rings */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-full border-2 border-[var(--accent-primary)]"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.3, 0, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute inset-0 rounded-full border-2 border-[var(--metro-purple)]"
                />
                
                {/* Main Button */}
                <motion.button
                  onClick={handleStartJourney}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group bg-gradient-to-br from-[var(--accent-primary)] via-[var(--metro-blue)] to-[var(--metro-purple)] rounded-full shadow-2xl hover:shadow-[var(--accent-primary)]/60 transition-all duration-300"
                  style={{
                    width: isMobile ? '140px' : '180px',
                    height: isMobile ? '140px' : '180px',
                  }}
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--metro-purple)] rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity -z-10" />
                  
                  <div className="flex flex-col items-center justify-center h-full">
                    {/* Rotating Icon */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="text-white mb-2"
                      style={{ fontSize: isMobile ? '48px' : '64px' }}
                    >
                      ⟐
                    </motion.div>
                    {/* Label */}
                    <div 
                      className="station-name text-white font-bold"
                      style={{
                        fontSize: isMobile ? '11px' : '13px',
                        letterSpacing: '0.3em',
                      }}
                    >
                      ENTER
                    </div>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      {/* Main Two-Column Layout - Professional Structure */}
      <div 
        className="relative z-20 w-full mx-auto grid items-center"
        style={{
          maxWidth: 'var(--max-width-content)',
          paddingLeft: 'var(--gutter-mobile)',
          paddingRight: 'var(--gutter-mobile)',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 'var(--spacing-8)' : 'var(--spacing-12)',
        }}
      >
        {/* LEFT COLUMN: Station Info & CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={showContent ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col"
          style={{
            maxWidth: isMobile ? '100%' : '600px',
          }}
        >
          {/* Station Name Board - Main Heading */}
          <div 
            className="relative inline-block mb-4"
            style={{ marginBottom: 'var(--spacing-2)' }}
          >
            {/* Status Indicator */}
            <div 
              className="flex items-center"
              style={{ 
                gap: 'var(--spacing-1)',
                marginBottom: 'var(--spacing-2)',
              }}
            >
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="rounded-full bg-[var(--metro-green)]"
                style={{ width: '10px', height: '10px' }}
              />
              <span 
                className="station-name text-[var(--metro-green)] font-bold"
                style={{ 
                  fontSize: '11px',
                  letterSpacing: '0.25em',
                }}
              >
                NOW BOARDING
              </span>
            </div>
            
            <h1 
              className="station-name font-black text-white leading-none"
              style={{
                fontSize: isMobile ? '56px' : '72px',
                letterSpacing: '0.02em',
                marginBottom: 'var(--spacing-2)',
              }}
            >
              ATHARVA
              <br />
              JOSHI
            </h1>
            
            {/* Station Label */}
            <div 
              className="inline-block bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 rounded"
              style={{
                paddingLeft: 'var(--spacing-2)',
                paddingRight: 'var(--spacing-2)',
                paddingTop: '4px',
                paddingBottom: '4px',
              }}
            >
              <span 
                className="station-name text-[var(--accent-primary)] font-bold"
                style={{
                  fontSize: '12px',
                  letterSpacing: '0.3em',
                }}
              >
                START STATION
              </span>
            </div>
          </div>

          {/* Short Intro - 2-3 Lines with Spacing: 16px */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showContent ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ marginBottom: 'var(--spacing-2)' }}
          >
            <p 
              className="text-[var(--text-secondary)] font-medium"
              style={{
                fontSize: isMobile ? '18px' : '22px',
                lineHeight: 'var(--line-height-normal)',
                maxWidth: '500px',
              }}
            >
              Full-Stack Developer & Creative Technologist.
              <br />
              Building digital experiences with purpose and precision.
            </p>
          </motion.div>

          {/* CTA Buttons - Spacing: 24px from intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center flex-wrap"
            style={{
              gap: 'var(--spacing-2)',
              marginTop: 'var(--spacing-3)',
            }}
          >
            {/* Primary CTA: Start the Journey */}
            <motion.button
              onClick={handleStartJourney}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative group bg-gradient-to-r from-[var(--accent-primary)] to-[var(--metro-blue)] text-white font-bold rounded-lg shadow-xl hover:shadow-2xl hover:shadow-[var(--accent-primary)]/40 transition-all duration-300"
              style={{
                paddingLeft: 'var(--spacing-4)',
                paddingRight: 'var(--spacing-4)',
                paddingTop: '14px',
                paddingBottom: '14px',
                fontSize: isMobile ? '15px' : '16px',
                letterSpacing: '0.03em',
              }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--metro-blue)] rounded-lg blur-lg opacity-40 group-hover:opacity-60 transition-opacity -z-10" />
              
              <span className="relative flex items-center" style={{ gap: 'var(--spacing-1)' }}>
                START THE JOURNEY
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ fontSize: '18px' }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>

            {/* Secondary CTA: Skip to Projects */}
            <motion.button
              onClick={handleSkipToProjects}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="relative border-2 border-[var(--text-muted)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] font-semibold rounded-lg transition-all duration-300"
              style={{
                paddingLeft: 'var(--spacing-4)',
                paddingRight: 'var(--spacing-4)',
                paddingTop: '12px',
                paddingBottom: '12px',
                fontSize: isMobile ? '15px' : '16px',
                letterSpacing: '0.03em',
              }}
            >
              SKIP TO PROJECTS
            </motion.button>
          </motion.div>

          {/* Terminal Prompt - Subtle Detail */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={showContent ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.1 }}
            className="flex items-center font-mono text-[var(--metro-green)]/70"
            style={{
              marginTop: 'var(--spacing-6)',
              fontSize: '13px',
              gap: 'var(--spacing-1)',
            }}
          >
            <span className="opacity-60">&gt;</span>
            <span>ready_to_explore</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-1.5 h-4 bg-[var(--metro-green)] inline-block ml-1"
            />
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: 3D Laptop Preview */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={showContent ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center"
          style={{
            minHeight: isMobile ? '300px' : '500px',
          }}
        >
          {/* 3D Laptop Model */}
          <div 
            className="relative w-full h-full"
            style={{
              minHeight: isMobile ? '300px' : '500px',
            }}
          >
            <LaptopCanvas />
          </div>

          {/* Decorative Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 right-10 w-20 h-20 border-2 border-[var(--accent-primary)]/20 rounded-full pointer-events-none"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-10 left-10 w-16 h-16 border-2 border-[var(--metro-purple)]/20 rounded-full pointer-events-none"
          />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {hasStartedJourney && isActive ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed left-1/2 -translate-x-1/2 z-30"
          style={{
            bottom: isMobile ? 'var(--spacing-4)' : 'var(--spacing-6)',
          }}
        >
          <div 
            className="flex flex-col items-center text-[var(--text-muted)]"
            style={{ gap: 'var(--spacing-1)' }}
          >
            <span 
              className="station-name font-bold"
              style={{ fontSize: '10px', letterSpacing: '0.2em' }}
            >
              SCROLL
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      ) : null}

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent pointer-events-none" />
    </section>
  );
}
