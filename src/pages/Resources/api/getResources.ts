import { api } from '@/app/providers/axios'
import type { IResourcesResponseData } from '@/pages/Resources/Resources.types'
import { API_ROUTES } from '@/services/api/routes'

export const getResources = {
  getOrganizationInfo: async (): Promise<IResourcesResponseData> => {
    const response = await api.get(API_ROUTES.resources.orgInfo)

    if (!response.data) throw new Error(`Ошибка сервера: Не удалось получить информацию об организации`)

    return response.data
  },
  getFaq: async (): Promise<IResourcesResponseData> => {
    const response = await api.get(API_ROUTES.resources.faq)

    if (!response.data) throw new Error(`Ошибка сервера: Не удалось получить FAQ`)

    return response.data
  },
  getEventSchedule: async (): Promise<IResourcesResponseData> => {
    const response = await api.get(API_ROUTES.resources.eventSchedule)

    if (!response.data) throw new Error(`Ошибка сервера: Не удалось получить афишу`)

    return response.data
  }
}
