import * as React from 'react';
import { cn } from '../../utils/cn';

interface AnimatedFeatureSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  preheaderIcon?: React.ReactNode;
  preheaderText: string;
  heading: React.ReactNode;
  description: React.ReactNode;
  buttons?: React.ReactNode;
  imageUrl: string;
  imageAlt?: string;
}

const AnimatedFeatureSpotlight = React.forwardRef<HTMLDivElement, AnimatedFeatureSpotlightProps>(
  (
    {
      className,
      preheaderIcon,
      preheaderText,
      heading,
      description,
      buttons,
      imageUrl,
      imageAlt = 'Feature illustration',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-6xl mx-auto rounded-2xl bg-background border overflow-hidden',
          className
        )}
        {...props}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
          {/* Left Column: Text Content */}
          <div className="flex flex-col justify-center space-y-5 p-8 md:p-10 text-left items-start">
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-widest uppercase text-muted-foreground animate-in fade-in slide-in-from-top-4 duration-700">
              {preheaderIcon}
              <span>{preheaderText}</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground animate-in fade-in slide-in-from-top-4 duration-700 delay-150">
              {heading}
            </h2>
            <div className="text-base text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-top-4 duration-700 delay-300">
              {description}
            </div>
            {buttons && (
              <div className="w-full animate-in fade-in slide-in-from-top-4 duration-700 delay-500">
                {buttons}
              </div>
            )}
          </div>

          {/* Right Column: Image with diagonal clip */}
          <div
            className="relative w-full min-h-[250px] md:min-h-[320px] animate-in fade-in zoom-in-95 duration-700 delay-200"
            style={{ clipPath: 'polygon(4% 0, 100% 0, 100% 100%, 0 100%)' }}
          >
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    );
  }
);
AnimatedFeatureSpotlight.displayName = 'AnimatedFeatureSpotlight';

export { AnimatedFeatureSpotlight };
