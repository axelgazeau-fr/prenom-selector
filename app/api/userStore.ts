// Gestion de l'état partagé pour les utilisateurs
// En production, utilisez Redis, une base de données, ou Vercel KV

interface UserStatus {
  raphael: boolean
  papa: boolean
  maman: boolean
  marion: boolean
  guillaume: boolean
  valentine: boolean
}

class UserStore {
  private users: UserStatus = {
    raphael: false,
    papa: false,
    maman: false,
    marion: false,
    guillaume: false,
    valentine: false
  }

  getAll(): UserStatus {
    return { ...this.users }
  }

  setUser(prenom: keyof UserStatus, status: boolean): UserStatus {
    this.users[prenom] = status
    return this.getAll()
  }

  reset(): UserStatus {
    this.users = {
      raphael: false,
      papa: false,
      maman: false,
      marion: false,
      guillaume: false,
      valentine: false
    }
    return this.getAll()
  }

  allConnected(): boolean {
    return Object.values(this.users).every(Boolean)
  }

  getCount(): number {
    return Object.values(this.users).filter(Boolean).length
  }
}

// Singleton instance
const userStore = new UserStore()
export default userStore
