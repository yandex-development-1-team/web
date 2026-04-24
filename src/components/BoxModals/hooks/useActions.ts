import { useNotification } from '@/app/providers/notification'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBox } from '../api/createBox'
import { putBox } from '../api/editBox'
import type { ICreateBoxRequest, IUpdateBoxRequest } from '../ManageBoxModal/ManageBoxModal.type'

export const useActions = (boxesQueryKey?: readonly (string | null)[]) => {
  const queryClient = useQueryClient()
  const { showNotification } = useNotification()

  const { mutateAsync: createNewBox, isSuccess: isSuccessCreate } = useMutation({
    mutationFn: (payload: ICreateBoxRequest) => createBox(payload),
    onSuccess: () => {
      showNotification({
        message: 'Коробка создана успешно',
        status: 'success'
      })

      if (boxesQueryKey) {
        queryClient.invalidateQueries({ queryKey: boxesQueryKey })
      }
    },
    onError: () => {
      showNotification({
        message: 'Возникла ошибка при создании коробки',
        status: 'error'
      })
    }
  })

  const { mutateAsync: updateBox, isSuccess: isSuccessUpdate } = useMutation({
    mutationFn: (payload: IUpdateBoxRequest) => putBox(payload),
    onSuccess: () => {
      showNotification({
        message: 'Коробка обновлена успешно',
        status: 'success'
      })

      if (boxesQueryKey) {
        queryClient.invalidateQueries({ queryKey: boxesQueryKey })
      }
    },
    onError: () => {
      showNotification({
        message: 'Возникла ошибка при обновлении статуса',
        status: 'error'
      })
    }
  })

  return {
    createNewBox,
    isSuccessCreate,
    updateBox,
    isSuccessUpdate
  }
}
