import { useQuery } from '@tanstack/react-query'
import { MOCK_USER } from '@/mockData/mockData'

export { PERMISSIONS } from '@/app/router/permissions'

export const usePermissions = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['userPermissions'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return MOCK_USER
    },
    staleTime: Infinity
  })

  const permissions = data?.permissions?.items || []
  const roleReceived = data?.role || ''
  const isLoggedIn = !!roleReceived
  
  const hasAccess = (code: string) => permissions.includes(code)
  const hasRole = (role: string) => role === roleReceived

  return { hasRole, hasAccess, isLoading, isLoggedIn, user: data }
}
