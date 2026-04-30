import { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { ErrorHandler } from '@/app/providers/axios/lib/errorHandler'
import type { ErrorHandlerConfig } from '@/app/providers/axios/types/api'
import { api, refreshApi } from '../axiosInstance'
import { API_ROUTES } from '@/services/api/routes'
import type { ApiError } from '../utils/customErrors'

type FailedRequest = {
  resolve: (token: string) => void
  reject: (error: AxiosError | Error | null) => void
}

let isRefreshing = false
let failedQueue: FailedRequest[] = []

export class ResponseInterceptor {
  private errorHandler: ErrorHandler
  private config: ErrorHandlerConfig

  constructor(config: ErrorHandlerConfig) {
    this.config = config
    this.errorHandler = new ErrorHandler(config)
  }

  public intercept(response: AxiosResponse): AxiosResponse {
    return response
  }

  private processQueue(error: AxiosError | Error | null, token: string | null = null) {
    failedQueue.forEach(prom => {
      if (token) {
        prom.resolve(token)
      } else {
        prom.reject(error)
      }
    })
    failedQueue = []
  }

  public async handleError(error: unknown): Promise<AxiosResponse | ApiError> {
    const axiosError = error as AxiosError
    const originalRequest = axiosError.config as InternalAxiosRequestConfig & { _retry?: boolean }

    const isAuthRoute =
      originalRequest?.url?.includes(API_ROUTES.passwordReset) || originalRequest?.url?.includes(API_ROUTES.login)

    if (isAuthRoute) {
      return Promise.reject(axiosError)
    }

    if (originalRequest?.url?.includes(API_ROUTES.refreshToken)) {
      isRefreshing = false
      this.processQueue(axiosError, null)
      this.config.onUnauthorized()
      return Promise.reject(axiosError)
    }

    if (axiosError.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(token => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            return api(originalRequest)
          })
          .catch(err => {
            return this.errorHandler.handleError(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = this.config.tokenStorage.getRefreshToken()
        if (!refreshToken) {
          throw new Error('NO_REFRESH_TOKEN')
        }

        const { data } = await refreshApi.post(API_ROUTES.refreshToken, {
          refresh_token: refreshToken
        })

        const { token, refresh_token } = data
        this.config.tokenStorage.setToken(token)
        this.config.tokenStorage.setRefreshToken(refresh_token)

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`
        }

        this.processQueue(null, token)
        return api(originalRequest)
      } catch (refreshError) {
        this.processQueue(refreshError as AxiosError | Error, null)
        this.config.onUnauthorized()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return this.errorHandler.handleError(error)
  }
}
