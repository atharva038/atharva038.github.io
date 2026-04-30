/* eslint-disable react-hooks/purity */
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Edges } from "@react-three/drei";
import * as THREE from "three";

const ORIGINAL_POSITIONS = [
  new THREE.Vector3(0, -1.5, 0), // Base 1
  new THREE.Vector3(0, -1.2, 0), // Base 2
  new THREE.Vector3(0, 0, 0), // Body
  new THREE.Vector3(0, 1.2, 0), // Neck
  new THREE.Vector3(0, 1.4, 0), // Head Base
  new THREE.Vector3(0, 1.8, 0), // Cross V
  new THREE.Vector3(0, 1.8, 0), // Cross H
];

const ORIGINAL_ROTATIONS = [
  new THREE.Euler(0, 0, 0),
  new THREE.Euler(0, 0, 0),
  new THREE.Euler(0, 0, 0),
  new THREE.Euler(Math.PI / 2, 0, 0), // Torus neck needs rotation to lay flat
  new THREE.Euler(0, 0, 0),
  new THREE.Euler(0, 0, 0),
  new THREE.Euler(0, 0, 0),
];

function ChessKing() {
  const groupRef = useRef<THREE.Group>(null);
  const partsRef = useRef<(THREE.Mesh | null)[]>([]);

  const scatteredPositionsRef = useRef<THREE.Vector3[] | null>(null);
  if (!scatteredPositionsRef.current) {
    scatteredPositionsRef.current = ORIGINAL_POSITIONS.map(
      (pos) =>
        new THREE.Vector3(
          pos.x + (Math.random() - 0.5) * 15,
          pos.y + (Math.random() - 0.5) * 15 + 5,
          pos.z + (Math.random() - 0.5) * 15 - 5
        )
    );
  }

  const scatteredRotationsRef = useRef<THREE.Euler[] | null>(null);
  if (!scatteredRotationsRef.current) {
    scatteredRotationsRef.current = ORIGINAL_ROTATIONS.map(
      (rot) =>
        new THREE.Euler(
          rot.x + (Math.random() - 0.5) * Math.PI * 4,
          rot.y + (Math.random() - 0.5) * Math.PI * 4,
          rot.z + (Math.random() - 0.5) * Math.PI * 4
        )
    );
  }

  const scatteredPositions = scatteredPositionsRef.current;
  const scatteredRotations = scatteredRotationsRef.current;

  useFrame((state) => {
    if (!groupRef.current) return;

    // Smoothly assemble the pieces over time
    partsRef.current.forEach((part, i) => {
      if (!part) return;
      // Lerp position
      part.position.lerp(ORIGINAL_POSITIONS[i], 0.04);

      // Lerp rotation using Quaternions for shortest-path smooth rotation
      const currentQuat = new THREE.Quaternion().setFromEuler(part.rotation);
      const targetQuat = new THREE.Quaternion().setFromEuler(ORIGINAL_ROTATIONS[i]);
      currentQuat.slerp(targetQuat, 0.04);
      part.rotation.setFromQuaternion(currentQuat);
    });

    // Make the entire group look at the mouse cursor
    // Pointer is normalized between -1 and 1
    const mouseTarget = new THREE.Vector3(state.pointer.x * 2.5, state.pointer.y * 2.5, 5);
    // Create a target quaternion that looks at the mouse position
    const targetRotation = new THREE.Quaternion().setFromRotationMatrix(
      new THREE.Matrix4().lookAt(groupRef.current.position, mouseTarget, groupRef.current.up)
    );
    // Slerp the group's quaternion towards the target for smooth tracking
    groupRef.current.quaternion.slerp(targetRotation, 0.05);
  });

  const materialProps = {
    roughness: 0.15,
    metalness: 0.9,
    transparent: true,
    opacity: 0.9,
    color: "#0f172a", // Dark obsidian
  };

  return (
    <group ref={groupRef} scale={1.2}>
      <mesh
        ref={(el) => (partsRef.current[0] = el)}
        position={scatteredPositions[0]}
        rotation={scatteredRotations[0]}
      >
        <cylinderGeometry args={[1, 1.2, 0.4, 32]} />
        <meshStandardMaterial {...materialProps} />
        <Edges scale={1.05} threshold={15} color="#38bdf8" />
      </mesh>
      <mesh
        ref={(el) => (partsRef.current[1] = el)}
        position={scatteredPositions[1]}
        rotation={scatteredRotations[1]}
      >
        <cylinderGeometry args={[0.9, 1, 0.2, 32]} />
        <meshStandardMaterial {...materialProps} />
        <Edges scale={1.05} threshold={15} color="#38bdf8" />
      </mesh>
      <mesh
        ref={(el) => (partsRef.current[2] = el)}
        position={scatteredPositions[2]}
        rotation={scatteredRotations[2]}
      >
        <cylinderGeometry args={[0.4, 0.8, 2.2, 32]} />
        <meshStandardMaterial {...materialProps} color="#1e293b" />
        <Edges scale={1.05} threshold={15} color="#818cf8" />
      </mesh>
      <mesh
        ref={(el) => (partsRef.current[3] = el)}
        position={scatteredPositions[3]}
        rotation={scatteredRotations[3]}
      >
        <torusGeometry args={[0.5, 0.15, 16, 32]} />
        <meshStandardMaterial {...materialProps} />
        <Edges scale={1.05} threshold={15} color="#c084fc" />
      </mesh>
      <mesh
        ref={(el) => (partsRef.current[4] = el)}
        position={scatteredPositions[4]}
        rotation={scatteredRotations[4]}
      >
        <cylinderGeometry args={[0.6, 0.5, 0.3, 32]} />
        <meshStandardMaterial {...materialProps} />
        <Edges scale={1.05} threshold={15} color="#38bdf8" />
      </mesh>
      {/* The Cross */}
      <mesh
        ref={(el) => (partsRef.current[5] = el)}
        position={scatteredPositions[5]}
        rotation={scatteredRotations[5]}
      >
        <boxGeometry args={[0.2, 0.6, 0.15]} />
        <meshStandardMaterial {...materialProps} />
        <Edges scale={1.05} threshold={15} color="#e879f9" />
      </mesh>
      <mesh
        ref={(el) => (partsRef.current[6] = el)}
        position={scatteredPositions[6]}
        rotation={scatteredRotations[6]}
      >
        <boxGeometry args={[0.5, 0.2, 0.15]} />
        <meshStandardMaterial {...materialProps} />
        <Edges scale={1.05} threshold={15} color="#e879f9" />
      </mesh>
    </group>
  );
}

