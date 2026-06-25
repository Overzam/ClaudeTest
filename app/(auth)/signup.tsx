import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { signUp } from '@/services/authService';
import { requestNotificationPermissions, scheduleStreakReminder } from '@/services/notificationService';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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
      Alert.alert('Erreur', e instanceof Error ? e.message : 'Inscription impossible');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Crée ton compte</Text>
          <Text style={styles.subtitle}>Rejoins des milliers de cuistots en herbe !</Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Pseudo"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholderTextColor={Colors.textMuted}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor={Colors.textMuted}
            />
            <TextInput
              style={styles.input}
              placeholder="Mot de passe (min. 8 caractères)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={Colors.textMuted}
            />
            <Button label="Créer mon compte" onPress={handleSignup} loading={loading} />
          </View>

          <Button
            label="Déjà un compte ? Se connecter"
            onPress={() => router.back()}
            variant="ghost"
            style={styles.loginBtn}
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
  title: { fontSize: Layout.fontSize.xxl, fontWeight: '900', color: Colors.text },
  subtitle: { fontSize: Layout.fontSize.md, color: Colors.textMuted, textAlign: 'center', marginBottom: Layout.spacing.lg },
  form: { width: '100%', gap: Layout.spacing.md },
  input: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.md,
    fontSize: Layout.fontSize.md,
    color: Colors.text,
    backgroundColor: Colors.surface,
  },
  loginBtn: { marginTop: Layout.spacing.sm },
});
