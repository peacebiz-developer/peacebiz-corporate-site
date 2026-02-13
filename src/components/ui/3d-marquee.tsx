"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { cn } from "../../utils/cn";

export const ThreeDMarquee = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isPageVisible, setIsPageVisible] = useState(
    typeof document === "undefined" ? true : !document.hidden
  );
  const isInView = useInView(rootRef, { amount: 0.2 });

  useEffect(() => {
    const handleVisibility = () => {
      setIsPageVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // Split the images array into 4 equal parts
  const chunkSize = Math.ceil(images.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });

  return (
    <div ref={rootRef} className={cn("relative h-full overflow-hidden", className)}>
      {/* Grid decorative lines */}
      <GridLineHorizontal className="top-0" offset="0px" />
      <GridLineHorizontal className="bottom-0" offset="0px" />
      <GridLineVertical className="left-0" offset="0px" />
      <GridLineVertical className="right-0" offset="0px" />

      <div
        className="flex w-full items-center justify-center perspective-[1200px]"
      >
        <div
          className="flex flex-row gap-4 p-4"
          style={{
            transform: "rotateX(30deg) rotateY(-10deg) rotateZ(10deg) scale(1.5)",
            transformStyle: "preserve-3d",
          }}
        >
          {chunks.map((subarray, colIndex) => (
            <motion.div
              animate={
                isInView && isPageVisible
                  ? { y: colIndex % 2 === 0 ? [0, -200] : [-200, 0] }
                  : { y: colIndex % 2 === 0 ? 0 : -200 }
              }
              transition={
                isInView && isPageVisible
                  ? {
                      duration: colIndex % 2 === 0 ? 10 : 15,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "linear",
                    }
                  : { duration: 0 }
              }
              key={`col-${colIndex}`}
              className="flex flex-col gap-4 will-change-transform"
            >
              {/* Double the images for seamless loop */}
              {[...subarray, ...subarray].map((image, imageIndex) => (
                <div
                  key={`img-${colIndex}-${imageIndex}`}
                  className="relative"
                >
                  <img
                    src={image}
                    alt={`marquee-${colIndex}-${imageIndex}`}
                    loading="lazy"
                    decoding="async"
                    className="h-28 w-48 rounded-lg object-cover shadow-md ring-1 ring-neutral-200/50 dark:ring-neutral-700/50 md:h-36 md:w-64"
                  />
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={{
        ["--background" as string]: "transparent",
        ["--color" as string]: "rgba(0, 0, 0, 0.08)",
        ["--height" as string]: "1px",
        ["--width" as string]: "5px",
        ["--fade-stop" as string]: "90%",
        ["--offset" as string]: offset || "200px",
      }}
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        className
      )}
    />
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={{
        ["--background" as string]: "transparent",
        ["--color" as string]: "rgba(0, 0, 0, 0.08)",
        ["--height" as string]: "5px",
        ["--width" as string]: "1px",
        ["--fade-stop" as string]: "90%",
        ["--offset" as string]: offset || "150px",
      }}
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        className
      )}
    />
  );
};
