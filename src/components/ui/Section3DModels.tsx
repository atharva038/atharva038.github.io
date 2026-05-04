import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import type { ComponentProps, ReactNode } from "react";
import { useTexture, Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  FloatingModel,
  ResponsiveCanvas,
  SceneLights,
} from "@/components/ui/three-system";
import { useThemeModelPalette } from "@/components/ui/three-system-core";
import { getPawnPoints, getRookPoints, getBishopPoints, getQueenPoints } from "@/components/ui/ChessGeometries";

function CircuitMaterial({
  variant = "body",
}: {
  kind?: "chip" | "panel" | "terminal";
  variant?: "body" | "secondary" | "accent" | "tooth_textured";
}) {
  const { theme, palette } = useThemeModelPalette();
  const [blackMarble, whiteMarble] = useTexture([
    "/textures/black_marble.png",
    "/textures/white_marble.png"
  ]);

  useMemo(() => {
    [blackMarble, whiteMarble].forEach(tex => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(2, 2);
      tex.needsUpdate = true;
    });
  }, [blackMarble, whiteMarble]);

  if (variant === "accent") {
    // Elegant warm gold in light mode instead of bright yellow
    const goldColor = theme === "light" ? "#C5A059" : palette.accent;
    return (
      <meshPhysicalMaterial
        color={goldColor}
        emissive={goldColor}
        emissiveIntensity={theme === "dark" ? 0.5 : 0.15}
        metalness={0.85}
        roughness={0.2}
        clearcoat={0.8}
      />
    );
  }

  // Deeper beige/stone shade for light mode to prevent merging with background and make veins darker
  const lightColor = "#C8C0B0";



  if (variant === "tooth_textured") {
    return (
      <meshPhysicalMaterial
        color={theme === "light" ? lightColor : "#ffffff"}
        map={theme === "light" ? whiteMarble : blackMarble}
        metalness={0.1}
        roughness={0.7} // High roughness prevents flat mirror reflection of the sky
        clearcoat={0.0} // Remove clearcoat so it doesn't glare white
      />
    );
  }

  if (variant === "secondary") {
    return (
      <meshPhysicalMaterial
        color={theme === "light" ? lightColor : "#151515"} // Dark stone color matching the marble base
        metalness={theme === "light" ? 0.4 : 0.3}
        roughness={0.25}
        clearcoat={0.6}
        clearcoatRoughness={0.15}
      />
    );
  }

  return (
    <meshPhysicalMaterial
      color={theme === "light" ? lightColor : "#ffffff"}
      map={theme === "light" ? whiteMarble : blackMarble}
      metalness={theme === "light" ? 0.4 : 0.3}
      roughness={0.25} // gentle polish
      clearcoat={0.6} // nice visible clearcoat
      clearcoatRoughness={0.15}
    />
  );
}

export function OrbitingTechTokens() {
  const groupRef = useRef<THREE.Group>(null);
  const pawnPoints = useMemo(() => getPawnPoints(), []);
  const [hovered, setHovered] = useState(false);

  const hoverFactor = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    hoverFactor.current = THREE.MathUtils.damp(hoverFactor.current, hovered ? 1 : 0, 6, delta);
    const targetRotation = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        Math.sin(state.clock.elapsedTime * 0.45) * 0.08 - state.pointer.y * 0.8 * hoverFactor.current,
        state.clock.elapsedTime * 0.28 + state.pointer.x * 0.8 * hoverFactor.current,
        0
      )
    );
    groupRef.current.quaternion.slerp(targetRotation, 0.08);
  });

  const tokens = [
    { position: [1.42, 0, 0] as const, rotation: [0, 0, 0] as const },
    { position: [-0.92, 0.4, -0.6] as const, rotation: [0, 0, 0] as const },
    { position: [-0.78, -0.6, 0.8] as const, rotation: [0, 0, 0] as const },
  ];

  return (
    <group
      ref={groupRef}
      scale={0.4}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      {tokens.map((token, index) => (
        <group key={index} position={token.position} rotation={token.rotation}>
          <mesh>
            <latheGeometry args={[pawnPoints, 32]} />
            <CircuitMaterial kind="chip" variant="body" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function HolographicProjectModules() {
  const groupRef = useRef<THREE.Group>(null);
  const rookPoints = useMemo(() => getRookPoints(), []);
  const [hovered, setHovered] = useState(false);

  const hoverFactor = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    hoverFactor.current = THREE.MathUtils.damp(hoverFactor.current, hovered ? 1 : 0, 6, delta);
    const targetRotation = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        0.15 - state.pointer.y * 0.8 * hoverFactor.current,
        -0.25 + Math.sin(state.clock.elapsedTime * 0.35) * 0.22 + state.pointer.x * 0.8 * hoverFactor.current,
        0
      )
    );
    groupRef.current.quaternion.slerp(targetRotation, 0.08);
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.05;
  });

  return (
    <group
      ref={groupRef}
      scale={0.55}
      rotation={[0.15, -0.25, 0]}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh position={[0, -1, 0]}>
        <latheGeometry args={[rookPoints, 32]} />
        <CircuitMaterial kind="panel" variant="body" />
      </mesh>

      {/* Modern Castellations (6 Textured Teeth) */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * Math.PI) / 3;
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.58, 1.4, Math.sin(angle) * 0.58]} rotation={[0, -angle, 0]}>
            <boxGeometry args={[0.3, 0.25, 0.15]} />
            <CircuitMaterial kind="panel" variant="tooth_textured" />
          </mesh>
        );
      })}
    </group>
  );
}

