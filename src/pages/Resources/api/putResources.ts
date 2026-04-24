import { api } from '@/app/providers/axios'
import type { IResourcesResponseData } from '@/pages/Resources/Resources.types'
import { API_ROUTES } from '@/services/api/routes'

export const putResources = {
  putOrganizationInfo: async (data: Partial<IResourcesResponseData>): Promise<IResourcesResponseData> => {
    const response = await api.put(API_ROUTES.resources.orgInfo, data)

    if (!response.data) throw new Error(`Ошибка сервера: Не удалось обновить информацию об организации`)

    return response.data
  },
  putFaq: async (data: Partial<IResourcesResponseData>): Promise<IResourcesResponseData> => {
    const response = await api.put(API_ROUTES.resources.faq, data)

    if (!response.data) throw new Error(`Ошибка сервера: Не удалось обновить FAQ`)

    return response.data
  },
  putEventSchedule: async (data: Partial<IResourcesResponseData>): Promise<IResourcesResponseData> => {
    const response = await api.put(API_ROUTES.resources.eventSchedule, data)

    if (!response.data) throw new Error(`Ошибка сервера: Не удалось обновить афишу`)

    return response.data
  }
}
