import { api } from '@/app/providers/axios'
import type { IParams } from '@/components/ui/Pagination/Pagination.types'
import { MOCK_BOXES } from '@/mockData/mock_box_solutions'
import type { IBox, IPagination } from '../BoxSolutions.types'

type BoxesPesponseType = {
  items: IBox[]
  pagination: IPagination
}

export const getBoxes = async ({ params }: { params: IParams }, { signal }: { signal: AbortSignal }) => {
  const result = await api.get<BoxesPesponseType>(`/boxes`, { params, signal })
  if (!result.data) throw new Error('Faild to get box solutions')

  //Имитация пагинации на беке
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
  } as BoxesPesponseType
  //   return result.data
}
