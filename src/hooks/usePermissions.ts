import { useMemo, useCallback } from 'react'
import { jwtDecode } from 'jwt-decode'
import { tokenStorage } from '@/app/providers/axios/lib/tokenStorageInstance'
import { useAccessSettings } from './useAccessSettings'
import type { TokenPayload } from '@/app/providers/axios/types/api'

export { PERMISSIONS } from '@/app/router/permissions'

export const usePermissions = () => {
  const token = tokenStorage.getToken()

  const decodedToken = useMemo(() => {
    if (!token) return null
    try {
      return jwtDecode<TokenPayload>(token)
    } catch {
      tokenStorage.removeToken()
      console.error('Invalid token')
      return null
    }
  }, [token])

  const roleServerId = decodedToken?.role

  const { accessSettings = [], isLoadingAccessSettings } = useAccessSettings(roleServerId)

  const isLoading = !!roleServerId && isLoadingAccessSettings

  const isLoggedIn = !!roleServerId

  const hasAccess = useCallback(
    (code: string): boolean => {
      return accessSettings?.includes(code) || roleServerId === 'admin'
    },
    [accessSettings, roleServerId]
  )

  const hasRole = useCallback(
    (role: string) => {
      if (role === 'admin') return roleServerId === 'admin'
      if (role === 'manager') return roleServerId?.startsWith('manager')
      return false
    },
    [roleServerId]
  )

  return {
    hasRole,
    hasAccess,
    isLoggedIn,
    isLoading
  }
}
