import type { AxiosResponse } from 'axios'
import { ErrorHandler } from '@/app/providers/axios/lib/errorHandler'
import type { ErrorHandlerConfig } from '@/app/providers/axios/types/api'

export class ResponseInterceptor {
  private errorHandler: ErrorHandler

  constructor(config: ErrorHandlerConfig) {
    this.errorHandler = new ErrorHandler(config)
  }

  public intercept(response: AxiosResponse): AxiosResponse {
    return response
  }

  public handleError(error: unknown): never {
    const apiError = this.errorHandler.handleError(error)
    throw apiError
  }
}
