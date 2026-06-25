import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { STREAK_REMINDER_HOUR } from '@/constants/Config';

export async function requestNotificationPermissions(): Promise<boolean> {
  if (!Device.isDevice) return false;
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleStreakReminder() {
  await Notifications.cancelAllScheduledNotificationsAsync();
  await Notifications.scheduleNotificationAsync({
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

export async function cancelStreakReminder() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
