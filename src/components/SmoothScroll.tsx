import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const isScrollableContainer = (node: HTMLElement): boolean => {
  const styles = window.getComputedStyle(node);
  const overflowY = styles.overflowY;
  const allowsScroll = overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay';
  return allowsScroll && node.scrollHeight > node.clientHeight;
};

const hasScrollableParent = (start: HTMLElement | null): boolean => {
  let node = start;
  while (node && node !== document.body) {
    if (isScrollableContainer(node)) return true;
    node = node.parentElement;
  }
  return false;
};

const SmoothScroll = () => {
  const { pathname } = useLocation();
  const rafRef = useRef<number | null>(null);
  const currentRef = useRef(0);
  const targetRef = useRef(0);
  const enabledRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // Keep native behavior on touch devices and for users who prefer reduced motion.
    if (prefersReducedMotion || !finePointer) return undefined;

    enabledRef.current = true;
    currentRef.current = window.scrollY;
    targetRef.current = window.scrollY;

    const clamp = (value: number) => {
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      return Math.min(Math.max(value, 0), maxScroll);
    };

    const step = () => {
      const diff = targetRef.current - currentRef.current;

      if (Math.abs(diff) < 0.3) {
        currentRef.current = targetRef.current;
        window.scrollTo(0, currentRef.current);
        rafRef.current = null;
        return;
      }

      currentRef.current += diff * 0.12;
      window.scrollTo(0, currentRef.current);
      rafRef.current = window.requestAnimationFrame(step);
    };

    const startAnimation = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(step);
    };

    const handleWheel = (event: WheelEvent) => {
      if (!enabledRef.current) return;
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (hasScrollableParent(event.target as HTMLElement | null)) return;

      targetRef.current = clamp(targetRef.current + event.deltaY);
      event.preventDefault();
      startAnimation();
    };

    const syncWithNativeScroll = () => {
      if (rafRef.current !== null) return;
      currentRef.current = window.scrollY;
      targetRef.current = window.scrollY;
    };

    const handleResize = () => {
      targetRef.current = clamp(targetRef.current);
      currentRef.current = clamp(currentRef.current);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', syncWithNativeScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      enabledRef.current = false;
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', syncWithNativeScroll);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!enabledRef.current) return;
    currentRef.current = window.scrollY;
    targetRef.current = window.scrollY;
  }, [pathname]);

  return null;
};

export default SmoothScroll;
