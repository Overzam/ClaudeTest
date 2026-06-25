# 🍳 RecipeQuest

**Apprends la cuisine comme tu apprends une langue — avec Duolingo, mais pour la gastronomie.**

RecipeQuest est une application mobile (iOS & Android) qui transforme l'apprentissage culinaire en jeu : leçons interactives, exercices gamifiés, séries de progression, badges à débloquer et défis quotidiens.

---

## ✨ Fonctionnalités

### 🎓 12 Parcours culinaires
Chaque parcours contient plusieurs leçons débloquables progressivement, avec une carte de progression style Duolingo.

| Parcours | Pays |
|----------|------|
| 🇫🇷 Cuisine Française | France |
| 🇮🇹 Cuisine Italienne | Italie |
| 🇯🇵 Cuisine Japonaise | Japon |
| 🇲🇦 Cuisine Marocaine | Maroc |
| 🇲🇽 Cuisine Mexicaine | Mexique |
| 🇮🇳 Cuisine Indienne | Inde |
| 🇹🇭 Cuisine Thaïlandaise | Thaïlande |
| 🇬🇷 Cuisine Grecque | Grèce |
| 🇨🇳 Cuisine Chinoise | Chine |
| 🎂 Pâtisserie | France / Monde |
| 🔥 Barbecue & Grillades | États-Unis / Monde |
| 🌿 Cuisine Vegan | Monde |

### 🧩 4 Types d'exercices interactifs

| Type | Description |
|------|-------------|
| **QCM** | Choix multiple avec 4 options |
| **Remettre en ordre** | Remettre les étapes d'une recette dans le bon ordre |
| **Association** | Relier chaque terme à sa définition ou sa description |
| **Compléter le texte** | Saisir le mot manquant avec indice optionnel |

### 🏆 Gamification complète
- **XP & niveaux** — 10 niveaux avec seuils progressifs (50 XP → 2250 XP)
- **Vies ❤️** — max 5, une perdue par mauvaise réponse, régénération automatique toutes les 4h
- **Série de jours 🔥** — récompense la régularité quotidienne
- **Pièces 🪙** — monnaie virtuelle gagnée en jouant, dépensable en boutique
- **Badges 🏅** — plus de 12 badges à débloquer
- **Classement** avec amis

### 🔥 Défi du jour
14 défis rotatifs qui changent chaque jour à minuit. Niveaux Facile / Moyen / Expert avec récompenses XP.

### 💡 Bibliothèque Astuces & Techniques
24 astuces professionnelles en 8 catégories (Couteaux, Sauces, Cuisson, Pâtisserie, Aromates, Pâtes, Saveurs, Conservation) — recherche en temps réel + filtres.

### 📖 Carnet de Recettes
Galerie de toutes les leçons complétées avec fiche détaillée : ingrédients, anecdote historique, conseil du chef, note culturelle.

### 🎨 5 Thèmes visuels
☀️ Clair · 🌙 Sombre · 👨‍🍳 Chef (dorés) · 🌊 Océan (bleus) · 🌸 Sakura (roses)

### 🌍 Multilingue
Interface en **Français** et **Anglais**, configurable dans les réglages.

---

## 🚀 Installation

### Prérequis
- Node.js 22.13.0+
- Compte [Expo](https://expo.dev) (pour les builds)
- Compte [Supabase](https://supabase.com) (optionnel — l'app fonctionne hors-ligne sans)

### 1. Cloner le projet

```bash
git clone https://github.com/Overzam/ClaudeTest.git
cd ClaudeTest
git checkout claude/relaxed-hypatia-pqtyj8
```

### 2. Installer les dépendances

```bash
npm install --legacy-peer-deps
```

### 3. Configurer Supabase (optionnel)

Crée un fichier `.env.local` à la racine :

```env
EXPO_PUBLIC_SUPABASE_URL=https://XXXXXXXXXXXXXXXX.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> Ces valeurs se trouvent sur [supabase.com](https://supabase.com) → ton projet → **Settings** → **API**
>
> Sans ces clés, l'app fonctionne quand même avec les 50+ exercices intégrés en local.

### 4. Lancer en développement

```bash
npm start
```

Scanne le QR code avec [Expo Go](https://expo.dev/go) sur ton téléphone.

### 5. Builder l'APK Android

```bash
npx eas-cli build --platform android --profile preview
```

---

## 🗄️ Base de données (Supabase)

| Table | Contenu |
|-------|---------|
| `users` | Profils utilisateurs (pseudo, avatar, stats) |
| `paths` | Parcours culinaires |
| `lessons` | Leçons par parcours |
| `exercises` | Exercices par leçon |
| `user_progress` | Progression (leçons complétées, scores) |
| `badges` | Définition des badges |
| `user_badges` | Badges débloqués par utilisateur |
| `friendships` | Relations sociales entre utilisateurs |

---

## 🛠️ Stack technique

| Technologie | Usage |
|-------------|-------|
| React Native 0.85 | Framework mobile cross-platform |
| Expo SDK 56 | Outils, build et APIs natives |
| Expo Router v3 | Navigation basée sur les fichiers |
| TypeScript | Typage statique |
| Zustand | État global (auth, jeu, badges, thème…) |
| Supabase | Authentification + base de données PostgreSQL |
| i18next | Internationalisation |
| react-native-reanimated | Animations fluides |
| AsyncStorage | Cache local et persistance |

---

## 📁 Structure du projet

```
app/
├── (auth)/          # Login / Inscription
├── (tabs)/          # Onglets : Accueil, Explorer, Classement, Profil
├── lesson/          # Leçon, Exercices, Écran de fin, Ingrédients
├── daily-challenge  # Défi du jour
├── recipe-book      # Carnet de recettes
├── tips             # Bibliothèque astuces & techniques
├── badges           # Collection de badges
├── friends          # Amis & social
├── path/[slug]      # Page détail d'un parcours
├── premium          # RecipeQuest+
├── shop             # Boutique de pièces
└── settings         # Réglages (thème, langue, notifications)

components/
├── ui/              # Button, Card, Avatar, ScreenWrapper…
├── gamification/    # XPBar, HeartsDisplay, StreakBadge, BadgeCard…
└── lesson/          # MultipleChoice, StepOrdering, Association, FillInBlank…

constants/
├── themes/          # 5 thèmes avec ~20 tokens couleur chacun
├── pathsData.ts     # Histoire, ingrédients, chefs célèbres par parcours
└── exercisesData.ts # 50+ exercices statiques locaux

stores/              # Zustand : auth, game, premium, badges, settings, theme…
services/            # Supabase : auth, lessons, stats, friends, notifications…
```

---

## 📄 Licence

MIT — libre d'utilisation et de modification.

---

*Fait avec ❤️ et beaucoup d'épices 🌶️*
