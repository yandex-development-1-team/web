import { api } from '@/app/providers/axios'
import type { TResources } from '../specialProjects.types'
import { API_ROUTES } from '@/services/api/routes'

export const uploadPresentation = async (data: FormData): Promise<TResources> => {
  const response = await api.put(API_ROUTES.specialProjects.putPresentation, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  if (!response) throw new Error('Failed to upload presentation')

  return response.data
}
