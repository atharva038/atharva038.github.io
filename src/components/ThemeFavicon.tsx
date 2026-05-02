import { useEffect } from "react";
import { useTheme, type Theme } from "./theme-context";

const faviconThemes: Record<
  Theme,
  { background: string; border: string; text: string; accent: string }
> = {
  light: {
    background: "#F8F6F2",
    border: "#0a0a0a",
    text: "#0a0a0a",
    accent: "#F5D000",
  },
  blkdev: {
    background: "#0d0d0d",
    border: "#F5D000",
    text: "#f0f0f0",
    accent: "#F5D000",
  },
  dark: {
    background: "#050505",
    border: "#fafafa",
    text: "#fafafa",
    accent: "#F5D000",
  },
};

function encodeSvg(svg: string) {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function getFaviconSvg(theme: Theme) {
  const colors = faviconThemes[theme];

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
      <rect width="96" height="96" rx="48" fill="${colors.background}"/>
      <rect x="8" y="8" width="80" height="80" rx="40" fill="none" stroke="${colors.border}" stroke-width="6"/>
      <text x="48" y="59" text-anchor="middle" font-family="Space Grotesk, Arial, sans-serif" font-size="34" font-weight="800" letter-spacing="1">
        <tspan fill="${colors.text}">A</tspan><tspan fill="${colors.accent}">J</tspan>
      </text>
    </svg>
  `;
}

export default function ThemeFavicon() {
  const { theme } = useTheme();

  useEffect(() => {
    const favicon =
      document.querySelector<HTMLLinkElement>('link[rel="icon"]') ??
      document.createElement("link");

    favicon.rel = "icon";
    favicon.type = "image/svg+xml";
    favicon.href = encodeSvg(getFaviconSvg(theme));

    if (!favicon.parentNode) {
      document.head.appendChild(favicon);
    }
  }, [theme]);

  return null;
}
