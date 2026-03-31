import axios from 'axios'
import { API_ROUTES } from './routes'

export async function deleteItemById(id: string | number) {
  const response = await axios.delete(`${API_ROUTES.items}/${id}`)
  return response.data
}
