'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMetroStore } from '@/store/useMetroStore';

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
              onClick={() => {
                const projectsSection = document.querySelector('[data-station="2"]');
                projectsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
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
          <>
            {/* Left Gate */}
            <motion.div
              initial={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
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
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
              style={{ originX: 1 }}
              className="absolute right-0 top-0 w-1/2 h-full bg-[var(--bg-secondary)] z-30 border-l-4 border-[var(--accent-primary)]"
            >
              <div className="absolute left-8 top-1/2 -translate-y-1/2">
                <div className="text-[var(--accent-primary)] text-4xl mb-2">→</div>
                <div className="station-name text-sm text-[var(--text-muted)]">GATE OPENING</div>
              </div>
            </motion.div>
            
            
            {/* Stunning Center Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              onClick={handleStartJourney}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 group cursor-pointer"
            >
              <div className="relative">
                {/* Animated rings */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.2, 0.5]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-full border-2 border-[var(--accent-primary)]"
                  style={{ padding: '20px' }}
                />
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.1, 0.3]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute inset-0 rounded-full border border-[var(--accent-primary)]"
                  style={{ padding: '40px' }}
                />
                
                {/* Main button with gradient */}
                <div className="relative bg-gradient-to-br from-[var(--accent-primary)] to-[var(--metro-purple)] rounded-full p-12 shadow-2xl shadow-[var(--accent-primary)]/50 group-hover:shadow-[var(--accent-primary)]/80 transition-all duration-500">
                  <div className="text-center">
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                      }}
                      transition={{ 
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="text-white text-7xl mb-3 font-bold"
                    >
                      ⟐
                    </motion.div>
                    <div className="text-white text-sm tracking-[0.3em] font-semibold uppercase">
                      Enter
                    </div>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--metro-purple)] blur-2xl opacity-40 group-hover:opacity-60 transition-opacity -z-10" />
              </div>
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Container - Professional Layout System */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        className="relative z-20 w-full mx-auto flex flex-col items-center justify-center"
        style={{
          maxWidth: 'var(--max-width-content)',
        }}
      >
        {/* Hero Card with Glass Effect - 8px Spacing System */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full backdrop-blur-xl bg-[var(--bg-card)]/40 border border-[var(--accent-primary)]/20 rounded-3xl shadow-2xl"
          style={{
            maxWidth: '960px',
            padding: isMobile ? 'var(--spacing-4)' : 'var(--spacing-8)',
            marginBottom: 'var(--spacing-8)',
          }}
        >
          {/* Status Indicator - Consistent 8px spacing */}
          <div 
            className="flex items-center justify-center"
            style={{
              gap: 'var(--spacing-2)',
              marginBottom: 'var(--spacing-6)',
            }}
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="rounded-full bg-[var(--metro-green)] shadow-lg shadow-[var(--metro-green)]/50"
              style={{ width: '12px', height: '12px' }}
            />
            <span 
              className="station-name text-[var(--metro-green)] font-semibold"
              style={{ 
                fontSize: isMobile ? '10px' : '12px',
                letterSpacing: '0.3em',
              }}
            >
              NOW ARRIVING
            </span>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="rounded-full bg-[var(--metro-green)] shadow-lg shadow-[var(--metro-green)]/50"
              style={{ width: '12px', height: '12px' }}
            />
          </div>
          
          {/* Main Name - Perfectly Centered, Responsive Typography */}
          <h1 
            className="station-name text-center font-black bg-gradient-to-r from-[var(--accent-primary)] via-[var(--metro-purple)] to-[var(--accent-primary)] bg-clip-text text-transparent leading-none"
            style={{
              fontSize: isMobile ? '48px' : '96px',
              marginBottom: 'var(--spacing-4)',
              letterSpacing: '-0.02em',
            }}
          >
            ATHARVA JOSHI
          </h1>
          
          {/* Terminal Label - Center Aligned Hero Element */}
          <div className="flex justify-center">
            <div 
              className="inline-block bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 rounded-full"
              style={{
                paddingLeft: 'var(--spacing-3)',
                paddingRight: 'var(--spacing-3)',
                paddingTop: 'var(--spacing-1)',
                paddingBottom: 'var(--spacing-1)',
              }}
            >
              <p 
                className="station-name text-[var(--accent-primary)] font-bold"
                style={{
                  fontSize: isMobile ? '10px' : '14px',
                  letterSpacing: '0.4em',
                }}
              >
                TERMINAL
              </p>
            </div>
          </div>
        </motion.div>

        {/* Professional Title Section - Left-Aligned for Readability */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full text-center"
          style={{
            maxWidth: 'var(--max-width-narrow)',
            marginBottom: 'var(--spacing-8)',
          }}
        >
          {/* Decorative Divider - 8px System */}
          <div 
            className="flex items-center justify-center"
            style={{ 
              gap: 'var(--spacing-2)',
              marginBottom: 'var(--spacing-4)',
            }}
          >
            <div 
              className="h-px bg-gradient-to-r from-transparent to-[var(--accent-primary)]"
              style={{ width: isMobile ? 'var(--spacing-6)' : 'var(--spacing-8)' }}
            />
            <div 
              className="rounded-full bg-[var(--accent-primary)] flex-shrink-0"
              style={{ width: '8px', height: '8px' }}
            />
            <div 
              className="h-px bg-gradient-to-l from-transparent to-[var(--accent-primary)]"
              style={{ width: isMobile ? 'var(--spacing-6)' : 'var(--spacing-8)' }}
            />
          </div>
          
          <h2 
            className="text-white font-semibold text-center"
            style={{
              fontSize: isMobile ? '24px' : '40px',
              lineHeight: 'var(--line-height-tight)',
              marginBottom: 'var(--spacing-3)',
            }}
          >
            Full-Stack Developer & Creative Technologist
          </h2>
          
          <p 
            className="text-[var(--text-secondary)] text-center mx-auto"
            style={{
              fontSize: isMobile ? '16px' : '20px',
              lineHeight: 'var(--line-height-relaxed)',
              maxWidth: 'var(--max-width-text)',
              paddingLeft: 'var(--spacing-2)',
              paddingRight: 'var(--spacing-2)',
            }}
          >
            Crafting digital experiences that blend innovation with purpose,
            {!isMobile && <br />}
            one line of code at a time
          </p>
        </motion.div>

        {/* Terminal Prompt - Center-Aligned CTA Element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex justify-center"
          style={{ marginBottom: 'var(--spacing-8)' }}
        >
          <div 
            className="inline-flex items-center bg-[var(--bg-card)]/60 backdrop-blur-sm border border-[var(--metro-green)]/20 rounded-xl"
            style={{
              gap: 'var(--spacing-1)',
              paddingLeft: isMobile ? 'var(--spacing-3)' : 'var(--spacing-4)',
              paddingRight: isMobile ? 'var(--spacing-3)' : 'var(--spacing-4)',
              paddingTop: isMobile ? 'var(--spacing-2)' : 'var(--spacing-3)',
              paddingBottom: isMobile ? 'var(--spacing-2)' : 'var(--spacing-3)',
            }}
          >
            <span 
              className="font-mono text-[var(--metro-green)]/60"
              style={{ fontSize: isMobile ? '14px' : '16px' }}
            >
              &gt;
            </span>
            <span 
              className="font-mono text-[var(--metro-green)]"
              style={{ fontSize: isMobile ? '14px' : '16px' }}
            >
              ready_to_explore
            </span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="bg-[var(--metro-green)] inline-block"
              style={{ 
                width: isMobile ? '6px' : '8px',
                height: isMobile ? '16px' : '20px',
              }}
            />
          </div>
        </motion.div>

        {/* Primary CTA Button - Center-Aligned Hero Element */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showContent && !hasStartedJourney ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex justify-center items-center"
        >
          <div className="relative">
            {/* Animated Pulsing Rings - Visual Rhythm */}
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
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
                scale: [1, 1.7, 1],
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
            
            <motion.button
              onClick={handleStartJourney}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group bg-gradient-to-r from-[var(--accent-primary)] to-[var(--metro-purple)] text-white rounded-full font-bold shadow-2xl hover:shadow-[var(--accent-primary)]/50 transition-all duration-300"
              style={{
                paddingLeft: isMobile ? 'var(--spacing-5)' : 'var(--spacing-8)',
                paddingRight: isMobile ? 'var(--spacing-5)' : 'var(--spacing-8)',
                paddingTop: isMobile ? 'var(--spacing-3)' : 'var(--spacing-4)',
                paddingBottom: isMobile ? 'var(--spacing-3)' : 'var(--spacing-4)',
                fontSize: isMobile ? '16px' : '20px',
              }}
            >
              {/* Button Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--metro-purple)] blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              
              <span 
                className="relative flex items-center whitespace-nowrap"
                style={{ gap: isMobile ? 'var(--spacing-1)' : 'var(--spacing-2)' }}
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ fontSize: isMobile ? '20px' : '24px' }}
                >
                  ⚡
                </motion.span>
                <span>START JOURNEY</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ fontSize: isMobile ? '20px' : '24px' }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Clean Scroll Indicator - Consistent Spacing */}
        {hasStartedJourney && isActive ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="fixed left-1/2 -translate-x-1/2 z-30"
            style={{
              bottom: isMobile ? 'var(--spacing-4)' : 'var(--spacing-8)',
            }}
          >
            <div 
              className="flex flex-col items-center text-[var(--text-muted)]"
              style={{ gap: 'var(--spacing-2)' }}
            >
              <span 
                className="tracking-widest uppercase font-semibold"
                style={{ fontSize: '10px' }}
              >
                SCROLL
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </motion.div>

      {/* Subtle Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent pointer-events-none" />
    </section>
  );
}
