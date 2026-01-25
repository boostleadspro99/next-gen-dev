import { useState, useEffect } from 'react';

/**
 * Hook that detects if the current device is a desktop (not mobile)
 * and if the user doesn't prefer reduced motion.
 * 
 * Returns true when:
 * - Screen width is >= 768px (not mobile)
 * - AND prefers-reduced-motion is not set to 'reduce'
 * 
 * @returns boolean indicating if desktop experience should be used
 */
export const useIsDesktop = (): boolean => {
  const [isDesktop, setIsDesktop] = useState(true);
  
  useEffect(() => {
    // If we're on the server, assume desktop (SSR compatibility)
    if (typeof window === 'undefined') {
      setIsDesktop(true);
      return;
    }
    
    const checkIsDesktop = () => {
      const mediaQueryMobile = window.matchMedia('(max-width: 767px)');
      const mediaQueryReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      
      // Desktop = not mobile AND not prefers reduced motion
      const desktop = !mediaQueryMobile.matches && !mediaQueryReducedMotion.matches;
      setIsDesktop(desktop);
    };
    
    // Initial check
    checkIsDesktop();
    
    // Listen for changes
    const mediaQueryMobile = window.matchMedia('(max-width: 767px)');
    const mediaQueryReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Modern browsers support addEventListener on MediaQueryList
    const handleChange = () => checkIsDesktop();
    
    if (mediaQueryMobile.addEventListener) {
      mediaQueryMobile.addEventListener('change', handleChange);
      mediaQueryReducedMotion.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQueryMobile.addListener(handleChange);
      mediaQueryReducedMotion.addListener(handleChange);
    }
    
    return () => {
      if (mediaQueryMobile.removeEventListener) {
        mediaQueryMobile.removeEventListener('change', handleChange);
        mediaQueryReducedMotion.removeEventListener('change', handleChange);
      } else {
        mediaQueryMobile.removeListener(handleChange);
        mediaQueryReducedMotion.removeListener(handleChange);
      }
    };
  }, []);
  
  return isDesktop;
};