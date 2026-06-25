import { create } from 'zustand';
import type { Session } from '@supabase/supabase-js';
import type { UserProfile } from '@/types/database.types';
import { supabase } from '@/services/supabase';
import { signOut as authSignOut } from '@/services/authService';

interface AuthState {
  session: Session | null;
  user: UserProfile | null;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  setUser: (user: UserProfile | null) => void;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  isLoading: true,

  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),

  signOut: async () => {
    await authSignOut();
    set({ session: null, user: null });
  },

  initialize: async () => {
    set({ isLoading: true });
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
