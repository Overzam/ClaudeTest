import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { STREAK_REMINDER_HOUR } from '@/constants/Config';

export async function requestNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleStreakReminder() {
  await Notifications.cancelScheduledNotificationAsync('streak-reminder').catch(() => {});
  await Notifications.scheduleNotificationAsync({
    identifier: 'streak-reminder',
    content: {
      title: '🔥 Maintiens ta série !',
      body: "Tu n'as pas encore cuisiné aujourd'hui. Continue ta série !",
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: STREAK_REMINDER_HOUR,
      minute: 0,
    },
  });
}

export async function sendBadgeNotification(badgeEmoji: string, badgeTitle: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${badgeEmoji} Nouveau badge débloqué !`,
      body: `Tu as obtenu "${badgeTitle}". Continue comme ça !`,
      sound: true,
    },
    trigger: null,
  });
}

export async function cancelStreakReminder() {
  await Notifications.cancelScheduledNotificationAsync('streak-reminder').catch(() => {});
}
