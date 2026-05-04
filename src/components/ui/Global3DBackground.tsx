import { Suspense, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ResponsiveCanvas, SceneLights } from "@/components/ui/three-system";
import { useThemeModelPalette } from "@/components/ui/three-system-core";
import { ChessKing } from "@/components/ui/Hero3DChessPiece";
import { 
  OrbitingTechTokens, 
  HolographicProjectModules, 
  MechanicalTimelineMarkers, 
  SignalTerminalCube 
} from "@/components/ui/Section3DModels";

function ScrollController() {
  const kingRef = useRef<THREE.Group>(null);
  const skillsRef = useRef<THREE.Group>(null);
  const expRef = useRef<THREE.Group>(null);
  const projRef = useRef<THREE.Group>(null);
  const contactRef = useRef<THREE.Group>(null);

  const targetScroll = useRef(0);
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = window.innerWidth < 768;
    const handleResize = () => {
      isMobile.current = window.innerWidth < 768;
    };
    window.addEventListener("resize", handleResize);
    
    // Hide initially to prevent flash in wrong position
    if (skillsRef.current) skillsRef.current.position.y = -100;
    if (expRef.current) expRef.current.position.y = -100;
    if (projRef.current) projRef.current.position.y = -100;
    if (contactRef.current) contactRef.current.position.y = -100;

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame((state, delta) => {
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const currentScroll = window.scrollY / maxScroll;
    
    // Smoother, slower damp towards target
    targetScroll.current = THREE.MathUtils.damp(targetScroll.current, currentScroll, 2, delta);
    const s = targetScroll.current;
    
    const offset = isMobile.current ? 0 : 3;

    // Hero: 0.0 to 0.15
    if (kingRef.current) {
       const progress = Math.min(1, Math.max(0, s / 0.15));
       kingRef.current.position.x = isMobile.current ? 0 : 2 + progress * 1.5;
       kingRef.current.position.y = progress * 8; // Move up out of view slower
       kingRef.current.rotation.y = progress * Math.PI * 0.5; // Rotate slower
    }

    // Skills: 0.15 to 0.35 (peak around 0.25)
    if (skillsRef.current) {
       const progress = (s - 0.25) * 8;
       skillsRef.current.position.x = (isMobile.current ? 0 : -offset) - progress * 1.5;
       skillsRef.current.position.y = -progress * 10;
       skillsRef.current.rotation.z = progress * 0.3;
    }

    // Experience: 0.35 to 0.55 (peak around 0.45)
    if (expRef.current) {
       const progress = (s - 0.45) * 8;
       expRef.current.position.x = (isMobile.current ? 0 : offset) + progress * 1.5;
       expRef.current.position.y = -progress * 10;
    }

    // Projects: 0.55 to 0.75 (peak around 0.65)
    if (projRef.current) {
       const progress = (s - 0.65) * 8;
       projRef.current.position.x = (isMobile.current ? 0 : -offset) - progress * 1.5;
       projRef.current.position.y = -progress * 10;
    }

    // Contact: 0.8 to 1.0 (peak around 0.95)
    if (contactRef.current) {
       const progress = (s - 0.95) * 8;
       contactRef.current.position.x = (isMobile.current ? 0 : offset) + progress * 1.5;
       contactRef.current.position.y = -progress * 10;
    }
  });

  const { theme } = useThemeModelPalette();

  return (
    <group>
      <group ref={kingRef} scale={1.3}>
        <ChessKing theme={theme} />
      </group>
      <group ref={skillsRef} scale={1.6}>
        <OrbitingTechTokens />
      </group>
      <group ref={expRef} scale={1.4}>
        <MechanicalTimelineMarkers />
      </group>
      <group ref={projRef} scale={2.0}>
        <HolographicProjectModules />
      </group>
      <group ref={contactRef} scale={1.6}>
        <SignalTerminalCube />
      </group>
    </group>
  );
}

export default function Global3DBackground() {
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRoot(document.getElementById("root"));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <ResponsiveCanvas
        camera={{ position: [0, 0, 10], fov: 40 }}
        className="w-full h-full absolute inset-0 opacity-20 sm:opacity-40"
        minWidth={0} // Force render on all screen sizes for the background
        eventSource={root}
      >
        <SceneLights intensity={1.5} />
        <Suspense fallback={null}>
          <ScrollController />
        </Suspense>
      </ResponsiveCanvas>
    </div>
  );
}
