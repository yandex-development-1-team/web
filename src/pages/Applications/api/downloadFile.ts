import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'

export const downloadFile = async ({ id, signal }: { id: string; signal: AbortSignal }) => {
  const response = await api.get<Blob>(API_ROUTES.export.byId(id), {
    signal,
    responseType: 'blob'
  })

  if (!response.data) throw new Error(`Server Error: Failed to download file ${id}`)

  return response.data
}
