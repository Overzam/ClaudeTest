import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { Button } from '@/components/ui/Button';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { signIn } from '@/services/authService';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password) return;
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      router.replace('/(tabs)');
    } catch (e: unknown) {
      Alert.alert('Erreur', e instanceof Error ? e.message : 'Connexion impossible');
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
          <Text style={styles.logo}>🍽️</Text>
          <Text style={styles.title}>RecipeQuest</Text>
          <Text style={styles.subtitle}>Apprends à cuisiner, un plat à la fois.</Text>

          <View style={styles.form}>
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
              placeholder="Mot de passe"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={Colors.textMuted}
            />
            <Button label="Se connecter" onPress={handleLogin} loading={loading} />
          </View>

          <Button
            label="Pas encore de compte ? S'inscrire"
            onPress={() => router.push('/(auth)/signup')}
            variant="ghost"
            style={styles.signupBtn}
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
  logo: { fontSize: 72 },
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
  signupBtn: { marginTop: Layout.spacing.sm },
});
