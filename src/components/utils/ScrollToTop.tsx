import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const STORAGE_KEY = 'pb-scroll-positions';

const getRouteKey = (pathname: string, search: string) => `${pathname}${search}`;

const parseStoredPositions = () => {
  if (typeof window === 'undefined') return {} as Record<string, number>;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {} as Record<string, number>;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {} as Record<string, number>;
    return parsed as Record<string, number>;
  } catch {
    return {} as Record<string, number>;
  }
};

export default function ScrollToTop() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const routeKey = getRouteKey(location.pathname, location.search);
  const positionsRef = useRef<Record<string, number>>(parseStoredPositions());

  const savePosition = (key: string) => {
    positionsRef.current[key] = window.scrollY;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positionsRef.current));
    } catch {
      // Ignore write failures.
    }
  };

  useEffect(() => {
    if (!('scrollRestoration' in window.history)) return;
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => {
      window.history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => savePosition(routeKey);
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      savePosition(routeKey);
    };
  }, [routeKey]);

  useLayoutEffect(() => {
    let cancelled = false;
    const timeoutIds: number[] = [];

    const scrollToHashTarget = (hash: string) => {
      const targetId = decodeURIComponent(hash.replace('#', ''));
      if (!targetId) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        return;
      }

      const resolveTarget = (id: string): HTMLElement | null => {
        // Keep legacy hash compatibility while preferring precise anchor positions.
        if (id === 'top-news') {
          return document.getElementById('top-news-heading') || document.getElementById(id);
        }
        return document.getElementById(id);
      };

      const scrollToElement = (element: HTMLElement) => {
        const fixedHeaderOffset = 112;
        const top = Math.max(
          0,
          element.getBoundingClientRect().top + window.scrollY - fixedHeaderOffset
        );
        window.scrollTo({ top, left: 0, behavior: 'auto' });
      };

      const scheduleStabilizedScrolls = () => {
        const settleDelays = [0, 140, 320, 680];
        settleDelays.forEach((delay) => {
          const id = window.setTimeout(() => {
            if (cancelled) return;
            const target = resolveTarget(targetId);
            if (target) {
              scrollToElement(target);
            }
          }, delay);
          timeoutIds.push(id);
        });
      };

      let attemptCount = 0;
      const maxAttempts = 120;
      const tryScrollToHash = () => {
        if (cancelled) return;

        const target = resolveTarget(targetId);
        if (target) {
          scrollToElement(target);
          scheduleStabilizedScrolls();
          return;
        }

        attemptCount += 1;
        if (attemptCount < maxAttempts) {
          const id = window.setTimeout(tryScrollToHash, 16);
          timeoutIds.push(id);
          return;
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      };

      requestAnimationFrame(tryScrollToHash);
    };

    if (navigationType === 'POP') {
      const saved = positionsRef.current[routeKey];
      if (typeof saved === 'number') {
        window.scrollTo({ top: saved, left: 0, behavior: 'auto' });
        return;
      }
      if (location.hash) {
        scrollToHashTarget(location.hash);
        return;
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    if (location.hash) {
      scrollToHashTarget(location.hash);
      return () => {
        cancelled = true;
        timeoutIds.forEach((id) => window.clearTimeout(id));
      };
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    return () => {
      cancelled = true;
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, [location.hash, navigationType, routeKey]);

  return null;
}
