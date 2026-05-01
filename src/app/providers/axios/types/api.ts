import type { TRoleServerId } from '@/services/api/accessSettings'

export interface ApiErrorData {
  message: string
  code?: string
  details?: unknown
}

export interface ApiErrorResponse {
  errors: string[]
}

export type UserLoginInfo = {
  name: string
  photo: string
}

export type UserLoginInfo = {
  name: string
  photo: string
}

export interface TokenStorage {
  getToken: () => string | null
  setToken: (token: string) => void
  removeToken: () => void

  getRefreshToken: () => string | null
  setRefreshToken: (token: string) => void
  removeRefreshToken: () => void

  getUser: () => UserLoginInfo | null
  setUser: (user: UserLoginInfo) => void
  removeUser: () => void
}

export interface ErrorHandlerConfig {
  tokenStorage: TokenStorage
  onUnauthorized: () => void
  onForbidden: (message: string) => void
  onServerError: (message: string) => void
  onConflict: (message: string) => void
  onNetworkError: () => void
  isCriticalError?: (status: number) => boolean
  onCriticalError?: (status: number, message: string) => void
}

export interface TokenPayload {
  user_id: number
  role: TRoleServerId
  exp: number
  iat: number
}
