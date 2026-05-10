import { useLayoutEffect, type RefObject } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type GsapSetup<T extends HTMLElement> = (
  context: gsap.Context,
  element: T,
) => void | (() => void);

export function useGsapContext<T extends HTMLElement>(
  scope: RefObject<T | null>,
  setup: GsapSetup<T>,
) {
  useLayoutEffect(() => {
    const element = scope.current;

    if (!element || prefersReducedMotion()) {
      return undefined;
    }

    let cleanup: void | (() => void);
    const context = gsap.context((self) => {
      cleanup = setup(self, element);
    }, element);

    return () => {
      cleanup?.();
      context.revert();
    };
  }, [scope, setup]);
}
