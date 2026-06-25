import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { usePremiumStore, SHOP_ITEMS } from '@/stores/premiumStore';
import { useGameStore } from '@/stores/gameStore';
import { MAX_HEARTS } from '@/constants/Config';
import { useTranslation } from 'react-i18next';

export default function ShopScreen() {
  const { t } = useTranslation();
  const { coins, spendCoins, isPremium, activateXPBoost, addCoins } = usePremiumStore();
  const { hearts, loseHeart } = useGameStore();
  const premium = isPremium();

  function handleBuy(itemId: string) {
    const item = SHOP_ITEMS.find((i) => i.id === itemId);
    if (!item) return;

    if (!spendCoins(item.coinCost)) {
      Alert.alert('Pas assez de pièces', `Il te faut ${item.coinCost} pièces.`);
      return;
    }

    if (item.type === 'hearts') {
      // Add hearts via gameStore — cap at MAX_HEARTS
      const toAdd = Math.min(item.amount, MAX_HEARTS - hearts);
      // We don't have addHearts directly, so we simulate via the store
      useGameStore.setState((s) => ({ hearts: Math.min(MAX_HEARTS, s.hearts + toAdd) }));
      Alert.alert('❤️ Cœurs ajoutés !', `+${toAdd} cœurs récupérés.`);
    } else if (item.type === 'xp_boost') {
      activateXPBoost(item.amount);
      Alert.alert(`⚡ Boost ×${item.amount} activé !`, 'Valable 1 heure.');
    }
  }

  function handleWatchAd() {
    // In production: integrate AdMob or Expo Ads here
    addCoins(25);
    Alert.alert('🎉 +25 pièces !', 'Merci d\'avoir regardé la pub.');
  }

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>{t('common.back')}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{t('shop.title')}</Text>
        <View style={styles.coinsBox}>
          <Text style={styles.coinsText}>🪙 {coins}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Premium banner */}
        {!premium && (
          <TouchableOpacity style={styles.premiumBanner} onPress={() => router.push('/premium')}>
            <Text style={styles.premiumEmoji}>✨</Text>
            <View style={styles.premiumInfo}>
              <Text style={styles.premiumTitle}>{t('shop.premiumBanner')}</Text>
              <Text style={styles.premiumDesc}>{t('shop.premiumDesc')}</Text>
            </View>
            <Text style={styles.premiumArrow}>›</Text>
          </TouchableOpacity>
        )}

        {/* Free coins */}
        <Card style={styles.freeCoinsCard}>
          <Text style={styles.freeCoinsText}>{t('shop.freeCoins')}</Text>
          <TouchableOpacity style={styles.watchBtn} onPress={handleWatchAd}>
            <Text style={styles.watchBtnText}>{t('shop.watch')} 🎥</Text>
          </TouchableOpacity>
        </Card>

        <Text style={styles.sectionTitle}>{t('shop.hearts')}</Text>
        <View style={styles.grid}>
          {SHOP_ITEMS.filter((i) => i.type === 'hearts').map((item) => (
            <ShopCard key={item.id} item={item} coins={coins} onBuy={() => handleBuy(item.id)} t={t} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>{t('shop.xpBoost')}</Text>
        <View style={styles.grid}>
          {SHOP_ITEMS.filter((i) => i.type === 'xp_boost').map((item) => (
            <ShopCard key={item.id} item={item} coins={coins} onBuy={() => handleBuy(item.id)} t={t} />
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

function ShopCard({
  item,
  coins,
  onBuy,
  t,
}: {
  item: typeof SHOP_ITEMS[0];
  coins: number;
  onBuy: () => void;
  t: (k: string, o?: object) => string;
}) {
  const canAfford = coins >= item.coinCost;
  return (
    <Card style={styles.shopCard}>
      <Text style={styles.shopEmoji}>{item.emoji}</Text>
      <Text style={styles.shopLabel}>{item.label}</Text>
      <Text style={styles.shopCost}>🪙 {item.coinCost}</Text>
      <TouchableOpacity
        style={[styles.buyBtn, !canAfford && styles.buyBtnDisabled]}
        onPress={onBuy}
        disabled={!canAfford}
      >
        <Text style={styles.buyBtnText}>{t('shop.buy')}</Text>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Layout.spacing.lg },
  back: { color: Colors.primary, fontWeight: '600', fontSize: Layout.fontSize.md },
  title: { fontSize: Layout.fontSize.xl, fontWeight: '900', color: Colors.text },
  coinsBox: { backgroundColor: Colors.secondary + '25', paddingHorizontal: Layout.spacing.md, paddingVertical: 6, borderRadius: Layout.radius.full },
  coinsText: { fontWeight: '700', color: Colors.text, fontSize: Layout.fontSize.sm },
  content: { padding: Layout.spacing.lg, gap: Layout.spacing.lg },
  premiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary + '20',
    borderWidth: 2,
    borderColor: Colors.secondary,
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    gap: Layout.spacing.md,
  },
  premiumEmoji: { fontSize: 32 },
  premiumInfo: { flex: 1 },
  premiumTitle: { fontSize: Layout.fontSize.md, fontWeight: '800', color: Colors.text },
  premiumDesc: { fontSize: Layout.fontSize.xs, color: Colors.textMuted },
  premiumArrow: { fontSize: 24, color: Colors.textMuted },
  freeCoinsCard: { flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.md },
  freeCoinsText: { flex: 1, fontSize: Layout.fontSize.sm, color: Colors.text, fontWeight: '600' },
  watchBtn: { backgroundColor: Colors.xpBlue, paddingHorizontal: Layout.spacing.md, paddingVertical: 8, borderRadius: Layout.radius.full },
  watchBtnText: { color: '#fff', fontWeight: '700', fontSize: Layout.fontSize.sm },
  sectionTitle: { fontSize: Layout.fontSize.lg, fontWeight: '800', color: Colors.text },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Layout.spacing.md },
  shopCard: { alignItems: 'center', gap: Layout.spacing.xs, padding: Layout.spacing.md, width: 140 },
  shopEmoji: { fontSize: 32 },
  shopLabel: { fontSize: Layout.fontSize.sm, fontWeight: '700', color: Colors.text, textAlign: 'center' },
  shopCost: { fontSize: Layout.fontSize.sm, color: Colors.textMuted, fontWeight: '600' },
  buyBtn: { backgroundColor: Colors.primary, paddingHorizontal: Layout.spacing.lg, paddingVertical: 6, borderRadius: Layout.radius.full, marginTop: 4 },
  buyBtnDisabled: { backgroundColor: Colors.border },
  buyBtnText: { color: '#fff', fontWeight: '700', fontSize: Layout.fontSize.sm },
});
