"use client";
import { cn } from "../../utils/cn";
import { useEffect, useMemo, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  pointerColor = "140, 100, 255",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  animate = true,
  performanceMode = "auto",
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  animate?: boolean;
  performanceMode?: "auto" | "quality" | "performance";
  containerClassName?: string;
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const currentRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  const movePointer = () => {
    rafRef.current = null;
    if (!interactiveRef.current) return;

    const current = currentRef.current;
    const target = targetRef.current;
    current.x += (target.x - current.x) / 20;
    current.y += (target.y - current.y) / 20;

    interactiveRef.current.style.transform = `translate(${Math.round(
      current.x
    )}px, ${Math.round(current.y)}px)`;

    if (Math.abs(target.x - current.x) > 0.1 || Math.abs(target.y - current.y) > 0.1) {
      rafRef.current = requestAnimationFrame(movePointer);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      targetRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(movePointer);
      }
    }
  };

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  const isPerformanceMode = performanceMode === "performance";
  const useGooFilter =
    performanceMode === "quality" ||
    (performanceMode === "auto" && interactive && !isSafari);
  const effectiveSize = isPerformanceMode ? "64%" : size;
  const effectiveBlendingValue = isPerformanceMode ? "normal" : blendingValue;
  const shouldRenderThirdLayer = !isPerformanceMode;
  const shouldRenderExtendedLayers = !isPerformanceMode;

  const rootStyle = useMemo(
    () =>
      ({
        "--gradient-background-start": gradientBackgroundStart,
        "--gradient-background-end": gradientBackgroundEnd,
        "--first-color": firstColor,
        "--second-color": secondColor,
        "--third-color": thirdColor,
        "--fourth-color": fourthColor,
        "--fifth-color": fifthColor,
        "--pointer-color": pointerColor,
        "--size": effectiveSize,
        "--blending-value": effectiveBlendingValue,
      } as React.CSSProperties),
    [
      gradientBackgroundStart,
      gradientBackgroundEnd,
      firstColor,
      secondColor,
      thirdColor,
      fourthColor,
      fifthColor,
      pointerColor,
      effectiveSize,
      effectiveBlendingValue,
    ]
  );

  return (
    <div
      style={rootStyle}
      className={cn(
        "h-screen w-screen relative overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))] isolate",
        containerClassName
      )}
    >
      {useGooFilter && !isSafari && (
        <svg className="hidden">
          <defs>
            <filter id="blurMe">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
      )}
      <div className={cn("", className)}>{children}</div>
      <div
        className={cn(
          "gradients-container h-full w-full",
          useGooFilter
            ? isSafari
              ? "blur-2xl"
              : "[filter:url(#blurMe)_blur(40px)]"
            : isPerformanceMode
              ? ""
              : "blur-2xl"
        )}
      >
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_0.8)_0,_rgba(var(--first-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:center_center]`,
            animate ? `animate-first` : "",
            isPerformanceMode ? "opacity-80" : "opacity-100",
            `transform-gpu will-change-transform`
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-400px)]`,
            animate ? `animate-second` : "",
            isPerformanceMode ? "opacity-75" : "opacity-100",
            `transform-gpu will-change-transform`
          )}
        ></div>
        {shouldRenderThirdLayer && (
          <div
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
              `[transform-origin:calc(50%+400px)]`,
              animate ? `animate-third` : "",
              `opacity-100 transform-gpu will-change-transform`
            )}
          ></div>
        )}
        {shouldRenderExtendedLayers && (
          <div
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
              `[transform-origin:calc(50%-200px)]`,
              animate ? `animate-fourth` : "",
              `opacity-100 transform-gpu will-change-transform`
            )}
          ></div>
        )}
        {shouldRenderExtendedLayers && (
          <div
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
              `[transform-origin:calc(50%-800px)_calc(50%+800px)]`,
              animate ? `animate-fifth` : "",
              `opacity-100 transform-gpu will-change-transform`
            )}
          ></div>
        )}

        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2`,
              `opacity-70`
            )}
          ></div>
        )}
      </div>
    </div>
  );
};
