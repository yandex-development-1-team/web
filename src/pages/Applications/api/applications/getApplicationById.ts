import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'
import { mapApplicationToSpecialProject } from './applications.mapper'
import type { ApplicationDTO } from './types'

export const getApplicationById = async (id: string) => {
  const response = await api.get<ApplicationDTO>(API_ROUTES.applications.byId(id))

  if (!response.data) throw new Error('Faild to get application')

  const application = mapApplicationToSpecialProject(response.data)

  return application
}
