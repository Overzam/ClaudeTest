import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { Avatar } from '@/components/ui/Avatar';
import { useThemeStore } from '@/stores/themeStore';
import { useAuthStore } from '@/stores/authStore';
import { Layout } from '@/constants/Layout';
import { pickAndUploadAvatar, updateUsername } from '@/services/profileService';

export default function EditProfileScreen() {
  const { theme } = useThemeStore();
  const { user, setUser, session } = useAuthStore();
  const c = theme.colors;

  const [username, setUsername] = useState(user?.username ?? '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url ?? null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [savingUsername, setSavingUsername] = useState(false);

  const userId = session?.user.id;

  async function handlePickPhoto() {
    if (!userId) return;
    setUploadingPhoto(true);
    try {
      const url = await pickAndUploadAvatar(userId);
      if (url) {
        setAvatarUrl(url);
        setUser({ ...user!, avatar_url: url });
      }
    } catch (e: any) {
      Alert.alert('Erreur', e.message ?? 'Impossible de télécharger la photo');
    } finally {
      setUploadingPhoto(false);
    }
  }

  async function handleSaveUsername() {
    if (!userId || !username.trim()) return;
    if (username.trim() === user?.username) { router.back(); return; }
    setSavingUsername(true);
    try {
      await updateUsername(userId, username.trim());
      setUser({ ...user!, username: username.trim() });
      router.back();
    } catch (e: any) {
      Alert.alert('Erreur', e.message ?? 'Impossible de sauvegarder');
    } finally {
      setSavingUsername(false);
    }
  }

  return (
    <ScreenWrapper>
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={c.primary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: c.text }]}>Modifier le profil</Text>
      </View>

      <View style={styles.content}>
        {/* Avatar section */}
        <View style={styles.avatarSection}>
          <View>
            <Avatar name={user?.username} uri={avatarUrl} size={100} />
            {uploadingPhoto && (
              <View style={styles.uploadOverlay}>
                <ActivityIndicator color="#fff" />
              </View>
            )}
          </View>
          <TouchableOpacity
            style={[styles.photoBtn, { backgroundColor: c.primary }]}
            onPress={handlePickPhoto}
            disabled={uploadingPhoto}
            activeOpacity={0.8}
          >
            <Ionicons name="camera" size={18} color="#fff" />
            <Text style={styles.photoBtnText}>
              {avatarUrl ? 'Changer la photo' : 'Ajouter une photo'}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.photoHint, { color: c.textMuted }]}>
            Visible par tes amis et dans le classement
          </Text>
        </View>

        {/* Username section */}
        <View style={[styles.card, { backgroundColor: c.surfaceElevated, borderColor: c.border }]}>
          <Text style={[styles.label, { color: c.textMuted }]}>Nom d'utilisateur</Text>
          <TextInput
            style={[styles.input, { color: c.text, borderColor: c.border }]}
            value={username}
            onChangeText={setUsername}
            placeholder="Ton pseudo…"
            placeholderTextColor={c.textMuted}
            autoCapitalize="none"
            maxLength={24}
          />
          <Text style={[styles.charCount, { color: c.textMuted }]}>{username.length}/24</Text>
        </View>

        <TouchableOpacity
          style={[styles.saveBtn, { backgroundColor: c.primary, opacity: savingUsername ? 0.7 : 1 }]}
          onPress={handleSaveUsername}
          disabled={savingUsername || !username.trim()}
          activeOpacity={0.85}
        >
          {savingUsername ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <Ionicons name="checkmark" size={20} color="#fff" />
              <Text style={styles.saveBtnText}>Sauvegarder</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
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
  title: { fontSize: Layout.fontSize.xl, fontWeight: '900' },
  content: { padding: Layout.spacing.lg, gap: Layout.spacing.lg },
  avatarSection: { alignItems: 'center', gap: Layout.spacing.md, paddingVertical: Layout.spacing.xl },
  uploadOverlay: {
    position: 'absolute',
    inset: 0,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.sm + 2,
    borderRadius: Layout.radius.full,
  },
  photoBtnText: { color: '#fff', fontWeight: '700', fontSize: Layout.fontSize.sm },
  photoHint: { fontSize: Layout.fontSize.xs, textAlign: 'center' },
  card: {
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.md,
    gap: Layout.spacing.sm,
    borderWidth: 1,
  },
  label: { fontSize: Layout.fontSize.xs, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  input: {
    fontSize: Layout.fontSize.md,
    fontWeight: '600',
    borderBottomWidth: 1.5,
    paddingVertical: Layout.spacing.sm,
  },
  charCount: { fontSize: Layout.fontSize.xs, textAlign: 'right' },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: Layout.spacing.md + 2,
    borderRadius: Layout.radius.full,
  },
  saveBtnText: { color: '#fff', fontWeight: '800', fontSize: Layout.fontSize.md },
});
