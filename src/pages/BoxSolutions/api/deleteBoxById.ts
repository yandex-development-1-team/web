import { api } from '@/app/providers/axios'

// type DeleteBoxResponse = {
//   message: string
// }

export const deleteBoxById = async (boxId: number) => {
  const result = await api.delete(`/boxes/${boxId}`)

  if (!result.data) throw new Error('Error when deleting the box')

  return result.data
}
