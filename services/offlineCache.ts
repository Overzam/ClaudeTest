import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Path, Lesson } from '@/types/database.types';
import type { Exercise } from '@/types/lesson.types';

const KEYS = {
  paths: 'cache:paths',
  lessons: (pathId: string) => `cache:lessons:${pathId}`,
  exercises: (lessonId: string) => `cache:exercises:${lessonId}`,
  timestamp: (key: string) => `cache:ts:${key}`,
};

const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24h

async function isFresh(key: string): Promise<boolean> {
  const ts = await AsyncStorage.getItem(KEYS.timestamp(key));
  if (!ts) return false;
  return Date.now() - Number(ts) < CACHE_TTL_MS;
}

async function setWithTimestamp(key: string, value: unknown) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
  await AsyncStorage.setItem(KEYS.timestamp(key), String(Date.now()));
}

export async function cachePaths(paths: Path[]) {
  await setWithTimestamp(KEYS.paths, paths);
}

export async function getCachedPaths(): Promise<Path[] | null> {
  if (!(await isFresh(KEYS.paths))) return null;
  const raw = await AsyncStorage.getItem(KEYS.paths);
  return raw ? JSON.parse(raw) : null;
}

export async function cacheLessons(pathId: string, lessons: Lesson[]) {
  await setWithTimestamp(KEYS.lessons(pathId), lessons);
}

export async function getCachedLessons(pathId: string): Promise<Lesson[] | null> {
  const key = KEYS.lessons(pathId);
  if (!(await isFresh(key))) return null;
  const raw = await AsyncStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

export async function cacheExercises(lessonId: string, exercises: Exercise[]) {
  await setWithTimestamp(KEYS.exercises(lessonId), exercises);
}

export async function getCachedExercises(lessonId: string): Promise<Exercise[] | null> {
  const key = KEYS.exercises(lessonId);
  if (!(await isFresh(key))) return null;
  const raw = await AsyncStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

export async function clearCache() {
  const keys = await AsyncStorage.getAllKeys();
  const cacheKeys = keys.filter((k) => k.startsWith('cache:'));
  await AsyncStorage.multiRemove(cacheKeys);
}
