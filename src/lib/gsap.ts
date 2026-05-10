import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export function prefersReducedMotion() {
  if (typeof window === "undefined") {
    return true;
  }

  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function getMotionMediaQuery() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.matchMedia(REDUCED_MOTION_QUERY);
}
