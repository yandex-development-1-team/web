import { MOCK_BOXES } from '@/mockData/mock_box_solutions'
import type { IBox } from '../BoxSolutions.types'

export const getBoxSolutions = async () => {
  //   const result = await api.get<IBox[]>('')
  //   if (!result.data) throw new Error('Faild to get box solutions')
  //   return result.data
  return MOCK_BOXES as IBox[]
}
