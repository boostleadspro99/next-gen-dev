# LaserFlow Frame Throttling Validation Guide

This guide provides step-by-step instructions to validate the enhanced frame throttling implementation and measure performance improvements.

## Prerequisites

1. **Development Environment**:
   - Node.js 18+ and npm
   - Chrome/Edge browser with DevTools
   - Lighthouse CLI (optional but recommended)

2. **Project Setup**:
   ```bash
   cd /home/user/next-gen-dev
   npm install
   ```

## Validation Steps

### 1. Build and Run the Application

```bash
# Build the project
npm run build

# Start development server
npm run dev
# Or preview build
npm run preview
```

The application will be available at `http://localhost:5173` (or similar port).

### 2. Verify Device Tier Detection

**Objective**: Confirm the correct device tier is detected and appropriate frame rate is applied.

**Steps**:
1. Open Chrome DevTools (F12)
2. Go to Console tab
3. Temporarily add debug logging to `components/LaserFlow.tsx`:
   ```typescript
   // Add after deviceTier declaration
   console.log('Device Tier:', deviceTier);
   console.log('Target Frame Time:', getTargetFrameTime(), 'ms');
   ```
4. Refresh page and check console output
5. Verify:
   - High-tier devices show "Device Tier: high" and "Target Frame Time: 16.7"
   - Medium-tier devices show "Device Tier: medium" and "Target Frame Time: 22.2"
   - Low-tier devices show "Device Tier: low" and "Target Frame Time: 33.3"

### 3. Measure Frame Rate with DevTools

**Objective**: Verify actual frame rate matches target frame rate.

**Steps**:
1. Open Chrome DevTools (F12)
2. Go to "Performance" tab
3. Click "Record" button (circle icon)
4. Let it record for 5-10 seconds
5. Click "Stop"
6. Analyze results:
   - Check "FPS" chart at the top
   - Expected FPS: 60 (high), 45 (medium), 30 (low)
   - Look for consistent frame times in "Main" section

**Alternative Method**:
1. Open Chrome DevTools (F12)
2. Go to "Rendering" tab (More Tools → Rendering)
3. Enable "FPS meter"
4. Observe FPS counter in top-right corner

### 4. Verify Time Uniform Consistency

**Objective**: Confirm time uniforms update correctly with real elapsed time.

**Steps**:
1. Add debug logging to `animate()` function:
   ```typescript
   // Add after time uniform updates
   console.log('dt:', dt, 'uFlowTime:', uniforms.uFlowTime.value);
   ```
2. Monitor console output:
   - `dt` should vary (not capped at 0.033)
   - `uFlowTime` should accumulate at real-time rate
   - Animation should appear smooth despite throttled rendering

### 5. Test DPR Adjustment Responsiveness

**Objective**: Verify DPR adjusts based on performance.

**Steps**:
1. Open Chrome DevTools (F12)
2. Go to "Performance" tab
3. Enable CPU throttling (4x or 6x slowdown)
4. Record performance for 10 seconds
5. Check console for DPR adjustment logs (add debug logging to `adjustDprIfNeeded`)
6. Verify DPR decreases when FPS drops below threshold (50fps)

### 6. Measure Total Blocking Time (TBT) with Lighthouse

**Objective**: Quantify performance improvement.

**Steps**:
```bash
# Install Lighthouse globally
npm install -g lighthouse

# Run Lighthouse audit
lighthouse http://localhost:5173 --output=html --output-path=./lighthouse-report.html

# Or use npm script if available
npm run lighthouse
```

**Expected Results**:
- **Low-tier devices**: TBT reduction of 40-50% (e.g., 200ms → 100ms)
- **Medium-tier devices**: TBT reduction of 20-30% (e.g., 200ms → 150ms)
- **High-tier devices**: Minimal TBT impact

### 7. Test Pausing Behavior

**Objective**: Verify rendering pauses when not visible.

**Steps**:
1. Open page with LaserFlow visible
2. Open Chrome DevTools Performance tab
3. Start recording
4. Switch to another tab or minimize browser
5. Wait 2 seconds
6. Switch back to page
7. Stop recording
8. Verify:
   - No rendering occurs while tab is hidden
   - Uniform updates may continue (for smooth resume)
   - Rendering resumes immediately when visible

### 8. Cross-browser Testing

**Test on different browsers**:
- Chrome/Edge (Chromium-based)
- Firefox
- Safari (if available)

**Verify**:
- Frame throttling works consistently
- Time uniforms remain accurate
- No visual glitches or artifacts

## Performance Metrics to Monitor

### Key Metrics:
1. **FPS (Frames Per Second)**: Should match target for device tier
2. **Frame Time**: Should be stable (16.7ms, 22.2ms, or 33.3ms)
3. **Total Blocking Time (TBT)**: Should improve on low/medium tier devices
4. **CPU Usage**: Should reduce proportionally to frame rate reduction
5. **GPU Usage**: Should reduce with fewer renders
6. **Memory Usage**: Should remain stable

### Baseline vs. Improved Comparison:

| Metric | Before (60fps) | After (Adaptive) | Improvement |
|--------|----------------|------------------|-------------|
| **FPS** | 60 | 60/45/30 | Device-appropriate |
| **TBT** | Baseline | Reduced 0-50% | Tier-dependent |
| **CPU** | 100% | 60-100% | 0-40% reduction |
| **GPU** | 100% | 70-100% | 0-30% reduction |

## Troubleshooting

### Common Issues:

1. **Frame rate doesn't match device tier**:
   - Check `useDeviceTier()` hook implementation
   - Verify device detection logic
   - Check console for errors

2. **Animation appears janky**:
   - Verify time uniforms use uncapped `dt`
   - Check mouse smoothing is updating every frame
   - Ensure `requestAnimationFrame` continues running

3. **DPR not adjusting**:
   - Check FPS sampling is working
   - Verify `adjustDprIfNeeded` is called regularly
   - Check threshold values (50fps lower, 58fps upper)

4. **Build errors**:
   - Check TypeScript compilation
   - Verify all imports are correct
   - Check for syntax errors

### Debugging Tips:

1. **Add console logs** to key functions:
   - `getTargetFrameTime()`
   - `animate()` (dt and render decisions)
   - `adjustDprIfNeeded()` (FPS and DPR changes)

2. **Use Performance Profiler** to identify bottlenecks
3. **Check browser console** for WebGL or Three.js errors
4. **Test on different devices** to verify tier detection

## Expected Results

### Success Criteria:
1. ✅ Correct frame rate for device tier (60/45/30 fps)
2. ✅ Smooth animation despite throttled rendering
3. ✅ Reduced TBT on low/medium tier devices
4. ✅ Responsive DPR adjustment
5. ✅ Proper pausing when not visible
6. ✅ No visual artifacts or glitches
7. ✅ Cross-browser compatibility

### Performance Targets:
- **Low-tier devices**: 30fps, 50% TBT reduction
- **Medium-tier devices**: 45fps, 25% TBT reduction  
- **High-tier devices**: 60fps, maintain quality
- **All devices**: Smooth animation, responsive interaction

## Conclusion

The enhanced frame throttling implementation should provide device-appropriate performance optimization while maintaining visual quality and smooth animation. Use this validation guide to verify all aspects of the implementation and measure performance improvements.

For any issues, refer to the troubleshooting section or check the `FRAME_THROTTLING_DOCUMENTATION.md` for implementation details.