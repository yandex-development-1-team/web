import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'
import type { ApplicationParamsType, BookingListItemType } from '../../applications.types'
import type { ApplicationsPesponseType } from '../types'
import { mapBookingListItem } from './bookings.mapper'
import type { BookingListResponseDTO } from './types'

export const getBookings = async (
  { params }: { params: ApplicationParamsType },
  { signal }: { signal: AbortSignal }
): Promise<ApplicationsPesponseType<BookingListItemType>> => {
  const response = await api.get<BookingListResponseDTO>(API_ROUTES.bookings.get, {
    params,
    signal
  })

  if (!response.data) throw new Error('Faild to get box applications')

  const bookings = response.data.items.map(app => mapBookingListItem(app))

  return {
    items: bookings,
    pagination: response.data.pagination
  }
}
