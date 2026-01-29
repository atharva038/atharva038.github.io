'use client';

import { motion } from 'framer-motion';
import { useMetroStore } from '@/store/useMetroStore';

interface StationWrapperProps {
  children: React.ReactNode;
  stationIndex: number;
  stationId: string;
  stationName: string;
  stationColor: string;
  className?: string;
}

export function StationWrapper({
  children,
  stationIndex,
  stationId,
  stationName,
  stationColor,
  className = '',
}: StationWrapperProps) {
  const { currentStation, isMobile } = useMetroStore();
  const isActive = currentStation === stationIndex;

  return (
    <section
      id={stationId}
      data-station={stationIndex}
      className={`station relative ${isMobile ? 'min-h-screen py-20' : 'w-screen h-screen flex-shrink-0'} flex flex-col justify-center ${className}`}
    >
      {/* Station indicator light */}
      <div
        className="absolute top-0 left-0 w-1 h-full opacity-50"
        style={{ background: `linear-gradient(180deg, transparent, ${stationColor}, transparent)` }}
      />

      {/* Station name header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute top-8 left-8 md:left-16"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: stationColor, boxShadow: `0 0 20px ${stationColor}` }}
          />
          <span className="station-name text-sm md:text-base" style={{ color: '#a0a0b0' }}>
            STATION {stationIndex + 1}
          </span>
        </div>
        <h2
          className="station-name text-lg md:text-xl mt-2"
          style={{ color: stationColor }}
        >
          {stationName}
        </h2>
      </motion.div>

      {/* Main content */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 pt-24 md:pt-0">
        {children}
      </div>

      {/* Decorative platform edge (desktop only) */}
      {!isMobile && (
        <div className="absolute bottom-32 left-0 right-0 h-4">
          <div className="w-full h-1" style={{ background: 'rgba(0, 168, 232, 0.2)' }} />
          <div className="w-full h-0.5 mt-1 animate-pulse-slow" style={{ background: 'rgba(255, 215, 0, 0.5)' }} />
        </div>
      )}
    </section>
  );
}

// Animation variants for station content
export const stationContentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.1,
    },
  },
};

export const stationItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};
