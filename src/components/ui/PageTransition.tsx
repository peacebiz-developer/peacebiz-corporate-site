import React, { useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const ref = useRef<HTMLDivElement>(null);

    const handleAnimationComplete = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        // CSS spec: transform/filter values other than "none" create a containing
        // block for position:fixed descendants, breaking GSAP ScrollTrigger pin.
        // After entrance animation we reset to "none" so child fixed positioning
        // is relative to the viewport again.
        el.style.transform = 'none';
        el.style.filter = 'none';
        el.style.willChange = 'auto';
    }, []);

    return (
        <motion.div
            ref={ref}
            key={location.pathname}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }}
            className="w-full"
            onAnimationComplete={handleAnimationComplete}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
