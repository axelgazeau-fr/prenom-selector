'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import styles from './page.module.css'

interface UserStatus {
  raphael: boolean
  papa: boolean
  maman: boolean
  marion: boolean
  guillaume: boolean
  valentine: boolean
}

function WaitingContent() {
  const searchParams = useSearchParams()
  const prenom = searchParams.get('prenom') || ''
  const [userStatus, setUserStatus] = useState<UserStatus>({
    raphael: false,
    papa: false,
    maman: false,
    marion: false,
    guillaume: false,
    valentine: false
  })
  const [showImage, setShowImage] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (!prenom) return

    const connectWebSocket = async () => {
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prenom })
        })
        
        const data = await response.json()
        setUserStatus(data.users)
        setIsConnected(true)

        const interval = setInterval(async () => {
          const statusResponse = await fetch('/api/status')
          const statusData = await statusResponse.json()
          setUserStatus(statusData.users)
          
          const allConnected = Object.values(statusData.users).every(Boolean)
          if (allConnected && !showImage) {
            setShowImage(true)
          }
        }, 1000)

        return () => clearInterval(interval)
      } catch (error) {
        console.error('Erreur de connexion:', error)
      }
    }

    connectWebSocket()
  }, [prenom, showImage])

  useEffect(() => {
    const allConnected = Object.values(userStatus).every(Boolean)
    if (allConnected && !showImage) {
      setTimeout(() => setShowImage(true), 500)
    }
  }, [userStatus, showImage])

  const prenomCapitalized = prenom.charAt(0).toUpperCase() + prenom.slice(1)
  const connectedCount = Object.values(userStatus).filter(Boolean).length

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {!showImage ? (
          <>
            <div className={styles.statusBadge}>
              <div className={`${styles.statusDot} ${isConnected ? styles.connected : ''}`} />
              {isConnected ? 'Connecte' : 'Connexion...'}
            </div>

            <h1 className={styles.title}>
              Bienvenue,
              <span className={styles.titleAccent}> {prenomCapitalized}</span>
            </h1>

            <p className={styles.subtitle}>
              {connectedCount < 6 
                ? 'En attente des autres participants...'
                : 'Tout le monde est la ! Revelation en cours...'}
            </p>

            <div className={styles.statusGrid}>
              {Object.entries(userStatus).map(([name, connected]) => (
                <div 
                  key={name} 
                  className={`${styles.statusCard} ${connected ? styles.active : ''}`}
                >
                  <div className={styles.avatar}>
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <div className={styles.statusName}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </div>
                  <div className={styles.statusIndicator}>
                    {connected ? (
                      <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M20 6L9 17l-5-5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <div className={styles.pendingDot} />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.progress}>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{ width: `${(connectedCount / 6) * 100}%` }}
                />
              </div>
              <p className={styles.progressText}>
                {connectedCount} / 6 participants connectes
              </p>
            </div>
          </>
        ) : (
          <div className={styles.reveal}>
            <h2 className={styles.revealTitle}>
              Votre image personnalisee !
            </h2>
            <div className={styles.imageContainer}>
              <img 
                src={`/${prenom.toLowerCase()}.jpg`}
                alt={`Image pour ${prenomCapitalized}`} 
                className={styles.revealImage}
                onError={(e) => {
                  e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23667eea" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="40" fill="white"%3E${prenomCapitalized} !%3C/text%3E%3C/svg%3E`
                }}
              />
            </div>
            <p className={styles.revealMessage}>
              Merci d'avoir participe, {prenomCapitalized} !
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

export default function WaitingPage() {
  return (
    <Suspense fallback={
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: 'white'
      }}>
        Chargement...
      </div>
    }>
      <WaitingContent />
    </Suspense>
  )
}
