import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
    children,
    className = "",
    onClick,
    strength = 20
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        let x = 0;
        let y = 0;
        let frameId: number;

        const lerp = (start: number, end: number, t: number) => {
            return start * (1 - t) + end * t;
        };

        let currentX = 0;
        let currentY = 0;

        const animate = () => {
            currentX = lerp(currentX, x, 0.1);
            currentY = lerp(currentY, y, 0.1);

            if (element) {
                element.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
            }

            requestAnimationFrame(animate);
        };

        frameId = requestAnimationFrame(animate);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            x = (e.clientX - centerX) * 0.5; // Apply strength manually
            y = (e.clientY - centerY) * 0.5;
        };

        const handleMouseLeave = () => {
            x = 0;
            y = 0;
        };

        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`inline-block cursor-none will-change-transform ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};
