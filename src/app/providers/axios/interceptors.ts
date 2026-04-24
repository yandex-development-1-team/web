import { api } from '@/app/providers/axios/axiosInstance'
import { RequestInterceptor } from '@/app/providers/axios/lib/requestInterceptor'
import { ResponseInterceptor } from '@/app/providers/axios/lib/responseInterceptor'
import type { TokenStorage, ErrorHandlerConfig } from '@/app/providers/axios/types/api'

export const setupInterceptors = (
  tokenStorage: TokenStorage,
  errorConfig: Omit<ErrorHandlerConfig, 'tokenStorage'>
): (() => void) => {
  const fullConfig: ErrorHandlerConfig = {
    ...errorConfig,
    tokenStorage
  }

  const requestInterceptor = new RequestInterceptor(tokenStorage)
  const responseInterceptor = new ResponseInterceptor(fullConfig)

  const reqInterceptor = api.interceptors.request.use(
    config => requestInterceptor.intercept(config),
    error => Promise.reject(error)
  )

  const resInterceptor = api.interceptors.response.use(
    response => responseInterceptor.intercept(response),
    error => responseInterceptor.handleError(error)
  )

  return () => {
    api.interceptors.request.eject(reqInterceptor)
    api.interceptors.response.eject(resInterceptor)
  }
}
