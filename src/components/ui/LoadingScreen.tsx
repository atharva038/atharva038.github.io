'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            onComplete?.();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] bg-[var(--bg-primary)] flex flex-col items-center justify-center"
        >
          {/* Metro Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-24 h-24 rounded-full border-4 border-[var(--accent-primary)] flex items-center justify-center">
              <span className="text-4xl">🚇</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="station-name text-2xl md:text-3xl text-[var(--accent-primary)] mb-2"
          >
            METRO PORTFOLIO
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-[var(--text-muted)] mb-8"
          >
            Preparing your journey...
          </motion.p>

          {/* Progress Bar */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 200, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="relative"
          >
            <div className="w-48 h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[var(--accent-primary)] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-center mt-2 text-sm text-[var(--text-muted)] font-mono">
              {Math.round(Math.min(progress, 100))}%
            </div>
          </motion.div>

          {/* Loading Messages */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-8 text-xs text-[var(--text-muted)] font-mono"
          >
            {progress < 30 && 'Loading assets...'}
            {progress >= 30 && progress < 60 && 'Initializing stations...'}
            {progress >= 60 && progress < 90 && 'Preparing 3D environment...'}
            {progress >= 90 && 'Almost there...'}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
