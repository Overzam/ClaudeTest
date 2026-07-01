import { useEffect } from 'react';
import { AppState } from 'react-native';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { useProgressStore } from '@/stores/progressStore';
import { useGameStore } from '@/stores/gameStore';
import { usePremiumStore } from '@/stores/premiumStore';
import { useSettingsStore } from '@/stores/settingsStore';
import i18n, { getSavedLanguage } from '@/i18n';
import * as Notifications from 'expo-notifications';
import { initAds } from '@/services/adsService';
import {
  initPurchases,
  getCustomerInfo,
  isEntitlementActive,
  entitlementExpiryDate,
  onCustomerInfoUpdate,
} from '@/services/purchasesService';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  const initialize = useAuthStore((s) => s.initialize);
  const session = useAuthStore((s) => s.session);
  const loadProgress = useProgressStore((s) => s.loadProgress);
  const regenHearts = useGameStore((s) => s.regenHearts);
  const checkExpiry = usePremiumStore((s) => s.checkExpiry);
  const syncFromEntitlement = usePremiumStore((s) => s.syncFromEntitlement);
  const { language } = useSettingsStore();

  useEffect(() => {
    initialize();
    getSavedLanguage().then((lang) => i18n.changeLanguage(lang));
    initAds().catch(() => {});
  }, []);

  useEffect(() => {
    if (session?.user?.id) loadProgress(session.user.id);
  }, [session?.user?.id]);

  useEffect(() => {
    if (!session?.user?.id) return;
    initPurchases(session.user.id);
    getCustomerInfo()
      .then((info) => {
        if (info) syncFromEntitlement(isEntitlementActive(info), entitlementExpiryDate(info));
      })
      .catch(() => {});
    return onCustomerInfoUpdate((info) =>
      syncFromEntitlement(isEntitlementActive(info), entitlementExpiryDate(info))
    );
  }, [session?.user?.id]);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        regenHearts();
        checkExpiry();
      }
    });
    return () => sub.remove();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="lesson/[lessonId]" options={{ presentation: 'modal' }} />
          <Stack.Screen name="lesson/complete" options={{ presentation: 'modal' }} />
          <Stack.Screen name="lesson/recipe" options={{ presentation: 'modal' }} />
          <Stack.Screen name="friends" />
          <Stack.Screen name="badges" />
          <Stack.Screen name="premium" options={{ presentation: 'modal' }} />
          <Stack.Screen name="shop" />
          <Stack.Screen name="settings" />
          <Stack.Screen name="lesson/ingredients" />
          <Stack.Screen name="path/[slug]" />
          <Stack.Screen name="daily-challenge" />
          <Stack.Screen name="recipe-book" />
          <Stack.Screen name="tips" />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
    </I18nextProvider>
  );
}
