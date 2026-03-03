import type { InternalAxiosRequestConfig } from 'axios'
import type { TokenStorage } from '@/app/providers/axios/types/api'

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
    if (token && token.length > 10) {
      return token
    }
    return null
  }
}
