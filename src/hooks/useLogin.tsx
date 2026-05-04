import { api } from '@/app/providers/axios'
import { useQueryClient } from '@tanstack/react-query'
import { tokenStorage } from '@/app/providers/axios/lib/tokenStorageInstance'
import { useMutation } from '@tanstack/react-query'
import { LoginResponseSchema, type LoginRequest } from '../pages/Login/types'
import { API_ROUTES } from '@/services/api/routes'
import type { UserLoginInfo } from '@/app/providers/axios/types/api'

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const res = await api.post(API_ROUTES.login, data)
      const { token, refresh_token, user } = LoginResponseSchema.parse(res.data)

      tokenStorage.setToken(token)
      tokenStorage.setRefreshToken(refresh_token)

      const profile: UserLoginInfo = {
        name: user.name || '',
        photo: user.image || ''
      }
      tokenStorage.setUser(profile)

      return user
    },
    onSuccess: user => {
      queryClient.setQueryData(['user'], user)
    }
  })
}
