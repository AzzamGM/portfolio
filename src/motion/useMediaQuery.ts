import { useSyncExternalStore } from 'react';

/** Subscribe to a media query. Safe for the first render (no layout flash on reload). */
export function useMediaQuery(query: string): boolean {
  const subscribe = (cb: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener('change', cb);
    return () => mql.removeEventListener('change', cb);
  };
  const get = () => window.matchMedia(query).matches;
  return useSyncExternalStore(subscribe, get, () => false);
}
