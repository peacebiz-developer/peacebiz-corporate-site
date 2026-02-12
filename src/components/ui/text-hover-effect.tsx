"use client";
import React, { useRef, useEffect, useState, useId } from "react";
import { motion } from "motion/react";
import { useDarkMode } from "../../hooks/useDarkMode";

export const TextHoverEffect = ({
  text,
  duration,
  outline,
  delay: animDelay,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  outline?: boolean;
  delay?: number;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const { theme } = useDarkMode();
  const uniqueId = useId().replace(/:/g, "");

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  // グラデーション色をモードで切り替え
  const gradientStops = theme === "dark"
    ? (
      <>
        <stop offset="0%" stopColor="#fff" />
        <stop offset="100%" stopColor="#d1d5db" />
      </>
    ) : (
      <>
        <stop offset="0%" stopColor="#a3a3a3" />
        <stop offset="100%" stopColor="#e5e7eb" />
      </>
    );

  // ホバーエフェクト用グラデーション
  const hoverGradientStops = (
    <>
      <stop offset="0%" stopColor="#ff7300" />
      <stop offset="50%" stopColor="#0094ff" />
      <stop offset="100%" stopColor="#00e676" />
    </>
  );

  // テキスト長に応じた動的viewBox幅
  const padding = 20;
  const charWidth = 155;
  const svgWidth = Math.max(1400, padding * 2 + text.length * charWidth);
  const svgHeight = 300;
  const fontSize = 250;

  const textProps = {
    x: padding.toString(),
    y: "55%",
    textAnchor: "start" as const,
    dominantBaseline: "middle" as const,
    fontFamily: "Inter, Helvetica, Arial, sans-serif",
    fontSize: fontSize,
    fontWeight: 900,
    letterSpacing: "-4px",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: animDelay ?? 0,
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <svg
        ref={svgRef}
        width="100%"
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
        className="select-none block"
        preserveAspectRatio="xMinYMid meet"
      >
        <defs>
          <linearGradient
            id={`textGradient-${uniqueId}`}
            gradientUnits="userSpaceOnUse"
            x1="0" y1="0" x2={svgWidth} y2="0"
          >
            {gradientStops}
          </linearGradient>
          <linearGradient
            id={`hoverGradient-${uniqueId}`}
            gradientUnits="userSpaceOnUse"
            x1="0" y1="0" x2={svgWidth} y2="0"
          >
            {hoverGradientStops}
          </linearGradient>
          <motion.radialGradient
            id={`revealMask-${uniqueId}`}
            gradientUnits="userSpaceOnUse"
            r="20%"
            initial={{ cx: "50%", cy: "50%" }}
            animate={maskPosition}
            transition={{ duration: duration ?? 0, ease: "easeOut" }}
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="transparent" />
          </motion.radialGradient>
          <mask id={`textMask-${uniqueId}`}>
            <rect x="0" y="0" width={svgWidth} height={svgHeight} fill={`url(#revealMask-${uniqueId})`} />
          </mask>
        </defs>

        {/* 常時表示テキスト */}
        <text
          {...textProps}
          fill={outline ? "none" : `url(#textGradient-${uniqueId})`}
          stroke={outline ? `url(#textGradient-${uniqueId})` : `url(#textGradient-${uniqueId})`}
          strokeWidth={outline ? 4 : 6}
          paintOrder={outline ? undefined : "stroke"}
        >
          {text}
        </text>

        {/* ホバーエフェクト */}
        {hovered && (
          <text
            {...textProps}
            fill={outline ? "none" : `url(#hoverGradient-${uniqueId})`}
            stroke={outline ? `url(#hoverGradient-${uniqueId})` : `url(#hoverGradient-${uniqueId})`}
            strokeWidth={outline ? 5 : 6}
            paintOrder={outline ? undefined : "stroke"}
            mask={`url(#textMask-${uniqueId})`}
            style={{ mixBlendMode: "screen" }}
          >
            {text}
          </text>
        )}
      </svg>
    </motion.div>
  );
};
