import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from '@/components/ui/Avatar';
import { useThemeStore } from '@/stores/themeStore';
import { Layout } from '@/constants/Layout';
import type { UserProfile } from '@/types/database.types';

interface Props {
  user: UserProfile;
  status?: 'friend' | 'pending_sent' | 'pending_received' | 'none';
  onAdd?: () => void;
  onAccept?: () => void;
  onDecline?: () => void;
  onRemove?: () => void;
}

export function FriendRow({ user, status = 'none', onAdd, onAccept, onDecline, onRemove }: Props) {
  const { theme } = useThemeStore();
  const c = theme.colors;
  return (
    <View style={styles.row}>
      <Avatar name={user.username} uri={user.avatar_url} size={40} />
      <Text style={[styles.username, { color: c.text }]}>{user.username}</Text>
      <View style={styles.actions}>
        {status === 'none' && (
          <TouchableOpacity style={[styles.btnPrimary, { backgroundColor: c.primary }]} onPress={onAdd}>
            <Text style={styles.btnPrimaryText}>+ Ajouter</Text>
          </TouchableOpacity>
        )}
        {status === 'pending_sent' && (
          <Text style={[styles.pending, { color: c.textMuted }]}>En attente…</Text>
        )}
        {status === 'pending_received' && (
          <>
            <TouchableOpacity style={[styles.btnPrimary, { backgroundColor: c.primary }]} onPress={onAccept}>
              <Text style={styles.btnPrimaryText}>Accepter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnGhost, { borderColor: c.border }]} onPress={onDecline}>
              <Text style={[styles.btnGhostText, { color: c.textMuted }]}>Refuser</Text>
            </TouchableOpacity>
          </>
        )}
        {status === 'friend' && (
          <TouchableOpacity style={[styles.btnGhost, { borderColor: c.border }]} onPress={onRemove}>
            <Text style={[styles.btnGhostText, { color: c.textMuted }]}>Retirer</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: Layout.spacing.md, paddingVertical: Layout.spacing.sm },
  username: { flex: 1, fontSize: Layout.fontSize.md, fontWeight: '600' },
  actions: { flexDirection: 'row', gap: Layout.spacing.sm },
  btnPrimary: { paddingHorizontal: Layout.spacing.md, paddingVertical: 6, borderRadius: Layout.radius.full },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: Layout.fontSize.xs },
  btnGhost: { borderWidth: 1.5, paddingHorizontal: Layout.spacing.md, paddingVertical: 6, borderRadius: Layout.radius.full },
  btnGhostText: { fontWeight: '600', fontSize: Layout.fontSize.xs },
  pending: { fontSize: Layout.fontSize.xs, fontStyle: 'italic' },
});
