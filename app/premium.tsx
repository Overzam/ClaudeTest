import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import type { PurchasesOffering, PurchasesPackage } from 'react-native-purchases';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { Button } from '@/components/ui/Button';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import { usePremiumStore } from '@/stores/premiumStore';
import {
  entitlementExpiryDate,
  getOfferings,
  isEntitlementActive,
  purchasePackage,
  restorePurchases,
} from '@/services/purchasesService';
import { useTranslation } from 'react-i18next';

type PlanOption = 'monthly' | 'yearly';

// Static fallback prices, shown only until the real offering loads from
// RevenueCat/the store (or if fetching it fails, e.g. no network).
const FALLBACK_PRICES: Record<PlanOption, string> = {
  monthly: '3,99 € / mois',
  yearly: '28,99 € / an',
};

const FEATURES = ['feature1', 'feature2', 'feature3', 'feature4'] as const;

export default function PremiumScreen() {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const c = theme.colors;
  const { isPremium, syncFromEntitlement, planExpiresAt, plan } = usePremiumStore();
  const [selected, setSelected] = useState<PlanOption>('yearly');
  const [loading, setLoading] = useState(false);
  const [offering, setOffering] = useState<PurchasesOffering | null>(null);

  useEffect(() => {
    getOfferings().then(setOffering).catch(() => setOffering(null));
  }, []);

  function packageFor(option: PlanOption): PurchasesPackage | undefined {
    if (!offering) return undefined;
    return offering.availablePackages.find((p) =>
      option === 'monthly' ? p.packageType === 'MONTHLY' : p.packageType === 'ANNUAL'
    );
  }

  function priceFor(option: PlanOption): string {
    return packageFor(option)?.product.priceString ?? FALLBACK_PRICES[option];
  }

  async function handleSubscribe() {
    const pkg = packageFor(selected);
    if (!pkg) {
      Alert.alert('Indisponible', 'Impossible de charger l\'offre pour le moment. Réessaie plus tard.');
      return;
    }
    setLoading(true);
    try {
      const info = await purchasePackage(pkg);
      const active = isEntitlementActive(info);
      syncFromEntitlement(active, entitlementExpiryDate(info), selected);
      if (active) {
        Alert.alert('✨ Bienvenue Premium !', 'Profite de tous tes avantages.', [
          { text: 'Super !', onPress: () => router.back() },
        ]);
      }
    } catch (e: any) {
      if (!e?.userCancelled) {
        Alert.alert('Erreur', 'L\'achat n\'a pas pu être finalisé. Réessaie plus tard.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleRestore() {
    try {
      const info = await restorePurchases();
      const active = isEntitlementActive(info);
      syncFromEntitlement(active, entitlementExpiryDate(info));
      Alert.alert(
        t('premium.restore'),
        active ? 'Ton abonnement Premium a été restauré !' : 'Aucun achat actif trouvé pour ce compte.'
      );
    } catch {
      Alert.alert(t('premium.restore'), 'Impossible de restaurer les achats pour le moment.');
    }
  }

  if (isPremium()) {
    const daysLeft = planExpiresAt
      ? Math.max(0, Math.ceil((new Date(planExpiresAt).getTime() - Date.now()) / 86400000))
      : 0;
    return (
      <ScreenWrapper>
        <View style={styles.alreadyPremium}>
          <Text style={styles.bigEmoji}>✨</Text>
          <Text style={[styles.title, { color: c.text }]}>{t('premium.title')}</Text>
          <Text style={[styles.alreadyText, { color: c.textMuted }]}>{t('premium.alreadyPremium')}</Text>
          <View style={[styles.expiryBox, { backgroundColor: c.primary + '15', borderColor: c.primary }]}>
            <Text style={[styles.expiryPlan, { color: c.primary }]}>
              {plan === 'yearly' ? t('premium.yearly') : t('premium.monthly')}
            </Text>
            <Text style={[styles.expiryDays, { color: c.text }]}>
              {daysLeft} jour{daysLeft > 1 ? 's' : ''} restant{daysLeft > 1 ? 's' : ''}
            </Text>
          </View>
          <Button label={t('common.back')} onPress={() => router.back()} variant="ghost" />
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Text style={[styles.closeText, { color: c.textMuted }]}>✕</Text>
        </TouchableOpacity>

        <Text style={styles.bigEmoji}>👨‍🍳</Text>
        <Text style={[styles.title, { color: c.text }]}>{t('premium.title')}</Text>
        <Text style={[styles.subtitle, { color: c.textMuted }]}>{t('premium.subtitle')}</Text>

        <View style={styles.features}>
          {FEATURES.map((f) => (
            <View key={f} style={styles.featureRow}>
              <Text style={[styles.featureText, { color: c.text }]}>{t(`premium.${f}`)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.plans}>
          {(['monthly', 'yearly'] as PlanOption[]).map((plan) => (
            <TouchableOpacity
              key={plan}
              style={[
                styles.planCard,
                { borderColor: c.border },
                selected === plan && { borderColor: c.primary, backgroundColor: c.primary + '08' },
              ]}
              onPress={() => setSelected(plan)}
            >
              {plan === 'yearly' && (
                <View style={[styles.popularBadge, { backgroundColor: c.secondary }]}>
                  <Text style={[styles.popularText, { color: '#fff' }]}>⭐ Populaire</Text>
                </View>
              )}
              <Text style={[styles.planLabel, { color: selected === plan ? c.primary : c.textMuted }]}>
                {t(`premium.${plan}`)}
              </Text>
              <Text style={[styles.planPrice, { color: selected === plan ? c.text : c.textMuted, fontWeight: selected === plan ? '700' : '400' }]}>
                {priceFor(plan)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          label={t('premium.subscribe')}
          onPress={handleSubscribe}
          loading={loading}
          style={styles.subscribeBtn}
        />
        <TouchableOpacity onPress={handleRestore}>
          <Text style={[styles.restore, { color: c.textMuted }]}>{t('premium.restore')}</Text>
        </TouchableOpacity>
        <Text style={[styles.legal, { color: c.textMuted }]}>
          Renouvellement automatique. Annulable à tout moment.
        </Text>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: { alignItems: 'center', padding: Layout.spacing.lg, gap: Layout.spacing.md, paddingTop: Layout.spacing.xl },
  closeBtn: { alignSelf: 'flex-end', padding: Layout.spacing.sm },
  closeText: { fontSize: 20 },
  bigEmoji: { fontSize: 64 },
  title: { fontSize: Layout.fontSize.xxl, fontWeight: '900', textAlign: 'center' },
  subtitle: { fontSize: Layout.fontSize.md, textAlign: 'center' },
  features: { width: '100%', gap: Layout.spacing.sm, marginVertical: Layout.spacing.md },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.md },
  featureText: { fontSize: Layout.fontSize.md, fontWeight: '600' },
  plans: { flexDirection: 'row', gap: Layout.spacing.md, width: '100%' },
  planCard: {
    flex: 1,
    borderWidth: 2,
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    alignItems: 'center',
    gap: 4,
    position: 'relative',
  },
  planLabel: { fontSize: Layout.fontSize.sm, fontWeight: '700' },
  planPrice: { fontSize: Layout.fontSize.sm, textAlign: 'center' },
  popularBadge: { position: 'absolute', top: -12, paddingHorizontal: 8, paddingVertical: 2, borderRadius: Layout.radius.full },
  popularText: { fontSize: 10, fontWeight: '700' },
  subscribeBtn: { width: '100%', marginTop: Layout.spacing.md },
  restore: { fontSize: Layout.fontSize.sm, textDecorationLine: 'underline' },
  legal: { fontSize: 11, textAlign: 'center', marginTop: Layout.spacing.sm },
  alreadyPremium: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Layout.spacing.lg, padding: Layout.spacing.xl },
  alreadyText: { fontSize: Layout.fontSize.md, textAlign: 'center' },
  expiryBox: { borderWidth: 1, borderRadius: Layout.radius.lg, paddingVertical: Layout.spacing.md, paddingHorizontal: Layout.spacing.xl, alignItems: 'center', gap: 2 },
  expiryPlan: { fontSize: Layout.fontSize.sm, fontWeight: '700' },
  expiryDays: { fontSize: Layout.fontSize.lg, fontWeight: '900' },
});
