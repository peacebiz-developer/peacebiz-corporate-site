import { useRef, useCallback, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const SPRING_CONFIG = { stiffness: 80, damping: 20, mass: 0.8 };

export const Logo3DParallax = ({
  logoSrc,
  size = 700,
  className = "",
}: {
  logoSrc: string;
  size?: number;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const rotateX = useSpring(useMotionValue(0), SPRING_CONFIG);
  const rotateY = useSpring(useMotionValue(0), SPRING_CONFIG);
  const translateX = useSpring(useMotionValue(0), SPRING_CONFIG);
  const translateY = useSpring(useMotionValue(0), SPRING_CONFIG);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      rotateY.set(dx * 12);
      rotateX.set(-dy * 12);
      translateX.set(dx * 20);
      translateY.set(dy * 20);
    },
    [rotateX, rotateY, translateX, translateY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    translateX.set(0);
    translateY.set(0);
  }, [rotateX, rotateY, translateX, translateY]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isInView, handleMouseMove]);

  useEffect(() => {
    if (!isInView) handleMouseLeave();
  }, [isInView, handleMouseLeave]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ width: size, height: size, perspective: "1200px" }}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <motion.img
          src={logoSrc}
          alt=""
          draggable={false}
          className="w-full h-auto select-none"
          style={{
            opacity: 0.18,
            transformStyle: "preserve-3d",
            translateZ: 40,
          }}
        />
      </motion.div>
    </div>
  );
};
