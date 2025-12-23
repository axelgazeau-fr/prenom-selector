// Gestion de l'état partagé pour les utilisateurs
// En production, utilisez Redis, une base de données, ou Vercel KV

interface UserStatus {
  lynda: boolean
  raphael: boolean
  marion: boolean
}

class UserStore {
  private users: UserStatus = {
    lynda: false,
    raphael: false,
    marion: false
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
      lynda: false,
      raphael: false,
      marion: false
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
