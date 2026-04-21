import { MOCK_BOXES } from '@/mockData/mock_box_solutions'
import type { BoxSolutionsSearchParamsType, IBox, IPagination } from '../BoxSolutions.types'

type BoxesSolutionsResponseType = {
  items: IBox[]
  pagination: IPagination
}

export const getBoxes = async (
  { params }: { params: BoxSolutionsSearchParamsType },
  { signal }: { signal: AbortSignal }
) => {
  // const response = await api.get<BoxesSolutionsResponseType>(API_ROUTES.boxes.get, { params, signal })
  // if (!response.data) throw new Error('Failed to get box solutions')

  //Имитация пагинации на беке
  void signal
  const limit = Number(params.limit)
  const offset = Number(params.offset)
  const total = MOCK_BOXES.length

  const boxes = MOCK_BOXES.slice(offset, offset + limit) as IBox[]

  return {
    items: boxes,
    pagination: {
      limit,
      offset,
      total
    }
  } as BoxesSolutionsResponseType
  //   return result.data
}