export function MechanicalTimelineMarkers() {
  const groupRef = useRef<THREE.Group>(null);
  const bishopPoints = useMemo(() => getBishopPoints(), []);
  const [hovered, setHovered] = useState(false);

  const hoverFactor = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    hoverFactor.current = THREE.MathUtils.damp(hoverFactor.current, hovered ? 1 : 0, 6, delta);
    const targetRotation = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        -state.pointer.y * 0.8 * hoverFactor.current,
        state.clock.elapsedTime * 0.18 + state.pointer.x * 0.8 * hoverFactor.current,
        Math.sin(state.clock.elapsedTime * 0.55) * 0.08
      )
    );
    groupRef.current.quaternion.slerp(targetRotation, 0.08);
  });

  return (
    <group
      ref={groupRef}
      scale={0.5}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh position={[0, -1, 0]}>
        <latheGeometry args={[bishopPoints, 32]} />
        <CircuitMaterial kind="panel" variant="body" />
      </mesh>
    </group>
  );
}

export function SignalTerminalCube() {
  const groupRef = useRef<THREE.Group>(null);
  const queenPoints = useMemo(() => getQueenPoints(), []);
  const [hovered, setHovered] = useState(false);

  const hoverFactor = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    hoverFactor.current = THREE.MathUtils.damp(hoverFactor.current, hovered ? 1 : 0, 6, delta);
    const targetRotation = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        Math.sin(state.clock.elapsedTime * 0.65) * 0.08 - state.pointer.y * 0.8 * hoverFactor.current,
        state.clock.elapsedTime * 0.35 + state.pointer.x * 0.8 * hoverFactor.current,
        0
      )
    );
    groupRef.current.quaternion.slerp(targetRotation, 0.08);
  });

  return (
    <group
      ref={groupRef}
      scale={0.45}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh position={[0, -1.2, 0]}>
        <latheGeometry args={[queenPoints, 32]} />
        <CircuitMaterial kind="terminal" variant="body" />
      </mesh>

      {/* Queen's floating crown/coronet elements */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.6, 2.0, Math.sin(angle) * 0.6]}>
            <octahedronGeometry args={[0.15, 0]} />
            <CircuitMaterial kind="panel" variant="body" />
          </mesh>
        );
      })}
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
  const { theme } = useThemeModelPalette();
  const [globalEventSource, setGlobalEventSource] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setGlobalEventSource(document.body);
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <ResponsiveCanvas eventSource={globalEventSource} className="absolute inset-0 h-full w-full" minWidth={minWidth} camera={camera}>
        <Environment preset="city" environmentIntensity={theme === "dark" ? 0.2 : 0.8} />
        <SceneLights intensity={theme === "dark" ? 1.5 : 0.8} />
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
    <SectionModelShell className="pointer-events-none absolute right-[-10%] top-0 hidden h-[40rem] w-[40rem] opacity-70 sm:block">
      <OrbitingTechTokens />
    </SectionModelShell>
  );
}

export function Projects3DModel() {
  return (
    <SectionModelShell
      className="pointer-events-none absolute right-[-5%] top-10 hidden h-[45rem] w-[45rem] opacity-60 md:block"
      camera={{ position: [0, 0, 4.5], fov: 40 }}
    >
      <SignalTerminalCube />
    </SectionModelShell>
  );
}

export function Experience3DModel() {
  return (
    <SectionModelShell
      className="pointer-events-none absolute left-[-5%] top-20 hidden h-[40rem] w-[40rem] opacity-65 md:block"
      camera={{ position: [0, 0, 4.2], fov: 38 }}
    >
      <MechanicalTimelineMarkers />
    </SectionModelShell>
  );
}

export function Contact3DModel() {
  return (
    <SectionModelShell
      className="pointer-events-none absolute right-[-20%] top-[-10%] h-[120%] w-[120%] opacity-70"
      minWidth={0}
      camera={{ position: [0, 0, 5], fov: 42 }}
    >
      <HolographicProjectModules />
    </SectionModelShell>
  );
}
