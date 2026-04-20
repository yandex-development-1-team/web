import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'
import { mapBoxDTOToBoxApplication } from './box.mapper'
import type { BookingDTO } from './types'

export const getBoxById = async (id: string) => {
  const response = await api.get<BookingDTO>(API_ROUTES.bookings.byId(id))

  if (!response.data) throw new Error('Faild to get booking')

  const booking = mapBoxDTOToBoxApplication(response.data)

  return booking
}
