import React from 'react';

export type LaserFlowMode = 'auto' | 'full' | 'lite';

export interface LaserFlowProps {
  className?: string;
  style?: React.CSSProperties;
  wispDensity?: number;
  dpr?: number;
  mouseSmoothTime?: number;
  mouseTiltStrength?: number;
  horizontalBeamOffset?: number;
  verticalBeamOffset?: number;
  flowSpeed?: number;
  verticalSizing?: number;
  horizontalSizing?: number;
  fogIntensity?: number;
  fogScale?: number;
  wispSpeed?: number;
  wispIntensity?: number;
  flowStrength?: number;
  decay?: number;
  falloffStart?: number;
  fogFallSpeed?: number;
  color?: string;
}

export interface LaserFlowPreset {
  dpr?: number;
  wispDensity: number;
  mouseSmoothTime: number;
  mouseTiltStrength: number;
  horizontalBeamOffset: number;
  verticalBeamOffset: number;
  flowSpeed: number;
  verticalSizing: number;
  horizontalSizing: number;
  fogIntensity: number;
  fogScale: number;
  wispSpeed: number;
  wispIntensity: number;
  flowStrength: number;
  decay: number;
  falloffStart: number;
  fogFallSpeed: number;
}

export const LASERFLOW_PRESETS: Record<'full' | 'lite', LaserFlowPreset> = {
  full: {
    // High quality settings (desktop)
    dpr: 2,
    wispDensity: 1.5,
    mouseSmoothTime: 0.0,
    mouseTiltStrength: 0.01,
    horizontalBeamOffset: 0.1,
    verticalBeamOffset: 0.0,
    flowSpeed: 0.35,
    verticalSizing: 2.0,
    horizontalSizing: 0.5,
    fogIntensity: 0.6,
    fogScale: 0.3,
    wispSpeed: 15.0,
    wispIntensity: 5.0,
    flowStrength: 0.25,
    decay: 1.1,
    falloffStart: 1.2,
    fogFallSpeed: 0.6,
  },
  lite: {
    // Optimized for mobile/low-end devices
    dpr: 1,
    wispDensity: 0.8,
    mouseSmoothTime: 0.1,
    mouseTiltStrength: 0.005,
    horizontalBeamOffset: 0.1,
    verticalBeamOffset: 0.0,
    flowSpeed: 0.25,
    verticalSizing: 2.0,
    horizontalSizing: 0.5,
    fogIntensity: 0.3,
    fogScale: 0.5,
    wispSpeed: 8.0,
    wispIntensity: 2.5,
    flowStrength: 0.15,
    decay: 1.1,
    falloffStart: 1.2,
    fogFallSpeed: 0.4,
  },
};

/**
 * Get appropriate LaserFlow props based on mode and device tier
 */
export function getLaserFlowProps(
  mode: LaserFlowMode = 'auto',
  deviceTier?: 'high' | 'medium' | 'low',
  overrides?: Partial<LaserFlowProps>
): LaserFlowProps {
  let preset: 'full' | 'lite';
  
  if (mode === 'auto') {
    // Auto-detect based on device tier
    if (!deviceTier) {
      // Default to full if device tier not provided
      preset = 'full';
    } else {
      preset = deviceTier === 'high' ? 'full' : 'lite';
    }
  } else {
    preset = mode;
  }
  
  const baseProps = LASERFLOW_PRESETS[preset];
  
  // Apply overrides
  return {
    ...baseProps,
    ...overrides,
  };
}

/**
 * Get performance-optimized LaserFlow props for the current device
 */
export function getOptimizedLaserFlowProps(
  isLowEndDevice: boolean,
  overrides?: Partial<LaserFlowProps>
): LaserFlowProps {
  const preset = isLowEndDevice ? 'lite' : 'full';
  return {
    ...LASERFLOW_PRESETS[preset],
    ...overrides,
  };
}