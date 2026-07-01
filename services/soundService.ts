import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';
import { useSettingsStore } from '@/stores/settingsStore';

const SOUND_SOURCES = {
  correct: require('@/assets/sounds/correct.wav'),
  incorrect: require('@/assets/sounds/incorrect.wav'),
  lessonComplete: require('@/assets/sounds/lesson_complete.wav'),
  xpGain: require('@/assets/sounds/xp_gain.wav'),
  badgeUnlock: require('@/assets/sounds/badge_unlock.wav'),
  streak: require('@/assets/sounds/streak.wav'),
  tap: require('@/assets/sounds/tap.wav'),
} as const;

export type SoundKey = keyof typeof SOUND_SOURCES;

let players: Partial<Record<SoundKey, AudioPlayer>> | null = null;
let initialized = false;

export function initSounds() {
  if (initialized) return;
  initialized = true;
  setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
  players = {};
  for (const key of Object.keys(SOUND_SOURCES) as SoundKey[]) {
    try {
      players[key] = createAudioPlayer(SOUND_SOURCES[key]);
    } catch {
      // Sound is best-effort — never block the app if audio init fails on a device.
    }
  }
}

export function playSound(key: SoundKey) {
  if (!useSettingsStore.getState().soundsEnabled) return;
  const player = players?.[key];
  if (!player) return;
  try {
    player.seekTo(0);
    player.play();
  } catch {
    // ignore playback errors (e.g. device silent switch edge cases)
  }
}
