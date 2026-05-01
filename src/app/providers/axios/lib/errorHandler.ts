import axios from 'axios'
import type { AxiosError } from 'axios'
import { ApiError, NetworkError, CancelledRequestError } from '@/app/providers/axios/utils/customErrors'
import type { ApiErrorResponse, ErrorHandlerConfig } from '@/app/providers/axios/types/api'

export class ErrorHandler {
  private isHandlingError = false
  private config: ErrorHandlerConfig

  constructor(config: ErrorHandlerConfig) {
    this.config = config
  }

  public handleError(error: unknown): ApiError | CancelledRequestError | NetworkError {
    if (this.isHandlingError) {
      return new ApiError(500, 'RECURSIVE_ERROR', 'Internal error')
    }

    this.isHandlingError = true

    try {
      return this.processError(error)
    } finally {
      this.isHandlingError = false
    }
  }

  private processError(error: unknown): ApiError | CancelledRequestError | NetworkError {
    if (axios.isCancel(error)) {
      return new CancelledRequestError()
    }

    const axiosError = error as AxiosError<ApiErrorResponse>

    if (!axiosError.response) {
      this.config.onNetworkError()
      throw new NetworkError()
    }

    const { status, data } = axiosError.response
    const combinedMessage = data?.errors
      ? (Array.isArray(data.errors) ? data.errors.join('. ') : String(data.errors))
      : 'Ошибка' + (status ? ` ${status}` : '')

    const apiError = new ApiError(status, `HTTP_${status}`, combinedMessage)

    this.handleByStatus(status, combinedMessage)

    return apiError
  }

  private handleByStatus(status: number, message: string): void {
    switch (status) {
      case 401:
        this.config.onUnauthorized()
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
}
