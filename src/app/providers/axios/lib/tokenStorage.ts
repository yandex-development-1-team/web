import type { TokenStorage } from '@/app/providers/axios/types/api'

export const createTokenStorage = (): TokenStorage => ({
  getToken: () => null,
  removeToken: () => {}
})
