'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { MetroTrain } from './MetroTrain';
import { useMetroStore } from '@/store/useMetroStore';

function SceneContent() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.8}
        castShadow={false}
      />
      <pointLight position={[-5, 3, -5]} intensity={0.3} color="#00a8e8" />
      
      {/* Train */}
      <Float
        speed={1}
        rotationIntensity={0}
        floatIntensity={0.1}
      >
        <MetroTrain />
      </Float>
      
      {/* Simple track/ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, -1.2, 0]}>
        <planeGeometry args={[50, 5]} />
        <meshStandardMaterial color="#1a1a25" />
      </mesh>
      
      {/* Track rails */}
      <mesh position={[5, -1.1, 0.3]}>
        <boxGeometry args={[50, 0.05, 0.1]} />
        <meshStandardMaterial color="#4a5568" metalness={0.3} />
      </mesh>
      <mesh position={[5, -1.1, -0.3]}>
        <boxGeometry args={[50, 0.05, 0.1]} />
        <meshStandardMaterial color="#4a5568" metalness={0.3} />
      </mesh>
      
      {/* Soft environment */}
      <Environment preset="night" />
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-primary)]">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[var(--text-secondary)] text-sm">Loading 3D Scene...</p>
      </div>
    </div>
  );
}

export function Scene3D() {
  const { isMobile } = useMetroStore();
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setIsWebGLSupported(!!gl);
    } catch {
      setIsWebGLSupported(false);
    }
  }, []);

  // Don't render 3D on mobile or if WebGL is not supported
  if (isMobile || !isWebGLSupported) {
    return <TrainFallback2D />;
  }

  return (
    <div className="fixed bottom-20 left-0 right-0 h-40 z-20 pointer-events-none">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 1, 6], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            preserveDrawingBuffer: true,
            failIfMajorPerformanceCaveat: false,
            stencil: false,
            depth: true,
          }}
          style={{ background: 'transparent' }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            // Additional context loss prevention
            const canvas = gl.domElement;
            canvas.addEventListener('webglcontextlost', (event) => {
              event.preventDefault();
              console.log('WebGL context lost, attempting recovery...');
            }, false);
            canvas.addEventListener('webglcontextrestored', () => {
              console.log('WebGL context restored');
            }, false);
          }}
        >
          <SceneContent />
        </Canvas>
      </Suspense>
    </div>
  );
}

// 2D Fallback for mobile/no WebGL
function TrainFallback2D() {
  const { trainPosition } = useMetroStore();
  
  return (
    <div className="fixed bottom-20 left-0 right-0 h-24 z-20 pointer-events-none overflow-hidden">
      {/* Track */}
      <div className="absolute bottom-8 left-0 right-0 h-2 bg-[var(--bg-tertiary)]">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#4a5568] -translate-y-1/2" />
      </div>
      
      {/* 2D Train SVG */}
      <div 
        className="absolute bottom-10 transition-transform duration-500 ease-out"
        style={{ transform: `translateX(${trainPosition * 10}px)` }}
      >
        <svg width="200" height="60" viewBox="0 0 200 60" fill="none">
          {/* Train Body */}
          <rect x="10" y="15" width="180" height="35" rx="5" fill="#1a365d" />
          
          {/* Blue Stripe */}
          <rect x="10" y="28" width="180" height="8" fill="#00a8e8" />
          
          {/* Windows */}
          <rect x="25" y="20" width="20" height="15" rx="2" fill="#87CEEB" opacity="0.8" />
          <rect x="55" y="20" width="20" height="15" rx="2" fill="#87CEEB" opacity="0.8" />
          <rect x="85" y="20" width="20" height="15" rx="2" fill="#87CEEB" opacity="0.8" />
          <rect x="115" y="20" width="20" height="15" rx="2" fill="#87CEEB" opacity="0.8" />
          <rect x="145" y="20" width="20" height="15" rx="2" fill="#87CEEB" opacity="0.8" />
          
          {/* Front */}
          <path d="M190 15 L200 25 L200 45 L190 50 Z" fill="#1a365d" />
          <circle cx="196" cy="40" r="4" fill="#ffd700" />
          
          {/* Wheels */}
          <circle cx="35" cy="52" r="6" fill="#2d3748" />
          <circle cx="85" cy="52" r="6" fill="#2d3748" />
          <circle cx="135" cy="52" r="6" fill="#2d3748" />
          <circle cx="175" cy="52" r="6" fill="#2d3748" />
        </svg>
      </div>
    </div>
  );
}
