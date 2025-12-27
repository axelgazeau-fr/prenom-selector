// Configuration centralisée pour l'application
// Modifiez ce fichier pour personnaliser facilement l'application

export const CONFIG = {
  // Liste des prénoms disponibles
  prenoms: ['jojo', 'angelique', 'papa','nathalie', 'valentine'],

  // Nombre total de participants
  totalParticipants: 6,

  // Extension des images personnalisées
  imageExtension: 'jpg', // Peut être 'jpg', 'png', 'webp', etc.

  // Dossier des images (relatif au dossier public)
  imagesFolder: '/',

  // Intervalle de polling en millisecondes (1000 = 1 seconde)
  pollingInterval: 1000,

  // Délai avant d'afficher l'image après que tout le monde soit connecté (en ms)
  revealDelay: 500,

  // Titres et messages
  messages: {
    homeTitle: 'Choisissez votre',
    homeTitleAccent: ' prénom',
    homeSubtitle: 'Une expérience magique vous attend de l\'autre côté',
    homeInfo: 'Attendez que tout le monde ait choisi pour révéler la surprise',
    waitingTitle: 'Bienvenue,',
    waitingSubtitleWaiting: 'En attente des autres participants...',
    waitingSubtitleReady: 'Tout le monde est là ! Révélation en cours...',
    revealTitle: '✨ Votre image personnalisée ! ✨',
    revealMessage: 'Merci d\'avoir participé,',
    statusConnected: 'Connecté',
    statusConnecting: 'Connexion...',
  },

  // Couleurs (utilisées dans les fallbacks SVG)
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#ff6b9d',
  }
} as const

export type ConfigType = typeof CONFIG
