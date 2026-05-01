import { useNotification } from '@/app/providers/notification'
import { useMutation } from '@tanstack/react-query'
import { updateFormLink } from '../api/updateFormLink'
import type { TResources } from '../specialProjects.types'
import { queryClient } from '@/app/providers/tanstack-query/queryClient'

export const useUpdateFormLink = () => {
  const { showNotification } = useNotification()

  return useMutation({
    mutationFn: (data: TResources) => updateFormLink(data),
    onSuccess: () => {
      showNotification({
        message: 'Ссылка обновлена',
        status: 'success'
      })

      queryClient.invalidateQueries({ queryKey: ['req-spec-projects'] })
    },
    onError: () => {
      showNotification({
        message: 'Не удалось обновить ссылку',
        status: 'error'
      })
    }
  })
}
