import { useEffect, useState } from "react";

export default function SpotlightBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-background transition-colors duration-300">
      {/* Spotlight (Visible in dark mode, invisible in light mode via CSS variable) */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--spotlight-color), transparent 40%)`,
        }}
      />
      {/* Brutalist Grain Overlay — fine, tiled, physical texture */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-color-burn dark:mix-blend-overlay"
        style={{
          opacity: "var(--grain-opacity, 0)",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='64' height='64' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
