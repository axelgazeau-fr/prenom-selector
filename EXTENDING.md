# 🔧 Guide d'Extension

Comment étendre et personnaliser l'application selon vos besoins.

## 📋 Table des matières
- [Ajouter/Retirer des participants](#ajouter-ou-retirer-des-participants)
- [Changer le format des images](#changer-le-format-des-images)
- [Ajouter une base de données](#ajouter-une-base-de-données)
- [Implémenter WebSocket temps réel](#implémenter-websocket)
- [Personnaliser le design](#personnaliser-le-design)
- [Ajouter des animations](#ajouter-des-animations)

---

## 👥 Ajouter ou retirer des participants

### Ajouter un participant

**1. Mettez à jour la liste des prénoms**

Fichier : `app/page.tsx` (ligne 7)
```typescript
const prenoms = ['raphael', 'papa', 'maman', 'marion', 'guillaume', 'valentine', 'nouveau_prenom']
```

**2. Mettez à jour l'interface TypeScript**

Fichier : `app/api/userStore.ts` (ligne 4)
```typescript
interface UserStatus {
  raphael: boolean
  papa: boolean
  maman: boolean
  marion: boolean
  guillaume: boolean
  valentine: boolean
  nouveau_prenom: boolean  // ← Ajoutez ici
}
```

**3. Mettez à jour les états initiaux**

Dans le même fichier (ligne 11 et ligne 27)
```typescript
private users: UserStatus = {
  // ... autres prénoms
  nouveau_prenom: false  // ← Ajoutez ici
}
```

**4. Mettez à jour la validation**

Fichier : `app/api/register/route.ts` (ligne 8)
```typescript
if (!prenom || !['raphael', 'papa', 'maman', 'marion', 'guillaume', 'valentine', 'nouveau_prenom'].includes(prenom.toLowerCase())) {
```

**5. Mettez à jour le type TypeScript**

Dans le même fichier (ligne 16)
```typescript
const users = userStore.setUser(prenom.toLowerCase() as 'raphael' | 'papa' | 'maman' | 'marion' | 'guillaume' | 'valentine' | 'nouveau_prenom', true)
```

**6. Mettez à jour la page d'attente**

Fichier : `app/waiting/page.tsx` (lignes 7 et 16) - mêmes modifications que dans userStore.ts

**7. Mettez à jour le compteur**

Dans le même fichier (ligne 91)
```typescript
{connectedCount < 7  // ← Changez le nombre total
```

**8. Ajoutez l'image**

Placez `nouveau_prenom.jpg` dans le dossier `public/`

### Retirer un participant

Suivez le même processus en retirant le prénom de tous les fichiers listés ci-dessus.

---

## 🖼️ Changer le format des images

### Utiliser PNG au lieu de JPG

**Méthode 1 : Modifier le code**

Fichier : `app/waiting/page.tsx` (ligne 140)
```typescript
src={`/${prenom.toLowerCase()}.png`}  // ← Changez .jpg en .png
```

**Méthode 2 : Utiliser la configuration**

Modifiez `app/config.ts` :
```typescript
imageExtension: 'png',  // Au lieu de 'jpg'
```

Puis dans `app/waiting/page.tsx` :
```typescript
import { CONFIG } from '../config'

// ...
src={`/${prenom.toLowerCase()}.${CONFIG.imageExtension}`}
```

### Supporter plusieurs formats

```typescript
const getImageUrl = (prenom: string) => {
  const extensions = ['jpg', 'png', 'webp', 'jpeg']
  // Essayez chaque format jusqu'à trouver une image qui existe
  return `/${prenom.toLowerCase()}.jpg` // Fallback par défaut
}
```

---

## 💾 Ajouter une base de données

### Option 1 : Vercel KV (Redis) - Recommandé

**1. Installez le package**
```bash
npm install @vercel/kv
```

**2. Créez KV dans Vercel Dashboard**
- Allez dans votre projet Vercel
- Storage → Create Database → KV
- Copiez les variables d'environnement

**3. Modifiez `app/api/userStore.ts`**
```typescript
import { kv } from '@vercel/kv'

class UserStore {
  async setUser(prenom: string, status: boolean) {
    await kv.hset('users', { [prenom]: status })
    return await this.getAll()
  }

  async getAll(): Promise<UserStatus> {
    const users = await kv.hgetall('users')
    return users || this.getDefaultUsers()
  }

  async reset() {
    await kv.del('users')
    return this.getDefaultUsers()
  }

  private getDefaultUsers(): UserStatus {
    return {
      raphael: false,
      papa: false,
      maman: false,
      marion: false,
      guillaume: false,
      valentine: false
    }
  }
}
```

**4. Mettez à jour les routes API**

Les routes devront maintenant être `async` :
```typescript
export async function POST(request: NextRequest) {
  const { prenom } = await request.json()
  const users = await userStore.setUser(prenom, true)
  // ...
}
```

### Option 2 : PostgreSQL avec Vercel Postgres

```bash
npm install @vercel/postgres
```

Créez une table :
```sql
CREATE TABLE user_status (
  prenom VARCHAR(50) PRIMARY KEY,
  connected BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔌 Implémenter WebSocket temps réel

### Avec Pusher (recommandé pour Vercel)

**1. Créez un compte Pusher**
- Allez sur [pusher.com](https://pusher.com)
- Créez une nouvelle app

**2. Installez les dépendances**
```bash
npm install pusher pusher-js
```

**3. Créez un channel API**

Fichier : `app/api/pusher/route.ts`
```typescript
import Pusher from 'pusher'

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
})

export async function POST(request: Request) {
  const data = await request.json()
  await pusher.trigger('prenom-selector', 'user-connected', data)
  return Response.json({ success: true })
}
```

**4. Utilisez dans le client**

Fichier : `app/waiting/page.tsx`
```typescript
import Pusher from 'pusher-js'

useEffect(() => {
  const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
  })

  const channel = pusher.subscribe('prenom-selector')
  
  channel.bind('user-connected', (data: any) => {
    setUserStatus(data.users)
  })

  return () => {
    channel.unbind_all()
    channel.unsubscribe()
  }
}, [])
```

---

## 🎨 Personnaliser le design

### Changer les couleurs

Fichier : `app/globals.css` (ligne 3)
```css
:root {
  --color-bg: #0a0e1a;           /* Fond principal */
  --color-surface: #141824;      /* Fond des cartes */
  --color-accent: #ff6b9d;       /* Couleur principale */
  --color-secondary: #c084fc;    /* Couleur secondaire */
  --color-tertiary: #60a5fa;     /* Couleur tertiaire */
  --color-text: #f8fafc;         /* Texte */
  --color-text-dim: #94a3b8;     /* Texte secondaire */
}
```

### Changer les polices

Dans le même fichier (ligne 1)
```css
@import url('https://fonts.googleapis.com/css2?family=Votre+Police&display=swap');

:root {
  --font-display: 'Votre Police', serif;
  --font-body: 'Autre Police', sans-serif;
}
```

### Modifier les animations

Fichier : `app/page.module.css`

Exemple - Changer la vitesse d'animation :
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.container {
  animation: fadeInUp 0.8s ease-out;  /* ← Changez la durée ici */
}
```

---

## ✨ Ajouter des animations

### Animation au survol des cartes

Fichier : `app/waiting/page.module.css`
```css
.statusCard:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 20px 40px rgba(255, 107, 157, 0.4);
}
```

### Animation de confetti

Installez un package :
```bash
npm install canvas-confetti
```

Dans `app/waiting/page.tsx` :
```typescript
import confetti from 'canvas-confetti'

useEffect(() => {
  if (showImage) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }
}, [showImage])
```

### Animation de révélation personnalisée

```css
@keyframes customReveal {
  0% {
    opacity: 0;
    transform: scale(0) rotate(-180deg);
  }
  50% {
    transform: scale(1.2) rotate(10deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0);
  }
}

.revealImage {
  animation: customReveal 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

---

## 🔐 Ajouter de la sécurité

### Limiter l'accès par mot de passe

Créez un middleware : `middleware.ts`
```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const password = request.cookies.get('access_password')
  
  if (password?.value !== process.env.ACCESS_PASSWORD) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/waiting/:path*']
}
```

### Rate limiting

```typescript
const rateLimiter = new Map()

export async function POST(request: NextRequest) {
  const ip = request.ip || 'unknown'
  const now = Date.now()
  const attempts = rateLimiter.get(ip) || []
  
  // Limite : 10 requêtes par minute
  const recentAttempts = attempts.filter((time: number) => now - time < 60000)
  
  if (recentAttempts.length >= 10) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }
  
  rateLimiter.set(ip, [...recentAttempts, now])
  // ... reste du code
}
```

---

## 📊 Ajouter des analytics

### Google Analytics

```bash
npm install @next/third-parties
```

Fichier : `app/layout.tsx`
```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

---

## 💡 Idées d'amélioration

- [ ] Ajouter un chat en temps réel
- [ ] Permettre l'upload d'images depuis l'interface
- [ ] Créer un mode "admin" pour réinitialiser
- [ ] Ajouter des effets sonores
- [ ] Créer une page de résultats avec toutes les photos
- [ ] Ajouter un système de votes pour les images
- [ ] Permettre plusieurs "sessions" simultanées
- [ ] Ajouter l'authentification avec NextAuth
- [ ] Créer une PWA (Progressive Web App)
- [ ] Ajouter le mode sombre/clair

---

**Besoin d'aide pour implémenter une de ces fonctionnalités ?** Consultez la documentation Next.js ou créez une issue !
