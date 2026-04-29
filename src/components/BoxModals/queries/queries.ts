import { useNotification } from '@/app/providers/notification'
import { BOX_SOLUTIONS_KEYS } from '@/services/api/queryKeys'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { ICreateBoxRequest, IUpdateBoxRequest } from '../BoxManageModal/boxManageModal.type'
import { createBox, editBox, getBox } from '../api/boxModalsApi'

export const useFetchBox = (boxId: string | null) => {
  return useQuery({
    queryKey: BOX_SOLUTIONS_KEYS.detail(boxId),
    queryFn: () => getBox(boxId),
    enabled: !!boxId
  })
}

export const useCreateBox = () => {
  const { showNotification } = useNotification()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: ICreateBoxRequest) => createBox(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: BOX_SOLUTIONS_KEYS.all
      })

      showNotification({
        message: 'Коробка создана успешно',
        status: 'success'
      })
    },
    onError: () => {
      showNotification({
        message: 'Возникла ошибка при создании коробки',
        status: 'error'
      })
    }
  })
}

export const useUpdateBox = () => {
  const { showNotification } = useNotification()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: IUpdateBoxRequest) => editBox(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: BOX_SOLUTIONS_KEYS.all
      })

      showNotification({
        message: 'Коробка обновлена успешно',
        status: 'success'
      })
    },
    onError: () => {
      showNotification({
        message: 'Возникла ошибка при обновлении коробки',
        status: 'error'
      })
    }
  })
}
