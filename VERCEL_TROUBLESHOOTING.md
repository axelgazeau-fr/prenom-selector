# 🔧 Résolution des Problèmes Vercel

## Problèmes courants et solutions

### ❌ Problème 1 : L'état se réinitialise après quelques secondes

**Symptôme :** Les utilisateurs connectés disparaissent de la liste après 1-2 secondes.

**Cause :** Les fonctions serverless de Vercel peuvent être réinitialisées entre les requêtes, perdant l'état en mémoire.

**Solution :** J'ai implémenté `global.userStatusStore` pour persister l'état, mais pour une solution vraiment robuste, utilisez Vercel KV (Redis).

### Solution complète avec Vercel KV :

```bash
# 1. Installez le package
npm install @vercel/kv

# 2. Dans votre dashboard Vercel :
# - Allez dans Storage → Create Database → KV
# - Copiez les variables d'environnement générées
```

Remplacez le contenu de `app/api/userStore.ts` :

```typescript
import { kv } from '@vercel/kv'

interface UserStatus {
  raphael: boolean
  papa: boolean
  maman: boolean
  jean-louis: boolean
  marion: boolean
  guillaume: boolean
  valentine: boolean
}

const DEFAULT_USERS: UserStatus = {
  raphael: false,
  papa: false,
  maman: false,
  jean-louis: false,
  marion: false,
  guillaume: false,
  valentine: false
}

class UserStore {
  async getAll(): Promise<UserStatus> {
    const users = await kv.get<UserStatus>('users')
    return users || DEFAULT_USERS
  }

  async setUser(prenom: keyof UserStatus, status: boolean): Promise<UserStatus> {
    const users = await this.getAll()
    users[prenom] = status
    await kv.set('users', users)
    return users
  }

  async reset(): Promise<UserStatus> {
    await kv.set('users', DEFAULT_USERS)
    return DEFAULT_USERS
  }

  async allConnected(): Promise<boolean> {
    const users = await this.getAll()
    return Object.values(users).every(Boolean)
  }

  async getCount(): Promise<number> {
    const users = await this.getAll()
    return Object.values(users).filter(Boolean).length
  }
}

const userStore = new UserStore()
export default userStore
```

Mettez à jour les routes API pour être async :

**`app/api/register/route.ts`** :
```typescript
export async function POST(request: NextRequest) {
  try {
    const { prenom } = await request.json()

    if (!prenom || !['raphael', 'papa', 'maman', 'marion', 'guillaume', 'valentine'].includes(prenom.toLowerCase())) {
      return NextResponse.json({ error: 'Prenom invalide' }, { status: 400 })
    }

    const users = await userStore.setUser(prenom.toLowerCase() as keyof UserStatus, true)

    return NextResponse.json({
      success: true,
      users,
      allConnected: await userStore.allConnected(),
      message: `${prenom} enregistre avec succes`
    })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE() {
  const users = await userStore.reset()
  return NextResponse.json({
    success: true,
    users,
    message: 'Statuts reinitialises'
  })
}
```

**`app/api/status/route.ts`** :
```typescript
export async function GET() {
  const users = await userStore.getAll()
  const allConnected = await userStore.allConnected()
  const count = await userStore.getCount()

  return NextResponse.json({
    users,
    allConnected,
    count
  })
}
```

---

### ❌ Problème 2 : L'image ne s'affiche pas automatiquement

**Symptôme :** Quand tous les utilisateurs sont connectés, il faut rafraîchir la page pour voir l'image.

**Cause :** Le polling ne détecte pas correctement le changement d'état ou s'arrête trop tôt.

**Solution :** J'ai corrigé les dépendances du `useEffect` dans le fichier mis à jour. Le polling continue maintenant jusqu'à ce que l'image soit affichée.

**Vérification :**
1. Ouvrez la console du navigateur (F12)
2. Regardez l'onglet Network
3. Vous devriez voir des requêtes vers `/api/status` toutes les secondes
4. Ces requêtes doivent continuer même après que tous soient connectés

