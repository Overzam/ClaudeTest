import { supabase } from './supabase';
import type { LeaderboardEntry, UserProfile } from '@/types/database.types';

export async function searchUsers(query: string, currentUserId: string): Promise<UserProfile[]> {
  const { data } = await supabase
    .from('users')
    .select('*')
    .ilike('username', `%${query}%`)
    .neq('id', currentUserId)
    .limit(10);
  return data ?? [];
}

export async function sendFriendRequest(requesterId: string, addresseeId: string) {
  const { error } = await supabase.from('friendships').insert({
    requester_id: requesterId,
    addressee_id: addresseeId,
    status: 'pending',
  });
  if (error) throw error;
}

export async function acceptFriendRequest(friendshipId: string) {
  const { error } = await supabase
    .from('friendships')
    .update({ status: 'accepted' })
    .eq('id', friendshipId);
  if (error) throw error;
}

export async function declineFriendRequest(friendshipId: string) {
  const { error } = await supabase
    .from('friendships')
    .update({ status: 'declined' })
    .eq('id', friendshipId);
  if (error) throw error;
}

export async function removeFriend(friendshipId: string) {
  const { error } = await supabase.from('friendships').delete().eq('id', friendshipId);
  if (error) throw error;
}

export async function fetchPendingRequests(userId: string) {
  const { data } = await supabase
    .from('friendships')
    .select('*, requester:users!requester_id(*)')
    .eq('addressee_id', userId)
    .eq('status', 'pending');
  return data ?? [];
}

export async function fetchFriends(userId: string) {
  const { data } = await supabase
    .from('friendships')
    .select('*, requester:users!requester_id(*), addressee:users!addressee_id(*)')
    .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)
    .eq('status', 'accepted');
  return data ?? [];
}

export async function fetchLeaderboard(userId: string): Promise<LeaderboardEntry[]> {
  // Get friend IDs
  const friends = await fetchFriends(userId);
  const friendIds = friends.map((f) =>
    f.requester_id === userId ? f.addressee_id : f.requester_id
  );
  const allIds = [userId, ...friendIds];

  const { data } = await supabase
    .from('user_stats')
    .select('user_id, xp, level, streak_days, users(username, avatar_url)')
    .in('user_id', allIds)
    .order('xp', { ascending: false });

  if (!data) return [];

  return data.map((row, i) => {
    const user = Array.isArray(row.users) ? row.users[0] : row.users;
    return {
      user_id: row.user_id,
      username: (user as UserProfile)?.username ?? '?',
      avatar_url: (user as UserProfile)?.avatar_url ?? null,
      xp: row.xp,
      level: row.level,
      streak_days: row.streak_days,
      rank: i + 1,
      isMe: row.user_id === userId,
    };
  });
}

export async function getFriendshipStatus(requesterId: string, addresseeId: string) {
  const { data } = await supabase
    .from('friendships')
    .select('*')
    .or(
      `and(requester_id.eq.${requesterId},addressee_id.eq.${addresseeId}),and(requester_id.eq.${addresseeId},addressee_id.eq.${requesterId})`
    )
    .single();
  return data ?? null;
}
