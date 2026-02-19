import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const PRELOADER_NOISE_URI = "data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

function easeInOut(t: number) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [percent, setPercent] = useState(0);

    const animateProgress = useCallback(() => {
        const duration = 2200;
        const start = performance.now();

        const tick = () => {
            const elapsed = performance.now() - start;
            const t = Math.min(elapsed / duration, 1);
            setPercent(Math.round(easeInOut(t) * 100));
            if (t < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }, []);

    useEffect(() => {
        animateProgress();
        const timer = setTimeout(() => setIsLoading(false), 2500);
        return () => clearTimeout(timer);
    }, [animateProgress]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-white text-black overflow-hidden"
                    exit={{
                        opacity: 0,
                        transition: { duration: 1, ease: "easeInOut" }
                    }}
                >
                    {/* Full-width gradient progress bar */}
                    <div className="relative z-10 w-full">
                        {/* Labels row */}
                        <div className="relative flex items-center justify-center mb-3 px-8 md:px-12">
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6 }}
                                className="text-[10px] md:text-xs tracking-[0.3em] text-black/40 font-mono"
                            >
                                LOADING
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6 }}
                                className="absolute right-8 md:right-12 text-[10px] md:text-xs tracking-wider text-black/40 font-mono tabular-nums"
                            >
                                {percent}%
                            </motion.span>
                        </div>

                        {/* Gradient line track */}
                        <div className="w-full h-[1.5px] bg-black/[0.04]">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2.2, ease: "easeInOut" }}
                                className="h-full"
                                style={{
                                    background: "linear-gradient(to right, #ea5712, #006bb6, #00903b)",
                                }}
                            />
                        </div>
                    </div>

                    {/* Background overlay */}
                    <div className="absolute inset-0 bg-white/80 pointer-events-none" />
                    <div
                        className="absolute inset-0 opacity-[0.1] pointer-events-none"
                        style={{
                            backgroundImage: `url("${PRELOADER_NOISE_URI}")`,
                            backgroundRepeat: 'repeat',
                            backgroundSize: '128px 128px',
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
