import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'

type DeleteBoxResponse = {
  message: string
}

export const deleteBox = async (id: string | null) => {
  if (!id) return
  const result = await api.delete<DeleteBoxResponse>(API_ROUTES.boxes.byId(id))

  if (!result.data) throw new Error('Error when deleting the box')
}
