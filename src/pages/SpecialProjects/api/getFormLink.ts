import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'
import type { TResources } from '../specialProjects.types'

export const getFormLink = async (): Promise<TResources> => {
  const response = await api.get(API_ROUTES.specialProjects.getFormLink)

  if (!response) throw new Error('Failed to get form link')

  return response.data
}
