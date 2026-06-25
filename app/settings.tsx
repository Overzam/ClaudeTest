import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useSettingsStore } from '@/stores/settingsStore';
import { LANGUAGES, type SupportedLanguage } from '@/i18n';
import { useTranslation } from 'react-i18next';
import Constants from 'expo-constants';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { language, streakNotifEnabled, setLanguage, toggleStreakNotif } = useSettingsStore();

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>{t('common.back')}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{t('settings.title')}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Language */}
        <Text style={styles.sectionTitle}>{t('settings.language')}</Text>
        <Card style={styles.langCard}>
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[styles.langRow, language === lang.code && styles.langRowSelected]}
              onPress={() => setLanguage(lang.code as SupportedLanguage)}
            >
              <Text style={styles.langFlag}>{lang.flag}</Text>
              <Text style={[styles.langLabel, language === lang.code && styles.langLabelSelected]}>
                {lang.label}
              </Text>
              {language === lang.code && <Text style={styles.check}>✓</Text>}
            </TouchableOpacity>
          ))}
        </Card>

        {/* Notifications */}
        <Text style={styles.sectionTitle}>{t('settings.notifications')}</Text>
        <Card>
          <View style={styles.notifRow}>
            <View style={styles.notifInfo}>
              <Text style={styles.notifLabel}>{t('settings.notifStreak')}</Text>
              <Text style={styles.notifDesc}>Rappel quotidien à 19h</Text>
            </View>
            <Switch
              value={streakNotifEnabled}
              onValueChange={toggleStreakNotif}
              trackColor={{ true: Colors.primary }}
              thumbColor="#fff"
            />
          </View>
        </Card>

        {/* Version */}
        <Text style={styles.version}>
          {t('settings.version', { v: Constants.expoConfig?.version ?? '1.0.0' })}
        </Text>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.md, padding: Layout.spacing.lg },
  back: { color: Colors.primary, fontWeight: '600', fontSize: Layout.fontSize.md },
  title: { fontSize: Layout.fontSize.xl, fontWeight: '900', color: Colors.text },
  content: { padding: Layout.spacing.lg, gap: Layout.spacing.md },
  sectionTitle: { fontSize: Layout.fontSize.md, fontWeight: '800', color: Colors.text },
  langCard: { gap: 0, padding: 0, overflow: 'hidden' },
  langRow: { flexDirection: 'row', alignItems: 'center', padding: Layout.spacing.md, gap: Layout.spacing.md },
  langRowSelected: { backgroundColor: Colors.primary + '10' },
  langFlag: { fontSize: 22 },
  langLabel: { flex: 1, fontSize: Layout.fontSize.md, color: Colors.text, fontWeight: '600' },
  langLabelSelected: { color: Colors.primary },
  check: { fontSize: 18, color: Colors.primary, fontWeight: '800' },
  notifRow: { flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.md },
  notifInfo: { flex: 1 },
  notifLabel: { fontSize: Layout.fontSize.md, fontWeight: '600', color: Colors.text },
  notifDesc: { fontSize: Layout.fontSize.xs, color: Colors.textMuted },
  version: { fontSize: Layout.fontSize.xs, color: Colors.textMuted, textAlign: 'center', marginTop: Layout.spacing.xl },
});
