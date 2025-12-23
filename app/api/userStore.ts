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

// Utiliser global pour persister l'état entre les invocations
declare global {
  var userStatusStore: UserStatus | undefined
}

class UserStore {
  private getUsers(): UserStatus {
    if (!global.userStatusStore) {
      global.userStatusStore = {
        raphael: false,
        papa: false,
        maman: false,
        marion: false,
        guillaume: false,
        valentine: false
      }
    }
    return global.userStatusStore
  }

  getAll(): UserStatus {
    return { ...this.getUsers() }
  }

  setUser(prenom: keyof UserStatus, status: boolean): UserStatus {
    const users = this.getUsers()
    users[prenom] = status
    global.userStatusStore = users
    return this.getAll()
  }

  reset(): UserStatus {
    global.userStatusStore = {
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
    return Object.values(this.getUsers()).every(Boolean)
  }

  getCount(): number {
    return Object.values(this.getUsers()).filter(Boolean).length
  }
}

// Singleton instance
const userStore = new UserStore()
export default userStore
