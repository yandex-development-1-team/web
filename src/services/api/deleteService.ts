import { api } from '@/app/providers/axios'
import { API_ROUTES } from './routes'

export async function deleteItemById(id: string | number) {
  const response = await api.delete(`${API_ROUTES.items}/${id}`)
  return response.data
}
