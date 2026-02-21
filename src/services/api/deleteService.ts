import axios from 'axios'

export async function deleteItemById(id: string | number) {
  const PATH = '/api/items'
  const response = await axios.delete(`${PATH}/${id}`)
  return response.data
}
