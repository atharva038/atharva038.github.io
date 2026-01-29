'use client';

import { motion } from 'framer-motion';

export function LaptopCanvas() {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Glow Effect Background */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-[var(--accent-primary)] rounded-full blur-[120px] -z-10"
      />

      {/* Laptop SVG Illustration */}
      <motion.svg
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        width="500"
        height="400"
        viewBox="0 0 500 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl"
      >
        {/* Laptop Screen Back */}
        <defs>
          <linearGradient id="screenGradient" x1="150" y1="50" x2="350" y2="250">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="50%" stopColor="#16213e" />
            <stop offset="100%" stopColor="#0f1419" />
          </linearGradient>

          <linearGradient id="glowGradient" x1="250" y1="80" x2="250" y2="240">
            <stop offset="0%" stopColor="#00a8e8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00a8e8" stopOpacity="0.4" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Laptop Base/Keyboard */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d="M 100 280 L 400 280 L 420 320 L 80 320 Z"
          fill="url(#screenGradient)"
          stroke="#00a8e8"
          strokeWidth="2"
          filter="url(#glow)"
        />

        {/* Keyboard Detail Lines */}
        {[290, 295, 300, 305, 310].map((y, i) => (
          <motion.line
            key={i}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
            x1="120"
            y1={y}
            x2="380"
            y2={y}
            stroke="#00a8e8"
            strokeWidth="1"
          />
        ))}

        {/* Trackpad */}
        <motion.rect
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          x="220"
          y="295"
          width="60"
          height="40"
          rx="4"
          fill="#0a0a15"
          stroke="#00a8e8"
          strokeWidth="1.5"
          filter="url(#glow)"
        />

        {/* Laptop Screen Frame */}
        <motion.rect
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'center bottom' }}
          x="140"
          y="60"
          width="220"
          height="220"
          rx="8"
          fill="url(#screenGradient)"
          stroke="#00a8e8"
          strokeWidth="3"
          filter="url(#glow)"
        />

        {/* Screen Display Area */}
        <motion.rect
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          x="152"
          y="72"
          width="196"
          height="196"
          rx="4"
          fill="url(#glowGradient)"
          filter="url(#strongGlow)"
        />

        {/* Code Lines on Screen */}
        {[
          { width: 140, y: 100, delay: 1.2 },
          { width: 110, y: 120, delay: 1.3 },
          { width: 160, y: 140, delay: 1.4 },
          { width: 90, y: 160, delay: 1.5 },
          { width: 130, y: 180, delay: 1.6 },
          { width: 150, y: 200, delay: 1.7 },
          { width: 100, y: 220, delay: 1.8 },
          { width: 120, y: 240, delay: 1.9 },
        ].map((line, i) => (
          <motion.rect
            key={i}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.8 }}
            transition={{ duration: 0.5, delay: line.delay }}
            style={{ transformOrigin: 'left center' }}
            x="170"
            y={line.y}
            width={line.width}
            height="6"
            rx="2"
            fill="#00ff88"
            filter="url(#glow)"
          />
        ))}

        {/* Cursor Blinking */}
        <motion.rect
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          x="175"
          y="254"
          width="3"
          height="10"
          fill="#ffffff"
          filter="url(#strongGlow)"
        />

        {/* Camera Dot */}
        <motion.circle
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 1.2 }}
          cx="250"
          cy="78"
          r="3"
          fill="#00a8e8"
          filter="url(#strongGlow)"
        >
          <animate
            attributeName="opacity"
            values="1;0.3;1"
            dur="3s"
            repeatCount="indefinite"
          />
        </motion.circle>

        {/* Power LED Indicator */}
        <motion.circle
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 1.3 }}
          cx="120"
          cy="295"
          r="2.5"
          fill="#00ff88"
          filter="url(#strongGlow)"
        >
          <animate
            attributeName="opacity"
            values="1;0.5;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </motion.circle>

        {/* Decorative Circuit Lines */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.5 }}
          d="M 360 150 L 380 150 L 380 180 M 360 200 L 390 200 L 390 220"
          stroke="#00a8e8"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 4"
        />

        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.7 }}
          d="M 140 150 L 120 150 L 120 180 M 140 200 L 110 200 L 110 220"
          stroke="#9b59b6"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 4"
        />

        {/* Floating Particles */}
        {[
          { cx: 100, cy: 120, delay: 0 },
          { cx: 400, cy: 180, delay: 0.5 },
          { cx: 380, cy: 100, delay: 1 },
          { cx: 120, cy: 240, delay: 1.5 },
        ].map((particle, i) => (
          <motion.circle
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              y: [0, -30, -60],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeOut"
            }}
            cx={particle.cx}
            cy={particle.cy}
            r="3"
            fill="#00a8e8"
            filter="url(#glow)"
          />
        ))}
      </motion.svg>

      {/* Additional Glow Rings */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute w-[400px] h-[400px] border-2 border-[var(--accent-primary)]/30 rounded-full pointer-events-none"
      />
    </div>
  );
}
