import { api } from '@/app/providers/axios'
import type { BookingResponse } from '@/pages/Home/types'
import { API_ROUTES } from '@/services/api/routes'
import { useQuery } from '@tanstack/react-query'

export const useBookingRequests = () => {
  return useQuery<BookingResponse>({
    queryKey: ['bookingRequests'],
    queryFn: async () => {
      const res = await api.get(API_ROUTES.dashboard)
      return res.data
    }
  })
}
