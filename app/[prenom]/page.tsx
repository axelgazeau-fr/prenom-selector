'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './page.module.css'

const validPrenoms = ['maman', 'jean-louis', 'valentine']

export default function PrenomPage() {
  const params = useParams()
  const router = useRouter()
  const prenom = typeof params.prenom === 'string' ? params.prenom.toLowerCase() : ''
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    // Rediriger si le prénom n'est pas valide
    if (!validPrenoms.includes(prenom)) {
      router.push('/')
    }
  }, [prenom, router])

  if (!validPrenoms.includes(prenom)) {
    return null
  }

  const prenomCapitalized = prenom.charAt(0).toUpperCase() + prenom.slice(1)

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.decorCircle} />
        <div className={styles.decorCircle2} />

        <div className={`${styles.content} ${imageLoaded ? styles.revealed : ''}`}>
          <h1 className={styles.title}>
            <span className={styles.titleAccent}> {prenomCapitalized}</span> !
          </h1>

          <div className={styles.imageContainer}>
            {!imageLoaded && !imageError && (
              <div className={styles.loader}>
                <div className={styles.spinner}></div>
                <p>Chargement de ton image...</p>
              </div>
            )}

            <img
              src={`/${prenom}.jpg`}
              alt={`Image pour ${prenomCapitalized}`}
              className={`${styles.image} ${imageLoaded ? styles.visible : ''}`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                setImageError(true)
                setImageLoaded(true)
                // Fallback avec un SVG personnalisé
                e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23667eea;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23764ba2;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23grad)" width="600" height="600"/%3E%3Ctext x="50%25" y="45%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="80" font-weight="bold" fill="white"%3E${prenomCapitalized}%3C/text%3E%3Ctext x="50%25" y="55%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="60" fill="white" opacity="0.8"%3E🎉✨🎊%3C/text%3E%3C/svg%3E`
              }}
            />
          </div>

          <div className={styles.actions}>
            <button
              onClick={() => router.push('/')}
              className={styles.button}
            >
              <svg className={styles.buttonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Retour a l'accueil
            </button>

            <button
              onClick={() => {
                const link = document.createElement('a')
                link.href = `/${prenom}.jpg`
                link.download = `${prenom}.jpg`
                link.click()
              }}
              className={`${styles.button} ${styles.buttonSecondary}`}
            >
              <svg className={styles.buttonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Telecharger l'image
            </button>
          </div>

          {imageError && (
            <p className={styles.errorMessage}>
              Note : L'image {prenom}.jpg n'a pas ete trouvee. Un placeholder est affiche a la place.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
