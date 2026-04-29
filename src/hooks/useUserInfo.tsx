import { tokenStorage } from '@/app/providers/axios/lib/tokenStorageInstance'
import { useQuery } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'
import type { TokenPayload } from '@/app/providers/axios/types/api'

export const useUserInfo = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return tokenStorage.getUser()
    },
    initialData: () => tokenStorage.getUser(),
    staleTime: Infinity,
    select: user => {
      const token = tokenStorage.getToken()
      let userGrade = 3
      try {
        if (token) {
          const decoded = jwtDecode<TokenPayload>(token)
          const role = decoded.role || ''
          userGrade = role === 'admin' ? 0 : Number(role.at(-1)) || 3
        }
      } catch {
        console.error('Invalid token')
      }

      return {
        name: user?.name || '',
        photo: user?.photo || '',
        grade: userGrade
      }
    }
  })
}
