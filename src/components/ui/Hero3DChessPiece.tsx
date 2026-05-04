/* eslint-disable react-hooks/purity */
import { useRef, useState,Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { Theme } from "@/components/theme-context";
import {
  FloatingModel,
  ResponsiveCanvas,
  SceneLights,
} from "@/components/ui/three-system";
import { MODEL_PALETTES, useThemeModelPalette } from "@/components/ui/three-system-core";

const ORIGINAL_POSITIONS = [
  new THREE.Vector3(0, -1.65, 0), // plinth
  new THREE.Vector3(0, -1.34, 0), // lower bevel
  new THREE.Vector3(0, -1.08, 0), // upper bevel
  new THREE.Vector3(0, -0.1, 0), // tapered body
  new THREE.Vector3(0, 0.96, 0), // collar
  new THREE.Vector3(0, 1.24, 0), // crown cup
  new THREE.Vector3(0, 1.55, 0), // crown cap
  new THREE.Vector3(0, 1.92, 0), // vertical crown mark
  new THREE.Vector3(0, 1.92, 0), // horizontal crown mark
  new THREE.Vector3(0, 2.24, 0), // crown gem
];

const ORIGINAL_ROTATIONS = [
  new THREE.Euler(0, 0, 0),
  new THREE.Euler(0, 0, 0),
  new THREE.Euler(0, 0, 0),
  new THREE.Euler(0, 0, 0),
  new THREE.Euler(Math.PI / 2, 0, 0),
  new THREE.Euler(0, 0, 0),
  new THREE.Euler(0, 0, 0),
  new THREE.Euler(0, 0, 0),
  new THREE.Euler(0, 0, 0),
  new THREE.Euler(0, 0, 0),
];

function ChessKing({ theme }: { theme: Theme }) {
  const groupRef = useRef<THREE.Group>(null);
  const partsRef = useRef<(THREE.Mesh | null)[]>([]);
  const palette = MODEL_PALETTES[theme];

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

    partsRef.current.forEach((part, i) => {
      if (!part) return;
      part.position.lerp(ORIGINAL_POSITIONS[i], 0.045);

      const currentQuat = new THREE.Quaternion().setFromEuler(part.rotation);
      const targetQuat = new THREE.Quaternion().setFromEuler(ORIGINAL_ROTATIONS[i]);
      currentQuat.slerp(targetQuat, 0.045);
      part.rotation.setFromQuaternion(currentQuat);
    });

    const targetRotation = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        -state.pointer.y * 0.22,
        state.pointer.x * 0.34 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05,
        Math.sin(state.clock.elapsedTime * 0.35) * 0.035
      )
    );
    groupRef.current.quaternion.slerp(targetRotation, 0.06);
  });

  const [woodTexture, metalTexture] = useTexture([
    "/textures/wavy_wood_grain.png",
    "/textures/brushed_metal.png"
  ]);
  
  woodTexture.colorSpace = THREE.SRGBColorSpace;
  woodTexture.wrapS = THREE.RepeatWrapping;
  woodTexture.wrapT = THREE.RepeatWrapping;

  metalTexture.colorSpace = THREE.SRGBColorSpace;
  metalTexture.wrapS = THREE.RepeatWrapping;
  metalTexture.wrapT = THREE.RepeatWrapping;

  const getBodyMaterialProps = () => {
    switch (theme) {
      case "dark":
        return {
          map: woodTexture,
          roughness: 0.85,
          metalness: 0.15,
          color: "#475569", // Slate color to match dark theme's blueish-gray palette
        };
      case "blkdev":
        return {
          map: woodTexture,
          roughness: 0.95,
          metalness: 0.1,
          color: "#525252", // Pure neutral gray for blkdev's monochromatic palette
        };
      case "light":
      default:
        return {
          map: woodTexture,
          roughness: 0.9,
          metalness: 0.1,
          color: "#2a2a2a", // Dark charcoal to provide stark contrast against the light background
        };
    }
  };

  const getAccentMaterialProps = () => {
    switch (theme) {
      case "dark":
        return {
          map: metalTexture,
          roughness: 0.5,
          metalness: 0.8,
          color: palette.accent,
          emissive: palette.accent,
          emissiveIntensity: 0.15,
        };
      case "blkdev":
      case "light":
      default:
        return {
          map: metalTexture,
          roughness: 0.6,
          metalness: 0.7,
          color: palette.accent,
          emissive: palette.accent,
          emissiveIntensity: 0.1,
        };
    }
  };

  const bodyMaterialProps = getBodyMaterialProps();
  const accentMaterialProps = getAccentMaterialProps();

  return (
    <group ref={groupRef} scale={1.08}>
      <mesh
        ref={(el) => {
          partsRef.current[0] = el;
        }}
        position={scatteredPositions[0]}
        rotation={scatteredRotations[0]}
      >
        <cylinderGeometry args={[1.18, 1.34, 0.32, 48]} />
        <meshPhysicalMaterial {...bodyMaterialProps} />
        <Edges scale={1.035} threshold={15} color={palette.edge} />
      </mesh>
      <mesh
        ref={(el) => {
          partsRef.current[1] = el;
        }}
        position={scatteredPositions[1]}
        rotation={scatteredRotations[1]}
      >
        <cylinderGeometry args={[0.96, 1.12, 0.24, 48]} />
        <meshPhysicalMaterial {...bodyMaterialProps} />
        <Edges scale={1.035} threshold={15} color={palette.softEdge} />
      </mesh>
      <mesh
        ref={(el) => {
          partsRef.current[2] = el;
        }}
        position={scatteredPositions[2]}
        rotation={scatteredRotations[2]}
      >
        <cylinderGeometry args={[0.82, 0.92, 0.22, 48]} />
        <meshPhysicalMaterial {...bodyMaterialProps} />
        <Edges scale={1.035} threshold={15} color={palette.edge} />
      </mesh>
      <mesh
        ref={(el) => {
          partsRef.current[3] = el;
        }}
        position={scatteredPositions[3]}
        rotation={scatteredRotations[3]}
      >
        <cylinderGeometry args={[0.42, 0.72, 1.72, 48]} />
        <meshPhysicalMaterial {...bodyMaterialProps} />
        <Edges scale={1.025} threshold={15} color={palette.softEdge} />
      </mesh>
      <mesh
        ref={(el) => {
          partsRef.current[4] = el;
        }}
        position={scatteredPositions[4]}
        rotation={scatteredRotations[4]}
      >
        <torusGeometry args={[0.52, 0.12, 18, 48]} />
        <meshPhysicalMaterial {...bodyMaterialProps} />
        <Edges scale={1.03} threshold={15} color={palette.edge} />
      </mesh>
      <mesh
        ref={(el) => {
          partsRef.current[5] = el;
        }}
        position={scatteredPositions[5]}
        rotation={scatteredRotations[5]}
      >
        <cylinderGeometry args={[0.56, 0.46, 0.34, 48]} />
        <meshPhysicalMaterial {...bodyMaterialProps} />
        <Edges scale={1.035} threshold={15} color={palette.softEdge} />
      </mesh>
      <mesh
        ref={(el) => {
          partsRef.current[6] = el;
        }}
        position={scatteredPositions[6]}
        rotation={scatteredRotations[6]}
      >
        <cylinderGeometry args={[0.42, 0.56, 0.22, 48]} />
        <meshPhysicalMaterial {...bodyMaterialProps} />
        <Edges scale={1.035} threshold={15} color={palette.edge} />
      </mesh>
      <mesh
        ref={(el) => {
          partsRef.current[7] = el;
        }}
        position={scatteredPositions[7]}
        rotation={scatteredRotations[7]}
      >
        <boxGeometry args={[0.14, 0.55, 0.12]} />
        <meshPhysicalMaterial {...accentMaterialProps} />
        <Edges scale={1.04} threshold={15} color={palette.edge} />
      </mesh>
      <mesh
        ref={(el) => {
          partsRef.current[8] = el;
        }}
        position={scatteredPositions[8]}
        rotation={scatteredRotations[8]}
      >
        <boxGeometry args={[0.46, 0.14, 0.12]} />
        <meshPhysicalMaterial {...accentMaterialProps} />
        <Edges scale={1.04} threshold={15} color={palette.edge} />
      </mesh>
      <mesh
        ref={(el) => {
          partsRef.current[9] = el;
        }}
        position={scatteredPositions[9]}
        rotation={scatteredRotations[9]}
      >
        <octahedronGeometry args={[0.14, 0]} />
        <meshPhysicalMaterial {...accentMaterialProps} />
        <Edges scale={1.05} threshold={15} color={palette.edge} />
      </mesh>
    </group>
  );
}

export default function Hero3DChessPiece() {
  const [contextLost, setContextLost] = useState(false);
  const { theme } = useThemeModelPalette();

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
      <ResponsiveCanvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        className="w-full h-full absolute inset-0"
        minWidth={360}
      >
        <WebglContextWatcher onLost={() => setContextLost(true)} />
        <SceneLights intensity={1.2} />

        <FloatingModel speed={1.7} rotationIntensity={0.08} floatIntensity={0.72}>
          <Suspense fallback={null}>
            <ChessKing theme={theme} />
          </Suspense>
        </FloatingModel>
      </ResponsiveCanvas>
    </div>
  );
}

function WebglContextWatcher({ onLost }: { onLost: () => void }) {
  useFrame(({ gl }) => {
    const canvas = gl.domElement;
    if (canvas.dataset.contextWatcherAttached) return;
    canvas.dataset.contextWatcherAttached = "true";
    canvas.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      onLost();
    });
  });

  return null;
}
