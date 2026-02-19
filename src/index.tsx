import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { MotionGlobalConfig } from 'motion/react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const installPartialKeyframePatch = () => {
  if (typeof Element === 'undefined' || typeof Element.prototype.animate !== 'function') {
    return;
  }

  const nativeAnimate = Element.prototype.animate;
  const testElement = document.createElement('div');

  try {
    testElement.animate(
      [{ opacity: '0', transform: 'translateX(0px)' }, { opacity: '1' }],
      { duration: 1 }
    );
    return;
  } catch {
    // Older Chromium (used by some prerender crawlers) throws on partial keyframes.
  }

  const timingKeys = new Set(['offset', 'easing', 'composite']);
  const toKebabCase = (key: string) => key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);

  Element.prototype.animate = function patchedAnimate(
    keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
    options?: number | KeyframeAnimationOptions
  ): Animation {
    const buildSafeAnimation = (): Animation =>
      nativeAnimate.call(
        this,
        [
          { opacity: getComputedStyle(this).opacity || '1' },
          { opacity: getComputedStyle(this).opacity || '1' },
        ],
        { duration: 0 }
      );

    try {
      return nativeAnimate.call(this, keyframes as PropertyIndexedKeyframes, options);
    } catch {
      if (!Array.isArray(keyframes)) {
        return buildSafeAnimation();
      }

      const frames = keyframes.map((frame) => ({ ...frame })) as Array<Record<string, unknown>>;
      const propertyKeys = new Set<string>();

      frames.forEach((frame) => {
        Object.keys(frame).forEach((key) => {
          if (!timingKeys.has(key)) {
            propertyKeys.add(key);
          }
        });
      });

      propertyKeys.forEach((key) => {
        let lastDefined: unknown;
        for (let i = 0; i < frames.length; i += 1) {
          if (frames[i][key] !== undefined) {
            lastDefined = frames[i][key];
          } else if (lastDefined !== undefined) {
            frames[i][key] = lastDefined;
          }
        }

        let nextDefined: unknown;
        for (let i = frames.length - 1; i >= 0; i -= 1) {
          if (frames[i][key] !== undefined) {
            nextDefined = frames[i][key];
          } else if (nextDefined !== undefined) {
            frames[i][key] = nextDefined;
          }
        }

        const hasUndefined = frames.some((frame) => frame[key] === undefined);
        if (hasUndefined) {
          const fallback =
            getComputedStyle(this).getPropertyValue(toKebabCase(key)) ||
            (getComputedStyle(this) as unknown as Record<string, string>)[key];

          if (fallback) {
            frames.forEach((frame) => {
              if (frame[key] === undefined) {
                frame[key] = fallback;
              }
            });
          }
        }
      });

      try {
        return nativeAnimate.call(this, frames as Keyframe[], options);
      } catch {
        return buildSafeAnimation();
      }
    }
  };
};

installPartialKeyframePatch();

if (navigator.userAgent === 'ReactSnap') {
  MotionGlobalConfig.skipAnimations = true;
}

const rootElement = document.getElementById('root') as HTMLElement;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
