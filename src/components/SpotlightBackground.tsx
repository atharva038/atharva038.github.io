import { useEffect, useRef, useState } from "react";
import { NOISE_PNG } from "@/lib/noise-texture";

type ThemeType = "light" | "blkdev" | "dark";

function getTheme(): ThemeType {
  const cl = document.documentElement.classList;
  if (cl.contains("blkdev")) return "blkdev";
  if (cl.contains("dark")) return "dark";
  return "light";
}

export default function SpotlightBackground() {
  const [mousePosition, setMousePosition] = useState({ x: -9999, y: -9999 });
  const [theme, setTheme] = useState<ThemeType>("light");
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const checkTheme = () => setTheme(getTheme());
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pendingRef.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          setMousePosition({ ...pendingRef.current });
          rafRef.current = null;
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Spotlight colour varies by theme
  const spotlightColor =
    theme === "dark"
      ? `radial-gradient(700px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.045), transparent 45%)`
      : theme === "blkdev"
      ? `radial-gradient(700px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(245,208,0,0.07), transparent 45%)`
      : `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,0,0,0.025), transparent 50%)`;

  // Grain opacity & blend mode
  const grainOpacity = theme === "dark" ? 0.25 : theme === "blkdev" ? 0.35 : 0.04;
  const grainBlend: React.CSSProperties["mixBlendMode"] =
    theme === "light" ? "multiply" : "overlay";

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-background transition-colors duration-300">
      {/* Mouse spotlight */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ background: spotlightColor }}
      />

      {/* Noise grain */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: grainOpacity,
          backgroundImage: `url("${NOISE_PNG}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
          mixBlendMode: grainBlend,
        }}
      />
    </div>
  );
}
