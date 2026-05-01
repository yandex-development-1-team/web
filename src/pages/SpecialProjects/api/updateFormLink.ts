import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'
import type { TResources } from '../specialProjects.types'

export const updateFormLink = async (data: TResources): Promise<TResources> => {
  const response = await api.put(API_ROUTES.specialProjects.getFormLink, data)

  if (!response) throw new Error('Failed to update form link')

  return response.data
}
