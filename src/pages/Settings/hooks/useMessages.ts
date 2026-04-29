import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getMessages, putMessages } from '../api/messages'
import { useNotification } from '@/app/providers/notification'
import type { ITextFieldValue } from '../Settings.types'

export const useMessages = () => {
  const { showNotification } = useNotification()
  const queryClient = useQueryClient()
  const messagesKey = ['messages'] as const

  const query = useQuery({
    queryKey: messagesKey,
    queryFn: getMessages,
    placeholderData: prev => prev
  })

  const mutation = useMutation({
    mutationFn: (data: ITextFieldValue[]) => putMessages(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: messagesKey })
    },
    onError: () => {
      showNotification({
        status: 'error',
        message: 'Не удалось сохранить данные'
      })
    }
  })

  return {
    messages: query.data,
    isLoadingMessages: query.isPending,
    isFetchingMessages: query.isFetching,
    updateMessages: mutation.mutate,
    isUpdatingMessages: mutation.isPending
  }
}
