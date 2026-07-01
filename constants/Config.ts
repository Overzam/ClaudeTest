export const MAX_HEARTS = 5;
export const HEARTS_REGEN_HOURS = 4;
export const XP_PER_EXERCISE = 5;
export const XP_LESSON_COMPLETION_BONUS = 10;
export const STREAK_REMINDER_HOUR = 19;

export const LEVEL_THRESHOLDS = [0, 50, 150, 300, 500, 750, 1050, 1400, 1800, 2250];

export function calculateLevel(xp: number): number {
  const idx = LEVEL_THRESHOLDS.findLastIndex((t) => t <= xp);
  return Math.max(1, idx + 1);
}

export function xpForNextLevel(xp: number): number {
  const level = calculateLevel(xp);
  return LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
}

// ──────────────────────────────────────────────────────────────
// Monetization — fill in with your real dashboard values before
// building for production. Placeholders below are non-functional.
// ──────────────────────────────────────────────────────────────

// RevenueCat: https://app.revenuecat.com → Project settings → API keys
export const REVENUECAT_API_KEY_IOS = 'appl_XXXXXXXXXXXXXXXXXXXXXXXXXXX';
export const REVENUECAT_API_KEY_ANDROID = 'goog_XXXXXXXXXXXXXXXXXXXXXXXXXXX';

// Entitlement identifier configured in the RevenueCat dashboard
export const REVENUECAT_ENTITLEMENT_PREMIUM = 'premium';

// Product IDs must match exactly what you create in App Store Connect /
// Google Play Console, and must be attached to the entitlement above.
export const PRODUCT_ID_MONTHLY = 'recipequest_premium_monthly';
export const PRODUCT_ID_YEARLY = 'recipequest_premium_yearly';

// AdMob: https://apps.admob.com → Apps → Ad units → Rewarded
// Use TestIds from react-native-google-mobile-ads while developing;
// swap for real IDs only once the app is reviewed and approved.
export const ADMOB_REWARDED_UNIT_ID_IOS = 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX';
export const ADMOB_REWARDED_UNIT_ID_ANDROID = 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX';
