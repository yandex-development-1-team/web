import { useMutation } from '@tanstack/react-query'
import { useNotification } from '@/app/providers/notification'
import type { IUpdateSpecialProjecDTO } from '../specialProjects.types'
import { updateSpecialProject } from '../api/updateSpecialProject'
import { queryClient } from '@/app/providers/tanstack-query/queryClient'

export const useUpdateSpecialProject = () => {
  const { showNotification } = useNotification()

  return useMutation({
    mutationFn: (changedData: IUpdateSpecialProjecDTO) => updateSpecialProject(changedData),
    onSuccess: () => {
      showNotification({
        message: 'Данные успешно обновлены',
        status: 'success'
      })

      queryClient.invalidateQueries({ queryKey: ['specialProjects'] })
    },
    onError: () => {
      showNotification({
        message: 'Не удалось обновить данные',
        status: 'error'
      })
    }
  })
}
