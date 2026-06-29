import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { Card } from '@/components/ui/Card';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import { usePremiumStore, SHOP_ITEMS } from '@/stores/premiumStore';
import { useGameStore } from '@/stores/gameStore';
import { MAX_HEARTS } from '@/constants/Config';
import { useTranslation } from 'react-i18next';

export default function ShopScreen() {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const c = theme.colors;
  const { coins, spendCoins, isPremium, activateXPBoost, addCoins } = usePremiumStore();
  const { hearts } = useGameStore();
  const premium = isPremium();

  function handleBuy(itemId: string) {
    const item = SHOP_ITEMS.find((i) => i.id === itemId);
    if (!item) return;
    if (!spendCoins(item.coinCost)) {
      Alert.alert('Pas assez de pièces', `Il te faut ${item.coinCost} pièces.`);
      return;
    }
    if (item.type === 'hearts') {
      const toAdd = Math.min(item.amount, MAX_HEARTS - hearts);
      useGameStore.setState((s) => ({ hearts: Math.min(MAX_HEARTS, s.hearts + toAdd) }));
      Alert.alert('❤️ Cœurs ajoutés !', `+${toAdd} cœurs récupérés.`);
    } else if (item.type === 'xp_boost') {
      activateXPBoost(item.amount);
      Alert.alert(`⚡ Boost ×${item.amount} activé !`, 'Valable 1 heure.');
    }
  }

  function handleWatchAd() {
    addCoins(25);
    Alert.alert('🎉 +25 pièces !', 'Merci d\'avoir regardé la pub.');
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
          <TouchableOpacity style={[styles.watchBtn, { backgroundColor: c.xpBlue }]} onPress={handleWatchAd}>
            <Text style={styles.watchBtnText}>{t('shop.watch')} 🎥</Text>
          </TouchableOpacity>
        </Card>

        <Text style={[styles.sectionTitle, { color: c.text }]}>{t('shop.hearts')}</Text>
        <View style={styles.grid}>
          {SHOP_ITEMS.filter((i) => i.type === 'hearts').map((item) => (
            <ShopCard key={item.id} item={item} coins={coins} onBuy={() => handleBuy(item.id)} t={t} c={c} />
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: c.text }]}>{t('shop.xpBoost')}</Text>
        <View style={styles.grid}>
          {SHOP_ITEMS.filter((i) => i.type === 'xp_boost').map((item) => (
            <ShopCard key={item.id} item={item} coins={coins} onBuy={() => handleBuy(item.id)} t={t} c={c} />
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

function ShopCard({
  item, coins, onBuy, t, c,
}: {
  item: typeof SHOP_ITEMS[0];
  coins: number;
  onBuy: () => void;
  t: (k: string, o?: object) => string;
  c: ReturnType<typeof useThemeStore>['theme']['colors'];
}) {
  const canAfford = coins >= item.coinCost;
  return (
    <Card style={styles.shopCard}>
      <Text style={styles.shopEmoji}>{item.emoji}</Text>
      <Text style={[styles.shopLabel, { color: c.text }]}>{item.label}</Text>
      <Text style={[styles.shopCost, { color: c.textMuted }]}>🪙 {item.coinCost}</Text>
      <TouchableOpacity
        style={[styles.buyBtn, { backgroundColor: canAfford ? c.primary : c.border }]}
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
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Layout.spacing.md },
  shopCard: { alignItems: 'center', gap: Layout.spacing.xs, padding: Layout.spacing.md, width: 140 },
  shopEmoji: { fontSize: 32 },
  shopLabel: { fontSize: Layout.fontSize.sm, fontWeight: '700', textAlign: 'center' },
  shopCost: { fontSize: Layout.fontSize.sm, fontWeight: '600' },
  buyBtn: { paddingHorizontal: Layout.spacing.lg, paddingVertical: 6, borderRadius: Layout.radius.full, marginTop: 4 },
  buyBtnText: { color: '#fff', fontWeight: '700', fontSize: Layout.fontSize.sm },
});
