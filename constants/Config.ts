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
