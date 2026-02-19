import React, { useEffect, useState } from 'react';

// Lightweight Noise Data URI (Static texture, no calculation)
const NOISE_URI = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E";

export const NoiseOverlay = () => {
    const [useBlendOverlay, setUseBlendOverlay] = useState(true);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const isDesktopHover = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 768px)').matches;
        setUseBlendOverlay(!isDesktopHover);

        const timer = setTimeout(() => setShow(true), 7200);
        return () => clearTimeout(timer);
    }, []);

    if (!show) return null;

    return (
        <div
            className={`fixed inset-0 z-50 pointer-events-none opacity-[0.05] ${useBlendOverlay ? 'mix-blend-overlay' : ''}`}
            style={{
                backgroundImage: `url("${NOISE_URI}")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '128px 128px',
            }}
        />
    );
};
