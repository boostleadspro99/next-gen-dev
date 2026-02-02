import demoTemplates from '../data/demoTemplates.json';

export interface UserPreferences {
  industry: string;
  goal: string;
  style: string;
  level: string;
}

export interface DemoTemplate {
  id: string;
  title: string;
  tagline: string;
  industries: string[];
  goals: string[];
  styles: string[];
  levels: string[];
  demoUrl: string;
  previewImageUrl: string;
  tags: string[];
  benefits: string[];
}

export interface ScoredTemplate extends DemoTemplate {
  score: number;
  matchDetails: {
    industryMatch: boolean;
    goalMatch: boolean;
    styleMatch: boolean;
    levelMatch: boolean;
  };
}

/**
 * Calculate match score between user preferences and a template
 * Improved scoring system:
 * - Goal (strong weight): 3 points
 * - Industry: 2 points
 * - Style: 2 points
 * - Level: 1 point
 * - Coherence bonus: +1 if 3+ matches out of 4
 */
export function calculateTemplateScore(
  template: DemoTemplate,
  preferences: UserPreferences
): ScoredTemplate {
  const industryMatch = template.industries.includes(preferences.industry);
  const goalMatch = template.goals.includes(preferences.goal);
  const styleMatch = template.styles.includes(preferences.style);
  const levelMatch = template.levels.includes(preferences.level);

  // Improved scoring weights
  let score = 0;
  if (industryMatch) score += 2;
  if (goalMatch) score += 3; // Strong weight on goal (conversion-focused)
  if (styleMatch) score += 2;
  if (levelMatch) score += 1;

  // Coherence bonus: +1 if 3+ matches out of 4
  const matchCount = [industryMatch, goalMatch, styleMatch, levelMatch].filter(Boolean).length;
  if (matchCount >= 3) {
    score += 1;
  }

  return {
    ...template,
    score,
    matchDetails: {
      industryMatch,
      goalMatch,
      styleMatch,
      levelMatch,
    },
  };
}

/**
 * Get top 3 recommended templates based on user preferences
 * Improved fallback system:
 * - If strong matches (score >= 4): return top 3 by score
 * - If weak matches (score < 4): include best-sellers adapted to Morocco
 */
export function getRecommendedTemplates(
  preferences: UserPreferences
): ScoredTemplate[] {
  // Calculate scores for all templates
  const scoredTemplates = demoTemplates.map((template) =>
    calculateTemplateScore(template, preferences)
  );

  // Sort by score descending
  scoredTemplates.sort((a, b) => b.score - a.score);

  // Check if we have strong matches (score >= 4)
  const hasStrongMatch = scoredTemplates.length > 0 && scoredTemplates[0].score >= 4;

  if (hasStrongMatch) {
    // Return top 3 strong matches
    return scoredTemplates.slice(0, 3);
  } else {
    // Fallback: include best-sellers adapted to Morocco market
    const moroccanBestSellers = [
      'T-RESTO-MAROC-01',  // Restaurant with delivery - very popular in Morocco
      'T-ECOM-MAROC-01',   // E-commerce with COD payment - standard in Morocco
      'T-SERVICE-MAROC-01',  // Universal template optimized for local market
      'T-BTP-01',            // Construction/renovation - high demand
      'T-UNIVERSAL-01'       // Fallback universal template
    ];
    const fallbackTemplates = scoredTemplates
      .filter(t => moroccanBestSellers.includes(t.id))
      .sort((a, b) => b.score - a.score);

    // If we have at least 1 best-seller match, include it
    if (fallbackTemplates.length > 0) {
      const top2Matches = scoredTemplates.slice(0, 2);
      const topFallback = fallbackTemplates[0];
      
      // Combine and return top 3
      const combined = [...top2Matches, topFallback].slice(0, 3);
      combined.sort((a, b) => b.score - a.score);
      return combined;
    }

    // Ultimate fallback: return top 3 anyway
    return scoredTemplates.slice(0, 3);
  }
}

/**
 * Get all available options for each preference category
 */
export function getAvailableOptions() {
  const industries = new Set<string>();
  const goals = new Set<string>();
  const styles = new Set<string>();
  const levels = new Set<string>();

  demoTemplates.forEach(template => {
    template.industries.forEach(industry => industries.add(industry));
    template.goals.forEach(goal => goals.add(goal));
    template.styles.forEach(style => styles.add(style));
    template.levels.forEach(level => levels.add(level));
  });

  return {
    industries: Array.from(industries),
    goals: Array.from(goals),
    styles: Array.from(styles),
    levels: Array.from(levels),
  };
}

/**
 * Format industry key to display name
 */
export function formatIndustryKey(key: string): string {
  const formatMap: Record<string, string> = {
    'artisan': 'Artisan',
    'services': 'Services locaux',
    'sante': 'Santé',
    'professionnel': 'Professionnel',
    'resto': 'Resto',
    'boutique': 'Boutique',
    'ecommerce': 'E-commerce',
    'autre': 'Autre',
  };
  return formatMap[key] || key;
}

/**
 * Format goal key to display name
 */
export function formatGoalKey(key: string): string {
  const formatMap: Record<string, string> = {
    'appels': 'Appels',
    'whatsapp': 'WhatsApp',
    'devis': 'Devis',
    'reservations': 'Réservations',
    'orders': 'Ventes en ligne',
  };
  return formatMap[key] || key;
}

/**
 * Format style key to display name
 */
export function formatStyleKey(key: string): string {
  const formatMap: Record<string, string> = {
    'moderne': 'Moderne & épuré',
    'premium': 'Premium',
    'dynamique': 'Dynamique',
    'simple': 'Simple & efficace',
  };
  return formatMap[key] || key;
}

/**
 * Format level key to display name
 */
export function formatLevelKey(key: string): string {
  const formatMap: Record<string, string> = {
    'essentiel': 'Essentiel',
    'pro': 'Pro',
    'business': 'Business',
  };
  return formatMap[key] || key;
}