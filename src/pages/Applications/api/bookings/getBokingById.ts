import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'
import { mapBookingToBoxApplication } from './bookings.mapper'
import type { BookingDTO } from './types'

export const getBokingById = async (id: string) => {
  const response = await api.get<BookingDTO>(API_ROUTES.bookings.byId(id))

  if (!response.data) throw new Error('Faild to get booking')

  const booking = mapBookingToBoxApplication(response.data)

  return booking
}
