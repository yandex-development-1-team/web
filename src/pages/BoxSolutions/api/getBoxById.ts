import { MOCK_BOXES } from '@/mockData/mock_box_solutions'
import type { IBox } from '../BoxSolutions.types'

export const getBoxById = (id: string) => {
  if (!id) return
  // const response = await api.get<IBox>(API_ROUTES.boxes.byId(id))

  // if (!response.data) throw new Error('Faild to get box')

  // return response.data
  return MOCK_BOXES.find(box => box.id.toString() === id) as IBox
}
