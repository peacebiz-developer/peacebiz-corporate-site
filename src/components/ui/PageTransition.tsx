import React from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();

    return (
        // We handle the AnimatePresence in App.tsx or wrapping Routes, 
        // but here we define the animation variants for the page content itself.
        <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }}
            className="w-full"
        >
            {children}
            {/* Optional: Add a "Curtain" effect here if requested, 
            but a smooth fade/blur is often more "premium" and less intrusive. 
            Let's stick to the high-end fade-up blur for now as it matches the "Apple/Ref" vibe.
        */}
        </motion.div>
    );
};

export default PageTransition;
