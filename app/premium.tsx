import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { usePremiumStore } from '@/stores/premiumStore';
import { useTranslation } from 'react-i18next';

type PlanOption = 'monthly' | 'yearly';

const PRICES = {
  monthly: { label: '3,99 € / mois', duration: 30 },
  yearly: { label: '28,99 € / an', duration: 365 },
};

const FEATURES = ['feature1', 'feature2', 'feature3', 'feature4'] as const;

export default function PremiumScreen() {
  const { t } = useTranslation();
  const { isPremium, setPlan } = usePremiumStore();
  const [selected, setSelected] = useState<PlanOption>('yearly');
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    // In production: integrate RevenueCat or Expo In-App Purchases here
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const expiresAt = new Date(
      Date.now() + PRICES[selected].duration * 86400000
    ).toISOString();
    setPlan(selected, expiresAt);
    setLoading(false);
    Alert.alert('✨ Bienvenue Premium !', 'Profite de tous tes avantages.', [
      { text: 'Super !', onPress: () => router.back() },
    ]);
  }

  if (isPremium()) {
    return (
      <ScreenWrapper>
        <View style={styles.alreadyPremium}>
          <Text style={styles.bigEmoji}>✨</Text>
          <Text style={styles.title}>{t('premium.title')}</Text>
          <Text style={styles.alreadyText}>{t('premium.alreadyPremium')}</Text>
          <Button label={t('common.back')} onPress={() => router.back()} variant="ghost" />
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        <Text style={styles.bigEmoji}>👨‍🍳</Text>
        <Text style={styles.title}>{t('premium.title')}</Text>
        <Text style={styles.subtitle}>{t('premium.subtitle')}</Text>

        <View style={styles.features}>
          {FEATURES.map((f) => (
            <View key={f} style={styles.featureRow}>
              <Text style={styles.featureText}>{t(`premium.${f}`)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.plans}>
          {(['monthly', 'yearly'] as PlanOption[]).map((plan) => (
            <TouchableOpacity
              key={plan}
              style={[styles.planCard, selected === plan && styles.planSelected]}
              onPress={() => setSelected(plan)}
            >
              {plan === 'yearly' && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>⭐ Populaire</Text>
                </View>
              )}
              <Text style={[styles.planLabel, selected === plan && styles.planLabelSelected]}>
                {t(`premium.${plan}`)}
              </Text>
              <Text style={[styles.planPrice, selected === plan && styles.planPriceSelected]}>
                {PRICES[plan].label}
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
        <TouchableOpacity onPress={() => Alert.alert(t('premium.restore'), 'Aucun achat trouvé.')}>
          <Text style={styles.restore}>{t('premium.restore')}</Text>
        </TouchableOpacity>
        <Text style={styles.legal}>
          Renouvellement automatique. Annulable à tout moment.
        </Text>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: { alignItems: 'center', padding: Layout.spacing.lg, gap: Layout.spacing.md, paddingTop: Layout.spacing.xl },
  closeBtn: { alignSelf: 'flex-end', padding: Layout.spacing.sm },
  closeText: { fontSize: 20, color: Colors.textMuted },
  bigEmoji: { fontSize: 64 },
  title: { fontSize: Layout.fontSize.xxl, fontWeight: '900', color: Colors.text, textAlign: 'center' },
  subtitle: { fontSize: Layout.fontSize.md, color: Colors.textMuted, textAlign: 'center' },
  features: { width: '100%', gap: Layout.spacing.sm, marginVertical: Layout.spacing.md },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.md },
  featureText: { fontSize: Layout.fontSize.md, color: Colors.text, fontWeight: '600' },
  plans: { flexDirection: 'row', gap: Layout.spacing.md, width: '100%' },
  planCard: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    alignItems: 'center',
    gap: 4,
    position: 'relative',
  },
  planSelected: { borderColor: Colors.primary, backgroundColor: Colors.primary + '08' },
  planLabel: { fontSize: Layout.fontSize.sm, fontWeight: '700', color: Colors.textMuted },
  planLabelSelected: { color: Colors.primary },
  planPrice: { fontSize: Layout.fontSize.sm, color: Colors.textMuted, textAlign: 'center' },
  planPriceSelected: { color: Colors.text, fontWeight: '700' },
  popularBadge: { position: 'absolute', top: -12, backgroundColor: Colors.secondary, paddingHorizontal: 8, paddingVertical: 2, borderRadius: Layout.radius.full },
  popularText: { fontSize: 10, fontWeight: '700', color: Colors.text },
  subscribeBtn: { width: '100%', marginTop: Layout.spacing.md },
  restore: { fontSize: Layout.fontSize.sm, color: Colors.textMuted, textDecorationLine: 'underline' },
  legal: { fontSize: 11, color: Colors.textMuted, textAlign: 'center', marginTop: Layout.spacing.sm },
  alreadyPremium: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Layout.spacing.lg, padding: Layout.spacing.xl },
  alreadyText: { fontSize: Layout.fontSize.md, color: Colors.textMuted, textAlign: 'center' },
});
