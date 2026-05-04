import type { TokenStorage, UserLoginInfo } from '../types/api'

export const createTokenStorage = (): TokenStorage => ({
  getToken: () => localStorage.getItem('accessToken'),
  setToken: (token: string) => localStorage.setItem('accessToken', token),
  removeToken: () => localStorage.removeItem('accessToken'),

  getRefreshToken: () => localStorage.getItem('refreshToken'),
  setRefreshToken: (token: string) => localStorage.setItem('refreshToken', token),
  removeRefreshToken: () => localStorage.removeItem('refreshToken'),

  getUser: (): UserLoginInfo | null => {
    const user = localStorage.getItem('user_profile')
    return user ? JSON.parse(user) : null
  },
  setUser: (user: UserLoginInfo) => {
    localStorage.setItem('user_profile', JSON.stringify(user))
  },
  removeUser: () => localStorage.removeItem('user_profile')
})
