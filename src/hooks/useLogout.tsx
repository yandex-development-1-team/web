import { api } from '@/app/providers/axios'
import { tokenStorage } from '@/app/providers/axios/lib/tokenStorageInstance'
import { ROUTES } from '@/app/router'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { API_ROUTES } from '@/services/api/routes'

export const useLogout = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const logout = async () => {
    try {
      await api.post(API_ROUTES.logout, {
        refresh_token: tokenStorage.getRefreshToken()
      })
    } catch (e) {
      console.error('Logout on backend failed', e)
    } finally {
      tokenStorage.removeToken()
      tokenStorage.removeRefreshToken()
      tokenStorage.removeUser()

      queryClient.clear()

      navigate(ROUTES.login, { replace: true })
    }
  }

  return { logout }
}
