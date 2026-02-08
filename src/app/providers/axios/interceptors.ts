import { api } from './axiosInstance'
import { RequestInterceptor } from './lib/requestInterceptor'
import { ResponseInterceptor } from './lib/responseInterceptor'
import type { TokenStorage, ErrorHandlerConfig } from './types/api'

export const setupInterceptors = (
  tokenStorage: TokenStorage,
  errorConfig: Omit<ErrorHandlerConfig, 'tokenStorage'>
): void => {
  const fullConfig: ErrorHandlerConfig = {
    ...errorConfig,
    tokenStorage
  }

  const requestInterceptor = new RequestInterceptor(tokenStorage)
  const responseInterceptor = new ResponseInterceptor(fullConfig)

  // Интерцептор запросов
  api.interceptors.request.use(
    config => requestInterceptor.intercept(config),
    error => Promise.reject(error)
  )

  // Интерцептор ответов
  api.interceptors.response.use(
    response => responseInterceptor.intercept(response),
    error => responseInterceptor.handleError(error)
  )
}