export default function Hero3DChessPiece() {
  const [contextLost, setContextLost] = useState(false);

  if (contextLost) {
    return (
      <div className="w-full h-full flex items-center justify-center opacity-30">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-foreground">
          <path d="M19 22H5v-2h14v2M17.16 8.26C18.34 6.3 18.08 3.77 16.43 2.12A5 5 0 0 0 8.11 7.8L11 12.16V15h2v-2.84l4.16-3.9M9 18h6v2H9v-2m4-7.31V15H9v-4.31l-3-4.36C5 4.76 5.7 2.71 7.37 1.63A5 5 0 0 1 14.9 3.5c1.38 2.07.93 4.79-.9 6.35L11 12.84V13H9v-.16L9 18z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative cursor-pointer">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        className="w-full h-full absolute inset-0"
        gl={{ powerPreference: "high-performance", antialias: false }}
        onCreated={({ gl }) => {
          const canvas = gl.domElement;
          canvas.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            setContextLost(true);
          });
        }}
      >
        {/* Dynamic Studio Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={2.5} color="#06b6d4" />
        <directionalLight position={[-5, 5, 5]} intensity={2.5} color="#a855f7" />
        <directionalLight position={[0, -5, -5]} intensity={2.0} color="#ec4899" />

        <Float speed={2.5} rotationIntensity={0.2} floatIntensity={1.5}>
          <ChessKing />
        </Float>
      </Canvas>
    </div>
  );
}
