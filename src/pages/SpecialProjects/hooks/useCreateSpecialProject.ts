import { useMutation } from '@tanstack/react-query'
import { useNotification } from '@/app/providers/notification'
import type { ICreateSpecialProjectDTO } from '../specialProjects.types'
import { queryClient } from '@/app/providers/tanstack-query/queryClient'
import { createSpecialProject } from '../api/createSpecialProject'

export const useCreateSpecialProject = () => {
  const { showNotification } = useNotification()

  return useMutation({
    mutationFn: (data: ICreateSpecialProjectDTO) => createSpecialProject(data),
    onSuccess: () => {
      showNotification({
        message: 'Проект успешно создан',
        status: 'success'
      })

      queryClient.invalidateQueries({ queryKey: ['specialProjects'] })
    },
    onError: () => {
      showNotification({
        message: 'Не удалось создать проект',
        status: 'error'
      })
    }
  })
}
