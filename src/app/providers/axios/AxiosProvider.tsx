import { useEffect, useRef, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { setupInterceptors } from '@/app/providers/axios/interceptors'
import { createTokenStorage } from '@/app/providers/axios/lib/tokenStorage'
import { useNotification } from '@/app/providers/notification'

interface Props {
  children: ReactNode
}

export const AxiosProvider = ({ children }: Props) => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const isInitialized = useRef(false)

  useEffect(() => {
    if (isInitialized.current) return

    const tokenStorage = createTokenStorage()

    setupInterceptors(tokenStorage, {
      onUnauthorized: () => {
        if (!window.location.pathname.includes('/login')) {
          navigate('/login?reason=session_expired')
        }
      },
      onForbidden: () => {
        navigate('/403')
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
      }
    })

    isInitialized.current = true
  }, [navigate, showNotification])

  return <>{children}</>
}
