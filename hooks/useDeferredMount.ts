import { useState, useEffect } from 'react';

/**
 * Hook that defers mounting of heavy components until after the main content
 * is visible and interactive. Uses requestIdleCallback when available,
 * otherwise falls back to a setTimeout.
 * 
 * @param delay - Fallback delay in milliseconds (default: 1500ms)
 * @returns boolean indicating whether the component should mount
 */
export const useDeferredMount = (delay = 1500): boolean => {
  const [shouldMount, setShouldMount] = useState(false);
  
  useEffect(() => {
    // If we're on the server, never mount (SSR compatibility)
    if (typeof window === 'undefined') {
      return;
    }
    
    // Use requestIdleCallback when available for optimal scheduling
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(
        () => setShouldMount(true),
        { timeout: delay } // Ensure it runs even if idle doesn't occur
      );
      return () => cancelIdleCallback(id);
    } 
    // Fallback to setTimeout for browsers without requestIdleCallback
    else {
      const timer = setTimeout(() => setShouldMount(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);
  
  return shouldMount;
};