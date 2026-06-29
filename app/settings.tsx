import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { useThemeStore } from '@/stores/themeStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { Layout } from '@/constants/Layout';
import { useTranslation } from 'react-i18next';
import Constants from 'expo-constants';
import { themes, type ThemeName } from '@/constants/themes';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { streakNotifEnabled, toggleStreakNotif } = useSettingsStore();
  const { themeName, setTheme, theme } = useThemeStore();
  const c = theme.colors;

  const themeList: ThemeName[] = ['light', 'dark', 'chef', 'ocean', 'sakura'];

  return (
    <ScreenWrapper>
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.back, { color: c.primary }]}>{t('common.back')}</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: c.text }]}>{t('settings.title')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Theme picker */}
        <Text style={[styles.sectionTitle, { color: c.text }]}>Thème</Text>
        <View style={styles.themeRow}>
          {themeList.map((name) => {
            const t = themes[name];
            const selected = themeName === name;
            return (
              <TouchableOpacity
                key={name}
                style={[
                  styles.themeChip,
                  { backgroundColor: t.colors.primary + '20', borderColor: selected ? t.colors.primary : c.border },
                  selected && { borderWidth: 2 },
                ]}
                onPress={() => setTheme(name)}
                activeOpacity={0.75}
              >
                <Text style={styles.themeEmoji}>{t.emoji}</Text>
                <Text style={[styles.themeLabel, { color: selected ? t.colors.primary : c.textSecondary }]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Notifications */}
        <Text style={[styles.sectionTitle, { color: c.text }]}>{t('settings.notifications')}</Text>
        <View style={[styles.card, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
          <View style={styles.notifRow}>
            <View style={styles.notifInfo}>
              <Text style={[styles.notifLabel, { color: c.text }]}>{t('settings.notifStreak')}</Text>
              <Text style={[styles.notifDesc, { color: c.textMuted }]}>Rappel quotidien à 19h</Text>
            </View>
            <Switch
              value={streakNotifEnabled}
              onValueChange={toggleStreakNotif}
              trackColor={{ true: c.primary }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Version */}
        <Text style={[styles.version, { color: c.textMuted }]}>
          {t('settings.version', { v: Constants.expoConfig?.version ?? '1.0.0' })}
        </Text>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.md,
    padding: Layout.spacing.lg,
    borderBottomWidth: 1,
  },
  back: { fontWeight: '600', fontSize: Layout.fontSize.md },
  title: { fontSize: Layout.fontSize.xl, fontWeight: '900' },
  content: { padding: Layout.spacing.lg, gap: Layout.spacing.md, paddingBottom: 40 },
  sectionTitle: { fontSize: Layout.fontSize.md, fontWeight: '800' },
  themeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Layout.spacing.sm },
  themeChip: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    gap: 4,
    minWidth: 70,
  },
  themeEmoji: { fontSize: 22 },
  themeLabel: { fontSize: Layout.fontSize.xs, fontWeight: '600' },
  card: { borderRadius: Layout.radius.lg, borderWidth: 1, overflow: 'hidden' },
  notifRow: { flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.md, padding: Layout.spacing.md },
  notifInfo: { flex: 1 },
  notifLabel: { fontSize: Layout.fontSize.md, fontWeight: '600' },
  notifDesc: { fontSize: Layout.fontSize.xs },
  version: { fontSize: Layout.fontSize.xs, textAlign: 'center', marginTop: Layout.spacing.xl },
});
