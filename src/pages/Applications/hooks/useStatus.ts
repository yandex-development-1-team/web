import { useNotification } from '@/app/providers/notification'
import type { TApplicationStatus } from '@/types/applications'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getBoxById } from '../api/box/getBoxById'
import { getSpecialProjectById } from '../api/specialProject/getSpecialProjectById'
import type { AppType } from '../applications.types'

export const useStatus = (
  id: string,
  activeTab: AppType,
  onModify: (id: string, newStatus: TApplicationStatus) => Promise<void>,
  invalidateQueryKey: string[] | undefined
) => {
  const { showNotification } = useNotification()
  const queryClient = useQueryClient()

  const { data: box } = useQuery({
    queryKey: ['bookingByIdKey', id],
    queryFn: () => getBoxById(id),
    placeholderData: prev => prev,
    enabled: activeTab === 'box'
  })

  const { data: specialProject } = useQuery({
    queryKey: ['applicationById', id],
    queryFn: () => getSpecialProjectById(id),
    enabled: activeTab === 'specialProject'
  })

  const { mutateAsync: updateStatus, isPending: isStatusUpdating } = useMutation({
    mutationFn: ({ id, newStatus }: { id: string; newStatus: TApplicationStatus }) => onModify(id, newStatus),
    onSuccess: () => {
      showNotification({
        message: 'Статус обновлен успешно!',
        status: 'success'
      })

      if (invalidateQueryKey) queryClient.invalidateQueries({ queryKey: invalidateQueryKey })
    },
    onError: () => {
      showNotification({
        message: 'Ошибка при обновлении статуса!',
        status: 'error'
      })
    }
  })
  return { box, specialProject, updateStatus, isStatusUpdating }
}
