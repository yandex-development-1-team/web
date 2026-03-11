import { api } from '@/app/providers/axios'
import { MOCK_BOXES } from '@/mockData/mock_box_solutions'
import type { IBox, IPagination } from '../BoxSolutions.types'

type BoxesPesponseType = {
  items: IBox[]
  paginaton: IPagination
}

export const getBoxes = async (page: number) => {
  const result = await api.get<BoxesPesponseType>(`/boxes?page=${page}`)
  if (!result.data) throw new Error('Faild to get box solutions')
  //   return result.data

  //Имитация пагинации на беке
  const limit = 6
  const total = 72
  const offset = (Math.max(1, page) - 1) * limit
  const items = MOCK_BOXES.slice(offset, offset + limit) as IBox[]

  return {
    items: items,
    pagination: {
      limit,
      offset,
      total
    }
  }
}
