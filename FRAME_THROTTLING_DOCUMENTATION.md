# LaserFlow Frame Throttling Documentation

## Overview

Enhanced frame throttling implementation to reduce Total Blocking Time (TBT) and CPU/GPU load with adaptive frame rates based on device tier. The system now provides:

1. **Device-tier adaptive frame rates**: 60fps (high), 45fps (medium), 30fps (low)
2. **Optimized DPR adjustment**: More responsive performance monitoring
3. **Improved time uniform precision**: Uncapped real delta time for perfect synchronization
4. **Maintained animation smoothness**: All time uniforms updated every frame

## Implementation Details

### 1. Adaptive Frame Rate Control
- **High-tier devices**: 60fps (render every ~16.7ms)
- **Medium-tier devices**: 45fps (render every ~22.2ms)  
- **Low-tier devices**: 30fps (render every ~33.3ms)
- **Approach**: Uses `useDeviceTier()` hook to determine device capability and selects appropriate frame rate

### 2. Time Uniform Consistency (Enhanced)
**Critical Requirement**: Keep time uniforms consistent with real elapsed time
**Enhanced Solution**:
- Update `iTime` uniform every frame (real elapsed time from THREE.Clock)
- Update `uFlowTime` and `uFogTime` accumulations using **uncapped real delta time**
- This ensures perfect time synchronization even with throttled rendering
- No more time desync from capped delta time (previously capped at 33ms)

### 3. Optimized DPR Adjustment Integration
**Problem**: DPR adjustment only ran during throttled renders (every 33ms+)
**Solution**: 
- Added `lastDprCheckRef` to track last DPR check time
- Check DPR adjustment every 250ms (instead of only when rendering)
- FPS tracking updated every frame for more responsive performance monitoring
- DPR adjustments happen more frequently and responsively

### 4. Mouse Smoothing & Animation Updates
- Updates every frame with lerp based on `optimizedMouseSmoothTime`
- Fade animations use real delta time for consistent timing
- Ensures smooth interaction despite throttled rendering

### 5. Integration with Existing Pausing
**Respects existing pause conditions**:
- `pausedRef.current` for tab hidden/WebGL context loss
- `inViewRef.current` for out-of-view detection (IntersectionObserver)
- No rendering or uniform updates occur when paused or out of view

## Enhanced `animate()` Function Structure

```typescript
const animate = () => {
  raf = requestAnimationFrame(animate);
  if (pausedRef.current || !inViewRef.current) return;

  const t = clock.getElapsedTime();
  const dt = Math.max(0, t - prevTime);
  prevTime = t;

  // Always update iTime for shader consistency (real elapsed time)
  uniforms.iTime.value = t;

  // Always accumulate flow/fog times based on REAL uncapped delta time
  // This ensures perfect time synchronization even with throttled rendering
  (uniforms.uFlowTime.value as number) += dt;
  (uniforms.uFogTime.value as number) += dt;

  // Always update mouse smoothing for smooth interaction
  const tau = Math.max(1e-3, optimizedMouseSmoothTime);
  const alpha = 1 - Math.exp(-dt / tau);
  mouseSmooth.lerp(mouseTarget, alpha);
  uniforms.iMouse.value.set(mouseSmooth.x, mouseSmooth.y, 0, 0);

  // Always update fade animation
  if (!hasFadedRef.current) {
    const fadeDur = 1.0;
    fade = Math.min(1, fade + dt / fadeDur);
    uniforms.uFade.value = fade;
    if (fade >= 1) hasFadedRef.current = true;
  }

  // Update FPS tracking every frame for responsive DPR adjustment
  const now = performance.now();
  const dtMs = dt * 1000;
  emaDtRef.current = emaDtRef.current * 0.9 + dtMs * 0.1;
  const instFps = 1000 / Math.max(1, emaDtRef.current);
  fpsSamplesRef.current.push(instFps);
  
  // Check for DPR adjustment more frequently (every 250ms instead of only when rendering)
  if (now - lastDprCheckRef.current >= 250) {
    lastDprCheckRef.current = now;
    adjustDprIfNeeded(now);
  }

  // ADAPTIVE FRAME RATE THROTTLING based on device tier
  const targetFrameTime = getTargetFrameTime();
  if (now - lastFrameTimeRef.current >= targetFrameTime) {
    lastFrameTimeRef.current = now;
    
    // Perform actual render
    renderer.render(scene, camera);
  }
};
```

## Performance Impact Estimation

### Expected Improvements by Device Tier:

