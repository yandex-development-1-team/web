import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAccessSettings, postAccessSettings } from '@/services/api/accessSettings'
import { useNotification } from '@/app/providers/notification'
import type { TRoleServerId } from '@/services/api/accessSettings'
import type { TAccessSettingsArray } from '@/services/api/accessSettings'

export const useAccessSettings = (roleServerId: TRoleServerId | undefined) => {
  const { showNotification } = useNotification()
  const queryClient = useQueryClient()
  const accessSettingsKey = ['accessSettings', roleServerId] as const

  const query = useQuery({
    queryKey: accessSettingsKey,
    queryFn: () => getAccessSettings(roleServerId!),
    enabled: !!roleServerId,
    placeholderData: prev => prev
  })

  const mutation = useMutation({
    mutationFn: ({ data, roleServerId }: { data: TAccessSettingsArray; roleServerId: TRoleServerId }) =>
      postAccessSettings({ data, roleServerId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accessSettingsKey })
    },
    onError: () => {
      showNotification({
        status: 'error',
        message: 'Не удалось сохранить данные'
      })
    }
  })

  return {
    accessSettings: query.data,
    isLoadingAccessSettings: query.isPending,
    isFetchingAccessSettings: query.isFetching,
    updateAccessSettings: mutation.mutate,
    isUpdatingAccessSettings: mutation.isPending
  }
}
