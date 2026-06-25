# 🍽️ RecipeQuest

Une application mobile gamifiée à la Duolingo pour apprendre et découvrir des recettes de cuisine du monde entier.

---

## Concept

RecipeQuest transforme l'apprentissage de la cuisine en une expérience ludique et addictive. Comme Duolingo, l'application propose des leçons courtes, un système de progression par niveaux, des streaks quotidiens et des récompenses — mais au lieu d'apprendre une langue, tu apprends à cuisiner.

Chaque jour, tu explores de nouvelles recettes, identifies des ingrédients, associes des techniques de cuisson et complètes des défis culinaires.

---

## Fonctionnalités principales

### Apprentissage gamifié
- **Leçons courtes** : des sessions de 5 à 10 minutes par recette
- **Streaks quotidiens** : maintiens ta série pour débloquer des bonus
- **XP et niveaux** : gagne de l'expérience à chaque leçon complétée
- **Cœurs / vies** : tu en perds si tu rates une réponse — à récupérer ou acheter
- **Ligues hebdomadaires** : classement entre joueurs selon les XP gagnés

### Contenu culinaire
- **Parcours thématiques** : Cuisine française, italienne, asiatique, végétarienne, pâtisserie…
- **Exercices variés** :
  - Identifier un ingrédient à partir d'une photo
  - Remettre les étapes d'une recette dans le bon ordre
  - Associer un plat à son pays d'origine
  - Deviner un plat à partir de sa description
  - QCM sur les temps de cuisson ou quantités
- **Recette complète débloquée** après avoir terminé une leçon

### Profil & social
- **Profil utilisateur** avec statistiques (recettes apprises, streak, level)
- **Badges et trophées** à collectionner
- **Amis** : voir la progression de ses proches et les défier
- **Partage** d'une recette apprise sur les réseaux sociaux

### Personnalisation
- **Régimes alimentaires** : végétarien, vegan, sans gluten, halal, etc.
- **Niveau de cuisine** : débutant, intermédiaire, confirmé
- **Rappels quotidiens** configurables

---

## Stack technique envisagée

| Couche | Technologie |
|---|---|
| Mobile | React Native (iOS & Android) |
| Navigation | Expo Router |
| State management | Zustand |
| Backend | Node.js + Express ou Supabase |
| Base de données | PostgreSQL |
| Auth | Supabase Auth / Firebase Auth |
| Stockage médias | Cloudinary ou Supabase Storage |
| Notifications push | Expo Notifications |

---

## Structure du projet

```
recipequest/
├── app/                    # Écrans (Expo Router)
│   ├── (auth)/             # Login, inscription
│   ├── (tabs)/             # Onglets principaux
│   │   ├── home.tsx        # Tableau de bord / leçons du jour
│   │   ├── explore.tsx     # Parcours et catégories
│   │   ├── leaderboard.tsx # Classement
│   │   └── profile.tsx     # Profil utilisateur
│   └── lesson/[id].tsx     # Écran de leçon
├── components/             # Composants réutilisables
│   ├── ui/                 # Boutons, cartes, barres de progression
│   ├── lesson/             # Composants d'exercices
│   └── gamification/       # Hearts, XP bar, streak counter
├── stores/                 # State management (Zustand)
├── services/               # Appels API
├── assets/                 # Images, icônes, sons
└── constants/              # Couleurs, thèmes, config
```

---

## Parcours d'apprentissage (exemple)

```
🌍 Cuisine du Monde
├── 🇫🇷 Cuisine Française        [Niveau 1]
│   ├── Leçon 1 : Les sauces de base
│   ├── Leçon 2 : La quiche lorraine
│   └── Leçon 3 : Le bœuf bourguignon
├── 🇮🇹 Cuisine Italienne         [Niveau 2 — verrouillé]
├── 🇯🇵 Cuisine Japonaise         [Niveau 3 — verrouillé]
└── ...

🥗 Végétarien & Healthy          [Parcours secondaire]
🎂 Pâtisserie & Desserts         [Parcours secondaire]
```

---

## Roadmap

### Phase 1 — MVP
- [ ] Authentification (login / inscription)
- [ ] 3 parcours de base avec 5 leçons chacun
- [ ] 4 types d'exercices (QCM, ordre, photo, association)
- [ ] Système XP, streaks et cœurs
- [ ] Profil utilisateur basique

### Phase 2 — Social & Contenu
- [ ] Système d'amis et leaderboard
- [ ] 10 parcours supplémentaires
- [ ] Notifications push quotidiennes
- [ ] Badges et trophées

### Phase 3 — Monétisation & Polish
- [ ] Abonnement premium (RecipeQuest Plus)
- [ ] Boutique in-app (recharge de cœurs, boosts XP)
- [ ] Mode hors-ligne
- [ ] Internationalisation (EN, ES, PT…)

---

## Installation & démarrage

```bash
# Cloner le repo
git clone https://github.com/overzam/claudetest.git
cd claudetest

# Installer les dépendances
npm install

# Lancer l'application
npx expo start
```

---

## Contribuer

Les contributions sont les bienvenues ! Ouvre une issue pour discuter d'une fonctionnalité ou soumets une pull request.

---

## Licence

MIT
