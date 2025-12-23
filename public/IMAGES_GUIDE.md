# 📸 Guide des Images Personnalisées

## Structure attendue

Chaque personne aura sa propre image personnalisée qui s'affichera quand tout le monde sera connecté.

```
public/
├── raphael.jpg
├── papa.jpg
├── maman.jpg
├── marion.jpg
├── guillaume.jpg
└── valentine.jpg
```

## Spécifications techniques

### Format
- **Extensions acceptées** : `.jpg`, `.jpeg`, `.png`, `.webp`
- **Format recommandé** : JPG pour photos, PNG pour images avec transparence
- **Taille du fichier** : 500 KB - 2 MB (optimisé pour le web)

### Dimensions
- **Minimum** : 600x450 pixels
- **Recommandé** : 800x600 pixels ou 1200x900 pixels
- **Ratio d'aspect** : 4:3 (idéal) ou 16:9

### Optimisation
Pour optimiser vos images avant de les ajouter :
- Utilisez des outils comme [TinyPNG](https://tinypng.com/) ou [Squoosh](https://squoosh.app/)
- Réduisez la qualité JPG à 80-85%
- Redimensionnez si les images sont trop grandes (>2000px)

## Idées de contenu pour chaque image

### 🎨 Suggestions créatives

**Raphael** (`raphael.jpg`)
- Photo de famille le concernant
- Moment spécial ou souvenir
- Hobby ou passion
- Message personnalisé

**Papa** (`papa.jpg`)
- Photo de famille avec papa
- Moment mémorable
- Photo humoristique
- Cadeau surprise visuel

**Maman** (`maman.jpg`)
- Photo de famille avec maman
- Souvenir précieux
- Moment de célébration
- Message d'amour

**Marion** (`marion.jpg`)
- Photo personnelle
- Souvenir partagé
- Moment de vie
- Création artistique

**Guillaume** (`guillaume.jpg`)
- Photo de famille
- Moment entre frères/sœurs
- Activité favorite
- Message personnalisé

**Valentine** (`valentine.jpg`)
- Photo de famille
- Souvenir d'enfance
- Moment de complicité
- Image joyeuse

## Comment ajouter vos images

### Méthode 1 : Avant le déploiement

1. Créez ou récupérez vos 6 images
2. Renommez-les exactement comme indiqué (en minuscules)
3. Placez-les dans le dossier `public/`
4. Déployez l'application

### Méthode 2 : Après le déploiement (via Vercel)

1. Allez dans votre dashboard Vercel
2. Sélectionnez votre projet
3. Allez dans l'onglet "Files"
4. Uploadez vos images dans le dossier `public/`
5. Redéployez

### Méthode 3 : Via GitHub

1. Poussez vos images dans le dossier `public/` de votre repository
2. Vercel redéploiera automatiquement

## Fallback automatique

Si une image n'est pas trouvée, l'application affichera automatiquement un placeholder coloré avec :
- Un fond dégradé violet/bleu
- Le prénom de la personne en grand
- Des émojis de célébration 🎉

## Tester localement

```bash
# Démarrez le serveur de développement
npm run dev

# Ouvrez 6 onglets en navigation privée
# Sélectionnez un prénom différent dans chaque onglet
# Vérifiez que chaque image s'affiche correctement
```

## Sécurité et confidentialité

⚠️ **Important** : Les images placées dans le dossier `public/` seront accessibles publiquement via l'URL de votre site. N'incluez pas :
- Photos privées que vous ne voulez pas partager publiquement
- Images contenant des informations sensibles
- Photos d'enfants sans autorisation appropriée

## Exemple de nommage

✅ **Correct**
```
raphael.jpg    ← minuscules, extension correcte
papa.png       ← peut aussi être en PNG
maman.jpeg     ← JPEG aussi accepté
```

❌ **Incorrect**
```
Raphael.jpg    ← Majuscule
Papa.JPG       ← Extension en majuscules
maman photo.jpg ← Espace dans le nom
Marion_2024.png ← Underscore et chiffres
```

## Support

Si vous avez des questions ou rencontrez des problèmes avec vos images :
1. Vérifiez que le nom du fichier est exact (minuscules)
2. Vérifiez que l'extension est correcte (.jpg, .png)
3. Vérifiez que la taille du fichier n'est pas trop grande (< 5 MB)
4. Testez en local avant de déployer

## Astuces Pro

### Créer des images cohérentes
- Utilisez le même filtre/style pour toutes les images
- Gardez des dimensions similaires
- Utilisez des cadres ou bordures identiques

### Ajouter du texte aux images
- Utilisez Canva, Photopea ou Figma
- Ajoutez des messages personnalisés
- Créez des montages photos

### Images animées
Si vous voulez plus d'interactivité, vous pouvez même utiliser des GIFs :
- Renommez votre GIF en `.jpg` (le navigateur l'affichera quand même)
- Ou modifiez le code pour accepter `.gif`

Amusez-vous bien ! 🎉
