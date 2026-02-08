import type { TokenStorage } from '../types/api'

export const createTokenStorage = (): TokenStorage => ({
  getToken: () => localStorage.getItem('authToken'),
  removeToken: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('refreshToken')
  },
  getRefreshToken: () => localStorage.getItem('refreshToken')
})
