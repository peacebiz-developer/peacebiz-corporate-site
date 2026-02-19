import React, { useId } from "react";
import { cn } from "../../utils/cn";

interface AnimatedBlobImageProps {
  images: string[];
  currentIndex: number;
  alt?: string;
  className?: string;
}

const AnimatedBlobImage: React.FC<AnimatedBlobImageProps> = ({
  images,
  currentIndex,
  alt = "",
  className,
}) => {
  const id = useId().replace(/:/g, "");

  return (
    <div className={cn("relative w-full aspect-square animate-blob-spin", className)}>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === currentIndex ? alt : ""}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out",
            i === currentIndex ? "opacity-100" : "opacity-0",
          )}
          style={{ clipPath: `url(#blob-clip-${id})` }}
        />
      ))}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <clipPath id={`blob-clip-${id}`} clipPathUnits="objectBoundingBox">
            <path
              d="M0.81,0.56 C0.84,0.73 0.69,0.88 0.52,0.92 C0.35,0.96 0.17,0.85 0.09,0.68 C0.01,0.51 0.07,0.3 0.23,0.19 C0.39,0.08 0.61,0.11 0.72,0.26 C0.8,0.37 0.78,0.47 0.81,0.56 Z"
              className="animate-blob-path"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export { AnimatedBlobImage };
