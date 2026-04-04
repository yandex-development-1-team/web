import { MOCK_BOXES } from '@/mockData/mock_box_solutions'
import type { IBox } from '../BoxSolutions.types'

export const getBoxById = (boxId: string | null) => {
  if (!boxId) return
  // const response = await api.get<IBox>(`/boxes/${boxId}`)

  // if (!response.data) throw new Error('Faild to get box')

  // return response.data
  return MOCK_BOXES.find(box => box.id.toString() === boxId) as IBox
}
