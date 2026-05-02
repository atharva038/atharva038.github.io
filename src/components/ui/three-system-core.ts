import { useEffect, useState } from "react";
import { useTheme, type Theme } from "@/components/theme-context";

type ModelPalette = {
  body: string;
  secondary: string;
  accent: string;
  edge: string;
  softEdge: string;
  lightA: string;
  lightB: string;
  lightC: string;
  metalness: number;
  roughness: number;
  opacity: number;
};

export const MODEL_PALETTES: Record<Theme, ModelPalette> = {
  light: {
    body: "#090909",
    secondary: "#262626",
    accent: "#F5D000",
    edge: "#F5D000",
    softEdge: "#0a0a0a",
    lightA: "#F5D000",
    lightB: "#ffffff",
    lightC: "#1f1f1f",
    metalness: 0.78,
    roughness: 0.28,
    opacity: 0.96,
  },
  blkdev: {
    body: "#050505",
    secondary: "#171717",
    accent: "#F5D000",
    edge: "#F5D000",
    softEdge: "#fafafa",
    lightA: "#F5D000",
    lightB: "#ffffff",
    lightC: "#3b3b3b",
    metalness: 0.9,
    roughness: 0.22,
    opacity: 0.98,
  },
  dark: {
    body: "#0d1117",
    secondary: "#1f2937",
    accent: "#f8fafc",
    edge: "#e5e7eb",
    softEdge: "#94a3b8",
    lightA: "#ffffff",
    lightB: "#cbd5e1",
    lightC: "#64748b",
    metalness: 0.72,
    roughness: 0.12,
    opacity: 0.76,
  },
};

export function useReducedMotion3D() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduced(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return reduced;
}

export function useThemeModelPalette() {
  const { theme } = useTheme();
  return { theme, palette: MODEL_PALETTES[theme] };
}
