import { useState, useEffect } from 'react';

export type DeviceTier = 'high' | 'medium' | 'low';

/**
 * Hook that detects device capability tier based on:
 * - Screen width (mobile vs desktop)
 * - CPU cores (hardwareConcurrency)
 * - Device memory (if available)
 * - Reduced motion preference
 * 
 * Returns 'high', 'medium', or 'low' tier
 */
export const useDeviceTier = (): DeviceTier => {
  const [tier, setTier] = useState<DeviceTier>('high');
  
  useEffect(() => {
    // If we're on the server, assume high tier (SSR compatibility)
    if (typeof window === 'undefined') {
      setTier('high');
      return;
    }
    
    const evaluateTier = (): DeviceTier => {
      // Screen size detection
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      
      // CPU cores detection
      const cores = navigator.hardwareConcurrency || 4; // Default to 4 if unavailable
      
      // Device memory detection (not widely supported)
      const memory = (navigator as any).deviceMemory || 4; // Default to 4GB
      
      // Reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Scoring system
      let score = 0;
      
      // Screen size: desktop gets +2, mobile gets +0
      if (!isMobile) score += 2;
      
      // CPU cores: 8+ = +2, 4-7 = +1, <4 = +0
      if (cores >= 8) score += 2;
      else if (cores >= 4) score += 1;
      
      // Memory: 8+ GB = +2, 4-7 GB = +1, <4 GB = +0
      if (memory >= 8) score += 2;
      else if (memory >= 4) score += 1;
      
      // Reduced motion: if true, cap at medium tier
      const maxWithReducedMotion = prefersReducedMotion ? 3 : 6;
      score = Math.min(score, maxWithReducedMotion);
      
      // Determine tier based on score
      if (score >= 5) return 'high';
      if (score >= 3) return 'medium';
      return 'low';
    };
    
    // Initial evaluation
    setTier(evaluateTier());
    
    // Listen for changes
    const mediaQueries = [
      window.matchMedia('(max-width: 768px)'),
      window.matchMedia('(prefers-reduced-motion: reduce)')
    ];
    
    const handleChange = () => {
      setTier(evaluateTier());
    };
    
    mediaQueries.forEach(mq => {
      if (mq.addEventListener) {
        mq.addEventListener('change', handleChange);
      } else {
        mq.addListener(handleChange);
      }
    });
    
    return () => {
      mediaQueries.forEach(mq => {
        if (mq.removeEventListener) {
          mq.removeEventListener('change', handleChange);
        } else {
          mq.removeListener(handleChange);
        }
      });
    };
  }, []);
  
  return tier;
};

/**
 * Simplified hook that returns whether device is considered low-end
 * Combines mobile detection with low hardware concurrency
 */
export const useIsLowEndDevice = (): boolean => {
  const [isLowEnd, setIsLowEnd] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsLowEnd(false);
      return;
    }
    
    const evaluate = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const cores = navigator.hardwareConcurrency || 4;
      const isLowCores = cores <= 4;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Low-end if: mobile OR low cores OR prefers reduced motion
      return isMobile || isLowCores || prefersReducedMotion;
    };
    
    setIsLowEnd(evaluate());
    
    const mediaQueries = [
      window.matchMedia('(max-width: 768px)'),
      window.matchMedia('(prefers-reduced-motion: reduce)')
    ];
    
    const handleChange = () => setIsLowEnd(evaluate());
    
    mediaQueries.forEach(mq => {
      if (mq.addEventListener) {
        mq.addEventListener('change', handleChange);
      } else {
        mq.addListener(handleChange);
      }
    });
    
    return () => {
      mediaQueries.forEach(mq => {
        if (mq.removeEventListener) {
          mq.removeEventListener('change', handleChange);
        } else {
          mq.removeListener(handleChange);
        }
      });
    };
  }, []);
  
  return isLowEnd;
};