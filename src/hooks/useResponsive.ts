import { useEffect, useState } from 'react';

const DESKTOP_BREAKPOINT = 800;

function getWidth(): number {
  if (typeof window === 'undefined') return DESKTOP_BREAKPOINT + 1;
  return window.innerWidth;
}

/** Mirrors Responsive.isDesktop(context) from the Flutter app. */
export function useIsDesktop(): boolean {
  const [width, setWidth] = useState(getWidth());

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return width > DESKTOP_BREAKPOINT;
}

export function useWindowSize() {
  const [size, setSize] = useState({
    width: getWidth(),
    height: typeof window === 'undefined' ? 0 : window.innerHeight,
  });

  useEffect(() => {
    const onResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return size;
}
