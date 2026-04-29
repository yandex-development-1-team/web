import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'
import type { BoxSolutionsSearchParamsType } from '../types'
import { mapBoxesDTOToBoxes } from './mappers'
import type { BoxesSolutionsResponseType, DeleteBoxResponse, IBoxDTO } from './types'

export const boxSolutionApi = {
  getBoxes: async ({ params }: { params: BoxSolutionsSearchParamsType }, { signal }: { signal: AbortSignal }) => {
    const response = await api.get<BoxesSolutionsResponseType<IBoxDTO>>(API_ROUTES.boxes.get, { params, signal })
    if (!response.data) throw new Error('Faild to get box solutions')
    const boxes = mapBoxesDTOToBoxes(response.data.items)

    return {
      items: boxes,
      pagination: response.data.pagination
    }
  },

  deleteBox: async (id: string | null) => {
    if (!id) return
    const result = await api.delete<DeleteBoxResponse>(API_ROUTES.boxes.byId(id))
    if (!result.data) throw new Error('Error when deleting the box')
  }
}
