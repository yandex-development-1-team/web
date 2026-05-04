import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'

export const deleteSpecProject = async (id: number) => {
  const response = await api.delete(API_ROUTES.specialProjects.byId(`${id}`))

  if (!response) throw new Error('Failed to delete project')

  return response.data
}
