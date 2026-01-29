'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface TrainModelProps {
  position: number; // 0-100%
}

function TrainModel({ position }: TrainModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/train.glb');
  
  // Clone the scene to avoid sharing materials
  const clonedScene = scene.clone();
  
  useEffect(() => {
    // Apply gradient-like material to train
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#00a8e8'),
          metalness: 0.9,
          roughness: 0.1,
          emissive: new THREE.Color('#a55eea'),
          emissiveIntensity: 0.5,
        });
      }
    });
  }, [clonedScene]);

  // Gentle rocking animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.01;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.02;
    }
  });

  return (
    <group ref={groupRef} scale={0.35} rotation={[0, Math.PI / 2, 0]} position={[0, -0.2, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

export default function MiniTrain3D({ position }: TrainModelProps) {
  return (
    <div 
      className="absolute -top-2 w-16 h-10 pointer-events-none transition-all duration-500 ease-out"
      style={{ 
        left: `${position}%`,
        transform: 'translateX(-50%)',
        zIndex: 10,
      }}
    >
      <Canvas
        className="w-full h-full"
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0.8, 2.5]} fov={40} />
        
        {/* Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 3, 2]} intensity={1.5} color="#00a8e8" />
        <pointLight position={[-2, 1, 1]} intensity={0.8} color="#a55eea" />
        <spotLight 
          position={[0, 4, 2]} 
          angle={0.4} 
          penumbra={0.8} 
          intensity={1.2}
        />
        
        <TrainModel position={position} />
      </Canvas>
      
      {/* Enhanced Glow effect underneath */}
      <div 
        className="absolute inset-0 rounded-full blur-lg opacity-70 -z-10"
        style={{ 
          background: 'radial-gradient(ellipse, rgba(0,168,232,0.9) 0%, rgba(165,94,234,0.6) 40%, transparent 70%)',
          transform: 'scaleY(0.5)',
        }}
      />
    </div>
  );
}

// Preload the model
useGLTF.preload('/train.glb');
