import { api } from '@/app/providers/axios'
import { tokenStorage } from '@/app/providers/axios/lib/tokenStorageInstance'
import { useMutation } from '@tanstack/react-query'
import { LoginResponseSchema, type LoginRequest } from '../types'

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const res = await api.post('auth/login', data)

      const parsed = LoginResponseSchema.parse(res.data)

      const { token, refresh_token, user } = parsed

      tokenStorage.setToken(token)
      tokenStorage.setRefreshToken(refresh_token)

      return user
    }
  })
}
