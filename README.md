# Sélecteur de Prénoms - Expérience Collaborative

Une application Next.js interactive où plusieurs utilisateurs sélectionnent leur prénom et une image surprise apparaît quand tout le monde est connecté.

## ✨ Fonctionnalités

- 🎨 Design moderne avec animations fluides
- 👤 Page personnalisée pour chaque utilisateur
- 🖼️ Image unique pour chaque prénom
- ⬇️ Possibilité de télécharger son image
- 📱 Design responsive (mobile & desktop)
- ⚡ Pas de système de synchronisation - chacun voit son image immédiatement !

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📦 Déploiement sur Vercel

### Option 1 : Déploiement via GitHub

1. Poussez votre code sur GitHub
2. Connectez-vous sur [vercel.com](https://vercel.com)
3. Cliquez sur "New Project"
4. Importez votre repository GitHub
5. Vercel détectera automatiquement Next.js et configurera tout
6. Cliquez sur "Deploy"

### Option 2 : Déploiement via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Déployer en production
vercel --prod
```

## 🎨 Personnalisation

### Modifier les prénoms

Dans `app/page.tsx`, ligne 7 :
```typescript
const prenoms = ['raphael', 'papa', 'maman', 'marion', 'guillaume', 'valentine']
```

### Ajouter les images personnalisées

Chaque personne verra une image différente ! Placez vos images dans le dossier `public/` avec les noms suivants :
- `raphael.jpg` - Image pour Raphael
- `papa.jpg` - Image pour Papa
- `maman.jpg` - Image pour Maman  
- `marion.jpg` - Image pour Marion
- `guillaume.jpg` - Image pour Guillaume
- `valentine.jpg` - Image pour Valentine

**Important :** Les images doivent avoir exactement ces noms (en minuscules) avec l'extension `.jpg`. Vous pouvez aussi utiliser `.png` en modifiant l'extension dans le code.

Si une image n'est pas trouvée, un placeholder coloré avec le prénom de la personne sera affiché automatiquement.

### Personnaliser les couleurs

Les couleurs sont définies dans `app/globals.css` avec des variables CSS :
```css
:root {
  --color-bg: #0a0e1a;
  --color-accent: #ff6b9d;
  --color-secondary: #c084fc;
  /* ... */
}
```

## 🔧 Architecture

- **Next.js 14** : Framework React avec App Router
- **TypeScript** : Typage statique
- **Routes dynamiques** : Pages personnalisées pour chaque prénom
- **CSS Modules** : Styles scoped par composant
- **Image fallback** : SVG généré automatiquement si l'image n'existe pas

## 📁 Structure du projet

```
prenom-selector/
├── app/
│   ├── [prenom]/
│   │   ├── page.tsx           # Page personnalisée dynamique
│   │   └── page.module.css    # Styles de la page personnalisée
│   ├── layout.tsx             # Layout principal
│   ├── globals.css            # Styles globaux
│   ├── page.tsx               # Page d'accueil (sélecteur)
│   └── page.module.css        # Styles de la page d'accueil
├── public/
│   ├── raphael.jpg            # Image de Raphael
│   ├── papa.jpg               # Image de Papa
│   ├── maman.jpg              # Image de Maman
│   ├── marion.jpg             # Image de Marion
│   ├── guillaume.jpg          # Image de Guillaume
│   └── valentine.jpg          # Image de Valentine
├── package.json
├── tsconfig.json
└── next.config.js
```

## ⚠️ Note importante pour la production

Le système actuel utilise un stockage en mémoire qui fonctionne bien pour une démo, mais **n'est pas persistant** entre les redémarrages du serveur ou sur plusieurs instances Vercel.

Pour une utilisation en production réelle, envisagez :

- **Vercel KV** : Stockage Redis clé-valeur
- **Vercel Postgres** : Base de données PostgreSQL
- **Pusher** : Service WebSocket en temps réel
- **Ably** : Alternative à Pusher pour le temps réel

### Exemple avec Vercel KV (recommandé)

```bash
npm install @vercel/kv
```

Dans `app/api/userStore.ts` :
```typescript
import { kv } from '@vercel/kv'

export async function setUser(prenom: string) {
  await kv.hset('users', { [prenom]: true })
}

export async function getUsers() {
  return await kv.hgetall('users')
}
```

## 🛠️ API Routes

### POST `/api/register`
Enregistre un utilisateur comme connecté.

**Body :**
```json
{
  "prenom": "lynda"
}
```

**Response :**
```json
{
  "success": true,
  "users": {
    "lynda": true,
    "raphael": false,
    "marion": false
  },
  "allConnected": false
}
```

### GET `/api/status`
Récupère le statut de tous les utilisateurs.

**Response :**
```json
{
  "users": {
    "lynda": true,
    "raphael": true,
    "marion": true
  },
  "allConnected": true,
  "count": 3
}
```

### DELETE `/api/register`
Réinitialise tous les statuts (utile pour les tests).

## 🎯 Utilisation

1. Partagez le lien de l'application avec les participants
2. Chaque personne sélectionne son prénom dans la liste déroulante (Raphael, Papa, Maman, Marion, Guillaume, Valentine)
3. Après sélection, l'utilisateur est immédiatement redirigé vers sa page personnalisée
4. Chaque personne voit son image unique ! 🎉
5. Possibilité de télécharger l'image ou de retourner à l'accueil

## 📝 Licence

MIT

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.
