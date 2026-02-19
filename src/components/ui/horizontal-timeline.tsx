"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  motion,
  AnimatePresence,
} from "motion/react";

export interface HorizontalTimelineItem {
  year: string;
  title: string;
  summary: string;
  detail: React.ReactNode;
}

interface Props {
  data: HorizontalTimelineItem[];
}

const ITEM_WIDTH = 320;
const ITEM_GAP = 96;

export const HorizontalTimeline: React.FC<Props> = ({ data }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [viewH, setViewH] = useState(800);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const totalScrollDistance = (data.length - 1) * (ITEM_WIDTH + ITEM_GAP);

  useEffect(() => {
    const update = () => setViewH(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -totalScrollDistance]);

  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setProgress(v));

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeIndex]);

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const progressPct = Math.min(Math.max((progress - 0.05) / 0.9, 0), 1) * 100;

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full bg-white dark:bg-neutral-950"
        style={{ height: `${totalScrollDistance + viewH}px` }}
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          {/* Header */}
          <div className="px-6 md:px-16 lg:px-[12%] mb-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black dark:text-white mb-2">
              私たちの歩み
            </h2>
            <p className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
              2008年の設立から現在まで、お客様と共に成長してきた軌跡。
            </p>
          </div>

          {/* Timeline track */}
          <div className="relative">
            {/* Horizontal line — through dot centers */}
            <div className="absolute left-0 right-0 bottom-[6px] h-[2px] bg-neutral-200 dark:bg-neutral-800 z-0">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-brand-blue via-blue-400 to-transparent"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            {/* Items */}
            <motion.div
              className="flex items-stretch pt-0 will-change-transform"
              style={{
                x: reducedMotion ? undefined : x,
                gap: `${ITEM_GAP}px`,
                paddingLeft: `calc(50vw - ${ITEM_WIDTH / 2}px)`,
                paddingRight: `calc(50vw - ${ITEM_WIDTH / 2}px)`,
              }}
            >
              {data.map((item, i) => {
                const itemProgressStart = i / data.length;
                const isReached = progress > 0.05 + itemProgressStart * 0.9;

                return (
                  <div
                    key={i}
                    className="relative shrink-0 cursor-pointer group flex flex-col"
                    style={{ width: ITEM_WIDTH }}
                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={activeIndex === i}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveIndex(activeIndex === i ? null : i);
                      }
                    }}
                  >
                    {/* Card content — grows to fill, pushing dot to bottom */}
                    <div className="pr-2 flex-1">
                      <span
                        className={`block text-sm font-bold tracking-widest uppercase mb-2 transition-colors duration-500 ${
                          isReached
                            ? "text-brand-blue"
                            : "text-neutral-400 dark:text-neutral-500"
                        }`}
                      >
                        {item.year}
                      </span>
                      <h3 className="text-lg font-bold text-black dark:text-white mb-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[15px] text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
                        {item.summary}
                      </p>
                      <span className="inline-block mt-3 text-sm font-medium text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity">
                        詳しく見る →
                      </span>
                    </div>

                    {/* Dot — always at bottom, on top of the line */}
                    <div className="relative z-10 mt-4">
                      <div
                        className={`w-3.5 h-3.5 rounded-full border-2 transition-colors duration-500 ${
                          isReached
                            ? "bg-brand-blue border-brand-blue shadow-[0_0_8px_rgba(0,107,182,0.4)]"
                            : "bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-600"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detail modal — portaled to body */}
      {createPortal(
        <AnimatePresence>
          {activeIndex !== null && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => setActiveIndex(null)}
              />

              {/* Modal */}
              <motion.div
                className="fixed z-[100] inset-0 flex items-center justify-center pointer-events-none p-4 md:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="pointer-events-auto w-full max-w-4xl h-auto max-h-[70vh] relative overflow-hidden rounded-3xl shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_40px_80px_-20px_rgba(0,0,0,0.5)]"
                  initial={{ opacity: 0, y: 60, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.94 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                >
                  {/* Layered glass background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-neutral-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-950" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,107,182,0.06),transparent_60%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(96,165,250,0.05),transparent_60%)]" />

                  {/* Top gradient accent */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-blue to-blue-400"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
                  />

                  {/* Giant year watermark */}
                  <motion.div
                    className="absolute right-0 top-0 text-[14rem] md:text-[20rem] font-black leading-[0.8] text-black/[0.025] dark:text-white/[0.03] pointer-events-none select-none"
                    initial={{ opacity: 0, x: 80, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                  >
                    {data[activeIndex].year}
                  </motion.div>

                  {/* Decorative corner lines */}
                  <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-brand-blue/20 rounded-tl-sm pointer-events-none" />
                  <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-brand-blue/20 rounded-br-sm pointer-events-none" />

                  {/* Content */}
                  <div className="relative z-10 p-8 md:p-12 lg:p-14 overflow-y-auto max-h-[70vh]">
                    {/* Close button */}
                    <motion.button
                      onClick={() => setActiveIndex(null)}
                      className="absolute top-5 right-5 md:top-7 md:right-7 w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
                      aria-label="閉じる"
                      initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                    >
                      <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M1 1l12 12M13 1L1 13" />
                      </svg>
                    </motion.button>

                    {/* Year pill */}
                    <motion.div
                      className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-blue/10 dark:bg-brand-blue/15 mb-6"
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                    >
                      <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                      <span className="text-sm font-bold tracking-[0.15em] uppercase text-brand-blue">
                        {data[activeIndex].year}
                      </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      className="text-3xl md:text-4xl lg:text-5xl font-black text-black dark:text-white mb-6 tracking-tight leading-[1.1]"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
                    >
                      {data[activeIndex].title}
                    </motion.h3>

                    {/* Divider */}
                    <motion.div
                      className="w-16 h-[2px] rounded-full mb-7 bg-gradient-to-r from-brand-blue via-blue-400 to-transparent"
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                    />

                    {/* Body */}
                    <motion.div
                      className="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-[1.9] max-w-2xl"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] as const }}
                    >
                      {data[activeIndex].detail}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
