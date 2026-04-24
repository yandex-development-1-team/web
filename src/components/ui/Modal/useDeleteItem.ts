import { useNotification } from '@/app/providers/notification'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteItem = (
  onDelete: (id: string | number) => Promise<void>,
  onClose: () => void,
  queryKey?: string[]
) => {
  const queryClient = useQueryClient()
  const { showNotification } = useNotification()

  const { mutateAsync: deleteItem, isPending } = useMutation({
    mutationFn: (id: string | number) => onDelete(id),

    onSuccess: () => {
      showNotification({
        message: 'Удалено успешно',
        status: 'success'
      })

      if (queryKey) queryClient.invalidateQueries({ queryKey: queryKey })
      onClose()
    },

    onError: () => {
      showNotification({
        message: 'Произошла ошибка при удалении',
        status: 'error'
      })
    }
  })

  return { deleteItem, isPending }
}
