'use client';

import { motion } from 'framer-motion';
import { useMetroStore, STATIONS } from '@/store/useMetroStore';
import TrainSVG from './TrainSVG';

export function MiniMap() {
  const { currentStation, goToStation, hasStartedJourney, scrollProgress } = useMetroStore();

  if (!hasStartedJourney) return null;

  // Calculate train position based on scroll progress
  const trainPosition = scrollProgress * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-4 md:px-0"
    >
      <div 
        className="backdrop-blur-md border rounded-full flex items-center gap-2 relative overflow-visible"
        style={{
          background: 'rgba(18, 18, 26, 0.95)',
          borderColor: 'rgba(0, 168, 232, 0.4)',
          padding: '20px 32px',
          minWidth: '600px',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 168, 232, 0.2)',
        }}
      >
        {/* Progress Line */}
        <div className="absolute inset-0 px-8 py-4 pointer-events-none overflow-visible">
          <div className="relative w-full h-full flex items-center overflow-visible">
            <div 
              className="absolute h-1.5 rounded-full transition-all duration-300"
              style={{
                width: '100%',
                background: 'rgba(96, 96, 112, 0.4)',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
            <motion.div 
              className="absolute h-1.5 rounded-full"
              style={{
                width: `${trainPosition}%`,
                background: 'linear-gradient(90deg, #00a8e8 0%, #a55eea 100%)',
                boxShadow: '0 0 12px rgba(0, 168, 232, 0.6), 0 0 24px rgba(165, 94, 234, 0.3)',
                top: '50%',
                transform: 'translateY(-50%)',
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* SVG Animated Train */}
            <TrainSVG position={trainPosition} />
          </div>
        </div>

        {/* Stations */}
        {STATIONS.map((station, index) => (
          <button
            key={station.id}
            onClick={() => goToStation(index)}
            className="group relative flex items-center z-10"
            aria-label={`Go to ${station.name}`}
          >
            {/* Connection line */}
            {index > 0 && (
              <div 
                className="h-0.5 transition-colors duration-300"
                style={{
                  width: index === STATIONS.length - 1 ? '30px' : '50px',
                  background: index <= currentStation ? '#00a8e8' : '#606070',
                }}
              />
            )}
            
            {/* Station dot */}
            <motion.div
              className="rounded-full border-2 transition-all duration-300"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: '14px',
                height: '14px',
                background: index === currentStation
                  ? '#00a8e8'
                  : index < currentStation
                  ? '#00a8e8'
                  : 'transparent',
                borderColor: index === currentStation || index < currentStation ? '#00a8e8' : '#606070',
                boxShadow: index === currentStation ? '0 0 12px rgba(0, 168, 232, 0.8)' : 'none',
                transform: index === currentStation ? 'scale(1.3)' : 'scale(1)',
              }}
            />
            
            {/* Station name tooltip */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div 
                className="text-xs px-3 py-1.5 rounded whitespace-nowrap station-name font-semibold"
                style={{
                  background: 'rgba(30, 30, 42, 0.95)',
                  color: '#ffffff',
                  border: '1px solid rgba(0, 168, 232, 0.3)',
                }}
              >
                {station.name}
              </div>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export function SkipJourney() {
  const { hasStartedJourney, goToStation } = useMetroStore();

  if (!hasStartedJourney) return null;

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-8 right-8 z-50 text-sm transition-colors flex items-center gap-2"
      style={{
        color: '#a0a0b0',
      }}
      whileHover={{
        color: '#ffffff',
      }}
      onClick={() => goToStation(5)} // Go to contact (last station)
    >
      Skip Journey
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
      </svg>
    </motion.button>
  );
}
