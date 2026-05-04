import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'

export type TRoleServerId = 'admin' | 'manager_1' | 'manager_2' | 'manager_3'
export type TAccessSettingsArray = string[]
export type AccessSettingsDTO = {
  role: TRoleServerId
  permissions: TAccessSettingsArray
}

export const getAccessSettings = async (roleServerId: TRoleServerId) => {
  const response = await api.get<AccessSettingsDTO>(API_ROUTES.settings.permissions(roleServerId))
  return response.data.permissions || []
}

export const postAccessSettings = ({
  data,
  roleServerId
}: {
  data: TAccessSettingsArray
  roleServerId: TRoleServerId
}) => {
  return api.post<void>(API_ROUTES.settings.permissions(), {
    role: roleServerId,
    permissions: data
  } as AccessSettingsDTO)
}
