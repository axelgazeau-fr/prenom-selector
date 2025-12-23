# 🚀 Démarrage Rapide - Sélecteur de Prénoms

## En 3 étapes simples

### 1️⃣ Installation (2 minutes)

```bash
# Décompressez le ZIP et naviguez dans le dossier
cd prenom-selector

# Installez les dépendances
npm install

# Lancez le serveur de développement
npm run dev
```

Ouvrez http://localhost:3000 dans votre navigateur.

### 2️⃣ Ajoutez vos images personnalisées (5 minutes)

Placez **6 images** dans le dossier `public/` :

```
public/
├── raphael.jpg    ← Votre image pour Raphael
├── papa.jpg       ← Votre image pour Papa
├── maman.jpg      ← Votre image pour Maman
├── marion.jpg     ← Votre image pour Marion
├── guillaume.jpg  ← Votre image pour Guillaume
└── valentine.jpg  ← Votre image pour Valentine
```

💡 **Astuce** : Les images peuvent être en `.jpg`, `.png` ou `.webp`. Taille recommandée : 800x600 pixels.

### 3️⃣ Déployez sur Vercel (1 minute)

```bash
# Installez Vercel CLI
npm install -g vercel

# Déployez !
vercel --prod
```

Suivez les instructions à l'écran. Votre site sera en ligne en ~60 secondes ! 🎉

## 🎮 Comment utiliser

1. **Partagez le lien** avec les 6 participants
2. Chacun **ouvre le lien** et **sélectionne son prénom**
3. Tout le monde attend sur la page d'attente
4. Dès que les 6 personnes sont connectées...
5. **MAGIE !** Chacun voit son image personnalisée ! ✨

## 🎯 C'est tout !

Votre application est prête à l'emploi. Pour plus de détails :
- 📖 Lisez le [README.md](README.md) complet
- 🚀 Consultez le [DEPLOYMENT.md](DEPLOYMENT.md) pour les options avancées
- 📸 Voir [public/IMAGES_GUIDE.md](public/IMAGES_GUIDE.md) pour les images

## ⚡ Commandes utiles

```bash
# Développement local
npm run dev

# Build de production
npm run build

# Démarrer la version production localement
npm start

# Vérifier les erreurs TypeScript
npm run lint
```

## 🆘 Problèmes ?

### L'image ne s'affiche pas
- ✅ Vérifiez le nom du fichier (tout en minuscules)
- ✅ Vérifiez l'extension (.jpg)
- ✅ Rafraîchissez la page (Ctrl+F5)

### Le compteur est bloqué à X/6
- ✅ Ouvrez en navigation privée
- ✅ Utilisez différents navigateurs
- ✅ Redémarrez le serveur

### Erreur lors du build
```bash
# Supprimez les dépendances et réinstallez
rm -rf node_modules package-lock.json
npm install
```

## 🎨 Personnalisation rapide

### Changer les couleurs
Éditez `app/globals.css` ligne 3-10 :
```css
--color-accent: #ff6b9d;  ← Votre couleur principale
```

### Changer les prénoms
Éditez `app/page.tsx` ligne 7 :
```typescript
const prenoms = ['nom1', 'nom2', ...]
```

Puis mettez à jour les mêmes noms dans :
- `app/api/userStore.ts`
- `app/api/register/route.ts`
- `app/waiting/page.tsx`

### Modifier les messages
Éditez les textes directement dans :
- `app/page.tsx` - Page d'accueil
- `app/waiting/page.tsx` - Page d'attente

## 📱 Tester avec plusieurs utilisateurs

### Option 1 : Navigation privée
Ouvrez 6 fenêtres en navigation privée dans le même navigateur.

### Option 2 : Navigateurs différents
Testez sur Chrome, Firefox, Safari, Edge, etc.

### Option 3 : Appareils différents
Partagez l'URL local sur votre réseau :
1. Trouvez votre IP locale : `ipconfig` (Windows) ou `ifconfig` (Mac/Linux)
2. Accédez depuis un autre appareil : `http://VOTRE-IP:3000`

## 🌐 Accès depuis d'autres appareils

Pour tester sur téléphone/tablette sur le même réseau WiFi :

```bash
# Démarrez avec l'option --hostname
npm run dev -- --hostname 0.0.0.0
```

Puis accédez depuis votre appareil mobile à :
```
http://[VOTRE-IP-LOCALE]:3000
```

## 🎉 Prêt pour la production !

Une fois satisfait, déployez sur Vercel :
```bash
vercel --prod
```

Vous obtiendrez une URL comme : `https://prenom-selector.vercel.app`

Partagez cette URL avec les participants et profitez de l'expérience ! 🚀

---

**Besoin d'aide ?** Consultez les fichiers de documentation complets dans le projet.
