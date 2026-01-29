'use client';

import { motion } from 'framer-motion';

interface TrainSVGProps {
  position: number; // 0-100%
}

export default function TrainSVG({ position }: TrainSVGProps) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${position}%`,
        transform: 'translateX(-50%) translateY(-50%)',
        top: '50%',
        zIndex: 20,
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Enhanced Glow effect */}
      <div 
        className="absolute inset-0 blur-2xl opacity-70"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,168,232,1) 0%, rgba(165,94,234,0.8) 40%, transparent 70%)',
          width: '100px',
          height: '50px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) scaleY(0.4)',
        }}
      />
      
      {/* Train SVG - Bigger and More Detailed */}
      <svg
        width="72"
        height="40"
        viewBox="0 0 72 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative drop-shadow-2xl"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(0,168,232,0.6))' }}
      >
        <defs>
          {/* Enhanced Gradient for train body */}
          <linearGradient id="trainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00a8e8" />
            <stop offset="30%" stopColor="#0095d5" />
            <stop offset="70%" stopColor="#8b4fd9" />
            <stop offset="100%" stopColor="#a55eea" />
          </linearGradient>
          
          {/* Metallic shine gradient */}
          <linearGradient id="metalShine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Glass shine gradient */}
          <linearGradient id="glassShine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
          </linearGradient>
        </defs>
        
        {/* Train body - main cabin (larger) */}
        <rect
          x="12"
          y="8"
          width="48"
          height="20"
          rx="3"
          fill="url(#trainGradient)"
          filter="url(#glow)"
        />
        
        {/* Metallic shine overlay */}
        <rect
          x="12"
          y="8"
          width="48"
          height="10"
          rx="3"
          fill="url(#metalShine)"
          opacity="0.4"
        />
        
        {/* Train front (engine) - larger */}
        <path
          d="M 60 10 L 67 13 L 67 25 L 60 28 Z"
          fill="url(#trainGradient)"
          filter="url(#glow)"
        />
        
        {/* Front metallic shine */}
        <path
          d="M 60 10 L 67 13 L 67 18 L 60 16 Z"
          fill="url(#metalShine)"
          opacity="0.3"
        />
        
        {/* Windows - Larger */}
        <rect x="17" y="12" width="9" height="7" rx="1.5" fill="url(#glassShine)" opacity="0.9" />
        <rect x="29" y="12" width="9" height="7" rx="1.5" fill="url(#glassShine)" opacity="0.9" />
        <rect x="41" y="12" width="9" height="7" rx="1.5" fill="url(#glassShine)" opacity="0.9" />
        
        {/* Window frames */}
        <rect x="17" y="12" width="9" height="7" rx="1.5" fill="none" stroke="rgba(0,168,232,0.5)" strokeWidth="0.5" />
        <rect x="29" y="12" width="9" height="7" rx="1.5" fill="none" stroke="rgba(0,168,232,0.5)" strokeWidth="0.5" />
        <rect x="41" y="12" width="9" height="7" rx="1.5" fill="none" stroke="rgba(0,168,232,0.5)" strokeWidth="0.5" />
        
        {/* Headlight - Bigger and brighter */}
        <circle cx="64" cy="19" r="2.5" fill="#ffd700" opacity="0.9">
          <animate
            attributeName="opacity"
            values="0.9;0.5;0.9"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="64" cy="19" r="1.5" fill="#ffed4e" />
        
        {/* Headlight beam */}
        <ellipse cx="69" cy="19" rx="3" ry="1.5" fill="#ffd700" opacity="0.3">
          <animate
            attributeName="opacity"
            values="0.3;0.1;0.3"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </ellipse>
        
        {/* Wheels - Larger */}
        <g filter="url(#glow)">
          <circle cx="20" cy="29" r="4.5" fill="#1a1a25" stroke="#00a8e8" strokeWidth="2" />
          <circle cx="20" cy="29" r="1.5" fill="#00a8e8" />
          
          <circle cx="35" cy="29" r="4.5" fill="#1a1a25" stroke="#00a8e8" strokeWidth="2" />
          <circle cx="35" cy="29" r="1.5" fill="#00a8e8" />
          
          <circle cx="50" cy="29" r="4.5" fill="#1a1a25" stroke="#a55eea" strokeWidth="2" />
          <circle cx="50" cy="29" r="1.5" fill="#a55eea" />
        </g>
        
        {/* Decorative stripes */}
        <line x1="14" y1="22" x2="58" y2="22" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
        <line x1="14" y1="25" x2="58" y2="25" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
        
        {/* Logo/Badge on side */}
        <circle cx="36" cy="24" r="2" fill="rgba(255,255,255,0.2)" />
        <text x="36" y="26" fontSize="3" fill="#00a8e8" textAnchor="middle" fontWeight="bold">M</text>
        
        {/* Speed lines (animated) - More prominent */}
        <motion.g
          animate={{
            opacity: [0.4, 0.8, 0.4],
            x: [-3, 0, -3],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <line x1="2" y1="12" x2="8" y2="12" stroke="#00a8e8" strokeWidth="1.5" opacity="0.7" strokeLinecap="round" />
          <line x1="1" y1="17" x2="7" y2="17" stroke="#00a8e8" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
          <line x1="0" y1="22" x2="6" y2="22" stroke="#8b4fd9" strokeWidth="1.5" opacity="0.7" strokeLinecap="round" />
          <line x1="1" y1="27" x2="7" y2="27" stroke="#a55eea" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        </motion.g>
        
        {/* Exhaust puff - Larger */}
        <motion.g
          animate={{
            opacity: [0.5, 0.9, 0.5],
            scale: [1, 1.4, 1],
            x: [0, 3, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <circle cx="68" cy="10" r="2.5" fill="#00a8e8" opacity="0.5" />
          <circle cx="69" cy="8" r="2" fill="#a55eea" opacity="0.4" />
        </motion.g>
        
        {/* Connector between cars */}
        <rect x="58" y="16" width="2" height="6" rx="0.5" fill="rgba(255,255,255,0.2)" />
      </svg>
    </motion.div>
  );
}
