import { API_ROUTES } from '@/services/api/routes'
import { api } from '@/app/providers/axios'
import type { TPagination, IProjectQueryParams, ISpecialProjectsResponse } from '../specialProjects.types'
import { mapProjectToIProject } from './specProject.mappers'
import type { IProject } from '@/types/solutions'

interface ISpecProject {
  items: IProject[]
  pagination: TPagination
}

export const getSpecialProjects = async ({ params }: { params: IProjectQueryParams }): Promise<ISpecProject> => {
  const response = await api.get<ISpecialProjectsResponse>(API_ROUTES.specialProjects.get, {
    params
  })

  if (!response.data) throw new Error('Failed to get special projects')

  const projects = response.data.items.map(item => mapProjectToIProject(item))

  return {
    items: projects,
    pagination: response.data.pagination
  }
}
