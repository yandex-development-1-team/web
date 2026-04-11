import { api } from '@/app/providers/axios'
import { tokenStorage } from '@/app/providers/axios/lib/tokenStorageInstance'
import { ROUTES } from '@/app/router'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const logout = async () => {
    await api.post('/auth/logout', {
      refresh_token: tokenStorage.getRefreshToken()
    })

    tokenStorage.removeToken()
    tokenStorage.removeRefreshToken()

    queryClient.clear()

    navigate(ROUTES.login, { replace: true })
  }

  return { logout }
}