---

### ❌ Problème 3 : "Too many requests" sur Vercel

**Symptôme :** Erreur 429 après quelques minutes d'utilisation.

**Cause :** Le polling fait trop de requêtes pour les limites du plan gratuit Vercel.

**Solution 1 : Augmenter l'intervalle de polling**

Dans `app/waiting/page.tsx`, changez :
```typescript
}, 1000)  // ← Actuellement 1 seconde
```
Par :
```typescript
}, 2000)  // ← 2 secondes (réduit de 50% les requêtes)
```

**Solution 2 : Utiliser Server-Sent Events (SSE)**

Créez `app/api/stream/route.ts` :
```typescript
export async function GET() {
  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      const sendUpdate = async () => {
        const users = await userStore.getAll()
        const data = JSON.stringify({ users, allConnected: await userStore.allConnected() })
        controller.enqueue(encoder.encode(`data: ${data}\n\n`))
      }

      const interval = setInterval(sendUpdate, 2000)

      // Cleanup après 5 minutes
      setTimeout(() => {
        clearInterval(interval)
        controller.close()
      }, 300000)
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    }
  })
}
```

Dans `app/waiting/page.tsx`, remplacez le polling par :
```typescript
useEffect(() => {
  if (!prenom) return

  // Enregistrement initial
  fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prenom })
  }).then(() => setIsConnected(true))

  // Server-Sent Events
  const eventSource = new EventSource('/api/stream')

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    setUserStatus(data.users)
    if (data.allConnected) {
      setShowImage(true)
    }
  }

  return () => eventSource.close()
}, [prenom])
```

---

### ❌ Problème 4 : Les images ne se chargent pas

**Symptôme :** Les images personnalisées ne s'affichent pas.

**Solutions :**

1. **Vérifiez les noms des fichiers** (tout en minuscules) :
   - ✅ `raphael.jpg`
   - ❌ `Raphael.jpg`
   - ❌ `raphael.JPG`

2. **Vérifiez que les images sont dans `public/`** :
   ```
   public/
   ├── raphael.jpg
   ├── papa.jpg
   ├── maman.jpg
   ├── marion.jpg
   ├── guillaume.jpg
   └── valentine.jpg
   ```

3. **Redéployez après avoir ajouté les images** :
   ```bash
   git add public/*.jpg
   git commit -m "Add personalized images"
   git push
   ```

4. **Vérifiez l'URL directement** :
   Ouvrez `https://votre-app.vercel.app/raphael.jpg` dans le navigateur

---

### 🔍 Debug en production

Pour déboguer sur Vercel :

1. **Vérifiez les logs** :
   - Dashboard Vercel → votre projet → Logs
   - Filtrez par "Runtime Logs"

2. **Ajoutez des logs dans le code** :
   ```typescript
   console.log('User registered:', prenom)
   console.log('Current users:', userStatus)
   ```

3. **Testez l'API directement** :
   ```bash
   # Status
   curl https://votre-app.vercel.app/api/status

   # Register
   curl -X POST https://votre-app.vercel.app/api/register \
     -H "Content-Type: application/json" \
     -d '{"prenom":"raphael"}'
   ```

---

### ⚡ Solution rapide pour tester

Si vous voulez tester rapidement sans Vercel KV :

1. **Désactivez le cache de Vercel** en ajoutant dans `vercel.json` :
```json
{
  "functions": {
    "app/api/**/*.ts": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

2. **Utilisez un service externe comme Upstash Redis** (gratuit) :
```bash
npm install @upstash/redis
```

Créez un compte sur [upstash.com](https://upstash.com) et utilisez leurs URLs dans `.env` :
```
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

---

### 📞 Besoin d'aide ?

1. Vérifiez les logs Vercel
2. Testez en local d'abord (`npm run dev`)
3. Consultez [docs.vercel.com](https://vercel.com/docs)
4. Utilisez Vercel KV pour une vraie persistance

Le stockage global fonctionne pour des tests courts, mais Vercel KV est la vraie solution pour la production !
