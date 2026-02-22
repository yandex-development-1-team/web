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

    const axiosError = error as AxiosError<ApiErrorResponse['data']>

    if (!axiosError.response) {
      this.config.onNetworkError()
      throw new NetworkError()
    }

    const { status, data } = axiosError.response

    const apiError = new ApiError(status, data?.code || `HTTP_${status}`, data?.details)

    this.handleByStatus(status, data?.message || apiError.message)

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
        if (this.config.isCriticalError?.(status)) {
          this.config.onCriticalError?.(status, message)
        }
    }
  }

  private handleUnauthorized(): void {
    this.config.onUnauthorized()
  }
}
