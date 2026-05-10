import { Suspense, lazy, useEffect, useState } from "react";
import { useTheme } from "@/components/theme-context";
import { DarkHeroLayout } from "@/components/hero/DarkHeroLayout";
import { LightHeroLayout } from "@/components/hero/LightHeroLayout";

const InfinitePlaneBg = lazy(() => import("@/components/ui/infinite-plane"));

export default function Hero() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [showAnimatedPlane, setShowAnimatedPlane] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 768px), (prefers-reduced-motion: reduce)",
    );

    const updatePlaneVisibility = () => {
      setShowAnimatedPlane(!mediaQuery.matches);
    };

    updatePlaneVisibility();
    mediaQuery.addEventListener("change", updatePlaneVisibility);

    return () =>
      mediaQuery.removeEventListener("change", updatePlaneVisibility);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center pt-24 pb-10 sm:pt-28 sm:pb-16 lg:py-20 bg-transparent"
    >
      {showAnimatedPlane && theme === "dark" && (
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <Suspense fallback={null}>
            <InfinitePlaneBg planeHeight={0} speed={0.8} />
          </Suspense>
        </div>
      )}

      <LightHeroLayout isLight={isLight} isVisible={theme !== "dark"} />
      <DarkHeroLayout isVisible={theme === "dark"} />
    </section>
  );
}
