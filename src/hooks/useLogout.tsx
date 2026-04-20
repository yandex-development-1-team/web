import { api } from '@/app/providers/axios'
import { tokenStorage } from '@/app/providers/axios/lib/tokenStorageInstance'
import { useQueryClient } from '@tanstack/react-query'
import { API_ROUTES } from '@/services/api/routes'

export const useLogout = () => {
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

      queryClient.clear()
    }
  }

  return { logout }
}
