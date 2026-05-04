import { useNotification } from '@/app/providers/notification'
import { useMutation } from '@tanstack/react-query'
import { uploadPresentation } from '../api/uploadPresentation'

export const useUploadPresentation = () => {
  const { showNotification } = useNotification()

  return useMutation({
    mutationFn: (data: FormData) => uploadPresentation(data),
    onSuccess: () => {
      showNotification({
        message: 'Презентация загружена',
        status: 'success'
      })
    },
    onError: () => {
      showNotification({
        message: 'Не удалось загрузить презентацию',
        status: 'error'
      })
    }
  })
}
