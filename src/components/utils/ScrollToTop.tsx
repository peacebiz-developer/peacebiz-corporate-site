import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

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
    if (location.hash) {
      const targetId = decodeURIComponent(location.hash.replace('#', ''));
      if (!targetId) return;

      requestAnimationFrame(() => {
        const target = document.getElementById(targetId);
        if (!target) return;
        target.scrollIntoView({ block: 'start', behavior: 'auto' });
      });
      return;
    }

    const saved = positionsRef.current[routeKey];
    if (typeof saved === 'number') {
      window.scrollTo({ top: saved, left: 0, behavior: 'auto' });
      return;
    }

  }, [location.hash, routeKey]);

  return null;
}
