"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
} from "motion/react";
import { cn } from "../../utils/cn";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const update = () => setSvgHeight(el.offsetHeight);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const y1 = useTransform(scrollYProgress, [0, 1], [0, svgHeight]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-400, svgHeight - 400]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.02, 0.85, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      className={cn("relative mx-auto h-full w-full", className)}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-24 left-3 z-40 pointer-events-none hidden md:block"
          style={{ opacity: beamOpacity }}
        >
          {svgHeight > 0 && (
            <svg
              viewBox={`0 0 4 ${svgHeight}`}
              width="4"
              height={svgHeight}
              className="block"
              aria-hidden="true"
            >
            <motion.path
              d={`M 2 0 V ${svgHeight}`}
              fill="none"
              stroke="url(#tracing-beam-gradient)"
              strokeWidth="1.5"
              className="motion-reduce:hidden"
              transition={{
                duration: 10,
              }}
            />
            <defs>
              <motion.linearGradient
                id="tracing-beam-gradient"
                gradientUnits="userSpaceOnUse"
                x1="0"
                x2="0"
                y1={y1}
                y2={y2}
              >
                <stop stopColor="#18CCFC" stopOpacity="0" />
                <stop stopColor="#18CCFC" />
                <stop offset="0.325" stopColor="#6344F5" />
                <stop offset="1" stopColor="#AE48FF" stopOpacity="0" />
              </motion.linearGradient>
            </defs>
          </svg>
          )}
        </motion.div>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
