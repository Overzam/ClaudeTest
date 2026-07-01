// Maps common Supabase Auth / network error strings to friendly French text.
// Falls back to a generic message rather than showing raw technical errors.
export function friendlyAuthError(e: unknown): string {
  const raw = e instanceof Error ? e.message : String(e ?? '');
  const msg = raw.toLowerCase();

  if (msg.includes('email not confirmed') || msg.includes('confirm')) {
    return "Tu dois confirmer ton adresse email avant de te connecter. Vérifie ta boîte mail (et les spams).";
  }
  if (msg.includes('invalid login credentials') || msg.includes('invalid_credentials')) {
    return 'Email ou mot de passe incorrect.';
  }
  if (msg.includes('already registered') || msg.includes('already been registered') || msg.includes('user already exists')) {
    return 'Un compte existe déjà avec cet email. Essaie de te connecter à la place.';
  }
  if (msg.includes('password') && msg.includes('short')) {
    return 'Le mot de passe doit contenir au moins 8 caractères.';
  }
  if (msg.includes('rate limit') || msg.includes('too many requests')) {
    return 'Trop de tentatives. Réessaie dans quelques minutes.';
  }
  if (msg.includes('network') || msg.includes('fetch') || msg.includes('timeout')) {
    return 'Problème de connexion. Vérifie ton accès internet et réessaie.';
  }
  return 'Une erreur est survenue. Réessaie dans un instant.';
}
