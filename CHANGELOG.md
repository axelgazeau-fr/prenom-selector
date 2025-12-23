# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

## [2.0.0] - 2024-12-23

### ✨ Ajouté
- **6 participants** au lieu de 3 (Raphael, Papa, Maman, Marion, Guillaume, Valentine)
- **Images personnalisées** pour chaque participant
- Chaque personne voit sa propre image unique quand tout le monde est connecté
- Guide complet des images (`public/IMAGES_GUIDE.md`)
- Fichier de configuration centralisé (`app/config.ts`)
- Guide de démarrage rapide (`QUICKSTART.md`)
- Fichier `.env.example` pour les futures extensions

### 🔄 Modifié
- Mise à jour de l'interface `UserStatus` avec les 6 nouveaux prénoms
- Adaptation du layout CSS pour mieux afficher 6 cartes de participants
- Taille des avatars et cartes ajustée pour 6 participants
- Compteur de progression mis à jour (X/6 au lieu de X/3)
- Messages personnalisés pour chaque utilisateur
- README mis à jour avec les nouvelles instructions

### 🎨 Améliorations visuelles
- Grid responsive optimisé pour 6 cartes
- Animations conservées et améliorées
- Fallback SVG personnalisé pour chaque prénom
- Espacement amélioré pour mobile et desktop

### 📝 Documentation
- Instructions détaillées pour les images personnalisées
- Guide de troubleshooting
- Exemples et bonnes pratiques
- Documentation sur l'optimisation des images

## [1.0.0] - 2024-12-23

### ✨ Version initiale
- Application Next.js avec TypeScript
- Page d'accueil avec sélection de prénom
- Page d'attente avec statut en temps réel
- Système de polling pour synchronisation
- Révélation d'image quand tous les participants sont connectés
- Design moderne avec animations
- API Routes pour gestion de l'état
- Prêt pour déploiement sur Vercel
- 3 participants initiaux (Lynda, Raphael, Marion)
