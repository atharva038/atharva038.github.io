'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMetroStore } from '@/store/useMetroStore';

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  stationIndex: number;
  color?: string;
}

export function ParallaxBackground({ children, stationIndex, color = '#00a8e8' }: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { isMobile } = useMetroStore();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  if (isMobile) {
    return <div ref={ref}>{children}</div>;
  }

  return (
    <div ref={ref} className="relative">
      {/* Background Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute inset-0"
        >
          <div 
            className="w-full h-full opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(${color}20 1px, transparent 1px),
                linear-gradient(90deg, ${color}20 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            style={{ y: y2 }}
            className="absolute w-2 h-2 rounded-full opacity-30"
            initial={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              backgroundColor: color,
            }}
          />
        ))}
      </div>

      {/* Metro Line Decoration */}
      <div className="absolute left-0 top-0 bottom-0 w-1 opacity-20" style={{ backgroundColor: color }} />

      {/* Main Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Simple animated background circles
export function BackgroundCircles({ color = '#00a8e8' }: { color?: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full"
        style={{ backgroundColor: color }}
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-1/4 -left-1/4 w-2/3 h-2/3 rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
