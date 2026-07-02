import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeStore } from '@/stores/themeStore';
import { useGameStore } from '@/stores/gameStore';
import { HEARTS_REGEN_HOURS } from '@/constants/Config';
import { Layout } from '@/constants/Layout';

interface Props {
  visible: boolean;
  onClose: () => void;
  onRefill?: () => void;
  onShop?: () => void;
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return '0:00';
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}h ${String(m).padStart(2, '0')}m`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function NoHeartsModal({ visible, onClose, onRefill, onShop }: Props) {
  const { theme } = useThemeStore();
  const c = theme.colors;
  const { heartsLastRefill } = useGameStore();
  const [msLeft, setMsLeft] = useState(0);

  useEffect(() => {
    if (!visible || !heartsLastRefill) return;
    const regenMs = HEARTS_REGEN_HOURS * 3600 * 1000;
    const tick = () => {
      const elapsed = Date.now() - new Date(heartsLastRefill).getTime();
      setMsLeft(Math.max(0, regenMs - elapsed));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [visible, heartsLastRefill]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.card, { backgroundColor: c.surface, borderColor: c.border }]}>
          <Text style={styles.heart}>💔</Text>
          <Text style={[styles.title, { color: c.text }]}>Plus de vies !</Text>
          <Text style={[styles.subtitle, { color: c.textMuted }]}>
            Tes vies se rechargent automatiquement.{'\n'}Prochaine vie dans :
          </Text>
          <View style={[styles.countdownBox, { backgroundColor: c.danger + '15', borderColor: c.danger + '40' }]}>
            <Text style={[styles.countdown, { color: c.danger }]}>{formatCountdown(msLeft)}</Text>
          </View>
          <Text style={[styles.tip, { color: c.textMuted }]}>
            💡 Les abonnés Premium ont des vies illimitées.
          </Text>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: c.primary }]}
            onPress={onClose}
            activeOpacity={0.85}
          >
            <Text style={styles.btnText}>Revenir plus tard</Text>
          </TouchableOpacity>
          {onShop && (
            <TouchableOpacity
              style={[styles.btnSecondary, { borderColor: c.secondary }]}
              onPress={onShop}
              activeOpacity={0.85}
            >
              <Text style={[styles.btnSecondaryText, { color: c.secondary }]}>🪙 Acheter des cœurs</Text>
            </TouchableOpacity>
          )}
          {onRefill && (
            <TouchableOpacity
              style={[styles.btnSecondary, { borderColor: c.primary }]}
              onPress={onRefill}
              activeOpacity={0.85}
            >
              <Text style={[styles.btnSecondaryText, { color: c.primary }]}>Débloquer Premium</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: {
    width: '100%',
    borderRadius: Layout.radius.xl,
    borderWidth: 1,
    padding: Layout.spacing.xl,
    alignItems: 'center',
    gap: Layout.spacing.md,
  },
  heart: { fontSize: 56 },
  title: { fontSize: 24, fontWeight: '900', textAlign: 'center' },
  subtitle: { fontSize: 15, textAlign: 'center', lineHeight: 22 },
  countdownBox: {
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.xl,
  },
  countdown: { fontSize: 32, fontWeight: '900', letterSpacing: 2 },
  tip: { fontSize: 13, textAlign: 'center', fontStyle: 'italic' },
  btn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: Layout.radius.lg,
    alignItems: 'center',
    marginTop: Layout.spacing.sm,
  },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  btnSecondary: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: Layout.radius.lg,
    alignItems: 'center',
    borderWidth: 2,
  },
  btnSecondaryText: { fontWeight: '700', fontSize: 15 },
});
