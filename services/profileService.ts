import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { supabase } from './supabase';
import type { UserProfile, UserStats, UserBadge } from '@/types/database.types';

export async function pickAndUploadAvatar(userId: string): Promise<string | null> {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) return null;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: 'images',
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });

  if (result.canceled || !result.assets[0]) return null;

  const asset = result.assets[0];
  // Always store as jpeg for consistency
  const path = `${userId}/avatar.jpg`;

  // Read as base64 — reliable on both iOS and Android with file:// URIs
  const base64 = await FileSystem.readAsStringAsync(asset.uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const arrayBuffer = decode(base64);

  const { error } = await supabase.storage
    .from('avatars')
    .upload(path, arrayBuffer, { contentType: 'image/jpeg', upsert: true });

  if (error) throw error;

  const { data } = supabase.storage.from('avatars').getPublicUrl(path);
  // Cache-bust so the Image component reloads the new photo
  const publicUrl = data.publicUrl + `?t=${Date.now()}`;

  await supabase.from('users').update({ avatar_url: publicUrl }).eq('id', userId);

  return publicUrl;
}

export async function updateUsername(userId: string, username: string): Promise<void> {
  const { error } = await supabase.from('users').update({ username }).eq('id', userId);
  if (error) throw error;
}

export interface PublicProfile {
  user: UserProfile;
  stats: UserStats | null;
  badges: UserBadge[];
  recentLessons: { lesson_id: string; completed_at: string }[];
}

export async function fetchPublicProfile(userId: string): Promise<PublicProfile | null> {
  const [{ data: user }, { data: stats }, { data: badges }, { data: progress }] = await Promise.all([
    supabase.from('users').select('*').eq('id', userId).single(),
    supabase.from('user_stats').select('*').eq('user_id', userId).single(),
    supabase
      .from('user_badges')
      .select('*, badge:badges(*)')
      .eq('user_id', userId)
      .order('earned_at', { ascending: false }),
    supabase
      .from('user_progress')
      .select('lesson_id, completed_at')
      .eq('user_id', userId)
      .eq('status', 'completed')
      .order('completed_at', { ascending: false })
      .limit(5),
  ]);

  if (!user) return null;

  return {
    user,
    stats: stats ?? null,
    badges: badges ?? [],
    recentLessons: progress ?? [],
  };
}
