'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Simple Laptop 3D Model Component
export function Laptop3D() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Gentle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} rotation={[0, -0.4, 0]}>
      {/* Laptop Base */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[2.5, 0.05, 1.8]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          roughness={0.3} 
          metalness={0.7}
        />
      </mesh>

      {/* Keyboard Area */}
      <mesh position={[0, 0.03, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[2.2, 0.01, 1.2]} />
        <meshStandardMaterial 
          color="#0a0a15" 
          roughness={0.8} 
          metalness={0.2}
        />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.04, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.8, 0.01, 0.5]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          roughness={0.2} 
          metalness={0.5}
        />
      </mesh>

      {/* Laptop Screen */}
      <group position={[0, 0.9, -0.85]} rotation={[-0.2, 0, 0]}>
        {/* Screen Back */}
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[2.5, 1.6, 0.05]} />
          <meshStandardMaterial 
            color="#1a1a2e" 
            roughness={0.3} 
            metalness={0.7}
          />
        </mesh>

        {/* Screen Display */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.3, 1.45, 0.01]} />
          <meshStandardMaterial 
            color="#00a8e8"
            emissive="#00a8e8"
            emissiveIntensity={0.3}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>

        {/* Code Lines on Screen */}
        {[-0.4, -0.2, 0, 0.2, 0.4].map((y, i) => (
          <mesh key={i} position={[-0.5, y, 0.01]}>
            <boxGeometry args={[1.5, 0.05, 0.01]} />
            <meshStandardMaterial 
              color="#00ff88"
              emissive="#00ff88"
              emissiveIntensity={0.5}
              transparent
              opacity={0.7}
            />
          </mesh>
        ))}

        {/* Cursor Blinking */}
        <mesh position={[0.8, 0.4, 0.01]}>
          <boxGeometry args={[0.02, 0.06, 0.01]} />
          <meshStandardMaterial 
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={1}
          />
        </mesh>

        {/* Screen Glow */}
        <pointLight 
          position={[0, 0, 0.5]} 
          intensity={0.5} 
          distance={3}
          color="#00a8e8" 
        />
      </group>

      {/* Keyboard Keys (decorative grid) */}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 12 }).map((_, col) => (
          <mesh
            key={`key-${row}-${col}`}
            position={[
              -0.9 + col * 0.17,
              0.05,
              -0.7 + row * 0.17
            ]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <boxGeometry args={[0.12, 0.01, 0.12]} />
            <meshStandardMaterial 
              color="#2a2a3e" 
              roughness={0.9}
            />
          </mesh>
        ))
      )}

      {/* LED Indicator */}
      <mesh position={[-1.1, 0.06, 0.8]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial 
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Ambient Light from Laptop */}
      <pointLight 
        position={[0, 0.5, 0]} 
        intensity={0.3} 
        distance={4}
        color="#00a8e8" 
      />
    </group>
  );
}
