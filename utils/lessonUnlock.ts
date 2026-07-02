import type { Lesson } from '@/types/database.types';

export type LessonStatus = 'locked' | 'available' | 'completed';
export type ProgressMap = Record<string, LessonStatus | undefined>;

/**
 * Skill-tree unlock rules:
 * - completed stays completed;
 * - lessons with prerequisites are available once ALL prerequisites are
 *   completed (empty array = root lesson, always available);
 * - lessons without prerequisite data (offline/local fallback) keep the old
 *   linear behavior: only the first lesson of the path starts available;
 * - a stored 'available' row always counts (covers rows written before the
 *   tree existed, so nobody loses access they already had).
 */
export function computeLessonStatus(
  lesson: Lesson,
  progress: ProgressMap,
  minOrderIndex: number
): LessonStatus {
  const recorded = progress[lesson.id];
  if (recorded === 'completed') return 'completed';

  const prereqs = lesson.prerequisite_lesson_ids;
  if (prereqs == null) {
    return recorded ?? (lesson.order_index === minOrderIndex ? 'available' : 'locked');
  }
  if (recorded === 'available') return 'available';
  return prereqs.every((id) => progress[id] === 'completed') ? 'available' : 'locked';
}

/**
 * Depth of each lesson in the prerequisite tree (0 = root). Used to render
 * the path as unlock tiers. Cycles or dangling ids are treated defensively
 * as depth 0 so bad data can never hang the UI.
 */
export function computeLessonDepths(lessons: Lesson[]): Map<string, number> {
  const byId = new Map(lessons.map((l) => [l.id, l]));
  const depths = new Map<string, number>();

  function depthOf(id: string, visiting: Set<string>): number {
    const cached = depths.get(id);
    if (cached !== undefined) return cached;
    const lesson = byId.get(id);
    if (!lesson || visiting.has(id)) return 0;
    visiting.add(id);
    const prereqs = lesson.prerequisite_lesson_ids ?? [];
    const d = prereqs.length === 0
      ? 0
      : 1 + Math.max(...prereqs.map((p) => depthOf(p, visiting)));
    visiting.delete(id);
    depths.set(id, d);
    return d;
  }

  for (const l of lessons) depthOf(l.id, new Set());
  return depths;
}

export const TIER_LABELS = ['🌱 Fondamentaux', '🍳 Techniques', '⭐ Maîtrise'];

export function tierLabel(depth: number): string {
  return TIER_LABELS[Math.min(depth, TIER_LABELS.length - 1)];
}
