import { MOCK_BOXES } from '@/mockData/mock_box_solutions'
import type { IBox } from '../BoxSolutions.types'

export const getBoxSolutions = async (page: number) => {
  // const result = await api.get<IBox[]>(`/boxes?page=${page}`)
  //   if (!result.data) throw new Error('Faild to get box solutions')
  //   return result.data
  console.log('selected page:', page)
  return MOCK_BOXES as IBox[]
}
