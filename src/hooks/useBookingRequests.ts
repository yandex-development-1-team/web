import { api } from '@/app/providers/axios'
import type { BookingRequest } from '@/pages/Home/types'
import { useQuery } from '@tanstack/react-query'

export const useBookingRequests = () => {
  return useQuery({
    queryKey: ['bookingRequests'],
    queryFn: async () => {
      const res = await api.get<{ applications: BookingRequest[] }>('/dashboard')
      return res.data.applications
    }
  })
}
