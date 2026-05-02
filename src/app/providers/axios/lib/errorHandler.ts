import type { ApiErrorResponse, ErrorHandlerConfig } from '@/app/providers/axios/types/api'
import { ApiError, CancelledRequestError, NetworkError } from '@/app/providers/axios/utils/customErrors'
import type { AxiosError } from 'axios'
import axios from 'axios'

export class ErrorHandler {
  private isHandlingError = false
  private config: ErrorHandlerConfig

  constructor(config: ErrorHandlerConfig) {
    this.config = config
  }

  public handleError(error: unknown): ApiError {
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
    if (axios.isCancel(error)) {
      throw new CancelledRequestError()
    }

    // const axiosError = error as AxiosError<ApiErrorResponse['data']>
    const axiosError = error as AxiosError<ApiErrorResponse>
    if (!axiosError.response) {
      this.config.onNetworkError()
      throw new NetworkError()
    }

    const { status, data } = axiosError.response

    const combinedMessage = Array.isArray(data.errors) ? data.errors.join('. ') : `Ошибка ${status}`

    // const apiError = new ApiError(status, data?.code || `HTTP_${status}`, data?.details)
    const apiError = new ApiError(status, `HTTP_${status}`, combinedMessage)

    // this.handleByStatus(status, data?.[0] || apiError.message)
    this.handleByStatus(status, combinedMessage || apiError.message)

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
      case 409:
        this.config.onConflict(message)
        break
      case 500:
        this.config.onServerError(message)
        break
      default:
        if (this.config.isCriticalError?.(status)) {
          this.config.onCriticalError?.(status, message)
        }
    }
  }

  private handleUnauthorized(): void {
    this.config.onUnauthorized()
  }
}
