import { api } from '@/app/providers/axios'

export const deleteFile = async (id: string) => {
  const response = await api.delete(`/api/v1/export/delete/${id}`)

  if (!response.data) throw new Error(`Server Error: Failed to delete file ${id}`)

  return response.data
}
