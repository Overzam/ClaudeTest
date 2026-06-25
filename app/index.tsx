import { Redirect } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

export default function Index() {
  const { session, isLoading } = useAuthStore();

  if (isLoading) return <LoadingScreen />;
  if (session) return <Redirect href="/(tabs)" />;
  return <Redirect href="/(auth)/login" />;
}
