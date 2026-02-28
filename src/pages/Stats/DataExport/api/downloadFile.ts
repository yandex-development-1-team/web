import { api } from '@/app/providers/axios'

export const downloadFile = async ({
  id,
  signal,
  onProgress
}: {
  id: string
  signal: AbortSignal
  onProgress: (percent: number) => void
}) => {
  const file = await api.get<Blob>(`api/v1/export/${id}`, {
    signal,
    responseType: 'blob',
    onDownloadProgress: progressEvent => {
      if (progressEvent.total) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        onProgress(percentCompleted)
      }
    }
  })

  // return new Promise<Blob>(resolve => {
  //   setTimeout(() => {
  //     resolve(file.data)
  //   }, 500)
  // })

  return file.data
}
