import { useMemo, useRef, createElement } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: React.ElementType<any>;
  href?: string;
  target?: string;
  rel?: string;
  download?: string | boolean;
  onClick?: React.MouseEventHandler;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  title?: string;
  role?: string;
  style?: React.CSSProperties;
  strength?: number;
  "aria-label"?: string;
  "aria-haspopup"?: React.AriaAttributes["aria-haspopup"];
  "aria-expanded"?: React.AriaAttributes["aria-expanded"];
  "aria-selected"?: React.AriaAttributes["aria-selected"];
  "aria-controls"?: React.AriaAttributes["aria-controls"];
}

export default function MagneticButton({ 
  children, 
  className = "", 
  as,
  href,
  strength = 0.2,
  disabled = false,
  ...props 
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isFinePointer = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches,
    [],
  );
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(rawY, { stiffness: 150, damping: 15, mass: 0.1 });
  const Component = as ?? (href ? "a" : "button");
  const wrapperWidthClass = className.includes("w-full")
    ? className.includes("sm:w-auto")
      ? "w-full sm:w-auto"
      : "w-full"
    : "";

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current || disabled || prefersReducedMotion || !isFinePointer) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    // Calculate the distance from the center of the button
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    rawX.set(middleX * strength);
    rawY.set(middleY * strength);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x, y }}
      className={`inline-flex max-w-full ${wrapperWidthClass}`}
    >
      {createElement(Component, { className, href, disabled, ...props }, children)}
    </motion.div>
  );
}
