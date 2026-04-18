import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RippleType {
  x: number;
  y: number;
  id: number;
}

export default function GlobalRipple() {
  const [ripples, setRipples] = useState<RippleType[]>([]);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      // Create a ripple at the pointer coordinates
      const newRipple = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };
      
      setRipples((prev) => [...prev, newRipple]);
    };

    // Attach to window to capture all clicks
    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed py-0 my-0 inset-0 z-[100] overflow-hidden">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 0.8, scale: 0 }}
            animate={{ opacity: 0, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            onAnimationComplete={() => {
              setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
            }}
            style={{
              position: "absolute",
              top: ripple.y - 75,
              left: ripple.x - 75,
              width: 150,
              height: 150,
            }}
            className="rounded-full bg-white/30 backdrop-blur-md border border-white/60 shadow-[0_0_20px_rgba(255,255,255,0.4),inset_0_0_20px_rgba(255,255,255,0.3)]"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
