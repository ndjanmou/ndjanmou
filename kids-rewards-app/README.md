# 🌟 Application de Récompenses pour Enfants

Une application mobile conviviale et ludique qui permet aux parents d'encourager leurs enfants (3-12 ans) à se discipliner et accomplir des tâches grâce à un système de points et de récompenses.

## 🎯 Fonctionnalités

### Pour les Enfants
- **Interface colorée et ludique** adaptée aux enfants de 3-12 ans
- **Système de points** pour chaque tâche accomplie
- **Animations et célébrations** lors des réussites
- **Visualisation des progrès** avec barre de progression
- **Historique des activités** pour suivre les réalisations
- **Conversion des points en argent** pour comprendre la valeur des efforts

### Pour les Parents
- **Gestion de plusieurs enfants** avec profils individuels
- **Paramètres personnalisables** (tâches, points, objectifs)
- **Suivi des performances** et statistiques
- **Réinitialisation hebdomadaire** des points
- **Mode parent sécurisé** pour les configurations

## 🚀 Installation et Utilisation

### Prérequis
- Node.js (version 16 ou plus récente)
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone [url-du-projet]

# Accéder au dossier
cd kids-rewards-app

# Installer les dépendances
npm install

# Lancer l'application
npm run dev
```

L'application sera accessible à l'adresse `http://localhost:5173`

## 🎮 Comment Utiliser l'Application

### Première Utilisation
1. **Ajouter un enfant** : Cliquez sur "Ajouter un enfant" et remplissez les informations
2. **Choisir un avatar** : Sélectionnez un avatar amusant pour l'enfant
3. **Commencer** : L'enfant peut maintenant utiliser son profil !

### Fonctionnement du Système de Points

#### Tâches Positives (Gagnent des Points)
- 🦷 **Se brosser les dents** : +2 points
- 🧸 **Ranger ses jouets** : +3 points
- 📚 **Faire ses devoirs** : +5 points
- 👨‍🍳 **Aider en cuisine** : +4 points

#### Tâches Négatives (Perdent des Points)
- 👕 **Laisser traîner ses affaires** : -1 point
- 😤 **Être impoli** : -2 points

### Conversion des Points
- **Par défaut** : 10 points = 1 €
- **Personnalisable** via le panneau parent
- **Objectif hebdomadaire** : 50 points par défaut

## 🔧 Fonctionnalités Avancées

### Mode Parent
- Accès via l'icône ⚙️ en haut à droite
- Gestion des paramètres de conversion points/argent
- Modification des objectifs hebdomadaires
- Réinitialisation des points
- Consultation des statistiques détaillées

### Persistance des Données
- Toutes les données sont sauvegardées localement
- Pas de connexion internet requise
- Historique complet des activités

## 🎨 Technologies Utilisées

- **React 18** avec TypeScript
- **Vite** pour le build et le développement
- **Framer Motion** pour les animations
- **Lucide React** pour les icônes
- **React Router** pour la navigation
- **CSS3** avec variables personnalisées
- **LocalStorage** pour la persistance

## 📱 Responsive Design

L'application est optimisée pour :
- 📱 Téléphones mobiles
- 📱 Tablettes
- 💻 Ordinateurs

## 🎯 Pédagogie et Bénéfices

### Pour les Enfants
- **Motivation intrinsèque** : Comprendre la valeur des efforts
- **Responsabilisation** : Prendre en charge ses tâches
- **Visualisation des progrès** : Voir concrètement les résultats
- **Gamification** : Apprendre en s'amusant

### Pour les Parents
- **Outil éducatif** : Enseigner la discipline de manière positive
- **Suivi personnalisé** : Adapter les objectifs à chaque enfant
- **Communication** : Discuter des progrès et des défis
- **Récompenses équitables** : Système transparent et juste

## 🔐 Sécurité et Confidentialité

- **Données locales** : Toutes les informations restent sur l'appareil
- **Pas de collecte de données** : Aucune information personnelle transmise
- **Mode hors ligne** : Fonctionne sans connexion internet

## 📈 Développements Futurs

- **Synchronisation cloud** pour plusieurs appareils
- **Tâches personnalisées** avec images
- **Récompenses non-monétaires** (activités, sorties)
- **Graphiques de progression** détaillés
- **Notifications de rappel** pour les tâches
- **Mode multijoueur** pour la fratrie

## 🛠️ Développement

### Structure du Projet
```
kids-rewards-app/
├── src/
│   ├── components/     # Composants React
│   ├── hooks/          # Hooks personnalisés
│   ├── types.ts        # Types TypeScript
│   ├── index.css       # Styles globaux
│   └── main.tsx        # Point d'entrée
├── public/             # Assets publics
└── package.json        # Configuration npm
```

### Scripts Disponibles
```bash
npm run dev        # Lancer en développement
npm run build      # Construire pour production
npm run preview    # Prévisualiser la build
npm run lint       # Vérifier le code
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Merci de :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- Icônes par **Lucide React**
- Animations par **Framer Motion**
- Inspiration pédagogique des méthodes Montessori
- Testeurs : Les familles qui ont contribué aux retours

---

**Développé avec ❤️ pour aider les familles à créer des habitudes positives ensemble !**
