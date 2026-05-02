import { useRef, useState, createElement } from "react";
import { motion } from "framer-motion";

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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const Component = as ?? (href ? "a" : "button");
  const wrapperWidthClass = className.includes("w-full")
    ? className.includes("sm:w-auto")
      ? "w-full sm:w-auto"
      : "w-full"
    : "";

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    // Calculate the distance from the center of the button
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`inline-flex max-w-full ${wrapperWidthClass}`}
    >
      {createElement(Component, { className, href, disabled, ...props }, children)}
    </motion.div>
  );
}
