import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { Card } from '@/components/ui/Card';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import { usePremiumStore, SHOP_ITEMS } from '@/stores/premiumStore';
import { useGameStore } from '@/stores/gameStore';
import { MAX_HEARTS } from '@/constants/Config';
import { useTranslation } from 'react-i18next';
import { showRewardedAd } from '@/services/adsService';

function formatCooldown(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function ShopScreen() {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const c = theme.colors;
  const { coins, spendCoins, isPremium, activateXPBoost, grantAdReward, canWatchAd, adCooldownSecondsLeft, xpBoostMultiplier, xpBoostExpiresAt } = usePremiumStore();
  const { hearts } = useGameStore();
  const premium = isPremium();
  const [now, setNow] = useState(Date.now());
  const [loadingAd, setLoadingAd] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const cooldownLeft = adCooldownSecondsLeft();
  const boostActive = !!xpBoostExpiresAt && new Date(xpBoostExpiresAt).getTime() > now;
  const boostSecondsLeft = boostActive ? Math.ceil((new Date(xpBoostExpiresAt!).getTime() - now) / 1000) : 0;

  function handleBuy(itemId: string) {
    const item = SHOP_ITEMS.find((i) => i.id === itemId);
    if (!item) return;
    if (item.type === 'hearts' && hearts >= MAX_HEARTS) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      Alert.alert('Cœurs déjà au maximum', `Tu as déjà ${MAX_HEARTS} cœurs.`);
      return;
    }
    if (!spendCoins(item.coinCost)) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      Alert.alert('Pas assez de pièces', `Il te faut ${item.coinCost} pièces.`);
      return;
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (item.type === 'hearts') {
      const toAdd = Math.min(item.amount, MAX_HEARTS - hearts);
      useGameStore.setState((s) => ({ hearts: Math.min(MAX_HEARTS, s.hearts + toAdd) }));
      Alert.alert('❤️ Cœurs ajoutés !', `+${toAdd} cœurs récupérés.`);
    } else if (item.type === 'xp_boost') {
      activateXPBoost(item.amount);
      Alert.alert(`⚡ Boost ×${item.amount} activé !`, 'Valable 1 heure.');
    }
  }

  async function handleWatchAd() {
    if (!canWatchAd()) {
      Alert.alert('Pas encore disponible', `Reviens dans ${formatCooldown(cooldownLeft)} pour regarder une nouvelle pub.`);
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLoadingAd(true);
    try {
      const earned = await showRewardedAd();
      if (earned) {
        grantAdReward();
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert('🎉 +25 pièces !', 'Merci d\'avoir regardé la pub.');
      } else {
        Alert.alert('Pub non terminée', 'Regarde la pub jusqu\'au bout pour recevoir tes pièces.');
      }
    } catch {
      Alert.alert('Erreur', 'Impossible de charger une pub pour le moment. Réessaie plus tard.');
    } finally {
      setLoadingAd(false);
    }
  }

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.back, { color: c.primary }]}>{t('common.back')}</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: c.text }]}>{t('shop.title')}</Text>
        <View style={[styles.coinsBox, { backgroundColor: c.secondary + '25' }]}>
          <Text style={[styles.coinsText, { color: c.text }]}>🪙 {coins}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {!premium && (
          <TouchableOpacity
            style={[styles.premiumBanner, { backgroundColor: c.secondary + '20', borderColor: c.secondary }]}
            onPress={() => router.push('/premium')}
          >
            <Text style={styles.premiumEmoji}>✨</Text>
            <View style={styles.premiumInfo}>
              <Text style={[styles.premiumTitle, { color: c.text }]}>{t('shop.premiumBanner')}</Text>
              <Text style={[styles.premiumDesc, { color: c.textMuted }]}>{t('shop.premiumDesc')}</Text>
            </View>
            <Text style={[styles.premiumArrow, { color: c.textMuted }]}>›</Text>
          </TouchableOpacity>
        )}

        <Card style={styles.freeCoinsCard}>
          <Text style={[styles.freeCoinsText, { color: c.text }]}>{t('shop.freeCoins')}</Text>
          <TouchableOpacity
            style={[styles.watchBtn, { backgroundColor: cooldownLeft > 0 || loadingAd ? c.border : c.xpBlue }]}
            onPress={handleWatchAd}
            disabled={cooldownLeft > 0 || loadingAd}
          >
            <Text style={styles.watchBtnText}>
              {loadingAd ? '…' : cooldownLeft > 0 ? formatCooldown(cooldownLeft) : `${t('shop.watch')} 🎥`}
            </Text>
          </TouchableOpacity>
        </Card>

        <Text style={[styles.sectionTitle, { color: c.text }]}>
          {t('shop.hearts')} <Text style={{ color: c.textMuted, fontWeight: '600' }}>({hearts}/{MAX_HEARTS})</Text>
        </Text>
        <View style={styles.grid}>
          {SHOP_ITEMS.filter((i) => i.type === 'hearts').map((item) => (
            <ShopCard
              key={item.id}
              item={item}
              coins={coins}
              onBuy={() => handleBuy(item.id)}
              disabledReason={hearts >= MAX_HEARTS ? t('shop.owned') : undefined}
            />
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: c.text }]}>{t('shop.xpBoost')}</Text>
        {boostActive && (
          <Text style={[styles.boostActiveText, { color: c.primary }]}>
            ⚡ {t('shop.active')} ×{xpBoostMultiplier} — {formatCooldown(boostSecondsLeft)}
          </Text>
        )}
        <View style={styles.grid}>
          {SHOP_ITEMS.filter((i) => i.type === 'xp_boost').map((item) => (
            <ShopCard key={item.id} item={item} coins={coins} onBuy={() => handleBuy(item.id)} />
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

function ShopCard({
  item, coins, onBuy, disabledReason,
}: {
  item: typeof SHOP_ITEMS[0];
  coins: number;
  onBuy: () => void;
  disabledReason?: string;
}) {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const c = theme.colors;
  const canAfford = coins >= item.coinCost;
  const disabled = !canAfford || !!disabledReason;
  return (
    <Card style={styles.shopCard}>
      <Text style={styles.shopEmoji}>{item.emoji}</Text>
      <Text style={[styles.shopLabel, { color: c.text }]}>{item.label}</Text>
      <Text style={[styles.shopCost, { color: c.textMuted }]}>🪙 {item.coinCost}</Text>
      <TouchableOpacity
        style={[styles.buyBtn, { backgroundColor: disabled ? c.border : c.primary }]}
        onPress={onBuy}
        disabled={disabled}
      >
        <Text style={styles.buyBtnText}>{disabledReason ?? t('shop.buy')}</Text>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Layout.spacing.lg },
  back: { fontWeight: '600', fontSize: Layout.fontSize.md },
  title: { fontSize: Layout.fontSize.xl, fontWeight: '900' },
  coinsBox: { paddingHorizontal: Layout.spacing.md, paddingVertical: 6, borderRadius: Layout.radius.full },
  coinsText: { fontWeight: '700', fontSize: Layout.fontSize.sm },
  content: { padding: Layout.spacing.lg, gap: Layout.spacing.lg },
  premiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    gap: Layout.spacing.md,
  },
  premiumEmoji: { fontSize: 32 },
  premiumInfo: { flex: 1 },
  premiumTitle: { fontSize: Layout.fontSize.md, fontWeight: '800' },
  premiumDesc: { fontSize: Layout.fontSize.xs },
  premiumArrow: { fontSize: 24 },
  freeCoinsCard: { flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.md },
  freeCoinsText: { flex: 1, fontSize: Layout.fontSize.sm, fontWeight: '600' },
  watchBtn: { paddingHorizontal: Layout.spacing.md, paddingVertical: 8, borderRadius: Layout.radius.full },
  watchBtnText: { color: '#fff', fontWeight: '700', fontSize: Layout.fontSize.sm },
  sectionTitle: { fontSize: Layout.fontSize.lg, fontWeight: '800' },
  boostActiveText: { fontSize: Layout.fontSize.sm, fontWeight: '700', marginTop: -8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Layout.spacing.md },
  shopCard: { alignItems: 'center', gap: Layout.spacing.xs, padding: Layout.spacing.md, width: 140 },
  shopEmoji: { fontSize: 32 },
  shopLabel: { fontSize: Layout.fontSize.sm, fontWeight: '700', textAlign: 'center' },
  shopCost: { fontSize: Layout.fontSize.sm, fontWeight: '600' },
  buyBtn: { paddingHorizontal: Layout.spacing.lg, paddingVertical: 6, borderRadius: Layout.radius.full, marginTop: 4 },
  buyBtnText: { color: '#fff', fontWeight: '700', fontSize: Layout.fontSize.sm },
});
