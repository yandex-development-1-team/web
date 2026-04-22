import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { setupInterceptors } from '@/app/providers/axios/interceptors'
import { useNotification } from '@/app/providers/notification'
import { ROUTES } from '@/app/router/routes'
import { tokenStorage } from './lib/tokenStorageInstance'

interface Props {
  children: ReactNode
}

export const AxiosProvider = ({ children }: Props) => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const isRedirecting = useRef(false)

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const cleanup = setupInterceptors(tokenStorage, {
      onUnauthorized: () => {
        const isAtLogin = window.location.pathname === ROUTES.login

        if (!isAtLogin && !isRedirecting.current) {
          isRedirecting.current = true

          tokenStorage.removeToken()
          tokenStorage.removeRefreshToken()

          navigate(`${ROUTES.login}?reason=session_expired`, { replace: true })

          setTimeout(() => {
            isRedirecting.current = false
          }, 200)
        }
      },
      onForbidden: () => {
        showNotification({
          status: 'error',
          message: 'Нет доступа'
        })
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

    setTimeout(() => {
      setIsReady(true)
    }, 0)

    return () => {
      cleanup()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isReady) return null

  return <>{children}</>
}
