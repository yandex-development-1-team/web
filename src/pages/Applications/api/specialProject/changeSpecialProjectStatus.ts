import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'
import type { TApplicationStatus } from '@/types/applications'
import type { ApplicationDTO } from './types'

export const changeSpecialProjectStatus = async (id: string, { status }: { status: TApplicationStatus }) => {
  const response = await api.put<ApplicationDTO>(API_ROUTES.applications.changeStatus(id), { status })

  if (!response.data) throw new Error('Failed to update status')

  return response.data
}
