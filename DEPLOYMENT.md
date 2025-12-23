# 🚀 Guide de Déploiement Rapide

## Déploiement sur Vercel (Recommandé)

### Méthode 1 : Via GitHub (Plus simple)

1. **Créer un repository GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/VOTRE-USERNAME/prenom-selector.git
   git push -u origin main
   ```

2. **Déployer sur Vercel**
   - Allez sur https://vercel.com/new
   - Connectez votre compte GitHub
   - Sélectionnez votre repository
   - Cliquez sur "Deploy"
   - Votre site sera en ligne en ~2 minutes !

### Méthode 2 : Via Vercel CLI (Plus rapide)

1. **Installer Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Se connecter à Vercel**
   ```bash
   vercel login
   ```

3. **Déployer**
   ```bash
   vercel
   ```
   
   Suivez les prompts :
   - Set up and deploy? → Y
   - Which scope? → Sélectionnez votre compte
   - Link to existing project? → N
   - What's your project's name? → prenom-selector
   - In which directory is your code located? → ./
   - Want to override the settings? → N

4. **Déployer en production**
   ```bash
   vercel --prod
   ```

## 🎉 Votre application est en ligne !

Vous recevrez une URL du type :
- **Preview** : `prenom-selector-xyz.vercel.app`
- **Production** : `prenom-selector.vercel.app`

## 🔧 Configuration post-déploiement

### Ajouter un domaine personnalisé

1. Dans votre dashboard Vercel
2. Allez dans Settings → Domains
3. Ajoutez votre domaine personnalisé
4. Suivez les instructions DNS

### Variables d'environnement (si besoin)

Si vous ajoutez Vercel KV ou d'autres services :
1. Dashboard Vercel → Settings → Environment Variables
2. Ajoutez vos variables
3. Redéployez

## 📱 Tester votre application

1. Ouvrez votre URL Vercel
2. Ouvrez la même URL dans 3 onglets différents (mode navigation privée)
3. Sélectionnez un prénom différent dans chaque onglet
4. Regardez la magie opérer ! ✨

## ⚠️ Notes importantes

- Le stockage en mémoire fonctionne sur Vercel mais se réinitialise après ~15 minutes d'inactivité
- Pour une app en production avec vraie persistance, utilisez Vercel KV (Redis) ou Postgres
- Chaque déploiement sur Vercel est automatique à chaque push Git

## 🆘 Problèmes courants

### "Module not found" lors du build
```bash
npm install
```

### L'état ne persiste pas entre les utilisateurs
- C'est normal avec le stockage en mémoire
- Utilisez Vercel KV pour une vraie persistance

### Erreurs de TypeScript
```bash
npm run build
```
Corrigez les erreurs avant de déployer

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Next.js](https://nextjs.org/docs)
- [Vercel KV (Redis)](https://vercel.com/docs/storage/vercel-kv)
