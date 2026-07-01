import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { Button } from '@/components/ui/Button';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import { signUp } from '@/services/authService';
import { requestNotificationPermissions, scheduleStreakReminder } from '@/services/notificationService';
import { useAuthStore, GUEST_USER_ID } from '@/stores/authStore';
import { useProgressStore } from '@/stores/progressStore';
import { friendlyAuthError } from '@/utils/errorMessages';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { theme } = useThemeStore();
  const c = theme.colors;
  const { loginAsGuest } = useAuthStore();
  const { loadProgress } = useProgressStore();

  async function handleSignup() {
    if (!email.trim() || !username.trim() || password.length < 8) {
      Alert.alert('Champs invalides', 'Email, pseudo requis. Mot de passe : min. 8 caractères.');
      return;
    }
    setLoading(true);
    try {
      await signUp(email.trim(), password, username.trim());
      const granted = await requestNotificationPermissions();
      if (granted) await scheduleStreakReminder();
      router.replace('/(tabs)');
    } catch (e: unknown) {
      Alert.alert('Erreur', friendlyAuthError(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.logo}>🍽️</Text>
          <Text style={[styles.title, { color: c.text }]}>Crée ton compte</Text>
          <Text style={[styles.subtitle, { color: c.textMuted }]}>Rejoins des milliers de cuistots en herbe !</Text>

          <View style={styles.form}>
            <TextInput
              style={[styles.input, { borderColor: c.border, color: c.text, backgroundColor: c.surfaceElevated }]}
              placeholder="Pseudo"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholderTextColor={c.textMuted}
            />
            <TextInput
              style={[styles.input, { borderColor: c.border, color: c.text, backgroundColor: c.surfaceElevated }]}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor={c.textMuted}
            />
            <TextInput
              style={[styles.input, { borderColor: c.border, color: c.text, backgroundColor: c.surfaceElevated }]}
              placeholder="Mot de passe (min. 8 caractères)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={c.textMuted}
            />
            <Button label="Créer mon compte" onPress={handleSignup} loading={loading} />
          </View>

          <Button
            label="Déjà un compte ? Se connecter"
            onPress={() => router.back()}
            variant="ghost"
            style={styles.loginBtn}
          />
          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: c.border }]} />
            <Text style={[styles.dividerText, { color: c.textMuted }]}>ou</Text>
            <View style={[styles.dividerLine, { backgroundColor: c.border }]} />
          </View>
          <Button
            label="Continuer sans compte"
            onPress={async () => {
              await loginAsGuest();
              await loadProgress(GUEST_USER_ID);
              router.replace('/(tabs)');
            }}
            variant="secondary"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.xl,
    gap: Layout.spacing.md,
  },
  logo: { fontSize: 64 },
  title: { fontSize: Layout.fontSize.xxl, fontWeight: '900' },
  subtitle: { fontSize: Layout.fontSize.md, textAlign: 'center', marginBottom: Layout.spacing.lg },
  form: { width: '100%', gap: Layout.spacing.md },
  input: {
    borderWidth: 2,
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.md,
    fontSize: Layout.fontSize.md,
  },
  loginBtn: { marginTop: Layout.spacing.sm },
  divider: { flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.sm, marginVertical: Layout.spacing.sm },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { fontSize: Layout.fontSize.sm },
});
