import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../utils/cn";

export const LayoutTextFlip = ({
  text = "Build Amazing",
  words = ["Landing Pages", "Component Blocks", "Page Sections", "3D Shaders"],
  duration = 3000,
  className,
  wordClassName,
}: {
  text: string;
  words: string[];
  duration?: number;
  className?: string;
  wordClassName?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className={cn("inline-flex items-baseline gap-2 text-4xl md:text-6xl font-bold", className)}>
      <motion.span
        layout
        className="inline-block"
      >
        {text}
      </motion.span>

      <AnimatePresence mode="wait">
        <motion.span
          key={words[currentIndex]}
          layout
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={cn(
            "inline-block bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent",
            wordClassName
          )}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
