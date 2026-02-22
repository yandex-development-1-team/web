import { useEffect, useRef, type ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { setupInterceptors } from '@/app/providers/axios/interceptors'
import { createTokenStorage } from '@/app/providers/axios/lib/tokenStorage'
import { useNotification } from '@/app/providers/notification'
import { ROUTES } from '@/app/router/routes'

interface Props {
  children: ReactNode
}

export const AxiosProvider = ({ children }: Props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { showNotification } = useNotification()
  const isInitialized = useRef(false)
  const isRedirecting = useRef(false)

  useEffect(() => {
    if (isInitialized.current) return

    const tokenStorage = createTokenStorage()

    setupInterceptors(tokenStorage, {
      onUnauthorized: () => {
        tokenStorage.removeToken()
        if (location.pathname !== ROUTES.login && !isRedirecting.current) {
          isRedirecting.current = true

          navigate(`${ROUTES.login}?reason=session_expired`)

          setTimeout(() => {
            isRedirecting.current = false
          }, 1000)
        }
      },
      onForbidden: () => {
        navigate(ROUTES.forbidden)
      },
      onServerError: msg => {
        showNotification({
          status: 'error',
          message: msg || 'Ошибка сервера'
        })
      },
      onNetworkError: () => {
        showNotification({
          status: 'error',
          message: 'Проблемы с сетью'
        })
      },
      onCriticalError: (status, msg) => {
        showNotification({
          status: 'error',
          message: `Критическая ошибка ${status}: ${msg || 'Неизвестная ошибка'}`
        })
      }
    })

    isInitialized.current = true
  }, [navigate, showNotification, location])

  return <>{children}</>
}
