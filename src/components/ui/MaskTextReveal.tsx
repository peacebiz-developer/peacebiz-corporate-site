import React from 'react';
import { motion } from 'motion/react';

interface MaskTextRevealProps {
    text: string;
    delay?: number;
    className?: string;
    direction?: 'up' | 'down';
    style?: React.CSSProperties;
}

export const MaskTextReveal: React.FC<MaskTextRevealProps> = ({
    text,
    delay = 0,
    className = "",
    direction = 'up',
    style
}) => {
    return (
        <div className={`overflow-y-clip ${className}`} style={style}>
            <motion.div
                initial={{ y: direction === 'up' ? "100%" : "-100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                    duration: 0.8,
                    delay: delay,
                    ease: [0.33, 1, 0.68, 1] // Cubic bezier for premium feel
                }}
                className="inline-block"
            >
                {text}
            </motion.div>
        </div>
    );
};
