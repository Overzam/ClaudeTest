import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fr from './locales/fr';
import en from './locales/en';
import es from './locales/es';

export type SupportedLanguage = 'fr' | 'en' | 'es';

export const LANGUAGES: { code: SupportedLanguage; label: string; flag: string }[] = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

const LANGUAGE_KEY = 'recipequest-lang';

export async function getSavedLanguage(): Promise<SupportedLanguage> {
  const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
  return (saved as SupportedLanguage) ?? 'fr';
}

export async function saveLanguage(lang: SupportedLanguage) {
  await AsyncStorage.setItem(LANGUAGE_KEY, lang);
  await i18n.changeLanguage(lang);
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources: { fr: { translation: fr }, en: { translation: en }, es: { translation: es } },
  lng: 'fr',
  fallbackLng: 'fr',
  interpolation: { escapeValue: false },
});

export default i18n;
