import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { CanvasProps } from "@react-three/fiber";
import type { ThreeElements } from "@react-three/fiber";
import { useReducedMotion3D, useThemeModelPalette } from "@/components/ui/three-system-core";

export function ModelFallback({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-[inherit] border border-border bg-surface/40 ${className}`}
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-electric/60 bg-electric/10" />
      <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 border border-border/70" />
    </div>
  );
}

type ResponsiveCanvasProps = {
  children: ReactNode;
  className?: string;
  minWidth?: number;
  fallbackClassName?: string;
  camera?: CanvasProps["camera"];
  eventSource?: HTMLElement | null;
};

export function ResponsiveCanvas({
  children,
  className = "",
  minWidth = 640,
  fallbackClassName,
  camera = { position: [0, 0, 7], fov: 42 },
  eventSource,
}: ResponsiveCanvasProps) {
  const reducedMotion = useReducedMotion3D();
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${minWidth}px)`);
    const updateCanvasState = () => {
      setCanRender(mediaQuery.matches && !reducedMotion);
    };

    updateCanvasState();
    mediaQuery.addEventListener("change", updateCanvasState);
    return () => mediaQuery.removeEventListener("change", updateCanvasState);
  }, [minWidth, reducedMotion]);

  if (!canRender) {
    return <ModelFallback className={fallbackClassName} />;
  }

  return (
    <Canvas
      camera={camera}
      dpr={[1, 1.35]}
      frameloop="always"
      className={className}
      eventSource={eventSource || undefined}
      gl={{
        alpha: true,
        antialias: true,
        depth: true,
        powerPreference: "low-power",
        stencil: false,
      }}
    >
      {children}
    </Canvas>
  );
}


export function SceneLights({ intensity = 1 }: { intensity?: number }) {
  const { theme, palette } = useThemeModelPalette();

  return (
    <>
      <ambientLight intensity={(theme === "dark" ? 0.42 : 0.7) * intensity} />
      <directionalLight position={[4, 7, 5]} intensity={1.8 * intensity} color={palette.lightA} />
      <directionalLight position={[-5, 3, 3]} intensity={1.2 * intensity} color={palette.lightB} />
      <directionalLight position={[0, -4, -4]} intensity={0.8 * intensity} color={palette.lightC} />
      <pointLight position={[0, 1.5, 3]} intensity={0.7 * intensity} color={palette.accent} />
    </>
  );
}

type ThemeAwareMaterialProps = {
  variant?: "body" | "secondary" | "accent";
  transparent?: boolean;
  opacity?: number;
  emissive?: boolean;
  roughness?: number;
  metalness?: number;
};

export function ThemeAwareMaterial({
  variant = "body",
  transparent = true,
  opacity,
  emissive = false,
  roughness,
  metalness,
}: ThemeAwareMaterialProps) {
  const { theme, palette } = useThemeModelPalette();
  const color = palette[variant];
  const emissiveIntensity = emissive ? (theme === "dark" ? 0.1 : 0.18) : 0;

  return (
    <meshStandardMaterial
      color={color}
      emissive={emissive ? color : "#000000"}
      emissiveIntensity={emissiveIntensity}
      metalness={metalness ?? palette.metalness}
      opacity={opacity ?? palette.opacity}
      roughness={roughness ?? palette.roughness}
      transparent={transparent}
    />
  );
}

export function FloatingModel({
  children,
  speed = 1.4,
  rotationIntensity = 0.08,
  floatIntensity = 0.55,
  ...props
}: ThreeElements["group"] & {
  children: ReactNode;
  speed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={rotationIntensity} floatIntensity={floatIntensity}>
      <group {...props}>{children}</group>
    </Float>
  );
}
