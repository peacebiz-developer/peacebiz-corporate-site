import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    aspectRatio?: string; // e.g. "aspect-[4/3]"
    offset?: number; // How much relative movement? default 50
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
    src,
    alt,
    className = "",
    aspectRatio = "aspect-video",
    offset = 50
}) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden rounded-2xl ${aspectRatio} ${className}`}
        >
            <motion.img
                src={src}
                alt={alt}
                style={{ y, scale: 1.1 }} // Scale up slightly to prevent whitespace
                className={`w-full h-full object-cover absolute inset-0 will-change-transform ${className}`}
                loading="lazy"
                decoding="async"
            />
            {/* Overlay for depth/readability if needed */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>
    );
};
