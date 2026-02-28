import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useDeleteItem = (onDelete: (id: string | number) => Promise<void>, onClose: () => void) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string | number) => onDelete(id),

    onSuccess: () => {
      toast.success('Удалено успешно')
      queryClient.invalidateQueries()
      onClose()
    },

    onError: () => {
      toast.error('Произошла ошибка при удалении')
    }
  })
}
