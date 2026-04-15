import { useQuery } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'
import { api } from '@/app/providers/axios'
import { tokenStorage } from '@/app/providers/axios/lib/tokenStorageInstance'
import { API_ROUTES } from '@/services/api/routes'

export { PERMISSIONS } from '@/app/router/permissions'

interface TokenPayload {
  user_id: number
  role: string
  exp: number
  iat: number
}

export const usePermissions = () => {
  const token = tokenStorage.getToken()
  let decodedToken: TokenPayload | null = null
  try {
    if (token) decodedToken = jwtDecode<TokenPayload>(token)
  } catch (e) {
    tokenStorage.removeToken()
    decodedToken = null
    console.error('Invalid token', e)
  }

  const { data: userDetails, isLoading } = useQuery({
    queryKey: ['user', decodedToken?.user_id ?? 'guest'],
    queryFn: async () => {
      if (!decodedToken?.user_id) return null

      const res = await api.get(`${API_ROUTES.users}/${decodedToken.user_id}`)
      return res.data || null
    },
    enabled: !!decodedToken?.user_id,
    staleTime: 5 * 60 * 1000
  })

  const permissions = userDetails?.permissions?.items || []
  const roleReceived = decodedToken?.role || ''

  const isLoggedIn = !!decodedToken?.role

  const hasAccess = (code: string) => permissions.includes(code) || roleReceived === 'admin'
  const hasRole = (role: string) => role === roleReceived

  return {
    hasRole,
    hasAccess,
    isLoading: isLoggedIn && isLoading,
    isLoggedIn,
    user: decodedToken ? { ...decodedToken, ...userDetails } : null
  }
}
