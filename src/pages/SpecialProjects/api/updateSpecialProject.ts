import { API_ROUTES } from '@/services/api/routes'
import type { IUpdateSpecialProjecDTO } from '../specialProjects.types'
import { api } from '@/app/providers/axios'

export const updateSpecialProject = async (changedData: IUpdateSpecialProjecDTO) => {
  const response = await api.put<IUpdateSpecialProjecDTO>(
    API_ROUTES.specialProjects.putById(changedData.id.toString()),
    changedData
  )

  if (!response.data) throw new Error(`Failed to update project with id - ${changedData.id}`)

  return response.data
}
