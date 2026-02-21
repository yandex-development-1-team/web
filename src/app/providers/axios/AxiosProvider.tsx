import { useEffect, useRef, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { setupInterceptors } from '@/app/providers/axios/interceptors'
import { createTokenStorage } from '@/app/providers/axios/lib/tokenStorage'

interface Props {
  children: ReactNode
}

export const AxiosProvider = ({ children }: Props) => {
  const navigate = useNavigate()
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
      onForbidden: msg => console.error('Доступ запрещен:', msg),
      onServerError: msg => console.error('Ошибка сервера:', msg),
      onNetworkError: () => console.warn('Проблемы с сетью')
    })

    isInitialized.current = true
  }, [navigate])

  return <>{children}</>
}