| Device Tier | Frame Rate | TBT Reduction | CPU Reduction | GPU Reduction |
|-------------|------------|---------------|---------------|---------------|
| **High**    | 60fps      | ~0% (baseline)| ~0% (baseline)| ~0% (baseline)|
| **Medium**  | 45fps      | ~25%          | ~25%          | ~25%          |
| **Low**     | 30fps      | ~50%          | ~40%          | ~30%          |

### Memory Impact:
- **Frame buffer swaps**: Reduced based on frame rate (50% for low-tier)
- **Uniform buffer updates**: Same frequency (maintains animation smoothness)
- **GPU command submissions**: Reduced based on frame rate

## Validation Plan

### 1. Device Tier Detection Verification
**Test each device tier**:
- High-tier: Desktop with 8+ cores, 8+ GB RAM
- Medium-tier: Desktop with 4-7 cores, 4-7 GB RAM  
- Low-tier: Mobile or low-end desktop (<4 cores, <4 GB RAM)
- Verify correct frame rate selection using browser DevTools FPS meter

### 2. Time Uniform Precision Test
**Verify time synchronization**:
- Monitor `uFlowTime` and `uFogTime` accumulation
- Ensure they match real elapsed time (not throttled)
- Check for smooth animation despite frame throttling

### 3. DPR Adjustment Responsiveness
**Test performance adaptation**:
- Simulate performance degradation (CPU throttling in DevTools)
- Verify DPR adjusts within 1-2 seconds
- Check that frame rate remains stable

### 4. Lighthouse TBT Metric
**Expected Improvements**:
- Low-tier devices: TBT reduction from ~200-300ms to ~100-150ms (50%)
- Medium-tier devices: TBT reduction from ~200-300ms to ~150-225ms (25%)
- High-tier devices: Minimal TBT impact (maintains 60fps)
- Run: `lighthouse http://localhost:9002 --output=html`

### 5. Real-world Testing Matrix
**Device Testing**:
- **Desktop High-end**: Verify 60fps smooth animation
- **Desktop Mid-range**: Verify 45fps with good performance
- **Mobile/Low-end**: Verify 30fps with significant performance improvement
- **Reduced motion preference**: Respects user preference

## Browser Compatibility

### Supported Features:
- ✅ `requestAnimationFrame` (all modern browsers)
- ✅ `performance.now()` (high-resolution timing)
- ✅ `IntersectionObserver` (out-of-view detection)
- ✅ `document.hidden` (tab visibility API)
- ✅ `navigator.hardwareConcurrency` (device tier detection)
- ✅ `matchMedia` (reduced motion preference)

### Fallbacks:
- If `performance.now()` unavailable, uses `Date.now()` (less precise)
- If `IntersectionObserver` unavailable, always assumes in-view
- If device tier detection fails, defaults to low-tier (30fps)

## Configuration Options

### Current Implementation:
1. **Adaptive Frame Rate**: Adjusts based on device tier (high/medium/low)
2. **Dynamic DPR Adjustment**: Responds to performance changes every 250ms
3. **User Preference**: Respects `prefers-reduced-motion` (already integrated)
4. **Viewport Detection**: Pauses when out of view or tab hidden

### Future Extensions:
1. **Dynamic Frame Rate**: Could adjust based on real-time FPS (e.g., throttle more if FPS drops)
2. **Battery Awareness**: Could reduce frame rate on battery power
3. **Network Conditions**: Could adjust quality based on network speed

## Rollback Procedure

If issues occur, revert to original implementation:
1. Remove device-tier adaptive frame rate logic
2. Restore fixed 30fps throttling (33ms threshold)
3. Revert to capped delta time for time uniforms
4. Restore DPR adjustment to only run during renders

## Conclusion

The enhanced frame throttling implementation provides:

- ✅ **Device-optimized performance**: Adaptive frame rates based on hardware capability
- ✅ **Perfect time synchronization**: Uncapped real delta time for time uniforms
- ✅ **Responsive DPR adjustment**: More frequent performance monitoring
- ✅ **Maintained animation smoothness**: All animations update every frame
- ✅ **Reduced TBT/CPU/GPU load**: Significant improvements for low/medium tier devices
- ✅ **Backward compatible**: No API changes, seamless integration

Expected Lighthouse performance score improvement: 
- **Low-tier devices**: 10-15 points (TBT reduction)
- **Medium-tier devices**: 5-10 points (balanced performance)
- **High-tier devices**: 0-5 points (maintains quality)