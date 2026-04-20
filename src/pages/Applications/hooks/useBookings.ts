import { useNotification } from '@/app/providers/notification'
import type { TApplicationStatus } from '@/types/applications'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getBokingById } from '../api/bookings/getBokingById'

export const useBookings = (
  bookingId: string,
  onModify: (id: string | number, newStatus: TApplicationStatus) => Promise<void>,
  invalidateQueryKey: string[] | undefined
) => {
  const { showNotification } = useNotification()
  const queryClient = useQueryClient()

  const { data: booking } = useQuery({
    queryKey: ['bookingByIdKey', bookingId],
    queryFn: () => getBokingById(bookingId),
    enabled: !!bookingId
  })

  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: ({ id, newStatus }: { id: string; newStatus: TApplicationStatus }) => onModify(id, newStatus),
    onSuccess: () => {
      // await new Promise(resolve => setTimeout(resolve, 300))
      showNotification({
        message: 'Статус обновлен успешно!',
        status: 'success'
      })
      if (invalidateQueryKey) queryClient.invalidateQueries({ queryKey: invalidateQueryKey })
    }
  })
  return { booking, updateStatus }
}
