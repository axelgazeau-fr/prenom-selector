'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'

const prenoms = ['lynda', 'raphael', 'marion']

export default function Home() {
  const [selectedPrenom, setSelectedPrenom] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedPrenom) {
      router.push(`/waiting?prenom=${selectedPrenom}`)
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.decorCircle} />
        <div className={styles.decorCircle2} />
        
        <h1 className={styles.title}>
          Choisissez votre
          <span className={styles.titleAccent}> prénom</span>
        </h1>
        
        <p className={styles.subtitle}>
          Une expérience magique vous attend de l'autre côté
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.selectWrapper}>
            <select
              value={selectedPrenom}
              onChange={(e) => setSelectedPrenom(e.target.value)}
              className={styles.select}
              required
            >
              <option value="" disabled>Sélectionnez un prénom...</option>
              {prenoms.map((prenom) => (
                <option key={prenom} value={prenom}>
                  {prenom.charAt(0).toUpperCase() + prenom.slice(1)}
                </option>
              ))}
            </select>
            <div className={styles.selectArrow}>▼</div>
          </div>

          <button 
            type="submit" 
            className={styles.button}
            disabled={!selectedPrenom}
          >
            Continuer
            <span className={styles.buttonArrow}>→</span>
          </button>
        </form>

        <div className={styles.info}>
          <svg className={styles.infoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
            <path d="M12 16v-4M12 8h.01" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>Attendez que tout le monde ait choisi pour révéler la surprise</span>
        </div>
      </div>
    </main>
  )
}
