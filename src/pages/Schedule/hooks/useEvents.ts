import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { scheduleApi } from '@/services/schedule.service'
import type { IEventsParams, IEventsResponse, TEvent } from '@/types/schedule.types'
import { useNotification } from '@/app/providers/notification'
import type { ToggleButtonState } from '@/components/ui/ToggleButton/ToggleButton.types'

export const eventKeys = {
  all: ['events'],
  lists: () => [...eventKeys.all, 'list'],
  list: ({ params, side }: { params: IEventsParams; side: ToggleButtonState }) => [
    ...eventKeys.lists(),
    { params, side }
  ],
  details: () => [...eventKeys.all, 'detail'],
  detail: (id: number) => [...eventKeys.details(), id]
}

export const useEvents = ({ params, side }: { params: IEventsParams; side: ToggleButtonState }) => {
  return useInfiniteQuery({
    queryKey: eventKeys.list({ params, side }),
    queryFn: async ({ pageParam }) => {
      const response = await scheduleApi.getEvents({
        ...params,
        offset: pageParam
      })
      return response
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: IEventsResponse) => {
      const { offset, limit, total } = lastPage.pagination
      const nextOffset = offset + limit
      return nextOffset < total ? nextOffset : undefined
    },
    staleTime: 0,
    gcTime: 5 * 60 * 1000
  })
}

export const useUpdateEvent = () => {
  const queryClient = useQueryClient()
  const { showNotification } = useNotification()

  return useMutation({
    mutationFn: ({ id, ...data }: Partial<TEvent> & { id: number }) => scheduleApi.updateEvent({ id, ...data }),

    onSuccess: updatedEvent => {
      queryClient.setQueryData(eventKeys.detail(updatedEvent.id), updatedEvent)

      queryClient.setQueriesData(
        { queryKey: eventKeys.lists() },
        (oldData: { pages: IEventsResponse[] } | undefined) => {
          if (!oldData) return oldData

          return {
            ...oldData,
            pages: oldData.pages.map(page => ({
              ...page,
              items: page.items.map(item => (item.id === updatedEvent.id ? { ...item, ...updatedEvent } : item))
            }))
          }
        }
      )
      showNotification({ status: 'success', message: 'Событие успешно обновлено' })
    },
    onError: () => {
      showNotification({ status: 'error', message: 'Ошибка при обновлении события' })
    }
  })
}

export const useDeleteEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => scheduleApi.deleteEvent(id),

    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: eventKeys.detail(deletedId) })

      queryClient.setQueriesData(
        { queryKey: eventKeys.lists() },
        (oldData: { pages: IEventsResponse[] } | undefined) => {
          if (!oldData) return oldData

          return {
            ...oldData,
            pages: oldData.pages.map(page => ({
              ...page,
              items: page.items.filter(item => item.id !== deletedId)
            }))
          }
        }
      )
    }
  })
}
