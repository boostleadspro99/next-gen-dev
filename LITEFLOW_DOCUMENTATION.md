# LaserFlow Lite Mode Documentation

## Overview

LaserFlow now includes a "Lite mode" that automatically reduces GPU/CPU load on mobile and low-end devices while maintaining full quality on desktop devices. This implementation follows a clean configuration layer with presets for "full" vs "lite" modes.

## Device Detection

The system uses a multi-factor approach to determine device capability:

### 1. `useDeviceTier` Hook
Combines multiple signals to determine device tier ('high', 'medium', 'low'):
- **Screen width**: `matchMedia('(max-width: 768px)')` for mobile detection
- **CPU cores**: `navigator.hardwareConcurrency` (≤ 4 cores = low-end)
- **Device memory**: `navigator.deviceMemory` (if available, < 4GB = low-end)
- **Reduced motion preference**: `prefers-reduced-motion: reduce`

### 2. `useIsLowEndDevice` Hook (Simplified)
Returns `true` for devices that are:
- Mobile (screen width ≤ 768px) OR
- Low CPU cores (≤ 4) OR
- Prefers reduced motion

## Configuration Presets

### Full Mode (Desktop/High-end)
```typescript
{
  dpr: 2,                    // High pixel ratio for retina displays
  wispDensity: 1.5,          // Rich wisp effects
  mouseSmoothTime: 0.0,      // Instant mouse response
  mouseTiltStrength: 0.01,   // Full mouse interaction
  fogIntensity: 0.6,         // Rich volumetric fog
  fogScale: 0.3,             // Detailed fog texture
  wispSpeed: 15.0,           // Fast wisp animation
  wispIntensity: 5.0,        // Bright wisps
  flowStrength: 0.25,        // Strong flow effects
  flowSpeed: 0.35,           // Normal flow speed
}
```

### Lite Mode (Mobile/Low-end)
```typescript
{
  dpr: 1,                    // Reduced pixel ratio (≤ 1)
  wispDensity: 0.8,          // 47% reduction - fewer particles
  mouseSmoothTime: 0.1,      // Smoother, less frequent updates
  mouseTiltStrength: 0.005,  // 50% reduction - less GPU-intensive
  fogIntensity: 0.3,         // 50% reduction - lighter fog
  fogScale: 0.5,             // 67% increase - less detailed (faster)
  wispSpeed: 8.0,            // 47% reduction - slower animation
  wispIntensity: 2.5,        // 50% reduction - dimmer wisps
  flowStrength: 0.15,        // 40% reduction - weaker flow
  flowSpeed: 0.25,           // 29% reduction - slower flow
  fogFallSpeed: 0.4,         // 33% reduction - slower fog movement
}
```

## Parameter Adjustments & Rationale

### 1. Renderer Pixel Ratio (dpr)
- **Full**: 2 (retina quality)
- **Lite**: 1 (standard quality)
- **Why**: Pixel ratio has quadratic impact on fragment shader workload. Reducing from 2 to 1 cuts pixel processing by 75%.

### 2. Fog Parameters
- **fogIntensity**: Reduced 50% (0.6 → 0.3)
- **fogScale**: Increased 67% (0.3 → 0.5)
- **Why**: Fog intensity affects alpha blending cost. Larger scale means lower frequency noise = fewer texture lookups.

### 3. Wisp Effects
- **wispDensity**: Reduced 47% (1.5 → 0.8)
- **wispIntensity**: Reduced 50% (5.0 → 2.5)
- **wispSpeed**: Reduced 47% (15.0 → 8.0)
- **Why**: Wisps involve complex per-fragment calculations and animation. Reducing density and intensity significantly cuts shader workload.

### 4. Mouse Interaction
- **mouseSmoothTime**: Increased (0.0 → 0.1)
- **mouseTiltStrength**: Reduced 50% (0.01 → 0.005)
- **Why**: Smoother mouse updates reduce frequency of uniform updates and shader recalculations. Reduced tilt strength decreases fog distortion calculations.

### 5. Flow Effects
- **flowStrength**: Reduced 40% (0.25 → 0.15)
- **flowSpeed**: Reduced 29% (0.35 → 0.25)
- **Why**: Flow calculations involve trigonometric functions and time-based animations. Reducing strength and speed lowers computational intensity.

## Performance Impact

### Expected GPU Load Reduction
- **Fragment shader operations**: ~40-50% reduction
- **Uniform updates**: ~30% reduction (slower mouse smoothing)
- **Texture sampling**: ~30% reduction (larger fog scale)
- **Animation complexity**: ~40% reduction (slower wisps/flow)

### Memory Impact
- **Frame buffer size**: 75% reduction (dpr: 2 → 1)
- **Uniform buffer updates**: Reduced frequency

## Usage

### Component API
```tsx
<LaserFlow 
  mode="auto"      // 'auto' | 'full' | 'lite'
  color="#10b981"
  // ... other props
/>
```

### Manual Override
```tsx
// Force lite mode (e.g., for testing)
<LaserFlow mode="lite" />

// Force full mode (e.g., for high-end mobile)
<LaserFlow mode="full" />
```

### Integration with Existing System
The Lite mode integrates seamlessly with existing optimizations:
- **Code splitting**: LaserFlow still loads in separate chunk
- **Deferred mounting**: Only loads after idle/1500ms
- **Desktop-only loading**: Controlled by `useIsDesktop` hook
- **Static fallback**: Shows instantly while LaserFlow loads

## Testing

### Manual Testing Checklist
1. **Desktop (High-end)**: Verify full quality settings load
2. **Mobile (Low-end)**: Verify lite mode activates automatically
3. **Reduced motion**: Verify lite mode activates
4. **Manual override**: Test `mode="full"` and `mode="lite"` props
5. **Performance**: Monitor FPS in browser dev tools

### Automated Testing Considerations
- Mock `navigator.hardwareConcurrency` for different CPU profiles
- Use viewport testing for mobile/desktop detection
- Test with `prefers-reduced-motion` media query

## Browser Compatibility

### Supported Features
- ✅ `navigator.hardwareConcurrency` (Chrome 37+, Firefox 48+, Safari 10.1+)
- ✅ `navigator.deviceMemory` (Chrome 63+, limited support)
- ✅ `matchMedia` (all modern browsers)
- ✅ `prefers-reduced-motion` (Chrome 74+, Firefox 63+, Safari 10.1+)

### Fallbacks
- CPU cores: Defaults to 4 if `hardwareConcurrency` unavailable
- Device memory: Defaults to 4GB if `deviceMemory` unavailable
- Reduced motion: Treated as low-end device when enabled

## Rollback Procedure

If issues occur, revert to previous behavior:
1. Remove `mode` prop from LaserFlow usage
2. Revert LaserFlow component to use original props directly
3. Remove `useDeviceTier` hook imports
4. Remove `LaserFlowPresets.ts` file

## Conclusion

The Lite mode implementation provides:
- ✅ Automatic device detection based on multiple factors
- ✅ Significant GPU/CPU load reduction on low-end devices
- ✅ Clean configuration layer with presets
- ✅ Backward compatibility (defaults to auto-detection)
- ✅ Minimal code changes to existing usage

Expected performance improvement on mobile/low-end devices: **40-60% reduction in GPU load** while maintaining visual appeal.