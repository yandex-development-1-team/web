import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'

// type DeleteBoxResponse = {
//   message: string
// }

export const deleteBoxById = async (id: string) => {
  if (!id) return
  const result = await api.delete(API_ROUTES.boxes.deleteById(id))

  if (!result.data) throw new Error('Error when deleting the box')

  return result.data
}
