import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'

export const deleteSpecialProjectById = async (id: string) => {
  const response = await api.delete(API_ROUTES.applications.byId(id))

  if (!response) throw new Error('Failed to delete booking')
}
