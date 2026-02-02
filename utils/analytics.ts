/**
 * Analytics event tracking for Design Style Simulator
 * No external dependency required - stores events locally
 */

export type AnalyticsEvent = 
  | 'simulator_started'
  | 'demo_opened'
  | 'style_selected'
  | 'cta_pricing_clicked'
  | 'whatsapp_clicked'
  | 'lead_captured'
  | 'lead_capture_submitted'
  | 'step_completed'
  | 'quiz_started'
  | 'quiz_step_completed'
  | 'quiz_completed'
  | 'continue_clicked';

export interface AnalyticsPayload {
  [key: string]: any;
}

// Add dataLayer to Window interface
declare global {
  interface Window {
    dataLayer?: any[];
  }
}

/**
 * Generate or retrieve session ID
 */
export function getSessionId(): string {
  let sessionId = localStorage.getItem('komaweb_session_id');
  
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('komaweb_session_id', sessionId);
  }
  
  return sessionId;
}

/**
 * Anonymize sensitive data from form responses
 */
export function anonymizeData(data: any): any {
  if (!data || typeof data !== 'object') return data;
  
  const anonymized = { ...data };
  
  // Remove or mask sensitive fields
  const sensitiveFields = ['phone', 'whatsapp', 'email', 'mobile', 'tel'];
  sensitiveFields.forEach(field => {
    if (anonymized[field]) {
      anonymized[field] = '[ANONYMIZED]';
    }
  });
  
  return anonymized;
}

/**
 * Track an analytics event with session management
 */
export function trackEvent(event: AnalyticsEvent, payload?: AnalyticsPayload): void {
  const sessionId = getSessionId();
  const anonymizedPayload = anonymizeData(payload || {});
  
  const eventData = {
    event,
    timestamp: new Date().toISOString(),
    sessionId,
    payload: anonymizedPayload,
    userAgent: navigator.userAgent,
    url: window.location.href,
  };

  // Log to console
  console.log('[Analytics]', eventData);

  // Push to dataLayer if available (for GTM integration)
  if (window.dataLayer) {
    window.dataLayer.push(eventData);
  }

  // Store in localStorage for persistence
  try {
    const existingEvents = JSON.parse(localStorage.getItem('komaweb_analytics') || '[]');
    const updatedEvents = [...existingEvents, eventData].slice(-100); // Keep last 100 events
    localStorage.setItem('komaweb_analytics', JSON.stringify(updatedEvents));
  } catch (error) {
    console.warn('Could not save analytics event to localStorage:', error);
  }
}

/**
 * Get all stored analytics events
 */
export function getAnalyticsEvents(): any[] {
  try {
    return JSON.parse(localStorage.getItem('komaweb_analytics') || '[]');
  } catch (error) {
    return [];
  }
}

/**
 * Clear all analytics events
 */
export function clearAnalyticsEvents(): void {
  try {
    localStorage.removeItem('komaweb_analytics');
  } catch (error) {
    // Silently fail
  }
}

/**
 * Track simulator start with user preferences
 */
export function trackSimulatorStarted(preferences: {
  industry: string;
  goal: string;
  style: string;
  level: string;
}): void {
  trackEvent('simulator_started', { preferences });
}


/**
 * Track pricing CTA click
 */
export function trackPricingClicked(source: string = 'simulator'): void {
  trackEvent('cta_pricing_clicked', { source });
}

/**
 * Track WhatsApp CTA click
 */
export function trackWhatsAppClicked(source: string = 'simulator'): void {
  trackEvent('whatsapp_clicked', { source });
}

/**
 * Track lead capture
 */
export function trackLeadCaptured(formData: {
  name: string;
  whatsapp: string;
  demoId?: string;
}): void {
  trackEvent('lead_captured', formData);
}

/**
 * Track step completion
 */
export function trackStepCompleted(step: number, stepName: string): void {
  trackEvent('step_completed', { step, stepName });
}

/**
 * Track quiz started
 */
export function trackQuizStarted(quizType: 'simulator' | 'design'): void {
  trackEvent('quiz_started', { quizType });
}

/**
 * Track quiz step completed with choice data
 */
export function trackQuizStepCompleted(stepId: string, choice: any, quizType: 'simulator' | 'design'): void {
  trackEvent('quiz_step_completed', { 
    stepId, 
    choice: anonymizeData(choice), 
    quizType 
  });
}

/**
 * Track quiz completed
 */
export function trackQuizCompleted(quizType: 'simulator' | 'design', results?: any): void {
  trackEvent('quiz_completed', { 
    quizType,
    results: results ? anonymizeData(results) : undefined
  });
}

/**
 * Track continue button click
 */
export function trackContinueClicked(step: string, context?: string): void {
  trackEvent('continue_clicked', { step, context });
}

/**
 * Track demo opened
 */
export function trackDemoOpened(templateId: string, templateTitle?: string): void {
  trackEvent('demo_opened', { templateId, templateTitle });
}

/**
 * Track style selected
 */
export function trackStyleSelected(templateId: string, templateTitle?: string): void {
  trackEvent('style_selected', { templateId, templateTitle });
}
