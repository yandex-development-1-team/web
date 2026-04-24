import { useNotification } from '@/app/providers/notification'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { downloadFile } from '../api/downloadFile'

export const useDownload = (fileName?: string) => {
  const [progress, setProgress] = useState(0)
  const [controller, setController] = useState<AbortController | null>(null)

  const { showNotification } = useNotification()

  const mutation = useMutation({
    mutationFn: ({ id, signal }: { id: string; signal: AbortSignal }) => downloadFile({ id, signal }),
    onSuccess: blob => {
      const url = window.URL.createObjectURL(new Blob([blob]))
      const link = document.createElement('a')
      link.href = url
      link.download = fileName ?? 'file'
      link.click()
      window.URL.revokeObjectURL(url)

      showNotification({
        message: 'Файл успешно скачан',
        status: 'success'
      })
    },
    onError: () => {
      showNotification({
        message: 'Не удалось скачать файл',
        status: 'error'
      })
    },
    onSettled: () => {
      setController(null)
      setProgress(0)
    }
  })

  const start = (id: string) => {
    const ctrl = new AbortController()
    setController(ctrl)
    mutation.mutate({ id, signal: ctrl.signal })
  }

  const cancel = () => controller?.abort()

  return { start, cancel, progress, isDownloading: mutation.isPending }
}
