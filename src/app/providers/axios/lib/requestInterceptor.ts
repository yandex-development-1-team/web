import type { InternalAxiosRequestConfig } from 'axios'
import type { TokenStorage } from '../types/api'

export class RequestInterceptor {
  private tokenStorage: TokenStorage

  constructor(tokenStorage: TokenStorage) {
    this.tokenStorage = tokenStorage
  }
  public intercept(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const token = this.getValidToken()
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }

  private getValidToken(): string | null {
    const token = this.tokenStorage.getToken()
    // Базовая валидация токена
    if (token && token.length > 10) {
      return token
    }
    return null
  }
}
