import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, getMotionMediaQuery, ScrollTrigger } from "@/lib/gsap";

function shouldPreventSmoothScroll(node: HTMLElement) {
  const interactiveScrollable = node.closest(
    "[data-lenis-prevent], [data-lenis-prevent-wheel], [data-lenis-prevent-touch], [role='dialog'], textarea, select",
  );

  return Boolean(interactiveScrollable);
}

export default function SmoothScroll() {
  useEffect(() => {
    const motionPreference = getMotionMediaQuery();
    let lenis: Lenis | null = null;
    let removeScrollListener: (() => void) | null = null;
    let tick: ((time: number) => void) | null = null;

    if (!motionPreference) {
      return undefined;
    }

    const destroyLenis = () => {
      if (tick) {
        gsap.ticker.remove(tick);
        tick = null;
      }

      removeScrollListener?.();
      removeScrollListener = null;

      lenis?.destroy();
      lenis = null;
      ScrollTrigger.update();
    };

    const setupLenis = () => {
      destroyLenis();

      if (motionPreference.matches) {
        return;
      }

      lenis = new Lenis({
        anchors: {
          duration: 1.05,
          easing: (t) => 1 - Math.pow(1 - t, 3),
          offset: 0,
        },
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lerp: 0.09,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.1,
        wheelMultiplier: 0.9,
        prevent: shouldPreventSmoothScroll,
        stopInertiaOnNavigate: true,
      });

      removeScrollListener = lenis.on("scroll", () => {
        ScrollTrigger.update();
      });

      tick = (time) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    };

    setupLenis();

    motionPreference.addEventListener("change", setupLenis);

    return () => {
      motionPreference.removeEventListener("change", setupLenis);
      destroyLenis();
    };
  }, []);

  return null;
}
