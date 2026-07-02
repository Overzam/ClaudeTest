import { create } from 'zustand';
import type { Session } from '@supabase/supabase-js';
import type { UserProfile } from '@/types/database.types';
import { supabase, isSupabaseConfigured } from '@/services/supabase';
import { signOut as authSignOut } from '@/services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GUEST_USER_ID = 'guest-local';
const GUEST_KEY = 'auth_guest_mode';

// Minimal fake session object for guest mode — satisfies session?.user.id checks
function makeGuestSession(): Session {
  return {
    access_token: 'guest',
    refresh_token: 'guest',
    expires_in: 999999,
    token_type: 'bearer',
    user: {
      id: GUEST_USER_ID,
      email: 'guest@local',
      role: 'anon',
      aud: 'anon',
      created_at: new Date().toISOString(),
      app_metadata: {},
      user_metadata: { username: 'Cuisinier' },
      identities: [],
      factors: [],
      updated_at: new Date().toISOString(),
    },
  } as unknown as Session;
}

const GUEST_PROFILE: UserProfile = {
  id: GUEST_USER_ID,
  email: 'guest@local',
  username: 'Cuisinier',
  avatar_url: null,
  created_at: new Date().toISOString(),
};

interface AuthState {
  session: Session | null;
  user: UserProfile | null;
  isLoading: boolean;
  isGuest: boolean;
  setSession: (session: Session | null) => void;
  setUser: (user: UserProfile | null) => void;
  signOut: () => Promise<void>;
  loginAsGuest: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isLoading: true,
  isGuest: false,

  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),

  loginAsGuest: async () => {
    await AsyncStorage.setItem(GUEST_KEY, '1');
    set({ session: makeGuestSession(), user: GUEST_PROFILE, isGuest: true, isLoading: false });
  },

  signOut: async () => {
    await AsyncStorage.removeItem(GUEST_KEY);
    if (isSupabaseConfigured) {
      try { await authSignOut(); } catch (_) {}
    }
    set({ session: null, user: null, isGuest: false });
    // Wipe device-persisted gameplay state so the account's XP/hearts/streak
    // don't leak into a later guest session on the same device. Dynamic
    // imports avoid a require cycle (those stores import authStore).
    import('./gameStore').then(({ useGameStore }) => useGameStore.getState().reset());
    import('./progressStore').then(({ useProgressStore }) =>
      useProgressStore.setState({ lessonProgress: {} })
    );
  },

  initialize: async () => {
    set({ isLoading: true });

    // Restore guest session if it was active
    const wasGuest = await AsyncStorage.getItem(GUEST_KEY);
    if (wasGuest) {
      set({ session: makeGuestSession(), user: GUEST_PROFILE, isGuest: true, isLoading: false });
      return;
    }

    if (!isSupabaseConfigured) { set({ isLoading: false }); return; }

    const { data } = await supabase.auth.getSession();
    const session = data.session;
    let user: UserProfile | null = null;

    if (session) {
      const { data: profileData } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();
      user = profileData;
    }

    set({ session, user, isLoading: false });

    supabase.auth.onAuthStateChange(async (_event, newSession) => {
      let newUser: UserProfile | null = null;
      if (newSession) {
        const { data: profileData } = await supabase
          .from('users')
          .select('*')
          .eq('id', newSession.user.id)
          .single();
        newUser = profileData;
      }
      set({ session: newSession, user: newUser });
    });
  },
}));
