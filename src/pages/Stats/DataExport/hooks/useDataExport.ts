import { useNotification } from '@/app/providers/notification'
import { useQuery } from '@tanstack/react-query'
import { getFiles } from '../api/fetchFiles'

export const useDataExport = (activeTab: string) => {
  const { showNotification } = useNotification()

  const { data, isPending, isError } = useQuery({
    queryKey: ['data-export', activeTab],
    queryFn: () => getFiles(activeTab)
  })

  if (isError) {
    showNotification({
      message: 'Не удалось получить список файлов',
      status: 'error'
    })
  }

  return {
    data,
    isPending
  }
}
