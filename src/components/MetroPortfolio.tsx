'use client';

import { useRef, useEffect, useState } from 'react';
import { useHorizontalScroll, useResponsive } from '@/hooks/useScroll';
import { useMetroStore } from '@/store/useMetroStore';
import { MiniMap, SkipJourney } from '@/components/ui/MiniMap';
import { ProjectModal } from '@/components/ui/ProjectModal';
import { IntroStation } from '@/components/stations/IntroStation';
import { SkillsStation } from '@/components/stations/SkillsStation';
import { ProjectsStation } from '@/components/stations/ProjectsStation';
import { AchievementsStation } from '@/components/stations/AchievementsStation';
import { TimelineStation } from '@/components/stations/TimelineStation';
import { ContactStation } from '@/components/stations/ContactStation';

export default function MetroPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { hasStartedJourney, isMobile } = useMetroStore();
  const [isMounted, setIsMounted] = useState(false);

  // Initialize responsive hooks
  useResponsive();
  
  // Initialize horizontal scroll
  useHorizontalScroll(containerRef);

  // Handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ background: '#0a0a0f' }}
      >
        <div className="text-center">
          <div 
            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
            style={{ borderColor: '#00a8e8', borderTopColor: 'transparent' }}
          />
          <p style={{ color: '#a0a0b0' }}>Loading Metro Experience...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative" style={{ background: '#0a0a0f' }}>
      {/* Navigation */}
      <MiniMap />
      <SkipJourney />

      {/* Project Modal */}
      <ProjectModal />

      {/* Main Content Container */}
      {isMobile ? (
        // Mobile: Vertical Scroll
        <div className="flex flex-col">
          <IntroStation />
          {hasStartedJourney ? (
            <>
              <SkillsStation />
              <ProjectsStation />
              <AchievementsStation />
              <TimelineStation />
              <ContactStation />
            </>
          ) : null}
        </div>
      ) : (
        // Desktop: Horizontal Scroll
        <div
          ref={containerRef}
          className={`flex ${hasStartedJourney ? '' : 'h-screen'}`}
          style={{ 
            willChange: hasStartedJourney ? 'transform' : 'auto',
            position: hasStartedJourney ? 'relative' : 'relative',
          }}
        >
          <IntroStation />
          {hasStartedJourney ? (
            <>
              <SkillsStation />
              <ProjectsStation />
              <AchievementsStation />
              <TimelineStation />
              <ContactStation />
              {/* Duplicate IntroStation for seamless loop */}
              <div className="opacity-100 transition-opacity duration-1000">
                <IntroStation />
              </div>
            </>
          ) : null}
        </div>
      )}
    </main>
  );
}
