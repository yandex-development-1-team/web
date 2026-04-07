import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'

export const deleteFile = async (id: string | null) => {
  if (!id) return
  const response = await api.delete(API_ROUTES.export.deleteById(id))

  if (!response.data) throw new Error(`Server Error: Failed to delete file ${id}`)

  return response.data
}
