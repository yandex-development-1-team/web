import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'
import type { ApplicationListItemType, ApplicationParamsType } from '../../applications.types'
import type { ApplicationsPesponseType } from '../types'
import { mapApplicationListItem } from './applications.mapper'
import type { ApplicationListResponseDTO } from './types'

export const getApplications = async (
  { params }: { params: ApplicationParamsType },
  { signal }: { signal: AbortSignal }
): Promise<ApplicationsPesponseType<ApplicationListItemType>> => {
  const response = await api.get<ApplicationListResponseDTO>(API_ROUTES.applications.get, {
    params,
    signal
  })

  if (!response.data) throw new Error('Faild to get applications')

  const applications = response.data.items.map(app => mapApplicationListItem(app))

  return {
    items: applications,
    pagination: response.data.pagination
  }
}
