import { api } from '@/app/providers/axios'

export const deleteFile = async (id: string) => {
  const response = await api.delete(`/api/v1/delete/${id}`)

  return response.status
}
