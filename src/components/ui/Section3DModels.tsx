import { Suspense, useRef } from "react";
import type { ComponentProps, ReactNode } from "react";
import { Edges, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  FloatingModel,
  ResponsiveCanvas,
  SceneLights,
} from "@/components/ui/three-system";
import { useThemeModelPalette } from "@/components/ui/three-system-core";

function CircuitMaterial({
  kind,
  variant = "body",
  opacity,
  emissive = false,
}: {
  kind: "chip" | "panel" | "terminal";
  variant?: "body" | "secondary" | "accent";
  opacity?: number;
  emissive?: boolean;
}) {
  const { palette, theme } = useThemeModelPalette();
  
  const getTextureColor = () => {
    if (variant === "accent") return palette.accent;
    if (emissive) return palette[variant];
    
    switch (theme) {
      case "dark":
        return variant === "body" ? "#475569" : "#64748b";
      case "blkdev":
        return variant === "body" ? "#525252" : "#737373";
      case "light":
      default:
        return variant === "body" ? "#555555" : "#888888";
    }
  };
  
  const color = getTextureColor();

  const textures = useTexture([
    "/textures/silicon_wafer.png",
    "/textures/scratched_gunmetal.png",
    "/textures/quantum_core.png"
  ]);

  const texture = kind === "chip" ? textures[0] : kind === "panel" ? textures[1] : textures[2];

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.needsUpdate = true; // Crucial for Three.js when changing wrap/repeat on cached textures!

  return (
    <meshPhysicalMaterial
      color="#ffffff" // Force white so the texture isn't darkened
      emissive={emissive ? palette[variant] : "#000000"}
      emissiveIntensity={emissive ? 0.2 : 0}
      map={texture}
      metalness={0.2} // Lower metalness so it doesn't reflect pitch black environment
      roughness={0.8} // Higher roughness so it's diffusely lit
    />
  );
}

export function OrbitingTechTokens() {
  const groupRef = useRef<THREE.Group>(null);
  const { palette } = useThemeModelPalette();

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.28;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.45) * 0.08;
  });

  const tokens = [
    { position: [1.42, 0.12, 0] as const, rotation: [0.5, 0.2, 0.1] as const },
    { position: [-0.92, 1.02, -0.24] as const, rotation: [0.1, 0.8, 0.4] as const },
    { position: [-0.78, -1.02, 0.15] as const, rotation: [0.4, 0.1, 0.9] as const },
    { position: [0.16, 0, 1.35] as const, rotation: [0.7, 0.7, 0] as const },
  ];

  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[1.12, 0.012, 8, 72]} />
        <CircuitMaterial kind="panel" variant="accent" opacity={0.54} emissive />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.72, 0.01, 8, 64]} />
        <CircuitMaterial kind="panel" variant="secondary" opacity={0.48} />
      </mesh>

      {tokens.map((token, index) => (
        <group key={index} position={token.position} rotation={token.rotation}>
          <mesh>
            <boxGeometry args={[0.44, 0.32, 0.12]} />
            <CircuitMaterial kind="chip" variant={index % 2 === 0 ? "body" : "secondary"} />
            <Edges scale={1.035} threshold={15} color={index % 2 === 0 ? palette.edge : palette.softEdge} />
          </mesh>
          <mesh position={[0, 0, 0.085]}>
            <boxGeometry args={[0.22, 0.14, 0.024]} />
            <CircuitMaterial kind="panel" variant="accent" opacity={0.82} emissive />
          </mesh>
          {[-0.28, 0.28].map((x) => (
            <mesh key={x} position={[x, 0, 0]}>
              <boxGeometry args={[0.035, 0.38, 0.035]} />
              <CircuitMaterial kind="panel" variant="accent" opacity={0.62} emissive />
            </mesh>
          ))}
        </group>
      ))}

      <mesh rotation={[0.2, 0.45, 0]}>
        <dodecahedronGeometry args={[0.3, 0]} />
        <CircuitMaterial kind="panel" variant="accent" emissive />
        <Edges scale={1.04} threshold={15} color={palette.edge} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.035, 48]} />
        <CircuitMaterial kind="panel" variant="secondary" opacity={0.6} />
        <Edges scale={1.025} threshold={15} color={palette.softEdge} />
      </mesh>
    </group>
  );
}

export function HolographicProjectModules() {
  const groupRef = useRef<THREE.Group>(null);
  const { palette } = useThemeModelPalette();

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.22;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.05;
  });

  return (
    <group ref={groupRef} rotation={[0.15, -0.25, 0]}>
      {[-0.58, 0, 0.58].map((x, index) => (
        <group key={x} position={[x, index === 1 ? 0.16 : -0.04, index === 1 ? 0.08 : 0]}>
          <mesh>
            <boxGeometry args={[0.48, 0.68, 0.075]} />
            <CircuitMaterial kind="panel" variant={index === 1 ? "accent" : "secondary"} opacity={index === 1 ? 0.72 : 0.56} emissive={index === 1} />
            <Edges scale={1.035} threshold={15} color={index === 1 ? palette.edge : palette.softEdge} />
          </mesh>
          <mesh position={[0, -0.24, 0.065]}>
            <boxGeometry args={[0.32, 0.035, 0.025]} />
            <CircuitMaterial kind="panel" variant="body" opacity={0.7} />
          </mesh>
          <mesh position={[0, 0.23, 0.066]}>
            <boxGeometry args={[0.28, 0.035, 0.025]} />
            <CircuitMaterial kind="panel" variant="accent" opacity={0.7} emissive />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -0.62, -0.02]}>
        <boxGeometry args={[1.82, 0.06, 0.16]} />
        <CircuitMaterial kind="panel" variant="body" />
        <Edges scale={1.02} threshold={15} color={palette.edge} />
      </mesh>
      {[-0.86, 0.86].map((x) => (
        <mesh key={x} position={[x, -0.38, 0.08]}>
          <cylinderGeometry args={[0.05, 0.05, 0.14, 24]} />
          <CircuitMaterial kind="panel" variant="accent" emissive />
        </mesh>
      ))}
      <mesh position={[0, 0.72, -0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.78, 0.008, 8, 72]} />
        <CircuitMaterial kind="panel" variant="accent" opacity={0.5} emissive />
      </mesh>
    </group>
  );
}

