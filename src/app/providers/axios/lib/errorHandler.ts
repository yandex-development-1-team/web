import axios from 'axios'
import type { AxiosError } from 'axios'
import { ApiError, NetworkError, CancelledRequestError } from '../utils/customErrors'
import type { ApiErrorResponse, ErrorHandlerConfig } from '../types/api'

export class ErrorHandler {
  private isHandlingError = false
  private readonly criticalStatuses = [401, 403, 500]
  private config: ErrorHandlerConfig

  constructor(config: ErrorHandlerConfig) {
    this.config = config
  }

  public handleError(error: unknown): ApiError {
    // Защита от рекурсии
    if (this.isHandlingError) {
      return new ApiError(500, 'RECURSIVE_ERROR')
    }

    this.isHandlingError = true

    try {
      return this.processError(error)
    } finally {
      this.isHandlingError = false
    }
  }

  private processError(error: unknown): ApiError {
    // Обработка отмененных запросов
    if (axios.isCancel(error)) {
      throw new CancelledRequestError()
    }

    const axiosError = error as AxiosError<ApiErrorResponse['data']>

    // Обработка сетевых ошибок (без ответа от сервера)
    if (!axiosError.response) {
      this.config.onNetworkError()
      throw new NetworkError()
    }

    const { status, data } = axiosError.response

    const apiError = new ApiError(status, data?.code || `HTTP_${status}`, data?.details)

    // Обработка в зависимости от статуса
    this.handleByStatus(status, data.message || apiError.message)

    return apiError
  }

  private handleByStatus(status: number, message: string): void {
    switch (status) {
      case 401:
        this.handleUnauthorized()
        break
      case 403:
        this.config.onForbidden(message)
        break
      case 500:
        this.config.onServerError(message)
        break
      default:
        // Не критические ошибки логируются, но не вызывают специальных действий
        if (this.config.isCriticalError?.(status) || this.criticalStatuses.includes(status)) {
          console.warn(`Critical error ${status}:`, message)
        }
    }
  }

  private handleUnauthorized(): void {
    // Очищаем токены перед вызовом колбэка
    this.config.tokenStorage.removeToken()
    this.config.onUnauthorized()
  }

  public isCritical(status: number): boolean {
    return this.criticalStatuses.includes(status)
  }
}
