import React, { InputHTMLAttributes, useId, useMemo, useState } from 'react';
import { cn } from '../../utils/cn';

interface NeonCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
  size?: number;
}

const PARTICLE_OFFSETS = [
  { x: '24px', y: '-24px' },
  { x: '-24px', y: '-24px' },
  { x: '24px', y: '24px' },
  { x: '-24px', y: '24px' },
  { x: '34px', y: '0px' },
  { x: '-34px', y: '0px' },
  { x: '0px', y: '34px' },
  { x: '0px', y: '-34px' },
  { x: '20px', y: '-30px' },
  { x: '-20px', y: '30px' },
  { x: '30px', y: '20px' },
  { x: '-30px', y: '-20px' },
];

const SPARK_ROTATIONS = ['0deg', '90deg', '180deg', '270deg'];

const NeonCheckbox: React.FC<NeonCheckboxProps> = ({
  label,
  className,
  checked: controlledChecked,
  defaultChecked = false,
  disabled = false,
  onChange,
  id,
  size = 30,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id ?? `neon-checkbox-${generatedId}`;

  const [internalChecked, setInternalChecked] = useState(Boolean(defaultChecked));
  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? Boolean(controlledChecked) : internalChecked;

  const checkboxStyle = useMemo(
    () =>
      ({
        '--primary': '#00c98a',
        '--primary-dark': '#0f766e',
        '--primary-light': '#a7f3d0',
        '--size': `${size}px`,
      }) as React.CSSProperties,
    [size]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    onChange?.(e);
  };

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'relative inline-flex items-center gap-3',
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
        className
      )}
      style={checkboxStyle}
    >
      <span className="relative inline-block h-[var(--size)] w-[var(--size)] isolate">
        <input
          id={inputId}
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          {...props}
        />

        <span
          className="absolute inset-0 z-10 rounded-md border-2 bg-white/90 transition-colors duration-300"
          style={{
            borderColor: isChecked ? 'var(--primary)' : 'var(--primary-dark)',
            backgroundColor: isChecked ? 'rgba(0,201,138,0.12)' : 'rgba(255,255,255,0.9)',
          }}
        >
          <span className="absolute inset-[2px] z-20 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className={cn(
                'h-4/5 w-4/5 fill-none stroke-[3] stroke-linecap-round stroke-linejoin-round transition-all duration-300 ease-out drop-shadow-[0_0_2px_rgba(15,118,110,0.45)]',
                isChecked ? 'scale-110 opacity-100' : 'scale-95 opacity-0'
              )}
              style={{
                stroke: 'var(--primary-dark)',
                strokeDasharray: 40,
                strokeDashoffset: isChecked ? 0 : 40,
              }}
            >
              <path d="M3,12.5l7,7L21,5" />
            </svg>
          </span>

          <span
            className={cn(
              'pointer-events-none absolute -inset-0.5 z-0 rounded-md blur-md transition-opacity duration-300',
              isChecked ? 'opacity-20' : 'opacity-0'
            )}
            style={{ backgroundColor: 'var(--primary)' }}
          />

          <span className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-md">
            {[0, 1, 2, 3].map((i) => (
              <span
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                className={cn(
                  'absolute transition-opacity duration-300',
                  isChecked ? 'opacity-100' : 'opacity-0',
                  i === 0 && 'left-[-100%] top-0 h-px w-10',
                  i === 1 && 'right-0 top-[-100%] h-10 w-px',
                  i === 2 && 'bottom-0 right-[-100%] h-px w-10',
                  i === 3 && 'bottom-[-100%] left-0 h-10 w-px'
                )}
                style={{
                  backgroundColor: 'var(--primary)',
                  animation: isChecked
                    ? `${['neonBorderFlow1', 'neonBorderFlow2', 'neonBorderFlow3', 'neonBorderFlow4'][i]} 2s linear infinite`
                    : 'none',
                }}
              />
            ))}
          </span>
        </span>

        <span className="pointer-events-none absolute inset-0 z-0">
          {PARTICLE_OFFSETS.map((offset, i) => (
            <span
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className={cn(
                'absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full',
                isChecked ? 'opacity-100' : 'opacity-0'
              )}
              style={
                isChecked
                  ? ({
                      '--x': offset.x,
                      '--y': offset.y,
                      backgroundColor: 'var(--primary)',
                      boxShadow: '0 0 6px var(--primary)',
                      animation: `neonParticleExplosion 0.6s ease-out forwards`,
                    } as React.CSSProperties)
                  : undefined
              }
            />
          ))}
        </span>

        <span className="pointer-events-none absolute -inset-5 z-0">
          {[0, 1, 2].map((i) => (
            <span
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className={cn(
                'absolute inset-0 rounded-full border',
                isChecked ? 'opacity-100' : 'opacity-0'
              )}
              style={{
                borderColor: 'var(--primary)',
                animation: isChecked ? `neonRingPulse 0.6s ease-out ${i * 0.1}s forwards` : 'none',
              }}
            />
          ))}
        </span>

        <span className="pointer-events-none absolute inset-0 z-0">
          {SPARK_ROTATIONS.map((rotation, i) => (
            <span
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className={cn(
                'absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2',
                isChecked ? 'opacity-100' : 'opacity-0'
              )}
              style={
                isChecked
                  ? ({
                      '--r': rotation,
                      background: 'linear-gradient(to right, var(--primary), transparent)',
                      animation: 'neonSparkFlash 0.6s ease-out forwards',
                    } as React.CSSProperties)
                  : undefined
              }
            />
          ))}
        </span>
      </span>

      {label ? <span className="text-sm text-neutral-700">{label}</span> : null}

      <style>{`
        @keyframes neonBorderFlow1 {
          0% { transform: translateX(0); }
          100% { transform: translateX(200%); }
        }
        @keyframes neonBorderFlow2 {
          0% { transform: translateY(0); }
          100% { transform: translateY(200%); }
        }
        @keyframes neonBorderFlow3 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-200%); }
        }
        @keyframes neonBorderFlow4 {
          0% { transform: translateY(0); }
          100% { transform: translateY(-200%); }
        }
        @keyframes neonParticleExplosion {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(
              calc(-50% + var(--x, 20px)),
              calc(-50% + var(--y, 20px))
            ) scale(0);
            opacity: 0;
          }
        }
        @keyframes neonRingPulse {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes neonSparkFlash {
          0% {
            transform: rotate(var(--r, 0deg)) translateX(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: rotate(var(--r, 0deg)) translateX(30px) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </label>
  );
};

export { NeonCheckbox };
