import { api } from '@/app/providers/axios'
import type { ICreateSpecialProjectDTO, ISpecialProject } from '../specialProjects.types'
import { API_ROUTES } from '@/services/api/routes'

export const createSpecialProject = async (data: ICreateSpecialProjectDTO): Promise<ISpecialProject> => {
  const response = await api.post(API_ROUTES.specialProjects.post, data)

  if (!response.data) throw new Error('Failed to create special projects')

  return response.data
}
