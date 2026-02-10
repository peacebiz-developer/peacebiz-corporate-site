import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate initial load or asset loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500); // 2.5s loader
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white overflow-hidden"
                    exit={{
                        y: "-100%",
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    {/* Logo Animation */}
                    <div className="relative z-10 flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0.2, filter: "blur(5px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="mb-8"
                        >
                            <img src={`${process.env.PUBLIC_URL || ""}/logo.png`} alt="Peace Biz" className="w-24 md:w-32 invert brightness-0 invert" />
                        </motion.div>

                        <div className="h-[1px] w-32 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2.2, ease: "easeInOut" }}
                                className="h-full bg-white"
                            />
                        </div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="absolute bottom-12 mt-4 text-xs tracking-[0.3em] text-white/50"
                    >
                        LOADING
                    </motion.p>

                    {/* Background Gradient/Noise for texture */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 pointer-events-none" />
                    <svg className="absolute inset-0 opacity-[0.1] pointer-events-none">
                        <filter id="noise">
                            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noise)" />
                    </svg>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