export function MechanicalTimelineMarkers() {
  const groupRef = useRef<THREE.Group>(null);
  const { palette } = useThemeModelPalette();

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.55) * 0.08;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.18;
  });

  return (
    <group ref={groupRef}>
      {[-0.72, 0, 0.72].map((y, index) => (
        <group key={y} position={[0, y, 0]} scale={index === 1 ? 1.08 : 0.82}>
          {Array.from({ length: 10 }).map((_, toothIndex) => {
            const angle = (toothIndex / 10) * Math.PI * 2;
            return (
              <mesh
                key={toothIndex}
                position={[Math.cos(angle) * 0.29, Math.sin(angle) * 0.29, 0]}
                rotation={[0, 0, angle]}
              >
                <boxGeometry args={[0.055, 0.12, 0.055]} />
                <CircuitMaterial kind="panel" variant={index === 1 ? "accent" : "secondary"} opacity={0.74} emissive={index === 1} />
              </mesh>
            );
          })}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.24, 0.035, 12, 36]} />
            <CircuitMaterial kind="panel" variant={index === 1 ? "accent" : "secondary"} emissive={index === 1} />
            <Edges scale={1.03} threshold={15} color={index === 1 ? palette.edge : palette.softEdge} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.18, 24]} />
            <CircuitMaterial kind="panel" variant="body" />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[0.05, 1.6, 0.05]} />
        <CircuitMaterial kind="panel" variant="body" opacity={0.64} />
      </mesh>
      <mesh position={[0, 0, -0.09]}>
        <boxGeometry args={[0.18, 1.88, 0.028]} />
        <CircuitMaterial kind="panel" variant="secondary" opacity={0.38} />
      </mesh>
    </group>
  );
}

export function SignalTerminalCube() {
  const groupRef = useRef<THREE.Group>(null);
  const { palette } = useThemeModelPalette();

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.35;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.65) * 0.14;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[0.82, 0.82, 0.82]} />
        <CircuitMaterial kind="terminal" variant="body" opacity={0.78} />
        <Edges scale={1.04} threshold={15} color={palette.edge} />
      </mesh>
      <mesh position={[0, 0, 0.43]}>
        <boxGeometry args={[0.56, 0.36, 0.025]} />
        <CircuitMaterial kind="terminal" variant="secondary" opacity={0.72} />
      </mesh>
      <mesh position={[-0.18, -0.24, 0.445]}>
        <boxGeometry args={[0.16, 0.035, 0.02]} />
        <CircuitMaterial kind="panel" variant="accent" opacity={0.8} emissive />
      </mesh>
      <mesh position={[0.12, -0.24, 0.445]}>
        <boxGeometry args={[0.28, 0.035, 0.02]} />
        <CircuitMaterial kind="panel" variant="accent" opacity={0.5} emissive />
      </mesh>
      {[0.68, 1.02, 1.36].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.01, 8, 72]} />
          <CircuitMaterial kind="panel" variant="accent" opacity={0.44 - index * 0.09} emissive />
        </mesh>
      ))}
      <mesh position={[0, 0.52, 0]}>
        <octahedronGeometry args={[0.14, 0]} />
        <CircuitMaterial kind="panel" variant="accent" emissive />
      </mesh>
      <mesh position={[0, 0.7, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.08, 0.28, 0.08]} />
        <CircuitMaterial kind="panel" variant="accent" emissive />
      </mesh>
    </group>
  );
}

function SectionModelShell({
  children,
  className,
  minWidth = 700,
  camera,
}: {
  children: ReactNode;
  className: string;
  minWidth?: number;
  camera?: ComponentProps<typeof ResponsiveCanvas>["camera"];
}) {
  return (
    <div className={className} aria-hidden="true">
      <ResponsiveCanvas className="absolute inset-0 h-full w-full" minWidth={minWidth} camera={camera}>
        <SceneLights intensity={0.86} />
        <FloatingModel>
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </FloatingModel>
      </ResponsiveCanvas>
    </div>
  );
}

export function Skills3DModel() {
  return (
    <SectionModelShell className="pointer-events-none absolute right-4 top-10 hidden h-40 w-40 opacity-80 sm:block lg:right-20 lg:h-48 lg:w-48">
      <OrbitingTechTokens />
    </SectionModelShell>
  );
}

export function Projects3DModel() {
  return (
    <SectionModelShell
      className="pointer-events-none absolute right-0 top-8 hidden h-44 w-56 opacity-70 md:block lg:right-8"
      camera={{ position: [0, 0, 5.5], fov: 40 }}
    >
      <HolographicProjectModules />
    </SectionModelShell>
  );
}

export function Experience3DModel() {
  return (
    <SectionModelShell
      className="pointer-events-none absolute left-0 top-28 hidden h-52 w-32 opacity-75 md:block"
      camera={{ position: [0, 0, 4.8], fov: 38 }}
    >
      <MechanicalTimelineMarkers />
    </SectionModelShell>
  );
}

export function Contact3DModel() {
  return (
    <SectionModelShell
      className="pointer-events-none mx-auto mb-6 h-36 w-36 opacity-80 sm:mx-0"
      minWidth={520}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
    >
      <SignalTerminalCube />
    </SectionModelShell>
  );
}
