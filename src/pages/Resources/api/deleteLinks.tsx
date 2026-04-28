import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'

export const deleteLinks = {
  OrganizationLink: async (id: string) => {
    const response = await api.delete(`${API_ROUTES.resources.orgInfo}/${id}`)

    if (!response.data) throw new Error(`Ошибка сервера: Не удалось удалить ссылку организации`)

    return response.data
  },

  FaqLink: async (id: string) => {
    const response = await api.delete(`${API_ROUTES.resources.faq}/${id}`)

    if (!response.data) throw new Error(`Ошибка сервера: Не удалось удалить ссылку FAQ`)

    return response.data
  },

  EventScheduleLink: async (id: string) => {
    const response = await api.delete(`${API_ROUTES.resources.eventSchedule}/${id}`)

    if (!response.data) throw new Error(`Ошибка сервера: Не удалось удалить ссылку афиши`)

    return response.data
  }
}
