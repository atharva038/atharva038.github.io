import { useEffect, useRef, useState } from "react";

type LazyOnVisibleProps = {
  id: string;
  minHeight?: string;
  rootMargin?: string;
  children: React.ReactNode;
};

export default function LazyOnVisible({
  id,
  minHeight = "24rem",
  rootMargin = "700px 0px",
  children,
}: LazyOnVisibleProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <div
      ref={ref}
      id={id}
      style={{ minHeight: isVisible ? undefined : minHeight }}
      className="scroll-mt-28"
    >
      {isVisible ? children : null}
    </div>
  );
}
