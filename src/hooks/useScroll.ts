'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useMetroStore, STATIONS } from '@/store/useMetroStore';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export function useHorizontalScroll(containerRef: React.RefObject<HTMLDivElement | null>) {
  const { 
    setCurrentStation, 
    setScrollProgress, 
    setTrainPosition, 
    hasStartedJourney, 
    isMobile,
    isModalOpen,
    currentStation,
    goToStation,
  } = useMetroStore();

  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Scroll to station (for mini-map navigation)
  const scrollToStation = useCallback((index: number) => {
    if (!containerRef.current || isMobile) return;
    
    const container = containerRef.current;
    const stations = container.querySelectorAll('.station');
    if (stations[index]) {
      const targetX = (stations[index] as HTMLElement).offsetLeft;
      
      // Calculate scroll position needed to reach that x position
      const scrollWidth = container.scrollWidth - window.innerWidth;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = (targetX / scrollWidth) * documentHeight;
      
      gsap.to(window, {
        scrollTo: { y: scrollY, autoKill: false },
        duration: 1.2,
        ease: 'power2.inOut',
      });
    }
  }, [containerRef, isMobile]);

  // Setup horizontal scroll on desktop
  useEffect(() => {
    if (!containerRef.current || isMobile || !hasStartedJourney) return;

    const container = containerRef.current;
    const sections = gsap.utils.toArray<HTMLElement>('.station');
    
    // Calculate the total scroll width
    const totalWidth = container.scrollWidth - window.innerWidth;

    // Create the horizontal scroll animation - continuous forward scrolling
    const scrollAnimation = gsap.to(container, {
      x: () => -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${totalWidth}`, // Natural end point
        invalidateOnRefresh: true,
        anticipatePin: 1,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Update scroll progress normally
          setScrollProgress(progress);
          setTrainPosition(progress * 100);
          
          // Determine current station (including loop back to first)
          const totalStations = STATIONS.length + 1; // +1 for duplicated first station
          const stationProgress = progress * (totalStations - 1);
          const newStation = Math.round(stationProgress);
          
          // Map station 6 (duplicate) back to station 0
          if (newStation >= STATIONS.length) {
            setCurrentStation(0);
          } else {
            setCurrentStation(newStation);
          }
        },
      },
    });

    scrollTriggerRef.current = scrollAnimation.scrollTrigger as ScrollTrigger;

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);

    // Pause scroll when modal is open
    if (isModalOpen) {
      ScrollTrigger.getAll().forEach(st => st.disable());
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      scrollAnimation.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [containerRef, hasStartedJourney, isMobile, isModalOpen, setCurrentStation, setScrollProgress, setTrainPosition]);

  // Re-enable scroll when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      ScrollTrigger.getAll().forEach(st => st.enable());
    } else {
      ScrollTrigger.getAll().forEach(st => st.disable());
    }
  }, [isModalOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) return;
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentStation < STATIONS.length - 1) {
          goToStation(currentStation + 1);
          scrollToStation(currentStation + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentStation > 0) {
          goToStation(currentStation - 1);
          scrollToStation(currentStation - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStation, goToStation, isModalOpen, scrollToStation]);

  return { scrollToStation };
}

// Hook to detect mobile and reduced motion preferences
export function useResponsive() {
  const { setIsMobile, setIsReducedMotion } = useMetroStore();

  useEffect(() => {
    // Check mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check reduced motion preference
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
    };

    checkMobile();
    checkReducedMotion();

    window.addEventListener('resize', checkMobile);
    
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', checkReducedMotion);

    return () => {
      window.removeEventListener('resize', checkMobile);
      motionQuery.removeEventListener('change', checkReducedMotion);
    };
  }, [setIsMobile, setIsReducedMotion]);
}
