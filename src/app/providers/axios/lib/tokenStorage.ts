import type { TokenStorage } from '../types/api'

export const createTokenStorage = (): TokenStorage => ({
  getToken: () => localStorage.getItem('accessToken'),
  setToken: (token: string) => localStorage.setItem('accessToken', token),
  removeToken: () => localStorage.removeItem('accessToken'),

  getRefreshToken: () => localStorage.getItem('refreshToken'),
  setRefreshToken: (token: string) => localStorage.setItem('refreshToken', token),
  removeRefreshToken: () => localStorage.removeItem('refreshToken')
})
