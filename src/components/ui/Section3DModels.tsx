import { useMemo, useRef } from "react";
import type { ComponentProps, ReactNode } from "react";
import { Edges } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  FloatingModel,
  ResponsiveCanvas,
  SceneLights,
  ThemeAwareMaterial,
} from "@/components/ui/three-system";
import { useThemeModelPalette } from "@/components/ui/three-system-core";

function useCircuitTexture(kind: "chip" | "panel" | "terminal") {
  const { palette, theme } = useThemeModelPalette();

  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;

    const context = canvas.getContext("2d");
    if (!context) return null;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = theme === "light" ? "rgba(245,208,0,0.08)" : "rgba(255,255,255,0.045)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = kind === "terminal" ? palette.accent : palette.edge;
    context.globalAlpha = kind === "panel" ? 0.32 : 0.44;
    context.lineWidth = kind === "terminal" ? 2 : 1.4;

    const lines =
      kind === "terminal"
        ? [
            [28, 58, 124, 58],
            [28, 94, 188, 94],
            [28, 130, 148, 130],
            [28, 166, 208, 166],
          ]
        : [
            [28, 42, 112, 42],
            [112, 42, 112, 92],
            [62, 118, 194, 118],
            [194, 118, 194, 188],
            [44, 202, 144, 202],
            [144, 202, 144, 162],
          ];

    lines.forEach(([x1, y1, x2, y2]) => {
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
    });

    const nodes = kind === "terminal" ? [58, 94, 130, 166] : [42, 92, 118, 162, 188, 202];
    nodes.forEach((y, index) => {
      context.beginPath();
      context.arc(36 + index * 28, y, kind === "terminal" ? 3 : 4, 0, Math.PI * 2);
      context.fillStyle = palette.accent;
      context.globalAlpha = 0.5;
      context.fill();
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(kind === "chip" ? 1.5 : 1, kind === "chip" ? 1.5 : 1);
    texture.needsUpdate = true;

    return texture;
  }, [kind, palette.accent, palette.edge, theme]);
}

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
  const texture = useCircuitTexture(kind);
  const { palette, theme } = useThemeModelPalette();
  const color = palette[variant];

  return (
    <meshPhysicalMaterial
      color={color}
      emissive={emissive ? color : "#000000"}
      emissiveIntensity={emissive ? (theme === "dark" ? 0.12 : 0.18) : 0}
      map={texture ?? undefined}
      metalness={variant === "accent" ? 0.72 : palette.metalness}
      opacity={opacity ?? palette.opacity}
      roughness={variant === "accent" ? 0.24 : palette.roughness}
      clearcoat={0.36}
      clearcoatRoughness={0.28}
      transparent
    />
  );
}

function OrbitingTechTokens() {
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
        <ThemeAwareMaterial variant="accent" opacity={0.54} emissive />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.72, 0.01, 8, 64]} />
        <ThemeAwareMaterial variant="secondary" opacity={0.48} />
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
            <ThemeAwareMaterial variant="accent" opacity={0.82} emissive />
          </mesh>
          {[-0.28, 0.28].map((x) => (
            <mesh key={x} position={[x, 0, 0]}>
              <boxGeometry args={[0.035, 0.38, 0.035]} />
              <ThemeAwareMaterial variant="accent" opacity={0.62} emissive />
            </mesh>
          ))}
        </group>
      ))}

      <mesh rotation={[0.2, 0.45, 0]}>
        <dodecahedronGeometry args={[0.3, 0]} />
        <ThemeAwareMaterial variant="accent" emissive />
        <Edges scale={1.04} threshold={15} color={palette.edge} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.035, 48]} />
        <ThemeAwareMaterial variant="secondary" opacity={0.6} />
        <Edges scale={1.025} threshold={15} color={palette.softEdge} />
      </mesh>
    </group>
  );
}

function HolographicProjectModules() {
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
            <ThemeAwareMaterial variant="body" opacity={0.7} />
          </mesh>
          <mesh position={[0, 0.23, 0.066]}>
            <boxGeometry args={[0.28, 0.035, 0.025]} />
            <ThemeAwareMaterial variant="accent" opacity={0.7} emissive />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -0.62, -0.02]}>
        <boxGeometry args={[1.82, 0.06, 0.16]} />
        <ThemeAwareMaterial variant="body" />
        <Edges scale={1.02} threshold={15} color={palette.edge} />
      </mesh>
      {[-0.86, 0.86].map((x) => (
        <mesh key={x} position={[x, -0.38, 0.08]}>
          <cylinderGeometry args={[0.05, 0.05, 0.14, 24]} />
          <ThemeAwareMaterial variant="accent" emissive />
        </mesh>
      ))}
      <mesh position={[0, 0.72, -0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.78, 0.008, 8, 72]} />
        <ThemeAwareMaterial variant="accent" opacity={0.5} emissive />
      </mesh>
    </group>
  );
}

function MechanicalTimelineMarkers() {
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
                <ThemeAwareMaterial variant={index === 1 ? "accent" : "secondary"} opacity={0.74} emissive={index === 1} />
              </mesh>
            );
          })}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.24, 0.035, 12, 36]} />
            <ThemeAwareMaterial variant={index === 1 ? "accent" : "secondary"} emissive={index === 1} />
            <Edges scale={1.03} threshold={15} color={index === 1 ? palette.edge : palette.softEdge} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.18, 24]} />
            <ThemeAwareMaterial variant="body" />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[0.05, 1.6, 0.05]} />
        <ThemeAwareMaterial variant="body" opacity={0.64} />
      </mesh>
      <mesh position={[0, 0, -0.09]}>
        <boxGeometry args={[0.18, 1.88, 0.028]} />
        <ThemeAwareMaterial variant="secondary" opacity={0.38} />
      </mesh>
    </group>
  );
}

function SignalTerminalCube() {
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
        <ThemeAwareMaterial variant="accent" opacity={0.8} emissive />
      </mesh>
      <mesh position={[0.12, -0.24, 0.445]}>
        <boxGeometry args={[0.28, 0.035, 0.02]} />
        <ThemeAwareMaterial variant="accent" opacity={0.5} emissive />
      </mesh>
      {[0.68, 1.02, 1.36].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.01, 8, 72]} />
          <ThemeAwareMaterial variant="accent" opacity={0.44 - index * 0.09} emissive />
        </mesh>
      ))}
      <mesh position={[0, 0.52, 0]}>
        <octahedronGeometry args={[0.14, 0]} />
        <ThemeAwareMaterial variant="accent" emissive />
      </mesh>
      <mesh position={[0, 0.7, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.08, 0.28, 0.08]} />
        <ThemeAwareMaterial variant="accent" emissive />
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
        <FloatingModel>{children}</FloatingModel>
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
