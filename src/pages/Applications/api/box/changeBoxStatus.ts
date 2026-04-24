import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'
import type { TApplicationStatus } from '@/types/applications'
import type { BookingDTO } from './types'

export const changeBookingStatus = async (id: string, { status }: { status: TApplicationStatus }) => {
  const response = await api.put<BookingDTO>(API_ROUTES.bookings.changeStatus(id), { status })

  if (!response.data) throw new Error('Failed to update status')

  return response.data
}
