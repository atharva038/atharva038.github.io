'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useMetroStore } from '@/store/useMetroStore';

// Metro Train Component using GLB model
export function MetroTrain() {
  const groupRef = useRef<THREE.Group>(null);
  const { trainPosition } = useMetroStore();
  
  // Load the GLB model
  const { scene } = useGLTF('/train.glb');
  
  // Animate train position smoothly
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        trainPosition * 2,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={0.5} rotation={[0, Math.PI / 2, 0]}>
      <primitive object={scene.clone()} />
    </group>
  );
}

// Preload the model for better performance
useGLTF.preload('/train.glb');

