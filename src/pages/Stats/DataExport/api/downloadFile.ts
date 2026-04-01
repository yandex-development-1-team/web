import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'

export const downloadFile = async ({
  id,
  signal,
  onProgress
}: {
  id: string
  signal: AbortSignal
  onProgress: (percent: number) => void
}) => {
  const response = await api.get<Blob>(API_ROUTES.export.byId(id), {
    signal,
    responseType: 'blob',
    onDownloadProgress: progressEvent => {
      if (progressEvent.total) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        onProgress(percentCompleted)
      }
    }
  })

  if (!response.data) throw new Error(`Server Error: Failed to download file ${id}`)

  return response.data
}
