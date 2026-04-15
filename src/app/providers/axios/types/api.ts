export interface ApiErrorData {
  message: string
  code?: string
  details?: unknown
}

export interface ApiErrorResponse {
  status: number
  data: ApiErrorData
  originalError: unknown
}

export interface TokenStorage {
  getToken: () => string | null
  setToken: (token: string) => void
  removeToken: () => void

  getRefreshToken: () => string | null
  setRefreshToken: (token: string) => void
  removeRefreshToken: () => void
}

export interface ErrorHandlerConfig {
  tokenStorage: TokenStorage
  onUnauthorized: () => void
  onForbidden: (message: string) => void
  onServerError: (message: string) => void
  onNetworkError: () => void
  isCriticalError?: (status: number) => boolean
  onCriticalError?: (status: number, message: string) => void
}
