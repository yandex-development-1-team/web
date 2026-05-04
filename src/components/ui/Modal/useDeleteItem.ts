import { useNotification } from '@/app/providers/notification'
import { useMutation } from '@tanstack/react-query'

export const useDeleteItem = (onDelete: (id: string | number) => Promise<void>) => {
  const { showNotification } = useNotification()

  const { mutateAsync: deleteItem, isPending } = useMutation({
    mutationFn: (id: string | number) => onDelete(id),
    onSuccess: () => {
      showNotification({
        message: 'Удалено успешно',
        status: 'success'
      })
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
