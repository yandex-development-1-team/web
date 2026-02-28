import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteFile } from '../api/deleteFile'
import type { TFile } from '../DataExport.types'
import { useNotification } from '@/app/providers/notification'

export const useDeleteFile = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient()
  const { showNotification } = useNotification()

  return useMutation({
    mutationFn: (id: string) => deleteFile(id),
    onMutate: async deletedId => {
      await queryClient.cancelQueries({ queryKey: ['data-export'] })

      const previousFiles = queryClient.getQueryData(['data-export'])

      queryClient.setQueryData<TFile[]>(['data-export'], old => {
        return old ? old.filter(file => file.id !== deletedId) : []
      })

      return { previousFiles }
    },
    onSuccess: () => {
      showNotification({
        message: 'Файл успешно удален',
        status: 'success'
      })
    },
    onError: (_err, _deletedId, context) => {
      if (context?.previousFiles) {
        queryClient.setQueryData(['data-export'], context.previousFiles)
      }

      showNotification({
        message: 'Не удалось удалить файл',
        status: 'error'
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['data-export'] })
      onSuccessCallback?.()
    }
  })
}
