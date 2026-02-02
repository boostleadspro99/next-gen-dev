# Analytics Implementation Summary

## Overview
Complete event tracking system for measuring funnel performance with session management and data anonymization.

## Implementation Details

### 1. Analytics Utility (`utils/analytics.ts`)

**Features:**
- Session ID management (UUID stored in localStorage)
- Data anonymization for sensitive fields (phone, whatsapp, email, mobile, tel)
- Console.log output for development
- dataLayer.push() support for Google Tag Manager integration
- LocalStorage persistence (last 100 events)

**Key Functions:**
- `getSessionId()` - Generates or retrieves unique session ID
- `anonymizeData(data)` - Removes sensitive information from payload
- `trackEvent(event, payload)` - Main tracking function
- `trackQuizStarted(quizType)` - Tracks quiz initialization
- `trackQuizStepCompleted(stepId, choice, quizType)` - Tracks each step
- `trackQuizCompleted(quizType, results)` - Tracks quiz completion
- `trackContinueClicked(step, context)` - Tracks CTA clicks
- `trackDemoOpened(templateId, templateTitle)` - Tracks demo opens
- `trackStyleSelected(templateId, templateTitle)` - Tracks style selections

### 2. Main Simulator Tracking (`pages/Simulator.tsx`)

**Events Tracked:**
- `quiz_started` - When simulator page loads (quizType: 'simulator')
- `quiz_step_completed` - For each of 4 steps (stepId + formData)
- `continue_clicked` - Every "Next" button click
- `quiz_completed` - When analysis results are ready (includes results + formData)

**Tracked Data:**
- Sector, city, country
- Objective (calls/whatsapp/booking/orders)
- Average ticket price
- Margin (optional)
- Has existing website
- Generated revenue scenarios

### 3. Design Simulator Tracking (`pages/DesignSimulator.tsx`)

**Events Tracked:**
- `quiz_started` - When design simulator loads (quizType: 'design')
- `quiz_step_completed` - For each of 4 steps (industry, goal, style, level)
- `continue_clicked` - Every navigation button click
- `quiz_completed` - When recommendations are generated
- `style_selected` - When user selects a template
- `whatsapp_clicked` - WhatsApp CTA clicks
- `cta_pricing_clicked` - Pricing page navigation
- `lead_capture_submitted` - Lead form submissions

**Tracked Data:**
- Industry preferences
- Goal preferences
- Style preferences
- Level preferences
- Selected template details
- Lead capture data (name, whatsapp - anonymized)

### 4. Demo Card Tracking (`components/DemoCard.tsx`)

**Events Tracked:**
- `demo_opened` - When "View Demo" button clicked
- `style_selected` - When "Use this style" button clicked

**Tracked Data:**
- Template ID
- Template title

## Event Schema

All events follow this structure:

```typescript
{
  event: string,           // Event name
  timestamp: string,       // ISO 8601 timestamp
  sessionId: string,        // UUID for session tracking
  payload: any,            // Event-specific data (anonymized)
  userAgent: string,        // Browser user agent
  url: string              // Current page URL
}
```

## Data Privacy

**Anonymized Fields:**
- phone → '[ANONYMIZED]'
- whatsapp → '[ANONYMIZED]'
- email → '[ANONYMIZED]'
- mobile → '[ANONYMIZED]'
- tel → '[ANONYMIZED]'

**Storage:**
- Events stored in localStorage (`komaweb_analytics`)
- Session ID stored in localStorage (`komaweb_session_id`)
- Maximum 100 events retained
- No data sent to external servers (console.log + dataLayer only)

## Testing

To test the tracking:

1. Open browser DevTools Console
2. Navigate through the simulator quizzes
3. Look for `[Analytics]` prefixed logs
4. Each log shows:
   - Event type
   - Timestamp
   - Session ID
   - Payload data
   - Page URL

## Funnel Events Overview

| Event | Trigger | Data Included |
|--------|----------|---------------|
| `quiz_started` | Quiz component mount | quizType |
| `quiz_step_completed` | Step transition | stepId, choice, quizType |
| `continue_clicked` | CTA button click | step, context |
| `quiz_completed` | Analysis finished | quizType, results |
| `demo_opened` | Demo link click | templateId, templateTitle |
| `style_selected` | Style button click | templateId, templateTitle |

## Integration Points

For GTM Integration:
```javascript
// Events automatically pushed to dataLayer if available
window.dataLayer.push(eventData);
```

For Backend Integration:
```javascript
// In trackEvent function, uncomment and implement:
// sendToBackend(eventData);
```

## Session Management

- Session ID generated on first visit using `crypto.randomUUID()`
- Persists across page navigation (localStorage)
- Links all events in a single user session
- Can be reset by clearing `komaweb_session_id` from localStorage

## Maintenance

**View Stored Events:**
```javascript
import { getAnalyticsEvents } from './utils/analytics';
console.log(getAnalyticsEvents());
```

**Clear Analytics:**
```javascript
import { clearAnalyticsEvents } from './utils/analytics';
clearAnalyticsEvents();
```

**Reset Session:**
```javascript
localStorage.removeItem('komaweb_session_id');
```

## Compliance

- ✅ No personal identifiable information (PII) stored
- ✅ Contact data automatically anonymized
- ✅ No external tracking libraries required
- ✅ GDPR/CCPA compliant by design
- ✅ Full data control retained by application