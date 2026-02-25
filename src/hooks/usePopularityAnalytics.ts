import { useNotification } from '@/app/providers/notification'
import { popularityApi } from '@/services/popularity.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
interface IPOPAN {
  dateFrom: string
  dateTo: string
}
const popularityAnalyticsKeys = {
  boxes: ({ dateFrom, dateTo }: IPOPAN) => ['boxes', dateFrom, dateTo] as const,
  export: ({ dateFrom, dateTo }: IPOPAN) => ['export', dateFrom, dateTo] as const
}

export const useExportAnalytics = () => {
  const queryClient = useQueryClient()
  const { showNotification } = useNotification()

  return useMutation({
    mutationFn: async (param: IPOPAN) => {
      const blob = await popularityApi.exportData(param)
      return { blob, param }
    },
    onSuccess: data => {
      const { param } = data
      queryClient.invalidateQueries({ queryKey: popularityAnalyticsKeys.export(param) })
      showNotification({
        status: 'success',
        message: 'Файл успешно сгенерирован'
      })
    },
    onError: (error: Error) => {
      showNotification({
        status: 'error',
        message: error.message
      })
    }
  })
}

export const useGetBoxes = () => {
  const queryClient = useQueryClient()
  const { showNotification } = useNotification()
  return useMutation({
    mutationFn: async (param: IPOPAN) => {
      const data = await popularityApi.getBoxes(param)
      console.log(data)
      return { data, param }
    },
    onSuccess: data => {
      const { param } = data
      queryClient.invalidateQueries({ queryKey: popularityAnalyticsKeys.boxes(param) })
    },
    onError: (error: Error) => {
      showNotification({
        status: 'error',
        message: error.message
      })
    }
  })
}
