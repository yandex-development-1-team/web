import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'
import type { BoxSolutionsSearchParamsType } from '../BoxSolutions.types'
import { mapBoxesDTOToBoxes } from './boxSolutions.mapper'
import type { BoxesSolutionsResponseType, IBoxDTO } from './types'

export const getBoxes = async (
  { params }: { params: BoxSolutionsSearchParamsType },
  { signal }: { signal: AbortSignal }
) => {
  const response = await api.get<BoxesSolutionsResponseType<IBoxDTO>>(API_ROUTES.boxes.get, { params, signal })
  if (!response.data) throw new Error('Faild to get box solutions')

  const boxes = mapBoxesDTOToBoxes(response.data.items)

  return {
    items: boxes,
    pagination: response.data.pagination
  }
}
