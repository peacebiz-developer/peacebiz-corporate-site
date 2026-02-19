import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface BlurTextEffectProps {
  children: string;
  className?: string;
  stagger?: number;
}

export const BlurTextEffect: React.FC<BlurTextEffectProps> = ({
  children,
  className = '',
  stagger = 0.015,
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!isInView || !containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('span.blur-char');

    gsap.set(chars, { opacity: 0, y: 10, filter: 'blur(8px)' });

    gsap.to(chars, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.3,
      ease: 'power2.out',
      stagger,
      clearProps: 'filter',
    });
  }, [isInView, children, stagger]);

  const lines = children.split('\n');

  return (
    <span className={`block ${className}`} ref={containerRef}>
      {lines.map((line, lineIdx) => (
        <React.Fragment key={lineIdx}>
          {lineIdx > 0 && <br />}
          {line.split('').map((char, i) => (
            <span
              key={`${lineIdx}-${i}`}
              className="blur-char inline-block"
              style={{ whiteSpace: 'pre', opacity: 0 }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </React.Fragment>
      ))}
    </span>
  );
};
